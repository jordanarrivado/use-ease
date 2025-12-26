'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ReminderAlert() {
  const { plans, schedules } = useApp();
  const [reminders, setReminders] = useState<string[]>([]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const upcoming: string[] = [];
      const reminderWindow = 24 * 60 * 60 * 1000;

      plans.forEach(plan => {
        const startDate = new Date(plan.startDate);
        const diff = startDate.getTime() - now.getTime();
        if (diff > 0 && diff <= reminderWindow) {
          upcoming.push(`Plan "${plan.name}" starts ${startDate.toLocaleDateString()}`);
        }
      });

      schedules.forEach(schedule => {
        if (schedule.status === 'scheduled') {
          const startTime = new Date(schedule.startTime);
          const diff = startTime.getTime() - now.getTime();
          if (diff > 0 && diff <= reminderWindow) {
            upcoming.push(`Schedule for "${schedule.planName}" starts ${startTime.toLocaleString()}`);
          }
        }
      });

      setReminders(upcoming);
    };

    checkReminders();
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [plans, schedules]);

  if (reminders.length === 0) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Bell className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900 mb-2">Upcoming Reminders</h3>
          <ul className="space-y-1">
            {reminders.map((reminder, idx) => (
              <li key={idx} className="text-sm text-yellow-800">{reminder}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}