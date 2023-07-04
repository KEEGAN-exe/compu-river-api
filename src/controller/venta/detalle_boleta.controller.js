import { consulta } from "../../db.js";


export const finAllBoletaDetail = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM detalle_boleta");
  res.json(result);
}

export const createBoletaDetail = async (req, res) => {
  const {idBoleta, idProducto, cantidad, precio} = req.body;
  const [result] = await consulta.query("INSERT INTO detalle_boleta (idBoleta, idProducto, cantidad, precio) VALUES (?,?,?,?)", [idBoleta, idProducto, cantidad, precio]);
  res.json({
    idBoleta,
    idProducto,
    cantidad,
    precio,
  })
}
//los detalles de una boleta no se pueden actualizar ni eliminar a menos que la boleta se elimine o se actualice
export const updateBoletaDetail = async (req, res) => {
  const {id} = req.params;
  const {idBoleta, idProducto, cantidad, precio} = req.body;
  const [result] = await consulta.query("UPDATE detalle_boleta SET idBoleta = IFNULL(?,idBoleta), idProducto = IFNULL(?,idProducto), cantidad = IFNULL(?,cantidad), precio = IFNULL(?,precio) WHERE idBoleta = ?", [idBoleta, idProducto, cantidad, precio, id]);
  if(result.affectedRows >= 1){
    const [update] = await consulta.query("SELECT * FROM detalle_boleta WHERE idBoleta = ?", [id]);
    res.json(update[0]);
  }else{
    res.json({ menssage: "No existe el detalle de la boleta" });
  }
}

export const deleteBoletaDetail = async (req, res) => {
  const {id} = req.params;
  const [result] = await consulta.query("DELETE FROM detalle_boleta WHERE idBoleta = ?", [id]);
  if(result.affectedRows >= 1){
    res.json({ message: "Se elimino correctamente" });
  }else{
    res.json({ message: "No existe el detalle de la boleta" })
  }
}