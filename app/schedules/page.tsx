'use client';

import { useState } from 'react';
import { Clock, Plus, Edit2, Trash2, CheckCircle, Users, User, Eye, Calendar, Sparkles } from 'lucide-react';
import { Schedule } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import ReminderAlert from '@/components/ReminderAlert';
import Modal from '@/components/Modal';
import ScheduleForm from '@/components/ScheduleForm';
import SchedulePosterEditor from '@/components/SchedulePosterEditor';

export default function SchedulesPage() {
  const { schedules, deleteSchedule, updateSchedule } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>();
  const [previewSchedule, setPreviewSchedule] = useState<Schedule | undefined>();

  const handleSavePosterSettings = (scheduleId: string, posterData: any) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (schedule) {
      updateSchedule(scheduleId, { 
        ...schedule, 
        background: posterData.backgroundSettings,
        textSettings: posterData.textSettings,
        aspectRatio: posterData.aspectRatio 
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 pb-24">
      <ReminderAlert />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
            Schedules
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">Manage your team lineups and visual assets.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95 text-sm uppercase tracking-widest"
        >
          <Plus size={20} strokeWidth={3} />
          Create New
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.length === 0 ? (
          <div className="col-span-full py-24 bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-xl mb-6">
              <Calendar className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No schedules yet</h3>
            <p className="text-slate-500 max-w-xs">Start your first lineup to unlock the Poster Lab and export tools.</p>
          </div>
        ) : (
          schedules.map(schedule => (
            <div 
              key={schedule.id} 
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-7 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-full shadow-sm ${
                  schedule.status === 'completed' 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {schedule.status}
                </span>
                
                <div className="flex gap-1">
                  <button 
                    onClick={() => setPreviewSchedule(schedule)} 
                    className="p-2.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-full transition-colors"
                    title="Poster Lab"
                  >
                    <Sparkles size={18} />
                  </button>
                  <button 
                    onClick={() => { setEditingSchedule(schedule); setShowForm(true); }} 
                    className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => deleteSchedule(schedule.id)} 
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                {schedule.title}
              </h3>
              
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-8 font-medium">
                <Clock size={16} className="text-indigo-400" />
                {new Date(schedule.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' })}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {schedule.assignees?.slice(0, 3).map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                      <User size={16} className="text-slate-400" />
                    </div>
                  ))}
                  {(schedule.assignees?.length || 0) > 3 && (
                    <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-600 text-[10px] font-black text-white flex items-center justify-center shadow-lg">
                      +{(schedule.assignees?.length || 0) - 3}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {schedule.assignees?.length || 0} Members
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditingSchedule(undefined); }}
        title={editingSchedule ? 'Refine Lineup' : 'New Lineup'}
      >
        <ScheduleForm schedule={editingSchedule} onClose={() => { setShowForm(false); setEditingSchedule(undefined); }} />
      </Modal>

      {/* FIXED: onSave now uses the corrected handler */}
      {previewSchedule && (
        <SchedulePosterEditor
          schedule={previewSchedule}
          onClose={() => setPreviewSchedule(undefined)}
          onSave={(posterData: any) => {
            handleSavePosterSettings(previewSchedule.id, posterData);
            setPreviewSchedule(undefined);
          }}
        />
      )}
    </div>
  );
}