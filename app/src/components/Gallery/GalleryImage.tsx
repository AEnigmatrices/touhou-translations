import { useState } from 'react';
import './GalleryImage.scss';

interface Props { src: string; alt: string; }

const GalleryImage: React.FC<Props> = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="gallery-image__wrapper">
            {!loaded && <div className="gallery-image__placeholder" aria-hidden="true" />}
            <img src={src} alt={alt} loading="lazy" className={`gallery-image__image ${loaded ? 'loaded' : 'loading'}`} onLoad={() => setLoaded(true)} />
        </div>
    );
};

export default GalleryImage;
