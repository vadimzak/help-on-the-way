module.exports = {
	defaultBrowserOptions: {
		width: 1920,
		height: 1080,
		webPreferences: {
			devTools: false
		}
	},
	specificBrowserOptions: {
		whatsapp: {
			closable: false
		}
	},
	urls: {
		//todo - change this to which url is relevant
		dorledor: 'https://dashboard.dorldor.org.il',
		whatsapp: 'https://web.whatsapp.com'
	},
	script_paths: {
		dorledor: './scripts/dor-le-dor.js',
		whatsapp: './scripts/whatsapp.js',
		whatsapp_auth: './scripts/whatsapp-auth.js'
	},
	msgs_names: {
		whatsapp: 'whatsapp-message',
		whatsapp_auth: 'whatsapp-auth-message'
	},
	error_messages: {
		unsupported: 'Unspported target for sending messages',
		already_exist: 'window with the same url already exist'
	}
};
