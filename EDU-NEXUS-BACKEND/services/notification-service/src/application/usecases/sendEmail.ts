import { EmailRepository } from "../../domain/repositories/emailRepository";

export class SendEmailUseCase{
    constructor(private emailRepository:EmailRepository){}

    async execute(email:string,subject:string,body:string):Promise<void>{
        await this.emailRepository.sendEmail(email,subject,body)
    }
}