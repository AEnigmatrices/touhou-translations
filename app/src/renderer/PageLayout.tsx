import React from 'react'
import './PageLayout.css'

const PageLayout = ({ children }: any) => {
    return (
        <React.StrictMode>
            <Navigation>
                <a href="/">Home</a>
                <a href="/touhou-translations/about">About</a>
            </Navigation>
            <Content>{children}</Content>
        </React.StrictMode>
    )
}

const Navigation = ({ children }: any) => {
    return (
        <div
            style={{
                paddingBottom: 25,
                paddingTop: 5,
                fontSize: '1.2em',
                display: 'flex',
                justifyContent: 'center',
                gap: 25,
            }}
        >
            {children}
        </div>
    )
}

const Content = ({ children }: any) => {
    return <div>{children}</div>
}

export { PageLayout }