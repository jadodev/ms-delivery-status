"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDeliveryStatusRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
const DeliveryStatusDataMapper_1 = require("../mappers/DeliveryStatusDataMapper");
class MySQLDeliveryStatusRepository {
    async save(deliveryStatus) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        INSERT INTO DeliveryStatus 
          (stateCode, shipmentId, currentState, currentLocation, estimatedDeliveryTime, lastUpdated)
        VALUES 
          (?, ?, ?, ?, ?, ?)
      `;
            await connection.execute(sql, [
                deliveryStatus.stateCode,
                deliveryStatus.shipmentId,
                deliveryStatus.currentStatus,
                deliveryStatus.currentLocation,
                deliveryStatus.estimatedDeliveryTime.toISOString(),
                deliveryStatus.lastUpdated.toISOString(),
            ]);
        }
        finally {
            connection.release();
        }
    }
    async findByStateCode(stateCode) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        SELECT stateCode, shipmentId, currentState, currentLocation, estimatedDeliveryTime, lastUpdated
        FROM DeliveryStatus
        WHERE stateCode = ?
      `;
            const [rows] = await connection.execute(sql, [stateCode]);
            if (Array.isArray(rows) && rows.length > 0) {
                return DeliveryStatusDataMapper_1.DeliveryStatusDataMapper.toDomain(rows[0]);
            }
            return null;
        }
        finally {
            connection.release();
        }
    }
    async findByShipmentId(shipmentId) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        SELECT stateCode, shipmentId, currentState, currentLocation, estimatedDeliveryTime, lastUpdated
        FROM DeliveryStatus
        WHERE shipmentId = ?
      `;
            const [rows] = await connection.execute(sql, [shipmentId]);
            if (Array.isArray(rows) && rows.length > 0) {
                return DeliveryStatusDataMapper_1.DeliveryStatusDataMapper.toDomain(rows[0]);
            }
            return null;
        }
        finally {
            connection.release();
        }
    }
    async update(deliveryStatus) {
        const connection = await database_1.default.getConnection();
        try {
            const sql = `
        UPDATE DeliveryStatus
        SET currentState = ?, currentLocation = ?, estimatedDeliveryTime = ?, lastUpdated = ?
        WHERE stateCode = ?
      `;
            await connection.execute(sql, [
                deliveryStatus.currentStatus,
                deliveryStatus.currentLocation,
                deliveryStatus.estimatedDeliveryTime.toISOString(),
                deliveryStatus.lastUpdated.toISOString(),
                deliveryStatus.stateCode,
            ]);
        }
        finally {
            connection.release();
        }
    }
}
exports.MySQLDeliveryStatusRepository = MySQLDeliveryStatusRepository;
