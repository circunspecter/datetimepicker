const jsdom = require('jsdom');
let { JSDOM } = jsdom;
let dom = (new JSDOM('<!doctype html><html><body></body></html>'));

global.window = dom.window;
global.document = dom.window.document;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
global.CustomEvent = window.CustomEvent;
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  };
};
