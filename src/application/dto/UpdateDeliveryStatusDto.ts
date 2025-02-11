/**
 * DTO para actualizar un DeliveryStatus.
 */
export class UpdateDeliveryStatusDto {
    stateCode: string; // Código único del DeliveryStatus a actualizar.
    newStatus: string;
    newLocation: string;
    newEstimatedDeliveryTime?: string; 
  
    constructor(data: {
      stateCode: string;
      newStatus: string;
      newLocation: string;
      newEstimatedDeliveryTime?: string;
    }) {
      if (!data.stateCode) {
        throw new Error("stateCode is required.");
      }
      if (!data.newStatus) {
        throw new Error("newStatus is required.");
      }
      if (!data.newLocation) {
        throw new Error("newLocation is required.");
      }
  
      this.stateCode = data.stateCode;
      this.newStatus = data.newStatus;
      this.newLocation = data.newLocation;
      this.newEstimatedDeliveryTime = data.newEstimatedDeliveryTime;
    }
  }
  