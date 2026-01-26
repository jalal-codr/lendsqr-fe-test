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
  organization: string;
  username: string; 
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;

  profile: {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: number;
    residence: string;
  };

  account: {
    tier: number;
    balance: number;
    accountNumber: number;
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

  guarantors: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}
export interface GetUsersParams {
  page: number;
  limit: number;
}

export interface PaginatedUsersResponse {
  data: UserDetails[];
  total: number;
}