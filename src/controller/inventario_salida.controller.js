import { consulta } from "../db.js";

export const findAllOutputInventory = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM inventario_salida");
  res.json(result);
}

export const createOutputInventory = async (req, res) => {
  const {idInventario, idGuiaSalida} = req.body;
  const [result] = await consulta.query("INSERT INTO inventario_salida (idInventario, idGuiaSalida) VALUES (?,?)", [idInventario, idGuiaSalida]);
  res.json({
    idInventario,
    idGuiaSalida,
  })
}
