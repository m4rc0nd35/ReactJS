import '../styles/auth.scss';
import { store } from 'react-notifications-component';
import { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";

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

	submitHandler = async (event: FormEvent) => {
		event.preventDefault();
		this.setState({ disabled: true })

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		};

		try {
			/* Request API */
			const response = await fetch('http://oracle.cloud.remonet.com.br:3000/user/auth', requestOptions);
			const data = await response.json();

			/* Hooks set state */
			this.setState({ message: data.message });
			this.setState({ status: response.status });
			
			/* Not ok response */
			if (!response.ok)
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

			if (response.ok){
				sessionStorage.setItem('TOKEN', data.access_token);
				this.props.history.push('/home/');
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
		}
		return this.setState({ disabled: false });
	}

	onChange = (event: FormEvent<HTMLInputElement>): void => {
		this.setState({ [event.currentTarget.name]: event.currentTarget.value })
	};

	render() {
		return (
			<div id="page-auth">
				<aside id="aside">
					<strong></strong>
					<p>
						Página de autentcação.
					</p>
				</aside>

				<main>
					<div className="main-content">
						<div>Autentica-se.</div>
						<form onSubmit={this.submitHandler}>
							<input
								name="username"
								type="text"
								placeholder="Digite seu cpf"
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
					</div>
				</main>
			</div>
		)
	}
}

export default withRouter(Auth);