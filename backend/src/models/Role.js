import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // e.g. "admin", "manager", "staff"
    description: { type: String, trim: true },
    isSystem: { type: Boolean, default: false }, // seeded/protected roles
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
