import ListPage from './pages/ListPage/ListPage';
import ItemPage from './pages/ItemPage/ItemPage';

const routes = [
    {
        path: '/',
        children: [
            { path: 'characters', element: <ListPage mode="character" /> },
            { path: 'artists', element: <ListPage mode="artist" /> },
            { path: 'post/:id', element: <ItemPage /> }
        ]
    }
];