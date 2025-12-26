// lib/types.ts - Updated types

export interface Plan {
  id: string;
  name: string;
  type: 'payroll' | 'event' | 'maintenance' | 'other';
  startDate: string;
  endDate: string;
}

export interface Member {
  name: string;
  age: number;
  department: string;
}

export interface Assignee {
  id: string;
  roleName: string;
  member: Member | null;
}

export interface BackgroundSettings {
  image?: string; 
  gradient?: string; 
  overlay?: {
    color: string;
    opacity: number;
  };
  filter?: string; 
}

export interface Schedule {
  id: string;
  title: string;  
  date: string;   
  status: 'scheduled' | 'completed';
  assignees?: Assignee[];
  background?: BackgroundSettings;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishAt: string;
  isAuto: boolean;
}