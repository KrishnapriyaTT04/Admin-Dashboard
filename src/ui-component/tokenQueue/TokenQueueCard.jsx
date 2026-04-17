import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Grid,
    Typography,
    Card,
    Chip,
    TextField,
    Button,
    Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const API_URL = "http://localhost:5000/api/tokens";

export default function TokenQueueCard() {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // ================= FETCH =================
    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = async () => {
        try {
            const res = await axios.get(API_URL);
            setRows(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    // ================= STATUS UPDATE =================
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${API_URL}/${id}`, { status });
            fetchTokens();
        } catch (err) {
            console.error(err);
        }
    };

    // ================= FILTER LOGIC =================
    const filteredRows = rows
        .filter((row) =>
            `${row.patientName} ${row.tokenNumber}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((row) => {
            if (filter === "All") return true;
            return row.status === filter;
        });

    // ================= STATS =================
    const stats = {
        total: rows.length,
        waiting: rows.filter((r) => r.status === "Waiting").length,
        serving: rows.filter((r) => r.status === "Serving").length,
        done: rows.filter((r) => r.status === "Done").length
    };

    // ================= STATUS COLOR =================
    const statusColor = {
        Waiting: "warning",
        Serving: "success",
        Done: "primary"
    };

    return (
        <Box>
            {/* STATS */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={3}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="body2">Total Today</Typography>
                        <Typography variant="h5">{stats.total}</Typography>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="body2">Waiting</Typography>
                        <Typography variant="h5">{stats.waiting}</Typography>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="body2">Now Serving</Typography>
                        <Typography variant="h5">{stats.serving}</Typography>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="body2">Completed</Typography>
                        <Typography variant="h5">{stats.done}</Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* SEARCH + FILTERS */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    size="small"
                    placeholder="Search by patient name or token..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <SearchIcon /> }}
                    sx={{ width: "40%" }}
                />

                {/* FILTER BUTTONS */}
                <Box display="flex" gap={1}>
                    {["All", "Waiting", "Serving", "Done"].map((item) => {
                        const isActive = filter === item;

                        return (
                            <Button
                                key={item}
                                onClick={() => setFilter(item)}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "10px",
                                    px: 2.5,
                                    py: 0.7,
                                    fontSize: "13px",

                                    // DEFAULT (inactive)
                                    bgcolor: "#f1f3f5",
                                    color: "#555",
                                    border: "1px solid #e0e0e0",

                                    // ACTIVE (green)
                                    ...(isActive && {
                                        bgcolor: "#e6f4ea",
                                        color: "#2eaf9e",
                                        border: "1px solid #2eaf9e"
                                    }),

                                    // HOVER
                                    "&:hover": {
                                        bgcolor: isActive ? "#d7f0e4" : "#e9ecef"
                                    }
                                }}
                            >
                                {item}
                            </Button>
                        );
                    })}
                </Box>
            </Box>

            {/* TABLE */}
            <Card>
                <Box p={2}>
                    {/* HEADER */}
                    <Grid container sx={{ fontWeight: "bold", mb: 1 }}>
                        <Grid item xs={2}>TOKEN</Grid>
                        <Grid item xs={3}>PATIENT</Grid>
                        <Grid item xs={3}>DOCTOR / DEPT.</Grid>
                        <Grid item xs={2}>TIME</Grid>
                        <Grid item xs={2}>STATUS</Grid>
                    </Grid>

                    {/* ROWS */}
                    {filteredRows.map((row) => (
                        <Grid
                            container
                            key={row._id}
                            alignItems="center"
                            sx={{ py: 1, borderTop: "1px solid #eee" }}
                        >
                            <Grid item xs={2}>{row.tokenNumber}</Grid>

                            <Grid item xs={3} display="flex" alignItems="center" gap={1}>
                                <Avatar>
                                    {row.patientName?.charAt(0)?.toUpperCase()}
                                </Avatar>
                                {row.patientName}
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="body2">{row.doctorName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {row.department}
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>{row.time}</Grid>

                            <Grid item xs={2}>
                                <Chip
                                    label={row.status}
                                    color={statusColor[row.status] || "default"}
                                    size="small"
                                />
                            </Grid>

                            {/* ACTIONS */}
                            <Grid item xs={12} mt={1}>
                                {row.status === "Waiting" && (
                                    <Button
                                        size="small"
                                        onClick={() => updateStatus(row._id, "Serving")}
                                    >
                                        Call
                                    </Button>
                                )}

                                {row.status === "Serving" && (
                                    <Button
                                        size="small"
                                        onClick={() => updateStatus(row._id, "Done")}
                                    >
                                        Done
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            </Card>
        </Box>
    );
}