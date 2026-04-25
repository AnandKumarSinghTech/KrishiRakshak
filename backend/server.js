

const express        = require('express');
const mongoose       = require('mongoose');
const dotenv         = require('dotenv');
const cors           = require('cors');
const path           = require('path');
const session        = require('express-session');  
const passport       = require('passport');          

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret:            process.env.JWT_SECRET || 'kisanrakshak_session_secret',
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

app.use('/api/auth', authRoutes);

app.use('/api/auth/google', googleAuthRouter);

app.use('/api', detectRoutes);

app.use('/api', searchRoutes);

app.use('/api/scans', scanRoutes);

app.use('/api/alerts', alertRoutes);

app.get('/api', (req, res) => {
  res.json({
    message:   '🌾 KisanRakshak API is running!',
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

const PORT      = process.env.PORT     || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kisanrakshak';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log(`📍 Database: ${MONGO_URI}`);

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`\n📋 Available Endpoints:`);
      console.log(`   POST   http://localhost:${PORT}/api/auth/register`);
      console.log(`   POST   http://localhost:${PORT}/api/auth/login`);
      console.log(`   GET    http://localhost:${PORT}/api/auth/google   ← Google OAuth`);
      console.log(`   POST   http://localhost:${PORT}/api/detect`);
      console.log(`   GET    http://localhost:${PORT}/api/diseases/:cropName`);
      console.log(`   GET    http://localhost:${PORT}/api/search?query=yellow+spots  ← Bilingual Search`);
      console.log(`   GET    http://localhost:${PORT}/api/scans/:userId  ← Scan History`);
      console.log(`   DELETE http://localhost:${PORT}/api/scans/:id`);
      console.log(`   GET    http://localhost:${PORT}/api/alerts/:userId ← Weather Alerts`);
      console.log(`\n🌐 Open frontend: http://localhost:${PORT}`);

      if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') {
        console.log(`\n⚠️  Google OAuth not configured yet!`);
        console.log(`   Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env file`);
        console.log(`   Guide: https://console.cloud.google.com/`);
      } else {
        console.log(`\n✅ Google OAuth is configured!`);
      }
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('💡 Make sure MongoDB is running!');
  });

module.exports = app;
