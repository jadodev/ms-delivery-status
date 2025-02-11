"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatusMapper = void 0;
const DeliveryStatusDto_1 = require("../dto/DeliveryStatusDto");
class DeliveryStatusMapper {
    static toDto(deliveryStatus) {
        return new DeliveryStatusDto_1.DeliveryStatusDto({
            stateCode: deliveryStatus.stateCode,
            shipmentId: deliveryStatus.shipmentId,
            currentStatus: deliveryStatus.currentStatus,
            currentLocation: deliveryStatus.currentLocation,
            estimatedDeliveryTime: deliveryStatus.estimatedDeliveryTime.toISOString(),
            lastUpdated: deliveryStatus.lastUpdated.toISOString(),
        });
    }
}
exports.DeliveryStatusMapper = DeliveryStatusMapper;
