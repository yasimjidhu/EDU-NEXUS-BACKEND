export class User{
    constructor(
        public id? : string,
        public username? : string,
        public email? : string,
        public hashedPassword? : string,
        public googleId?:string
    ){}
}   