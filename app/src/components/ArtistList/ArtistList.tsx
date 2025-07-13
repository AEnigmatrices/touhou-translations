import React from "react";
import ProfileItem from "../ProfileItem/ProfileItem";
import { getArtistImages } from "../../utils/galleryUtils";
import type { Artist } from "../../types/data";
import "./ArtistList.scss";

interface Props { artists: Artist[]; }



const ArtistList: React.FC<Props> = ({ artists }) => {
    return (
        <ul className="artist-list">
            {artists.map((artist) => {
                const imageUrl = getArtistImages(artist.id);
                const toUrl = `/gallery?artist=${artist.id}`;
                const artworkCountText = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? "s" : ""}`;

                return (
                    <ProfileItem
                        key={artist.id}
                        name={artist.name}
                        imageUrl={imageUrl}
                        description={artworkCountText}
                        link={toUrl}
                    />
                );
            })}
        </ul>
    );
};

export default ArtistList;
