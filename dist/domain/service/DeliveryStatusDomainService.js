"use strict";
// src/domain/service/DeliveryStatusDomainService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatusDomainService = void 0;
const DeliveryStatus_1 = require("../entity/DeliveryStatus");
const DomainError_1 = require("../exception/DomainError");
/**
 * Domain service responsable de creacion y actualización del estado de llegada.
 */
class DeliveryStatusDomainService {
    /**
     * Crea un nuevo DeliveryStatus para un paquete.
     */
    createDeliveryStatus(shipmentId, currentLocation, estimatedDeliveryTime, initialState = "En espera") {
        if (!shipmentId) {
            throw new DomainError_1.DomainError("Shipment ID is required to create a DeliveryStatus.");
        }
        if (!currentLocation) {
            throw new DomainError_1.DomainError("Current location is required to create a DeliveryStatus.");
        }
        if (!estimatedDeliveryTime) {
            throw new DomainError_1.DomainError("Estimated delivery time is required to create a DeliveryStatus.");
        }
        return DeliveryStatus_1.DeliveryStatus.create(shipmentId, currentLocation, estimatedDeliveryTime, initialState);
    }
    /**
     * Actualiza el DeliveryStatus existente con nuevos valores..
     */
    updateDeliveryStatus(deliveryStatus, newStatus, newLocation, newEstimatedDeliveryTime) {
        if (!newStatus) {
            throw new DomainError_1.DomainError("New status cannot be null or empty.");
        }
        if (!newLocation) {
            throw new DomainError_1.DomainError("New location cannot be null or empty.");
        }
        if (newEstimatedDeliveryTime && newEstimatedDeliveryTime.getTime() < Date.now()) {
            throw new DomainError_1.DomainError("New estimated delivery time cannot be in the past.");
        }
        deliveryStatus.updateState(newStatus);
        deliveryStatus.updateLocation(newLocation);
        if (newEstimatedDeliveryTime) {
            deliveryStatus.updateEstimatedDeliveryTime(newEstimatedDeliveryTime);
        }
    }
}
exports.DeliveryStatusDomainService = DeliveryStatusDomainService;
