import sharp from 'sharp';
import { glob } from 'glob';
import { existsSync, unlinkSync } from 'node:fs';

const FORCE_REPLACE = false;

const getTargetImages = async (): Promise<Array<{ original: string; resized: string }>> => {
    const socialIcons = await glob('public/icons/social/**/*.webp');
    const portraitFiles = await glob('public/portraits/{artists,characters,placeholders}/**/*.webp');
    const imageFiles = [...socialIcons, ...portraitFiles];

    const targets: Array<{ original: string; resized: string }> = [];

    for (const file of imageFiles) {
        if (file.includes('_80x80.webp')) continue;

        const resizedFile = file.replace(/\.webp$/, '_80x80.webp');

        if (!existsSync(resizedFile) || FORCE_REPLACE) {
            targets.push({ original: file, resized: resizedFile });
        }
    }

    return targets;
};

const processImages = async (targets: Array<{ original: string; resized: string }>) => {
    for (const { original, resized } of targets) {
        if (existsSync(resized) && FORCE_REPLACE) {
            try {
                unlinkSync(resized);
                console.log(`Deleted existing: ${resized}`);
            } catch (err) {
                console.error(`Failed to delete ${resized}:`, err.message);
                continue;
            }
        }

        try {
            await sharp(original)
                .resize(80, 80, { fit: 'cover', position: 'center' })
                .webp({ quality: 100, lossless: true })
                .toFile(resized);
            console.log(`Resized: ${original} → ${resized}`);
        } catch (err) {
            console.error(`Failed to resize ${original}:`, err.message);
        }
    }
};



const resizeImages = async () => {
    const targets = await getTargetImages();

    if (targets.length === 0) {
        console.log('No images need processing.');
        return;
    }

    console.log(`Found ${targets.length} images to process.`);
    await processImages(targets);
};

resizeImages().catch(console.error);