import { consulta } from "../db.js";

export const findAllSuplier = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM proveedor");
  res.json(result);
};

export const findSuplierById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM proveedor WHERE idProveedor = ?",
    [id]
  );
  if(result.length === 0){
    return res.json({message: "No existe el proveedor"});
  }
  res.json(result[0]);
};

export const createSuplier = async (req, res) => {
  const { nombre, ruc, direccion, telefono, email } = req.body;
  const [result] = await consulta.query(
    "INSERT INTO proveedor (nombre,ruc,direccion,telefono,email) VALUES (?,?,?,?,?)",
    [nombre, ruc, direccion, telefono, email]
  );
  res.json({
    idProveedor: result.insertId,
    nombre,
    ruc,
    direccion,
    telefono,
    email,
  });
};

export const updateSuplier = async (req, res) => {
  const { id } = req.params;
  const { nombre, ruc, direccion, telefono, email } = req.body;
  const [result] = await consulta.query(
    "UPDATE proveedor SET nombre = IFNULL(?,nombre), ruc = IFNULL (?,ruc), direccion = IFNULL (?,direccion), telefono = IFNULL (?,telefono), email = IFNULL (?,email) WHERE idProveedor = ?",
    [nombre, ruc, direccion, telefono, email, id]
  );

  if (result.affectedRows >= 1) {
    const [update] = await consulta.query(
      "SELECT * FROM proveedor WHERE idProveedor = ?",
      [id]
    );
    res.json(update[0]);
  }else{
    res.json({message: "No existe el proveedor"});
  }
};

export const deleteSuplier = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query("DELETE FROM proveedor WHERE idProveedor = ?", [id]);
  if(result.affectedRows >= 1){
    res.json({message: "Proveedor eliminado"});
  }else{
    res.json({message: "No existe el proveedor"});
  }
}