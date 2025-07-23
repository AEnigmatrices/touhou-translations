import { useRoutes } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import ArtistPage from './pages/ArtistPage/ArtistPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ItemPage from './pages/ItemPage/ItemPage';
import AdminPage from './pages/AdminPage/AdminPage';

const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN === "true";

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'characters', element: <CharacterPage /> },
            { path: 'artists', element: <ArtistPage /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'post/:id', element: <ItemPage /> },
            ...(enableAdmin ? [{ path: 'admin', element: <AdminPage /> }] : [])
        ]
    }
];

const Routes = () => useRoutes(routes);

export default Routes;
