import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Es necesario ingresar un nombre"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Es necesario ingresar un correo electrónico"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Es necesario ingresar una contraseña"],
    },
    address: {
      street: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      zipCode: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
export default User;
