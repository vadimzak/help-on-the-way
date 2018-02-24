const config = require('./../config');
const windowsManager = require("./windows-manager");

const authenticate = () =>
    windowsManager.addWindow(
        config.defaultBrowserOptions,
        config.urls.whatsapp,
        config.script_paths.whatsapp_auth)
        .then(win => win.webContents
            .send(config.msgs_names.whatsapp_auth, ''));

module.exports = {authenticate};