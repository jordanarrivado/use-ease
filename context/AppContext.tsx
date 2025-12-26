'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plan, Schedule, Announcement } from '@/lib/types';

interface AppContextType {
  plans: Plan[];
  schedules: Schedule[];
  announcements: Announcement[];
  addPlan: (plan: Omit<Plan, 'id'>) => void;
  updatePlan: (id: string, plan: Omit<Plan, 'id'>) => void;
  deletePlan: (id: string) => void;
  addSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  updateSchedule: (id: string, schedule: Omit<Schedule, 'id'>) => void;
  deleteSchedule: (id: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const addPlan = (plan: Omit<Plan, 'id'>) => {
    const newPlan = { ...plan, id: Date.now().toString() };
    setPlans(prev => [...prev, newPlan]);
    
    addAnnouncement({
      title: `New Plan Created: ${plan.name}`,
      content: `A new ${plan.type} plan "${plan.name}" has been created, scheduled from ${new Date(plan.startDate).toLocaleDateString()} to ${new Date(plan.endDate).toLocaleDateString()}.`,
      publishAt: new Date().toISOString(),
      isAuto: true
    });
  };

  const updatePlan = (id: string, plan: Omit<Plan, 'id'>) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...plan, id } : p));
  };

  const deletePlan = (id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
  };

  const addSchedule = (schedule: Omit<Schedule, 'id'>) => {
    const newSchedule = { ...schedule, id: Date.now().toString() };
    setSchedules(prev => [...prev, newSchedule]);
    
    addAnnouncement({
      title: `Schedule Created for ${schedule.planName}`,
      content: `A new schedule has been created for "${schedule.planName}" from ${new Date(schedule.startTime).toLocaleString()} to ${new Date(schedule.endTime).toLocaleString()}.`,
      publishAt: new Date().toISOString(),
      isAuto: true
    });
  };

  const updateSchedule = (id: string, schedule: Omit<Schedule, 'id'>) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...schedule, id } : s));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = { ...announcement, id: Date.now().toString() };
    setAnnouncements(prev => [...prev, newAnnouncement]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider value={{
      plans, schedules, announcements,
      addPlan, updatePlan, deletePlan,
      addSchedule, updateSchedule, deleteSchedule,
      addAnnouncement, deleteAnnouncement
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