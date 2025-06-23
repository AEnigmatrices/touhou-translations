import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { createRoutes } from './routes';

const AppRoutes = () => {

    const routes = useMemo(() => createRoutes(), []);

    return useRoutes(routes);
};

export default AppRoutes;
