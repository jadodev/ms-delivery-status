"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentCreatedConsumer = void 0;
/**
 * ShipmentCreatedConsumer listens for "ShipmentCreated" events.
 * When a "ShipmentCreated" event is received, it creates a new DeliveryStatus record.
 */
class ShipmentCreatedConsumer {
    constructor(consumer, repository, domainService) {
        this.consumer = consumer;
        this.repository = repository;
        this.domainService = domainService;
    }
    /**
     * Starts the consumer to listen for ShipmentCreated events.
     */
    async start() {
        await this.consumer.subscribe("shipment.events", async (event) => {
            try {
                if (event.event !== "ShipmentCreated") {
                    console.warn(`Ignored event type: ${event.event}`);
                    return;
                }
                const shipmentId = event.shipmentId;
                const currentLocation = event.origin;
                if (!event.estimatedDeliveryTime) {
                    console.warn(`Event for shipmentId ${shipmentId} lacks estimatedDeliveryTime. Skipping.`);
                    return;
                }
                const estimatedDeliveryTime = new Date(event.estimatedDeliveryTime);
                const deliveryStatus = this.domainService.createDeliveryStatus(shipmentId, currentLocation, estimatedDeliveryTime, "En espera");
                await this.repository.save(deliveryStatus);
                console.log(`Created DeliveryStatus for shipmentId ${shipmentId} with stateCode ${deliveryStatus.stateCode}`);
            }
            catch (error) {
                console.error("Error processing ShipmentCreated event:", error);
            }
        });
    }
}
exports.ShipmentCreatedConsumer = ShipmentCreatedConsumer;
