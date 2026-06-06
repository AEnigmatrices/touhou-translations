import { ArrowDownIcon } from "@phosphor-icons/react/ArrowDown";
import { ArrowUpIcon } from "@phosphor-icons/react/ArrowUp";
import { ArrowsDownUpIcon } from "@phosphor-icons/react/ArrowsDownUp";
import styles from './styles.module.css';
import type { FC } from "react";
import type { SortOrder } from "../../../../types/data";

interface Props {
    sortOrder: SortOrder;
    onToggleSortOrder: () => void;
}

const iconMap = {
    none: <ArrowsDownUpIcon size={18} weight="bold" />,
    asc: <ArrowUpIcon size={18} weight="bold" />,
    desc: <ArrowDownIcon size={18} weight="bold" />,
} as const;


const DateSortButton: FC<Props> = ({ sortOrder, onToggleSortOrder }) => {
    return (
        <button
            type="button"
            className={`${styles.button} ${sortOrder !== "none" ? styles.active : ''}`}
            aria-label="Sort by Date"
            aria-pressed={sortOrder !== "none"}
            onClick={onToggleSortOrder}
            title="Sort by Date"
        >
            <span aria-hidden="true">{iconMap[sortOrder]}</span>
        </button>
    );
};

export default DateSortButton;
