"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryStatusDto = void 0;
/**
 * DTO para la creación de un DeliveryStatus.
 */
class CreateDeliveryStatusDto {
    constructor(data) {
        if (!data.shipmentId) {
            throw new Error("shipmentId is required.");
        }
        if (!data.currentLocation) {
            throw new Error("currentLocation is required.");
        }
        if (!data.estimatedDeliveryTime) {
            throw new Error("estimatedDeliveryTime is required.");
        }
        this.shipmentId = data.shipmentId;
        this.currentLocation = data.currentLocation;
        this.estimatedDeliveryTime = data.estimatedDeliveryTime;
        this.initialState = data.initialState ?? "En espera";
    }
}
exports.CreateDeliveryStatusDto = CreateDeliveryStatusDto;
