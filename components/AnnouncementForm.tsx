'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Send, X, Megaphone } from 'lucide-react';

interface AnnouncementFormProps {
  onClose: () => void;
}

export default function AnnouncementForm({ onClose }: AnnouncementFormProps) {
  const { addAnnouncement } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publishAt: new Date().toISOString().slice(0, 16)
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.content) return;
    addAnnouncement({ ...formData, isAuto: false });
    onClose();
  };

  // REFINED: Indigo theme with high-contrast inputs
  const inputClasses = `
    w-full px-4 py-3 rounded-xl border outline-none
    transition-all duration-200
    bg-white dark:bg-slate-950
    border-slate-200 dark:border-slate-800
    text-slate-900 dark:text-slate-100
    placeholder:text-slate-400 dark:placeholder:text-slate-600
    focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500
    dark:focus:ring-indigo-500/20 dark:focus:border-indigo-400
  `;

  const labelClasses = "block text-[10px] uppercase tracking-[0.12em] font-bold text-slate-500 dark:text-slate-500 mb-1.5 ml-1";

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
      
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
            <Megaphone className="text-indigo-500" size={24} />
          </div>
            Create Announcement
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-1">
            Broadcast important updates to the entire management system.
          </p>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div className="group">
            <label className={labelClasses}>Title</label>
            <input
              type="text"
              placeholder="What's happening?"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className={inputClasses}
            />
          </div>

          {/* Content */}
          <div className="group">
            <label className={labelClasses}>Content Body</label>
            <textarea
              placeholder="Share the details..."
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className={`${inputClasses} h-40 resize-none`}
            />
          </div>

          {/* Schedule */}
          <div className="group">
            <label className={labelClasses}>Publish Schedule</label>
            <div className="relative">
              <input
                type="datetime-local"
                value={formData.publishAt}
                onChange={e => setFormData({ ...formData, publishAt: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button 
            onClick={handleSubmit} 
            className="flex-[2] inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-[0.97] transition-all"
          >
            <Send size={18} />
            Post Announcement
          </button>
          <button 
            onClick={onClose} 
            className="flex-1 px-6 py-4 rounded-2xl font-semibold border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}