

const AppState = {
  currentUser: null,
  lang: 'en',
  theme: 'light',
  weatherData: null,
  userLat: null,
  userLon: null,
  userCity: 'Your Location',
  detectedDisease: null,
  previewImageUrl: null,
  
  tags: []          
};

const API_BASE = 'http://localhost:5000/api';

const T = {
  en: {
    loginSubtitle: 'Real-Time Pest & Disease Alert System for Farmers',
    googleBtnText: 'Continue with Google',
    orText: 'or login with email',
    labelEmail: '📧 Email',
    labelPassword: '🔒 Password',
    rememberText: 'Remember me',
    loginBtn: '🚪 Login',
    registerTitle: 'Create Your Account',
    labelName: '👤 Full Name',
    labelPhone: '📱 Phone',
    labelVillage: '🏘 Village / City',
    labelMainCrop: '🌾 Main Crop',
    registerBtn: '✅ Register',
    navBrand: 'KisanRakshak',
    navHome: '🏠 Home',
    navDetect: '🔬 Pest Detection',
    navAlerts: '⚠ Alerts',
    navGuidance: '📚 Guidance',
    navSchemes: '🏛 Gov Schemes',
    navProfile: '👤 Profile',
    logoutBtn: '🚪 Logout',
    welcomeMsg: '🌻 Welcome back, Farmer!',
    welcomeSub: "Here is your farm's daily health summary.",
    cardWeatherTitle: 'Weather Today',
    refreshWeather: '🔄 Refresh',
    cardAlertTitle: 'Active Pest Alerts',
    alertCardSub: 'alerts in your region',
    cardHealthTitle: 'Crop Health',
    cardDetectTitle: 'Quick Scan',
    cardDetectSub: 'Upload a photo of your crop to detect pests or diseases instantly.',
    scanNowBtn: '📷 Scan Now',
    riskTitle: "🌡 Disease Risk Based on Today's Weather",
    historyTitle: '📋 Recent Scan History',
    noHistoryText: 'No scans yet. Upload a crop image to get started!',
    detectTitle: '🔬 Crop Disease & Pest Detection',
    detectSub: 'Upload a photo of your crop leaf or plant. Our system will match diseases from our database.',
    uploadTitle: '📷 Upload Crop Image',
    uploadHint: 'Click to select image or drag & drop here',
    selectCropLabel: '🌾 Select Crop Type',
    tagInputLabel: '🏷 Enter Symptom / Tag',
    detectBtn: '🔍 Detect Pest / Disease',
    removeImgBtn: '✖ Remove',
    resultTitle: '📊 Detection Result',
    resultPlaceholderText: 'Upload an image and click "Detect" to see results here.',
    saveScanBtn: '💾 Save to History',
    alertsTitle: '⚠ Pest & Disease Alerts Dashboard',
    alertsSub: 'Regional alerts updated daily. Stay ahead of outbreaks.',
    allCropsOpt: '🌾 All Crops',
    allSeverityOpt: '⚡ All Severity',
    applyFilterBtn: '🔍 Filter',
    guidanceTitle: '📚 Farming Guidance & Tips',
    guidanceSub: 'Filter tips by crop and learn best practices to keep your fields healthy.',
    allCatOpt: '📂 All Categories',
    schemesTitle: '🏛 Government Schemes for Farmers',
    schemesSub: 'Know your rights and benefits. Apply for subsidies and support.',
    profileTitle: '👤 My Farmer Profile',
    editProfileTitle: '✏ Edit Profile',
    labelEditName: '👤 Name',
    labelEditPhone: '📱 Phone',
    labelEditVillage: '🏘 Village',
    labelEditCrop: '🌾 Main Crop',
    labelEditLand: '🏞 Land Area (acres)',
    saveProfileBtn: '💾 Save Changes',
    statScansLabel: 'Scans',
    statAlertsLabel: 'Alerts Seen',
    historySectionTitle: '📋 My Scan History',
    noProfileHistoryText: 'No scans yet.',
    footerTagline: 'Protecting farmers with technology.',
    footerHelpTitle: '📞 Help & Support',
    footerLinksTitle: 'Quick Links',
    footerCopy: '© 2024 KisanRakshak. Made with ❤ for Indian Farmers.',
    loginSuccess: '✅ Login successful! Welcome back.',
    loggedOut: '👋 Logged out successfully.',
    profileSaved: '✅ Profile saved!',
    scanSaved: '✅ Scan saved to history!',
    registerSuccess: '✅ Registration successful! Please login.',
    invalidCreds: '❌ Invalid email or password.',
    fillFields: '⚠ Please fill all required fields.',
    pwMin: '⚠ Password must be at least 6 characters.',
    emailExists: '⚠ This email is already registered.',
    uploadImg: '⚠ Please upload a crop image first.',
    addTag: '⚠ Please add at least one symptom tag.',
    loadingDetect: 'Analyzing image… please wait',
    googleSimMsg: '🔑 Simulated Google login (demo mode)',
    loadingText: 'Analyzing image… please wait',
  },
  hi: {
    loginSubtitle: 'किसानों के लिए रियल-टाइम कीट और रोग अलर्ट प्रणाली',
    googleBtnText: 'Google से जारी रखें',
    orText: 'या ईमेल से लॉगिन करें',
    labelEmail: '📧 ईमेल',
    labelPassword: '🔒 पासवर्ड',
    rememberText: 'मुझे याद रखें',
    loginBtn: '🚪 लॉगिन करें',
    registerTitle: 'अपना खाता बनाएं',
    labelName: '👤 पूरा नाम',
    labelPhone: '📱 फोन',
    labelVillage: '🏘 गाँव / शहर',
    labelMainCrop: '🌾 मुख्य फसल',
    registerBtn: '✅ पंजीकरण करें',
    navBrand: 'किसान रक्षक',
    navHome: '🏠 होम',
    navDetect: '🔬 कीट जांच',
    navAlerts: '⚠ अलर्ट',
    navGuidance: '📚 मार्गदर्शन',
    navSchemes: '🏛 सरकारी योजनाएं',
    navProfile: '👤 प्रोफाइल',
    logoutBtn: '🚪 लॉगआउट',
    welcomeMsg: '🌻 वापस स्वागत है, किसान भाई!',
    welcomeSub: 'यहाँ आपके खेत का आज का स्वास्थ्य सारांश है।',
    cardWeatherTitle: 'आज का मौसम',
    refreshWeather: '🔄 ताज़ा करें',
    cardAlertTitle: 'सक्रिय कीट अलर्ट',
    alertCardSub: 'आपके क्षेत्र में अलर्ट',
    cardHealthTitle: 'फसल स्वास्थ्य',
    cardDetectTitle: 'त्वरित स्कैन',
    cardDetectSub: 'कीट या रोग तुरंत पता करने के लिए फसल की फोटो अपलोड करें।',
    scanNowBtn: '📷 अभी स्कैन करें',
    riskTitle: '🌡 आज के मौसम के आधार पर रोग जोखिम',
    historyTitle: '📋 हालिया स्कैन इतिहास',
    noHistoryText: 'अभी तक कोई स्कैन नहीं। शुरू करने के लिए फसल की छवि अपलोड करें!',
    detectTitle: '🔬 फसल रोग और कीट जांच',
    detectSub: 'अपनी फसल की पत्ती या पौधे की फोटो अपलोड करें।',
    uploadTitle: '📷 फसल छवि अपलोड करें',
    uploadHint: 'छवि चुनने के लिए क्लिक करें या यहाँ खींचें और छोड़ें',
    selectCropLabel: '🌾 फसल का प्रकार चुनें',
    tagInputLabel: '🏷 लक्षण / टैग दर्ज करें',
    detectBtn: '🔍 कीट / रोग पहचानें',
    removeImgBtn: '✖ हटाएं',
    resultTitle: '📊 जांच परिणाम',
    resultPlaceholderText: 'परिणाम देखने के लिए एक छवि अपलोड करें और "जांच करें" दबाएं।',
    saveScanBtn: '💾 इतिहास में सहेजें',
    alertsTitle: '⚠ कीट और रोग अलर्ट डैशबोर्ड',
    alertsSub: 'क्षेत्रीय अलर्ट रोज़ाना अपडेट। प्रकोप से आगे रहें।',
    allCropsOpt: '🌾 सभी फसलें',
    allSeverityOpt: '⚡ सभी गंभीरता',
    applyFilterBtn: '🔍 फ़िल्टर करें',
    guidanceTitle: '📚 खेती मार्गदर्शन और सुझाव',
    guidanceSub: 'फसल के अनुसार सुझाव फ़िल्टर करें।',
    allCatOpt: '📂 सभी श्रेणियां',
    schemesTitle: '🏛 किसानों के लिए सरकारी योजनाएं',
    schemesSub: 'अपने अधिकार और लाभ जानें।',
    profileTitle: '👤 मेरी किसान प्रोफाइल',
    editProfileTitle: '✏ प्रोफाइल संपादित करें',
    labelEditName: '👤 नाम',
    labelEditPhone: '📱 फोन',
    labelEditVillage: '🏘 गाँव',
    labelEditCrop: '🌾 मुख्य फसल',
    labelEditLand: '🏞 भूमि क्षेत्र (एकड़)',
    saveProfileBtn: '💾 परिवर्तन सहेजें',
    statScansLabel: 'स्कैन',
    statAlertsLabel: 'अलर्ट देखे',
    historySectionTitle: '📋 मेरा स्कैन इतिहास',
    noProfileHistoryText: 'अभी तक कोई स्कैन नहीं।',
    footerTagline: 'तकनीक से किसानों की रक्षा।',
    footerHelpTitle: '📞 सहायता',
    footerLinksTitle: 'त्वरित लिंक',
    footerCopy: '© 2024 किसान रक्षक। भारतीय किसानों के लिए ❤ से बनाया।',
    loginSuccess: '✅ लॉगिन सफल! वापस स्वागत है।',
    loggedOut: '👋 लॉगआउट सफल।',
    profileSaved: '✅ प्रोफाइल सहेजी गई!',
    scanSaved: '✅ स्कैन इतिहास में सहेजा गया!',
    registerSuccess: '✅ पंजीकरण सफल! कृपया लॉगिन करें।',
    invalidCreds: '❌ गलत ईमेल या पासवर्ड।',
    fillFields: '⚠ कृपया सभी आवश्यक फ़ील्ड भरें।',
    pwMin: '⚠ पासवर्ड कम से कम 6 अक्षर का होना चाहिए।',
    emailExists: '⚠ यह ईमेल पहले से पंजीकृत है।',
    uploadImg: '⚠ कृपया पहले फसल की छवि अपलोड करें।',
    addTag: '⚠ कृपया कम से कम एक लक्षण टैग जोड़ें।',
    loadingDetect: 'छवि का विश्लेषण हो रहा है… कृपया प्रतीक्षा करें',
    googleSimMsg: '🔑 सिमुलेटेड Google लॉगिन (डेमो मोड)',
    loadingText: 'छवि का विश्लेषण हो रहा है… कृपया प्रतीक्षा करें',
  }
};

const ALERTS_DATA = [
  { id:1, crop:'wheat', cropLabel:'Wheat / गेहूँ', emoji:'🌾', disease:'Yellow Rust (Stripe Rust)', diseaseHi:'पीली कुंगी', severity:'High', location:'Punjab, Haryana, UP', date:'2024-12-15', solution:'Spray Propiconazole 25% EC @ 0.1%.', solutionHi:'प्रोपिकोनाज़ोल 25% EC @ 0.1% का छिड़काव करें।' },
  { id:2, crop:'rice', cropLabel:'Rice / धान', emoji:'🍚', disease:'Brown Plant Hopper (BPH)', diseaseHi:'भूरा माहू', severity:'High', location:'West Bengal, Odisha, Bihar', date:'2024-12-14', solution:'Apply Buprofezin 25% SC @ 1 ml/L water.', solutionHi:'बुप्रोफेज़िन 25% SC @ 1 ml/L का छिड़काव करें।' },
  { id:3, crop:'cotton', cropLabel:'Cotton / कपास', emoji:'🫧', disease:'Pink Bollworm', diseaseHi:'गुलाबी सुंडी', severity:'High', location:'Gujarat, Maharashtra', date:'2024-12-13', solution:'Install pheromone traps @ 5/acre.', solutionHi:'फेरोमोन ट्रैप @ 5/एकड़ लगाएं।' },
  { id:4, crop:'tomato', cropLabel:'Tomato / टमाटर', emoji:'🍅', disease:'Early Blight (Alternaria)', diseaseHi:'अर्ली ब्लाइट', severity:'Medium', location:'Karnataka, HP, UP', date:'2024-12-12', solution:'Apply Mancozeb 75% WP @ 2.5 g/L.', solutionHi:'मैनकोजेब 75% WP @ 2.5 g/L का छिड़काव करें।' },
  { id:5, crop:'potato', cropLabel:'Potato / आलू', emoji:'🥔', disease:'Late Blight (Phytophthora)', diseaseHi:'लेट ब्लाइट', severity:'High', location:'UP, West Bengal, Bihar', date:'2024-12-11', solution:'Spray Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L.', solutionHi:'मेटालैक्सिल 8% + मैनकोजेब 64% WP का छिड़काव करें।' },
  { id:6, crop:'maize', cropLabel:'Maize / मक्का', emoji:'🌽', disease:'Fall Armyworm (FAW)', diseaseHi:'फॉल आर्मीवॉर्म', severity:'Medium', location:'Karnataka, AP', date:'2024-12-10', solution:'Apply Emamectin Benzoate 5% SG @ 0.4 g/L.', solutionHi:'इमामेक्टिन बेंजोएट 5% SG @ 0.4 g/L का प्रयोग करें।' },
  { id:7, crop:'wheat', cropLabel:'Wheat / गेहूँ', emoji:'🌾', disease:'Aphids (Wheat Aphid)', diseaseHi:'माहू', severity:'Medium', location:'Punjab, Rajasthan', date:'2024-12-09', solution:'Spray Dimethoate 30% EC @ 1.5 ml/L.', solutionHi:'डाइमेथोएट 30% EC @ 1.5 ml/L का छिड़काव करें।' },
  { id:8, crop:'rice', cropLabel:'Rice / धान', emoji:'🍚', disease:'Blast Disease (Pyricularia)', diseaseHi:'ब्लास्ट रोग', severity:'Low', location:'Assam, Chhattisgarh', date:'2024-12-08', solution:'Spray Tricyclazole 75% WP @ 0.6 g/L at boot stage.', solutionHi:'ट्राइसाइक्लाज़ोल 75% WP @ 0.6 g/L का छिड़काव करें।' },
];

const TIPS_DATA = [
  { crop:'wheat', category:'pest', icon:'🌾', title:'Monitor for Rust Early', titleHi:'कुंगी की शुरुआती निगरानी', tip:'Check wheat leaves weekly. Yellow-orange powdery spots indicate rust.', tipHi:'गेहूं की पत्तियों की साप्ताहिक जांच करें।' },
  { crop:'rice', category:'irrigation', icon:'🍚', title:'Intermittent Flooding Saves Water', titleHi:'रुक-रुक कर सिंचाई पानी बचाती है', tip:'Alternate wetting and drying reduces water use by 30%.', tipHi:'बारी-बारी से गीला और सूखा रखने से 30% पानी की बचत होती है।' },
  { crop:'all', category:'pest', icon:'🌿', title:'Use Neem Oil as Organic Spray', titleHi:'नीम तेल का जैविक छिड़काव', tip:'Mix 5ml neem oil + 2ml soap in 1 litre water. Spray on leaves.', tipHi:'5ml नीम तेल + 2ml साबुन को 1 लीटर पानी में मिलाएं।' },
  { crop:'tomato', category:'pest', icon:'🍅', title:'Yellow Sticky Traps for Whitefly', titleHi:'सफेद मक्खी के लिए पीले ट्रैप', tip:'Install yellow sticky traps @ 4-5 per 0.1 acre.', tipHi:'पीले चिपचिपे ट्रैप @ 4-5 प्रति 0.1 एकड़ लगाएं।' },
  { crop:'cotton', category:'fertilizer', icon:'🫧', title:'Balanced NPK for Cotton', titleHi:'कपास के लिए संतुलित NPK', tip:'Cotton needs N:P:K in ratio of 3:1:1.', tipHi:'कपास को N:P:K 3:1:1 के अनुपात में चाहिए।' },
  { crop:'maize', category:'fertilizer', icon:'🌽', title:'Zinc Deficiency in Maize', titleHi:'मक्का में जिंक की कमी', tip:'If leaves show pale yellow stripes, apply Zinc Sulphate @ 25 kg/ha.', tipHi:'यदि पत्तियों पर पीली धारियां हों, तो जिंक सल्फेट @ 25 kg/ha डालें।' },
  { crop:'potato', category:'irrigation', icon:'🥔', title:'Drip Irrigation Prevents Late Blight', titleHi:'ड्रिप सिंचाई लेट ब्लाइट रोकती है', tip:'Use drip irrigation to keep foliage dry.', tipHi:'पत्तियों को सूखा रखने के लिए ड्रिप सिंचाई का उपयोग करें।' },
  { crop:'wheat', category:'harvest', icon:'🌾', title:'Right Time to Harvest Wheat', titleHi:'गेहूं की कटाई का सही समय', tip:'Harvest wheat when grain moisture is 14-18%.', tipHi:'गेहूं की कटाई तब करें जब दाने की नमी 14-18% हो।' },
  { crop:'all', category:'pest', icon:'🐞', title:'Encourage Natural Enemies', titleHi:'प्राकृतिक शत्रुओं को प्रोत्साहित करें', tip:'Avoid blanket pesticide sprays. Ladybirds naturally control pests.', tipHi:'अंधाधुंध कीटनाशक छिड़काव से बचें।' },
];

const SCHEMES_DATA = [
  { icon:'🌱', name:'PM-KISAN Yojana', nameHi:'पीएम किसान योजना', desc:'Income support of ₹6,000/year paid in 3 instalments of ₹2,000.', descHi:'₹6,000/वर्ष की आय सहायता। ₹2,000 की 3 किस्तों में।', benefit:'₹6,000/year direct bank transfer', benefitHi:'₹6,000/वर्ष सीधे बैंक खाते में', link:'https://pmkisan.gov.in', linkText:'Apply on pmkisan.gov.in' },
  { icon:'☂', name:'PM Fasal Bima Yojana', nameHi:'पीएम फसल बीमा योजना', desc:'Crop insurance covering losses from pests, diseases, flood. Premium as low as 1.5%.', descHi:'कीट, रोग, बाढ़ से फसल नुकसान की बीमा। प्रीमियम मात्र 1.5% से।', benefit:'Low premium crop insurance', benefitHi:'कम प्रीमियम में फसल बीमा', link:'https://pmfby.gov.in', linkText:'Apply on pmfby.gov.in' },
  { icon:'💧', name:'PM Krishi Sinchai Yojana', nameHi:'पीएम कृषि सिंचाई योजना', desc:'Subsidised drip and sprinkler irrigation. Up to 90% subsidy for small farmers.', descHi:'ड्रिप और स्प्रिंकलर सिंचाई पर सब्सिडी। छोटे किसानों को 90% तक।', benefit:'55-90% subsidy on micro-irrigation', benefitHi:'सूक्ष्म सिंचाई पर 55-90% सब्सिडी', link:'https://pmksy.gov.in', linkText:'Visit pmksy.gov.in' },
  { icon:'🏦', name:'Kisan Credit Card (KCC)', nameHi:'किसान क्रेडिट कार्ड', desc:'Short-term credit for crop cultivation at subsidised interest rate of 4%.', descHi:'फसल उगाने के लिए 4% की रियायती ब्याज दर पर ऋण।', benefit:'Credit at 4% interest rate', benefitHi:'4% ब्याज दर पर ऋण', link:'https://www.nabard.org', linkText:'Apply at your bank' },
  { icon:'🧪', name:'Soil Health Card Scheme', nameHi:'मृदा स्वास्थ्य कार्ड योजना', desc:'Free soil testing and fertiliser recommendations every 2 years.', descHi:'हर 2 साल में निःशुल्क मिट्टी परीक्षण और सिफारिश।', benefit:'Free soil testing every 2 years', benefitHi:'हर 2 साल में निःशुल्क मिट्टी परीक्षण', link:'https://soilhealth.dac.gov.in', linkText:'Visit soilhealth.dac.gov.in' },
];

function el(id) { return document.getElementById(id); }

function showToast(msg, duration = 3500) {
  const t = el('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.add('hidden'), duration);
}

function showLoading(msg) {
  el('loadingText').textContent = msg || T[AppState.lang].loadingText;
  el('loadingOverlay').classList.remove('hidden');
}
function hideLoading() { el('loadingOverlay').classList.add('hidden'); }

function getUsers() { return JSON.parse(localStorage.getItem('kr_users') || '[]'); }
function saveUsers(users) { localStorage.setItem('kr_users', JSON.stringify(users)); }

function getScanHistory() {
  const key = `kr_scans_${AppState.currentUser?.email}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function saveScanHistoryData(scans) {
  const key = `kr_scans_${AppState.currentUser?.email}`;
  localStorage.setItem(key, JSON.stringify(scans));
}

function getWeatherDesc(code) {
  const codes = { 0:'☀ Clear sky', 1:'🌤 Mainly clear', 2:'⛅ Partly cloudy', 3:'☁ Overcast', 45:'🌫 Foggy', 51:'🌦 Light drizzle', 61:'🌧 Slight rain', 63:'🌧 Moderate rain', 80:'🌦 Rain showers', 95:'⛈ Thunderstorm' };
  return codes[code] || '🌤 Fair';
}

function getDateString() {
  return new Date().toLocaleDateString(AppState.lang === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

function focusTagInput() {
  el('tagRealInput').focus();
}

function handleTagKeydown(event) {
  const input = el('tagRealInput');
  const val   = input.value.trim();

  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault(); 
    if (val) addTag(val.replace(/,$/, '').trim());
    return;
  }

  // Remove last tag on Backspace if input is empty
  if (event.key === 'Backspace' && input.value === '' && AppState.tags.length > 0) {
    removeTag(AppState.tags.length - 1);
  }
}

/**
 * Handle comma typed mid-word (oninput catches pasted commas etc.)
 */
function handleTagInput(event) {
  const input = el('tagRealInput');
  
  if (input.value.includes(',')) {
    const parts = input.value.split(',');
    parts.forEach((p, i) => {
      const cleaned = p.trim();
      if (cleaned && i < parts.length - 1) addTag(cleaned);
    });
    
    input.value = parts[parts.length - 1];
  }
}

function addTag(tagText) {
  const cleaned = tagText.toLowerCase().trim();
  if (!cleaned) return;

  if (AppState.tags.includes(cleaned)) {
    showToast('⚠ Tag already added: ' + cleaned, 2000);
    el('tagRealInput').value = '';
    return;
  }

  AppState.tags.push(cleaned);
  el('tagRealInput').value = '';
  renderTagChips();
}

/**
 * Remove a tag by its index and re-render chips
 */
function removeTag(index) {
  AppState.tags.splice(index, 1);
  renderTagChips();
}

/**
 * Re-render all tag chips inside the wrapper div
 */
function renderTagChips() {
  const wrapper = el('tagInputWrapper');
  const input   = el('tagRealInput');

  const oldChips = wrapper.querySelectorAll('.tag-chip');
  oldChips.forEach(c => c.remove());

  AppState.tags.forEach((tag, index) => {
    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.innerHTML = `
      ${tag}
      <button class="remove-tag" onclick="removeTag(${index})" title="Remove tag">✕</button>
    `;
    wrapper.insertBefore(chip, input);
  });

  if (AppState.tags.length > 0) {
    input.placeholder = '';
  } else {
    input.placeholder = 'e.g. yellow spots, dry leaves, fungus';
  }
}

function getTagsString() {
  
  const typedVal = el('tagRealInput').value.trim();
  if (typedVal) addTag(typedVal);
  return AppState.tags.join(', ');
}

function resetTags() {
  AppState.tags = [];
  renderTagChips();
}

function setLang(lang) {
  AppState.lang = lang;
  localStorage.setItem('kr_lang', lang);
  const t = T[lang];
  function setText(id, val) { if (el(id)) el(id).textContent = val; }

  setText('loginSubtitle', t.loginSubtitle);
  setText('googleBtnText', t.googleBtnText);
  setText('orText', t.orText);
  setText('labelEmail', t.labelEmail);
  setText('labelPassword', t.labelPassword);
  setText('rememberText', t.rememberText);
  setText('loginBtn', t.loginBtn);
  setText('registerTitle', t.registerTitle);
  setText('labelName', t.labelName);
  setText('labelPhone', t.labelPhone);
  setText('labelVillage', t.labelVillage);
  setText('labelMainCrop', t.labelMainCrop);
  setText('registerBtn', t.registerBtn);
  setText('navBrand', t.navBrand);
  setText('navHome', t.navHome);
  setText('navDetect', t.navDetect);
  setText('navAlerts', t.navAlerts);
  setText('navGuidance', t.navGuidance);
  setText('navSchemes', t.navSchemes);
  setText('navProfile', t.navProfile);
  setText('logoutBtn', t.logoutBtn);
  setText('cardWeatherTitle', t.cardWeatherTitle);
  setText('refreshWeather', t.refreshWeather);
  setText('cardAlertTitle', t.cardAlertTitle);
  setText('alertCardSub', t.alertCardSub);
  setText('cardHealthTitle', t.cardHealthTitle);
  setText('cardDetectTitle', t.cardDetectTitle);
  setText('cardDetectSub', t.cardDetectSub);
  setText('scanNowBtn', t.scanNowBtn);
  setText('riskTitle', t.riskTitle);
  setText('historyTitle', t.historyTitle);
  setText('noHistoryText', t.noHistoryText);
  setText('detectTitle', t.detectTitle);
  setText('detectSub', t.detectSub);
  setText('uploadTitle', t.uploadTitle);
  setText('uploadHint', t.uploadHint);
  setText('selectCropLabel', t.selectCropLabel);
  setText('tagInputLabel', t.tagInputLabel);
  setText('detectBtn', t.detectBtn);
  setText('removeImgBtn', t.removeImgBtn);
  setText('resultTitle', t.resultTitle);
  setText('resultPlaceholderText', t.resultPlaceholderText);
  setText('saveScanBtn', t.saveScanBtn);
  setText('alertsTitle', t.alertsTitle);
  setText('alertsSub', t.alertsSub);
  setText('allCropsOpt', t.allCropsOpt);
  setText('allSeverityOpt', t.allSeverityOpt);
  setText('applyFilterBtn', t.applyFilterBtn);
  setText('guidanceTitle', t.guidanceTitle);
  setText('guidanceSub', t.guidanceSub);
  setText('allCatOpt', t.allCatOpt);
  setText('schemesTitle', t.schemesTitle);
  setText('schemesSub', t.schemesSub);
  setText('profileTitle', t.profileTitle);
  setText('editProfileTitle', t.editProfileTitle);
  setText('labelEditName', t.labelEditName);
  setText('labelEditPhone', t.labelEditPhone);
  setText('labelEditVillage', t.labelEditVillage);
  setText('labelEditCrop', t.labelEditCrop);
  setText('labelEditLand', t.labelEditLand);
  setText('saveProfileBtn', t.saveProfileBtn);
  setText('statScansLabel', t.statScansLabel);
  setText('statAlertsLabel', t.statAlertsLabel);
  setText('historySectionTitle', t.historySectionTitle);
  setText('noProfileHistoryText', t.noProfileHistoryText);
  setText('footerTagline', t.footerTagline);
  setText('footerHelpTitle', t.footerHelpTitle);
  setText('footerLinksTitle', t.footerLinksTitle);
  setText('footerCopy', t.footerCopy);

  if (AppState.currentUser) {
    const name = AppState.currentUser.name.split(' ')[0];
    if (el('welcomeMsg')) el('welcomeMsg').textContent = lang === 'hi' ? `🌻 वापस स्वागत है, ${name} जी!` : `🌻 Welcome back, ${name}!`;
    if (el('welcomeSub')) el('welcomeSub').textContent = t.welcomeSub;
  }

  ['btnLangEn','appLangEn'].forEach(id => { if (el(id)) el(id).classList.toggle('active', lang === 'en'); });
  ['btnLangHi','appLangHi'].forEach(id => { if (el(id)) el(id).classList.toggle('active', lang === 'hi'); });

  renderAlerts();
  renderTips();
  renderSchemes();
  renderDiseaseRisk();
  renderScanHistory();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  AppState.theme = isDark ? 'dark' : 'light';
  localStorage.setItem('kr_theme', AppState.theme);
  el('themeToggle').textContent = isDark ? '☀' : '🌙';
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = el(`sec-${name}`);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-link'));
  const map = { dashboard:'navHome', detection:'navDetect', alerts:'navAlerts', guidance:'navGuidance', schemes:'navSchemes', profile:'navProfile', 'scan-history':'navHistory', 'search':'navSearch' };
  if (el(map[name])) el(map[name]).classList.add('active-link');
  el('navLinks').classList.remove('open');
  if (name === 'profile')       renderProfile();
  if (name === 'alerts')        renderAlerts();
  if (name === 'guidance')      renderTips();
  if (name === 'schemes')       renderSchemes();
  if (name === 'dashboard')     updateDashboard();
  if (name === 'scan-history')  loadScanHistory();
  if (name === 'search')        initSmartSearch();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() { el('navLinks').classList.toggle('open'); }

function togglePw() {
  const inp = el('loginPassword');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

async function handleLogin(e) {
  e.preventDefault();
  const email = el('loginEmail').value.trim();
  const pw    = el('loginPassword').value;
  const lang  = AppState.lang;
  el('emailErr').textContent = '';
  el('pwErr').textContent = '';
  if (!email) { el('emailErr').textContent = T[lang].fillFields; return; }
  if (pw.length < 6) { el('pwErr').textContent = T[lang].pwMin; return; }

  try {
    showLoading('Logging in…');
    const res  = await fetch(`${API_BASE}/auth/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password: pw }),
      signal:  AbortSignal.timeout(4000)
    });
    hideLoading();
    const data = await res.json();
    if (!res.ok) { el('pwErr').textContent = data.message || T[lang].invalidCreds; return; }

    const user = { ...data.user, googleAuth: false };
    AppState.currentUser = user;
    localStorage.setItem('kr_loggedIn', JSON.stringify(user));
    localStorage.setItem('kr_token', data.token);   
    showToast(T[lang].loginSuccess);
    launchApp();
    return;
  } catch (err) {
    hideLoading();
    console.warn('Backend offline – falling back to localStorage login:', err.message);
  }

  const users = getUsers();
  const user  = users.find(u => u.email === email && u.password === btoa(pw));
  if (!user) { el('pwErr').textContent = T[lang].invalidCreds; return; }
  AppState.currentUser = user;
  localStorage.setItem('kr_loggedIn', JSON.stringify(user));
  showToast(T[lang].loginSuccess + ' (offline mode)');
  launchApp();
}

function googleLogin() {
  const lang = AppState.lang;

  const popup = window.open(
    `${API_BASE}/auth/google`,          
    'GoogleLogin',                       
    'width=500,height=600,scrollbars=yes,resizable=yes'
  );

  if (!popup) {
    showToast('⚠ Popup blocked! Please allow popups for this site.', 4000);
    return;
  }

  showToast('🔑 Opening Google login…', 2000);

  function handleGoogleMessage(event) {

    const allowedOrigin = window.location.origin; 
    if (event.origin !== allowedOrigin && event.origin !== 'http://localhost:5000') return;

    if (!event.data || event.data.type !== 'GOOGLE_LOGIN_SUCCESS') return;

    window.removeEventListener('message', handleGoogleMessage);

    const { token, user } = event.data;

    localStorage.setItem('kr_token',    token);
    localStorage.setItem('kr_loggedIn', JSON.stringify(user));
    AppState.currentUser = user;

    console.log('✅ Google login received in frontend. User:', user.name, '| Email:', user.email);
    showToast(`✅ Google login successful! Welcome, ${user.name}!`, 3000);
    launchApp(); 
  }

  window.addEventListener('message', handleGoogleMessage);

  const popupCheck = setInterval(() => {
    if (popup.closed) {
      clearInterval(popupCheck);
      window.removeEventListener('message', handleGoogleMessage);
      console.log('ℹ️ Google login popup was closed by user.');
    }
  }, 500);
}

async function handleRegister(e) {
  e.preventDefault();
  const lang     = AppState.lang;
  const name     = el('regName').value.trim();
  const email    = el('regEmail').value.trim();
  const phone    = el('regPhone').value.trim();
  const village  = el('regVillage').value.trim();
  const crop     = el('regCrop').value;
  const password = el('regPassword').value;
  el('regErr').textContent = '';
  if (!name || !email || !password) { el('regErr').textContent = T[lang].fillFields; return; }
  if (password.length < 6)          { el('regErr').textContent = T[lang].pwMin; return; }

  try {
    showLoading('Registering…');
    const res  = await fetch(`${API_BASE}/auth/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, password, phone, village, crop }),
      signal:  AbortSignal.timeout(4000)
    });
    hideLoading();
    const data = await res.json();
    if (!res.ok) { el('regErr').textContent = data.message || T[lang].emailExists; return; }

    showToast(T[lang].registerSuccess);
    showLogin();
    el('loginEmail').value = email;
    return;
  } catch (err) {
    hideLoading();
    console.warn('Backend offline – falling back to localStorage register:', err.message);
  }

  const users = getUsers();
  if (users.find(u => u.email === email)) { el('regErr').textContent = T[lang].emailExists; return; }
  const newUser = { name, email, phone, village, crop, password: btoa(password), land:'', avatar:'🧑‍🌾', joinDate: new Date().toISOString(), googleAuth: false };
  users.push(newUser);
  saveUsers(users);
  showToast(T[lang].registerSuccess + ' (offline mode)');
  showLogin();
  el('loginEmail').value = email;
}

function logout() {
  AppState.currentUser = null;
  localStorage.removeItem('kr_loggedIn');
  localStorage.removeItem('kr_token');   
  showToast(T[AppState.lang].loggedOut);
  el('app').classList.add('hidden');
  el('page-login').classList.add('active');
  el('page-register').classList.remove('active');
  el('loginForm').reset();
}

function showRegister() { el('page-login').classList.remove('active'); el('page-register').classList.add('active'); }
function showLogin()     { el('page-register').classList.remove('active'); el('page-login').classList.add('active'); }

function launchApp() {
  el('page-login').classList.remove('active');
  el('page-register').classList.remove('active');
  el('app').classList.remove('hidden');
  const name = AppState.currentUser.name.split(' ')[0];
  el('welcomeMsg').textContent = AppState.lang === 'hi' ? `🌻 वापस स्वागत है, ${name} जी!` : `🌻 Welcome back, ${name}!`;
  showSection('dashboard');
  fetchWeather();
  checkApiStatus();

  if (AppState.currentUser?.id) {
    fetchWeatherAlert(AppState.currentUser.id);
  }
}

async function fetchWeatherAlert(userId) {
  try {
    console.log('🔔 Fetching weather alert for user:', userId);
    const res  = await fetch(`${API_BASE}/alerts/${userId}`, {
      signal: AbortSignal.timeout(10000)  
    });
    if (!res.ok) throw new Error(`Alert API error: ${res.status}`);
    const data = await res.json();

    if (data.success) {
      console.log(`✅ Alert received: ${data.riskLevel} risk – ${data.village}`);
      renderWeatherAlertBanner(data);
    }
  } catch (err) {
    
    console.warn('⚠ Weather alert fetch failed (non-critical):', err.message);
  }
}

function renderWeatherAlertBanner(alertData) {
  
  let banner = el('weatherAlertBanner');
  if (!banner) {
    
    const dashSection = el('sec-dashboard');
    if (!dashSection) return;
    banner = document.createElement('div');
    banner.id = 'weatherAlertBanner';
    
    dashSection.insertBefore(banner, dashSection.firstChild);
  }

  const colors = {
    'High':   { bg: '#fff3f3', border: '#ef5350', icon: '🔴', label: 'HIGH RISK' },
    'Medium': { bg: '#fff8e1', border: '#ffa726', icon: '🟡', label: 'MEDIUM RISK' },
    'Low':    { bg: '#f0fdf4', border: '#66bb6a', icon: '🟢', label: 'LOW RISK' },
  };
  const style = colors[alertData.riskLevel] || colors['Low'];

  const bulletPoints = alertData.predictions
    .filter(p => p.diseases.length > 0)
    .slice(0, 3)
    .map(p => `<li>${p.message}</li>`)
    .join('');

  banner.innerHTML = `
    <div style="
      background: ${style.bg};
      border-left: 4px solid ${style.border};
      border-radius: 12px;
      padding: 1rem 1.2rem;
      margin-bottom: 1.2rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    ">
      <div style="font-size:2rem;line-height:1">${style.icon}</div>
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
          <strong style="color:${style.border};font-size:0.9rem;letter-spacing:1px">
            🌡️ WEATHER ALERT – ${style.label}
          </strong>
          <span style="font-size:0.78rem;color:#888">
            📍 ${alertData.village} &nbsp;|&nbsp;
            🌡️ ${alertData.weather?.temperature ?? '--'}°C &nbsp;
            💧 ${alertData.weather?.humidity ?? '--'}% &nbsp;
            🌧️ ${alertData.weather?.rain ?? 0}mm
          </span>
        </div>
        <ul style="margin:.4rem 0 .4rem 1.2rem;padding:0;font-size:0.85rem;color:#444">
          ${bulletPoints || '<li>No specific alerts. Conditions look fine.</li>'}
        </ul>
        <details style="font-size:0.82rem;color:#555;cursor:pointer">
          <summary style="color:${style.border};font-weight:600;cursor:pointer">
            💡 Recommended Actions
          </summary>
          <p style="margin:.4rem 0 0;line-height:1.6">
            ${alertData.action || 'Continue regular crop monitoring.'}
          </p>
        </details>
      </div>
      <button
        onclick="this.parentElement.parentElement.remove()"
        style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:#aaa;line-height:1"
        title="Dismiss"
      >✕</button>
    </div>
  `;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   API STATUS CHECK
   Pings the backend and shows green/red badge in result panel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
async function checkApiStatus() {
  const badge   = el('apiStatusBadge');
  const statusT = el('apiStatusText');
  if (!badge) return;

  badge.className = 'api-status checking';
  statusT.textContent = 'Checking API…';

  try {
    const res = await fetch(`${API_BASE}/diseases/wheat`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      badge.className = 'api-status connected';
      statusT.textContent = '● Backend Connected (localhost:5000)';
    } else {
      throw new Error('Non-OK');
    }
  } catch {
    badge.className = 'api-status disconnected';
    statusT.textContent = '● Backend Offline – using local fallback';
  }
}

function fetchWeather() {
  el('wDesc').textContent = 'Detecting location…';
  if (!navigator.geolocation) { useFallbackWeather(); return; }
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const lat = pos.coords.latitude, lon = pos.coords.longitude;
        AppState.userLat = lat; AppState.userLon = lon;
        const geoResp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const geoData = await geoResp.json();
        AppState.userCity = geoData.address?.city || geoData.address?.town || geoData.address?.village || 'Your Location';
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`;
        const resp = await fetch(url);
        const data = await resp.json();
        updateWeatherUI(data);
      } catch { useFallbackWeather(); }
    },
    () => useFallbackWeather(),
    { timeout: 10000 }
  );
}

function updateWeatherUI(data) {
  const c = data.current;
  const w = { temp: Math.round(c.temperature_2m), humidity: Math.round(c.relative_humidity_2m), rain: c.precipitation || 0, wind: Math.round(c.wind_speed_10m), wcode: c.weather_code };
  el('wTemp').textContent     = `${w.temp}°C`;
  el('wHumidity').textContent = `${w.humidity}%`;
  el('wRain').textContent     = `${w.rain} mm`;
  el('wWind').textContent     = `${w.wind} km/h`;
  el('wDesc').textContent     = getWeatherDesc(w.wcode);
  el('wLoc').textContent      = `📍 ${AppState.userCity}`;
  el('currentDate').textContent = getDateString();
  AppState.weatherData = w;
  renderDiseaseRisk();
  updateCropHealth();
}

function useFallbackWeather() {
  const w = { temp:26, humidity:72, rain:5, wind:12, wcode:2 };
  AppState.weatherData = w; AppState.userCity = 'Delhi (Demo)';
  el('wTemp').textContent     = `${w.temp}°C`;
  el('wHumidity').textContent = `${w.humidity}%`;
  el('wRain').textContent     = `${w.rain} mm`;
  el('wWind').textContent     = `${w.wind} km/h`;
  el('wDesc').textContent     = getWeatherDesc(w.wcode);
  el('wLoc').textContent      = `📍 ${AppState.userCity} (Demo)`;
  el('currentDate').textContent = getDateString();
  renderDiseaseRisk();
  updateCropHealth();
}

function renderDiseaseRisk() {
  const container = el('diseaseRiskList');
  if (!container) return;
  const w = AppState.weatherData;
  if (!w) { container.innerHTML = '<p class="no-data">Fetching weather data…</p>'; return; }
  const lang = AppState.lang;
  const risks = [];

  if (w.humidity > 80)       risks.push({ level:'high',   icon:'🍄', text: lang==='hi' ? `उच्च आर्द्रता (${w.humidity}%) – फफूंद रोग का खतरा।` : `High humidity (${w.humidity}%) – High risk of fungal diseases.` });
  else if (w.humidity > 65)  risks.push({ level:'medium', icon:'🍄', text: lang==='hi' ? `मध्यम आर्द्रता (${w.humidity}%) – फफूंद रोग का मध्यम खतरा।` : `Moderate humidity (${w.humidity}%) – Moderate risk of fungal diseases.` });
  if (w.rain > 15)            risks.push({ level:'high',   icon:'🌧', text: lang==='hi' ? `अधिक वर्षा (${w.rain} mm) – बैक्टीरियल रोग का खतरा।` : `Heavy rain (${w.rain} mm) – Risk of Bacterial diseases.` });
  else if (w.rain > 5)       risks.push({ level:'medium', icon:'🌦', text: lang==='hi' ? `हल्की वर्षा – ब्लास्ट रोग की निगरानी करें।` : `Light rain – Monitor for Blast disease.` });
  if (w.temp < 20 && w.humidity > 60) risks.push({ level:'high', icon:'🌾', text: lang==='hi' ? `ठंडा तापमान + आर्द्रता – गेहूं में कुंगी का खतरा।` : `Cool temp + humidity – High risk of Rust disease in Wheat.` });
  if (risks.length === 0)    risks.push({ level:'low', icon:'✅', text: lang==='hi' ? 'मौसम की स्थिति सामान्य है।' : 'Weather conditions are favourable.' });

  const levelLabel = (l) => l==='high' ? (lang==='hi'?'⚠ उच्च जोखिम':'⚠ High Risk') : l==='medium' ? (lang==='hi'?'⚡ मध्यम जोखिम':'⚡ Medium Risk') : (lang==='hi'?'✅ कम जोखिम':'✅ Low Risk');
  container.innerHTML = risks.map(r => `
    <div class="risk-item ${r.level}">
      <span class="risk-icon">${r.icon}</span>
      <div class="risk-info"><strong>${levelLabel(r.level)}</strong><small>${r.text}</small></div>
    </div>
  `).join('');
}

function updateCropHealth() {
  const container = el('healthBars');
  if (!container) return;
  const w = AppState.weatherData || { humidity:60, rain:5, temp:25 };
  const lang = AppState.lang;
  const crops = [
    { name: lang==='hi'?'गेहूँ':'Wheat', score: Math.max(30, 100-(w.humidity>80?40:0)-(w.temp<10?20:0)), color:'#f9a825' },
    { name: lang==='hi'?'धान':'Rice',    score: Math.max(30, 100-(w.rain<2?30:0)-(w.temp>40?25:0)),      color:'#66bb6a' },
    { name: lang==='hi'?'टमाटर':'Tomato',score: Math.max(30, 100-(w.humidity>75?35:0)-(w.rain>20?20:0)), color:'#ef5350' },
  ];
  container.innerHTML = crops.map(c => `
    <div class="health-row">
      <span class="health-label">${c.name}</span>
      <div class="health-bar"><div class="health-fill" style="width:${c.score}%;background:${c.color}"></div></div>
      <span class="health-val" style="color:${c.color}">${c.score}%</span>
    </div>
  `).join('');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ PEST DETECTION  – sends cropName + tag + image
   to POST http://localhost:5000/api/detect via FormData
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * Preview image before upload
 */
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    AppState.previewImageUrl = e.target.result;
    el('imagePreview').src = e.target.result;
    el('imagePreviewBox').classList.remove('hidden');
    el('uploadArea').style.display = 'none';
    el('actualResult').classList.add('hidden');
    el('resultContent').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  el('cropImage').value = '';
  AppState.previewImageUrl = null;
  el('imagePreviewBox').classList.add('hidden');
  el('uploadArea').style.display = '';
  el('actualResult').classList.add('hidden');
  el('resultContent').classList.remove('hidden');
  resetTags(); 
}

async function detectPest() {
  const lang = AppState.lang;

  if (!AppState.previewImageUrl) {
    showToast(T[lang].uploadImg);
    return;
  }

  const cropName = el('detectionCrop').value;

  const tag = getTagsString();

  const imageFile = el('cropImage').files[0];

  showLoading(T[lang].loadingDetect);

  const formData = new FormData();
  formData.append('cropName', cropName);   
  formData.append('tag', tag);             
  if (imageFile) formData.append('image', imageFile); 

  if (AppState.currentUser?.id) {
    formData.append('userId',  AppState.currentUser.id);
    formData.append('village', AppState.currentUser.village || '');
  }
  // Attach GPS coordinates if we have them (from weather fetch)
  if (AppState.userLat) formData.append('latitude',  AppState.userLat);
  if (AppState.userLon) formData.append('longitude', AppState.userLon);

  try {
    
    const response = await fetch(`${API_BASE}/detect`, {
      method: 'POST',
      body: formData
      
    });

    hideLoading();

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();

    displayBackendResult(data, lang);

    AppState.detectedDisease = {
      name:      data.results?.[0]?.diseaseName || 'Unknown',
      nameHi:    data.results?.[0]?.diseaseName || 'Unknown',
      crop:      cropName,
      confidence: 90,
      severity:  data.results?.[0]?.severity || 'Medium',
      imageUrl:  AppState.previewImageUrl,
      timestamp: new Date().toISOString()
    };

    renderScanHistory();

  } catch (error) {
    hideLoading();
    console.warn('Backend unavailable, using local fallback:', error.message);
    detectPestLocal(cropName, tag, lang);
  }
}

function displayBackendResult(data, lang) {
  const container = el('multiResultContainer');
  container.innerHTML = '';

  const results = data.results || [];

  if (!results.length) {
    container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:1rem;">
      ${lang === 'hi'
        ? 'इस फसल और लक्षण के लिए कोई बीमारी नहीं मिली। अलग-अलग टैग आज़माएँ।'
        : 'No diseases found for this crop and symptom. Try different tags.'}
    </p>`;
    el('resultContent').classList.add('hidden');
    el('actualResult').classList.remove('hidden');
    return;
  }

  // Check if it's a fallback (no exact tag match)
  const isFallback = results.some(r => r.matched === false);
  if (isFallback) {
    container.innerHTML = `<div class="fallback-notice">
      ${lang === 'hi'
        ? '⚠ आपके टैग के लिए कोई सटीक मिलान नहीं। सामान्य बीमारियाँ दिखा रहे हैं।'
        : '⚠ No exact match for your tag. Showing general diseases for this crop as fallback.'}
    </div>`;
  }

  results.forEach(disease => {
    // ── Translate to Hindi if requested ──
    let title = (disease.diseaseName || '').trim();
    let desc  = disease.description || '—';
    let symp  = disease.symptoms || '—';
    let treat = disease.treatment || '—';
    let prev  = disease.prevention || '—';

    if (lang === 'hi' && window.HINDI_DISEASES) {
      // Find the first key in HINDI_DISEASES that matches the title (case-insensitive and ignoring small whitespace diffs)
      const hdKey = Object.keys(window.HINDI_DISEASES).find(k => title.toLowerCase().includes(k.toLowerCase()));
      
      if (hdKey) {
        const hd = window.HINDI_DISEASES[hdKey];
        title = `${hd.name} (${title})`;
        desc  = hd.desc;
        symp  = hd.symp;
        treat = hd.treat;
        prev  = hd.prev;
      } else {
        console.warn('⚠ Hindi translation not found for:', title);
      }
    }

    const card = document.createElement('div');
    card.className = `disease-result-card ${disease.matched === false ? 'fallback' : ''}`;
    card.innerHTML = `
      <h4>🦠 ${title}</h4>
      <p><strong>📝 ${lang === 'hi' ? 'विवरण' : 'Description'}:</strong> ${desc}</p>
      <p><strong>🔍 ${lang === 'hi' ? 'लक्षण' : 'Symptoms'}:</strong> ${symp}</p>
      <p><strong>💊 ${lang === 'hi' ? 'उपचार' : 'Treatment'}:</strong> ${treat}</p>
      <p><strong>🛡 ${lang === 'hi' ? 'बचाव' : 'Prevention'}:</strong> ${prev}</p>
      ${disease.tags ? `<p><strong>🏷 ${lang === 'hi' ? 'टैग' : 'Tags'}:</strong> <em>${disease.tags.join(', ')}</em></p>` : ''}
    `;
    container.appendChild(card);
  });

  el('resultContent').classList.add('hidden');
  el('actualResult').classList.remove('hidden');
}

const LOCAL_DISEASE_DB = {
  wheat: [
    { name:'Yellow Rust (Stripe Rust)', cause:'Fungus Puccinia striiformis', severity:'High', treatment:'Spray Propiconazole 25% EC @ 0.1%.', prevention:'Use resistant varieties like HD-2967.', tags:['yellow spots','yellow','rust','powdery'] },
    { name:'Wheat Aphid Infestation', cause:'Sucking pest Sitobion avenae', severity:'Medium', treatment:'Spray Imidacloprid 17.8 SL @ 0.3 ml/L.', prevention:'Monitor fields regularly.', tags:['aphids','insects','curling leaves','yellow leaves'] },
    { name:'Loose Smut', cause:'Fungus Ustilago tritici', severity:'Medium', treatment:'Seed treatment with Carboxin 37.5% + Thiram 37.5%.', prevention:'Use certified smut-free seeds.', tags:['black','smut','dark','powder'] },
  ],
  rice: [
    { name:'Bacterial Leaf Blight', cause:'Xanthomonas oryzae', severity:'High', treatment:'Apply Streptomycin + Copper oxychloride.', prevention:'Use certified disease-free seed.', tags:['water soaked','yellow edges','wilting','blight'] },
    { name:'Brown Plant Hopper', cause:'Nilaparvata lugens insect', severity:'High', treatment:'Drain field 3 days. Apply Buprofezin 25% SC.', prevention:'Use resistant varieties IR-36, IR-64.', tags:['hopper','brown insects','dead patches','hopperburn'] },
    { name:'Rice Blast', cause:'Fungus Pyricularia oryzae', severity:'High', treatment:'Spray Tricyclazole 75% WP @ 0.6 g/L.', prevention:'Use resistant varieties. Avoid excess nitrogen.', tags:['lesions','spindle shaped','blast','spots'] },
  ],
  potato: [
    { name:'Late Blight (Phytophthora)', cause:'Phytophthora infestans', severity:'High', treatment:'Spray Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L every 10 days.', prevention:'Plant certified seed. Ensure good drainage.', tags:['water soaked','white mold','rotten','blight','dark spots'] },
    { name:'Early Blight (Alternaria)', cause:'Alternaria solani', severity:'Medium', treatment:'Apply Mancozeb 75% WP @ 2.5 g/L.', prevention:'Crop rotation. Avoid overhead irrigation.', tags:['brown spots','ring spots','dry leaves','alternaria'] },
    { name:'Common Scab', cause:'Streptomyces scabies', severity:'Low', treatment:'Use scab-resistant varieties. Acidify soil.', prevention:'Maintain soil pH 5.2–5.5.', tags:['scab','corky','rough skin','brown patches'] },
  ],
  maize: [
    { name:'Fall Armyworm (FAW)', cause:'Spodoptera frugiperda larvae', severity:'High', treatment:'Apply Emamectin Benzoate 5% SG @ 0.4 g/L.', prevention:'Early planting. Install light traps.', tags:['whorl damage','armyworm','larvae','feeding damage'] },
    { name:'Maize Streak Virus', cause:'Maize Streak Virus (MSV)', severity:'High', treatment:'No chemical cure. Remove infected plants.', prevention:'Use tolerant varieties. Control leafhopper vector.', tags:['yellow streaks','mosaic','virus','stunted'] },
  ],
  cotton: [
    { name:'Pink Bollworm', cause:'Pectinophora gossypiella larvae', severity:'High', treatment:'Spray Spinosad 45% SC. Use pheromone traps @ 5/acre.', prevention:'Destroy crop residues. Use Bt cotton.', tags:['boll damage','pink larvae','bollworm','holes'] },
    { name:'Cotton Leaf Curl Virus', cause:'Begomovirus transmitted by whitefly', severity:'High', treatment:'Control whitefly. Remove infected plants.', prevention:'Use resistant varieties. Plant early.', tags:['leaf curl','curling','viral','whitefly','yellow veins'] },
  ],
  tomato: [
    { name:'Early Blight (Alternaria)', cause:'Alternaria solani', severity:'Medium', treatment:'Apply Mancozeb 75% WP @ 2.5 g/L.', prevention:'Crop rotation. Stake plants. Use drip irrigation.', tags:['brown spots','ring spots','blight','dry leaves','yellow'] },
    { name:'Tomato Mosaic Virus', cause:'Tobamovirus', severity:'Medium', treatment:'No cure. Remove infected plants. Sanitize tools.', prevention:'Use certified seed. Control aphid vectors.', tags:['mosaic','mottled','viral','distorted','yellow patches'] },
  ],
  onion: [
    { name:'Purple Blotch', cause:'Alternaria porri', severity:'Medium', treatment:'Apply Iprodione 50% WP @ 1.5 g/L.', prevention:'Avoid dense planting. Ensure air circulation.', tags:['purple spots','blotch','lesions','alternaria'] },
    { name:'Onion Thrips', cause:'Thrips tabaci insect', severity:'Medium', treatment:'Spray Imidacloprid 17.8% SL @ 0.3 ml/L.', prevention:'Monitor with blue sticky traps.', tags:['silver streaks','thrips','scraping','insects'] },
  ]
};

function detectPestLocal(cropName, tag, lang) {
  const diseases = LOCAL_DISEASE_DB[cropName] || LOCAL_DISEASE_DB['wheat'];
  const tagLower = tag.toLowerCase();
  const tagWords = tagLower.split(',').map(t => t.trim()).filter(Boolean);

  let matched = diseases.filter(d =>
    d.tags.some(dt => tagWords.some(tw => dt.includes(tw) || tw.includes(dt)))
  );

  const isFallback = matched.length === 0;
  if (isFallback) {
    matched = diseases.slice(0, 2); 
  }

  AppState.detectedDisease = {
    name: matched[0]?.name || 'Unknown',
    nameHi: matched[0]?.name || 'Unknown',
    crop: cropName,
    confidence: isFallback ? 60 : 85,
    severity: matched[0]?.severity || 'Medium',
    imageUrl: AppState.previewImageUrl,
    timestamp: new Date().toISOString()
  };

  const fakeResponse = {
    results: matched.map(d => ({
      diseaseName: d.name,
      description: `Caused by ${d.cause}.`,
      symptoms: d.tags.join(', '),
      treatment: d.treatment,
      prevention: d.prevention,
      tags: d.tags,
      matched: !isFallback
    }))
  };

  displayBackendResult(fakeResponse, lang);
  showToast('⚠ Backend offline – showing local results', 3000);
}

function saveScan() {
  const lang = AppState.lang;
  if (!AppState.detectedDisease) return;
  const scans = getScanHistory();
  scans.unshift({
    id: Date.now(),
    disease:    AppState.detectedDisease.name,
    diseaseHi:  AppState.detectedDisease.nameHi,
    crop:       AppState.detectedDisease.crop,
    confidence: AppState.detectedDisease.confidence,
    imageUrl:   AppState.previewImageUrl,
    date:       new Date().toLocaleDateString('en-IN'),
    severity:   AppState.detectedDisease.severity,
  });
  if (scans.length > 20) scans.pop();
  saveScanHistoryData(scans);
  showToast(T[lang].scanSaved);
  renderScanHistory();
}

function renderScanHistory() {
  const scans = getScanHistory();
  const lang  = AppState.lang;
  function renderGrid(containerId) {
    const container = el(containerId);
    if (!container) return;
    if (!scans.length) { container.innerHTML = `<p class="no-data">${T[lang].noHistoryText}</p>`; return; }
    container.innerHTML = scans.slice(0, 6).map(s => `
      <div class="history-card">
        <img src="${s.imageUrl}" alt="Scan"/>
        <h4>${lang==='hi' ? s.diseaseHi : s.disease}</h4>
        <p>🌾 ${s.crop} | 📅 ${s.date}</p>
        <p>Confidence: <strong>${s.confidence}%</strong></p>
        <span class="badge badge-${s.severity==='High'?'high':s.severity==='Medium'?'medium':'low'}">${s.severity}</span>
      </div>
    `).join('');
  }
  renderGrid('scanHistory');
  renderGrid('profileHistory');
  if (el('statScans')) el('statScans').textContent = scans.length;
}

let _allScanHistory = [];

async function loadScanHistory() {
  const user = AppState.currentUser;
  if (!user) return;

  const container = el('scanHistoryContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="sh-loading">
      <div class="spinner"></div>
      <p>Loading your scan history…</p>
    </div>
  `;

  const errBanner = el('shErrorBanner');
  if (errBanner) errBanner.style.display = 'none';

  const userId = user.id || user._id;
  if (!userId) {
    
    container.innerHTML = `
      <div class="sh-empty">
        <span style="font-size:3.5rem">🌿</span>
        <h3>No backend scans found</h3>
        <p>You are in offline mode. Scan history is only available when logged in via the backend with a valid account.</p>
        <button class="btn-primary" onclick="showSection('detection')">📷 Start Scanning</button>
      </div>
    `;
    return;
  }

  try {
    const sortOrder = el('shSortOrder')?.value || 'newest';
    const url = `${API_BASE}/scans/${userId}?sort=${sortOrder}`;
    console.log('📋 Fetching scan history from:', url);

    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('kr_token') || ''}` },
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    _allScanHistory = data.scans || [];

    console.log(`✅ Loaded ${_allScanHistory.length} scans`);

    updateScanHistoryStats(_allScanHistory);
    applyScanHistoryFilters();

  } catch (error) {
    console.error('❌ Failed to load scans:', error.message);
    if (errBanner) errBanner.style.display = 'block';
    displayScanHistory([]);   
  }
}

function applyScanHistoryFilters() {
  const cropFilter     = el('shCropFilter')?.value     || 'all';
  const severityFilter = el('shSeverityFilter')?.value || 'all';
  const sortOrder      = el('shSortOrder')?.value      || 'newest';

  let filtered = _allScanHistory.filter(scan => {
    const cropMatch     = cropFilter     === 'all' || scan.cropName === cropFilter;
    const severityMatch = severityFilter === 'all' || scan.severity === severityFilter;
    return cropMatch && severityMatch;
  });

  filtered.sort((a, b) => {
    const diff = new Date(a.createdAt) - new Date(b.createdAt);
    return sortOrder === 'oldest' ? diff : -diff;
  });

  const countEl = el('shResultCount');
  if (countEl) {
    countEl.textContent = filtered.length === _allScanHistory.length
      ? `Showing all ${filtered.length} scans`
      : `Showing ${filtered.length} of ${_allScanHistory.length} scans`;
  }

  displayScanHistory(filtered);
}

function displayScanHistory(scans) {
  const container = el('scanHistoryContainer');
  if (!container) return;

  if (!scans.length) {
    container.innerHTML = `
      <div class="sh-empty">
        <span style="font-size:3.5rem">🌿</span>
        <h3>${_allScanHistory.length > 0 ? 'No scans match your filters' : 'No scans yet'}</h3>
        <p>${_allScanHistory.length > 0
          ? 'Try changing the filters above.'
          : 'Upload a crop image to detect diseases and save them here!'}
        </p>
        <button class="btn-primary" onclick="showSection('detection')">📷 Scan Now</button>
      </div>
    `;
    return;
  }

  container.innerHTML = scans.map(scan => buildScanHistoryCard(scan)).join('');
}

/**
 * Build HTML for a single scan card in the Scan History section.
 */
function buildScanHistoryCard(scan) {
  // Format date
  const date    = new Date(scan.createdAt);
  const dateStr = date.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  const timeStr = date.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });

  const cropEmojis = { wheat:'🌾', rice:'🍚', maize:'🌽', cotton:'🫧', tomato:'🍅', potato:'🥔', onion:'🧅' };
  const imgHtml = scan.imagePath
    ? `<img src="http://localhost:5000${scan.imagePath}" alt="Crop scan" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.innerHTML='${cropEmojis[scan.cropName]||'🌿'}'"/>`
    : (cropEmojis[scan.cropName] || '🌿');

  const treatment = scan.treatment
    ? scan.treatment.slice(0, 120) + (scan.treatment.length > 120 ? '…' : '')
    : 'No treatment info available.';

  // Severity badge color
  const sev     = scan.severity || 'Unknown';
  const sevColor = sev === 'High' ? '#ef5350' : sev === 'Medium' ? '#ffa726' : '#66bb6a';
  const sevBg    = sev === 'High' ? '#ffebee' : sev === 'Medium' ? '#fff8e1' : '#e8f5e9';

  return `
    <div class="scan-card-new" id="shCard-${scan._id}">
      <!-- Image area -->
      <div class="scan-card-new-img">${imgHtml}</div>

      <!-- Body -->
      <div class="scan-card-new-body">
        <span class="scan-card-new-crop">🌾 ${(scan.cropName||'').charAt(0).toUpperCase()+(scan.cropName||'').slice(1)}</span>
        <div class="scan-card-new-disease">🦠 ${scan.diseaseName}</div>
        <span style="display:inline-block;padding:.18rem .6rem;border-radius:20px;font-size:.72rem;font-weight:700;background:${sevBg};color:${sevColor};">${sev}</span>
        <div class="scan-card-new-meta">
          <span>📅 ${dateStr} at ${timeStr}</span>
          ${scan.location?.village ? `<span>📍 ${scan.location.village}</span>` : (scan.village ? `<span>📍 ${scan.village}</span>` : '')}
          ${scan.tagUsed ? `<span>🏷 Tags: <em>${scan.tagUsed}</em></span>` : ''}
        </div>
        <div class="scan-card-new-treatment">
          💊 <strong>Treatment:</strong> ${treatment}
        </div>
      </div>

      <!-- Footer -->
      <div class="scan-card-new-footer">
        <button class="sh-btn-delete" onclick="deleteScanFromHistory('${scan._id}')">
          🗑 Delete
        </button>
      </div>
    </div>
  `;
}

async function deleteScanFromHistory(scanId) {
  if (!confirm('Delete this scan? This cannot be undone.')) return;

  try {
    const response = await fetch(`${API_BASE}/scans/${scanId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('kr_token') || ''}` },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) throw new Error(`Delete failed: ${response.status}`);

    _allScanHistory = _allScanHistory.filter(s => s._id !== scanId);

    const card = el(`shCard-${scanId}`);
    if (card) {
      card.style.transition = 'opacity .3s, transform .3s';
      card.style.opacity = '0';
      card.style.transform = 'scale(.95)';
      setTimeout(() => {
        updateScanHistoryStats(_allScanHistory);
        applyScanHistoryFilters();
      }, 300);
    }
    showToast('✅ Scan deleted successfully!');

  } catch (err) {
    console.error('Delete failed:', err.message);
    showToast('❌ Delete failed. Please try again.', 3000);
  }
}

function updateScanHistoryStats(scans) {
  if (el('shStatTotal'))  el('shStatTotal').textContent  = scans.length;
  if (el('shStatHigh'))   el('shStatHigh').textContent   = scans.filter(s => s.severity === 'High').length;
  if (el('shStatMedium')) el('shStatMedium').textContent = scans.filter(s => s.severity === 'Medium').length;
  if (el('shStatLow'))    el('shStatLow').textContent    = scans.filter(s => !s.severity || s.severity === 'Low' || s.severity === 'Unknown').length;
}

let _realAlerts = null;

async function fetchRealtimeAlerts() {
  const container = el('alertsList');
  if (!container) return;
  
  const user = AppState.currentUser;
  if (!user || (!user.id && !user._id)) {
    
    generateLocalWeatherAlerts();
    return;
  }

  const userId = user.id || user._id;

  container.innerHTML = `
    <div style="text-align:center; padding:2rem; color:var(--text-muted)">
      <div class="spinner" style="margin: 0 auto 1rem;"></div>
      <p>${AppState.lang === 'hi' ? 'रीयल-टाइम मौसम अलर्ट प्राप्त कर रहे हैं...' : 'Fetching real-time weather alerts...'}</p>
    </div>
  `;

  try {
    
    await fetch(`${API_BASE}/alerts/${userId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('kr_token') || ''}` },
      signal: AbortSignal.timeout(8000)
    }).catch(e => console.warn('Failed to generate new alerts:', e.message));

    const response = await fetch(`${API_BASE}/alerts/recent/${userId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('kr_token') || ''}` },
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) throw new Error('Failed to fetch recent alerts');
    
    const data = await response.json();
    _realAlerts = data.alerts || [];
    renderAlerts();

  } catch (error) {
    console.error('Realtime alerts failed:', error.message);
    generateLocalWeatherAlerts();
  }
}

function generateLocalWeatherAlerts() {
  const w = AppState.weatherData;
  if (!w) {
    
    setTimeout(generateLocalWeatherAlerts, 2000);
    return;
  }

  const temp = w.temp;
  const hum  = w.humidity;
  const rain = w.rain;
  const wind = w.wind || 0;
  
  const alerts = [];
  const village = AppState.userCity || 'Your Location';

  if (hum >= 80 && rain > 2) {
    alerts.push({ alertType: 'FUNGAL_HIGH', riskLevel: 'High', icon: '🍄', predictedDiseases: ['High Fungal Outbreak Risk'], affectedCrops: ['potato', 'tomato', 'wheat'], message: `Critical weather: ${hum}% humidity and ${rain}mm rain. Ideal conditions for severe fungal outbreak.`, suggestedAction: 'Apply preventive fungicide (Mancozeb).' });
  } else if (hum >= 70 && rain > 0) {
    alerts.push({ alertType: 'FUNGAL_MEDIUM', riskLevel: 'Medium', icon: '🍄', predictedDiseases: ['Fungal Leaf Spot Advisory'], affectedCrops: ['wheat', 'cotton', 'maize'], message: `Elevated moisture: ${hum}% humidity with light rain. Medium risk of leaf diseases.`, suggestedAction: 'Monitor crops. Spray neem oil.' });
  }

  if (temp >= 35) {
    alerts.push({ alertType: 'PEST_HIGH', riskLevel: 'High', icon: '🦟', predictedDiseases: ['Severe Heat Pest Infestation'], affectedCrops: ['cotton', 'tomato'], message: `Extreme heat (${temp}°C). Very high risk of rapid pest multiplication.`, suggestedAction: 'Install yellow sticky traps immediately.' });
  } else if (temp >= 30 && hum < 50) {
    alerts.push({ alertType: 'PEST_MEDIUM', riskLevel: 'Medium', icon: '🦟', predictedDiseases: ['Dry Heat Pest Warning'], affectedCrops: ['onion', 'cotton'], message: `Warm & dry conditions (${temp}°C). Moderate risk for Thrips and Leaf Miners.`, suggestedAction: 'Inspect crops every 2-3 days.' });
  }

  if (temp >= 25 && temp < 35 && hum >= 65) {
    alerts.push({ alertType: 'BACTERIAL_MEDIUM', riskLevel: 'Medium', icon: '🦠', predictedDiseases: ['Bacterial Blight Condition'], affectedCrops: ['rice', 'cotton'], message: `Warm & Humid (${temp}°C, ${hum}%). Favorable for bacterial disease spread.`, suggestedAction: 'Avoid overhead irrigation.' });
  }

  if (wind >= 15) {
    const risk = wind >= 25 ? 'High' : 'Medium';
    alerts.push({ alertType: 'WIND_SPREAD', riskLevel: risk, icon: '💨', predictedDiseases: ['Airborne Spore Transmission'], affectedCrops: ['wheat', 'rice'], message: `High Winds (${wind} km/h). Strong potential for airborne spread of fungal spores.`, suggestedAction: 'Postpone chemical spraying. Inspect downwind boundaries.' });
  }

  if (temp <= 10) {
    alerts.push({ alertType: 'COLD_HIGH', riskLevel: 'High', icon: '🥶', predictedDiseases: ['Frost Damage Warning'], affectedCrops: ['tomato', 'potato'], message: `Freezing temperatures (${temp}°C). High risk of cellular frost damage to crops.`, suggestedAction: 'Cover sensitive crops at night.' });
  }

  if (alerts.length === 0) {
    alerts.push({ alertType: 'ALL_CLEAR', riskLevel: 'Low', icon: '✅', predictedDiseases: ['Optimal Weather Conditions'], affectedCrops: ['wheat', 'rice', 'cotton'], message: `Weather is stable (${temp}°C, ${hum}% Hum, Wind ${wind}km/h). No major threat detected.`, suggestedAction: 'Continue regular monitoring.' });
  }

  _realAlerts = alerts.map((a, i) => ({
    ...a,
    village,
    createdAt: new Date().toISOString(),
    weatherData: { temperature: temp, humidity: hum, rain: rain }
  }));

  renderAlerts();
}

function renderAlerts() {
  const container = el('alertsList');
  if (!container || !_realAlerts) return;

  const cropFilter     = el('alertCropFilter')?.value || 'all';
  const severityFilter = el('alertSeverityFilter')?.value || 'all';
  const lang           = AppState.lang;

  const filtered = _realAlerts.filter(a => {
    
    const crops = a.affectedCrops || (a.cropName ? [a.cropName] : []);
    const cropMatch = cropFilter === 'all' || crops.includes(cropFilter) || a.crop === cropFilter;
    const sevMatch  = severityFilter === 'all' || a.riskLevel === severityFilter || a.severity === severityFilter;
    return cropMatch && sevMatch;
  });

  if (el('alertCount')) el('alertCount').textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `<p class="no-data">${lang === 'hi' ? 'कोई अलर्ट नहीं मिला।' : 'No alerts found.'}</p>`;
    return;
  }

  const cropEmojis = { wheat:'🌾', rice:'🍚', maize:'🌽', cotton:'🫧', tomato:'🍅', potato:'🥔', onion:'🧅' };

  container.innerHTML = filtered.map(a => {
    const sev = a.riskLevel || a.severity || 'Unknown';
    const sevClass = sev === 'High' ? 'high' : sev === 'Medium' ? 'medium' : 'low';
    const dateStr = new Date(a.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short' });
    const locationStr = a.village || a.location || '--';
    
    let diseaseNames = [];
    if (a.predictedDiseases && a.predictedDiseases.length > 0) {
      diseaseNames = a.predictedDiseases;
    } else if (a.diseaseName) {
      diseaseNames = [a.diseaseName];
    } else if (a.disease) {
      diseaseNames = [a.disease];
    } else {
      diseaseNames = [a.alertType || 'Alert'];
    }

    const translatedNames = diseaseNames.map(name => {
      let text = name;
      if (lang === 'hi' && window.HINDI_DISEASES) {
        const hdKey = Object.keys(window.HINDI_DISEASES).find(k => name.toLowerCase().includes(k.toLowerCase()));
        if (hdKey) text = window.HINDI_DISEASES[hdKey].name;
      }
      return text;
    }).join(', ');

    let cropLabel = 'Multiple Crops';
    if (a.affectedCrops && a.affectedCrops.length > 0) {
      cropLabel = a.affectedCrops.map(c => `${cropEmojis[c]||'🌿'} ${c}`).join(', ');
    } else if (a.crop) {
      cropLabel = `${cropEmojis[a.crop]||'🌿'} ${a.crop}`;
    }

    let actionText = a.suggestedAction || a.solution || '--';
    if (lang === 'hi' && a.solutionHi) actionText = a.solutionHi; 

    let weatherStr = '';
    if (a.weatherData) {
      weatherStr = `<small style="display:block; margin-top:4px; color:var(--text-muted)">
        🌡 ${a.weatherData.temperature}°C | 💧 ${a.weatherData.humidity}% | 🌧 ${a.weatherData.rain}mm
      </small>`;
    }

    return `
      <div class="alert-item severity-${sev}">
        <span class="alert-emoji">${a.icon || a.emoji || '⚠'}</span>
        <div class="alert-info">
          <strong>${translatedNames}</strong>
          <p class="crop-name">${cropLabel}</p>
          <p class="disease">📍 ${locationStr}</p>
          <p class="solution">💊 ${lang === 'hi' ? 'सुझाव: ' : 'Action: '}${actionText}</p>
          ${weatherStr}
        </div>
        <div class="alert-meta">
          <span class="badge badge-${sevClass}">${sev}</span>
          <br/><small style="color:var(--text-muted);margin-top:4px;display:block">${dateStr}</small>
        </div>
      </div>
    `;
  }).join('');
}

function filterAlerts() { renderAlerts(); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderTips() {
  const cropFilter = el('tipCropFilter')?.value || 'all';
  const catFilter  = el('tipCategoryFilter')?.value || 'all';
  const lang       = AppState.lang;
  const filtered   = TIPS_DATA.filter(t =>
    (cropFilter==='all' || t.crop===cropFilter || t.crop==='all') &&
    (catFilter==='all' || t.category===catFilter)
  );
  const container = el('tipsList');
  if (!container) return;
  const catLabels = { pest:'🐛 Pest', irrigation:'💧 Irrigation', fertilizer:'🧪 Fertilizer', harvest:'🌾 Harvest' };
  container.innerHTML = filtered.length === 0
    ? `<p class="no-data">${lang==='hi'?'कोई सुझाव नहीं मिला।':'No tips found.'}</p>`
    : filtered.map(t => `
      <div class="tip-card">
        <div class="tip-icon">${t.icon}</div>
        <h4>${lang==='hi'?t.titleHi:t.title}</h4>
        <p>${lang==='hi'?t.tipHi:t.tip}</p>
        <span class="tip-tag">${catLabels[t.category]||t.category}</span>
      </div>
    `).join('');
}
function filterTips() { renderTips(); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCHEMES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderSchemes() {
  const container = el('schemesList');
  if (!container) return;
  const lang = AppState.lang;
  container.innerHTML = SCHEMES_DATA.map(s => `
    <div class="scheme-card">
      <span class="scheme-icon">${s.icon}</span>
      <h3>${lang==='hi'?s.nameHi:s.name}</h3>
      <p>${lang==='hi'?s.descHi:s.desc}</p>
      <div class="scheme-benefit">✅ ${lang==='hi'?s.benefitHi:s.benefit}</div>
      <a href="${s.link}" target="_blank" class="scheme-link">🔗 ${s.linkText}</a>
    </div>
  `).join('');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderProfile() {
  const user = AppState.currentUser;
  if (!user) return;
  const lang = AppState.lang;
  el('profileAvatar').textContent  = user.avatar || '🧑‍🌾';
  el('profileName').textContent    = user.name;
  el('profileEmail').textContent   = user.email;
  el('profileVillage').textContent = `📍 ${user.village || '--'}`;
  el('profileCrop').textContent    = `🌾 ${lang==='hi'?'मुख्य फसल: ':'Main Crop: '}${user.crop || '--'}`;
  if (el('editName'))    el('editName').value    = user.name    || '';
  if (el('editPhone'))   el('editPhone').value   = user.phone   || '';
  if (el('editVillage')) el('editVillage').value = user.village || '';
  if (el('editCrop'))    el('editCrop').value    = user.crop    || 'wheat';
  if (el('editLand'))    el('editLand').value    = user.land    || '';
  el('statScans').textContent  = getScanHistory().length;
  el('statAlerts').textContent = _realAlerts ? _realAlerts.length : ALERTS_DATA.length;
  renderScanHistory();
}

function saveProfile(e) {
  e.preventDefault();
  const lang = AppState.lang;
  const updated = { ...AppState.currentUser, name: el('editName').value.trim(), phone: el('editPhone').value.trim(), village: el('editVillage').value.trim(), crop: el('editCrop').value, land: el('editLand').value.trim() };
  AppState.currentUser = updated;
  localStorage.setItem('kr_loggedIn', JSON.stringify(updated));
  if (!updated.googleAuth) {
    const users = getUsers();
    const idx = users.findIndex(u => u.email === updated.email);
    if (idx !== -1) { users[idx] = { ...users[idx], ...updated }; saveUsers(users); }
  }
  renderProfile();
  showToast(T[lang].profileSaved);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DASHBOARD UPDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function updateDashboard() {
  el('currentDate').textContent = getDateString();
  const alertArr = _realAlerts || ALERTS_DATA;
  if (el('alertCount')) el('alertCount').textContent = alertArr.length;
  const highCount = alertArr.filter(a => (a.riskLevel || a.severity) === 'High').length;
  if (el('highAlertBadge')) el('highAlertBadge').textContent = AppState.lang==='hi' ? `⬆ ${highCount} अधिक गंभीर` : `⬆ ${highCount} High Severity`;
  renderScanHistory();
  renderDiseaseRisk();
  updateCropHealth();
}

function setupDragDrop() {
  const area = el('uploadArea');
  if (!area) return;
  area.addEventListener('dragover',  (e) => { e.preventDefault(); area.style.background = 'var(--primary-l)'; });
  area.addEventListener('dragleave', ()  => { area.style.background = ''; });
  area.addEventListener('drop',      (e) => {
    e.preventDefault(); area.style.background = '';
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const input = el('cropImage');
      const dt = new DataTransfer();
      dt.items.add(files[0]);
      input.files = dt.files;
      previewImage({ target: { files: [files[0]] } });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const savedLang  = localStorage.getItem('kr_lang')  || 'en';
  const savedTheme = localStorage.getItem('kr_theme') || 'light';

  AppState.lang  = savedLang;
  AppState.theme = savedTheme;

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (el('themeToggle')) el('themeToggle').textContent = '☀';
  }

  setLang(savedLang);

  const savedUser = localStorage.getItem('kr_loggedIn');
  if (savedUser) {
    try {
      AppState.currentUser = JSON.parse(savedUser);
      launchApp();
    } catch(e) { localStorage.removeItem('kr_loggedIn'); }
  }

  setupDragDrop();

  if (getUsers().length === 0) {
    saveUsers([{
      name:'Ramesh Kumar', email:'ramesh@farmer.in', password: btoa('farmer123'),
      phone:'9876543210', village:'Khanna, Punjab', crop:'wheat', land:'5',
      avatar:'🧑‍🌾', joinDate: new Date().toISOString()
    }]);
  }

  fetchRealtimeAlerts();
  renderTips();
  renderSchemes();

  console.log('🌾 KisanRakshak App Initialized!');
  console.log('📧 Demo: ramesh@farmer.in | 🔒 farmer123');
  console.log(`🔗 Backend API: ${API_BASE}/detect`);
});

let _searchDebounceTimer = null;

function initSmartSearch() {
  const input = el('smartSearchInput');
  if (input) {
    setTimeout(() => input.focus(), 200);
  }
  
  const grid = el('searchResultsGrid');
  if (grid && grid.innerHTML.trim() === '') {
    grid.innerHTML = `
      <div class="search-placeholder">
        <span style="font-size:3.5rem">🌱</span>
        <h3>Type a symptom above to search</h3>
        <p>Supports <strong>English</strong> and <strong>Hindi (हिंदी)</strong><br>
           Partial words work: "पीले" will match "पीले धब्बे"</p>
      </div>
    `;
  }
}

/**
 * Called on every keystroke via oninput.
 * Waits 500ms after the user stops typing before running search.
 * This prevents hammering the backend on every character.
 */
function smartSearchDebounce() {
  clearTimeout(_searchDebounceTimer);
  const val = (el('smartSearchInput')?.value || '').trim();

  // Show/hide the ✕ clear button
  const clearBtn = el('smartSearchClear');
  if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';

  if (!val) {
    
    el('searchStatusMsg').textContent = '';
    el('searchResultsGrid').innerHTML = `
      <div class="search-placeholder">
        <span style="font-size:3.5rem">🌱</span>
        <h3>Type a symptom above to search</h3>
        <p>Supports <strong>English</strong> and <strong>Hindi (हिंदी)</strong></p>
      </div>
    `;
    return;
  }

  _searchDebounceTimer = setTimeout(() => runSmartSearch(), 500);
}

async function runSmartSearch() {
  const query = (el('smartSearchInput')?.value || '').trim();
  if (!query) return;

  const crop  = el('searchCropFilter')?.value  || '';
  const lang  = AppState.lang || 'en';

  el('searchResultsGrid').innerHTML = `
    <div class="search-placeholder">
      <div class="spinner"></div>
      <p>Searching for "<strong>${query}</strong>"…</p>
    </div>
  `;
  el('searchStatusMsg').textContent = '';

  // Build URL –  e.g. /api/search?query=yellow spots&lang=en&crop=wheat
  const params = new URLSearchParams({ query, lang });
  if (crop) params.append('crop', crop);
  const url = `${API_BASE}/search?${params.toString()}`;

  console.log('🔍 Smart Search →', url);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();

    el('searchStatusMsg').textContent = data.message || '';

    // Render results
    displaySearchResults(data.diseases || [], query, lang);

  } catch (err) {
    console.error('Search failed:', err.message);

    // Fallback: search the local JS disease DB offline
    offlineSmartSearch(query, lang, crop);
  }
}

/**
 * Renders search result cards into #searchResultsGrid.
 * Each card shows: crop badge, disease name, severity, tags,
 * symptoms, treatment preview, and a "Detect this" button.
 */
function displaySearchResults(diseases, query, lang) {
  const grid = el('searchResultsGrid');
  if (!grid) return;

  if (!diseases.length) {
    grid.innerHTML = `
      <div class="search-placeholder">
        <span style="font-size:3rem">🔎</span>
        <h3>${lang === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}</h3>
        <p>${lang === 'hi'
          ? `"${query}" के लिए कोई बीमारी नहीं मिली।<br>कोई और लक्षण आज़माएं।`
          : `No disease matched "<strong>${query}</strong>".<br>Try a different symptom or remove the crop filter.`
        }</p>
        <div style="margin-top:1rem;display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center">
          <button class="search-chip" onclick="setSearchChip('yellow spots')">🟡 yellow spots</button>
          <button class="search-chip" onclick="setSearchChip('rust')">🟠 rust</button>
          <button class="search-chip" onclick="setSearchChip('blight')">🔴 blight</button>
          <button class="search-chip" onclick="setSearchChip('पीले धब्बे')">🟡 पीले धब्बे</button>
        </div>
      </div>
    `;
    return;
  }

  const cropEmojis = {
    wheat:'🌾', rice:'🍚', maize:'🌽',
    cotton:'🫧', tomato:'🍅', potato:'🥔', onion:'🧅'
  };

  grid.innerHTML = diseases.map(d => {
    const sev      = d.severity || 'Unknown';
    const sevColor = sev === 'High' ? '#ef5350' : sev === 'Medium' ? '#ffa726' : '#66bb6a';
    const sevBg    = sev === 'High' ? '#ffebee' : sev === 'Medium' ? '#fff8e1' : '#e8f5e9';
    const emoji    = cropEmojis[d.cropName] || '🌿';

    let safeName = (d.diseaseName || 'Unknown Disease').trim();
    let sympText = d.symptoms || '';
    let treatText = d.treatment || '—';

    // ── Translate to Hindi if requested ──
    if (lang === 'hi' && window.HINDI_DISEASES) {
      const hdKey = Object.keys(window.HINDI_DISEASES).find(k => safeName.toLowerCase().includes(k.toLowerCase()));
      if (hdKey) {
        const hd = window.HINDI_DISEASES[hdKey];
        safeName = `${hd.name} (${safeName})`;
        sympText = hd.symp;
        treatText = hd.treat;
      }
    }

    const tagChips = (d.tags || []).slice(0, 4).map(t =>
      `<span class="search-result-tag">${t}</span>`
    ).join('');

    // Truncate treatment to keep card compact
    const treatPreview = treatText
      ? treatText.slice(0, 110) + (treatText.length > 110 ? '…' : '')
      : '—';

    return `
      <div class="search-result-card">
        <!-- Header -->
        <div class="src-header">
          <span class="src-crop">${emoji} ${capitalize(d.cropName)}</span>
          <span class="src-sev" style="background:${sevBg};color:${sevColor}">${sev}</span>
        </div>

        <!-- Disease name -->
        <div class="src-disease">🦠 ${safeName}</div>

        <!-- Tags -->
        <div class="src-tags">${tagChips}</div>

        <!-- Symptoms preview -->
        ${sympText ? `
        <div class="src-symptoms">
          <strong>🔍 ${lang === 'hi' ? 'लक्षण' : 'Symptoms'}:</strong>
          <span>${sympText.slice(0, 100)}${sympText.length > 100 ? '…' : ''}</span>
        </div>` : ''}

        <!-- Treatment preview -->
        <div class="src-treatment">
          <strong>💊 ${lang === 'hi' ? 'उपचार' : 'Treatment'}:</strong> ${treatPreview}
        </div>

        <!-- Action button -->
        <div class="src-footer">
          <button class="btn-primary btn-sm src-detect-btn"
            onclick="goDetectFromSearch('${d.cropName}')">
            📷 ${lang === 'hi' ? 'इस फसल की जाँच करें' : 'Detect this crop'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Small helper: capitalize the first letter of a string.
 * (We also define this in the scan-history code; safe to call it here too.)
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * When user clicks "Detect this crop" from a search result,
 * jump to the detection section and pre-select that crop.
 */
function goDetectFromSearch(cropName) {
  showSection('detection');
  const select = el('detectionCrop');
  if (select && cropName) select.value = cropName;
}

/**
 * Set a quick-suggestion chip as the search input value and run.
 */
function setSearchChip(text) {
  const input = el('smartSearchInput');
  if (input) {
    input.value = text;
    const clearBtn = el('smartSearchClear');
    if (clearBtn) clearBtn.style.display = 'flex';
  }
  runSmartSearch();
}

/**
 * Clear the search input and reset the grid.
 */
function clearSmartSearch() {
  const input = el('smartSearchInput');
  if (input) { input.value = ''; input.focus(); }
  const clearBtn = el('smartSearchClear');
  if (clearBtn) clearBtn.style.display = 'none';
  el('searchStatusMsg').textContent = '';
  el('searchResultsGrid').innerHTML = `
    <div class="search-placeholder">
      <span style="font-size:3.5rem">🌱</span>
      <h3>Type a symptom above to search</h3>
      <p>Supports <strong>English</strong> and <strong>Hindi (हिंदी)</strong></p>
    </div>
  `;
}

const HINDI_MAP_OFFLINE = {
  'पीले धब्बे':'yellow spots', 'पीला':'yellow', 'पीली धारियाँ':'yellow stripes',
  'भूरे धब्बे':'brown spots',  'भूरा':'brown',  'काले धब्बे':'black spots',
  'सफेद पाउडर':'white powder', 'जंग':'rust',    'फफूंद':'fungus',
  'झुलसा':'blight',            'माहू':'aphids', 'पत्ती मुड़ना':'leaf curl',
  'कुंगी':'rust',              'मुरझाना':'wilting', 'सड़न':'rot',
  'कंड':'smut',                'बैंगनी धब्बे':'purple spots',
};

function offlineSmartSearch(query, lang, crop) {
  const statusEl = el('searchStatusMsg');
  if (statusEl) statusEl.textContent = '⚠ Backend offline – showing local results';

  const rawTerms = query.toLowerCase().split(/[,\s]+/).filter(t => t.length > 1);

  const terms = [...rawTerms];
  for (const [hi, en] of Object.entries(HINDI_MAP_OFFLINE)) {
    for (const t of rawTerms) {
      if (hi.includes(t) || t.includes(hi)) {
        if (!terms.includes(en)) terms.push(en);
      }
      if (en.includes(t) || t.includes(en)) {
        if (!terms.includes(hi)) terms.push(hi);
      }
    }
  }

  let results = [];
  const dbToSearch = crop && LOCAL_DISEASE_DB[crop]
    ? { [crop]: LOCAL_DISEASE_DB[crop] }
    : LOCAL_DISEASE_DB;

  for (const [cropName, diseaseList] of Object.entries(dbToSearch)) {
    for (const d of diseaseList) {
      const text = [d.name, ...d.tags].join(' ').toLowerCase();
      if (terms.some(t => text.includes(t))) {
        results.push({
          cropName,
          diseaseName: d.name,
          tags:        d.tags,
          symptoms:    d.tags.join(', '),
          treatment:   d.treatment,
          prevention:  d.prevention,
          severity:    d.severity || 'Medium',
        });
      }
    }
  }

  if (!results.length && !crop) {
    for (const [cropName, diseaseList] of Object.entries(LOCAL_DISEASE_DB)) {
      results.push({
        cropName,
        diseaseName: diseaseList[0].name,
        tags:        diseaseList[0].tags,
        symptoms:    diseaseList[0].tags.join(', '),
        treatment:   diseaseList[0].treatment,
        severity:    diseaseList[0].severity || 'Medium',
      });
      if (results.length >= 4) break;
    }
  }

  displaySearchResults(results, query, lang);
  showToast('⚠ Backend offline – showing local data', 3000);
}