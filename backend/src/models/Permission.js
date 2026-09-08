import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    // Canonical form: "<resource>.<action>", e.g. "giveaways.create".
    name: { type: String, required: true, unique: true, trim: true },
    resource: { type: String, required: true, trim: true }, // e.g. "giveaways"
    action: { type: String, required: true, trim: true }, // e.g. "create"
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

permissionSchema.index({ resource: 1, action: 1 }, { unique: true });

export default mongoose.model("Permission", permissionSchema);
