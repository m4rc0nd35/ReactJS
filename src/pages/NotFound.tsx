import '../styles/auth.scss';
import React from 'react';

export class NotFound extends React.Component {

	logout = (): void => {
		console.log('logout!')
	}

	render() {
		return (
			<div id="page-auth">
				<main>
					<div className="main-content">
						<div>Pagina não encontrada!</div>
					</div>
				</main>
			</div>
		)
	}
}