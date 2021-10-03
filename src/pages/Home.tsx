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

	public state: State;
	private expire: Date = new Date();

	constructor(props: RouteComponentProps) {
		super(props);

		this.state = {
			payload: {
				id: 0,
				name: '',
				email: '',
				iat: 0,
				exp: 0
			}
		}
	}

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
					<div id="nav-bar-menu">
						<li>Home</li>
						<li>Imagens</li>
						<li>Usuários</li>
						<li>Configuração</li>
					</div>
					<div id="nav-bar-user">
						<div id="label-user">[ {this.state.payload.name.toUpperCase()} ]</div>
						<p>[ Expira {this.expire.toLocaleDateString() + ' as ' + this.expire.toLocaleTimeString()} ]</p>
					</div>
					<div id="nav-bar-user">
						<li onClick={this.logout}><a>Sair</a></li>
					</div>
				</nav>
				<main id="main-content">
				</main>
				<footer id="page-footer"><p>Company Dev Cloud</p></footer>
			</div>
		)
	}
}
export default withRouter(Home);