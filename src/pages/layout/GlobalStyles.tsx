import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import type { Theme } from '@mui/material/styles';

const GlobalStyles = () => (
    <MuiGlobalStyles
        styles={(theme: Theme) => ({
            ':root': {
                fontFamily: '"Noto Sans JP", "Noto Sans", "Roboto", "Helvetica Neue", sans-serif',
                fontWeight: 400,
                lineHeight: 1.5,
                colorScheme: 'light dark',
                fontSynthesis: 'none',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
            },
            html: {
                height: '100%',
                margin: 0,
            },
            body: {
                height: '100%',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '320px',
            },
            '#root': {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '100%',
                textAlign: 'center',
                minHeight: '100vh',
            },
            main: {
                flex: 1,
                padding: '1.5rem',
                [theme.breakpoints.down('md')]: {
                    padding: 0,
                },
            },
            'em, i, .italic, [style*="font-style: italic"]': {
                fontFamily: '"Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontStyle: 'italic',
            },
        })}
    />
);

export default GlobalStyles;