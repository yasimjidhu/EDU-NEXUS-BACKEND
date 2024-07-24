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
exports.runCourseEventConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const emailService_1 = require("../services/emailService");
const kafka = new kafkajs_1.Kafka({
    clientId: 'content-service',
    brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'notification-group' });
const emailService = new emailService_1.EmailService();
const runCourseEventConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield consumer.connect();
        yield consumer.subscribe({ topic: 'course-approval', fromBeginning: true });
        yield consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c;
                try {
                    const { email, action, courseName } = JSON.parse((_c = (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '{}');
                    console.log('recieved message', email, 'action', action, 'courseName', courseName);
                    if (action === 'approve') {
                        yield emailService.sendCourseApprovalEmail(email, courseName);
                        console.log('course approval email sent as notification', email);
                    }
                    else if (action === 'reject') {
                        yield emailService.sendCourseRejectionEmail(email, courseName);
                    }
                    else {
                        console.warn('Unknown action created', action);
                    }
                    yield consumer.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
                }
                catch (error) {
                    console.log('Error processing message', error);
                }
            })
        });
        console.log('consumer run started');
    }
    catch (error) {
        console.log('error in consumer setup', error);
    }
});
exports.runCourseEventConsumer = runCourseEventConsumer;
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
