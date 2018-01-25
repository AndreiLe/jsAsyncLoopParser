;(function(){

  // Establish the root object, `window` in the browser, or `exports` on the server.
  const root = this;
  const appStorage = root[sourceName];

  function Parser(resolve, reject) {
    this.parserResolve = resolve;
    this.parserReject = reject;
    this.fileReader = null;
    this.DOMParser = null;
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.Parser = Parser;
    }
    exports.Parser = Parser;
  } else {
    appStorage.Parser = Parser;
  }

  Parser.prototype.getFileReader = function () {
    if (this.fileReader === null) {
      this.fileReader = new FileReader();
    }
    return this.fileReader;
  };

  Parser.prototype.getDOMParser = function () {
    if (this.DOMParser === null) {
      this.DOMParser = new DOMParser();
    }
    return this.DOMParser;
  };

  Parser.prototype.startParsing = function(index, file) {
    this.readFile(file).then(
      this.readFileResolve.bind(this, index),
      this.readFileReject.bind(this, index)
    ).catch(
      this.readFileReject.bind(this, index)
    );
  };

  Parser.prototype.readFileResolve = function(index, event) {
    let xmlDoc = this.showDataFile(event.target.result);
    let fileData = this.parseFiles(xmlDoc);
    this.parserResolve(index, fileData);
  };

  Parser.prototype.readFileReject = function(index, event) {
    this.parserReject(index, event);
  };

  Parser.prototype.readFile = function(file) {
    return new Promise((resolve, reject) => {
      let fr = this.getFileReader();
      fr.onload = resolve;
      fr.onerror = reject;
      fr.onabort = reject;
      fr.readAsText(file);

      // let timeout_id = setTimeout(function(){
      //   clearTimeout(timeout_id);
      //   reject();
      // }, 1000);
    });
  };

  Parser.prototype.showDataFile = function(result, file) {
    let DOMParser = this.getDOMParser();
    let xmlDoc = DOMParser.parseFromString(result, "text/html");
    return xmlDoc;
  };

  Parser.prototype.parseFiles = function(xmlDoc) {
    let fileData = {};

    //parse html
    
    return fileData;
  };

}.call(this));