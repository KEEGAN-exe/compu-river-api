import { consulta } from "../../db.js";

export const findAllFacturaCompra = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM factura_compra");
  res.json(result);
};

export const findFacturaCompraById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM factura_compra WHERE idFacturaCompra = ?",
    [id]
  );
  if (result.length >= 1) {
    res.json(result[0]);
  } else {
    res.json({
      message: "No se encontro la factura de compra con el id: " + id,
    });
  }
};

export const createFacturaCompra = async (req, res) => {
  const { idProveedor, igv, subtotal, total, observaciones } = req.body;

  //La fecha se genera sola y toma la fecha del sistema
  let fecha = new Date();
  fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  const [result] = await consulta.query(
    "INSERT INTO factura_compra (idProveedor, igv, subtotal, total, observaciones, fecha) VALUES (?,?,?,?,?,?)",
    [idProveedor, igv, subtotal, total, observaciones, fecha]
  );

  res.json({
    idFacturaCompra: result.insertId,
    idProveedor,
    igv,
    subtotal,
    total,
    observaciones,
    fecha,

  });
};

export const updateFacturaCompra = async (req, res) => {
  const { idProveedor, igv, subtotal, total, observaciones, fecha } = req.body;
  const { id } = req.params;
  const [result] = await consulta.query(
    "UPDATE factura_compra SET idProveedor = IFNULL(?,idProveedor), igv = IFNULL(?,igv), subtotal = IFNULL(?,subtotal), total = IFNULL(?,total), observaciones = IFNULL(?,observaciones), fecha = IFNULL(?,fecha) WHERE idFacturaCompra = ?",
    [idProveedor, igv, subtotal, total, observaciones, fecha, id]
  );
  if (result.affectedRows >= 1) {
    const [update] = await consulta.query(
      "SELECT * FROM factura_compra WHERE idFacturaCompra = ?",
      [id]
    );
    res.json(update[0]);
  } else {
    res.json({ menssage: "No existe la factura de compra" });
  }
};

export const deleteFacturaCompra = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "DELETE FROM factura_compra WHERE idFacturaCompra = ?",
    [id]
  );
  if (result.affectedRows >= 1) {
    res.json({ message: "Se elimino correctamente" });
  } else {
    res.json({ message: "No existe la factura de compra" });
  }
};
