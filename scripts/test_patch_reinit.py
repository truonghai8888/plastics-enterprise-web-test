with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect clearCho definition and VACH_REINIT definition
old_reinit = """window.VACH_REINIT = function() {
  try {
    if (window.VACH_VO) {
      if (typeof window.VACH_VO.clearCho === 'function') window.VACH_VO.clearCho();
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
};"""

new_reinit = """window.VACH_REINIT = function() {
  try {
    if (window.VACH_VO) {
      if (typeof window.VACH_VO.traHet === 'function') window.VACH_VO.traHet();
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
};"""

if old_reinit in text:
    print("Found exact old_reinit! Replacing...")
    text = text.replace(old_reinit, new_reinit)
    with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Replaced in public/assets/js/vach.js!")
else:
    print("old_reinit NOT found verbatim, looking for window.VACH_REINIT:")
    idx = text.find('window.VACH_REINIT')
    print(text[idx:idx+400])
