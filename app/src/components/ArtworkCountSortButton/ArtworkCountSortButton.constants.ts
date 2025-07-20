import CollectionsIcon from "@mui/icons-material/Collections";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { SortOrder } from "../../types/data";

export const ariaSortMap: Record<SortOrder, "none" | "ascending" | "descending"> = {
    none: "none",
    asc: "ascending",
    desc: "descending",
};

export const sortSymbols: Record<SortOrder, string> = {
    none: "",
    asc: "↑",
    desc: "↓",
};

export const iconMap: Record<SortOrder, React.ElementType> = {
    asc: ArrowUpwardIcon,
    desc: ArrowDownwardIcon,
    none: CollectionsIcon,
};
