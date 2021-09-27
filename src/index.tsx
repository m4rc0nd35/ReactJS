import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import './styles/global.css';

ReactDOM.render(
	<React.StrictMode>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
