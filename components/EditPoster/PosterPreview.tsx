'use client';

import React from 'react';
import { Schedule } from '@/lib/types';
import { Calendar } from 'lucide-react';

interface PosterPreviewProps {
  schedule: Schedule;
  previewStyle: React.CSSProperties;
  overlayStyle: React.CSSProperties;
  textSettings: any;
  aspectRatioClass: string;
}

const PosterPreview = React.forwardRef<HTMLDivElement, PosterPreviewProps>(
  ({ schedule, previewStyle, overlayStyle, textSettings, aspectRatioClass }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative w-[400px] md:w-[500px] ${aspectRatioClass} transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] bg-transparent`}
        style={previewStyle}
      >
        <div className="absolute inset-0 z-0 pointer-events-none" style={overlayStyle} />
        
        <div className="relative z-10 h-full p-12 flex flex-col">
          <div className="space-y-4" style={{ textAlign: textSettings.title.align }}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] uppercase tracking-[0.2em] font-black`} style={{ color: textSettings.title.color }}>
              <Calendar size={12} className="text-indigo-400" />
              Main Event
            </div>
            
            <h1 
              className="font-black uppercase leading-[0.9] tracking-tighter drop-shadow-2xl italic transition-all"
              style={{ 
                color: textSettings.title.color,
                fontSize: `${textSettings.title.fontSize}px`,
                fontFamily: textSettings.title.fontFamily
              }}
            >
              {schedule.title}
            </h1>
            
            <div className="text-sm font-bold opacity-70 tracking-widest uppercase italic" style={{ color: textSettings.title.color }}>
              {new Date(schedule.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="mt-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/30" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 text-white">Lineup</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/30" />
            </div>
            
            <div className="grid gap-3" style={{ textAlign: textSettings.content.align }}>
              {schedule.assignees?.map((assignee, idx) => (
                <div key={idx} className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/5 flex flex-col">
                  <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest mb-1">{assignee.roleName}</span>
                  <span className="text-lg font-bold tracking-tight italic" style={{ color: textSettings.content.color }}>
                    {assignee.member?.name || 'TBD'}
                  </span>
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