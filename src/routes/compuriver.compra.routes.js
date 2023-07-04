import { Router } from "express";
import {
  findAllSuplier,
  findSuplierById,
  createSuplier,
  updateSuplier,
  deleteSuplier,
} from "../controller/proveedor.controller.js";
import {
  createFacturaCompra,
  deleteFacturaCompra,
  findAllFacturaCompra,
  findFacturaCompraById,
  updateFacturaCompra,
} from "../controller/compra/factura_compra.controller.js";
import {
  createDetalleFacturaCompra,
  deleteDetalleFacturaCompra,
  findAllDetalleFacturaCompra,
  findDetalleFacturaCompraById,
  updateDetalleFacturaCompra,
} from "../controller/compra/detalle_factura_compra.controller.js";
import {
  createGuiaEntrada,
  deleteGuiaEntrada,
  findAllGuiaEntrada,
  findGuiaEntradaById,
  updateGuiaEntrada,
} from "../controller/compra/guia_entrada.controller.js";
import {
  createDetalleGuiaEntrada,
  findAllDetalleGuiaEntrada,
  findDetalleGuiaEntradaById,
  updateDetalleGuiaEntrada,
} from "../controller/compra/detalle_guia_entrada.controller.js";

const router = Router();


// --------------------> PROVEEDOR ROUTES <-------------------- //

router.get("/proveedor", findAllSuplier);
router.get("/proveedor/:id", findSuplierById);
router.post("/proveedor", createSuplier);
router.patch("/proveedor/:id", updateSuplier);
router.delete("/proveedor/:id", deleteSuplier);

// --------------------> FACTURA_COMPRA ROUTES <-------------------- //

router.get("/facturacompra", findAllFacturaCompra);
router.get("/facturacompra/:id", findFacturaCompraById);
router.post("/facturacompra", createFacturaCompra);
router.patch("/facturacompra/:id", updateFacturaCompra);
router.delete("/facturacompra/:id", deleteFacturaCompra);

// --------------------> DETALLE_FACTURA_COMPRA ROUTES <-------------------- //

router.get("/detallefacturacompra", findAllDetalleFacturaCompra);
router.get("/detallefacturacompra/:id", findDetalleFacturaCompraById);
router.post("/detallefacturacompra", createDetalleFacturaCompra);
router.patch("/detallefacturacompra/:id", updateDetalleFacturaCompra);
router.delete("/detallefacturacompra/:id", deleteDetalleFacturaCompra);

// --------------------> GUIA_ENTRADA ROUTES <-------------------- //

router.get("/guiaentrada", findAllGuiaEntrada);
router.get("/guiaentrada/:id", findGuiaEntradaById);
router.post("/guiaentrada", createGuiaEntrada);
router.patch("/guiaentrada/:id", updateGuiaEntrada);
router.delete("/guiaentrada/:id", deleteGuiaEntrada);

// --------------------> DETALLE_GUIA_ENTRADA ROUTES <-------------------- //

router.get("/detalleguiaentrada", findAllDetalleGuiaEntrada);
router.get("/detalleguiaentrada/:id", findDetalleGuiaEntradaById);
router.post("/detalleguiaentrada", createDetalleGuiaEntrada);
router.patch("/detalleguiaentrada/:id", updateDetalleGuiaEntrada);

export default router;

