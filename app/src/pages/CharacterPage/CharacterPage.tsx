import React from "react";
import CharacterList from "../../components/CharacterList/CharacterList";
import "./CharacterPage.scss";

const CharacterPage: React.FC = () => {
    return (
        <div className="character-page">
            <h2>Character List</h2>
            <CharacterList />
        </div>
    );
};

export default CharacterPage;