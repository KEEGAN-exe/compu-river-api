import { consulta } from "../db.js";

export const finAdllClient = async (req, res) => {
  const [result] = await consulta.query(
    "SELECT cliente.idCliente AS id_cliente, cliente.telefono AS telefono ,cliente.nombre AS nombre , cliente.dni AS dni , cliente.apellido AS apellido, cliente.email AS email ,cliente.direccion ,usuario.username AS username, usuario.password AS contraseña FROM cliente INNER JOIN usuario ON cliente.idCliente = usuario.idCliente"
  );
  const clientes = result.map((cliente) => {
    return {
      id_cliente: cliente.id_cliente,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      dni: cliente.dni,
      direccion: cliente.direccion,
      email: cliente.email,
      username: cliente.username,
      contraseña: cliente.contraseña,
      telefono: cliente.telefono,
    };
  });
  res.json(clientes);
};

export const findClientById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT cliente.idCliente AS id_cliente, cliente.telefono AS telefono ,cliente.nombre AS nombre , cliente.dni AS dni , cliente.apellido AS apellido, cliente.email AS email ,cliente.direccion ,usuario.username AS username, usuario.password AS contraseña FROM cliente INNER JOIN usuario ON cliente.idCliente = usuario.idCliente WHERE cliente.idCliente = ?",
    [id]
  );
  if (result.length === 0) {
    return res.json({ message: "No existe el cliente" });
  } else {
    const clientes = result.map((cliente) => {
      return {
        id_cliente: cliente.id_cliente,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        dni: cliente.dni,
        direccion: cliente.direccion,
        email: cliente.email,
        username: cliente.username,
        contraseña: cliente.contraseña,
        telefono: cliente.telefono,
      };
    });
    res.json(clientes[0]);
  }
};

export const createClient = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      direccion,
      dni,
      telefono,
      email,
      password,
      username,
      idRol,
    } = req.body;

    console.log(idRol);

    let setRol;
    if (idRol === undefined || idRol === null || idRol.trim() === "") {
      setRol = 2;
    } else {
      setRol = 1;
    }
    const [result] = await consulta.query(
      "INSERT INTO cliente (nombre,apellido,direccion,dni,telefono,email) VALUES (?,?,?,?,?,?)",
      [nombre, apellido, direccion, dni, telefono, email]
    );
    await consulta.query(
      "INSERT INTO usuario (username,password,idCliente,idRol) VALUES (?,?,?,?)",
      [username, password, result.insertId, setRol]
    );
    res.json({
      id: result.insertId,
      nombre,
      apellido,
      direccion,
      dni,
      telefono,
      email,
      password,
      username,
      setRol,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, dni, telefono, email } = req.body;
  const [result] = await consulta.query(
    "UPDATE cliente SET nombre = IFNULL(?,nombre), apellido = IFNULL (?,apellido), direccion = IFNULL (?,direccion), dni = IFNULL (?,dni), telefono = IFNULL (?,telefono), email = IFNULL(?,email) WHERE idCliente = ?",
    [nombre, apellido, direccion, dni, telefono, email, id]
  );

  if (result.affectedRows >= 1) {
    const [update] = await consulta.query(
      "SELECT * FROM cliente WHERE idCliente = ?",
      [id]
    );
    res.json(update[0]);
  } else {
    res.json({ message: "No existe el cliente" });
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "DELETE FROM usuario WHERE idCliente = ?",
    [id]
  );

  if (result.affectedRows >= 1) {
    await consulta.query("DELETE FROM cliente WHERE idCliente = ?", [id]);
    return res.json({ message: "Cliente eliminado" });
  }
  return res.json({ message: "No existe el cliente" });
};
