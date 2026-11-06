with open('public/test_step3.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's write a script that dumps the full JSON from output
import json

with open('public/test_step3.html', 'w', encoding='utf-8') as f:
    f.write(text.replace('res.v3Bang_step3_innerHTML = bang ? bang.innerHTML : null;', 'res.has_bangKL = !!doc.getElementById("bangKL"); res.has_bangSo = !!doc.getElementById("bangSo"); res.has_tw = !!doc.querySelector(".tw"); res.bang_children_ids = bang ? Array.from(bang.children).map(c => c.id || c.className) : [];'))
