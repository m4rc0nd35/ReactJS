import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Register from './pages/Register';
import { NotFound } from './pages/NotFound';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute } from './Routers/PrivateRoute';

function App() {
	return (
		<BrowserRouter>
			<ReactNotification />
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PublicRoute exact path="/auth" component={Auth} />
				<Route exact path="/register" component={Register} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}
export default App;
