import { consulta } from "../../db.js";

export const findAllBoleta = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM boleta");
  
  res.json(result);
};

export const findBoletaById = async (req, res) => {
  const { idBoleta } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM boleta WHERE idBoleta = ?",
    [idBoleta]
  );
  if (result.length === 0) {
    res.json({ message: "No se encontro la boleta" });
  } else {
    res.json(result[0]);
  }
}

export const createBoleta = async (req, res) => {
  const { idCliente } = req.body;
  let fecha = new Date();
  fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  const [result] = await consulta.query(
    "INSERT INTO boleta (idCliente, fecha) VALUES (?,?)",
    [idCliente, fecha]
  );
  res.json({
    idBoleta: result.insertId,
    idCliente,
    fecha,
  });
};

export const updateBoleta = async (req, res) => {
  const { idBoleta } = req.params;
  const { idCliente, fecha } = req.body;
  const [result] = await consulta.query(
    "UPDATE boleta SET idCliente = IFNULL(?,idCliente), fecha = IFNULL(?,fecha) WHERE idBoleta = ?",
    [idCliente, fecha, idBoleta]
  );
  if (result.affectedRows >= 1) {
    const [update] = await consulta.query(
      "SELECT * FROM boleta WHERE idBoleta = ?",
      [idBoleta]
    );
    res.json(update[0]);
  } else {
    res.json({ message: "No se encontro la boleta" });
  }
};

export const deleteBoleta = async (req, res) => {
  const { idBoleta } = req.params;
  const [result] = await consulta.query(
    "DELETE FROM boleta WHERE idBoleta = ?",
    [idBoleta]
  );
  if (result.affectedRows >= 1) {
    res.json({ message: "Boleta eliminada" });
  } else {
    res.json({ message: "No se encontro la boleta" });
  }
}
