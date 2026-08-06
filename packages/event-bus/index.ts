import { EventEmitter } from 'events';

// Internal Event Emitter for initial Module-to-Module communication
// Can be swapped out for BullMQ / Kafka later
class InternalEventBus extends EventEmitter {}

export const eventBus = new InternalEventBus();

// Example Events:
// 'USER_CREATED', 'APPOINTMENT_BOOKED', 'PAYMENT_SUCCESS'
