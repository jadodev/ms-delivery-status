import { Router, Request, Response } from 'express';
import { CreateDeliveryStatusService } from '../../application/services/CreateDeliveryStatusService';
import { QueryDeliveryStatusService } from '../../application/services/QueryDeliveryStatusService';
import { UpdateDeliveryStatusService } from '../../application/services/UpdateDeliveryStatusService';

/**
 * @swagger
 * tags:
 *   name: DeliveryStatus
 *   description: Endpoints para gestionar el Delivery Status
 */

/**
 * @swagger
 * /delivery-status/health:
 *   get:
 *     summary: Verifica el estado del servicio de Delivery Status.
 *     tags: [DeliveryStatus]
 *     responses:
 *       200:
 *         description: El servicio está corriendo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Delivery Status Service is running
 */

/**
 * @swagger
 * /delivery-status:
 *   post:
 *     summary: Crea un nuevo DeliveryStatus.
 *     tags: [DeliveryStatus]
 *     requestBody:
 *       description: Objeto con los datos para crear un DeliveryStatus.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipmentId:
 *                 type: string
 *               stateCode:
 *                 type: string
 *             example:
 *               shipmentId: "SHIP001"
 *               stateCode: "DELIVERED"
 *     responses:
 *       201:
 *         description: DeliveryStatus creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error al crear el DeliveryStatus.
 */

/**
 * @swagger
 * /delivery-status:
 *   get:
 *     summary: Consulta un DeliveryStatus por shipmentId o stateCode.
 *     tags: [DeliveryStatus]
 *     parameters:
 *       - in: query
 *         name: shipmentId
 *         schema:
 *           type: string
 *         description: Identificador del shipment.
 *       - in: query
 *         name: stateCode
 *         schema:
 *           type: string
 *         description: Código de estado.
 *     responses:
 *       200:
 *         description: DeliveryStatus obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error en la consulta, se debe enviar al menos shipmentId o stateCode.
 */

/**
 * @swagger
 * /delivery-status:
 *   patch:
 *     summary: Actualiza un DeliveryStatus existente.
 *     tags: [DeliveryStatus]
 *     requestBody:
 *       description: Datos para actualizar el DeliveryStatus.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipmentId:
 *                 type: string
 *               stateCode:
 *                 type: string
 *             example:
 *               shipmentId: "SHIP001"
 *               stateCode: "IN_TRANSIT"
 *     responses:
 *       200:
 *         description: DeliveryStatus actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error al actualizar el DeliveryStatus.
 */
export function createDeliveryStatusController(
  createService: CreateDeliveryStatusService,
  queryService: QueryDeliveryStatusService,
  updateService: UpdateDeliveryStatusService
): Router {
  const router = Router();

  router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'Delivery Status Service is running' });
  });

  router.post('/delivery-status', async (req: Request, res: Response) => {
    try {
      const createDto = req.body;
      const result = await createService.execute(createDto);
      res.status(201).json(result);
    } catch (error: any) {
      console.error('Error creating DeliveryStatus:', error);
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/delivery-status', async (req: Request, res: Response) => {
    try {
      const { shipmentId, stateCode } = req.query;
      if (!shipmentId && !stateCode) {
        res.status(400).json({ error: 'Either shipmentId or stateCode must be provided.' });
        return;
      }
      const queryDto = {
        shipmentId: shipmentId ? shipmentId.toString() : undefined,
        stateCode: stateCode ? stateCode.toString() : undefined
      };
      const result = await queryService.execute(queryDto);
      res.json(result);
    } catch (error: any) {
      console.error('Error querying DeliveryStatus:', error);
      res.status(400).json({ error: error.message });
    }
  });

  router.patch('/delivery-status', async (req: Request, res: Response) => {
    try {
      const updateDto = req.body;
      const result = await updateService.execute(updateDto);
      res.json(result);
    } catch (error: any) {
      console.error('Error updating DeliveryStatus:', error);
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
