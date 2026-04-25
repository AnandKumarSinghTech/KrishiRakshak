

const Disease    = require('../models/Disease');
const Scan        = require('../models/Scan');   
const hindiTagMap = require('../data/hindiTagMap'); 
const path        = require('path');

const detectDisease = async (req, res) => {
  try {
    
    const cropName = req.body.cropName;  
    const tag      = req.body.tag;       

    if (!cropName) {
      return res.status(400).json({
        success: false,
        message: '❌ cropName is required.',
      });
    }

    if (!tag || tag.trim() === '') {
      return res.status(400).json({
        success: false,
        message: '❌ tag (symptom description) is required.',
      });
    }

    // ── Step 3: Handle uploaded image ────────────────────
    // req.file is set by multer middleware
    // If no file was uploaded, imagePath will be null
    let imagePath = null;
    if (req.file) {
      // Store relative URL path so frontend can display it
      // Example: /uploads/crop-1703123456789.jpg
      imagePath = '/uploads/' + req.file.filename;
      console.log(`📸 Image saved: ${req.file.filename}`);
    }

    // ── Step 4: Run the detection logic ────────────────────────
    const detectionResult = await findMatchingDiseases(cropName, tag);

    // ── Step 5: Auto-save scan to MongoDB (if userId provided) ──
    // The frontend sends userId as a hidden form field after login.
    // If missing, we skip saving (guest/offline mode).
    const userId  = req.body.userId  || null;
    const village = req.body.village || '';
    const lat     = req.body.latitude  ? parseFloat(req.body.latitude)  : null;
    const lon     = req.body.longitude ? parseFloat(req.body.longitude) : null;

    if (userId && detectionResult.results.length > 0) {
      // Save each matched disease as a separate scan record
      // (e.g. if 3 diseases matched, save 3 scan documents)
      const scanPromises = detectionResult.results.map(disease => {
        const newScan = new Scan({
          userId,
          cropName:    cropName.toLowerCase(),
          diseaseName: disease.diseaseName,
          description: disease.description || '',
          treatment:   disease.treatment   || '',
          severity:    disease.severity    || 'Unknown',
          imagePath:   imagePath,
          village,
          latitude:    lat,
          longitude:   lon,
          tagUsed:     tag,
        });
        return newScan.save();
      });

      await Promise.all(scanPromises);
      console.log(`✅ ${detectionResult.results.length} scan(s) saved to MongoDB for user: ${userId}`);
    }

    return res.status(200).json({
      success:   true,
      cropName:  cropName.toLowerCase(),
      tagUsed:   tag,
      imagePath: imagePath,
      results:   detectionResult.results,
      isFallback: detectionResult.isFallback,
      message:   detectionResult.isFallback
        ? `⚠ No exact match for "${tag}". Showing general diseases for ${cropName}.`
        : `✅ Found ${detectionResult.results.length} matching disease(s) for "${tag}" in ${cropName}.`,
    });

  } catch (error) {
    console.error('Detection error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error during disease detection.',
      error:   error.message,
    });
  }
};

async function findMatchingDiseases(cropName, tagInput) {

  const normalizedCrop = cropName.toLowerCase().trim();

  const rawKeywords = tagInput
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(t => t.length > 0);

  const tagKeywords = [];
  for (const kw of rawKeywords) {
    if (!tagKeywords.includes(kw)) tagKeywords.push(kw);

    for (const [hindiKey, englishVal] of Object.entries(hindiTagMap)) {
      const hLow = hindiKey.toLowerCase();
      if (hLow.includes(kw) || kw.includes(hLow)) {
        if (!tagKeywords.includes(englishVal.toLowerCase()))
          tagKeywords.push(englishVal.toLowerCase());
      }
    }

    for (const [hindiKey, englishVal] of Object.entries(hindiTagMap)) {
      const eLow = englishVal.toLowerCase();
      if (eLow.includes(kw) || kw.includes(eLow)) {
        if (!tagKeywords.includes(hindiKey.toLowerCase()))
          tagKeywords.push(hindiKey.toLowerCase());
      }
    }
  }

  console.log(`\n🔍 Detection Request:`);
  console.log(`   Crop    : ${normalizedCrop}`);
  console.log(`   Raw Tags: ${rawKeywords.join(', ')}`);
  console.log(`   Expanded: ${tagKeywords.join(', ')}`);
  
  const allCropDiseases = await Disease.find({
    cropName: normalizedCrop,
  });

  if (!allCropDiseases.length) {
    console.log(`   ⚠ No diseases found for crop: ${normalizedCrop}`);
    return { results: [], isFallback: false };
  }

  console.log(`   📚 Total diseases in DB for ${normalizedCrop}: ${allCropDiseases.length}`);

  const matchedDiseases = allCropDiseases.filter(disease => {
    
    const diseaseTags = disease.tags.map(t => t.toLowerCase());

    return tagKeywords.some(keyword =>
      diseaseTags.some(diseaseTag =>
        
        diseaseTag.includes(keyword) || keyword.includes(diseaseTag)
      )
    );
  });

  console.log(`   ✅ Matched diseases: ${matchedDiseases.length}`);

  if (matchedDiseases.length > 0) {
    
    return {
      isFallback: false,
      results: matchedDiseases.map(d => ({
        diseaseName:  d.diseaseName,
        description:  d.description,
        symptoms:     d.symptoms,
        prevention:   d.prevention,
        treatment:    d.treatment,
        severity:     d.severity,
        tags:         d.tags,
        matched:      true,
      })),
    };
  }

  console.log(`   ⚠ No exact match. Returning fallback diseases.`);
  const fallbackDiseases = allCropDiseases.slice(0, 2);

  return {
    isFallback: true,
    results: fallbackDiseases.map(d => ({
      diseaseName: d.diseaseName,
      description: d.description,
      symptoms:    d.symptoms,
      prevention:  d.prevention,
      treatment:   d.treatment,
      severity:    d.severity,
      tags:        d.tags,
      matched:     false, 
    })),
  };
}

const getDiseases = async (req, res) => {
  try {
    const { cropName } = req.params;

    const diseases = await Disease.find({
      cropName: cropName.toLowerCase(),
    }).select('-__v'); 

    if (!diseases.length) {
      return res.status(404).json({
        success: false,
        message: `❌ No diseases found for crop: ${cropName}`,
      });
    }

    return res.status(200).json({
      success:  true,
      crop:     cropName.toLowerCase(),
      count:    diseases.length,
      diseases: diseases,
    });

  } catch (error) {
    console.error('getDiseases error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error while fetching diseases.',
      error:   error.message,
    });
  }
};

module.exports = { detectDisease, getDiseases };
