export type Job = {
  id: string;
  title: string;
  employer: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  hours: string;
  salary: string;
  schedule?: string;
  requirements?: string[] | string;
  responsibilities?: string[] | string;
  aboutRole?: string;
  contact?: {
    messenger?: string;
    email?: string;
    phone?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}; 