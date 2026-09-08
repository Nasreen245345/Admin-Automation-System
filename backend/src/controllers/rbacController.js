import { rbacRepository } from "../repositories/rbacRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { NotFoundError, BadRequestError } from "../errors/AppError.js";

export const rbacController = {
  listRoles: asyncHandler(async (req, res) => {
    const roles = await rbacRepository.findAllRoles();
    sendSuccess(res, { data: roles });
  }),

  createRole: asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name) throw new BadRequestError("Role name is required");
    const role = await rbacRepository.createRole({ name, description });
    sendSuccess(res, { statusCode: 201, message: "Role created", data: role });
  }),

  listPermissions: asyncHandler(async (req, res) => {
    const permissions = await rbacRepository.findAllPermissions();
    sendSuccess(res, { data: permissions });
  }),

  assignPermissionToRole: asyncHandler(async (req, res) => {
    const { roleId, permissionId } = req.body;
    const role = await rbacRepository.findRoleById(roleId);
    if (!role) throw new NotFoundError("Role not found");
    const link = await rbacRepository.assignPermissionToRole(roleId, permissionId);
    sendSuccess(res, { message: "Permission assigned to role", data: link });
  }),

  removePermissionFromRole: asyncHandler(async (req, res) => {
    const { roleId, permissionId } = req.body;
    await rbacRepository.removePermissionFromRole(roleId, permissionId);
    sendSuccess(res, { message: "Permission removed from role" });
  }),

  assignRoleToUser: asyncHandler(async (req, res) => {
    const { userId, roleId } = req.body;
    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");
    const role = await rbacRepository.findRoleById(roleId);
    if (!role) throw new NotFoundError("Role not found");
    const link = await rbacRepository.assignRoleToUser(userId, roleId);
    sendSuccess(res, { message: "Role assigned to user", data: link });
  }),

  removeRoleFromUser: asyncHandler(async (req, res) => {
    const { userId, roleId } = req.body;
    await rbacRepository.removeRoleFromUser(userId, roleId);
    sendSuccess(res, { message: "Role removed from user" });
  }),

  getUserAccess: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await rbacRepository.resolvePermissionNamesForUser(userId);
    sendSuccess(res, { data: result });
  }),
};
