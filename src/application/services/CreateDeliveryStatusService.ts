// src/application/services/CreateDeliveryStatusService.ts

import { ICreateDeliveryStatusUseCase } from "../ports/in/ICreateDeliveryStatusUseCase";
import { CreateDeliveryStatusDto } from "../dto/CreateDeliveryStatusDto";
import { DeliveryStatusDto } from "../dto/DeliveryStatusDto";
import { DeliveryStatusDomainService } from "../../domain/service/DeliveryStatusDomainService";
import { IDeliveryStatusRepository } from "../ports/out/IDeliveryStatusRepository";
import { DeliveryStatusMapper } from "../mappers/DeliveryStatusMapper";
import { EventPublisher } from "../../infrastructure/messaging/EventPublisher";

/**
 * Application service for creating a DeliveryStatus.
 */
export class CreateDeliveryStatusService implements ICreateDeliveryStatusUseCase {
  private readonly domainService: DeliveryStatusDomainService;
  private readonly repository: IDeliveryStatusRepository;
  private readonly eventPublisher: EventPublisher;

  constructor(
    domainService: DeliveryStatusDomainService,
    repository: IDeliveryStatusRepository,
    eventPublisher: EventPublisher
  ) {
    this.domainService = domainService;
    this.repository = repository;
    this.eventPublisher = eventPublisher;
  }

  /**
   * Executes the use case to create a DeliveryStatus.
   */
  public async execute(dto: CreateDeliveryStatusDto): Promise<DeliveryStatusDto> {
    const deliveryStatus = this.domainService.createDeliveryStatus(
      dto.shipmentId,
      dto.currentLocation,
      new Date(dto.estimatedDeliveryTime),
      dto.initialState
    );

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

    return DeliveryStatusMapper.toDto(deliveryStatus);
  }
}
