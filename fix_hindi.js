const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

code = code.replace(
  /setText\('navBrand', lang === 'hi' \? 'कृषि रक्षक' : 'KrishiRakshak'\);/,
  "setText('navBrand', 'KrishiRakshak');"
);

code = code.replace(
  /setText\('footerCopy', lang === 'hi' \? '© 2026 कृषि रक्षक। सर्वाधिकार सुरक्षित।' : '© 2026 KrishiRakshak. All rights reserved.'\);/,
  "setText('footerCopy', '© 2026 KrishiRakshak for Indian Farmers.');"
);

fs.writeFileSync('script.js', code);
console.log('Fixed Hindi names in script.js');
