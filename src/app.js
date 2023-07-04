import cors from "cors";
import express from "express";
import compuriverCompra from "./routes/compuriver.compra.routes.js";
import compuriverVenta from "./routes/compuriver.venta.routes.js";
import compuriver from "./routes/compuriver.routes.js";

const app = express();

app.use(express.json())

app.use("/api", compuriver);
app.use("/api", compuriverCompra);
app.use("/api", compuriverVenta);

export default app