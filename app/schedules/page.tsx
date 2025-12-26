'use client';

import { useState } from 'react';
import { Clock, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { Schedule } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import ReminderAlert from '@/components/ReminderAlert';
import Modal from '@/components/Modal';
import ScheduleForm from '@/components/ScheduleForm';

export default function SchedulesPage() {
  const { schedules, deleteSchedule } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>();

  return (
    <div>
      <ReminderAlert />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Schedules</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Schedule
        </button>
      </div>

      <div className="grid gap-4">
        {schedules.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No schedules yet. Create your first schedule!</p>
          </div>
        ) : (
          schedules.map(schedule => (
            <div key={schedule.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{schedule.planName}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      schedule.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {schedule.status === 'completed' ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </span>
                      ) : (
                        'Scheduled'
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(schedule.startTime).toLocaleString()}
                    </span>
                    <span>→</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(schedule.endTime).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingSchedule(schedule);
                      setShowForm(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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
          setEditingSchedule(undefined);
        }}
        title={editingSchedule ? 'Edit Schedule' : 'Create New Schedule'}
      >
        <ScheduleForm
          schedule={editingSchedule}
          onClose={() => {
            setShowForm(false);
            setEditingSchedule(undefined);
          }}
        />
      </Modal>
    </div>
  );
}
