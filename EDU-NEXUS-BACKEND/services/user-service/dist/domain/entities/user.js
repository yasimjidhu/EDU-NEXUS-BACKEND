export class UserEntity {
    constructor(firstName, lastName, 
    // public userName: string,
    email, password, role, profile, gender, contact, qualification, cv // Making cv optional
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profile = profile;
        this.gender = gender;
        this.contact = contact;
        this.qualification = qualification;
        this.cv = cv;
        this.profit = 0;
        this.isBlocked = false;
        this.isVerified = false;
        this.isGAuth = false;
        this.isRejected = false;
    }
}
