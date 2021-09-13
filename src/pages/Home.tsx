import '../styles/auth.scss';
import { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";

class Home extends Component<RouteComponentProps> {

	logout = (): void => {
		console.log(sessionStorage.getItem('TOKEN'));
		sessionStorage.removeItem('TOKEN');
		this.props.history.push('/auth');
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