import '../styles/auth.scss';
import React, { useState } from 'react';
// import { Redirect, RouteComponentProps } from "react-router-dom";
import ReactNotification, {store } from 'react-notifications-component';
import jwtDecode from "jwt-decode";
import 'react-notifications-component/dist/theme.css'
type State = {
	username?: string;
	password?: string;
	message?: string;
	status?: number;
	disabled?: boolean;
	access_token?: string;
}

export class Auth extends React.Component {

	public state: State = {
		username: "",
		password: "",
		message: "",
		status: 0,
		disabled: false,
		access_token: ""
	}

	submitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		this.setState({ disabled: true })
		// let history = useHistory();

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		};

		try {
			/* Request API */
			const response = await fetch('http://oracle.cloud.remonet.com.br:3000/user/auth', requestOptions);
			const data = await response.json();

			/* Hooks state */
			this.setState({ message: data.message })
			this.setState({ access_token: data.access_token })
			this.setState({ status: response.status })
			/* Success response */
			if (!response.ok){
				store.addNotification({
					title: "Erro na autenticação!",
					message: data.message,
					type: "danger",
					insert: "top",
					container: "top-right",
					dismiss: {
					  duration: 3000
					}
				  });
				
				return this.setState({ disabled: false })
			}
			
			this.checkToken(data.access_token);
			
			  
			console.log(data)
		} catch (error) {
			console.error(error);
		}
	}

	onChange = (e: React.FormEvent<HTMLInputElement>): void => {
		const nameInput: string = e.currentTarget.name;
		if (nameInput === "username")
			this.setState({ username: e.currentTarget.value })

		if (nameInput === "password")
			this.setState({ password: e.currentTarget.value });
	};
	
	checkToken = (token: string) =>{
		const decoded = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		const exp = JSON.parse(JSON.stringify(decoded)).exp;
		console.log(exp);
		console.log(exp > currentTime);
	}

	render() {
		return (
			<div id="page-auth">
				<aside id="aside">
					<strong>Auth user</strong>
					<p>
						Sistema de autentcação centralizado.
					</p>
				</aside>
					<ReactNotification/>
				<main>
					<div className="main-content">
						<div>Autentica-se para ter acesso ao sistema.</div>
						<form onSubmit={this.submitHandler.bind(this)}>
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