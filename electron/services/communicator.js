const conf = require('./../config');
const {ipcMain} = require('electron');
const windowsManager = require("./windows-manager");

const send = (e, msgObj) => {
    switch (msgObj.platform) {
        case 'whatsapp':
            windowsManager.addWindow(
                conf.defaultBrowserOptions,
                conf.urls.whatsapp,
                conf.script_paths.whatsapp)
                .then((win) => win.webContents
                    .send(conf.msgs_names.whatsapp, msgObj));
            break;
    }
};

const close = (params) => {
    //todo - WindowsManager.removeWindow
};

const init = () => ipcMain
    .on('asynchronous-message', send)
    .on('close-message', close);


module.exports = {init, send, close};