import '../styles/home.scss';
import { store } from 'react-notifications-component';
import { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Authentication } from '../services/AuthService';

type Payload = {
	id: number;
	name: string;
	email: string;
	iat: number;
	exp: number;
}

type State = {
	payload: Payload;
}

class Home extends Component<RouteComponentProps> {

	public state: State = {
		payload: {
			id: 0,
			name: '',
			email: '',
			iat: 0,
			exp: 0
		}
	};

	private expire: Date = new Date();

	componentDidMount() {
		try {
			const payload = new Authentication().payload();
			this.setState({ payload: payload });

			this.expire = new Date(Number(payload.exp) * 1000);
		} catch (error) {
			console.error(error);
		}
	}

	logout = (): void => {
		if (new Authentication().delete())
			this.props.history.push('/auth');
	}

	tokenKeepAlive = () => {
		const token = new Authentication();

		try {
			console.log(token.payload());
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

		if (!token.keepAlive())
			this.props.history.push('/auth');
	}

	render() {
		return (
			<div className="page-home">
				<nav id="page-menu">
					<li>test</li>
					<div id="nav-bar-user">
						<div>[ {this.state.payload.name.toUpperCase()} ]</div>
						<p>[ Expira {this.expire.toLocaleDateString() + ' as ' + this.expire.toLocaleTimeString()} ]</p>
					</div>
				</nav>
				<main id="main-content">
					<div>
						<button
							type="button"
							onClick={this.tokenKeepAlive}
						>Check Keep Alive</button>
						<button
							data-tooltip="Clique aqui para sair!"
							type="button"
							onClick={this.logout}
						>Logout</button>
					</div>
				</main>
				<footer id="page-footer">Company Dev Cloud Innovations</footer>
			</div>
		)
	}
}

export default withRouter(Home);