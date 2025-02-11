"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatusDataMapper = void 0;
const DeliveryStatus_1 = require("../../domain/entity/DeliveryStatus");
const DomainError_1 = require("../../domain/exception/DomainError");
class DeliveryStatusDataMapper {
    static toDomain(row) {
        const requiredFields = [
            'stateCode',
            'shipmentId',
            'currentState',
            'currentLocation',
            'estimatedDeliveryTime',
            'lastUpdated'
        ];
        for (const field of requiredFields) {
            if (!row[field]) {
                throw new DomainError_1.DomainError(`Missing field '${field}' in persistence record.`);
            }
        }
        return DeliveryStatus_1.DeliveryStatus.fromPersistence(row);
    }
}
exports.DeliveryStatusDataMapper = DeliveryStatusDataMapper;
