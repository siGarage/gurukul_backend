import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      allowNull: false,
    },
    note: {
      type: String
    },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;
