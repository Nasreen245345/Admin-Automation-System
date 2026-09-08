import { rbacRepository } from "../repositories/rbacRepository.js";
import { ForbiddenError } from "../errors/AppError.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

/**
 * requirePermission("giveaways.create") — the ONLY authorization primitive
 * in the app. It resolves permissions live from the database
 * (User -> UserRoles -> Roles -> RolePermissions -> Permissions) on every
 * request. There is no hardcoded role check anywhere in this codebase;
 * adding/removing access is purely a database change.
 *
 * Must run after `authenticate` so req.user is populated.
 */
export const requirePermission = (permissionName) =>
  asyncHandler(async (req, res, next) => {
    const { permissionNames } = await rbacRepository.resolvePermissionNamesForUser(req.user._id);

    if (!permissionNames.includes(permissionName)) {
      throw new ForbiddenError(`Missing required permission: ${permissionName}`);
    }

    req.permissions = permissionNames;
    next();
  });

/**
 * requireAnyPermission(["leave.approve", "overtime.approve"]) — allow if the
 * user has at least one of the listed permissions. Useful for shared views.
 */
export const requireAnyPermission = (permissionNames = []) =>
  asyncHandler(async (req, res, next) => {
    const { permissionNames: userPermissions } = await rbacRepository.resolvePermissionNamesForUser(
      req.user._id
    );

    const hasAny = permissionNames.some((p) => userPermissions.includes(p));
    if (!hasAny) {
      throw new ForbiddenError(`Missing one of required permissions: ${permissionNames.join(", ")}`);
    }

    req.permissions = userPermissions;
    next();
  });
