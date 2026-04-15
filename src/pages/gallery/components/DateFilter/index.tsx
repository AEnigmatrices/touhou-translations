import { Stack, TextField } from "@mui/material";
import type { FC } from "react";

interface Props {
    startDate: string | null;
    endDate: string | null;
    onDateChange: (field: "startDate" | "endDate", value: string | null) => void;
}

const DateFilter: FC<Props> = ({ startDate, endDate, onDateChange }) => {
    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <TextField
                label="Start Date"
                type="date"
                value={startDate || ""}
                onChange={(e) => onDateChange("startDate", e.target.value || null)}
                slotProps={{ inputLabel: { shrink: true } }}
                size="small"
            />
            <TextField
                label="End Date"
                type="date"
                value={endDate || ""}
                onChange={(e) => onDateChange("endDate", e.target.value || null)}
                slotProps={{ inputLabel: { shrink: true } }}
                size="small"
            />
        </Stack>
    );
};

export default DateFilter;
