import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Es necesario que el pedido pertenezca a un usuario"]
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          min: [1, "Se requiere un mínimo de (1) producto"],
          required: [true, "Es necesario ingresar una cantidad al producto"]
        }
      }
    ],
    total: {
      type: Number,
      min: [0, "El total no puede ser un valor negativo"],
      required: [true, "Es necesario ingresar un total al pedido"]
    }
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);
export default Order;
