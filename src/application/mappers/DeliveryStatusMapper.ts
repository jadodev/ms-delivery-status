import { DeliveryStatus } from "../../domain/entity/DeliveryStatus";
import { DeliveryStatusDto } from "../dto/DeliveryStatusDto";

export class DeliveryStatusMapper {
  public static toDto(deliveryStatus: DeliveryStatus): DeliveryStatusDto {
    return new DeliveryStatusDto({
      stateCode: deliveryStatus.stateCode,
      shipmentId: deliveryStatus.shipmentId,
      currentStatus: deliveryStatus.currentStatus,
      currentLocation: deliveryStatus.currentLocation,
      estimatedDeliveryTime: deliveryStatus.estimatedDeliveryTime.toISOString(),
      lastUpdated: deliveryStatus.lastUpdated.toISOString(),
    });
  }
}
