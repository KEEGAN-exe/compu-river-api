import { Router } from "express";
import {
  createClient,
  deleteClient,
  finAdllClient,
  findClientById,
  updateClient,
} from "../controller/cliente.controller.js";
import {
  findAllUser,
  findUserById,
  updateUsuario,
} from "../controller/usuario.controller.js";
import {
  createBoleta,
  deleteBoleta,
  findAllBoleta,
  findBoletaById,
  updateBoleta,
} from "../controller/venta/boleta.controller.js";
import {
  createBoletaDetail,
  deleteBoletaDetail,
  finAllBoletaDetail,
  updateBoletaDetail,
} from "../controller/venta/detalle_boleta.controller.js";
import {
  createPedidoBoleta,
  deletePedidoBoleta,
  findAllPedidoBoleta,
  updatePedidoBoleta,
} from "../controller/venta/pedido_boleta.controller.js";
import {
  createDetallePedidoBoleta,
  findAllDetallePedidoBoleta,
  findDetallePedidoBoletaById,
} from "../controller/venta/detalle_pedido_boleta.controller.js";
import {
  createGuiaSalida,
  deleteGuiaSalida,
  findAllGuiaSalida,
  findGuiaSalidaById,
  updateGuiaSalida,
} from "../controller/venta/guia_salida.controller.js";
import {
  createDetalleGuiaSalida,
  deleteDetalleGuiaSalida,
  findAllDetalleGuiaSalida,
  findDetalleGuiaSalidaById,
  updateDetalleGuiaSalida,
} from "../controller/venta/detalle_guia_salida.controller.js";

const router = Router();

// --------------------> CLIENTE ROUTES <-------------------- //

router.get("/cliente", finAdllClient);
router.get("/cliente/:id", findClientById);
router.post("/cliente", createClient);
router.patch("/cliente/:id", updateClient);
router.delete("/cliente/:id", deleteClient);

// --------------------> USUARIO ROUTES <-------------------- //

router.get("/usuario", findAllUser);
router.post("/usuario", findAllUser);
router.get("/usuario/:id", findUserById);
router.patch("/usuario/:id", updateUsuario);

// --------------------> BOLETA ROUTES <-------------------- //

router.get("/boleta", findAllBoleta);
router.get("/boleta/:id", findBoletaById);
router.post("/boleta", createBoleta);
router.patch("/boleta/:id", updateBoleta);
router.delete("/boleta/:id", deleteBoleta);

// --------------------> DETALLE BOLETA ROUTES <-------------------- //

router.get("/detalleboleta", finAllBoletaDetail);
router.post("/detalleboleta", createBoletaDetail);
router.patch("/detalleboleta/:id", updateBoletaDetail);
router.delete("/detalleboleta/:id", deleteBoletaDetail);

// --------------------> PEDIDO BOLETA ROUTES <-------------------- //

router.get("/pedido", findAllPedidoBoleta);
router.post("/pedido", createPedidoBoleta);
router.patch("/pedido/:id", updatePedidoBoleta);
router.delete("/pedido/:id", deletePedidoBoleta);

// --------------------> DETALLE PEDIDO BOLETA ROUTES <-------------------- //

router.get("/detallepedido", findAllDetallePedidoBoleta);
router.post("/detallepedido", createDetallePedidoBoleta);
router.get("/detallepedido/:id", findDetallePedidoBoletaById);

// --------------------> GUIA SALIDA ROUTES <-------------------- //

router.get("/guiasalida", findAllGuiaSalida);
router.get("/guiasalida/:id", findGuiaSalidaById);
router.post("/guiasalida", createGuiaSalida);
router.patch("/guiasalida/:id", updateGuiaSalida);
router.delete("/guiasalida/:id", deleteGuiaSalida);

// --------------------> DETALLE GUIA SALIDA ROUTES <-------------------- //

router.get("/detalleguiasalida", findAllDetalleGuiaSalida);
router.get("/detalleguiasalida/:id", findDetalleGuiaSalidaById);
router.post("/detalleguiasalida", createDetalleGuiaSalida);
router.patch("/detalleguiasalida/:id", updateDetalleGuiaSalida);
router.delete("/detalleguiasalida/:id", deleteDetalleGuiaSalida);

export default router;
