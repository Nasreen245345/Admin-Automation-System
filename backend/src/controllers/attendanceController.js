import { attendanceService } from "../services/attendanceService.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const attendanceController = {
  today: asyncHandler(async (req, res) => {
    const attendance = await attendanceService.getToday(req.userId);
    sendSuccess(res, {
      message: "Today's attendance",
      data: { attendance },
    });
  }),

  list: asyncHandler(async (req, res) => {
    const { userId, status, startDate, endDate, page, pageSize } = req.query;
    const { items, pagination } = await attendanceService.list({
      requesterId: req.userId,
      canViewAll: req.permissions.includes("attendance.update"),
      userId,
      status,
      startDate,
      endDate,
      page,
      pageSize,
    });
    sendSuccess(res, {
      message: "Attendance records",
      data: { attendance: items },
      meta: pagination,
    });
  }),

  clockIn: asyncHandler(async (req, res) => {
    const attendance = await attendanceService.clockIn(req.userId);
    sendSuccess(res, {
      statusCode: 201,
      message: "Clocked in successfully",
      data: { attendance },
    });
  }),

  clockOut: asyncHandler(async (req, res) => {
    const attendance = await attendanceService.clockOut(req.userId);
    sendSuccess(res, {
      message: "Clocked out successfully",
      data: { attendance },
    });
  }),
};
