import { defineConfig, devices } from '@playwright/test';

const origin = 'http://127.0.0.1:4173';
const basePath = '/touhou-translations/';
const previewCommand = 'pnpm run preview --host 127.0.0.1 --port 4173';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: `${origin}${basePath}`,
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],
    webServer: {
        command: process.env.CI ? previewCommand : `pnpm run build && ${previewCommand}`,
        url: `${origin}${basePath}`,
        reuseExistingServer: false,
        timeout: 180_000
    }
});
