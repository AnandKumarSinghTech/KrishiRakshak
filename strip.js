const fs = require('fs');
const path = require('path');
const strip = require('strip-comments');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(walk(filePath));
      }
    } else {
      if (filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.css')) {
        // Skip minified files or third-party files if any
        if (!file.includes('.min.')) {
          results.push(filePath);
        }
      }
    }
  });
  return results;
}

const files = walk(__dirname);
let strippedCount = 0;

files.forEach(file => {
  // Skip this script itself
  if (file === __filename) return;

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  if (file.endsWith('.js')) {
    content = strip(content);
  } else if (file.endsWith('.html')) {
    content = content.replace(/<!--[\s\S]*?-->/g, '');
  } else if (file.endsWith('.css')) {
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  }
  
  // Remove multiple blank lines left by deleted comments
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    strippedCount++;
  }
});

console.log('Successfully stripped comments from ' + strippedCount + ' files.');
