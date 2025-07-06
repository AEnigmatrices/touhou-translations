import React from "react";
import { Link } from "react-router-dom";
import { getCharacterImages } from "../../utils/characterImages";
import { getGradient } from "../../utils/gradientUtils";
import "./ArtistList.scss";
import type { Artist } from "../../types/data";

interface Props { artists: Artist[]; }



const baseHue = Math.floor(Math.random() * 360);

const ArtistList: React.FC<Props> = ({ artists }) => {
    return (
        <ul className="artist-list">
            {artists.map((artist, index) => {
                const hue = Math.round(baseHue + (240 * index) / Math.max(artists.length - 1, 1)) % 360;
                const gradient = getGradient(hue, 25, 87);
                const gradientPlaceholder = getGradient(hue, 25, 73);
                const imageUrl = getCharacterImages(artist.id);
                const toUrl = `/gallery?artist=${artist.id}`;

                return (
                    <li key={artist.id} className="artist-list__item" aria-label={`Artist: ${artist.name}`}>
                        <Link to={toUrl} className="artist-list__link">
                            <div className="artist-list__image-wrapper" style={{ background: gradient }}>
                                {imageUrl ? (
                                    <img src={imageUrl} alt={artist.name} className="artist-list__image" loading="lazy" />
                                ) : (
                                    <div className="artist-list__image-placeholder" aria-hidden="true" style={{ background: gradientPlaceholder }} />
                                )}
                            </div>
                            <div className="artist-list__info">
                                <span className="artist-list__name">{artist.name}</span>
                                <span className="artist-list__id">{artist.id}</span>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ArtistList;
