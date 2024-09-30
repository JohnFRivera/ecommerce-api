import { Schema, model } from "mongoose";
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Es necesario ingresar un nombre a la categoría"],
    },
  },
  { timestamps: true }
);
const Category =  model("Category", CategorySchema);
export default Category;