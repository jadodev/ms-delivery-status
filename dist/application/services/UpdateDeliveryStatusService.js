"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryStatusService = void 0;
const DeliveryStatusMapper_1 = require("../mappers/DeliveryStatusMapper");
/**
 * Application service for updating a DeliveryStatus.
 */
class UpdateDeliveryStatusService {
    constructor(repository, domainService, eventPublisher) {
        this.repository = repository;
        this.domainService = domainService;
        this.eventPublisher = eventPublisher;
    }
    /**
     * Executes the use case to update a DeliveryStatus.
     */
    async execute(dto) {
        const deliveryStatus = await this.repository.findByStateCode(dto.stateCode);
        if (!deliveryStatus) {
            throw new Error("DeliveryStatus not found.");
        }
        const newEstimatedDeliveryTime = dto.newEstimatedDeliveryTime
            ? new Date(dto.newEstimatedDeliveryTime)
            : undefined;
        this.domainService.updateDeliveryStatus(deliveryStatus, dto.newStatus, dto.newLocation, newEstimatedDeliveryTime);
        await this.repository.update(deliveryStatus);
        const event = {
            event: "DeliveryStatusUpdated",
            stateCode: deliveryStatus.stateCode,
            shipmentId: deliveryStatus.shipmentId,
            currentStatus: deliveryStatus.currentStatus,
            currentLocation: deliveryStatus.currentLocation,
            estimatedDeliveryTime: deliveryStatus.estimatedDeliveryTime.toISOString(),
            lastUpdated: deliveryStatus.lastUpdated.toISOString()
        };
        await this.eventPublisher.publish("deliverystatus.events", event);
        return DeliveryStatusMapper_1.DeliveryStatusMapper.toDto(deliveryStatus);
    }
}
exports.UpdateDeliveryStatusService = UpdateDeliveryStatusService;
