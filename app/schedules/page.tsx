'use client';

import { useState } from 'react';
import { Clock, Plus, Edit2, Trash2, User, Calendar, Sparkles } from 'lucide-react';
import { Schedule, PosterData, Assignee } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import ReminderAlert from '@/components/ReminderAlert';
import Modal from '@/components/Modal';
import ScheduleForm from '@/components/ScheduleForm';
import SchedulePosterEditor from '@/components/SchedulePosterEditor';

// ==================== MAIN COMPONENT ====================
export default function SchedulesPage() {
  const { schedules, deleteSchedule, updateSchedule } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>();
  const [previewSchedule, setPreviewSchedule] = useState<Schedule | undefined>();

  // ==================== HANDLERS ====================
  const handleSavePosterSettings = (scheduleId: string, posterData: PosterData) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (!schedule) return;

    updateSchedule(scheduleId, { 
      ...schedule, 
      background: posterData.backgroundSettings,
      textSettings: posterData.textSettings,
      aspectRatio: posterData.aspectRatio 
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSchedule(undefined);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleClosePosterEditor = () => {
    setPreviewSchedule(undefined);
  };

  const handleSavePoster = (posterData: PosterData) => {
    if (previewSchedule?.id) {
      handleSavePosterSettings(previewSchedule.id, posterData);
      setPreviewSchedule(undefined);
    }
  };

  const handleDeleteSchedule = (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      deleteSchedule(id);
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 pb-24">
      <ReminderAlert />
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
            Schedules
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">
            Manage your team lineups and visual assets.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95 text-sm uppercase tracking-widest"
        >
          <Plus size={20} strokeWidth={3} />
          Create New
        </button>
      </header>

      {/* Schedule Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.length === 0 ? (
          <EmptyState onCreateClick={() => setShowForm(true)} />
        ) : (
          schedules.map(schedule => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onEdit={handleEditSchedule}
              onDelete={handleDeleteSchedule}
              onOpenPosterLab={setPreviewSchedule}
            />
          ))
        )}
      </section>

      {/* Schedule Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={handleCloseForm}
        title={editingSchedule ? 'Refine Lineup' : 'New Lineup'}
      >
        <ScheduleForm 
          schedule={editingSchedule} 
          onClose={handleCloseForm} 
        />
      </Modal>

      {/* Poster Editor Modal */}
      {previewSchedule && (
        <SchedulePosterEditor
          schedule={previewSchedule}
          onClose={handleClosePosterEditor}
          onSave={handleSavePoster}
        />
      )}
    </div>
  );
}

// ==================== EMPTY STATE ====================
interface EmptyStateProps {
  onCreateClick: () => void;
}

function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="col-span-full py-24 bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-xl mb-6">
        <Calendar className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        No schedules yet
      </h3>
      <p className="text-slate-500 max-w-xs mb-6">
        Start your first lineup to unlock the Poster Lab and export tools.
      </p>
      <button
        onClick={onCreateClick}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all active:scale-95"
      >
        Create First Schedule
      </button>
    </div>
  );
}

// ==================== SCHEDULE CARD ====================
interface ScheduleCardProps {
  schedule: Schedule;
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
  onOpenPosterLab: (schedule: Schedule) => void;
}

function ScheduleCard({ schedule, onEdit, onDelete, onOpenPosterLab }: ScheduleCardProps) {
  const assigneeCount = schedule.assignees?.length ?? 0;
  const displayedAssignees = schedule.assignees?.slice(0, 3) ?? [];
  const remainingCount = Math.max(0, assigneeCount - 3);

  // Status configuration with proper typing
  const statusConfig: Record<NonNullable<Schedule['status']>, string> = {
    completed: 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20',
    pending: 'bg-amber-50 text-amber-600 border border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20',
    cancelled: 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20',
  };

  const status = schedule.status ?? 'pending';

  const formattedDate = new Date(schedule.date).toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    weekday: 'short' 
  });

  const handleDeleteClick = () => {
    if (schedule.id) {
      onDelete(schedule.id);
    }
  };

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-7 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-full shadow-sm ${statusConfig[status]}`}>
          {status}
        </span>
        
        <div className="flex gap-1">
          <ActionButton
            onClick={() => onOpenPosterLab(schedule)}
            icon={Sparkles}
            title="Poster Lab"
            variant="indigo"
          />
          <ActionButton
            onClick={() => onEdit(schedule)}
            icon={Edit2}
            title="Edit"
            variant="blue"
          />
          <ActionButton
            onClick={handleDeleteClick}
            icon={Trash2}
            title="Delete"
            variant="red"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
        {schedule.title || 'Untitled Schedule'}
      </h3>
      
      {/* Date */}
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4 font-medium">
        <Clock size={16} className="text-indigo-400" />
        <time dateTime={schedule.date}>{formattedDate}</time>
      </div>

      {/* Description */}
      {schedule.description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {schedule.description}
        </p>
      )}

      {/* Location */}
      {schedule.location && (
        <p className="text-xs text-slate-500 mb-4">
          📍 {schedule.location}
        </p>
      )}

      {/* Footer */}
      <footer className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
        <AssigneeAvatars 
          assignees={displayedAssignees} 
          remainingCount={remainingCount} 
        />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {assigneeCount} {assigneeCount === 1 ? 'Member' : 'Members'}
        </span>
      </footer>

      {/* Poster Indicator */}
      {schedule.background && (
        <div className="mt-4 flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400">
          <Sparkles size={12} />
          <span>Custom poster design saved</span>
        </div>
      )}
    </article>
  );
}

// ==================== ASSIGNEE AVATARS ====================
interface AssigneeAvatarsProps {
  assignees: Assignee[];
  remainingCount: number;
}

function AssigneeAvatars({ assignees, remainingCount }: AssigneeAvatarsProps) {
  if (!assignees || assignees.length === 0) {
    return (
      <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
        <User size={16} className="text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex -space-x-3">
      {assignees.map((assignee) => (
        <div 
          key={assignee.id}
          className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm"
          title={assignee.member?.name ?? assignee.roleName}
        >
          {assignee.member?.avatar ? (
            <img 
              src={assignee.member.avatar} 
              alt={assignee.member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-xs font-bold">
              {(assignee.member?.name ?? assignee.roleName).charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-600 text-[10px] font-black text-white flex items-center justify-center shadow-lg">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

// ==================== ACTION BUTTON ====================
type ActionButtonVariant = 'indigo' | 'blue' | 'red';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  variant: ActionButtonVariant;
}

const actionButtonStyles: Record<ActionButtonVariant, string> = {
  indigo: 'text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10',
  blue: 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10',
  red: 'text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10',
};

function ActionButton({ onClick, icon: Icon, title, variant }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={`p-2.5 rounded-full transition-all ${actionButtonStyles[variant]}`}
      title={title}
      aria-label={title}
    >
      <Icon size={18} />
    </button>
  );
}