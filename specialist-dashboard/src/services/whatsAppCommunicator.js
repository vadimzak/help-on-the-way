const CHECK_INTERAVL = 10 * 1000
const MAX_ATTEMPTS_FOR_ELECTRON_CHECK = 5
let attempts = 1;
function init(store) {

    const interval = setInterval(checkForElectron, CHECK_INTERAVL);
    function checkForElectron() {
        if (attempts > MAX_ATTEMPTS_FOR_ELECTRON_CHECK) {
            clearInterval(interval);
            console.warn('couldnt find Electron, reached maximum attempts, giving up')
            return;
        }
        if (!window.sendMessage) {
            console.log(`No electron found yet. Attempt ${attempts} out of ${MAX_ATTEMPTS_FOR_ELECTRON_CHECK}`)
        } else {
            clearInterval(interval);
            store.commit('messages/setIsMessagesAvilable', true)
        }
        attempts++; 
    }
}

function sendMessages(messages) {
    return window.sendMessage({
            action: 'whatsappMessage',
            messages
    })
}

export {
    init,
    sendMessages
}