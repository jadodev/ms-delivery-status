/**
 * DTO para consultar el DeliveryStatus.
 * Se requiere que se proporcione al menos uno de los parámetros: shipmentId o stateCode.
 */
export class QueryDeliveryStatusDto {
    shipmentId?: string;
    stateCode?: string;
  
    constructor(data: { shipmentId?: string; stateCode?: string }) {
      if (!data.shipmentId && !data.stateCode) {
        throw new Error("At least one of shipmentId or stateCode must be provided.");
      }
      this.shipmentId = data.shipmentId;
      this.stateCode = data.stateCode;
    }
  }
  