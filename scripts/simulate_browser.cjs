const fs = require('fs');

const elements = {};
const listeners = {};

const document = {
  documentElement: {
    classList: {
      add: (c) => console.log('classList.add:', c),
      remove: (c) => console.log('classList.remove:', c),
      toggle: (c, val) => console.log('classList.toggle:', c, val),
      contains: () => false
    }
  },
  getElementById: (id) => {
    if (!elements[id]) {
      elements[id] = {
        id,
        tagName: id === 'c' ? 'CANVAS' : 'DIV',
        style: {},
        classList: {
          add: () => {},
          remove: () => {},
          toggle: () => {},
          contains: () => false
        },
        querySelectorAll: () => [],
        querySelector: () => null,
        appendChild: () => {},
        insertBefore: () => {},
        parentNode: { appendChild: () => {}, insertBefore: () => {} },
        parentElement: { appendChild: () => {}, insertBefore: () => {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }) },
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }),
        addEventListener: (ev, fn) => {
          listeners[id + ':' + ev] = fn;
        },
        removeEventListener: () => {},
        getContext: (type) => {
          console.log("getContext called with:", type);
          return {
            createShader: () => ({}),
            shaderSource: () => {},
            compileShader: () => {},
            getShaderParameter: () => true,
            createProgram: () => ({}),
            attachShader: () => {},
            linkProgram: () => {},
            getProgramParameter: () => true,
            useProgram: () => {},
            createBuffer: () => ({}),
            bindBuffer: () => {},
            bufferData: () => {},
            enableVertexAttribArray: () => {},
            vertexAttribPointer: () => {},
            clearColor: () => {},
            clear: () => {},
            drawArrays: () => {},
            viewport: () => {},
            isContextLost: () => false,
            getExtension: () => null,
            getParameter: () => 4096
          };
        }
      };
    }
    return elements[id];
  },
  createElement: (tag) => {
    return {
      tagName: tag.toUpperCase(),
      style: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      querySelectorAll: () => [],
      querySelector: () => null,
      appendChild: () => {},
      getContext: () => null
    };
  },
  createComment: () => ({}),
  addEventListener: () => {},
  removeEventListener: () => {},
  fonts: { check: () => true }
};

const window = {
  document,
  addEventListener: () => {},
  removeEventListener: () => {},
  setTimeout: (fn) => fn(),
  setInterval: () => {},
  clearTimeout: () => {},
  innerWidth: 1200,
  innerHeight: 800,
  devicePixelRatio: 1,
  location: { href: 'http://localhost:3000/tu-thiet-ke-vach' }
};

const vachDataCode = fs.readFileSync('public/assets/js/vach-data.js', 'utf8');
const vachJsCode = fs.readFileSync('public/assets/js/vach.js', 'utf8');

// Run in a pure browser scope (no module / require)
const runBrowser = new Function('window', 'document', 'innerWidth', 'innerHeight', 'location', `
  ${vachDataCode};
  ${vachJsCode};
`);

console.log("Running in browser simulation...");
try {
  runBrowser(window, document, 1200, 800, window.location);
  console.log("SUCCESS! vach.js executed completely without errors!");
} catch (e) {
  console.error("BROWSER EXECUTION ERROR:", e);
}
