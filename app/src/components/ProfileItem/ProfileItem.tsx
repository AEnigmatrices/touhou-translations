import React from "react";
import { Link } from "react-router-dom";
import "./ProfileItem.scss";

interface Props {
    name: string;
    imageUrl?: string | null;
    description?: string;
    link?: string;
}



const ProfileItem: React.FC<Props> = ({ name, imageUrl, description, link }) => {
    const content = (
        <>
            <div className={`profile-item__image-wrapper ${imageUrl ? '' : 'profile-item__image-wrapper--placeholder'}`}>
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="profile-item__image" loading="lazy" />
                    : <div className="profile-item__image-placeholder" aria-hidden />
                }
            </div>
            <div className="profile-item__info">
                <span className="profile-item__name">{name}</span>
                {description && <span className="profile-item__description">{description}</span>}
            </div>
        </>
    );

    return (
        <li className="profile-item" role="listitem" aria-label={`Profile: ${name}`} tabIndex={link ? undefined : 0}>
            {link
                ? <Link to={link} className="profile-item__link">{content}</Link>
                : <div className="profile-item__link">{content}</div>
            }
        </li>
    );
};

export default ProfileItem;
