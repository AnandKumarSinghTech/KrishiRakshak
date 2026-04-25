

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,  
    },

    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true, 
      trim:      true,
    },

    password: {
      type:     String,
      required: false,   
      default:  null,
    },

    googleId: {
      type:   String,
      default: null,
      sparse:  true,  
    },

    profilePic: {
      type:    String,
      default: '',
    },

    // Optional farmer details
    phone: {
      type:    String,
      default: '',
    },

    village: {
      type:    String,
      default: '',
      trim:    true,
    },

    // Main crop this farmer grows
    crop: {
      type:    String,
      default: 'wheat',
      enum:    ['wheat', 'rice', 'maize', 'cotton', 'tomato', 'potato', 'onion'],
    },

    land: {
      type:    Number,
      default: 0,
    },
  },

  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  
  if (!this.password) return next();

  if (!this.isModified('password')) return next();

  if (this.password && this.password.startsWith('GOOGLE_OAUTH_')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  
  if (!this.password) return false;

  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
