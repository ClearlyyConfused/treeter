import StartPage from './Pages/Startpage/StartPage';
import HomePage from './Pages/Homepage/Homepage';

function App() {
	return (
		<div className="App">
			{localStorage.getItem('token') ? <HomePage /> : <StartPage />}
		</div>
	);
}

export default App;
