import { DeliveryStatus } from "../../../domain/entity/DeliveryStatus";

/**
 * Outbound port for DeliveryStatus persistence.
 *
 * Esta interfaz define las operaciones de persistencia que se requieren para gestionar las instancias
 * de DeliveryStatus en el sistema, sin acoplar la lógica de negocio a una implementación específica
 * (por ejemplo, MySQL, MongoDB, etc.).
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

  /**.
   * Actualiza una instancia existente de DeliveryStatus en la persistencia.
   */
  update(deliveryStatus: DeliveryStatus): Promise<void>;
}
