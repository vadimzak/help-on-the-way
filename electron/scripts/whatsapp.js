const { ipcRenderer } = require('electron');

const init = () => {
	ipcRenderer.on('whatsapp-message', handleMessage);
};

const handleMessage = async (event, { messages, id }) => {
	await waitForWhatsappToLoad();

	let responses = await sendMessages(messages, id);

	ipcRenderer.send('asynchronous-reply', responses);

	ipcRenderer.send('close-message', 'https://web.whatsapp.com');
};

const sendMessages = async (messages, id) => {
	var result = [];
	for (var i = 0; i < messages.length; i++) {
		let { group, message } = messages[i];

		try {
			await sendMessageToGroup(group, message);
			await sleep(2);
			result.push({ group, message, result: 'success' });
		} catch (error) {
			result.push({ group, message, result: 'error', data: error });
		}
	}

	return { result, id };
};

const waitForWhatsappToLoad = async () => {
	await getElement(`#side`, 20);
};

const sendMessageToGroup = async (group, message) => {
	await sleep();
	return selectGroup(group)
		.catch(() => {
			throw 'Error selecting the group';
		})
		.then(() => sendMessage(message))
		.catch(() => {
			throw 'Error sending the message';
		});
};

const searchGroup = async groupName => {
	let searchInput = await getElement('#side input.selectable-text');
	const focusEvent = new Event('focus', { bubbles: true });
	searchInput.dispatchEvent(focusEvent);
	setTimeout(updateValue, 400);

	function updateValue() {
		let input = searchInput;
		const lastValue = searchInput.value;
		searchInput.value = groupName;
		event = new Event('input', { bubbles: true });
		event.simulated = true;
		let tracker = input._valueTracker;
		if (tracker) {
			tracker.setValue(lastValue);
		}
		input.dispatchEvent(event);
	}
};

const selectGroup = async group => {
	let groupName = group.replace(/\"/g, '\\"');
	await searchGroup(groupName);
	let relativeSelector = `span[title="${groupName}"]`;
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
		getElement(selector, remainingRetries - 1).then(resolve, reject);
	});
};

const sleep = async (time = 1) => {
	return new Promise(resolve => setTimeout(resolve, time * 1000));
};

const eventFire = (element, eventType) => {
	let event = document.createEvent('MouseEvents');
	event.initMouseEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	element.dispatchEvent(event);
};

const sendMessage = async message => {
	let messageInputElement = await getElement('div.copyable-text.selectable-text[contenteditable]');

	messageInputElement.innerHTML = message.replace(/  /gm, '');

	let event = document.createEvent('UIEvents');
	event.initUIEvent('input', true, true, window, 1);
	messageInputElement.dispatchEvent(event);

	let sendButton = await getElement('[data-icon=send]');

	eventFire(sendButton, 'click');
};

init();
