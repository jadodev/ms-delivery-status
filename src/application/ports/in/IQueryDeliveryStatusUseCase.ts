/**
 * Inbound port for querying a DeliveryStatus.
 *
 * Este contrato define el caso de uso para consultar la información de un DeliveryStatus,
 * ya sea mediante el shipmentId o el stateCode.
 */
export interface IQueryDeliveryStatusUseCase {
    /**
     * Ejecuta el caso de uso para consultar un DeliveryStatus.
     */
    execute(dto: any): Promise<any>;
  }
  