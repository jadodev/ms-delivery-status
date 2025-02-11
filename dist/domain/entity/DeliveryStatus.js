"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatus = void 0;
const DomainError_1 = require("../exception/DomainError");
/**
 * Representa el estado dinamico asociado a un paquete.
 * Esto rastrea el estado actual, localización y estama el tiempo de llegada.
 */
class DeliveryStatus {
    /**
     * Constructor privado para forzar el uso de métodos de fábrica o de rehidratación.
     */
    constructor(stateCode, shipmentId, currentState, currentLocation, estimatedDeliveryTime, lastUpdated) {
        this.stateCode = stateCode;
        this.shipmentId = shipmentId;
        this._currentState = currentState;
        this._currentLocation = currentLocation;
        this._estimatedDeliveryTime = estimatedDeliveryTime;
        this._lastUpdated = lastUpdated;
    }
    /**
     * Factory method para crear una nueva instancia que por defecto esta en "espera"..
     */
    static create(shipmentId, currentLocation, estimatedDeliveryTime, initialState = "En espera") {
        const stateCode = `DS-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        return new DeliveryStatus(stateCode, shipmentId, initialState, currentLocation, estimatedDeliveryTime, new Date());
    }
    /**
     * Actualiza el estedo de llegada y lo persiste.
     */
    static fromPersistence(row) {
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
                throw new DomainError_1.DomainError(`Missing field '${field}' in persistence record.`);
            }
        }
        return new DeliveryStatus(row.stateCode, row.shipmentId, row.currentState, row.currentLocation, new Date(row.estimatedDeliveryTime), new Date(row.lastUpdated));
    }
    get currentStatus() {
        return this._currentState;
    }
    get currentLocation() {
        return this._currentLocation;
    }
    get estimatedDeliveryTime() {
        return this._estimatedDeliveryTime;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    updateState(newState) {
        if (!newState) {
            throw new DomainError_1.DomainError("New state cannot be null or empty.");
        }
        this._currentState = newState;
        this._lastUpdated = new Date();
    }
    updateLocation(newLocation) {
        if (!newLocation) {
            throw new DomainError_1.DomainError("New location cannot be null or empty.");
        }
        this._currentLocation = newLocation;
        this._lastUpdated = new Date();
    }
    updateEstimatedDeliveryTime(newEstimatedDeliveryTime) {
        if (!newEstimatedDeliveryTime) {
            throw new DomainError_1.DomainError("New estimated delivery time cannot be null.");
        }
        this._estimatedDeliveryTime = newEstimatedDeliveryTime;
        this._lastUpdated = new Date();
    }
    toString() {
        return `DeliveryStatus { stateCode: ${this.stateCode}, shipmentId: ${this.shipmentId}, currentState: ${this._currentState}, currentLocation: ${this._currentLocation}, estimatedDeliveryTime: ${this._estimatedDeliveryTime.toISOString()}, lastUpdated: ${this._lastUpdated.toISOString()} }`;
    }
}
exports.DeliveryStatus = DeliveryStatus;
