import { Attendance } from "../models/index.js";

// Attendance.date is always stored normalized to midnight UTC — one record
// per user per day — so every lookup/filter by day goes through this.
const startOfDay = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const attendanceRepository = {
  create: (data) => Attendance.create(data),
  findById: (id) => Attendance.findById(id),
  findTodayForUser: (userId, date = new Date()) =>
    Attendance.findOne({ user: userId, date: startOfDay(date) }),
  updateById: (id, data) => Attendance.findByIdAndUpdate(id, data, { new: true }),
  list: ({ userId, status, startDate, endDate } = {}) => {
    const query = {};
    if (userId) query.user = userId;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startOfDay(startDate);
      if (endDate) query.date.$lte = startOfDay(endDate);
    }
    return Attendance.find(query).sort({ date: -1 });
  },
};
