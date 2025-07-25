import React, { createContext, useContext, type ReactNode } from 'react'
import type { PageContext } from 'vike/types'

const Context = createContext<PageContext>(undefined as any)

interface Props {
    pageContext: PageContext
    children: ReactNode
}

const PageContextProvider = ({ pageContext, children }: Props) => {
    return React.createElement(Context.Provider, { value: pageContext }, children)
}

const usePageContext = () => {
    const pageContext = useContext(Context)
    return pageContext
}

export { PageContextProvider, usePageContext }