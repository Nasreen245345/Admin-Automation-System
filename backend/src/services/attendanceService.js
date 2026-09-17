import { attendanceRepository } from "../repositories/attendanceRepository.js";
import { ConflictError, NotFoundError } from "../errors/AppError.js";

// Below this many worked minutes in a day, status is "half-day" instead of
// "present". (Overtime — worked minutes ABOVE a threshold — is Story 2.1.)
const HALF_DAY_THRESHOLD_MINUTES = 240;

const startOfDay = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const attendanceService = {
  async getToday(userId) {
    return attendanceRepository.findTodayForUser(userId);
  },

  async clockIn(userId) {
    const now = new Date();
    const existing = await attendanceRepository.findTodayForUser(userId, now);
    if (existing?.clockIn) {
      throw new ConflictError("Already clocked in today");
    }

    if (existing) {
      return attendanceRepository.updateById(existing._id, { clockIn: now });
    }

    return attendanceRepository.create({
      user: userId,
      date: startOfDay(now),
      clockIn: now,
    });
  },

  async clockOut(userId) {
    const now = new Date();
    const record = await attendanceRepository.findTodayForUser(userId, now);
    if (!record?.clockIn) {
      throw new NotFoundError("No clock-in found for today");
    }
    if (record.clockOut) {
      throw new ConflictError("Already clocked out today");
    }

    const workedMinutes = Math.max(0, Math.round((now - record.clockIn) / 60000));
    const status = workedMinutes < HALF_DAY_THRESHOLD_MINUTES ? "half-day" : "present";

    return attendanceRepository.updateById(record._id, { clockOut: now, workedMinutes, status });
  },
};
