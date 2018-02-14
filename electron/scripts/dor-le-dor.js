const {ipcRenderer} = require('electron');

const sendMessage = (event) => {
    if (event.origin !== "http://localhost:8080") return;
    ipcRenderer.send('asynchronous-message', event.data);
};

window.addEventListener("message", sendMessage, false);
