const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const settings = require('electron-settings');
var fs = require('fs');

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
  fs.readFile('myfile.txt','utf8', function(error, data){
      mainWindow.data = data
});
  mainWindow.settings = settings;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


console.log(settings.get('name.first'));
// => "Cosmo"


