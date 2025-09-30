import type { PageContext } from 'vike/types';
import type { Data } from './+data';

const description = (pageContext: PageContext<Data>) => {
    const { artist, characters } = pageContext.data;

    const maxNames = 10;
    const characterNames = characters.map(c => c.name);
    const displayedNames = characterNames.slice(0, maxNames);
    const remainingCount = characterNames.length - displayedNames.length;

    const charactersText = (() => {
        if (characterNames.length === 0) return 'various characters';
        if (remainingCount > 0) {
            const moreText = remainingCount === 1 ? '1 more' : `${remainingCount} more`;
            return `${displayedNames.join(', ')} and ${moreText}`;
        } else if (displayedNames.length === 1) {
            return displayedNames[0];
        } else if (displayedNames.length === 2) {
            return displayedNames.join(' and ');
        } else {
            const last = displayedNames.pop();
            return `${displayedNames.join(', ')}, and ${last}`;
        }
    })();

    const artistName = artist?.name ?? 'Unknown Artist';

    return `Touhou Project fan artwork featuring ${charactersText}, created by ${artistName}. Find more translated Touhou fanarts on Touhou Translations.`;
};

export default description;