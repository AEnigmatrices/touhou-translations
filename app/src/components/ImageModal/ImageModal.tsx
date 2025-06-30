import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './ImageModal.scss';

interface Props { imageUrl: string; onClose: () => void; }

const ImageModal: React.FC<Props> = ({ imageUrl, onClose }) => (
    <div className="image-modal__overlay" onClick={onClose}>
        <div className="image-modal__content" onClick={e => e.stopPropagation()}>
            <TransformWrapper
                initialScale={1} minScale={1} maxScale={5} wheel={{ step: 0.1 }} limitToBounds={true}
                velocityAnimation={{ sensitivity: 0.5 }} doubleClick={{ mode: 'toggle', step: 0.5 }}
            >
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <img src={imageUrl} alt="Full View" className="image-modal__image" />
                </TransformComponent>
            </TransformWrapper>
        </div>
    </div>
);

export default ImageModal;