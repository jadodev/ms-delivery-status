"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./infrastructure/config/database"));
const messageBroker_1 = require("./infrastructure/config/messageBroker");
const KafkaProducer_1 = require("./infrastructure/messaging/KafkaProducer");
const EventPublisher_1 = require("./infrastructure/messaging/EventPublisher");
const KafkaConsumer_1 = require("./infrastructure/messaging/KafkaConsumer");
const ShipmentCreatedConsumer_1 = require("./infrastructure/messaging/ShipmentCreatedConsumer");
const MySQLDeliveryStatusRepository_1 = require("./infrastructure/repository/MySQLDeliveryStatusRepository");
const DeliveryStatusDomainService_1 = require("./domain/service/DeliveryStatusDomainService");
const CreateDeliveryStatusService_1 = require("./application/services/CreateDeliveryStatusService");
const QueryDeliveryStatusService_1 = require("./application/services/QueryDeliveryStatusService");
const UpdateDeliveryStatusService_1 = require("./application/services/UpdateDeliveryStatusService");
const DeliveryStatusController_1 = require("./infrastructure/controller//DeliveryStatusController");
const swaggerConfig_1 = require("./infrastructure/swagger/swaggerConfig");
async function main() {
    try {
        await (0, messageBroker_1.connectKafka)();
        console.log("Kafka connected.");
        const connection = await database_1.default.getConnection();
        console.log("MySQL connected.");
        connection.release();
        const kafkaProducer = new KafkaProducer_1.KafkaProducer();
        const eventPublisher = new EventPublisher_1.EventPublisher(kafkaProducer);
        const kafkaConsumer = new KafkaConsumer_1.KafkaConsumer();
        const deliveryStatusRepository = new MySQLDeliveryStatusRepository_1.MySQLDeliveryStatusRepository();
        const deliveryStatusDomainService = new DeliveryStatusDomainService_1.DeliveryStatusDomainService();
        const createDeliveryStatusService = new CreateDeliveryStatusService_1.CreateDeliveryStatusService(deliveryStatusDomainService, deliveryStatusRepository, eventPublisher);
        const queryDeliveryStatusService = new QueryDeliveryStatusService_1.QueryDeliveryStatusService(deliveryStatusRepository);
        const updateDeliveryStatusService = new UpdateDeliveryStatusService_1.UpdateDeliveryStatusService(deliveryStatusRepository, deliveryStatusDomainService, eventPublisher);
        const shipmentCreatedConsumer = new ShipmentCreatedConsumer_1.ShipmentCreatedConsumer(kafkaConsumer, deliveryStatusRepository, deliveryStatusDomainService);
        shipmentCreatedConsumer.start().catch(err => {
            console.error("Error starting ShipmentCreatedConsumer:", err);
        });
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        const deliveryStatusRouter = (0, DeliveryStatusController_1.createDeliveryStatusController)(createDeliveryStatusService, queryDeliveryStatusService, updateDeliveryStatusService);
        app.use("/api", deliveryStatusRouter);
        (0, swaggerConfig_1.setupSwagger)(app);
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Error starting application:", error);
        process.exit(1);
    }
}
main();
