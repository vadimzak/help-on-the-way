const {ipcRenderer} = require('electron');

const init = () => {
    ipcRenderer.on('whatsapp-auth-message', handleMessage);
};

const handleMessage = async () => {
    alert("ברוך הבא ל- דור לדור אנא הזדהה מול ה Whatsapp");

    var timerId = setInterval(() => {
        if (document.getElementById("side")) {
            alert("תודה :)");
            clearInterval(timerId);
            ipcRenderer.send('close-message', 'https://web.whatsapp.com');
        }
    }, 3000)
};

init();