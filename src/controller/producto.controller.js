import { consulta } from "../db.js";

export const findAllProduct = async (req, res) => {
  const [result] = await consulta.query("SELECT producto.idProducto, producto.nombre, producto.estado, producto.precio, producto.marca, producto.image, producto.idCategoria, categoria.nombre AS nombreCategoria FROM producto INNER JOIN categoria ON producto.idCategoria = categoria.idCategoria");
  res.json(result);
};

export const createProduct = async (req, res) => {
  const { nombre, estado, precio, idCategoria,marca,image } = req.body;
  const [result] = await consulta.query(
    "INSERT INTO producto (nombre, estado, precio, idCategoria, marca,image) VALUES (?,?,?,?,?,?)",
    [nombre, estado, precio, idCategoria , marca,image]
  );
  res.json({
    id: result.insertId,
    idCategoria,
    nombre,
    estado,
    precio,
    marca,
    image
  })
};

// falta  borrar y buscar por id

export const updateProduct = async (req, res) => {
  const { nombre, estado, precio, idCategoria } = req.body;
  const {id} = req.params;
  const [result] = await consulta.query("UPDATE producto SET nombre = IFNULL(?,nombre), estado = IFNULL(?,estado), precio = IFNULL(?,precio), idCategoria = IFNULL(?,idCategoria) WHERE idProducto = ?", [nombre, estado, precio, idCategoria, id]);
  if(result.affectedRows >= 1 ){
    const [update] = await consulta.query("SELECT * FROM producto WHERE idProducto = ?", [id]);
    res.json(update[0]);
  }else{
    res.json({menssage: "No existe el producto"})
  }

}


