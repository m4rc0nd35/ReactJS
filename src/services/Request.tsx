import { config } from '../setting';

export const requestJson = (endpoint: string, method: string, body: object): Promise<Response> => {
	const requestOptions = {
		method: method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};
	return fetch('http://' + config.URL + ':' + config.PORT + endpoint, requestOptions);
}
