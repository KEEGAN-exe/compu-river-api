import { consulta } from "../../db.js";

export const findAllGuiaSalida = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM guia_salida");
  res.json(result);
}

export const findGuiaSalidaById = async (req, res) => {
  const { idGuiaSalida } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM guia_salida WHERE idGuiaSalida = ?",
    [idGuiaSalida]
  );
  if (result.length === 0) {
    res.json({ message: "No se encontro la guia_salida" });
  } else {
    res.json(result[0]);
  }
}

export const createGuiaSalida = async (req, res) => {
  const {idCliente, idPedidoBoleta, fecha, observaciones} = req.body;
  const [result] = await consulta.query("INSERT INTO guia_salida (idCliente, idPedidoBoleta, fecha, observaciones) VALUES (?,?,?,?)", [idCliente, idPedidoBoleta, fecha, observaciones]);
  res.json({
    idGuiaSalida: result.insertId,
    idCliente,
    idPedidoBoleta,
    fecha,
    observaciones,
  })
}

export const updateGuiaSalida = async (req, res) => {
  const {id} = req.body;
  const {idCliente, idPedidoBoleta, fecha, observaciones} = req.body;
  const [result] = await consulta.query("UPDATE guia_salida SET idCliente IFNULL(?,idCliente), idPedidoBoleta = IFNULL(?,idPedidoBoleta), fecha = IFNULL(?,fecha), observaciones = IFNULL(?,observaciones) WHERE idGuiaSalida = ?", [idCliente, idPedidoBoleta, fecha, observaciones, id]);

  if (result.affectedRows >= 1) {
    const [update] = await consulta.query("SELECT * FROM guia_salida WHERE idGuiaSalida = ?", [id]);
    res.json(update[0]);
  }
  else {
    res.json({ message: "No se encontro la guia_salida" });
  }
}

export const deleteGuiaSalida = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query("DELETE FROM guia_salida WHERE idGuiaSalida = ?", [id]);
  if (result.affectedRows >= 1) {
    res.json({ message: "Se elimino la guia_salida" });
  }
  else {
    res.json({ message: "No se encontro la guia_salida" });
  }
}