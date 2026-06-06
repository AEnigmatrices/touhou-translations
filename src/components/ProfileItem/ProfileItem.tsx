import React, { useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import LoadingIndicator from "../../components/LoadingIndicator";
import styles from "./styles.module.css";

interface Props {
    name: string;
    imageUrl: string;
    description1?: string;
    description2?: string;
    link?: string;
    isSelectMode?: boolean;
    isSelected?: boolean;
    onToggleSelect?: () => void;
}

const ProfileItem: React.FC<Props> = ({ name, imageUrl, description1, description2, link, isSelectMode, isSelected, onToggleSelect }) => {

    const observerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleItemClick = () => {
        if (isSelectMode && onToggleSelect) {
            onToggleSelect();
        }
    };

    useEffect(() => {
        const node = observerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const ImageContent = <div className={styles.imageFrame}>
        {isVisible ? <Img
            src={[imageUrl]}
            alt={name}
            decode={false}
            loader={
                <div className={styles.imageFill}>
                    <LoadingIndicator />
                </div>
            }
            unloader={
                <div className={styles.imageFill} aria-hidden>
                    <LoadingIndicator />
                </div>
            }
            className={styles.avatar}
        /> : <div className={styles.imageFill} aria-hidden />}
    </div>;

    const Content = (
        <div className={styles.content} onClick={handleItemClick}>
            {ImageContent}
            <div className={styles.textContainer}>
                {isSelectMode && onToggleSelect && (
                    <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        style={{ marginRight: "8px" }}
                        aria-label={`Select ${name}`}
                    />
                )}
                <p className={styles.name}>{name}</p>
                {description1 && <p className={styles.description}>{description1}</p>}
                {description2 && <p className={styles.description}>{description2}</p>}
            </div>
        </div>
    );

    return (
        <li role="listitem" aria-label={`Profile: ${name}`} tabIndex={link ? undefined : 0} className={styles.paper}>
            <div ref={observerRef}>
                {link
                    ? <a href={link} className={styles.linkBox}>{Content}</a>
                    : <div className={styles.linkBox}>{Content}</div>
                }
            </div>
        </li>
    );
};

export default ProfileItem;
