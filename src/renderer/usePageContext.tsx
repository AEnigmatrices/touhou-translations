import React, { useContext, type JSX, type ReactNode } from 'react'
import type { PageContext } from 'vike/types';

const Context = React.createContext<PageContext>(undefined as any)

const PageContextProvider = ({ pageContext, children }: { pageContext: PageContext; children: ReactNode }): JSX.Element => (
    <Context.Provider value={pageContext}>
        {children}
    </Context.Provider>
)

const usePageContext = (): PageContext => useContext(Context)

export { PageContextProvider, usePageContext }