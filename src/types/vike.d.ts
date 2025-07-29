import type { Post } from "../types/data"

declare global {
    namespace Vike {
        interface PageContext {
            post?: Post
        }
    }
}