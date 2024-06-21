import * as grpc from '@grpc/grpc-js'
import { SendEmailUseCase } from '../../application/usecases/sendEmail'
import { EmailService } from '../../infrastructure/services/emailService'


class NotificationService implements INotificationServiceServer{
    private sendEmailUsecase:SendEmailUseCase

    constructor(){
        const emailService = new EmailService()
        this.sendEmailUsecase = new SendEmailUseCase(emailService)
    }

    async sendEmail(
        call:grpc.ServerUnary.Call<EmailRequest,EmailResponse>,
        callback:grpc.sendUnaryData<EmailResponse>
    ):Promise
}