import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true, index: true },
  },
  { timestamps: true }
);

// A user shouldn't have the same role assigned twice.
userRoleSchema.index({ user: 1, role: 1 }, { unique: true });

export default mongoose.model("UserRole", userRoleSchema);
