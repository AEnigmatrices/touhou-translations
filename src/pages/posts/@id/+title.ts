import type { PageContext } from 'vike/types';
import type { Data } from './+data';

const title = (pageContext: PageContext<Data>) => {
    const { artist, characters } = pageContext.data;

    const maxNames = 5;
    const characterNames = characters.map(c => c.short_name);
    const displayedNames = characterNames.slice(0, maxNames);
    const remainingCount = characterNames.length - displayedNames.length;

    const charactersText = (() => {
        if (characterNames.length === 0) return 'Various characters';
        if (remainingCount > 0) {
            const moreText = remainingCount === 1 ? '1 more' : `${remainingCount} more`;
            return `${displayedNames.join(', ')} and ${moreText}`;
        } else if (displayedNames.length === 1) {
            return displayedNames[0];
        } else if (displayedNames.length === 2) {
            return displayedNames.join(' and ');
        } else {
            const last = displayedNames.pop();
            return last ? `${displayedNames.join(', ')}, and ${last}` : displayedNames.join(', ');
        }
    })();

    const artistName = artist?.name ?? 'Unknown Artist';

    return `${charactersText} by ${artistName} | Touhou Translations`;
};

export default title;