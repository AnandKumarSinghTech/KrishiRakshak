

const Disease    = require('../models/Disease');
const hindiTagMap = require('../data/hindiTagMap');

function normalise(str) {
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function expandKeyword(keyword) {
  const expanded = [keyword]; 

  for (const [hindiKey, englishVal] of Object.entries(hindiTagMap)) {
    if (
      hindiKey.includes(keyword) ||      
      keyword.includes(hindiKey)          
    ) {
      if (!expanded.includes(englishVal)) {
        expanded.push(englishVal);
      }
    }
  }

  for (const [hindiKey, englishVal] of Object.entries(hindiTagMap)) {
    if (
      englishVal.includes(keyword) ||    
      keyword.includes(englishVal)
    ) {
      if (!expanded.includes(hindiKey)) {
        expanded.push(hindiKey);
      }
    }
  }

  return expanded;
}

const searchDiseases = async (req, res) => {
  try {
    
    const rawQuery = (req.query.query || '').trim();
    const lang     = (req.query.lang  || 'en').toLowerCase(); 
    const cropFilter = (req.query.crop || '').trim().toLowerCase();

    if (!rawQuery) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide a search query (?query=...)',
      });
    }

    console.log(`\n🔍 Bilingual Search:`);
    console.log(`   Query : "${rawQuery}"`);
    console.log(`   Lang  : ${lang}`);
    console.log(`   Crop  : ${cropFilter || 'all'}`);

    // ── Step 2: Split query into keywords ─────────────────
    // Example: "yellow spots, dry leaves" → ["yellow spots", "dry leaves"]
    const rawKeywords = rawQuery
      .split(/[,،\s]+/)   // split on commas, Arabic comma, or spaces
      .map(k => normalise(k))
      .filter(k => k.length > 1); // skip single characters

    // Remove duplicate keywords
    const uniqueKeywords = [...new Set(rawKeywords)];
    console.log(`   Keywords: [${uniqueKeywords.join(', ')}]`);

    // ── Step 3: Expand each keyword (Hindi ↔ English) ─────
    const allTerms = [];
    for (const kw of uniqueKeywords) {
      const expanded = expandKeyword(kw);
      for (const term of expanded) {
        if (!allTerms.includes(term)) allTerms.push(term);
      }
    }
    console.log(`   Expanded: [${allTerms.join(', ')}]`);

    // ── Step 4: Build MongoDB $or regex query ─────────────
    // For every expanded term, we search across:
    //   - tags        (the symptom keyword array)
    //   - diseaseName (the disease name)
    //   - description (optional – broader matching)
    //
    // $regex with $options: 'i' makes it case-insensitive
    // Using the term directly in regex allows PARTIAL matching:
    //   term "yellow" will match "yellow spots", "yellow stripes", etc.
    const regexConditions = allTerms.flatMap(term => {
      const safeRegex = escapeRegex(term);
      return [
        { tags:        { $regex: safeRegex, $options: 'i' } },
        { diseaseName: { $regex: safeRegex, $options: 'i' } },
        { description: { $regex: safeRegex, $options: 'i' } },
      ];
    });

    // ── Step 5: Build the full query object ───────────────
    const dbQuery = { $or: regexConditions };

    // Optionally filter by crop name
    if (cropFilter) {
      dbQuery.cropName = cropFilter;
    }

    // ── Step 6: Execute MongoDB search ────────────────────
    const results = await Disease.find(dbQuery)
      .select('-__v')          // exclude internal version field
      .limit(20)               // max 20 results to keep response fast
      .lean();                 // return plain JS objects (faster)

    console.log(`   ✅ Found: ${results.length} result(s)`);

    // ── Step 7: Handle no results ─────────────────────────
    if (results.length === 0) {
      return res.status(200).json({
        success:  true,
        query:    rawQuery,
        count:    0,
        diseases: [],
        message:
          lang === 'hi'
            ? `❌ "${rawQuery}" के लिए कोई बीमारी नहीं मिली। कृपया अलग शब्द आज़माएं।`
            : `❌ No disease found matching "${rawQuery}". Try different keywords.`,
      });
    }

    // ── Step 8: Format results ────────────────────────────
    // We return all standard English fields (that's what the DB stores).
    // The 'lang' param is kept in the response so the frontend
    // can choose how to display bilingual UI labels.
    const formatted = results.map(d => ({
      _id:         d._id,
      cropName:    d.cropName,
      diseaseName: d.diseaseName,
      tags:        d.tags,
      description: d.description,
      symptoms:    d.symptoms,
      prevention:  d.prevention,
      treatment:   d.treatment,
      severity:    d.severity,
    }));

    // ── Step 9: Return response ────────────────────────────
    return res.status(200).json({
      success:  true,
      query:    rawQuery,
      lang:     lang,
      count:    formatted.length,
      diseases: formatted,
      message:
        lang === 'hi'
          ? `✅ "${rawQuery}" के लिए ${formatted.length} बीमारी/कीट मिले।`
          : `✅ Found ${formatted.length} result(s) for "${rawQuery}".`,
    });

  } catch (error) {
    console.error('❌ Search error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error during search.',
      error:   error.message,
    });
  }
};

module.exports = { searchDiseases };
