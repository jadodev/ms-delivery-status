/**
 * Inbound port for creating a DeliveryStatus.
 *
 * Este contrato define el caso de uso para la creación de un DeliveryStatus.
 * Se espera recibir un DTO (por ejemplo, CreateDeliveryStatusDto) con la información
 * necesaria para crear el registro, y devolver la representación resultante (por ejemplo,
 * DeliveryStatusDto).
 */
export interface ICreateDeliveryStatusUseCase {
    /**
     * Ejecuta el caso de uso para crear un DeliveryStatus.
     */
    execute(dto: any): Promise<any>;
  }
  