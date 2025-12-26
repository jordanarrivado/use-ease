'use client';

import { useState } from 'react';
import { Plan } from '@/lib/types';
import { useApp } from '@/context/AppContext';

interface PlanFormProps {
  plan?: Plan;
  onClose: () => void;
}

export default function PlanForm({ plan, onClose }: PlanFormProps) {
  const { addPlan, updatePlan } = useApp();
  const [formData, setFormData] = useState({
    name: plan?.name || '',
    type: plan?.type || 'other' as const,
    startDate: plan?.startDate || '',
    endDate: plan?.endDate || ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) return;
    if (plan) {
      updatePlan(plan.id, formData);
    } else {
      addPlan(formData);
    }
    onClose();
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-800">Plan Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder='Enter your plan'
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-800">Type</label>
        <select
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        >
          <option value="payroll">Payroll</option>
          <option value="event">Event</option>
          <option value="maintenance">Maintenance</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {plan ? 'Update' : 'Create'} Plan
        </button>
        <button
          onClick={onClose}
          className="px-6 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
