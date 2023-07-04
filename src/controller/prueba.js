import { consulta } from "../db.js";

export const recuperarstock = async (req, res) => {
  const id = req.params.id;
  const [stock] = await consulta.query("SELECT stock FROM producto WHERE idProducto = ?", [id]);
  console.log(stock[0].stock + 20);
}
