import { consulta } from "../../db.js";

export const findAllPedidoBoleta = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM pedido_boleta");
  res.json(result);
}

export const findPedidoBoletaById = async (req, res) => {
  const { idPedidoBoleta } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM pedido_boleta WHERE idPedidoBoleta = ?",
    [idPedidoBoleta]
  );
  if (result.length === 0) {
    res.json({ message: "No se encontro el pedido_boleta" });
  } else {
    res.json(result[0]);
  }
}

export const createPedidoBoleta = async (req, res) => {
  const {idBoleta,igv,subtotal,totalBoleta} = req.body;
  let fecha = new Date();
  fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  const [result] = await consulta.query("INSERT INTO pedido_boleta (idBoleta,fecha,igv,subtotal,totalBoleta) VALUES (?,?,?,?,?)", [idBoleta,fecha,igv,subtotal,totalBoleta]);
  res.json({
    idPedidoBoleta: result.insertId,
    idBoleta,
    fecha,
    igv,
    subtotal,
    totalBoleta,
  })
}

export const updatePedidoBoleta = async (req, res) => {
  const {idBoleta,fecha,igv,subtotal,totalBoleta} = req.body;
  const { idPedidoBoleta } = req.params;
  const [result] = await consulta.query("UPDATE pedido_boleta SET idBoleta = IFNULL(?,idBoleta), fecha = IFNULL(?,fecha), igv = IFNULL(?,igv), subtotal = IFNULL(?,subtotal), totalBoleta = IFNULL(?,totalBoleta) WHERE idPedidoBoleta = ?", [idBoleta,fecha,igv,subtotal,totalBoleta,idPedidoBoleta]);
  if (result.affectedRows >= 1) {
    const [update] = await consulta.query("SELECT * FROM pedido_boleta WHERE idPedidoBoleta = ?", [idPedidoBoleta]);
    res.json(update[0]);
  }
  else {
    res.json({ message: "No se encontro el pedido_boleta" });
  }
}

export const deletePedidoBoleta = async (req, res) => {
  const { idPedidoBoleta } = req.params;
  const [result] = await consulta.query("DELETE FROM pedido_boleta WHERE idPedidoBoleta = ?", [idPedidoBoleta]);
  if (result.affectedRows >= 1) {
    res.json({ message: "Se elimino el pedido_boleta" });
  }
  else {
    res.json({ message: "No se encontro el pedido_boleta" });
  }
}