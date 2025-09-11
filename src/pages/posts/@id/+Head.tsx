import type { PageContext } from 'vike/types';
import type { Data } from './+data'

const baseUrl = import.meta.env.BASE_URL;

const Head = (pageContext: PageContext<Data>) => {
    const { prevPostId, nextPostId } = pageContext.data;
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