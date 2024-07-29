export interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profile: {
      avatar: string;
      dateOfBirth: string;
      gender: string;
    };
    contact: {
      address: string;
      phone: string;
      social: string;
    };
    qualification: string;
    isVerified: boolean;
}
  