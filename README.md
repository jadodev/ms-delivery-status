# ms-delivery-status

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
