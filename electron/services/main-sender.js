const config = require('./../config');
const whatsappMessageSender = require('./whatsapp-message-sender');

const send = (event, messageObject) => {
	switch (messageObject.action) {
		case 'whatsappMessage':
			whatsappMessageSender.send(messageObject);
			break;
		default:
			throw config.error_messages.unsupported;
			break;
	}
};

module.exports = { send };
