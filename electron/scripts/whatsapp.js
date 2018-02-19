const { ipcRenderer } = require('electron');

const init = () => {
    ipcRenderer.on('whatsapp-message', handleMessage);
}

const handleMessage = async (event, { messages }) => {
    await waitForWhatsappToLoad();

    let responses = await sendMessages(messages);

    ipcRenderer.send('asynchronous-reply', responses);

    ipcRenderer.send('close-message', 'https://web.whatsapp.com');
};

const sendMessages = async (messages) => {
    var result = [];

    for (var i = 0; i < messages.length; i++) {
        let { group, message } = messages[i];

        try {
            await sendMessageToGroup(group, message)
            result.push({ group, message, result: 'success' })
        } catch (error) {
            result.push({ group, message, result: 'error', data: error })
        }
    }

    return result;
};

const waitForWhatsappToLoad = async () => {
    await getElement(`#side`, 20);
};

const sendMessageToGroup = async (group, message) => {
    await sleep();
    return selectGroup(group)
        .catch(() => { throw 'Error selecting the group'; })
        .then(() => sendMessage(message))
        .catch(() => { throw 'Error sending the message'; });
};

const selectGroup = async group => {
    let relativeSelector = `span[title="${group.replace(/\"/g, '\\\"')}"]`
    let chatNameElement = await getElement(`#side ${relativeSelector}`);

    eventFire(chatNameElement, 'mousedown');

    await getElement(`#main ${relativeSelector}`);
};

const getElement = (selector, remainingRetries = 5) => {
    return new Promise(async (resolve, reject) => {
        let element = document.querySelector(selector);
        if (element) return resolve(element);

        if (remainingRetries == 0) return reject();
        await sleep();
        getElement(selector, remainingRetries - 1)
            .then(resolve, reject);
    });
};

const sleep = async () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

const eventFire = (element, eventType) => {
    let event = document.createEvent("MouseEvents");
    event.initMouseEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(event);
}

const sendMessage = async message => {
    let messageInputElement = await getElement('div.copyable-text.selectable-text[contenteditable]');

    messageInputElement.innerHTML = message.replace(/  /gm, '');

    let event = document.createEvent("UIEvents");
    event.initUIEvent("input", true, true, window, 1);
    messageInputElement.dispatchEvent(event);

    let sendButton = await getElement('[data-icon=send]');

    eventFire(sendButton, 'click');
}

init();