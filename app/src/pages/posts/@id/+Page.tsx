import { useGetPosts } from '../../../context/PostsContext';
import ImageViewer from '../../../components/ImageViewer/ImageViewer';
import type { PageContext } from 'vike/types';

const Page = (pageContext: PageContext) => {

    const { id } = pageContext.routeParams || {};
    if (!id) return <p style={{ color: 'red' }}>Invalid URL: missing post ID.</p>;

    const numericIndex = parseInt(id, 10);
    if (isNaN(numericIndex)) return <p style={{ color: 'red' }}>Invalid post ID: must be a number.</p>;

    const posts = useGetPosts();
    const post = posts[numericIndex - 1];
    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    return <ImageViewer post={post} />;
};

export default Page;