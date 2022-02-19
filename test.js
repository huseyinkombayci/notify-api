import test from 'ava';
import nock from 'nock';
import notify from './index.js';

test('invalid URL', async t => {
	const options = {
		url: '',
		message: '',
	};
	await t.throwsAsync(notify(options), {
		message: 'RequestError: Invalid URL: ',
	});
});

test('url required as a string', async t => {
	const options = {
		url: 123,
		message: '',
	};
	await t.throwsAsync(notify(options), {
		message: 'URL required',
	});
});

test('message required as a string', async t => {
	const options = {
		url: 'http://test-endpoint',
		message: 123,
	};
	await t.throwsAsync(notify(options), {
		message: 'Message required',
	});
});

test('successful request', async t => {
	nock('http://mock-endpoint/notify')
		.post('', 'test message')
		.reply(200, `${new Date().toISOString()} - test message is sent.`);

	const options = {
		url: 'http://mock-endpoint/notify',
		message: 'test message',
	};
	const response = await notify(options);

	t.true(response.includes('test message is sent.'));
});

test('failing request', async t => {
	nock('http://mock-endpoint/notify')
		.post('', 'test message')
		.reply(400, 'HTTPError: Response code 400 (Bad Request)');

	const options = {
		url: 'http://mock-endpoint/notify',
		message: 'test message',
	};
	await t.throwsAsync(notify(options), {
		message: 'HTTPError: Response code 400 (Bad Request)',
	});
});
