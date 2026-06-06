import { usePageContext } from 'vike-react/usePageContext'
import styles from './styles.module.css'

const Page = () => {
    const pageContext = usePageContext()
    const { is404, abortReason } = pageContext

    const displayMessage = abortReason && typeof abortReason === 'string'
        ? abortReason
        : is404
            ? 'Page not found.'
            : 'Something went wrong.'

    return (
        <main className={styles.root}>
            <h1 className={styles.message}>
                {displayMessage}
            </h1>
        </main>
    )
}

export { Page }
