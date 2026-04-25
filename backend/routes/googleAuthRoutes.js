

const express  = require('express');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User     = require('../models/User');

const router = express.Router();

passport.use(new GoogleStrategy(
  {
    clientID:     process.env.GOOGLE_CLIENT_ID,      
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
    callbackURL:  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      
      const email      = profile.emails[0].value;          
      const name       = profile.displayName;              
      const googleId   = profile.id;                       
      const profilePic = profile.photos?.[0]?.value || ''; // profile picture URL

      console.log('🔵 Google login attempt for:', email);

      // ── STEP 1: Search by googleId first (most reliable) ──
      // This handles the case where the user previously registered
      // with email/password using the same email
      let user = await User.findOne({ googleId: googleId });

      if (user) {
        // ✅ Found by Google ID – user already exists
        console.log('✅ User found in DB by Google ID:', email);
        return done(null, user);
      }

      // ── STEP 2: Search by email (in case they registered manually) ──
      user = await User.findOne({ email: email.toLowerCase() });

      if (user) {
        // ✅ Found by email – they registered before with email/password
        // Now link their Google ID to their existing account
        console.log('✅ Existing user found by email – linking Google ID:', email);

        user.googleId   = googleId;   // link Google account
        user.profilePic = profilePic; // save their profile picture
        await user.save();            // ✅ IMPORTANT: must call save() to persist!

        console.log('✅ Google ID linked to existing account:', email);
        return done(null, user);
      }

      // ── STEP 3: Brand new user – create them in MongoDB ───
      console.log('🆕 New user – creating account in MongoDB for:', email);

      // Build the new user object
      const newUser = new User({
        name:       name,
        email:      email.toLowerCase(),
        googleId:   googleId,
        profilePic: profilePic,
        // No password for Google users!
        phone:   '',
        village: '',
        crop:    'wheat',
        land:    0,
      });

      await newUser.save();

      console.log('✅ New Google user created and SAVED to MongoDB:', email);
      return done(null, newUser); 

    } catch (err) {
      
      console.error('❌ Google OAuth error:', err.message);
      console.error('❌ Full error:', err);
      return done(err, null); 
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('🔐 Serializing user:', user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    console.error('❌ deserializeUser error:', e.message);
    done(e, null);
  }
});

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'], 
  })
);

router.get(
  '/callback',
  
  passport.authenticate('google', {
    failureRedirect: '/?error=google_failed',
    session: false,
  }),

  (req, res) => {
    try {
      
      console.log('✅ Google callback success! Building JWT for:', req.user.email);

      const token = jwt.sign(
        { id: req.user._id },           
        process.env.JWT_SECRET,          
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      const user = {
        id:         req.user._id,
        name:       req.user.name,
        email:      req.user.email,
        phone:      req.user.phone,
        village:    req.user.village,
        crop:       req.user.crop,
        profilePic: req.user.profilePic, 
      };

      console.log('✅ JWT created, sending to frontend for user:', user.email);

      res.send(`
        <!DOCTYPE html>
        <html>
        <body>
          <p>Login successful! Closing window...</p>
          <script>
            // Send the login data back to the main browser window
            if (window.opener) {
              // ✅ postMessage sends data to the parent window (main tab)
              window.opener.postMessage(
                {
                  type:  'GOOGLE_LOGIN_SUCCESS',
                  token: '${token}',
                  user:  ${JSON.stringify(user)}
                },
                '*'   // ✅ FIX: use '*' instead of hardcoded URL (works on any port)
              );
              window.close(); // close the popup
            } else {
              // Fallback: if no popup, redirect to main page with token in URL
              window.location.href =
                '/?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}';
            }
          </script>
        </body>
        </html>
      `);

    } catch (err) {
      console.error('❌ Error in Google callback handler:', err.message);
      res.redirect('/?error=jwt_failed');
    }
  }
);

module.exports = { router, passport };
