import { IUpdateDeliveryStatusUseCase } from "../ports/in/IUpdateDeliveryStatusUseCase";
import { UpdateDeliveryStatusDto } from "../dto/UpdateDeliveryStatusDto";
import { DeliveryStatusDto } from "../dto/DeliveryStatusDto";
import { IDeliveryStatusRepository } from "../ports/out/IDeliveryStatusRepository";
import { DeliveryStatusDomainService } from "../../domain/service/DeliveryStatusDomainService";
import { DeliveryStatusMapper } from "../mappers/DeliveryStatusMapper";
import { EventPublisher } from "../../infrastructure/messaging/EventPublisher";

/**
 * Application service for updating a DeliveryStatus.
 */
export class UpdateDeliveryStatusService implements IUpdateDeliveryStatusUseCase {
  private readonly repository: IDeliveryStatusRepository;
  private readonly domainService: DeliveryStatusDomainService;
  private readonly eventPublisher: EventPublisher;

  constructor(
    repository: IDeliveryStatusRepository,
    domainService: DeliveryStatusDomainService,
    eventPublisher: EventPublisher
  ) {
    this.repository = repository;
    this.domainService = domainService;
    this.eventPublisher = eventPublisher;
  }

  /**
   * Executes the use case to update a DeliveryStatus.
   */
  public async execute(dto: UpdateDeliveryStatusDto): Promise<DeliveryStatusDto> {
    const deliveryStatus = await this.repository.findByStateCode(dto.stateCode);
    if (!deliveryStatus) {
      throw new Error("DeliveryStatus not found.");
    }

    const newEstimatedDeliveryTime = dto.newEstimatedDeliveryTime
      ? new Date(dto.newEstimatedDeliveryTime)
      : undefined;

    this.domainService.updateDeliveryStatus(
      deliveryStatus,
      dto.newStatus,
      dto.newLocation,
      newEstimatedDeliveryTime
    );

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

    return DeliveryStatusMapper.toDto(deliveryStatus);
  }
}
