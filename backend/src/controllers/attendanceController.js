import { attendanceService } from "../services/attendanceService.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const attendanceController = {
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
