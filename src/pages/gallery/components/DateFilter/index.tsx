import styles from './styles.module.css';
import type { FC } from "react";

interface Props {
    startDate: string | null;
    endDate: string | null;
    onDateChange: (field: "startDate" | "endDate", value: string | null) => void;
}

const DateFilter: FC<Props> = ({ startDate, endDate, onDateChange }) => {
    return (
        <div className={styles.root}>
            <label className={styles.label}>
                <span>Start Date</span>
                <input
                type="date"
                value={startDate || ""}
                onChange={(e) => onDateChange("startDate", e.target.value || null)}
                className={styles.input}
                />
            </label>
            <label className={styles.label}>
                <span>End Date</span>
                <input
                type="date"
                value={endDate || ""}
                onChange={(e) => onDateChange("endDate", e.target.value || null)}
                className={styles.input}
                />
            </label>
        </div>
    );
};

export default DateFilter;
