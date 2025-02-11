/**
 * Inbound port for creating a DeliveryStatus.
 *
 * Define el contrato para el caso de uso encargado de crear un nuevo DeliveryStatus.
 * Se espera recibir un DTO (por ejemplo, CreateDeliveryStatusDto) con la información necesaria
 * y devolver un DeliveryStatusDto representativo del DeliveryStatus creado.
 */
export interface ICreateDeliveryStatusUseCase {
    /**
     * Ejecuta el caso de uso para crear un DeliveryStatus..
     */
    execute(dto: any): Promise<any>;
  }
  