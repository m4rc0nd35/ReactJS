import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Register from './pages/Register';
import { NotFound } from './pages/NotFound';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRouter from './contexts/ContextPrivateRouters';

function App() {
	return (
		<BrowserRouter>
			<ReactNotification />
			<Switch>
				<Route exact path="/home" component={Home} />
				<Route exact path="/auth" component={Auth} />
				<PrivateRouter exact path="/register" component={Register} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}
export default App;
