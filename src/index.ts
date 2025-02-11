import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import pool from './infrastructure/config/database';
import { connectKafka } from './infrastructure/config/messageBroker';
import { KafkaProducer } from './infrastructure/messaging/KafkaProducer';
import { EventPublisher } from './infrastructure/messaging/EventPublisher';
import { KafkaConsumer } from './infrastructure/messaging/KafkaConsumer';
import { ShipmentCreatedConsumer } from './infrastructure/messaging/ShipmentCreatedConsumer';
import { MySQLDeliveryStatusRepository } from './infrastructure/repository/MySQLDeliveryStatusRepository';
import { DeliveryStatusDomainService } from './domain/service/DeliveryStatusDomainService';
import { CreateDeliveryStatusService } from './application/services/CreateDeliveryStatusService';
import { QueryDeliveryStatusService } from './application/services/QueryDeliveryStatusService';
import { UpdateDeliveryStatusService } from './application/services/UpdateDeliveryStatusService';
import { createDeliveryStatusController } from './infrastructure/controller//DeliveryStatusController';
import { setupSwagger } from './infrastructure/swagger/swaggerConfig';

async function main() {
  try {
    await connectKafka();
    console.log("Kafka connected.");

    const connection = await pool.getConnection();
    console.log("MySQL connected.");
    connection.release();

    const kafkaProducer = new KafkaProducer();
    const eventPublisher = new EventPublisher(kafkaProducer);
    const kafkaConsumer = new KafkaConsumer();

    const deliveryStatusRepository = new MySQLDeliveryStatusRepository();

    const deliveryStatusDomainService = new DeliveryStatusDomainService();

    const createDeliveryStatusService = new CreateDeliveryStatusService(
      deliveryStatusDomainService,
      deliveryStatusRepository,
      eventPublisher
    );
    const queryDeliveryStatusService = new QueryDeliveryStatusService(deliveryStatusRepository);
    const updateDeliveryStatusService = new UpdateDeliveryStatusService(
      deliveryStatusRepository,
      deliveryStatusDomainService,
      eventPublisher
    );

    const shipmentCreatedConsumer = new ShipmentCreatedConsumer(
      kafkaConsumer,
      deliveryStatusRepository,
      deliveryStatusDomainService
    );
    shipmentCreatedConsumer.start().catch(err => {
      console.error("Error starting ShipmentCreatedConsumer:", err);
    });

    const app: Application = express();
    app.use(express.json());

    const deliveryStatusRouter = createDeliveryStatusController(
      createDeliveryStatusService,
      queryDeliveryStatusService,
      updateDeliveryStatusService
    );
    app.use("/api", deliveryStatusRouter);
    setupSwagger(app)

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

main();
