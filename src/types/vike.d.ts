import type { ReactElement } from "react"
import type { Post, Artist, Character } from "../types/data"
import type { PageContext } from 'vike/types'

type Page = () => ReactElement

declare global {
    namespace Vike {
        interface PageContext {
            Page: Page
            post?: Post
            data?: {
                post?: Post
                posts?: Post[]
                artists?: Artist[]
                characters?: Character[]
            }
            appData?: {
                posts?: Post[]
                artists?: Artist[]
                characters?: Character[]
            }
        }
    }
}