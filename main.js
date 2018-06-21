const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({
		"title": "minum",
		"frame": false,
		"show": true,
		"width": 1080,
		"height": 600
	});

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
