import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
    },
    email: {
      type: String,
      allowNull: false,
    },
    primary_contact: {
      type: Number,
      allowNull: false,
    },
    parmanent_address: {
      type: String,
    },
    current_address: { 

      type: String,
    },
    profile_image: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    status: {
      type: Boolean,
    }
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("users", userSchema);

export default User;
