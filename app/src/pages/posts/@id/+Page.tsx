import { useGetPosts } from '../../../context/PostsContext';
import { extractRedditId } from '../../../utils/extractRedditId';
import ImageViewer from '../../../components/ImageViewer/ImageViewer';
import type { PageContext } from 'vike/types';

const Page = (pageContext: PageContext) => {
    const { id } = pageContext.routeParams || {};
    if (!id) return <p style={{ color: 'red' }}>Invalid URL: missing post ID.</p>;

    if (pageContext.post) {
        return <ImageViewer post={pageContext.post} />;
    }

    const posts = useGetPosts();
    const targetRedditId = id;

    const post = posts.find(p => {
        const pid = extractRedditId(p.reddit);
        return pid === targetRedditId;
    });

    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    return <ImageViewer post={post} />;
};

export default Page;