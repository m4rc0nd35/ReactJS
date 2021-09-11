import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { NotFound } from './pages/NotFound';

// import { PrivateRoute } from './pages/PrivateRoute';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// Redirect,
	RouteComponentProps
} from "react-router-dom";

function App() {

	return (
		// <PrivateRoute>
			<Router>
				<Switch>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/auth">
						<Auth />
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
