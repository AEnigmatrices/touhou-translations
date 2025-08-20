import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {
    prerender: true,
    clientRouting: true,
    hydrationCanBeAborted: true,
    title: "Touhou Translations",
    description: "An archive of fan-translated Touhou Project comics and illustrations.",
    favicon: "/touhou-translations/icons/favicon.ico",
    extends: [vikeReact]
} satisfies Config