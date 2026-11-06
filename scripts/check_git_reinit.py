import subprocess

out = subprocess.check_output(['git', 'show', 'ef3b631:public/assets/js/vach.js'], encoding='utf-8')
idx = out.find('window.VACH_REINIT')
print("VACH_REINIT in ef3b631:")
print(out[idx:idx+800])
