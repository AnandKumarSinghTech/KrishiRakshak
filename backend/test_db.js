const mongoose = require('mongoose');

const uri = 'mongodb+srv://anandsingh156:anandsingh%40123@cluster0.qn9z2fk.mongodb.net/krishirakshak?appName=Cluster0';

mongoose.connect(uri)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILED to connect to MongoDB Atlas:', err.message);
    process.exit(1);
  });
