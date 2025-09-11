import { useData } from 'vike-react/useData'
import type { Data } from './+data'

const baseUrl = import.meta.env.BASE_URL;

const Head = () => {
    const data = useData<Data>();
    const { prevPostId, nextPostId } = data;
    return (
        <>
            {prevPostId && (
                <link
                    rel="prefetch"
                    href={`${baseUrl}posts/${prevPostId}/index.pageContext.json`}
                    as="fetch"
                    crossOrigin="anonymous"
                />
            )}
            {nextPostId && (
                <link
                    rel="prefetch"
                    href={`${baseUrl}posts/${nextPostId}/index.pageContext.json`}
                    as="fetch"
                    crossOrigin="anonymous"
                />
            )}
        </>
    );
}

export default Head;