import Response from 'react';
import { config } from '../setting';

export const requestApi = (endpoint: string, headers: object): Promise<Response> => {
	return fetch('http://' + config.URL + ':' + config.PORT + endpoint, headers);
}
