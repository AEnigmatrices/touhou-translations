import Home from "../pages/Home/Home";
import Item from "../pages/Item/Item";
import Placeholder from "../components/Placeholder";



export const createRoutes = () => [
    { path: "/", element: <Home title="Home" /> },
    { path: "/search", element: <Placeholder title="Search" /> },
    { path: "/characters", element: <Placeholder title="Characters" /> },
    { path: "/artists", element: <Placeholder title="Artists" /> },
    { path: "/gallery", element: <Placeholder title="Gallery" /> },
    { path: "/post/:id", element: <Item /> }
];
