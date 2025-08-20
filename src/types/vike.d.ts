import type { ReactElement } from "react"
import type { Post, Artist, Character } from "../types/data"
import type { PageContext } from 'vike/types'

type Page = () => ReactElement

declare global {
    namespace Vike {
        interface PageContext {
            appData?: {
                posts?: Post[]
                artists?: Artist[]
                characters?: Character[]
            }
        }
    }
}