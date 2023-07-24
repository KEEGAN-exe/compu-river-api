import { consulta } from "../db.js";

export const findAllCategory = async (req, res) => {
  const [result] = await consulta.query("SELECT * FROM categoria");
  res.json(result);
};

export const findCategoryById = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "SELECT * FROM categoria WHERE idCategoria = ?",
    [id]
  );
  if (result.length === 0) {
    return res.json({ message: "No existe la categoria" });
  }
  return res.json(result[0]);
};

export const createCategory = async (req, res) => {
  const { nombre, image } = req.body;
  const [rusult] = await consulta.query(
    "INSERT INTO categoria (nombre,image) VALUES (?,?)",
    [nombre, image]
  );
  res.json({ id: rusult.insertId, nombre, image });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nombre, image } = req.body;
  const [result] = await consulta.query(
    "UPDATE categoria SET nombre = IFNULL(?,nombre), image = IFNULL(?,image) WHERE idCategoria = ?",
    [nombre, image, id]
  );
  if (result.affectedRows >= 1) {
    const [update] = await consulta.query(
      "SELECT * FROM categoria WHERE idCategoria = ?",
      [id]
    );
    return res.json(update[0]);
  }
  return res.json({ message: "No existe la categoria" });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const [result] = await consulta.query(
    "DELETE FROM categoria WHERE idCategoria = ?",
    [id]
  );
  if (result.affectedRows >= 1) {
    return res.json({ message: "Categoria eliminada" });
  }
  return res.json({ message: "No existe la categoria" });
};
