const fs = require('fs');

const elements = {};
function createElement(tag) {
  const el = {
    tagName: tag.toUpperCase(),
    id: '',
    className: '',
    innerHTML: '',
    textContent: '',
    offsetWidth: 800,
    offsetHeight: 600,
    clientWidth: 800,
    clientHeight: 600,
    parentElement: null,
    getBoundingClientRect: () => ({ width: 800, height: 600, top: 0, left: 0, right: 800, bottom: 600 }),
    classList: {
      add: (c) => {},
      remove: (c) => {},
      contains: (c) => false,
      toggle: (c) => {}
    },
    style: {},
    children: [],
    attributes: {},
    dataset: {},
    setAttribute: (k, v) => { el.attributes[k] = v; },
    getAttribute: (k) => el.attributes[k],
    removeAttribute: (k) => { delete el.attributes[k]; },
    remove: () => {},
    addEventListener: (evt, handler) => {},
    removeEventListener: () => {},
    appendChild: (c) => { el.children.push(c); return c; },
    insertBefore: (c, r) => { el.children.push(c); return c; },
    removeChild: (c) => c,
    insertAdjacentHTML: (pos, html) => {},
    querySelector: (sel) => createElement('div'),
    closest: (sel) => createElement('div'),
    insertAdjacentElement: (pos, el) => el,
    querySelectorAll: (sel) => [],
    getContext: (type) => {
      const gl = new Proxy({}, {
        get: (target, prop) => {
          if (prop === 'isContextLost') return () => false;
          if (prop === 'getExtension') return () => ({});
          if (prop === 'getParameter') return () => 4;
          if (prop === 'getShaderParameter') return () => true;
          if (prop === 'getProgramParameter') return () => true;
          if (prop === 'getUniformLocation') return () => ({});
          if (prop === 'getAttribLocation') return () => 0;
          return () => ({});
        }
      });
      return gl;
    }
  };
  el.parentElement = el;
  el.parentNode = el;
  return el;
}

const doc = {
  getElementById: (id) => {
    if (!elements[id]) {
      elements[id] = createElement('div');
      elements[id].id = id;
    }
    return elements[id];
  },
  createElement,
  createComment: () => createElement('comment'),
  querySelector: () => createElement('div'),
  querySelectorAll: () => [],
  documentElement: createElement('html'),
  body: createElement('body'),
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.window = global;
global.innerWidth = 1440;
global.innerHeight = 900;
global.window.innerWidth = 1440;
global.window.innerHeight = 900;
global.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
global.window.matchMedia = global.matchMedia;
global.MutationObserver = function(cb) {
  this.observe = () => {};
  this.disconnect = () => {};
};
global.window.MutationObserver = global.MutationObserver;
global.addEventListener = () => {};
global.removeEventListener = () => {};
global.document = doc;
global.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
global.location = { href: 'http://localhost:3000/tu-thiet-ke-vach', search: '' };
global.requestAnimationFrame = (cb) => {
  return 1;
};
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.Image = function() {
  this.addEventListener = () => {};
};

try {
  require('../public/assets/js/vach-data.js');
  console.log('✓ vach-data.js loaded successfully. NEP_DM items:', Object.keys(window.NEP_DM || {}).length);
  require('../public/assets/js/vach.js');
  console.log('✓ vach.js loaded without error!');
  console.log('✓ typeof window.VACH_REINIT:', typeof window.VACH_REINIT);
  if (typeof window.VACH_REINIT === 'function') {
    window.VACH_REINIT();
    console.log('✓ window.VACH_REINIT executed without error!');
    console.log('✓ v3Cot innerHTML rendered length:', (elements['v3Cot']?.innerHTML || '').length);
    console.log('✓ v3Bang innerHTML rendered length:', (elements['v3Bang']?.innerHTML || '').length);
    console.log('✓ v3So innerHTML rendered length:', (elements['v3So']?.innerHTML || '').length);

console.log('--- TESTING ACTIONS ---');
const btnIds = ['qUndo', 'qLai', 'v3Lui', 'v3Toi', 'qBaoGia', 'qXuat', 'qLuu'];
for (const id of btnIds) {
  const el = elements[id];
  console.log('Button #' + id + ' exists:', !!el, 'onclick:', typeof el?.onclick);
}

// Test calling moMuc for different steps
if (typeof moMuc === 'function') {
  ['1a', '1b', '2a', '3a', '4a', '5a'].forEach(step => {
    try {
      moMuc(step);
      console.log('moMuc(' + step + ') success');
    } catch(e) {
      console.warn('moMuc(' + step + ') error:', e.message);
    }
  });
}

  }
} catch (e) {
  console.error('Crash during load/init:', e);
}
