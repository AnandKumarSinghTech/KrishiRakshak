

const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema(
  {

    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',   
      required: [true, 'userId is required'],
    },

    cropName: {
      type:      String,
      required:  [true, 'cropName is required'],
      lowercase: true,
      trim:      true,
    },

    diseaseName: {
      type:     String,
      required: [true, 'diseaseName is required'],
      trim:     true,
    },

    description: {
      type:    String,
      default: '',
    },

    // Recommended treatment
    treatment: {
      type:    String,
      default: '',
    },

    // Risk level of the disease
    severity: {
      type:    String,
      enum:    ['Low', 'Medium', 'High', 'Unknown'],
      default: 'Unknown',
    },

    imagePath: {
      type:    String,
      default: null,
    },

    village: {
      type:    String,
      default: '',
      trim:    true,
    },

    // GPS coordinates (optional, for map features)
    latitude: {
      type:    Number,
      default: null,
    },
    longitude: {
      type:    Number,
      default: null,
    },

    // The symptom tag(s) the user typed when scanning
    tagUsed: {
      type:    String,
      default: '',
    },
  },

  // Automatically adds createdAt and updatedAt fields
  { timestamps: true }
);

// Export the model (creates "scans" collection in MongoDB)
module.exports = mongoose.model('Scan', scanSchema);
