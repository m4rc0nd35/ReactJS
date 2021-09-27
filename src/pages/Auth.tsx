import '../styles/auth.scss';
import { store } from 'react-notifications-component';
import { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Authentication } from '../services/AuthService';
import { requestApi } from '../services/Request';

type State = {
	username?: string;
	password?: string;
	message?: string;
	status?: number;
	disabled?: boolean;
}


class Auth extends Component<RouteComponentProps> {

	public state: State = {
		username: "",
		password: "",
		message: "",
		status: 0,
		disabled: false
	}

	// constructor(props: RouteComponentProps) {
	// 	super(props);

	// 	this.state = {
	// 		username: "",
	// 		password: "",
	// 		message: "",
	// 		status: 0,
	// 		disabled: false
	// 	};

	// 	this.submitHandler = this.submitHandler.bind(this);
	// 	this.onChange = this.onChange.bind(this);
	// }

	componentDidMount() {
		console.log('componentDidMount');
	}

	componentWillUnmount = () => {
		console.log('componentWillUnmount');
	}

	componentDidUpdate = () => {
		console.log('componentDidUpdate')
	}

	submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		};

		try {
			this.setState({ disabled: true })
			/* Request API */
			const response = await requestApi('/user/auth', requestOptions);
			const data = await response.json();

			/* Hooks set state */
			this.setState({ message: data.message });
			this.setState({ status: response.status });

			/* Response statusCode is 400 */
			if (!response.ok) {
				if (response.status === 400) {
					/* is possible multiple errors */
					for (const rError of data.errors) {
						store.addNotification({
							title: rError.param,
							message: rError.msg,
							type: "danger",
							insert: "top",
							container: "top-right",
							dismiss: {
								duration: 3000
							}
						});
					}
				}

				if (response.status === 401) {
					store.addNotification({
						title: "Não autenticado!",
						message: data.message,
						type: "danger",
						insert: "top",
						container: "top-right",
						dismiss: {
							duration: 3000
						}
					});
				}

				this.setState({ disabled: false });
			}

			if (response.ok) {
				const success = new Authentication().create(data.access_token);

				if (success)
					this.props.history.push('/');
			}

		} catch (error) {
			store.addNotification({
				title: "Exception!",
				message: String('Auth class 1001: ' + error),
				type: "danger",
				insert: "top",
				container: "top-center",
				dismiss: {
					duration: 5000
				}
			});
			this.setState({ disabled: false });
		}
	}

	onChange = (event: FormEvent<HTMLInputElement>): void => {
		this.setState({ [event.currentTarget.name]: event.currentTarget.value })
	};

	render() {
		return (
			<div id="page-auth">

				<main>
					<div className="main-content">
						<div>Autentica-se.</div>
						<form onSubmit={this.submitHandler}>
							<input
								name="username"
								type="text"
								placeholder="Digite seu login"
								onChange={this.onChange}
								value={this.state.username}
								required
							></input>
							<input
								type="password"
								name="password"
								placeholder="Ditite sua senha"
								onChange={this.onChange}
								value={this.state.password}
								required
							></input>
							<button
								data-tooltip="Preencha os dados e autentique-se para começar!"
								type="submit"
								disabled={this.state.disabled}
							>Autenticar</button>
						</form>
						<div>
							<a href="/register">Cadastre-se</a>
						</div>
					</div>
				</main>
				<aside id="aside">
					<strong></strong>
					<p>
						Página de autentcação.
					</p>
				</aside>
			</div>
		)
	}
}

export default withRouter(Auth);