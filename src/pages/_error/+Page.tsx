import { usePageContext } from '../../renderer/usePageContext'

const Page = () => {
    const pageContext = usePageContext()
    let { is404, abortReason } = pageContext

    const displayMessage = abortReason && typeof abortReason === 'string'
        ? abortReason
        : is404 ? 'Page not found.' : 'Something went wrong.'

    return (
        <Center>
            <p style={{ fontSize: '1.3em' }}>{displayMessage}</p>
        </Center>
    )
}

const Center = ({ style, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            style={{
                height: 'calc(100vh - 100px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style,
            }}
            {...props}
        ></div>
    )
}

export { Page }