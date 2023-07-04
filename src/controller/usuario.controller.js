import { consulta } from "../db.js";

export const findAllUser = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM usuario");
  res.json(result);
}

export const findUserById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM usuario WHERE idCliente = ?",
    [id]
  );
  if(result.length === 0){
    return res.json({message: "No existe el usuario"});
  }
  res.json(result[0]);
}

export const updateUsuario = async (req,res) => {
  const { id } = req.params;
  const { username, password, idRol } = req.body;
  const [result] = await consulta.query("UPDATE usuario SET username = IFNULL(?,username), password = IFNULL(?,password), idRol = IFNULL(?,idRol)  WHERE idCliente = ?", [username, password, idRol, id]);
  if(result.affectedRows >= 1){
    const [update] = await consulta.query("SELECT * FROM usuario WHERE idCliente = ?", [id]);
    return res.json(update[0]);
  }
  return res.json({message: "No existe el usuario"});
}
