const config = require('./../config');
const windowsManager = require('./windows-manager');

const send = messageObject =>
    windowsManager
        .addWindow(
            Object.assign({}, config.defaultBrowserOptions, config.specificBrowserOptions.whatsapp),
            config.urls.whatsapp,
            config.script_paths.whatsapp)
        .then(win => win.webContents.send(config.msgs_names.whatsapp, messageObject));

module.exports = {send};
