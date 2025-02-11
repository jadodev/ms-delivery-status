"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDeliveryStatusService = void 0;
const DeliveryStatusMapper_1 = require("../mappers/DeliveryStatusMapper");
/**
 * Application service for querying a DeliveryStatus.
 */
class QueryDeliveryStatusService {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Executes the use case to query a DeliveryStatus.
     */
    async execute(dto) {
        let deliveryStatus;
        if (dto.stateCode) {
            deliveryStatus = await this.repository.findByStateCode(dto.stateCode);
        }
        else if (dto.shipmentId) {
            deliveryStatus = await this.repository.findByShipmentId(dto.shipmentId);
        }
        else {
            throw new Error("Either shipmentId or stateCode must be provided.");
        }
        if (!deliveryStatus) {
            throw new Error("DeliveryStatus not found.");
        }
        return DeliveryStatusMapper_1.DeliveryStatusMapper.toDto(deliveryStatus);
    }
}
exports.QueryDeliveryStatusService = QueryDeliveryStatusService;
