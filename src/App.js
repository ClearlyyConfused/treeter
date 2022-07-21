import StartPage from './components/StartPage/StartPage';
import HomePage from './components/Homepage/HomePage';

function App() {
	return (
		<div className="App">
			{localStorage.getItem('token') ? <HomePage /> : <StartPage />}
		</div>
	);
}

export default App;
