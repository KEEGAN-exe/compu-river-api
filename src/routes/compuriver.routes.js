import { Router } from "express";
import {
  findAllCategory,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoria.controller.js";
import {
  findAllProduct,
  createProduct,
  updateProduct,
} from "../controller/producto.controller.js";
import {
  createInventory,
  finAllInventory,
  updateInventory,
} from "../controller/inventario.controller.js";
import { createInventoryDetail, findAllInventoryDetail, findInventoryDetailById } from "../controller/detalle_inventario.controller.js";
import { recuperarstock } from "../controller/prueba.js";
import { createInputInventory, findAllInpuInventory } from "../controller/inventario_entrada.controller.js";
import { createOutputInventory, findAllOutputInventory } from "../controller/inventario_salida.controller.js";

const router = Router();

// --------------------> PRODUCTO ROUTES <-------------------- //

router.get("/producto", findAllProduct);
router.post("/producto", createProduct);
router.patch("/producto/:id", updateProduct);

// --------------------> CATEGORIA ROUTES <-------------------- //

router.get("/categoria", findAllCategory);
router.get("/categoria/:id", findCategoryById);
router.post("/categoria", createCategory);
router.patch("/categoria/:id", updateCategory);
router.delete("/categoria/:id", deleteCategory);

// --------------------> INVENTARIO ROUTES <-------------------- //

router.get("/inventario", finAllInventory);
router.post("/inventario", createInventory);
router.patch("/inventario/:id", updateInventory)

// --------------------> ENTRADA INVENTARIO ROUTES <-------------------- //

router.get("/entrada", findAllInpuInventory);
router.post("/entrada", createInputInventory);

// --------------------> SALIDA INVENTARIO ROUTES <-------------------- //

router.get("/salida", findAllOutputInventory);
router.post("/salida", createOutputInventory);

// --------------------> DETALLE INVENTARIO ROUTES <-------------------- //
router.get("/detalleinventario", findAllInventoryDetail);
router.post("/detalleinventario", createInventoryDetail)
router.get("/detalleinventario/:id", findInventoryDetailById)

export default router;
