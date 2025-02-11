"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryStatusDto = void 0;
/**
 * DTO para actualizar un DeliveryStatus.
 */
class UpdateDeliveryStatusDto {
    constructor(data) {
        if (!data.stateCode) {
            throw new Error("stateCode is required.");
        }
        if (!data.newStatus) {
            throw new Error("newStatus is required.");
        }
        if (!data.newLocation) {
            throw new Error("newLocation is required.");
        }
        this.stateCode = data.stateCode;
        this.newStatus = data.newStatus;
        this.newLocation = data.newLocation;
        this.newEstimatedDeliveryTime = data.newEstimatedDeliveryTime;
    }
}
exports.UpdateDeliveryStatusDto = UpdateDeliveryStatusDto;
