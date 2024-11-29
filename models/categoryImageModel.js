import mongoose from "mongoose";

const categoryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      allowNull: false,
    },
    image: {
      type: String,
    },
    category_id: {
      type: String,
    },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CategoryImages = mongoose.model("categoryImages", categoryImageSchema);

export default CategoryImages;
