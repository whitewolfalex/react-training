import { Link, Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function Home() {
    return <>
        <NavigationBar />
        <Outlet />
    </>
}

export default Home;