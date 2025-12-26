export interface Plan {
  id: string;
  name: string;
  type: 'payroll' | 'event' | 'maintenance' | 'other';
  startDate: string;
  endDate: string;
}

export interface Schedule {
  id: string;
  planName: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishAt: string;
  isAuto: boolean;
}