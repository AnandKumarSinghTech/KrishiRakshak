

const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'userId is required'],
    },

    alertType: {
      type:    String,
      default: 'GENERAL',
      trim:    true,
    },

    icon: {
      type:    String,
      default: '⚠️',
    },

    village: {
      type:    String,
      default: 'Unknown Location',
      trim:    true,
    },

    latitude:  { type: Number, default: null },
    longitude: { type: Number, default: null },

    weatherData: {
      temperature: { type: Number, default: null },  
      humidity:    { type: Number, default: null },  
      rain:        { type: Number, default: 0 },     
      windSpeed:   { type: Number, default: null },  
      condition:   { type: String, default: '' },    // e.g. "Moderate rain"
    },

    // Risk level for this specific prediction
    riskLevel: {
      type:    String,
      enum:    ['Low', 'Medium', 'High'],
      default: 'Low',
    },

    message: {
      type:    String,
      default: '',
    },

    // General (non-crop-specific) fallback message
    generalMessage: {
      type:    String,
      default: '',
    },

    // What farmer should do
    suggestedAction: {
      type:    String,
      default: '',
    },

    // List of diseases predicted
    predictedDiseases: {
      type:    [String],
      default: [],
    },

    // Crops affected by this alert
    affectedCrops: {
      type:    [String],
      default: [],
    },
  },

  // Automatically adds createdAt and updatedAt
  { timestamps: true }
);

// ── Index for fast deduplication query ────────────────────
// When we check "did this alertType already save in last 6 hours?"
// this index makes that query fast
alertSchema.index({ userId: 1, alertType: 1, createdAt: -1 });

// Export model (creates "alerts" collection in MongoDB)
module.exports = mongoose.model('Alert', alertSchema);
