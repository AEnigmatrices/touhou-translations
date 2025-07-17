import type { SortOrder } from "../../types/data";

export interface Props {
    sortOrder: SortOrder;
    onToggleSortOrder: () => void;
}