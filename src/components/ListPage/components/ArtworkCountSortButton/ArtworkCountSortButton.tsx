import React from "react";
import styles from './styles.module.css';
import type { SortOrder } from "../../../../types/data";

interface Props { sortOrder: SortOrder; onToggleSortOrder: () => void; }

const ariaSortMap = { none: "none", asc: "ascending", desc: "descending" } as const;
const iconMap = { none: "↕", asc: "↑", desc: "↓" } as const;
const getAriaSort = (order: SortOrder) => ariaSortMap[order];

const ArtworkCountSortIconButton: React.FC<Props> = ({ sortOrder, onToggleSortOrder }) => {
    return (
        <button
            type="button"
            className={`${styles.button} ${sortOrder !== "none" ? styles.active : ''}`}
            aria-label="Sort by Artwork Count"
            aria-pressed={sortOrder !== "none"}
            aria-sort={getAriaSort(sortOrder)}
            onClick={onToggleSortOrder}
            title="Sort by Artwork Count"
        >
            <span aria-hidden="true">{iconMap[sortOrder] ?? iconMap.none}</span>
        </button>
    );
};

export default ArtworkCountSortIconButton;
