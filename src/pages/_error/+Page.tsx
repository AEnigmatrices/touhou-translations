import { Box, Typography } from '@mui/material'
import { usePageContext } from '../../renderer/usePageContext'

const Page = () => {
    const pageContext = usePageContext()
    let { is404, abortReason } = pageContext

    const displayMessage = abortReason && typeof abortReason === 'string'
        ? abortReason
        : is404
            ? 'Page not found.'
            : 'Something went wrong.'

    return (
        <Box
            component="main"
            sx={{ height: 'calc(100vh - 100px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Typography variant="h6" sx={{ fontSize: '1.3em' }}>
                {displayMessage}
            </Typography>
        </Box>
    )
}

export { Page }