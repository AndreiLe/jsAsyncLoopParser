;(function(){

  // Establish the root object, `window` in the browser, or `exports` on the server.
  const root = this;
  const appStorage = root[sourceName];

  const DataToCsvSaver = {};

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.DataToCsvSaver = DataToCsvSaver;
    }
    exports.DataToCsvSaver = DataToCsvSaver;
  } else {
    appStorage.DataToCsvSaver = DataToCsvSaver;
  }

  DataToCsvSaver.saveDataCSV = function () {

    let data = appStorage['Result'];
    let dataLength = data.length;

    if (dataLength < 1) {
      alert('Нет данных для загрузки!');
      return;
    }

    let csvText = this.createCSVText();

    let blob = new Blob([csvText], {type: "text/plain;charset=utf-8"});
    saveAs(blob, sourceName + "-parser-" + dataLength + ".csv");
    csvText = null;
  };

  DataToCsvSaver.createCSVText = function () {

    let data = appStorage['Result'];
    let dataLength = data.length;

    let returnText = '';
    
    //create csv text

    return returnText;
  };

  DataToCsvSaver.csvText = function (value) {
    if (_.isEmpty(value)) {
      return ':';
    }
    return value + ':';
  };

}.call(this));
