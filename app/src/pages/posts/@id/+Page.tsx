import { useGetPosts } from '../../../context/PostsContext';
import ImageViewer from '../../../components/ImageViewer/ImageViewer';
import type { PageContext } from 'vike/types';

type PageContextCustom = PageContext & {
    urlParsed: {
        pathname: string;
    };
};

const Page = (pageContext: PageContextCustom) => {
    const pathname = pageContext.urlParsed.pathname;
    const match = pathname.match(/^\/posts\/(.+)$/);
    const id = match ? match[1] : null;

    if (!id) {
        return <p style={{ color: 'red' }}>Invalid URL: missing post ID.</p>;
    }

    const numericIndex = parseInt(id, 10);
    const posts = useGetPosts();
    const post = posts[numericIndex - 1];

    if (isNaN(numericIndex)) {
        return <p style={{ color: 'red' }}>Invalid post ID: must be a number.</p>;
    }
    if (!post) {
        return <p style={{ color: 'red' }}>Post not found.</p>;
    }

    return <ImageViewer post={post} />;
};

export default Page;