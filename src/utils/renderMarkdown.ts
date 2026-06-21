import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const allowedTags = [
    'p', 'br', 'strong', 'em', 'del', 'blockquote',
    'ul', 'ol', 'li', 'a', 'code', 'pre', 'h1', 'h2', 'h3', 'hr'
];

export const renderMarkdown = (markdown: string): string => sanitizeHtml(
    marked.parse(markdown, { async: false }) as string,
    {
        allowedTags,
        allowedAttributes: {
            a: ['href', 'title']
        },
        allowedSchemes: ['http', 'https', 'mailto'],
        allowProtocolRelative: false
    }
);

export const markdownExcerpt = (markdown: string, maxLength = 160): string => {
    const plainText = sanitizeHtml(marked.parse(markdown, { async: false }) as string, {
        allowedTags: [],
        allowedAttributes: {}
    }).replace(/\s+/g, ' ').trim();
    const characters = Array.from(plainText);

    return characters.length > maxLength
        ? `${characters.slice(0, maxLength - 1).join('').trimEnd()}…`
        : plainText;
};
