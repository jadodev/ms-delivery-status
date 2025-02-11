import { IQueryDeliveryStatusUseCase } from "../ports/in/IQueryDeliveryStatusUseCase";
import { QueryDeliveryStatusDto } from "../dto/QueryDeliveryStatusDto";
import { DeliveryStatusDto } from "../dto/DeliveryStatusDto";
import { IDeliveryStatusRepository } from "../ports/out/IDeliveryStatusRepository";
import { DeliveryStatusMapper } from "../mappers/DeliveryStatusMapper";

/**
 * Application service for querying a DeliveryStatus.
 */
export class QueryDeliveryStatusService implements IQueryDeliveryStatusUseCase {
  private readonly repository: IDeliveryStatusRepository;

  constructor(repository: IDeliveryStatusRepository) {
    this.repository = repository;
  }

  /**
   * Executes the use case to query a DeliveryStatus.
   */
  public async execute(dto: QueryDeliveryStatusDto): Promise<DeliveryStatusDto> {
    let deliveryStatus;
    if (dto.stateCode) {
      deliveryStatus = await this.repository.findByStateCode(dto.stateCode);
    } else if (dto.shipmentId) {
      deliveryStatus = await this.repository.findByShipmentId(dto.shipmentId);
    } else {
      throw new Error("Either shipmentId or stateCode must be provided.");
    }

    if (!deliveryStatus) {
      throw new Error("DeliveryStatus not found.");
    }

    return DeliveryStatusMapper.toDto(deliveryStatus);
  }
}
