import type { ReactElement } from "react"
import type { Post } from "../types/data"

type Page = () => ReactElement

declare global {
    namespace Vike {
        interface PageContext {
            Page: Page
            post: Post
        }
    }
}