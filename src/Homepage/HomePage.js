import HomePageMain from './HomePageMain';
import HomePageSidebar from './HomePageSidebar';
import './homepage.css';

function HomePage() {
	return (
		<div className="homepage">
			<HomePageMain />
			<HomePageSidebar />
		</div>
	);
}

export default HomePage;
