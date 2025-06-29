import { useRoutes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/HomePage/HomePage';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import Item from './pages/ItemPage/Item';
import Placeholder from './components/Placeholder';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'search', element: <Placeholder title="Search" /> },
            { path: 'characters', element: <CharacterPage /> },
            { path: 'artists', element: <Placeholder title="Artists" /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'post/:id', element: <Item /> }
        ],
    }
];

const Routes = () => useRoutes(routes);

export default Routes;
