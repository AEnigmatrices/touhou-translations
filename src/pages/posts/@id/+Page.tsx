import { render } from 'vike/abort'
import { useAppData } from '../../../renderer/useAppData'
import { extractRedditId } from '../../../utils/extractRedditId'
import { usePageContext } from '../../../renderer/usePageContext'
import ImageViewer from '../../../components/ImageViewer/ImageViewer'
import type { JSX } from 'react'

const Page = (): JSX.Element => {
    const { posts, loading, error } = useAppData();
    const pageContext = usePageContext();
    const { id } = pageContext.routeParams;

    if (loading) return <div>Loading...</div>;
    if (error) throw render(500, error.message);

    const post = posts.find(p => extractRedditId(p.reddit) === id);
    if (!post) throw render(404, `Post not found for ID: ${id}`);

    return <ImageViewer post={post} />;
};

export default Page;