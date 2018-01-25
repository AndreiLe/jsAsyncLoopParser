;(function(){
  
  // Establish the root object, `window` in the browser, or `exports` on the server.
  const root = this;
  const appStorage = root[sourceName];
  
  const HtmlLoader = {};
  
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.HtmlLoader = HtmlLoader;
    }
    exports.HtmlLoader = HtmlLoader;
  } else {
    appStorage.HtmlLoader = HtmlLoader;
  }

  HtmlLoader.loadFiles = function(event) {

    let files = event.target.files;
    let htmlFiles = [];

    let filesLength = files.length;
    let file = null;
    for (let i = 0; i < filesLength; i++) {
      file = files[i];

      if (!file.type.match('text/html')) {
        continue;
      }

      htmlFiles.push(file);
    }
    
    return htmlFiles;
  };
  
}.call(this));
