'use client';

import { useState } from 'react';
import { Schedule } from '@/lib/types';
import { useApp } from '@/context/AppContext';

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
    status: schedule?.status || 'scheduled' as const
  });

  const handleSubmit = () => {
    if (!formData.planName || !formData.startTime || !formData.endTime) return;
    if (schedule) {
      updateSchedule(schedule.id, formData);
    } else {
      addSchedule(formData);
    }
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Select Plan</label>
        <select
          value={formData.planName}
          onChange={e => setFormData({ ...formData, planName: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a plan...</option>
          {plans.map(plan => (
            <option key={plan.id} value={plan.name}>{plan.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={formData.startTime}
            onChange={e => setFormData({ ...formData, startTime: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="datetime-local"
            value={formData.endTime}
            onChange={e => setFormData({ ...formData, endTime: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value as any })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {schedule ? 'Update' : 'Create'} Schedule
        </button>
        <button
          onClick={onClose}
          className="px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}