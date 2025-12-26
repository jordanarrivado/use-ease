'use client';

import { useState } from 'react';
import { Plan } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { Calendar, Tag, Plus, Check, X } from 'lucide-react';

interface PlanFormProps {
  plan?: Plan;
  onClose: () => void;
}

export default function PlanForm({ plan, onClose }: PlanFormProps) {
  const { addPlan, updatePlan } = useApp();
  const [formData, setFormData] = useState({
    name: plan?.name || '',
    type: plan?.type || ('other' as const),
    startDate: plan?.startDate || '',
    endDate: plan?.endDate || '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) return;
    if (plan) updatePlan(plan.id, formData);
    else addPlan(formData);
    onClose();
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border outline-none
    transition-all duration-200
    bg-white dark:bg-slate-950
    border-slate-200 dark:border-slate-800
    text-slate-900 dark:text-slate-100
    placeholder:text-slate-400 dark:placeholder:text-slate-600
    focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
    dark:focus:ring-blue-500/20 dark:focus:border-blue-400
  `;

  const labelClasses =
    'block text-[10px] uppercase tracking-[0.12em] font-bold text-slate-500 dark:text-slate-500 mb-1.5 ml-1';

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="p-8 space-y-7">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <div className={`p-2 rounded-lg ${plan ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
              {plan ? <Check className="text-green-500" size={24} /> : <Plus className="text-blue-500" size={24} />}
            </div>
            {plan ? 'Update Plan' : 'New Strategic Plan'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-1">
            Specify the timeline and category for this initiative.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Plan Name */}
          <div>
            <label className={labelClasses}>Plan Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Q1 Marketing Campaign"
              className={inputClasses}
            />
          </div>

          {/* Plan Type */}
          <div>
            <label className={labelClasses}>Category</label>
            <div className="relative">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
              >
                <option value="payroll">Payroll Management</option>
                <option value="event">Corporate Event</option>
                <option value="maintenance">System Maintenance</option>
                <option value="other">Other Projects</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600">
                <Tag size={16} />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`${inputClasses} cursor-pointer`}
              />
            </div>
            <div>
              <label className={labelClasses}>End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={`${inputClasses} cursor-pointer`}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-[2] bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                       text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20
                       active:scale-[0.97] transition-all"
          >
            {plan ? 'Update Schedule' : 'Launch New Plan'}
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