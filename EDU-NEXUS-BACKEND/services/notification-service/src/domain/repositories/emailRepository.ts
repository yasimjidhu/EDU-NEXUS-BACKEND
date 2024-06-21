export interface EmailRepository{
    sendApprovalEmail(email:string):Promise<void>
}