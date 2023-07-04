import { consulta } from "../../db.js";

export const findAllDetallePedidoBoleta = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM detalle_pedido_boleta");
  res.json(result);
}

export const findDetallePedidoBoletaById = async (req, res) => {
  const { idDetallePedidoBoleta } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM detalle_pedido_boleta WHERE idPedidoBoleta = ?",
    [idDetallePedidoBoleta]
  );
  if (result.length === 0) {
    res.json({ message: "No se encontro el detalle_pedido_boleta" });
  } else {
    res.json(result[0]);
  }
}

export const createDetallePedidoBoleta = async (req, res) => {
  const {idPedidoBoleta, idProducto, precio, cantidad} = req.body;
  const [result] = await consulta.query("INSERT INTO detalle_pedido_boleta (idPedidoBoleta, idProducto, precio, cantidad) VALUES (?,?,?,?)", [idPedidoBoleta, idProducto, precio, cantidad]);
  res.json({
    idPedidoBoleta,
    idProducto,
    precio,
    cantidad,
  })
}

// falta actualizar y eliminar