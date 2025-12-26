'use client';

import { useState } from 'react';
import { Schedule } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { CalendarCheck, ChevronDown, X, Plus, Trash2, Users } from 'lucide-react';

interface Member {
  name: string;
  age: number;
  department: string;
}

interface Assignee {
  id: string;
  roleName: string;
  member: Member | null;
}

interface ScheduleFormProps {
  schedule?: Schedule;
  onClose: () => void;
}

// Dummy members data
const MEMBERS: Member[] = [
  {
    name: "Jordan Arrivado Jr",
    age: 23,
    department: "youth"
  },
  {
    name: "Jordan Arrivado Sr",
    age: 33,
    department: "mens"
  },
  {
    name: "Hanna",
    age: 33,
    department: "ladies"
  }
];

export default function ScheduleForm({ schedule, onClose }: ScheduleFormProps) {
  const { addSchedule, updateSchedule } = useApp();
  const [formData, setFormData] = useState({
    title: schedule?.title || '',
    date: schedule?.date || '',
    status: schedule?.status || ('scheduled' as const)
  });

  const [assignees, setAssignees] = useState<Assignee[]>(
    schedule?.assignees || [{ id: '1', roleName: '', member: null }]
  );

  const handleSubmit = () => {
    if (!formData.title || !formData.date) return;
    
    const scheduleData = {
      ...formData,
      assignees: assignees.filter(a => a.roleName && a.member)
    };
    
    if (schedule) updateSchedule(schedule.id, scheduleData);
    else addSchedule(scheduleData);
    onClose();
  };

  const addAssignee = () => {
    setAssignees([...assignees, { 
      id: Date.now().toString(), 
      roleName: '', 
      member: null 
    }]);
  };

  const removeAssignee = (id: string) => {
    setAssignees(assignees.filter(a => a.id !== id));
  };

  const updateAssignee = (id: string, field: 'roleName' | 'member', value: any) => {
    setAssignees(assignees.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border outline-none
    transition-all duration-200
    bg-white dark:bg-slate-950
    border-slate-200 dark:border-slate-800
    text-slate-900 dark:text-slate-100
    focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500
    dark:focus:ring-indigo-500/20 dark:focus:border-indigo-400
  `;

  const labelClasses = "block text-[10px] uppercase tracking-[0.12em] font-bold text-slate-500 dark:text-slate-500 mb-1.5 ml-1";

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
      >
        <X size={20} />
      </button>

      <div className="p-8 space-y-7 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <CalendarCheck className="text-indigo-500" size={24} />
            </div>
            {schedule ? 'Edit Schedule' : 'New Schedule'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-1">
            Create a schedule and delegate roles to members.
          </p>
        </div>

        <div className="space-y-5">
          {/* Schedule Title */}
          <div>
            <label className={labelClasses}>Schedule Title</label>
            <input
              type="text"
              placeholder="e.g., Sunday Morning Service, Youth Night..."
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className={inputClasses}
            />
          </div>

          {/* Date Selection */}
          <div>
            <label className={labelClasses}>Schedule Date & Time</label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className={inputClasses}
            />
          </div>

          {/* Status Selection */}
          <div>
            <label className={labelClasses}>Current Status</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                 <div className={`w-2 h-2 rounded-full ${formData.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
              </div>
            </div>
          </div>

          {/* Assignees Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className={labelClasses}>Role Assignments</label>
              <button
                type="button"
                onClick={addAssignee}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 
                          hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
              >
                <Plus size={14} />
                Add Role
              </button>
            </div>

            <div className="space-y-3">
              {assignees.map((assignee) => (
                <div 
                  key={assignee.id}
                  className="relative p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3"
                >
                  {assignees.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAssignee(assignee.id)}
                      className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    {/* Role Name */}
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1 ml-1">
                        Role/Position
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Worship Leader, Usher..."
                        value={assignee.roleName}
                        onChange={e => updateAssignee(assignee.id, 'roleName', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                                 bg-white dark:bg-slate-900 text-sm
                                 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      />
                    </div>

                    {/* Member Selection */}
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1 ml-1">
                        Assign Member
                      </label>
                      <div className="relative">
                        <select
                          value={assignee.member ? assignee.member.name : ''}
                          onChange={e => {
                            const selectedMember = MEMBERS.find(m => m.name === e.target.value) || null;
                            updateAssignee(assignee.id, 'member', selectedMember);
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                                   bg-white dark:bg-slate-900 text-sm appearance-none pr-8
                                   focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none cursor-pointer"
                        >
                          <option value="">Select member...</option>
                          {MEMBERS.map(member => (
                            <option key={member.name} value={member.name}>
                              {member.name} ({member.department})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Member Details Badge */}
                  {assignee.member && (
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg">
                      <Users size={12} />
                      <span className="font-medium">{assignee.member.name}</span>
                      <span className="text-slate-400">•</span>
                      <span>Age {assignee.member.age}</span>
                      <span className="text-slate-400">•</span>
                      <span className="capitalize">{assignee.member.department}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {assignees.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-500">
                No roles assigned yet. Click "Add Role" to get started.
              </div>
            )}
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
            {schedule ? 'Update Schedule' : 'Confirm Schedule'}
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