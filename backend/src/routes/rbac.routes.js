import { Router } from "express";
import { rbacController } from "../controllers/rbacController.js";
import { authenticate } from "../middleware/authenticate.js";
import { requirePermission } from "../authorization/requirePermission.js";

const router = Router();

// Every route here requires authentication + the database-resolved
// "roles.manage" permission — never a hardcoded role check.
router.use(authenticate);

router.get("/roles", requirePermission("roles.manage"), rbacController.listRoles);
router.post("/roles", requirePermission("roles.manage"), rbacController.createRole);

router.get("/permissions", requirePermission("roles.manage"), rbacController.listPermissions);
router.post(
  "/role-permissions",
  requirePermission("roles.manage"),
  rbacController.assignPermissionToRole
);
router.delete(
  "/role-permissions",
  requirePermission("roles.manage"),
  rbacController.removePermissionFromRole
);

router.post("/user-roles", requirePermission("users.manage"), rbacController.assignRoleToUser);
router.delete("/user-roles", requirePermission("users.manage"), rbacController.removeRoleFromUser);

router.get("/users/:userId/access", requirePermission("users.manage"), rbacController.getUserAccess);

export default router;
