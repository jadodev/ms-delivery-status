/**
 * Inbound port for querying a DeliveryStatus.
 *
 * Define el contrato para el caso de uso encargado de consultar la información de un DeliveryStatus.
 * Se espera recibir un DTO (por ejemplo, QueryDeliveryStatusDto) con los parámetros de consulta,
 * y devolver un DeliveryStatusDto con la información solicitada.
 */
export interface IQueryDeliveryStatusUseCase {
    /**
     * Ejecuta el caso de uso para consultar un DeliveryStatus..
     */
    execute(dto: any): Promise<any>;
  }
  