'use client';

import { useState } from 'react';
import { Schedule } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { Clock, CalendarCheck, ChevronDown, X } from 'lucide-react';

interface ScheduleFormProps {
  schedule?: Schedule;
  onClose: () => void;
}

export default function ScheduleForm({ schedule, onClose }: ScheduleFormProps) {
  const { addSchedule, updateSchedule, plans } = useApp();
  const [formData, setFormData] = useState({
    planName: schedule?.planName || '',
    startTime: schedule?.startTime || '',
    endTime: schedule?.endTime || '',
    status: schedule?.status || ('scheduled' as const)
  });

  const handleSubmit = () => {
    if (!formData.planName || !formData.startTime || !formData.endTime) return;
    if (schedule) updateSchedule(schedule.id, formData);
    else addSchedule(formData);
    onClose();
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border outline-none
    transition-all duration-200 cursor-pointer
    bg-white dark:bg-slate-950
    border-slate-200 dark:border-slate-800
    text-slate-900 dark:text-slate-100
    focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500
    dark:focus:ring-indigo-500/20 dark:focus:border-indigo-400
  `;

  const labelClasses = "block text-[10px] uppercase tracking-[0.12em] font-bold text-slate-500 dark:text-slate-500 mb-1.5 ml-1";

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="p-8 space-y-7">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <CalendarCheck className="text-indigo-500" size={24} />
            </div>
            {schedule ? 'Edit Schedule' : 'New Schedule'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-1">
            Assign a plan to a specific time slot.
          </p>
        </div>

        <div className="space-y-5">
          {/* Plan Selection */}
          <div>
            <label className={labelClasses}>Select Target Plan</label>
            <div className="relative">
              <select
                value={formData.planName}
                onChange={e => setFormData({ ...formData, planName: e.target.value })}
                className={`${inputClasses} appearance-none pr-10`}
              >
                <option value="" className="dark:bg-slate-900">Choose a plan...</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.name} className="dark:bg-slate-900">
                    {plan.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={18} />
            </div>
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Start Time</label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>End Time</label>
              <input
                type="datetime-local"
                value={formData.endTime}
                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className={labelClasses}>Current Status</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className={`${inputClasses} appearance-none pr-10`}
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                 <div className={`w-2 h-2 rounded-full ${formData.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-[2] bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                       text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/20
                       active:scale-[0.97] transition-all"
          >
            {schedule ? 'Update Entry' : 'Confirm Schedule'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 border border-slate-200 dark:border-slate-800
                       text-slate-600 dark:text-slate-400 rounded-2xl font-semibold
                       hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}