import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      allowNull: false,
    },
    address: {
      type: String,
      allowNull: false,
    },
    email: {
      type: String,
    },
    primary_contact: {
      type: String,
    },
    resume: {
      type: String,
    },
    module: {
      type: String,
    },
    subModule: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Resume = mongoose.model("resumes", resumeSchema);

export default Resume;
