import { Router, Request, Response } from 'express';
import { CreateDeliveryStatusService } from '../../application/services/CreateDeliveryStatusService';
import { QueryDeliveryStatusService } from '../../application/services/QueryDeliveryStatusService';
import { UpdateDeliveryStatusService } from '../../application/services/UpdateDeliveryStatusService';

/**
 * Crea y configura un router Express para el microservicio DeliveryStatus.
 *
 * Se definen tres endpoints:
 *  - POST /delivery-status: para crear un nuevo DeliveryStatus.
 *  - GET /delivery-status: para consultar un DeliveryStatus por shipmentId o stateCode.
 *  - PATCH /delivery-status: para actualizar un DeliveryStatus existente.
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
