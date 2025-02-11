import { DomainError } from "../exception/DomainError";

/**
 * Representa el estado dinamico asociado a un paquete.
 * Esto rastrea el estado actual, localización y estama el tiempo de llegada.
 */
export class DeliveryStatus {
  public readonly stateCode: string;    
  public readonly shipmentId: string;  
  private _currentState: string;         
  private _currentLocation: string;       
  private _estimatedDeliveryTime: Date;  
  private _lastUpdated: Date;            
  /**
   * Constructor privado para forzar el uso de métodos de fábrica o de rehidratación.
   */
  private constructor(
    stateCode: string,
    shipmentId: string,
    currentState: string,
    currentLocation: string,
    estimatedDeliveryTime: Date,
    lastUpdated: Date
  ) {
    this.stateCode = stateCode;
    this.shipmentId = shipmentId;
    this._currentState = currentState;
    this._currentLocation = currentLocation;
    this._estimatedDeliveryTime = estimatedDeliveryTime;
    this._lastUpdated = lastUpdated;
  }

  /**
   * Factory method para crear una nueva instancia que por defecto esta en "espera".
   */
  public static create(
    shipmentId: string,
    currentLocation: string,
    estimatedDeliveryTime: Date,
    initialState: string = "En espera"
  ): DeliveryStatus {
    const stateCode = `DS-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return new DeliveryStatus(
      stateCode,
      shipmentId,
      initialState,
      currentLocation,
      estimatedDeliveryTime,
      new Date()
    );
  }

  /**
   * Actualiza el estedo de llegada y lo persiste.
   */
  public static fromPersistence(row: any): DeliveryStatus {
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
    return new DeliveryStatus(
      row.stateCode,
      row.shipmentId,
      row.currentState,
      row.currentLocation,
      new Date(row.estimatedDeliveryTime),
      new Date(row.lastUpdated)
    );
  }

  public get currentStatus(): string {
    return this._currentState;
  }

  public get currentLocation(): string {
    return this._currentLocation;
  }

  public get estimatedDeliveryTime(): Date {
    return this._estimatedDeliveryTime;
  }

  public get lastUpdated(): Date {
    return this._lastUpdated;
  }

  public updateState(newState: string): void {
    if (!newState) {
      throw new DomainError("New state cannot be null or empty.");
    }
    this._currentState = newState;
    this._lastUpdated = new Date();
  }

  public updateLocation(newLocation: string): void {
    if (!newLocation) {
      throw new DomainError("New location cannot be null or empty.");
    }
    this._currentLocation = newLocation;
    this._lastUpdated = new Date();
  }

  public updateEstimatedDeliveryTime(newEstimatedDeliveryTime: Date): void {
    if (!newEstimatedDeliveryTime) {
      throw new DomainError("New estimated delivery time cannot be null.");
    }
    this._estimatedDeliveryTime = newEstimatedDeliveryTime;
    this._lastUpdated = new Date();
  }

  public toString(): string {
    return `DeliveryStatus { stateCode: ${this.stateCode}, shipmentId: ${this.shipmentId}, currentState: ${this._currentState}, currentLocation: ${this._currentLocation}, estimatedDeliveryTime: ${this._estimatedDeliveryTime.toISOString()}, lastUpdated: ${this._lastUpdated.toISOString()} }`;
  }
}
