import StartPage from './StartPage/StartPage';
import HomePage from './Homepage/HomePage';

function App() {
	return (
		<div className="App">
			{localStorage.getItem('token') ? <HomePage /> : <StartPage />}
		</div>
	);
}

export default App;
