// lib/types.ts

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

// Updated to match your Editor's state structure
export interface BackgroundSettings {
  image?: string;
  gradient: {
    type: string;
    angle: number;
    color1: string;
    color2: string;
    stop1: number;
    stop2: number;
  };
  overlay: {
    color: string;
    opacity: number;
  };
  filters: {
    brightness: number;
    contrast: number;
    blur: number;
  };
}

export interface TextSettings {
  title: {
    color: string;
    fontSize: number;
    align: 'left' | 'center' | 'right';
    fontFamily: string;
  };
  content: {
    color: string;
    opacity: number;
    align: 'left' | 'center' | 'right';
  };
}

export interface Schedule {
  id: string;
  title: string;
  date: string;
  status: 'scheduled' | 'completed';
  assignees?: Assignee[];
  background?: BackgroundSettings; 
  textSettings?: TextSettings;    
  aspectRatio?: string;          
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishAt: string;
  isAuto: boolean;
}