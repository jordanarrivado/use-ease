'use client';

import { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2 } from 'lucide-react';
import { Plan } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import ReminderAlert from '@/components/ReminderAlert';
import Modal from '@/components/Modal';
import PlanForm from '@/components/PlanForm';

export default function PlansPage() {
  const { plans, deletePlan } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | undefined>();

  return (
    <div className="bg-white min-h-screen p-6">
      <ReminderAlert />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Plans</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Plan
        </button>
      </div>

      <div className="grid gap-4">
        {plans.length === 0 ? (
          <div className="text-center py-12 bg-gray-100 rounded-lg border border-gray-200">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700">No plans yet. Create your first plan!</p>
          </div>
        ) : (
          plans.map(plan => (
            <div
              key={plan.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {plan.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(plan.startDate).toLocaleDateString()}
                    </span>
                    <span>→</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(plan.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingPlan(plan);
                      setShowForm(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingPlan(undefined);
        }}
        title={editingPlan ? 'Edit Plan' : 'Create New Plan'}
      >
        <PlanForm
          plan={editingPlan}
          onClose={() => {
            setShowForm(false);
            setEditingPlan(undefined);
          }}
        />
      </Modal>
    </div>
  );
}
