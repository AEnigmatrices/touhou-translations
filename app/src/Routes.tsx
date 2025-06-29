import { useRoutes } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import GalleryPage from './pages/Gallery/GalleryPage';
import Item from './pages/Item/Item';
import Placeholder from './components/Placeholder';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'search', element: <Placeholder title="Search" /> },
            { path: 'characters', element: <Placeholder title="Characters" /> },
            { path: 'artists', element: <Placeholder title="Artists" /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'post/:id', element: <Item /> }
        ],
    }
];

const Routes = () => useRoutes(routes);

export default Routes;
