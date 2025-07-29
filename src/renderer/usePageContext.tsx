import React, { useContext, type JSX, type ReactNode } from 'react'
import type { ExtendedPageContext } from '../types/vike'

const Context = React.createContext<ExtendedPageContext>(undefined as any)

const PageContextProvider = ({
    pageContext,
    children
}: {
    pageContext: ExtendedPageContext;
    children: ReactNode
}): JSX.Element => (
    <Context.Provider value={pageContext}>
        {children}
    </Context.Provider>
)

const usePageContext = (): ExtendedPageContext => useContext(Context)

export { PageContextProvider, usePageContext }