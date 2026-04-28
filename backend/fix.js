const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

code = code.replace(/\} catch \(err\) \{\s*hideLoading\(\);\s*console\.warn\('Login failed:', err\.message\);\s*\}/, 
`} catch (err) {
    hideLoading();
    console.warn('Login failed:', err.message);
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      el('pwErr').textContent = '❌ Backend connection failed. Please check Vercel database connection.';
      return;
    }
  }`);

code = code.replace(/\} catch \(err\) \{\s*hideLoading\(\);\s*console\.warn\('Register failed:', err\.message\);\s*\}/,
`} catch (err) {
    hideLoading();
    console.warn('Register failed:', err.message);
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      el('regErr').textContent = '❌ Backend connection failed. Please check Vercel database connection.';
      return;
    }
  }`);

fs.writeFileSync('script.js', code);
console.log('Fixed auth fallback logic.');
