import ListPage from './pages/ListPage/ListPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ItemPage from './pages/ItemPage/ItemPage';

const routes = [
    {
        path: '/',
        children: [
            { path: 'characters', element: <ListPage mode="character" /> },
            { path: 'artists', element: <ListPage mode="artist" /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'post/:id', element: <ItemPage /> }
        ]
    }
];