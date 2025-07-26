import { CircularProgress, Box } from "@mui/material";

const Loading = () => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: 200,
        }}
    >
        <CircularProgress />
    </Box>
);

export default Loading;
