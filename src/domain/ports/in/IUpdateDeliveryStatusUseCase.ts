/**
 * Inbound port for updating a DeliveryStatus.
 *
 * Define el contrato para el caso de uso encargado de actualizar un DeliveryStatus existente.
 * Se espera recibir un DTO (por ejemplo, UpdateDeliveryStatusDto) con la información para actualizar
 * y devolver un DeliveryStatusDto actualizado.
 */
export interface IUpdateDeliveryStatusUseCase {
    /**
     * Ejecuta el caso de uso para actualizar un DeliveryStatus.
     */
    execute(dto: any): Promise<any>;
  }
  