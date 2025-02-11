"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDeliveryStatusDto = void 0;
/**
 * DTO para consultar el DeliveryStatus.
 * Se requiere que se proporcione al menos uno de los parámetros: shipmentId o stateCode.
 */
class QueryDeliveryStatusDto {
    constructor(data) {
        if (!data.shipmentId && !data.stateCode) {
            throw new Error("At least one of shipmentId or stateCode must be provided.");
        }
        this.shipmentId = data.shipmentId;
        this.stateCode = data.stateCode;
    }
}
exports.QueryDeliveryStatusDto = QueryDeliveryStatusDto;
