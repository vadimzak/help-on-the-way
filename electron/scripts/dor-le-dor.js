const {ipcRenderer} = require('electron');

let _promises = [];

window.sendMessage = (data) => {
    let id = 0;
    //todo - un-comment the next line when we want validation on the origin.
    //if (event.origin !== "http://localhost:8080") return;
    return new Promise((resolve, reject) => {
        ipcRenderer.send('asynchronous-message', Object.assign(data, {id}));

        // Reject if not got answer in 1 min
        setTimeout(() => reject(data), 60000);

        _promises[id++] = {resolve, reject};
    });
};

const replyHandler = (event, {id, result}) => {
    if (_promises[id].resolve instanceof Function) {
        _promises[id].resolve(result);
    }
    else {
        //the gc will handle it better like that than do it with "delete"
        _promises[id] = null;
    }
};

ipcRenderer.on('asynchronous-reply', replyHandler);

//window.addEventListener('message', sendMessage, false);
