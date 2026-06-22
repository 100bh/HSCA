export interface UserProfile {
  name: string;
  uid: string;
  email: string;
  phone: string;
  campus: string;
  linkedUpi: string;
  bankAccount: string;
  ifscCode: string;
  isUpiLinked: boolean;
  avatarUrl?: string;
  level: 'Standard' | 'Elite' | 'Pro Master';
}

export interface BookingCommission {
  id: string;
  date: string;
  propertyName: string;
  tenantInitial: string;
  amount: number;
  status: 'Verified' | 'Pending';
}

export interface SupportTicket {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
  status: 'Open' | 'Resolved' | 'In Progress';
}

export interface DailyEarning {
  date: string;
  earnings: number;
}
