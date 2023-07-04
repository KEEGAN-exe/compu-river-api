import { consulta } from "../../db.js";

export const findAllGuiaEntrada = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM guia_entrada");
  res.json(result);
};

export const findGuiaEntradaById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM guia_entrada WHERE idGuiaEntrada = ?",
    [id]
  );
  if (result.length >= 1) {
    res.json(result[0]);
  } else {
    res.json({ message: "No se encontro la guia de entrada con el id: " + id });
  }
};

export const createGuiaEntrada = async (req, res) => {
  const { idProveedor, idFacturaCompra, fecha, observaciones } = req.body;
  let setFecha 
  if(fecha == null){
    setFecha = new Date();
    setFecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate(); 
  }else{
    setFecha = fecha
  }
  
  //La fecha se genera sola y toma la fecha del sistema, esto deberia ser cuando el producto llega a la tienda
  const [result] = await consulta.query(
    "INSERT INTO guia_entrada (idProveedor, idFacturaCompra, fecha, observaciones) VALUES (?,?,?,?)",
    [idProveedor, idFacturaCompra, setFecha, observaciones]
  );
  res.json({
    idGuiaEntrada: result.insertId,
    idProveedor,
    idFacturaCompra,
    setFecha,
    observaciones,
  });
};

export const updateGuiaEntrada = async (req, res) => {
  const { idProveedor, idFacturaCompra, fecha, observaciones } = req.body;
  const { id } = req.params;
  const [result] = await consulta.query(
    "UPDATE guia_entrada SET idProveedor = IFNULL(?,idProveedor), idFacturaCompra = IFNULL(?,idFacturaCompra), fecha = IFNULL(?,fecha), observaciones = IFNULL(?,observaciones) WHERE idGuiaEntrada = ?",
    [idProveedor, idFacturaCompra, fecha, observaciones, id]
  );
  if (result.affectedRows >= 1) {
    const [update] = await consulta.query(
      "SELECT * FROM guia_entrada WHERE idGuiaEntrada = ?",
      [id]
    );
    res.json(update[0]);
  } else {
    res.json({ menssage: "No existe la guia de entrada" });
  }
};

export const deleteGuiaEntrada = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "DELETE FROM guia_entrada WHERE idGuiaEntrada = ?",
    [id]
  );
  if (result.affectedRows >= 1) {
    res.json({ message: "La guia de entrada fue eliminada" });
  } else {
    res.json({ menssage: "No existe la guia de entrada" });
  }
};
