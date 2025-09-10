import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SortIcon from "@mui/icons-material/Sort";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import type { FC } from "react";
import type { SortOrder } from "../../../../types/data";

interface Props {
    sortOrder: SortOrder;
    onToggleSortOrder: () => void;
}

const ariaSortMap = { none: "none", asc: "ascending", desc: "descending" } as const;

const iconMap = { none: SortIcon, asc: NorthIcon, desc: SouthIcon };


const DateSortButton: FC<Props> = ({ sortOrder, onToggleSortOrder }) => {
    const IconComponent = iconMap[sortOrder];
    return (
        <Tooltip title="Sort by Date" arrow>
            <IconButton
                aria-label="Sort by Date"
                aria-pressed={sortOrder !== "none"}
                aria-sort={ariaSortMap[sortOrder]}
                onClick={onToggleSortOrder}
                color={sortOrder === "none" ? "default" : "primary"}
                size="medium"
            >
                <IconComponent />
            </IconButton>
        </Tooltip>
    );
};

export default DateSortButton;