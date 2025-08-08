const isDev = import.meta.env.MODE === 'development';
const BASE_PATH = import.meta.env.BASE_URL;

export const navLinks = [
    { label: 'Home', to: BASE_PATH },
    { label: 'Characters', to: `${BASE_PATH}characters` },
    { label: 'Artists', to: `${BASE_PATH}artists` },
    { label: 'Gallery', to: `${BASE_PATH}gallery` },
    ...((isDev) ? [{ label: 'Admin', to: `${BASE_PATH}admin` }] : []),
];