import pool from "../config/database";
import { IDeliveryStatusRepository } from "../../application/ports/out/IDeliveryStatusRepository";
import { DeliveryStatus } from "../../domain/entity/DeliveryStatus";
import { DeliveryStatusDataMapper } from "../mappers/DeliveryStatusDataMapper";

export class MySQLDeliveryStatusRepository implements IDeliveryStatusRepository {
  public async save(deliveryStatus: DeliveryStatus): Promise<void> {
    const connection = await pool.getConnection();
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
    } finally {
      connection.release();
    }
  }

  public async findByStateCode(stateCode: string): Promise<DeliveryStatus | null> {
    const connection = await pool.getConnection();
    try {
      const sql = `
        SELECT stateCode, shipmentId, currentState, currentLocation, estimatedDeliveryTime, lastUpdated
        FROM DeliveryStatus
        WHERE stateCode = ?
      `;
      const [rows]: any = await connection.execute(sql, [stateCode]);
      if (Array.isArray(rows) && rows.length > 0) {
        return DeliveryStatusDataMapper.toDomain(rows[0]);
      }
      return null;
    } finally {
      connection.release();
    }
  }

  public async findByShipmentId(shipmentId: string): Promise<DeliveryStatus | null> {
    const connection = await pool.getConnection();
    try {
      const sql = `
        SELECT stateCode, shipmentId, currentState, currentLocation, estimatedDeliveryTime, lastUpdated
        FROM DeliveryStatus
        WHERE shipmentId = ?
      `;
      const [rows]: any = await connection.execute(sql, [shipmentId]);
      if (Array.isArray(rows) && rows.length > 0) {
        return DeliveryStatusDataMapper.toDomain(rows[0]);
      }
      return null;
    } finally {
      connection.release();
    }
  }

  public async update(deliveryStatus: DeliveryStatus): Promise<void> {
    const connection = await pool.getConnection();
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
    } finally {
      connection.release();
    }
  }
}
