import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface ElevationScrollProps {
    children: React.ReactElement<{ elevation?: number }>;
}

export const ElevationScroll: React.FC<ElevationScrollProps> = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
}

export const navLinks = [
    { label: 'Home', to: '/touhou-translations/' },
    { label: 'Characters', to: '/touhou-translations/characters' },
    { label: 'Artists', to: '/touhou-translations/artists' },
    { label: 'Gallery', to: '/touhou-translations/gallery' },
    ...(import.meta.env.VITE_ENABLE_ADMIN === "true"
        ? [{ label: 'Admin', to: '/touhou-translations/admin' }]
        : []),
];