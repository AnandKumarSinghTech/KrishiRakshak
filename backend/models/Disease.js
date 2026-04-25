

const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema(
  {

    cropName: {
      type:      String,
      required:  [true, 'cropName is required'],
      lowercase: true,
      trim:      true,
      index:     true, 
    },

    diseaseName: {
      type:     String,
      required: [true, 'diseaseName is required'],
      trim:     true,
    },

    tags: {
      type:     [String],  
      required: [true, 'tags array is required'],
      default:  [],
    },

    description: {
      type:    String,
      default: '',
    },

    // What the farmer sees on the plant
    symptoms: {
      type:    String,
      default: '',
    },

    // How to prevent it (cultural practices, resistant varieties)
    prevention: {
      type:    String,
      default: '',
    },

    // How to treat it (pesticides, fungicides, cultural control)
    treatment: {
      type:    String,
      default: '',
    },

    // Severity level: High / Medium / Low
    severity: {
      type:    String,
      enum:    ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Disease', diseaseSchema);
