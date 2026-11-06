import subprocess

out = subprocess.check_output(['git', 'show', 'ef3b631:src/pages/WallDesignerPage.jsx'], encoding='utf-8')
lines = out.split('\n')
for i, l in enumerate(lines[430:520]):
    print(f"{i+431}: {l}")
