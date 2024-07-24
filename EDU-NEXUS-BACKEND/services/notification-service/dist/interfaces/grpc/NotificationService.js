"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = require("../../application/usecases/sendEmail");
const emailService_1 = require("../../infrastructure/services/emailService");
class NotificationService {
    constructor() {
        const emailService = new emailService_1.EmailService();
        this.sendEmailUsecase = new sendEmail_1.SendEmailUseCase(emailService);
    }
}
