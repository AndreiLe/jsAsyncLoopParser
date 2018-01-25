;(function(){

  // Establish the root object, `window` in the browser, or `exports` on the server.
  const root = this;
  const appStorage = root[sourceName];
  const $ = this.$;

  function AsyncLoop(app) {
    this.sourceName = app.getSourceName() || '';
    this.htmlFiles = app.getHtmlFiles() || [];
    this.htmlFilesLength = this.htmlFiles.length;
    this.result = [];
    this.Parser = null;

    appStorage['Result'] = this.result;
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.AsyncLoop = AsyncLoop;
    }
    exports.AsyncLoop = AsyncLoop;
  } else {
    appStorage.AsyncLoop = AsyncLoop;
  }

  AsyncLoop.prototype.getParser = function() {
    if (this.Parser === null) {
      let Parser = appStorage.Parser;
      this.Parser = new Parser(this.workLoopResult.bind(this), this.workLoopError.bind(this));
    }
    return this.Parser;
  };

  AsyncLoop.prototype.startLoop = function() {
    if (this.htmlFilesLength === 0) {
      alert('Файлы не найдены!');
      window.location.reload();
    } else {

      let utils = appStorage.Utils;
      this.uniqueID = utils.uniqueID();

      //"*" security unsafe, uniqueID for event protection in same window
      this.targetOrigin = window.location.origin;
      if (this.targetOrigin.indexOf('file://') === 0) {
        this.targetOrigin = "*";
      }

      window.addEventListener("message", this.handleMessage.bind(this), true);

      this.workLoop();
    }
  };

  AsyncLoop.prototype.workLoop = function(index) {
    index = index || 0;
    if (index < this.htmlFilesLength) {
      window.postMessage({ message: 'AsyncLoop', index: index, uniqueID: this.uniqueID },
        this.targetOrigin);
    } else {
      window.removeEventListener("message", this.handleMessage, true);
      this.endWork();
    }

    this.showProgress(index);
  };

  AsyncLoop.prototype.workLoopResult = function(index, fileData) {
    if (!_.isUndefined(fileData)) {
      this.result.push(fileData);
    }
    index++;
    this.workLoop(index);
  }

  AsyncLoop.prototype.workLoopError = function(index, event) {
    window.removeEventListener("message", this.handleMessage, true);
    alert('Ошибка загрузки файлов! ' + event.message);
    window.location.reload();
  }

  AsyncLoop.prototype.handleMessage = function(event) {
    const data = event.data;
    const uniqueID = data['uniqueID'];
    const loopMessageName = data['message'];
    if (loopMessageName === 'AsyncLoop' && uniqueID === this.uniqueID) {
      event.stopImmediatePropagation();
      const index = event.data.index;
      const file = this.htmlFiles[index];
      const parser = this.getParser();
      parser.startParsing(index, file);
    }
  };

  AsyncLoop.prototype.showProgress = function(index) {
    const max = this.htmlFilesLength;

    const progressBarName = '#' + this.sourceName + '_progress_bar';
    $(progressBarName).attr("max", max);
    $(progressBarName).val(index);

    const progressText = '#' + this.sourceName + '_progress_text';
    const text = 'Обработано ' + index + ' из ' + max;
    $(progressText).text(text);
  };

  AsyncLoop.prototype.endWork = function() {
    let hideNodeName = '#' + sourceName + '_progress_box';
    $(hideNodeName).hide();

    let showNodeName = '#' + sourceName + '_upload_box';
    $(showNodeName).show();

    let data = appStorage['Result'];
    let dataLenght = data.length;

    let uploadTextID = '#' + sourceName + '_upload_text';
    let uploadText = 'Успешно обработанно ' + dataLenght;
    $(uploadTextID).text(uploadText);

    console.log(appStorage['Result']);
  }

})();