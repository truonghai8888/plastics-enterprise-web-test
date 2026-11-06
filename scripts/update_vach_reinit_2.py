with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

old_vo = """window.VACH_VO={veCot,moMuc,mucDangMo:()=>muc,buocDang:()=>buocCua(TRA[muc]||{}),
  MUC:MUC.map(m=>m.id),veDay,veMoc,danBaBuoc,
  dsMuc:()=>MUC.map(m=>({id:m.id,node:(m.node||[]).slice()}))};"""

new_vo = """window.VACH_VO={veCot,moMuc,mucDangMo:()=>muc,buocDang:()=>buocCua(TRA[muc]||{}),
  MUC:MUC.map(m=>m.id),veDay,veMoc,danBaBuoc,traHet,
  dsMuc:()=>MUC.map(m=>({id:m.id,node:(m.node||[]).slice()})),
  clearCho:()=>{ try{ if(typeof CHO!=='undefined'&&CHO&&CHO.clear) CHO.clear(); }catch(_){} }};"""

assert old_vo in text, "old_vo not found"
text = text.replace(old_vo, new_vo)

old_reinit = """window.VACH_REINIT = function() {
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
};"""

new_reinit = """window.VACH_REINIT = function() {
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

assert old_reinit in text, "old_reinit not found"
text = text.replace(old_reinit, new_reinit)

with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("vach.js updated with clearCho and traHet!")
