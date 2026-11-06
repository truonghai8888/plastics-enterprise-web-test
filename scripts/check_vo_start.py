with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

sub = text[1807305:1852000]

# Check if veCot, moMuc, muc, TRA, MUC, veDay, veMoc, danBaBuoc exist in sub
for var in ['veCot', 'moMuc', 'muc', 'TRA', 'MUC', 'veDay', 'veMoc', 'danBaBuoc']:
    print(f"'{var}' in sub:", f'function {var}' in sub or f'const {var}' in sub or f'let {var}' in sub or f'var {var}' in sub)

# Check if dat() uses veCot or moMuc
dat_idx = sub.find('function dat()')
print("Inside dat():", sub[dat_idx:dat_idx+500])
