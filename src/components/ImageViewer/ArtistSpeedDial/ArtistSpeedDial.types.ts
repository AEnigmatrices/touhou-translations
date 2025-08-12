import type { ReactNode } from 'react';

export interface Artist {
    name: string;
    portrait: string;
    linkTwitter?: string;
    linkPixiv?: string;
}

export interface SpeedDialAction {
    icon: ReactNode;
    name: string;
    href?: string;
}

export interface ArtistSpeedDialProps {
    artist: Artist;
    speedDialActions: SpeedDialAction[];
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    imageUrl: string;
}