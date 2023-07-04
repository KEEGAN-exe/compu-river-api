import { consulta } from "../db.js";

export const finAllInventory = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM inventario");
  res.json(result);
};

export const createInventory = async (req, res) => {
  const {descripcion, stock} = req.body;
  const [result] = await consulta.query("INSERT INTO inventario (descripcion, stock) VALUES (?,?)", [descripcion, stock]);
  res.json({
    idInventario: result.insertId,
    descripcion,
  })
};

export const updateInventory = async (req, res) => {
  const {id} = req.params;
  const {descripcion, stock} = req.body;
  const [result] = await consulta.query("UPDATE inventario SET descripcion = IFNULL(?,descripcion), stock = IFNULL(?,stock) WHERE idInventario = ?", [descripcion, stock, id]);
  if (result.affectedRows >= 1) {
    const [update] = await consulta.query("SELECT * FROM inventario WHERE idInventario = ?", [id]);
    res.json(update[0]);
  }
  else {
    res.json({message: "No se encontro el inventario"});
  }
}


