import { useState, type FC } from 'react';
import styles from './styles.module.css';
import type { Character } from '../../../../types/data';

interface Props {
    characters: Character[];
    previewCount?: number;
}

const previewCount = 4
const baseUrl = import.meta.env.BASE_URL;

const CharacterChips: FC<Props> = ({ characters }) => {

    const [showAll, setShowAll] = useState(false);
    const visibleCharacters = showAll ? characters : characters.slice(0, previewCount);

    return (
        <div className={styles.container}>
            {visibleCharacters.map((c) => (
                <a
                    key={c.id}
                    href={`${baseUrl}gallery?characters=${c.id}`}
                    className={styles.chip}
                >
                    {c.portrait && <img src={`${baseUrl}${c.portrait}`} alt="" className={styles.avatar} />}
                    <span>{c.short_name}</span>
                </a>
            ))}
            {characters.length > previewCount && (
                <div className={styles.toggleWrapper}>
                    <button
                        type="button"
                        onClick={() => setShowAll(prev => !prev)}
                        className={styles.toggle}
                    >
                        {showAll ? 'Show fewer' : `Show all (${characters.length})`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CharacterChips;
