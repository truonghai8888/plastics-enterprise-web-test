const fs = require('fs');

console.log("Checking vach.js syntax...");
const code = fs.readFileSync('public/assets/js/vach.js', 'utf8');
try {
  new Function(code);
  console.log("vach.js syntax is VALID!");
} catch (e) {
  console.error("vach.js SYNTAX ERROR:", e);
}

