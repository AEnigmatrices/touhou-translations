import { useRoutes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ListPage from './pages/ListPage/ListPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ItemPage from './pages/ItemPage/ItemPage';
import AdminPage from './pages/AdminPage/AdminPage';

const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN === "true";

const routes = [
    {
        path: '/',
        children: [
            { index: true, element: <HomePage /> },
            { path: 'characters', element: <ListPage mode="character" /> },
            { path: 'artists', element: <ListPage mode="artist" /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'post/:id', element: <ItemPage /> },
            ...(enableAdmin ? [{ path: 'admin', element: <AdminPage /> }] : [])
        ]
    }
];

const Routes = () => useRoutes(routes);

export default Routes;