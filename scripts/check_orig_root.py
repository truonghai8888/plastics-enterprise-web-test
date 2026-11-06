import subprocess

res = subprocess.run(['git', 'show', 'cc7a5686:public/assets/css/vach.css'], capture_output=True, text=True, encoding='utf-8')
idx = res.stdout.find(':root{')
print(res.stdout[idx:idx+1500])
