const electron = require('electron');
const fs = require('fs');

// Module to control application life.
const app = electron.app;
const { BrowserWindow, ipcMain } = electron;
const urls = {
    ynet: 'http://www.ynet.co.il',
    geektime: 'http://www.geektime.co.il',
}
const scriptsRoute = {
    geektime: './geektime-injected.js',
    ynet: './ynet-injected.js'
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let dorLeDorWin, whatsAppWin;
const PLACEHOLDER = "<MSG_CONTENT_PLACEHOLDER>";

function createMainWindow() {
    dorLeDorWin = new BrowserWindow({ width: 950, height: 720 });
    dorLeDorWin.loadURL(urls.ynet);
    //dorLeDorWin.webContents.openDevTools();
    dorLeDorWin.webContents.on('did-finish-load', () => {
        fs.readFile(scriptsRoute.ynet, (err, data) => {
            if (err) {
                return console.error(err);
            }
            dorLeDorWin.webContents.executeJavaScript(data.toString());
        });
    });
    // Emitted when the window is closed.
    dorLeDorWin.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        dorLeDorWin = null;
        whatsAppWin = null;
    })
}

function createMsgWindow(event, arg) {
    whatsAppWin = new BrowserWindow({ width: 950, height: 720 });
    whatsAppWin.loadURL(urls.geektime);
    //whatsAppWin.webContents.openDevTools();
    whatsAppWin.webContents.on('did-finish-load', () => {
        fs.readFile(scriptsRoute.geektime, function(err, data) {
            if (err) {
                return console.error(err);
            }
            let ynetHeader = arg.replace(/'/g, "\\'").replace(/"/g, '\\"');
            whatsAppWin.webContents.executeJavaScript(data.toString().replace(PLACEHOLDER, ynetHeader))
                .then(() => {
                    setTimeout(() => { whatsAppWin.close() }, 3000)
                });
        });
    });
}

function addIpcMainListner() {
    ipcMain.on('asynchronous-message', (event, arg) => {
        //in case we want to return an answer for the page send this message:
        //event.sender.send('asynchronous-reply', 'pong')
        createMsgWindow(event, arg);
    })
}

function createWindows() {
    createMainWindow();
    addIpcMainListner();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindows()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.