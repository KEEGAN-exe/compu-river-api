import { consulta } from "../../db.js";

//los detalles de la guia de entrada no se pueden eliminar, solo se pueden actualizar, ademas si quiero actualizar algun precio de algun detalle ...

export const findAllDetalleGuiaEntrada = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM detalle_guia_entrada");
  res.json(result);
}

export const findDetalleGuiaEntradaById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query("SELECT * FROM detalle_guia_entrada WHERE idGuiaEntrada = ?", [id]);
  if(result.length === 0){
    return res.json({message: "No existe el detalle de guia de entrada"});
  }else{
    res.json(result);
  }
}

export const createDetalleGuiaEntrada = async (req, res) => {
  const { idGuiaEntrada, idProducto, cantidad } = req.body;
  const [result] = await consulta.query("INSERT INTO detalle_guia_entrada (idGuiaEntrada, idProducto, cantidad) VALUES (?,?,?)", [idGuiaEntrada, idProducto, cantidad]);
  res.json({
    idGuiaEntrada,
    idProducto,
    cantidad
  })
}

export const updateDetalleGuiaEntrada = async (req, res) => {
  const {id} = req.params;
  const { idGuiaEntrada, idProducto, cantidad } = req.body;
  const [result ] = await consulta.query("UPDATE detalle_guia_entrada SET idGuiaEntrada = IFNULL(?,idGuiaEntrada), idProducto = IFNULL(?,idProducto), cantidad = IFNULL(?,cantidad) WHERE idGuiaEntrada = ?", [idGuiaEntrada, idProducto, cantidad, id]);
  if(result.affectedRows >= 1){
    const [update] = await consulta.query("SELECT * FROM detalle_guia_entrada WHERE idGuiaEntrada = ?", [id]);
    res.json(update[0]);
  }else{
    res.json({ message: "No existe el detalle de la guia de entrada" });
  }
}