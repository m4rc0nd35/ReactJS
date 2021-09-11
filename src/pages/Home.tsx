import '../styles/auth.scss';
import React from 'react';

export class Home extends React.Component {

	logout = (): void => {
		console.log('logout!')
	}

	render() {
		return (
			<div id="page-auth">
				<aside id="aside">
					<strong>Auth user</strong>
					<p>

					</p>
				</aside>
				<main>
					<div className="main-content">
						<div>Autentica-se para ter acesso ao sistema.</div>
						<button
							data-tooltip="Preencha os dados e autentique-se para começar!"
							type="submit"
							onClick={this.logout}
						>Logout</button>
					</div>
				</main>
			</div>
		)
	}
}