import type { SortOrder } from "../../types/data";

export const sortSymbols: Record<SortOrder, string> = {
    none: "",
    asc: "↑",
    desc: "↓",
};

export const ariaSortMap: Record<SortOrder, "none" | "ascending" | "descending"> = {
    none: "none",
    asc: "ascending",
    desc: "descending",
};