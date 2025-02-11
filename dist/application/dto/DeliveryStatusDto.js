"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatusDto = void 0;
/**
 * DTO que representa la información de un DeliveryStatus.
 */
class DeliveryStatusDto {
    constructor(data) {
        this.stateCode = data.stateCode;
        this.shipmentId = data.shipmentId;
        this.currentStatus = data.currentStatus;
        this.currentLocation = data.currentLocation;
        this.estimatedDeliveryTime = data.estimatedDeliveryTime;
        this.lastUpdated = data.lastUpdated;
    }
}
exports.DeliveryStatusDto = DeliveryStatusDto;
