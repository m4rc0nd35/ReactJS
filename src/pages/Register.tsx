import '../styles/auth.scss';
import { store } from 'react-notifications-component';
import { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { requestJson } from '../services/Request';
import { PhoneInput } from '../components/PhoneInput';

type State = {
	name: string;
	username: string;
	password: string;
	email: string;
	phone: string;
	address: string;
	message: string;
	status: number;
	disabled: boolean;
}

class Register extends Component<RouteComponentProps> {

	public state: Partial<State>;

	constructor(props: RouteComponentProps) {
		super(props);

		this.state = {
			name: "",
			username: "",
			password: "",
			email: "",
			phone: "",
			address: "",
		}
		this.create = this.create.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	create = async (event: FormEvent) => {
		event.preventDefault();
		console.log(this.state)
		try {
			const response = await requestJson('/user/register', 'POST', this.state);
			const data = await response.json();

			if (!response.ok) {
				if (response.status === 400)
					/* is possible multiple errors */
					for (const rError of data.errors) {
						store.addNotification({
							title: rError.param,
							message: rError.msg,
							type: "danger",
							insert: "top",
							container: "top-right",
							dismiss: {
								duration: 5000
							}
						});
					};

				if (response.status === 406)
					store.addNotification({
						title: 'Erro no cadastro',
						message: 'Usuário já cadastrado!',
						type: "danger",
						insert: "top",
						container: "top-right",
						dismiss: {
							duration: 5000
						}
					});
				return;
			}

			if (response.ok) {
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
							/>
							<input
								name="email"
								type="email"
								placeholder="Digite seu email"
								onChange={this.onChange}
								value={this.state.email}
								required
							></input>
							<PhoneInput
								name="phone"
								type="text"
								placeholder="Digite seu contato"
								onChange={this.onChange}
								value={this.state.phone}
								
							/>
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