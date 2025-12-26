// D:\projects\use-ease\components\EditPoster\PosterPreview.tsx
'use client';

import React from 'react';
import { Schedule } from '@/lib/types';
import { Calendar } from 'lucide-react';

interface PosterPreviewProps {
  schedule: Schedule;
  previewStyle: React.CSSProperties;
  overlayStyle: React.CSSProperties;
  aspectRatioClass: string;
}

const PosterPreview = React.forwardRef<HTMLDivElement, PosterPreviewProps>(
  ({ schedule, previewStyle, overlayStyle, aspectRatioClass }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative w-full max-w-[400px] lg:max-w-[450px] ${aspectRatioClass} rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-slate-900 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]`}
        style={previewStyle}
      >
        {/* Color Tint Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500" style={overlayStyle} />

        {/* Content Content */}
        <div className="relative z-10 h-full p-8 md:p-12 flex flex-col text-white">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] uppercase tracking-[0.2em] font-black">
              <Calendar size={12} className="text-indigo-400" />
              Main Event
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter drop-shadow-2xl italic">
              {schedule.title}
            </h1>
            
            <div className="text-sm font-bold opacity-70 tracking-widest uppercase italic">
              {new Date(schedule.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Lineup Section */}
          <div className="mt-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/30" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Lineup</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/30" />
            </div>

            <div className="grid gap-3">
              {schedule.assignees?.map((assignee, idx) => (
                <div key={idx} className="group bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/5 flex flex-col transition-all hover:bg-black/30">
                  <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest mb-1">{assignee.roleName}</span>
                  <span className="text-lg font-bold tracking-tight italic">{assignee.member?.name || 'TBD'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PosterPreview.displayName = 'PosterPreview';
export default PosterPreview;