import { Schema, model } from "mongoose";
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Es necesario ingresar un nombre para el producto"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Es necesario ingresar una descripción para el producto"],
    },
    image: {
      type: String,
      trim: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: [true, "Es necesario ingresar una categoría para el producto"] },
    price: {
      type: Number,
      min: [0, "El precio no puede ser un valor negativo"],
      required: [true, "Es necesario ingresar un precio para el producto"],
    },
    stock: {
      type: Number,
      min: [0, "Las existencias no pueden ser un valor negativo"],
      required: [true, "Es necesario ingresar una existencia para el producto"],
    },
  },
  { timestamps: true }
);
const Product = model("Product", ProductSchema);
export default Product;