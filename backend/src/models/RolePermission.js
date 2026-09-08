import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema(
  {
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true, index: true },
    permission: { type: mongoose.Schema.Types.ObjectId, ref: "Permission", required: true, index: true },
  },
  { timestamps: true }
);

rolePermissionSchema.index({ role: 1, permission: 1 }, { unique: true });

export default mongoose.model("RolePermission", rolePermissionSchema);
