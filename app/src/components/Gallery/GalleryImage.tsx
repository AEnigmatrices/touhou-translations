import { useState } from 'react';
import './Gallery.scss';

interface Props { src: string; alt: string; }



const GalleryImage: React.FC<Props> = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="gallery__image-wrapper">
            {!loaded && (
                <div className="gallery__placeholder" aria-hidden="true">
                    Loading...
                </div>
            )}
            <img src={src} alt={alt} loading="lazy" className={`gallery__image ${loaded ? 'loaded' : 'loading'}`} onLoad={() => setLoaded(true)} />
        </div>
    );
};

export default GalleryImage;
