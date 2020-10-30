import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddNewItem from './pages/AddNewItem';
import MainPage from './pages/MainPage';

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/add-new" exact>
						<AddNewItem />
					</Route>
					<Route path="/">
						<MainPage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
