import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

const theme = createTheme({
    typography: { fontFamily: '"Noto Sans JP", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif' }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);