import '../styles/auth.scss';
import { store } from 'react-notifications-component';
import { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { requestApi } from '../services/Request';

type State = {
	name: string;
	username?: string;
	password?: string;
	email: string;
	phone: string;
	address: string;
	message?: string;
	status?: number;
	disabled?: boolean;
}

type Erro400 = {
	msg: string;
	param: string;
}

class Register extends Component<RouteComponentProps> {

	public state: State = {
		name: "",
		username: "",
		password: "",
		email: "",
		phone: "",
		address: "",
		message: "",
		status: 0,
		disabled: false
	}

	create = async (event: FormEvent) => {
		event.preventDefault();

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		}

		try {
			const response = await requestApi('/user/register', requestOptions);
			const data = await response.json();

			if (response.status === 400)
				data.errors.map((error: Erro400) => {
					return store.addNotification({
						title: error.param,
						message: error.msg,
						type: "danger",
						insert: "top",
						container: "top-right",
						dismiss: {
							duration: 5000
						}
					});
				});

			if (response.status === 400)
				console.log(response);
				
			if (response.ok){
				store.addNotification({
					title: 'Autenticado com sucesso!',
					message: 'Bem vindo',
					type: "success",
					insert: "top",
					container: "top-center",
					dismiss: {
						duration: 5000
					}
				});
				this.props.history.push('/auth');
			}

			console.log(data);
		} catch (e) {
			console.log(e);
		}

	}

	onChange = (event: FormEvent<HTMLInputElement>): void => {
		this.setState({ [event.currentTarget.name]: event.currentTarget.value })
	}

	render() {
		return (
			<div id="page-auth">
				<main>
					<div className="main-content">
						<div>Cadastre-se</div>
						<form onSubmit={this.create}>
							<input
								name="name"
								type="text"
								placeholder="Digite seu nome"
								onChange={this.onChange}
								value={this.state.name}
								required
							></input>
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
							<input
								name="address"
								type="text"
								placeholder="Digite seu enredeço"
								onChange={this.onChange}
								value={this.state.address}
								required
							></input>
							<input
								name="email"
								type="email"
								placeholder="Digite seu email"
								onChange={this.onChange}
								value={this.state.email}
								required
							></input>
							<input
								name="phone"
								type="number"
								placeholder="Digite seu contato"
								onChange={this.onChange}
								value={this.state.phone}
								required
							></input>
							<button
								data-tooltip="Clique aqui para efetuar seu cadastro!"
								type="submit"
							>Cadastrar</button>
						</form>
					</div>
				</main>
			</div>
		)
	}
}

export default withRouter(Register);