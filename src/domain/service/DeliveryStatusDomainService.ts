// src/domain/service/DeliveryStatusDomainService.ts

import { DeliveryStatus } from "../entity/DeliveryStatus";
import { DomainError } from "../exception/DomainError";

/**
 * Domain service responsable de creacion y actualización del estado de llegada.
 */
export class DeliveryStatusDomainService {
  /**
   * Crea un nuevo DeliveryStatus para un paquete.
   */
  public createDeliveryStatus(
    shipmentId: string,
    currentLocation: string,
    estimatedDeliveryTime: Date,
    initialState: string = "En espera"
  ): DeliveryStatus {
    if (!shipmentId) {
      throw new DomainError("Shipment ID is required to create a DeliveryStatus.");
    }
    if (!currentLocation) {
      throw new DomainError("Current location is required to create a DeliveryStatus.");
    }
    if (!estimatedDeliveryTime) {
      throw new DomainError("Estimated delivery time is required to create a DeliveryStatus.");
    }
    return DeliveryStatus.create(shipmentId, currentLocation, estimatedDeliveryTime, initialState);
  }

  /**
   * Actualiza el DeliveryStatus existente con nuevos valores.
   */
  public updateDeliveryStatus(
    deliveryStatus: DeliveryStatus,
    newStatus: string,
    newLocation: string,
    newEstimatedDeliveryTime?: Date
  ): void {
    if (!newStatus) {
      throw new DomainError("New status cannot be null or empty.");
    }
    if (!newLocation) {
      throw new DomainError("New location cannot be null or empty.");
    }
    if (newEstimatedDeliveryTime && newEstimatedDeliveryTime.getTime() < Date.now()) {
      throw new DomainError("New estimated delivery time cannot be in the past.");
    }

    deliveryStatus.updateState(newStatus);
    deliveryStatus.updateLocation(newLocation);
    if (newEstimatedDeliveryTime) {
      deliveryStatus.updateEstimatedDeliveryTime(newEstimatedDeliveryTime);
    }
  }
}
