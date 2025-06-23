import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home/Home";
import Placeholder from "../components/Placeholder";
import type { Post } from "../types/data";
import Gallery from "../pages/Gallery/Gallery";



export const createRoutes = (post: Post, currentPostIndex: number, setCurrentPostIndex: React.Dispatch<React.SetStateAction<number>>, totalPosts: number): RouteObject[] => [
    { path: "/", element: <Home title="Home" /> },
    { path: "/search", element: <Placeholder title="Search" /> },
    { path: "/characters", element: <Placeholder title="Characters" /> },
    { path: "/artists", element: <Placeholder title="Artists" /> },
    { path: "/gallery", element: (<Gallery post={post} currentPostIndex={currentPostIndex} setCurrentPostIndex={setCurrentPostIndex} totalPosts={totalPosts} />) },
];
