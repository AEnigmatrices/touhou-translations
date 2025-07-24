import ListPage from './pages/ListPage/ListPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ItemPage from './pages/ItemPage/ItemPage';
import AdminPage from './pages/AdminPage/AdminPage';

const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN === "true";

const routes = [
    {
        path: '/',
        children: [
            { path: 'characters', element: <ListPage mode="character" /> },
            { path: 'artists', element: <ListPage mode="artist" /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'post/:id', element: <ItemPage /> },
            ...(enableAdmin ? [{ path: 'admin', element: <AdminPage /> }] : [])
        ]
    }
];