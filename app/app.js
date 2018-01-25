;(function(){
  
  // Establish the root object, `window` in the browser, or `exports` on the server.
  const root = this;
  const appStorage = root[sourceName];
  const $ = root.$;
  
  function App() {
  }
  
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.App = App;
    }
    exports.App = App;
  } else {
    appStorage.App = App;
  }

  App.prototype.getSourceName = function () {
    return sourceName;
  };

  App.prototype.getHtmlFiles = function () {
    return appStorage['htmlFiles'];
  };

  App.prototype.startWork = function() {
    let AsyncLoop = appStorage.AsyncLoop;
    let asyncLoop = new AsyncLoop(this);
    asyncLoop.startLoop();
  };

}.call(this));
