;(function(){
  
  // Establish the root object, `window` in the browser, or `exports` on the server.
  const root = this;
  const appStorage = root[sourceName];

  const Utils = {};
  
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.Utils = Utils;
    }
    exports.Utils = Utils;
  } else {
    appStorage.Utils = Utils;
  }
   
  Utils.replaceAll = function replaceAll(string, search, replacement) {
    return string.replace(new RegExp(search, 'g'), replacement);
  };

  Utils.replaceAllColon = function replaceAllColon(string) {
    return this.replaceAll(string, ':', '-');
  };

  Utils.replaceAllSpaces = function replaceAllSpaces(string) {
    return this.replaceAll(string, '( |&nbsp;|\t|\u00A0)', '');
  };

  Utils.replaceAllMultiSpaces = function replaceAllMultiSpaces(string) {
    string = this.replaceAll(string, '(?:\r\n|\r|\n|\t{1,})', ' ');
    return this.replaceAll(string, ' {2,}', ' ');
  };

  Utils.replaceAllHttp = function replaceAllHttp(string) {
    return this.replaceAll(string,
            '(?:http%20//|https%20//|http //|https //|http://|https://|mailto:|mail:|tel:)',
            '');
  };
  
  Utils.uniqueID = function uniqueID() {
    //random v4 UUID, https://gist.github.com/jed/982883
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };
  
}.call(this));