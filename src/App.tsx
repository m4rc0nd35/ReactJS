import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { NotFound } from './pages/NotFound';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<ReactNotification />
			<Switch>
				<Route exact path="/home" component={Home} />
				<Route exact path="/auth" component={Auth} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}
export default App;
