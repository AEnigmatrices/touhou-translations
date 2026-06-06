import React from "react";
import { ArrowDownIcon } from "@phosphor-icons/react/ArrowDown";
import { ArrowUpIcon } from "@phosphor-icons/react/ArrowUp";
import { ArrowsDownUpIcon } from "@phosphor-icons/react/ArrowsDownUp";
import styles from './styles.module.css';
import type { SortOrder } from "../../../../types/data";

interface Props { sortOrder: SortOrder; onToggleSortOrder: () => void; }

const iconMap = {
    none: <ArrowsDownUpIcon size={18} weight="bold" />,
    asc: <ArrowUpIcon size={18} weight="bold" />,
    desc: <ArrowDownIcon size={18} weight="bold" />,
} as const;

const ArtworkCountSortIconButton: React.FC<Props> = ({ sortOrder, onToggleSortOrder }) => {
    return (
        <button
            type="button"
            className={`${styles.button} ${sortOrder !== "none" ? styles.active : ''}`}
            aria-label="Sort by Artwork Count"
            aria-pressed={sortOrder !== "none"}
            onClick={onToggleSortOrder}
            title="Sort by Artwork Count"
        >
            <span aria-hidden="true">{iconMap[sortOrder] ?? iconMap.none}</span>
        </button>
    );
};

export default ArtworkCountSortIconButton;
