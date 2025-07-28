import sharp from 'sharp'
import { glob } from 'glob'

const resizeImages = async () => {
    const imageFiles = await glob('public/images/**/*.webp')

    for (const file of imageFiles) {
        await sharp(file)
            .resize(80, 80, { fit: 'cover', position: 'center' })
            .webp({ quality: 85 })
            .toFile(file.replace('.webp', '_80x80.webp'))
        console.log(`Resized: ${file}`)
    }
}

resizeImages().catch(console.error)