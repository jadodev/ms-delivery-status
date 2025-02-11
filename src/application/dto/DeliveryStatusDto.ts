/**
 * DTO que representa la información de un DeliveryStatus.
 */
export class DeliveryStatusDto {
    stateCode: string;
    shipmentId: string;
    currentStatus: string;
    currentLocation: string;
    estimatedDeliveryTime: string; 
    lastUpdated: string;       
  
    constructor(data: {
      stateCode: string;
      shipmentId: string;
      currentStatus: string;
      currentLocation: string;
      estimatedDeliveryTime: string;
      lastUpdated: string;
    }) {
      this.stateCode = data.stateCode;
      this.shipmentId = data.shipmentId;
      this.currentStatus = data.currentStatus;
      this.currentLocation = data.currentLocation;
      this.estimatedDeliveryTime = data.estimatedDeliveryTime;
      this.lastUpdated = data.lastUpdated;
    }
  }
  