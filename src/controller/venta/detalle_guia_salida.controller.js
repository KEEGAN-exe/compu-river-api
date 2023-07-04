import { consulta } from "../../db.js";


export const findAllDetalleGuiaSalida = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM detalle_guia_salida");
  res.json(result);
}

export const findDetalleGuiaSalidaById = async (req, res) => {
  const { idDetalleGuiaSalida } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM detalle_guia_salida WHERE idGuiaSalida = ?",
    [idDetalleGuiaSalida]
  );
  if (result.length === 0) {
    res.json({ message: "No se encontro el detalle" });
  } else {
    res.json(result[0]);
  }
}

export const createDetalleGuiaSalida = async (req, res) => {
  const {idGuiaSalida, idProducto, cantidad} = req.body;
  const [result] = await consulta.query("INSERT INTO detalle_guia_salida (idGuiaSalida, idProducto, cantidad) VALUES (?,?,?)", [idGuiaSalida, idProducto, cantidad]);
  res.json({
    idGuiaSalida,
    idProducto,
    cantidad,
  })
}

export const updateDetalleGuiaSalida = async (req, res) => {
  const {id} = req.body;
  const {idGuiaSalida, idProducto, cantidad} = req.body;
  const [result] = await consulta.query("UPDATE detalle_guia_salida SET idGuiaSalida IFNULL(?,idGuiaSalida), idProducto = IFNULL(?,idProducto), cantidad = IFNULL(?,cantidad) WHERE idGuiaSalida = ?", [idGuiaSalida, idProducto, cantidad, id]);

  if (result.affectedRows >= 1) {
    const [update] = await consulta.query("SELECT * FROM detalle_guia_salida WHERE idGuiaSalida = ?", [id]);
    res.json(update[0]);
  }
  else {
    res.json({ message: "No se encontro el detalle" });
  }
}

export const deleteDetalleGuiaSalida = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query("DELETE FROM detalle_guia_salida WHERE idGuiaSalida = ?", [id]);
  if (result.affectedRows >= 1) {
    res.json({ message: "Se elimino el detalle" });
  }
  else {
    res.json({ message: "No se encontro el detalle" });
  }
}