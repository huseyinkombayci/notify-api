import got from 'got';

const notify = async ({url, message}) => {
	if (typeof url !== 'string') {
		throw new TypeError('URL required');
	}

	if (typeof message !== 'string') {
		throw new TypeError('Message required');
	}

	try {
		const {statusCode} = await got.post(url, {
			body: message,
		});
		if (statusCode === 200) {
			return `${new Date().toISOString()} - ${message} is sent.`;
		}
	} catch (error) {
		throw new Error(error);
	}
};

export default notify;
