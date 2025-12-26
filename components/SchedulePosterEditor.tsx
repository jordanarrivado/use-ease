'use client';

import { useState, useRef, useMemo } from 'react';
import { Schedule } from '@/lib/types';
import html2canvas from 'html2canvas';
import EditorControls from './EditPoster/EditControls';
import PosterPreview from './EditPoster/PosterPreview';

export type TabType = 'image' | 'gradient' | 'overlay' | 'filters';
export type RatioType = 'portrait' | 'story' | 'square';

export const ASPECT_RATIOS = {
  portrait: { name: 'Portrait', class: 'aspect-[3/4]', label: '3:4' },
  story: { name: 'Story', class: 'aspect-[9/16]', label: '9:16' },
  square: { name: 'Square', class: 'aspect-square', label: '1:1' },
};

interface SchedulePosterEditorProps {
  schedule: Schedule;
  onClose: () => void;
  onSave: (background: any) => void;
}

export default function SchedulePosterEditor({ schedule, onClose, onSave }: SchedulePosterEditorProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('image');
  const [aspectRatio, setAspectRatio] = useState<RatioType>('portrait');

  // Set initial image to empty for transparency by default
  const [backgroundSettings, setBackgroundSettings] = useState({
    image: schedule.background?.image || '', 
    gradient: schedule.background?.gradient || '', // Removed default gradient for transparency
    overlay: {
      color: schedule.background?.overlay?.color || '#000000',
      opacity: schedule.background?.overlay?.opacity || 0,
    },
    filters: {
      brightness: 100,
      contrast: 100,
      blur: 0,
    },
  });

  const previewStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (backgroundSettings.image) {
      style.backgroundImage = `url(${backgroundSettings.image})`;
    } else if (backgroundSettings.gradient) {
      style.backgroundImage = backgroundSettings.gradient;
    } else {
      // If no image or gradient, it remains transparent
      style.backgroundColor = 'transparent';
    }
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
    style.filter = `brightness(${backgroundSettings.filters.brightness}%) contrast(${backgroundSettings.filters.contrast}%) blur(${backgroundSettings.filters.blur}px)`;
    return style;
  }, [backgroundSettings]);

  const overlayStyle = useMemo(() => ({
    backgroundColor: backgroundSettings.overlay.color,
    opacity: backgroundSettings.overlay.opacity / 100,
  }), [backgroundSettings.overlay]);

  const handleExport = async () => {
    if (!posterRef.current) return;
    
    // backgroundColor: null tells html2canvas to keep the background transparent
    const canvas = await html2canvas(posterRef.current, { 
      scale: 3, 
      useCORS: true,
      backgroundColor: null 
    });
    
    const link = document.createElement('a');
    link.download = `Poster-${schedule.title}.png`;
    link.href = canvas.toDataURL('image/png'); // PNG supports transparency
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row w-full h-full lg:h-[95vh] lg:max-w-[1200px] bg-white dark:bg-slate-950 lg:rounded-[3.5rem] overflow-hidden shadow-2xl relative">
        
        {/* PREVIEW PANEL - Added Checkerboard Pattern for Transparency Visibility */}
        <div 
          className="flex-1 order-1 lg:order-2 p-6 md:p-12 flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: '#e5e5f7',
            opacity: 0.8,
            backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%, #cbd5e1), repeating-linear-gradient(45deg, #cbd5e1 25%, #f1f5f9 25%, #f1f5f9 75%, #cbd5e1 75%, #cbd5e1)',
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px'
          }}
        >
          <div className="absolute top-8 left-8 hidden lg:block z-10">
            <span className="bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
              Transparency Active
            </span>
          </div>
          
          <PosterPreview
            ref={posterRef}
            schedule={schedule}
            previewStyle={previewStyle}
            overlayStyle={overlayStyle}
            aspectRatioClass={ASPECT_RATIOS[aspectRatio].class}
          />
        </div>

        {/* CONTROLS PANEL */}
        <div className="w-full lg:w-[420px] order-2 lg:order-1 bg-white dark:bg-slate-950 border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col h-[50vh] lg:h-full">
          <EditorControls
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            backgroundSettings={backgroundSettings}
            setBackgroundSettings={setBackgroundSettings}
            handleImageUpload={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => setBackgroundSettings(prev => ({ ...prev, image: reader.result as string }));
              reader.readAsDataURL(file);
            }}
            resetFilters={() => setBackgroundSettings(prev => ({ ...prev, filters: { brightness: 100, contrast: 100, blur: 0 }, image: '', gradient: '' }))}
            handleExport={handleExport}
            handleSave={() => { onSave(backgroundSettings); onClose(); }}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}