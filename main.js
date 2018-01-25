(function () {

  // Establish the root object, `window` in the browser, or `exports` on the server.
  const root = this;
  const appStorage = root[sourceName];
  const $ = root.$;

  //document ready
  $(function (event) {
    console.log('start-main');

    $('#'+sourceName+'_load').change(function (event) {
      let HtmlLoader = appStorage.HtmlLoader;
      let result = HtmlLoader.loadFiles(event, 'cvkeskus');
      appStorage['htmlFiles'] = result;
      
      showStartScreen();
    });

    $('#'+sourceName+'_start_btn').click(function (event) {
      let hideNodeName = '#' + sourceName + '_start_box';
      $(hideNodeName).hide();

      let showNodeName = '#' + sourceName + '_progress_box';
      $(showNodeName).show();

      startApp();
    });

    $('#'+sourceName+'_upload_btn').click(function (event) {
      let DataToCsvSaver = appStorage.DataToCsvSaver;
      DataToCsvSaver.saveDataCSV();
    });

  });
  
  function showStartScreen(){
    let hideNodeName = '#' + sourceName + '_load_box';
    $(hideNodeName).hide();

    let showNodeName = '#' + sourceName + '_start_box';
    $(showNodeName).show();

    let nodeName = '#' + sourceName + '_length';
    let htmlFiles = appStorage['htmlFiles'];
    let nodeLength = htmlFiles.length;
    let nodeText = 'Загружено файлов: ' + nodeLength;
    $(nodeName).text(nodeText);
  };

  function startApp() {
    let App = appStorage.App;
    let app = new App();
    app.startWork();
  }

}.call(this));

