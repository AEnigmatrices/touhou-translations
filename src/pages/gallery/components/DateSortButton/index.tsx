import styles from './styles.module.css';
import type { FC } from "react";
import type { SortOrder } from "../../../../types/data";

interface Props {
    sortOrder: SortOrder;
    onToggleSortOrder: () => void;
}

const ariaSortMap = { none: "none", asc: "ascending", desc: "descending" } as const;

const iconMap = { none: "↕", asc: "↑", desc: "↓" } as const;


const DateSortButton: FC<Props> = ({ sortOrder, onToggleSortOrder }) => {
    return (
        <button
            type="button"
            className={`${styles.button} ${sortOrder !== "none" ? styles.active : ''}`}
            aria-label="Sort by Date"
            aria-pressed={sortOrder !== "none"}
            aria-sort={ariaSortMap[sortOrder]}
            onClick={onToggleSortOrder}
            title="Sort by Date"
        >
            <span aria-hidden="true">{iconMap[sortOrder]}</span>
        </button>
    );
};

export default DateSortButton;
