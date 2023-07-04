import { consulta } from "../db.js";

export const findAllInpuInventory = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM inventario_entrada");
  res.json(result);
}

export const createInputInventory = async (req, res) => {
  const {idInventario, idGuiaEntrada} = req.body;
  const [result] = await consulta.query("INSERT INTO inventario_entrada (idInventario, idGuiaEntrada) VALUES (?,?)", [idInventario, idGuiaEntrada]);
  res.json({
    idInventario,
    idGuiaEntrada,
  })
}