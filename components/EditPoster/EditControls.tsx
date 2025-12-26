'use client';

import React from 'react';
import { 
  ImageIcon, 
  Palette, 
  Sparkles, 
  Sliders, 
  Download, 
  Save, 
  X, 
  Trash2, 
  RotateCcw, 
  Maximize 
} from 'lucide-react';

export default function EditorControls({ 
  activeTab, 
  setActiveTab, 
  aspectRatio, 
  setAspectRatio, 
  backgroundSettings, 
  setBackgroundSettings, 
  handleImageUpload, 
  resetFilters, 
  handleExport, 
  handleSave, 
  onClose 
}: any) {
  const labelClasses = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* HEADER SECTION */}
      <div className="p-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Poster Lab</h2>
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1 block underline underline-offset-4 decoration-2">Studio Edition</span>
        </div>
        <button 
          onClick={onClose} 
          className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* NAVIGATION TABS */}
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
              onClick={() => setActiveTab(tab.id as any)} 
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

      {/* MAIN CONTROLS AREA */}
      <div className="flex-1 overflow-y-auto px-8 space-y-10 py-6 scrollbar-hide pb-32">
        
        {/* ASPECT RATIO SELECTOR */}
        <section>
          <label className={labelClasses}>Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-3">
            {['portrait', 'story', 'square'].map((r: any) => (
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

        {/* IMAGE TAB CONTENT */}
        {activeTab === 'image' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
            <label className={labelClasses}>Background Source</label>
            <input type="file" onChange={handleImageUpload} className="hidden" id="bg-upload" />
            <label htmlFor="bg-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] cursor-pointer hover:border-indigo-500 hover:bg-slate-50 transition-all group">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-slate-400 group-hover:text-indigo-500" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pick Photo</span>
            </label>
            {backgroundSettings.image && (
              <button 
                onClick={() => setBackgroundSettings((prev: any) => ({ ...prev, image: '' }))}
                className="w-full py-3 text-[10px] font-black uppercase text-red-500 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> Remove Image
              </button>
            )}
          </div>
        )}

        {/* GRADIENT TAB CONTENT */}
        {activeTab === 'gradient' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <label className={labelClasses}>Gradient Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['linear', 'radial', 'conic'].map((t) => (
                  <button 
                    key={t} 
                    onClick={() => setBackgroundSettings((prev: any) => ({ 
                      ...prev, 
                      gradient: { ...prev.gradient, type: `${t}-gradient` } 
                    }))} 
                    className={`py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${
                      backgroundSettings.gradient.type.includes(t) 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' 
                        : 'border-slate-200 text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Primary Color</label>
                <input 
                  type="color" 
                  value={backgroundSettings.gradient.color1} 
                  onChange={(e) => setBackgroundSettings((prev: any) => ({ 
                    ...prev, 
                    gradient: { ...prev.gradient, color1: e.target.value } 
                  }))} 
                  className="w-full h-12 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1" 
                />
              </div>
              <div>
                <label className={labelClasses}>Secondary Color</label>
                <input 
                  type="color" 
                  value={backgroundSettings.gradient.color2} 
                  onChange={(e) => setBackgroundSettings((prev: any) => ({ 
                    ...prev, 
                    gradient: { ...prev.gradient, color2: e.target.value } 
                  }))} 
                  className="w-full h-12 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1" 
                />
              </div>
            </div>

            {backgroundSettings.gradient.type !== 'radial-gradient' && (
              <div>
                <div className="flex justify-between mb-4">
                  <label className={labelClasses}>Rotation</label>
                  <span className="text-[10px] font-black text-indigo-500">{backgroundSettings.gradient.angle}°</span>
                </div>
                <input 
                  type="range" min="0" max="360" 
                  value={backgroundSettings.gradient.angle} 
                  onChange={(e) => setBackgroundSettings((prev: any) => ({ 
                    ...prev, 
                    gradient: { ...prev.gradient, angle: Number(e.target.value) } 
                  }))} 
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600" 
                />
              </div>
            )}
          </div>
        )}

        {/* OVERLAY TAB CONTENT */}
        {activeTab === 'overlay' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <label className={labelClasses}>Overlay Tint</label>
              <input 
                type="color" 
                value={backgroundSettings.overlay.color} 
                onChange={(e) => setBackgroundSettings((prev: any) => ({ 
                  ...prev, 
                  overlay: { ...prev.overlay, color: e.target.value } 
                }))} 
                className="w-full h-12 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1" 
              />
            </div>
            <div>
              <div className="flex justify-between mb-4">
                <label className={labelClasses}>Tint Intensity</label>
                <span className="text-[10px] font-black text-indigo-500">{backgroundSettings.overlay.opacity}%</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={backgroundSettings.overlay.opacity} 
                onChange={(e) => setBackgroundSettings((prev: any) => ({ 
                  ...prev, 
                  overlay: { ...prev.overlay, opacity: Number(e.target.value) } 
                }))} 
                className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600" 
              />
            </div>
          </div>
        )}

        {/* FILTERS TAB CONTENT */}
        {activeTab === 'filters' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {[
              { id: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
              { id: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%' },
              { id: 'blur', label: 'Blur Radius', min: 0, max: 20, unit: 'px' },
            ].map((filter) => (
              <div key={filter.id}>
                <div className="flex justify-between mb-4">
                  <label className={labelClasses}>{filter.label}</label>
                  <span className="text-[10px] font-black text-indigo-500">
                    {backgroundSettings.filters[filter.id as keyof typeof backgroundSettings.filters]}{filter.unit}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={filter.min} 
                  max={filter.max} 
                  value={backgroundSettings.filters[filter.id as keyof typeof backgroundSettings.filters]} 
                  onChange={(e) => setBackgroundSettings((prev: any) => ({ 
                    ...prev, 
                    filters: { ...prev.filters, [filter.id]: Number(e.target.value) } 
                  }))} 
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600" 
                />
              </div>
            ))}
            <button 
              onClick={resetFilters}
              className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            >
              <RotateCcw size={14} /> Reset Visuals
            </button>
          </div>
        )}
      </div>

      {/* FOOTER ACTION BUTTONS */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-900 flex gap-4">
        <button 
          onClick={handleExport} 
          className="flex-1 py-5 bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Download size={16}/> Export
        </button>
        <button 
          onClick={handleSave} 
          className="flex-[1.5] py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Save size={16}/> Apply
        </button>
      </div>
    </div>
  );
}