import { KafkaConsumer } from "./KafkaConsumer";
import { MySQLDeliveryStatusRepository } from "../repository/MySQLDeliveryStatusRepository";
import { DeliveryStatusDomainService } from "../../domain/service/DeliveryStatusDomainService";

/**
 * ShipmentCreatedConsumer listens for "ShipmentCreated" events.
 * When a "ShipmentCreated" event is received, it creates a new DeliveryStatus record.
 */
export class ShipmentCreatedConsumer {
  private readonly consumer: KafkaConsumer;
  private readonly repository: MySQLDeliveryStatusRepository;
  private readonly domainService: DeliveryStatusDomainService;

  constructor(
    consumer: KafkaConsumer,
    repository: MySQLDeliveryStatusRepository,
    domainService: DeliveryStatusDomainService
  ) {
    this.consumer = consumer;
    this.repository = repository;
    this.domainService = domainService;
  }

  /**
   * Starts the consumer to listen for ShipmentCreated events.
   */
  public async start(): Promise<void> {
    await this.consumer.subscribe("shipment.events", async (event: any) => {
      try {
        if (event.event !== "ShipmentCreated") {
          console.warn(`Ignored event type: ${event.event}`);
          return;
        }

        const shipmentId: string = event.shipmentId;
        const currentLocation: string = event.origin; 
        if (!event.estimatedDeliveryTime) {
          console.warn(`Event for shipmentId ${shipmentId} lacks estimatedDeliveryTime. Skipping.`);
          return;
        }
        const estimatedDeliveryTime: Date = new Date(event.estimatedDeliveryTime);

        const deliveryStatus = this.domainService.createDeliveryStatus(
          shipmentId,
          currentLocation,
          estimatedDeliveryTime,
          "En espera"
        );

        await this.repository.save(deliveryStatus);

        console.log(`Created DeliveryStatus for shipmentId ${shipmentId} with stateCode ${deliveryStatus.stateCode}`);
      } catch (error) {
        console.error("Error processing ShipmentCreated event:", error);
      }
    });
  }
}
