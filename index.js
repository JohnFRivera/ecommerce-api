import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import "dotenv/config";
import user from "./src/routes/user.routes.js";
import category from "./src/routes/category.routes.js";
import product from "./src/routes/product.routes.js";
import order from "./src/routes/order.routes.js"

const { DB_MONGO_HOST, DB_MONGO_PORT, DB_MONGO_DATABASE,DB_MONGO_PASSWORD,DB_MONGO_USER, SERVER_HOST, SERVER_PORT } = process.env;
const app = express();
app.use(express.json());
app.use(cors());
app.use(user);
app.use(category);
app.use(product);
app.use(order);

connect(`mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}/${DB_MONGO_DATABASE}`)
.then(() => {
    console.log("_Conexión establecida_");
    app.server = app.listen(SERVER_PORT ,() => {
        console.log(`Servidor establecido en: http://${SERVER_HOST}:${SERVER_PORT}`);
    });
})
.catch((error) => {
    console.error(`_Error en Conexión_: ${error}`);
});