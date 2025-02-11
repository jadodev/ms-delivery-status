import { DeliveryStatus } from "../../domain/entity/DeliveryStatus";
import { DomainError } from "../../domain/exception/DomainError";

export class DeliveryStatusDataMapper {
  public static toDomain(row: any): DeliveryStatus {
    const requiredFields = [
      'stateCode',
      'shipmentId',
      'currentState',
      'currentLocation',
      'estimatedDeliveryTime',
      'lastUpdated'
    ];
    for (const field of requiredFields) {
      if (!row[field]) {
        throw new DomainError(`Missing field '${field}' in persistence record.`);
      }
    }

    return DeliveryStatus.fromPersistence(row);
  }
}
