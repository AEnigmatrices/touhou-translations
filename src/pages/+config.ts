import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {
    prerender: true,
    title: 'Home | Touhou Translations',
    description: "An archive of fan-translated Touhou Project comics and illustrations.",
    trailingSlash: true,
    extends: [vikeReact]
} satisfies Config