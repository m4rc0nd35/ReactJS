import '../styles/auth.scss';
import { store } from 'react-notifications-component';
import { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Authentication } from '../services/AuthService';

class Home extends Component<RouteComponentProps> {

	logout = (): void => {
		if (new Authentication().delete())
			this.props.history.push('/auth');
	}

	tokenKeepAlive = () => {
		const payload = new Authentication();

		try {
			console.log(payload.payload());
		} catch (error) {
			store.addNotification({
				title: "Exceção inesperada!",
				message: "Você deve-se autenticar novamente!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 5000
				}
			});
			this.props.history.push('/auth');
		}

		if (!payload.keepAlive())
			this.props.history.push('/auth');
	}

	render() {
		return (
			<div id="page-auth">
				<aside id="aside">
					<strong>BEM VINDO JOÃO!</strong>
					<p>
						bla bla bla
					</p>
				</aside>
				<main>
					<div className="main-content">
						<button
							data-tooltip="Check Token keep alive"
							type="button"
							onClick={this.tokenKeepAlive}
						>Token</button>
						<button
							data-tooltip="Clique aqui para sair!"
							type="submit"
							onClick={this.logout}
						>Logout</button>
					</div>
				</main>
			</div>
		)
	}
}

export default withRouter(Home);