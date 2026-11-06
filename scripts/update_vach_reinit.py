with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Expose veCot in window.VACH_VO
old_vo = 'window.VACH_VO={moMuc,mucDangMo:()=>muc'
new_vo = 'window.VACH_VO={veCot,moMuc,mucDangMo:()=>muc'
text = text.replace(old_vo, new_vo)

# 2. Update window.VACH_REINIT
reinit_target = '''window.VACH_REINIT = function() {
  try {
    if (typeof veCot === 'function') veCot();
    if (typeof moMuc === 'function') moMuc('1a');
    if (typeof veDay === 'function') veDay();
    if (typeof veMoc === 'function') veMoc();
    document.documentElement.classList.add('v3-on');
    console.log('[vách] VACH_REINIT completed successfully');
  } catch(e) {
    console.warn('[vách] VACH_REINIT error:', e);
  }
};'''

new_reinit = '''window.VACH_REINIT = function() {
  try {
    if (window.VACH_VO) {
      if (typeof window.VACH_VO.veCot === 'function') window.VACH_VO.veCot();
      if (typeof window.VACH_VO.moMuc === 'function') window.VACH_VO.moMuc('1a');
      if (typeof window.VACH_VO.veDay === 'function') window.VACH_VO.veDay();
      if (typeof window.VACH_VO.veMoc === 'function') window.VACH_VO.veMoc();
    }
    if (window.VACH && typeof window.VACH.lamMoi === 'function') {
      window.VACH.lamMoi(true);
    }
    console.log('[vách] VACH_REINIT completed successfully');
  } catch(e) {
    console.warn('[vách] VACH_REINIT error:', e);
  }
};'''

text = text.replace(reinit_target, new_reinit)

with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated public/assets/js/vach.js successfully')
