export interface WorkDay {
  isOpen: boolean;
  from: string;
  to: string;
}

export interface Friend {
  _id: string;
  title: string;
  url: string;
  addressUrl?: string;
  imageUrl: string;
  address?: string;
  phone?: string;
  email?: string;
  workDays: WorkDay[];
}