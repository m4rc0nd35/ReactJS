import '../styles/auth.scss';
import { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { config } from '../setting'

class Home extends Component<RouteComponentProps> {

	logout = (): void => {
		try {
			const decoded = jwtDecode(String(sessionStorage.getItem(config.TOKEN)));
			console.log(decoded);
			sessionStorage.removeItem(config.TOKEN);
			this.props.history.push('/auth');
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<div id="page-auth">
				<aside id="aside">
					<strong>BEM VINDO JOÃO!</strong>
					<p>

					</p>
				</aside>
				<main>
					<div className="main-content">
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