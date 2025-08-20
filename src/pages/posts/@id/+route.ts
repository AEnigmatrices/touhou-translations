import { resolveRoute } from 'vike/routing'
import type { PageContext } from 'vike/types'

export const route = (pageContext: PageContext) => {
    if (pageContext.urlPathname === '/posts' || pageContext.urlPathname === '/posts/') {
        return { routeParams: { id: '' } }
    }
    return resolveRoute('/posts/@id', pageContext.urlPathname)
}