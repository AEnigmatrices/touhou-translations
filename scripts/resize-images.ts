import sharp from 'sharp';
import { glob } from 'glob';
import { existsSync, unlinkSync } from 'node:fs';

const FORCE_REPLACE = false;

const resizeImages = async () => {
    const socialIcons = await glob('public/icons/social/**/*.webp');
    const portraitFiles = await glob('public/portraits/{artists,characters,placeholders}/**/*.webp');

    const imageFiles = [...socialIcons, ...portraitFiles];

    for (const file of imageFiles) {
        if (file.includes('_80x80.webp')) {
            console.log(`Skipped (already resized): ${file}`);
            continue;
        }

        const resizedFile = file.replace(/\.webp$/, '_80x80.webp');

        if (existsSync(resizedFile)) {
            if (FORCE_REPLACE) {
                try {
                    unlinkSync(resizedFile);
                    console.log(`Deleted existing: ${resizedFile}`);
                } catch (err) {
                    console.error(`Failed to delete ${resizedFile}:`, err.message);
                    continue;
                }
            } else {
                console.log(`Skipped (already exists): ${resizedFile}`);
                continue;
            }
        }

        try {
            await sharp(file)
                .resize(80, 80, { fit: 'cover', position: 'center' })
                .webp({ quality: 100, lossless: true })
                .toFile(resizedFile);
            console.log(`Resized: ${file} → ${resizedFile}`);
        } catch (err) {
            console.error(`Failed to resize ${file}:`, err.message);
        }
    }
};

resizeImages().catch(console.error);