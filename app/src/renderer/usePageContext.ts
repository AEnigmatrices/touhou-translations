import React, { createContext, useContext } from 'react'
import type { PageContext } from 'vike/types'

const Context = createContext<PageContext>(undefined as any)

const PageContextProvider = ({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) => {
    return React.createElement(Context.Provider, { value: pageContext }, children)
}

const usePageContext = () => {
    const pageContext = useContext(Context)
    return pageContext
}

export { PageContextProvider, usePageContext }