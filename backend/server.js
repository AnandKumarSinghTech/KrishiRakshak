

const express        = require('express');
const mongoose       = require('mongoose');
const dotenv         = require('dotenv');
const cors           = require('cors');
const path           = require('path');
const session        = require('express-session');  
const passport       = require('passport');          

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// ✅ Trust proxy for Vercel/Heroku/etc. to ensure HTTPS works with Passport
app.set('trust proxy', 1);

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret:            process.env.JWT_SECRET || 'krishirakshak_session_secret',
  resave:            false,
  saveUninitialized: false,
  cookie:            { secure: false }, 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, '..')));

const authRoutes        = require('./routes/authRoutes');
const detectRoutes      = require('./routes/detectRoutes');
const { router: googleAuthRouter, passport: configuredPassport }
                        = require('./routes/googleAuthRoutes');
const scanRoutes        = require('./routes/scanRoutes');   
const alertRoutes       = require('./routes/alertRoutes');  
const searchRoutes      = require('./routes/searchRoutes'); 

// ✅ IMPORTANT: Google route MUST come before /api/auth
// Otherwise Express matches /api/auth first and swallows the Google path
app.use('/api/auth/google', googleAuthRouter);

app.use('/api/auth', authRoutes);

app.use('/api', detectRoutes);

app.use('/api', searchRoutes);

app.use('/api/scans', scanRoutes);

app.use('/api/alerts', alertRoutes);

app.get('/api', (req, res) => {
  res.json({
    message:   '🌾 KrishiRakshak API is running!',
    version:   '2.0.0',
    endpoints: {
      register:      'POST   /api/auth/register',
      login:         'POST   /api/auth/login',
      googleLogin:   'GET    /api/auth/google',
      detect:        'POST   /api/detect',
      diseases:      'GET    /api/diseases/:cropName',
      search:        'GET    /api/search?query=&lang=&crop=',
      getScans:      'GET    /api/scans/:userId',
      filterScans:   'GET    /api/scans/filter?userId=...',
      deleteScan:    'DELETE /api/scans/:id',
      getAlert:      'GET    /api/alerts/:userId',
      alertHistory:  'GET    /api/alerts/history/:userId',
    }
  });
});

const PORT      = process.env.PORT || 5000;
const MONGO_URI = (process.env.MONGO_URI || 'mongodb://localhost:27017/krishirakshak').trim();

// Mask URI for logging
const maskedURI = MONGO_URI.replace(/\/\/(.*):(.*)@/, '//***:***@');

// 🔌 Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log(`📍 Database: ${maskedURI}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('💡 Make sure MongoDB is running!');
  });

// 🏥 API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString(),
    url: req.url,
    originalUrl: req.originalUrl
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok (fallback)',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString(),
    url: req.url,
    originalUrl: req.originalUrl
  });
});

app.all('*', (req, res, next) => {
  console.log(`Unmatched route hit: ${req.method} ${req.url} (originalUrl: ${req.originalUrl})`);
  next();
});

// 🚀 Start Server (Only if not on Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`\n📋 Available Endpoints:`);
    console.log(`   GET    http://localhost:${PORT}/api/health        ← Health Check`);
    console.log(`   POST   http://localhost:${PORT}/api/auth/register`);
    console.log(`   POST   http://localhost:${PORT}/api/auth/login`);
    console.log(`   GET    http://localhost:${PORT}/api/auth/google   ← Google OAuth`);
    console.log(`   POST   http://localhost:${PORT}/api/detect`);
    console.log(`\n🌐 Open frontend: http://localhost:${PORT}`);
  });
}

module.exports = app;
