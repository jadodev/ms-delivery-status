import { DeliveryStatus } from "../../../domain/entity/DeliveryStatus";

/**
 * Outbound port for DeliveryStatus persistence.
 *
 * Este contrato abstrae las operaciones necesarias para persistir y consultar la entidad
 * DeliveryStatus, permitiendo que la capa de aplicación y dominio sean independientes
 * de la tecnología de almacenamiento utilizada.
 */
export interface IDeliveryStatusRepository {
  /**
   * Persiste una nueva instancia de DeliveryStatus.
   */
  save(deliveryStatus: DeliveryStatus): Promise<void>;

  /**
   * Busca un DeliveryStatus por su código único (stateCode).
   */
  findByStateCode(stateCode: string): Promise<DeliveryStatus | null>;

  /**
   * Busca un DeliveryStatus por el shipmentId asociado.
   */
  findByShipmentId(shipmentId: string): Promise<DeliveryStatus | null>;

  /**
   * Actualiza una instancia existente de DeliveryStatus.
   */
  update(deliveryStatus: DeliveryStatus): Promise<void>;
}
