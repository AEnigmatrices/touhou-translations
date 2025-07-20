import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ariaSortMap, iconMap } from "./ArtworkCountSortButton.constants";
import type { SortOrder } from "../../types/data";

interface Props { sortOrder: SortOrder; onToggleSortOrder: () => void; }

const getAriaSort = (order: SortOrder) => ariaSortMap[order];

const ArtworkCountSortIconButton: React.FC<Props> = ({ sortOrder, onToggleSortOrder }) => {
    const IconComponent = iconMap[sortOrder] ?? iconMap.none;

    return (
        <Tooltip title="Sort by Artwork Count" arrow>
            <IconButton
                aria-label="Sort by Artwork Count"
                aria-pressed={sortOrder !== "none"}
                aria-sort={getAriaSort(sortOrder)}
                onClick={onToggleSortOrder}
                color={sortOrder === "none" ? "default" : "primary"}
                size="medium"
            >
                <IconComponent />
            </IconButton>
        </Tooltip>
    );
};

export default ArtworkCountSortIconButton;
