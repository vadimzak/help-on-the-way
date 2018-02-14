const {ipcRenderer} = require('electron');


const sendMessage = (event, args) => {
    console.log(event, args);
    //ipcRenderer.send('asynchronous-message', event.data);
}

ipcRenderer.on('whatsapp-message', sendMessage);


