

const User  = require('../models/User');
const Alert = require('../models/Alert');
const Scan  = require('../models/Scan');
const https = require('https');

function runPredictionRules(weather, userCrop) {
  const { temperature, humidity, rain, windSpeed } = weather;
  const alerts = [];

  if (humidity >= 80 && rain > 2) {
    const affectedCrops = userCrop
      ? [userCrop, 'potato', 'tomato'].filter((v, i, a) => a.indexOf(v) === i)
      : ['tomato', 'potato', 'wheat', 'rice'];

    alerts.push({
      alertType:         'FUNGAL_HIGH',
      riskLevel:         'High',
      icon:              '🍄',
      predictedDiseases: ['High Fungal Outbreak Risk'],
      affectedCrops,
      message:           `Critical weather: ${humidity}% humidity and ${rain}mm rain. Ideal conditions for severe fungal outbreak.`,
      cropSpecificMsg:   userCrop
        ? `High humidity detected. Immediate risk of fungal disease in your ${userCrop} crop (e.g. Late Blight).`
        : null,
      suggestedAction:   'Apply preventive fungicide (Mancozeb 75% WP @ 2.5g/L). Ensure good field drainage.',
    });
  } else if (humidity >= 70 && rain > 0) {
    alerts.push({
      alertType:         'FUNGAL_MEDIUM',
      riskLevel:         'Medium',
      icon:              '🍄',
      predictedDiseases: ['Fungal Leaf Spot Advisory'],
      affectedCrops:     userCrop ? [userCrop, 'wheat', 'cotton'] : ['wheat', 'cotton', 'maize'],
      message:           `Elevated moisture: ${humidity}% humidity with light rain. Medium risk of leaf diseases.`,
      cropSpecificMsg:   userCrop
        ? `Moderate humidity detected. Watch your ${userCrop} crop for early signs of Powdery Mildew.`
        : null,
      suggestedAction:   'Monitor crops daily. Spray neem oil (5ml/L) as a preventive measure.',
    });
  }

  if (temperature >= 35) {
    alerts.push({
      alertType:         'PEST_HIGH',
      riskLevel:         'High',
      icon:              '🦟',
      predictedDiseases: ['Severe Heat Pest Infestation'],
      affectedCrops:     userCrop ? [userCrop, 'cotton', 'tomato'] : ['cotton', 'tomato', 'onion', 'maize'],
      message:           `Extreme heat (${temperature}°C). Very high risk of rapid pest multiplication (Aphids, Whitefly).`,
      cropSpecificMsg:   userCrop
        ? `High heat (${temperature}°C) creates ideal conditions for Aphids on your ${userCrop}.`
        : null,
      suggestedAction:   'Install yellow sticky traps immediately. Spray Imidacloprid 17.8 SL @ 0.3ml/L if pests are spotted.',
    });
  } else if (temperature >= 30 && humidity < 50) {
    alerts.push({
      alertType:         'PEST_MEDIUM',
      riskLevel:         'Medium',
      icon:              '🦟',
      predictedDiseases: ['Dry Heat Pest Warning'],
      affectedCrops:     userCrop ? [userCrop, 'cotton', 'onion'] : ['cotton', 'tomato', 'onion'],
      message:           `Warm & dry conditions (${temperature}°C). Moderate risk for Thrips and Leaf Miners.`,
      cropSpecificMsg:   userCrop
        ? `Temperature at ${temperature}°C. Inspect your ${userCrop} crop for early pest activity.`
        : null,
      suggestedAction:   'Use pheromone traps for early monitoring. Irrigate field to reduce dry stress.',
    });
  }

  if (temperature >= 25 && temperature < 35 && humidity >= 65) {
    alerts.push({
      alertType:         'BACTERIAL_MEDIUM',
      riskLevel:         'Medium',
      icon:              '🦠',
      predictedDiseases: ['Bacterial Blight Condition'],
      affectedCrops:     userCrop ? [userCrop, 'rice', 'cotton'] : ['rice', 'cotton', 'potato'],
      message:           `Warm & Humid (${temperature}°C, ${humidity}%). Favorable for bacterial disease spread.`,
      cropSpecificMsg:   userCrop
        ? `Warm humid weather raises Bacterial Leaf Blight risk in your ${userCrop} field.`
        : null,
      suggestedAction:   'Avoid overhead irrigation. Apply copper-based bactericide if leaf lesions appear.',
    });
  }

  if (windSpeed >= 15) {
    const risk = windSpeed >= 25 ? 'High' : 'Medium';
    alerts.push({
      alertType:         'WIND_SPREAD',
      riskLevel:         risk,
      icon:              '💨',
      predictedDiseases: ['Airborne Spore Transmission'],
      affectedCrops:     userCrop ? [userCrop, 'wheat', 'rice'] : ['wheat', 'rice', 'barley'],
      message:           `High Winds (${windSpeed} km/h). Strong potential for airborne spread of fungal spores (e.g. Rust).`,
      cropSpecificMsg:   userCrop
        ? `Wind at ${windSpeed} km/h may carry pathogenic spores into your ${userCrop} field.`
        : null,
      suggestedAction:   'Postpone any chemical spraying until winds subside. Inspect downwind field boundaries.',
    });
  }

  if (temperature <= 10) {
    alerts.push({
      alertType:         'COLD_HIGH',
      riskLevel:         'High',
      icon:              '🥶',
      predictedDiseases: ['Frost Damage Warning'],
      affectedCrops:     userCrop ? [userCrop, 'tomato', 'rice'] : ['tomato', 'rice', 'maize', 'cotton'],
      message:           `Freezing temperatures (${temperature}°C). High risk of cellular frost damage to crops.`,
      cropSpecificMsg:   userCrop
        ? `Temperature dropped to ${temperature}°C. Your ${userCrop} crop is at immediate risk of frost.`
        : null,
      suggestedAction:   'Cover sensitive crops at night. Light irrigation can help soil retain heat.',
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      alertType:         'ALL_CLEAR',
      riskLevel:         'Low',
      icon:              '✅',
      predictedDiseases: ['Optimal Weather Conditions'],
      affectedCrops:     userCrop ? [userCrop] : ['wheat', 'rice', 'cotton', 'tomato'],
      message:           `Weather is stable (${temperature}°C, ${humidity}% humidity, Wind ${windSpeed}km/h). No major threat detected.`,
      cropSpecificMsg:   userCrop
        ? `Your ${userCrop} crop is safe today under current weather conditions.`
        : null,
      suggestedAction:   'Continue regular crop monitoring and standard field maintenance.',
    });
  }

  return alerts;
}

async function isDuplicate(userId, alertType) {
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

  const existing = await Alert.findOne({
    userId,
    alertType,
    createdAt: { $gte: sixHoursAgo },  
  });

  return !!existing;  
}

function fetchWeatherData(lat, lon) {
  return new Promise((resolve, reject) => {
    const path =
      `/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code` +
      `&timezone=auto`;

    const options = {
      hostname: 'api.open-meteo.com',
      path,
      method: 'GET',
    };

    console.log(`🌤️ Fetching weather: lat=${lat}, lon=${lon}`);

    const req = https.get(options, (response) => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        try {
          const parsed  = JSON.parse(data);
          const current = parsed.current;

          const weather = {
            temperature: Math.round(current.temperature_2m),
            humidity:    Math.round(current.relative_humidity_2m),
            rain:        current.precipitation || 0,
            windSpeed:   Math.round(current.wind_speed_10m),
            condition:   getConditionName(current.weather_code),
            weatherCode: current.weather_code,
          };

          console.log(`✅ Weather: ${weather.temperature}°C, ${weather.humidity}% RH, ${weather.rain}mm, ${weather.windSpeed}km/h – ${weather.condition}`);
          resolve(weather);
        } catch (err) {
          reject(new Error('Failed to parse weather response: ' + err.message));
        }
      });
    });

    req.on('error', (err) => reject(new Error('Open-Meteo request failed: ' + err.message)));
    req.setTimeout(8000, () => {
      req.abort();
      reject(new Error('Weather API timed out'));
    });
  });
}

function getConditionName(code) {
  const map = {
    0:'Clear sky', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
    45:'Foggy', 48:'Icy fog',
    51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
    61:'Light rain', 63:'Moderate rain', 65:'Heavy rain',
    71:'Light snow', 73:'Moderate snow', 75:'Heavy snow',
    80:'Rain showers', 81:'Moderate showers', 82:'Violent showers',
    95:'Thunderstorm', 96:'Thunderstorm + hail',
  };
  return map[code] || 'Unknown';
}

function geocodeVillage(villageName) {
  return new Promise((resolve) => {
    const query = encodeURIComponent(villageName + ', India');
    const options = {
      hostname: 'nominatim.openstreetmap.org',
      path:     `/search?q=${query}&format=json&limit=1`,
      method:   'GET',
      headers:  { 'User-Agent': 'KrishiRakshak/2.0' },
    };

    console.log(`📍 Geocoding: "${villageName}"`);

    const req = https.get(options, (response) => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        try {
          const results = JSON.parse(data);
          if (results.length > 0) {
            const { lat, lon } = results[0];
            console.log(`✅ Geocoded "${villageName}" → lat=${lat}, lon=${lon}`);
            resolve({ lat: parseFloat(lat), lon: parseFloat(lon) });
          } else {
            console.log(`⚠️ "${villageName}" not found, using Delhi fallback`);
            resolve({ lat: 28.6139, lon: 77.2090 });  
          }
        } catch {
          resolve({ lat: 28.6139, lon: 77.2090 });
        }
      });
    });
    req.on('error', () => resolve({ lat: 28.6139, lon: 77.2090 }));
    req.setTimeout(6000, () => { req.abort(); resolve({ lat: 28.6139, lon: 77.2090 }); });
  });
}

const getAlert = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`\n🔔 Alert generation started for user: ${userId}`);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: '❌ User not found.' });
    }

    const village = user.village || 'Delhi';
    console.log(`📍 User location: "${village}"`);

    let userCrop = user.crop || null;
    try {
      const lastScan = await Scan.findOne({ userId }).sort({ createdAt: -1 });
      if (lastScan?.cropName) {
        userCrop = lastScan.cropName;
        console.log(`🌾 Last scanned crop: ${userCrop}`);
      }
    } catch (e) {
      
    }

    const { lat, lon } = await geocodeVillage(village);

    let weather;
    try {
      weather = await fetchWeatherData(lat, lon);
    } catch (err) {
      console.error('❌ Weather fetch failed:', err.message);
      return res.status(503).json({
        success: false,
        message: '❌ Could not fetch weather data. Check internet connection.',
        error:   err.message,
      });
    }

    const predictions = runPredictionRules(weather, userCrop);
    console.log(`📊 Generated ${predictions.length} prediction(s)`);

    let savedCount  = 0;
    let skippedCount = 0;

    for (const pred of predictions) {
      
      const dup = await isDuplicate(userId, pred.alertType);

      if (dup) {
        
        console.log(`⏭️  Skipping duplicate alert: ${pred.alertType}`);
        skippedCount++;
        continue;
      }

      const newAlert = new Alert({
        userId,
        alertType:         pred.alertType,
        village,
        latitude:          lat,
        longitude:         lon,
        weatherData:       weather,
        riskLevel:         pred.riskLevel,
        icon:              pred.icon,
        predictedDiseases: pred.predictedDiseases,
        affectedCrops:     pred.affectedCrops,
        message:           pred.cropSpecificMsg || pred.message,
        generalMessage:    pred.message,
        suggestedAction:   pred.suggestedAction,
      });

      await newAlert.save();
      savedCount++;
      console.log(`✅ Saved alert: ${pred.alertType} (${pred.riskLevel} risk)`);
    }

    console.log(`📨 Done: ${savedCount} saved, ${skippedCount} skipped (duplicates)`);

    return res.status(200).json({
      success:     true,
      village,
      weather,
      predictions,           
      savedCount,
      skippedCount,
      userCrop,
    });

  } catch (error) {
    console.error('❌ getAlert error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error while generating alert.',
      error:   error.message,
    });
  }
};

const getRecentAlerts = async (req, res) => {
  try {
    const { userId } = req.params;
    const days = parseInt(req.query.days) || 5;  

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    console.log(`📋 Fetching alerts for user ${userId} since ${sinceDate.toDateString()}`);

    const alerts = await Alert.find({
      userId,
      createdAt: { $gte: sinceDate },  
    })
      .sort({ createdAt: -1 })  
      .lean();

    console.log(`✅ Found ${alerts.length} recent alerts`);

    return res.status(200).json({
      success: true,
      count:   alerts.length,
      alerts,
    });

  } catch (error) {
    console.error('❌ getRecentAlerts error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error while fetching recent alerts.',
    });
  }
};

const getAlertHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 20;

    const alerts = await Alert.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      count:   alerts.length,
      alerts,
    });

  } catch (error) {
    console.error('❌ getAlertHistory error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error while fetching alert history.',
    });
  }
};

module.exports = { getAlert, getRecentAlerts, getAlertHistory };
