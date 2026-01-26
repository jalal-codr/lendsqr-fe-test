export type UserStatus =
  | "Active"
  | "Inactive"
  | "Pending"
  | "Blacklisted";

export interface UserSummary {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
}

export interface UserDetails {
  id: string;

  profile: {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    bvn: string;
    gender: "Male" | "Female";
    maritalStatus: string;
    children: string;
    residence: string;
  };

  account: {
    tier: 1 | 2 | 3;
    balance: number;
    accountNumber: string;
    bankName: string;
  };

  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: {
      min: number;
      max: number;
    };
    loanRepayment: number;
  };

  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };

  guarantors: Array<{
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  }>;

  status: UserStatus;
  dateJoined: string;
  organization: string;
}

export interface GetUsersParams {
  page: number;
  limit: number;
};