// API attendance status -> key in config/theme.js statusStyles (used by <Badge status=... />).
export const statusBadgeKey = {
  present: "present",
  absent: "absent",
  "half-day": "halfDay",
  late: "late",
};

export const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// Attendance.date is stored as midnight UTC, so render it in UTC or users west
// of UTC would see the previous calendar day.
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
