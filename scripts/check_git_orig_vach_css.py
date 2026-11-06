import subprocess

out = subprocess.check_output(['git', 'show', 'ef3b631:public/assets/css/vach.css'], encoding='utf-8')
lines = out.split('\n')
for i in range(40, 55):
    print(f"{i+1}: {lines[i][:120]}")
