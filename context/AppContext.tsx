'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plan, Schedule, Announcement } from '@/lib/types';

export type ScheduleWithId = Schedule & { id: string };

interface AppContextType {
  plans: Plan[];
  schedules: ScheduleWithId[];
  announcements: Announcement[];
  addPlan: (plan: Omit<Plan, 'id'>) => void;
  updatePlan: (id: string, plan: Omit<Plan, 'id'>) => void;
  deletePlan: (id: string) => void;
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (id: string, schedule: Schedule) => void;
  deleteSchedule: (id: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [schedules, setSchedules] = useState<ScheduleWithId[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = { 
      ...announcement, 
      id: `announ-${Date.now()}-${Math.random().toString(36).substr(2, 5)}` 
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };
  const addPlan = (plan: Omit<Plan, 'id'>) => {
    const newPlan = { ...plan, id: `plan-${Date.now()}` };
    setPlans(prev => [...prev, newPlan]);
    
    addAnnouncement({
      title: `Plan Created: ${plan.name}`,
      content: `New ${plan.type} plan active from ${new Date(plan.startDate).toLocaleDateString()}.`,
      publishAt: new Date().toISOString(),
      isAuto: true
    });
  };

  const updatePlan = (id: string, updatedFields: Omit<Plan, 'id'>) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...updatedFields, id } : p));
  };

  const deletePlan = (id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
  };

  const addSchedule = (schedule: Schedule) => {
    const id = `sched-${Date.now()}`;
    const newSchedule: ScheduleWithId = {
      ...schedule,
      id,
      assignees: schedule.assignees || [],
    };

    setSchedules(prev => [...prev, newSchedule]);
    
    addAnnouncement({
      title: `New Schedule: ${schedule.title}`,
      content: `New event set for ${schedule.date ? new Date(schedule.date).toLocaleString() : 'TBD'}${schedule.location ? ` at ${schedule.location}` : ''}.`,
      publishAt: new Date().toISOString(),
      isAuto: true
    });
  };

  const updateSchedule = (id: string, schedule: Schedule) => {
    setSchedules(prev => prev.map(s => (s.id === id ? { ...schedule, id } : s)));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  return (
    <AppContext.Provider value={{
      plans, 
      schedules, 
      announcements,
      addPlan, 
      updatePlan, 
      deletePlan,
      addSchedule, 
      updateSchedule, 
      deleteSchedule,
      addAnnouncement, 
      deleteAnnouncement
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}