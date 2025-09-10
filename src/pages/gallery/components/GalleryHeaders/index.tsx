import ProfileItem from '../../../../components/ProfileItem/ProfileItem';
import type { FC } from 'react';
import type { Character, Artist } from '../../../../types/data';

type GalleryEntity =
    | (Character & { artworkCount: number; artistCount: number })
    | (Artist & { artworkCount: number; characterCount: number });

interface Props {
    entity: GalleryEntity;
    type: 'character' | 'artist';
}


const GalleryHeader: FC<Props> = ({ entity, type }) => {
    const imageUrl = `${import.meta.env.BASE_URL}${entity.portrait}`;

    const isCharacter = (e: GalleryEntity): e is Character & { artworkCount: number; artistCount: number } => type === 'character' && 'artistCount' in e;
    const isArtist = (e: GalleryEntity): e is Artist & { artworkCount: number; characterCount: number } => type === 'artist' && 'characterCount' in e;

    const mapping = (() => {
        if (isCharacter(entity)) {
            return {
                description1: `${entity.artworkCount} artwork${entity.artworkCount !== 1 ? 's' : ''}`,
                description2: `${entity.artistCount} artist${entity.artistCount !== 1 ? 's' : ''}`,
                linkHref: '/touhou-translations/characters',
            };
        } else if (isArtist(entity)) {
            return {
                description1: `${entity.artworkCount} artwork${entity.artworkCount !== 1 ? 's' : ''}`,
                description2: `${entity.characterCount} character${entity.characterCount !== 1 ? 's' : ''}`,
                linkHref: '/touhou-translations/artists',
            };
        }
        throw new Error('Invalid entity type');
    })();

    return (
        <a href={mapping.linkHref} aria-label={`Back to ${type} list`}>
            <ProfileItem
                name={entity.name}
                imageUrl={imageUrl}
                description1={mapping.description1}
                description2={mapping.description2}
            />
        </a>
    );
};

export default GalleryHeader;