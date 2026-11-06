const fs = require('fs');

// Check syntax of vach.js
console.log("Checking vach-data.js syntax...");
try {
  require('../public/assets/js/vach-data.js');
} catch (e) {
  console.log("vach-data.js error (might be window):", e.message);
}

console.log("Checking vach.js syntax...");
const code = fs.readFileSync('public/assets/js/vach.js', 'utf8');
try {
  new Function(code);
  console.log("vach.js syntax is VALID!");
} catch (e) {
  console.error("vach.js SYNTAX ERROR:", e);
}

