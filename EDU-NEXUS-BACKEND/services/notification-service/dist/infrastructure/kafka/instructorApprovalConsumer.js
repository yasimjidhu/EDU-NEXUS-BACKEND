"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const kafkajs_1 = require("kafkajs");
const emailService_1 = require("../services/emailService");
const kafka = new kafkajs_1.Kafka({
    clientId: 'user-service',
    brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'notification-group' });
const emailService = new emailService_1.EmailService();
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Connecting consumer...');
        yield consumer.connect();
        console.log('Consumer connected');
        console.log('Subscribing to topic...');
        yield consumer.subscribe({ topic: 'instructor-approval', fromBeginning: true });
        console.log('Subscribed to topic');
        console.log('Starting consumer run...');
        yield consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c;
                try {
                    const { email, courseName, action } = JSON.parse((_c = (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '{}');
                    console.log('Received message:', email, 'Action:', action);
                    if (action === 'approve') {
                        yield emailService.sendCourseApprovalEmail(email, courseName);
                        console.log('Approval email sent as notification:', email);
                    }
                    else if (action === 'reject') {
                        yield emailService.sendCourseRejectionEmail(email, courseName);
                        console.log('Rejection email sent as notification:', email);
                    }
                    else {
                        console.warn('Unknown action received:', action);
                    }
                    yield consumer.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
                }
                catch (error) {
                    console.error('Error processing message', error);
                }
            })
        });
        console.log('Consumer run started');
    }
    catch (error) {
        console.error('Error in consumer setup', error);
    }
});
exports.run = run;
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Disconnecting consumer...');
        yield consumer.disconnect();
        console.log('Consumer disconnected');
    }
    catch (error) {
        console.error('Error during shutdown', error);
    }
    finally {
        process.exit();
    }
});
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
