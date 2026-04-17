import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Avatar,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const API_URL = "http://localhost:5000/api/bookings";

export default function BookingsCard() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      setRows(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FILTER =================
  const filteredRows = rows
    .filter((row) =>
      `${row.patientName} ${row.doctorName} ${row.bookingId}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((row) => {
      if (filter === "All") return true;
      return row.status === filter;
    })
    .filter((row) => {
      if (!date) return true;
      return row.date === date;
    });

  // ================= STATS =================
  const stats = {
    total: rows.length,
    pending: rows.filter((r) => r.status === "Pending").length,
    confirmed: rows.filter((r) => r.status === "Confirmed").length,
    cancelled: rows.filter((r) => r.status === "Cancelled").length
  };

  // ================= STATUS COLORS =================
  const statusColor = {
    Pending: "warning",
    Confirmed: "success",
    Cancelled: "error",
    Completed: "primary"
  };

  return (
    <Box>
      {/* STATS */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Total Bookings</Typography>
            <Typography variant="h5">{stats.total}</Typography>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Pending</Typography>
            <Typography variant="h5" color="warning.main">
              {stats.pending}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Confirmed</Typography>
            <Typography variant="h5" color="success.main">
              {stats.confirmed}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Cancelled</Typography>
            <Typography variant="h5" color="error.main">
              {stats.cancelled}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* SEARCH + FILTER */}
      <Box display="flex" gap={2} mb={2} alignItems="center">
        <TextField
          size="small"
          placeholder="Search by patient, doctor or booking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon /> }}
          sx={{ width: "35%" }}
        />

        <TextField
          type="date"
          size="small"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* FILTER BUTTONS */}
        <Box display="flex" gap={1}>
          {["All", "Pending", "Confirmed", "Cancelled", "Completed"].map(
            (item) => {
              const isActive = filter === item;

              return (
                <Button
                  key={item}
                  onClick={() => setFilter(item)}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 2,
                    py: 0.5,
                    fontSize: "13px",
                    bgcolor: "#f1f3f5",
                    color: "#555",
                    border: "1px solid #e0e0e0",

                    ...(isActive && {
                      bgcolor: "#e6f4ea",
                      color: "#2eaf9e",
                      border: "1px solid #2eaf9e"
                    }),

                    "&:hover": {
                      bgcolor: isActive ? "#d7f0e4" : "#e9ecef"
                    }
                  }}
                >
                  {item}
                </Button>
              );
            }
          )}
        </Box>

        {/* NEW BOOKING BUTTON */}
        <Button
          variant="contained"
          sx={{
            ml: "auto",
            bgcolor: "#2eaf9e",
            textTransform: "none",
            borderRadius: "8px"
          }}
        >
          + New Booking
        </Button>
      </Box>

      {/* TABLE */}
      <Card>
        <Box p={2}>
          {/* HEADER */}
          <Grid container sx={{ fontWeight: "bold", mb: 1 }}>
            <Grid item xs={2}>BOOKING ID</Grid>
            <Grid item xs={2}>PATIENT</Grid>
            <Grid item xs={2}>DOCTOR / DEPT.</Grid>
            <Grid item xs={2}>DATE & TIME</Grid>
            <Grid item xs={1}>TYPE</Grid>
            <Grid item xs={2}>STATUS</Grid>
            <Grid item xs={1}>ACTIONS</Grid>
          </Grid>

          {/* ROWS */}
          {filteredRows.map((row) => (
            <Grid
              container
              key={row._id}
              alignItems="center"
              sx={{ py: 1, borderTop: "1px solid #eee" }}
            >
              <Grid item xs={2}>{row.bookingId}</Grid>

              <Grid item xs={2} display="flex" gap={1}>
                <Avatar>
                  {row.patientName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography>{row.patientName}</Typography>
                  <Typography variant="caption">
                    Age {row.age}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={2}>
                <Typography>{row.doctorName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {row.department}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography>{row.date}</Typography>
                <Typography variant="caption">
                  {row.time}
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Chip label={row.type} size="small" />
              </Grid>

              <Grid item xs={2}>
                <Chip
                  label={row.status}
                  color={statusColor[row.status] || "default"}
                  size="small"
                />
              </Grid>

              <Grid item xs={1}>
                <Button size="small" color="success">
                  View
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Card>
    </Box>
  );
}