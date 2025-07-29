import { render } from 'vike/abort'
import { fetchPosts } from '../../../context/fetchData'
import { extractRedditId } from '../../../utils/extractRedditId'
import type { PageContext } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>


export const data = async (pageContext: PageContext) => {
    const { id } = pageContext.routeParams
    if (!id) throw render(404, 'Missing post ID')

    if (pageContext.post) return { post: pageContext.post }

    const posts = await fetchPosts()
    const post = posts.find(p => extractRedditId(p.reddit) === id)

    if (!post) throw render(404, `Post not found for ID: ${id}`)

    return { post }
}