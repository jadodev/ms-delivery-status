# ms-delivery-status

## Documentación de la API con Swagger

La aplicación incluye documentación interactiva de la API generada con Swagger. Una vez que la aplicación esté en ejecución, puedes acceder a la documentación abriendo tu navegador y navegando a:

**http://localhost:4000/api-doc**

Asegúrate de que la aplicación se esté ejecutando en el puerto configurado para Swagger.

```plaintext
\---src
    |   index.ts
    |
    +---application
    |   +---dto
    |   |       CreateDeliveryStatusDto.ts
    |   |       DeliveryStatusDto.ts
    |   |       QueryDeliveryStatusDto.ts
    |   |       UpdateDeliveryStatusDto.ts
    |   |
    |   +---mappers
    |   |       DeliveryStatusMapper.ts
    |   |
    |   +---ports
    |   |   +---in
    |   |   |       ICreateDeliveryStatusUseCase.ts
    |   |   |       IQueryDeliveryStatusUseCase.ts
    |   |   |       IUpdateDeliveryStatusUseCase.ts
    |   |   |
    |   |   \---out
    |   |           IDeliveryStatusRepository.ts
    |   |
    |   \---services
    |           CreateDeliveryStatusService.ts
    |           QueryDeliveryStatusService.ts
    |           UpdateDeliveryStatusService.ts
    |
    +---domain
    |   +---entity
    |   |       DeliveryStatus.ts
    |   |
    |   +---exception
    |   |       DomainError.ts
    |   |
    |   +---ports
    |   |   +---in
    |   |   |       ICreateDeliveryStatusUseCase.ts
    |   |   |       IQueryDeliveryStatusUseCase.ts
    |   |   |       IUpdateDeliveryStatusUseCase.ts
    |   |   |
    |   |   \---out
    |   |           IDeliveryStatusRepository.ts
    |   |
    |   \---service
    |           DeliveryStatusDomainService.ts
    |
    \---infrastructure
        +---config
        |       database.ts
        |       messageBroker.ts
        |
        +---controller
        |       DeliveryStatusController.ts
        |
        +---mappers
        |       DeliveryStatusDataMapper.ts
        |
        +---messaging
        |       EventPublisher.ts
        |       KafkaConsumer.ts
        |       KafkaProducer.ts
        |       ShipmentCreatedConsumer.ts
        |
        +---repository
        |       MySQLDeliveryStatusRepository.ts
        |
        \---swagger
                swaggerConfig.ts
