import { consulta } from "../../db.js";

export const findDetalleFacturaCompraById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM detalle_factura_compra WHERE idFacturaCompra = ?",
    [id]
  );
  if (result.length >= 1) {
    res.json(result);
  } else {
    res.json({ message: "No existe los detalles para la factura compra" });
  }
};

export const findAllDetalleFacturaCompra = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM detalle_factura_compra");
  res.json(result);
}

export const createDetalleFacturaCompra = async (req, res) => {
  const { idProducto, idFacturaCompra, cantidad, precio } = req.body;
  const [result] = await consulta.query(
    "INSERT INTO detalle_factura_compra (idProducto,idFacturaCompra,cantidad,precio) VALUES (?,?,?,?)",
    [idProducto, idFacturaCompra, cantidad, precio]
  );
  res.json({
    idFacturaCompra,
    idProducto,
    cantidad,
    precio,
  })
};

export const updateDetalleFacturaCompra = async (req, res) => {
  const { idProducto, idFacturaCompra, cantidad, precio } = req.body;
  const { id } = req.params;
  const [result] = await consulta.query("UPDATE detalle_factura_compra SET idProducto = IFNULL(?,idProducto), idFacturaCompra = IFNULL(?,idFacturaCompra), cantidad = IFNULL(?,cantidad), precio = IFNULL(?,precio) WHERE idFacturaCompra = ?", [idProducto, idFacturaCompra, cantidad, precio, id]);
  if(result.affectedRows >= 1){
    const [update] = await consulta.query("SELECT * FROM detalle_factura_compra WHERE idFacturaCompra = ?", [id]);
    res.json(update[0]);
  }else{
    res.json({ menssage: "No existe el detalle de la factura compra" });
  }
}

export const deleteDetalleFacturaCompra = async (req, res) => {
  const { id } = req.params;
  const [result ] = await consulta.query("DELETE FROM detalle_factura_compra WHERE idFacturaCompra = ?", [id]);
  if(result.affectedRows >= 1){
    res.json({ message: "Se elimino correctamente" });
  }else{
    res.json({ message: "No existe el detalle de la factura compra" })
  }
}
