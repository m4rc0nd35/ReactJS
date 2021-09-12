import Home from './pages/Home';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component';
import Auth from './pages/Auth';
import { NotFound } from './pages/NotFound';
// import { PrivateRoute } from './pages/PrivateRoute';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// Redirect,
	RouteComponentProps
} from "react-router-dom";
import { Children } from 'react';

function App() {

	return (
		// <PrivateRoute>
		<Router>
			<ReactNotification />
			<Switch>
				<Route exact path="/home">
					<Home />
				</Route>
				<Route exact path="/auth">
					<Auth {...Children} />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Router>
		// </PrivateRoute >
	);
}
export default App;
