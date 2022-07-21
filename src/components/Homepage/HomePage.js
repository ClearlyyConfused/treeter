import HomePageMain from './HomePageMain';
import PageSidebar from './PageSidebar';
import './homepage.css';

function HomePage() {
	return (
		<div className="homepage">
			<HomePageMain />
			<PageSidebar />
		</div>
	);
}

export default HomePage;
