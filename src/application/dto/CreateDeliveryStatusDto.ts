/**
 * DTO para la creación de un DeliveryStatus.
 */
export class CreateDeliveryStatusDto {
    shipmentId: string;
    currentLocation: string;
    estimatedDeliveryTime: string; 
    initialState?: string;
  
    constructor(data: {
      shipmentId: string;
      currentLocation: string;
      estimatedDeliveryTime: string;
      initialState?: string;
    }) {
      if (!data.shipmentId) {
        throw new Error("shipmentId is required.");
      }
      if (!data.currentLocation) {
        throw new Error("currentLocation is required.");
      }
      if (!data.estimatedDeliveryTime) {
        throw new Error("estimatedDeliveryTime is required.");
      }
  
      this.shipmentId = data.shipmentId;
      this.currentLocation = data.currentLocation;
      this.estimatedDeliveryTime = data.estimatedDeliveryTime;
      this.initialState = data.initialState ?? "En espera";
    }
  }
  