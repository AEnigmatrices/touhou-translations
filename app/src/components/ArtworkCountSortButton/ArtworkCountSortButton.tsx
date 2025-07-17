import React from "react";
import "./ArtworkCountSortButton.scss";
import { ariaSortMap, sortSymbols } from "./ArtworkCountSortButton.constants";
import type { SortOrder } from "../../types/data";

interface Props { sortOrder: SortOrder; onToggleSortOrder: () => void; }

const getAriaSort = (order: SortOrder) => ariaSortMap[order];
const getSortSymbol = (order: SortOrder): string => sortSymbols[order];

const ArtworkCountSortButton: React.FC<Props> = ({ sortOrder, onToggleSortOrder }) => {
    return (
        <button
            aria-label="Sort by Artwork Count" aria-pressed={sortOrder !== "none"} aria-sort={getAriaSort(sortOrder)}
            onClick={onToggleSortOrder} className={`artwork-count-sort-button sort-${sortOrder}`}
        >
            Artwork Count {getSortSymbol(sortOrder)}
        </button>
    );
};

export default ArtworkCountSortButton;