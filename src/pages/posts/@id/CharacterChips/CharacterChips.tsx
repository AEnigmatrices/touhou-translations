import React, { useState } from 'react';
import { Box, Chip, Avatar } from '@mui/material';
import styles from './CharacterChips.styles';
import type { Character } from '../../../../types/data';

interface Props {
    characters: Character[];
    baseUrl: string;
    previewCount?: number;
}

const PREVIEW_COUNT = 4

const CharacterChips: React.FC<Props> = ({ characters, baseUrl }) => {

    const [showAll, setShowAll] = useState(false);
    const visibleCharacters = showAll ? characters : characters.slice(0, PREVIEW_COUNT);

    return (
        <Box sx={styles.container}>
            {visibleCharacters.map((c) => (
                <Chip
                    key={c.id}
                    label={c.short_name}
                    component="a"
                    href={`${baseUrl}gallery?character=${c.id}`}
                    clickable
                    sx={styles.chip}
                    avatar={c.portrait ? (
                        <Avatar
                            src={`${baseUrl}${c.portrait}`}
                            alt={c.name}
                            variant="rounded"
                        />
                    ) : undefined}
                />
            ))}
            {characters.length > PREVIEW_COUNT && (
                <Box sx={styles.toggleWrapper}>
                    <Chip
                        label={showAll ? 'Show fewer' : `Show all (${characters.length})`}
                        onClick={() => setShowAll(prev => !prev)}
                        clickable
                        sx={styles.toggle}
                    />
                </Box>
            )}
        </Box>
    );
};

export default CharacterChips;