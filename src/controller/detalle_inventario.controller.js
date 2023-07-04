import { consulta } from "../db.js";


export const findAllInventoryDetail = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM detalle_inventario");
  res.json(result);
}

export const createInventoryDetail = async (req, res) => {
  const {idInventario, idProducto, cantidad, movimiento} = req.body;
  const [result] = await consulta.query("INSERT INTO detalle_inventario (idInventario, idProducto, cantidad, movimiento) VALUES (?,?,?,?)", [idInventario, idProducto, cantidad, movimiento]);
  res.json({
    idInventario,
    idProducto,
    cantidad,
    movimiento
  })
}

export const findInventoryDetailById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM detalle_inventario WHERE idInventario = ?",
    [id]
  );
  if (result.length === 0) {
    res.json({ message: "No se encontro el detalle" });
  } else {
    res.json(result);
  }
}