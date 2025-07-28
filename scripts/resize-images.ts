import sharp from 'sharp'
import { glob } from 'glob'

const resizeImages = async () => {
    const socialIcons = await glob('public/images/icons/social/**/*.webp')
    const portraitFiles = await glob('public/images/portraits/{artists,characters,placeholders}/**/*.webp')

    const imageFiles = [...socialIcons, ...portraitFiles]

    for (const file of imageFiles) {
        await sharp(file)
            .resize(80, 80, { fit: 'cover', position: 'center' })
            .webp({ quality: 85 })
            .toFile(file.replace('.webp', '_80x80.webp'))
        console.log(`Resized: ${file}`)
    }
}

resizeImages().catch(console.error)