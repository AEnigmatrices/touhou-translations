import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Item from './pages/Item/Item';
import Placeholder from './components/Placeholder';

const Routes = () => {

    const routes = useMemo(() => [
        { path: '/', element: <Home /> },
        { path: '/search', element: <Placeholder title="Search" /> },
        { path: '/characters', element: <Placeholder title="Characters" /> },
        { path: '/artists', element: <Placeholder title="Artists" /> },
        { path: '/gallery', element: <Placeholder title="Gallery" /> },
        { path: '/post/:id', element: <Item /> }
    ], []);

    return useRoutes(routes);
};

export default Routes;
