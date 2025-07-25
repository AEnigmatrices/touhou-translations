declare global {
    namespace Vike {
        interface PageContext {
            Page: Page
            data?: {
                title?: string
            }
            config: {
                title?: string
            }
            abortReason?: string
            someAsyncProps?: number
        }
    }
}

type Page = () => React.ReactElement

export { }
