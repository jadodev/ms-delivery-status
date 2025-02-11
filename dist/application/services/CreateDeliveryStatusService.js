"use strict";
// src/application/services/CreateDeliveryStatusService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryStatusService = void 0;
const DeliveryStatusMapper_1 = require("../mappers/DeliveryStatusMapper");
/**
 * Application service for creating a DeliveryStatus.
 */
class CreateDeliveryStatusService {
    constructor(domainService, repository, eventPublisher) {
        this.domainService = domainService;
        this.repository = repository;
        this.eventPublisher = eventPublisher;
    }
    /**
     * Executes the use case to create a DeliveryStatus.
     */
    async execute(dto) {
        const deliveryStatus = this.domainService.createDeliveryStatus(dto.shipmentId, dto.currentLocation, new Date(dto.estimatedDeliveryTime), dto.initialState);
        await this.repository.save(deliveryStatus);
        const event = {
            event: "DeliveryStatusCreated",
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
exports.CreateDeliveryStatusService = CreateDeliveryStatusService;
