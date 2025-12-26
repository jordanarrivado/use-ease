'use client';

import React from 'react';
import { ImageIcon, Palette, Sparkles, Sliders, Download, Save, X, Trash2, RotateCcw, Maximize } from 'lucide-react';
import { TabType, RatioType } from '../SchedulePosterEditor';

interface EditorControlsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  aspectRatio: RatioType;
  setAspectRatio: (ratio: RatioType) => void;
  backgroundSettings: any;
  setBackgroundSettings: any;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  handleExport: () => void;
  handleSave: () => void;
  onClose: () => void;
}

const gradientPresets = [
  { name: 'Aurora', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Deep Sea', value: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' },
  { name: 'Mars', value: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)' },
  { name: 'Forest', value: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' },
];

export default function EditorControls(props: EditorControlsProps) {
  const { activeTab, setActiveTab, aspectRatio, setAspectRatio, backgroundSettings, setBackgroundSettings, handleImageUpload, resetFilters, handleExport, handleSave, onClose } = props;

  const labelClasses = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Poster Lab</h2>
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1 block underline underline-offset-4 decoration-2">Studio Edition</span>
        </div>
        <button onClick={onClose} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-8 mb-4">
        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800">
          {[
            { id: 'image', icon: ImageIcon },
            { id: 'gradient', icon: Palette },
            { id: 'overlay', icon: Sparkles },
            { id: 'filters', icon: Sliders },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 flex justify-center py-3.5 rounded-2xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-xl' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-8 space-y-10 py-6 scrollbar-hide pb-32">
        
        {/* Layout Select */}
        <section>
          <label className={labelClasses}>Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-3">
            {(['portrait', 'story', 'square'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setAspectRatio(r)}
                className={`flex flex-col items-center gap-2 py-4 rounded-3xl border-2 transition-all ${
                  aspectRatio === r 
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-600/10 text-indigo-600 shadow-lg shadow-indigo-500/10' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-400'
                }`}
              >
                <Maximize size={16} className={r === 'story' ? 'rotate-90' : ''} />
                <span className="text-[9px] font-black uppercase tracking-tighter">{r}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Image Tab */}
        {activeTab === 'image' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <label className={labelClasses}>Background Source</label>
            <input type="file" onChange={handleImageUpload} className="hidden" id="bg-upload" />
            <label htmlFor="bg-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] cursor-pointer hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-slate-400 group-hover:text-indigo-500" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pick Photo</span>
            </label>
            {backgroundSettings.image && (
              <button onClick={() => setBackgroundSettings((prev:any) => ({...prev, image: ''}))} className="w-full mt-4 text-[10px] font-black uppercase text-red-500 py-3 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center gap-2">
                <Trash2 size={12}/> Clear Image
              </button>
            )}
          </div>
        )}

        {/* Gradient Tab */}
        {activeTab === 'gradient' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
            {gradientPresets.map(p => (
              <button
                key={p.name}
                onClick={() => setBackgroundSettings((prev:any) => ({...prev, gradient: p.value}))}
                className={`h-24 rounded-[2rem] border-4 transition-all ${
                  backgroundSettings.gradient === p.value ? 'border-white dark:border-slate-700 shadow-xl ring-2 ring-indigo-500' : 'border-transparent opacity-60'
                }`}
                style={{ background: p.value }}
              />
            ))}
          </div>
        )}

        {/* Overlay Tab */}
        {activeTab === 'overlay' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
               <label className={labelClasses}>Tint Intensity</label>
               <span className="text-xs font-black text-indigo-500">{backgroundSettings.overlay.opacity}%</span>
            </div>
            <input 
              type="range" min="0" max="90" 
              value={backgroundSettings.overlay.opacity}
              onChange={e => setBackgroundSettings((prev:any) => ({...prev, overlay: {...prev.overlay, opacity: Number(e.target.value)}}))}
              className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600"
            />
          </div>
        )}

        {/* Filter Tab */}
        {activeTab === 'filters' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            {['brightness', 'contrast', 'blur'].map(f => (
              <div key={f} className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                   <span>{f}</span>
                   <span className="text-indigo-500">{backgroundSettings.filters[f as keyof typeof backgroundSettings.filters]}</span>
                </div>
                <input 
                  type="range" 
                  min={f === 'blur' ? 0 : 50} 
                  max={f === 'blur' ? 20 : 150} 
                  value={backgroundSettings.filters[f as keyof typeof backgroundSettings.filters]}
                  onChange={e => setBackgroundSettings((prev:any) => ({...prev, filters: {...prev.filters, [f]: Number(e.target.value)}}))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600"
                />
              </div>
            ))}
            <button onClick={resetFilters} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50">
              <RotateCcw size={14}/> Reset Visuals
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-900 flex gap-4">
        <button onClick={handleExport} className="flex-1 py-5 bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
          <Download size={16}/> Export
        </button>
        <button onClick={handleSave} className="flex-[1.5] py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
          <Save size={16}/> Apply
        </button>
      </div>
    </div>
  );
}