'use client';

import { useState, useRef, useMemo } from 'react';
import { Schedule } from '@/lib/types';
import html2canvas from 'html2canvas';
import { 
  ZoomIn, 
  ZoomOut, 
  ImageIcon, 
  Palette, 
  Sparkles, 
  Sliders, 
  Download, 
  Save, 
  X, 
  Trash2, 
  RotateCcw, 
  Maximize,
  Type // Added for Typography
} from 'lucide-react';
import PosterPreview from './EditPoster/PosterPreview';

// Added 'typography' to TabType
export type TabType = 'image' | 'gradient' | 'overlay' | 'filters' | 'typography';
export type RatioType = 'portrait' | 'story' | 'square';

export const ASPECT_RATIOS = {
  portrait: { name: 'Portrait', class: 'aspect-[3/4]', label: '3:4' },
  story: { name: 'Story', class: 'aspect-[9/16]', label: '9:16' },
  square: { name: 'Square', class: 'aspect-square', label: '1:1' },
};

export default function SchedulePosterEditor({ schedule, onClose, onSave }: any) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('image');
  const [aspectRatio, setAspectRatio] = useState<RatioType>('portrait');
  const [zoom, setZoom] = useState(100);

  // Consolidated Background State
  const [backgroundSettings, setBackgroundSettings] = useState({
    image: schedule.background?.image || '', 
    gradient: {
      type: schedule.background?.gradient?.type || 'linear-gradient',
      angle: schedule.background?.gradient?.angle || 135,
      color1: schedule.background?.gradient?.color1 || '#6366f1',
      color2: schedule.background?.gradient?.color2 || '#a855f7',
      stop1: 0,
      stop2: 100
    },
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

  // Consolidated Typography State
  const [textSettings, setTextSettings] = useState({
    title: {
      color: '#ffffff',
      fontSize: 48,
      align: 'left' as 'left' | 'center' | 'right',
      fontFamily: 'font-sans',
    },
    content: {
      color: '#ffffff',
      opacity: 0.8,
      align: 'left' as 'left' | 'center' | 'right',
    }
  });

  // CSS Generator Logic
  const previewStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (backgroundSettings.image) {
      style.backgroundImage = `url(${backgroundSettings.image})`;
    } else {
      const { type, angle, color1, color2, stop1, stop2 } = backgroundSettings.gradient;
      if (type === 'linear-gradient') {
        style.backgroundImage = `linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`;
      } else if (type === 'radial-gradient') {
        style.backgroundImage = `radial-gradient(circle at center, ${color1} ${stop1}%, ${color2} ${stop2}%)`;
      } else if (type === 'conic-gradient') {
        style.backgroundImage = `conic-gradient(from ${angle}deg at center, ${color1}, ${color2})`;
      }
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

  // Export Logic
  const handleExport = async () => {
    if (!posterRef.current) return;
    const originalTransform = posterRef.current.parentElement?.style.transform || '';
    if (posterRef.current.parentElement) posterRef.current.parentElement.style.transform = 'none';
    
    const canvas = await html2canvas(posterRef.current, { 
      scale: 3, 
      useCORS: true, 
      backgroundColor: null 
    });
    
    if (posterRef.current.parentElement) posterRef.current.parentElement.style.transform = originalTransform;
    const link = document.createElement('a');
    link.download = `Poster-${schedule.title}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const labelClasses = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row w-full h-full lg:h-[95vh] lg:max-w-[1300px] bg-white dark:bg-slate-950 lg:rounded-[3.5rem] overflow-hidden shadow-2xl relative">
        
        {/* LEFT PANEL: CONTROLS */}
        <div className="w-full lg:w-[420px] order-2 lg:order-1 bg-white dark:bg-slate-950 border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col h-[50vh] lg:h-full relative">
          
          <div className="p-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Poster Lab</h2>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1 block underline underline-offset-4 decoration-2">Studio Edition</span>
            </div>
            <button onClick={onClose} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"><X size={20} /></button>
          </div>

          <div className="px-8 mb-4">
            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800">
              {[
                { id: 'image', icon: ImageIcon },
                { id: 'gradient', icon: Palette },
                { id: 'overlay', icon: Sparkles },
                { id: 'filters', icon: Sliders },
                { id: 'typography', icon: Type }, // Added to UI
              ].map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id as any)} 
                  className={`flex-1 flex justify-center py-3.5 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <tab.icon size={20} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 space-y-10 py-6 scrollbar-hide pb-32">
            <section>
              <label className={labelClasses}>Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(ASPECT_RATIOS).map((r) => (
                  <button key={r} onClick={() => setAspectRatio(r as any)} className={`flex flex-col items-center gap-2 py-4 rounded-3xl border-2 transition-all ${aspectRatio === r ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 shadow-lg' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}>
                    <Maximize size={16} className={r === 'story' ? 'rotate-90' : ''} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">{r}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* TAB CONTENT: IMAGE */}
            {activeTab === 'image' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <input type="file" className="hidden" id="bg-upload" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setBackgroundSettings(prev => ({ ...prev, image: reader.result as string }));
                    reader.readAsDataURL(file);
                  }
                }} />
                <label htmlFor="bg-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] cursor-pointer hover:border-indigo-500 hover:bg-slate-50 transition-all group">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><ImageIcon className="text-slate-400 group-hover:text-indigo-500" /></div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Upload Background</span>
                </label>
                {backgroundSettings.image && (
                  <button onClick={() => setBackgroundSettings(prev => ({ ...prev, image: '' }))} className="w-full py-3 text-[10px] font-black uppercase text-red-500 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center gap-2"><Trash2 size={14} /> Remove Image</button>
                )}
              </div>
            )}

            {/* TAB CONTENT: GRADIENT */}
            {activeTab === 'gradient' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <label className={labelClasses}>Gradient Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['linear', 'radial', 'conic'].map((t) => (
                      <button key={t} onClick={() => setBackgroundSettings(prev => ({ ...prev, gradient: { ...prev.gradient, type: `${t}-gradient` } }))} className={`py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${backgroundSettings.gradient.type.includes(t) ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-400'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Primary</label>
                    <input type="color" value={backgroundSettings.gradient.color1} onChange={(e) => setBackgroundSettings(prev => ({ ...prev, gradient: { ...prev.gradient, color1: e.target.value } }))} className="w-full h-12 rounded-xl cursor-pointer bg-slate-50 border border-slate-200 p-1" />
                  </div>
                  <div>
                    <label className={labelClasses}>Secondary</label>
                    <input type="color" value={backgroundSettings.gradient.color2} onChange={(e) => setBackgroundSettings(prev => ({ ...prev, gradient: { ...prev.gradient, color2: e.target.value } }))} className="w-full h-12 rounded-xl cursor-pointer bg-slate-50 border border-slate-200 p-1" />
                  </div>
                </div>
                {backgroundSettings.gradient.type !== 'radial-gradient' && (
                  <div>
                    <div className="flex justify-between mb-4"><label className={labelClasses}>Rotation</label><span className="text-[10px] font-black text-indigo-500">{backgroundSettings.gradient.angle}°</span></div>
                    <input type="range" min="0" max="360" value={backgroundSettings.gradient.angle} onChange={(e) => setBackgroundSettings(prev => ({ ...prev, gradient: { ...prev.gradient, angle: Number(e.target.value) } }))} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none accent-indigo-600" />
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: OVERLAY */}
            {activeTab === 'overlay' && (
              <div className="space-y-8">
                <div><label className={labelClasses}>Tint Color</label><input type="color" value={backgroundSettings.overlay.color} onChange={(e) => setBackgroundSettings(prev => ({ ...prev, overlay: { ...prev.overlay, color: e.target.value } }))} className="w-full h-12 rounded-xl cursor-pointer bg-slate-50 border border-slate-200 p-1" /></div>
                <div><div className="flex justify-between mb-4"><label className={labelClasses}>Opacity</label><span className="text-[10px] font-black text-indigo-500">{backgroundSettings.overlay.opacity}%</span></div><input type="range" min="0" max="100" value={backgroundSettings.overlay.opacity} onChange={(e) => setBackgroundSettings(prev => ({ ...prev, overlay: { ...prev.overlay, opacity: Number(e.target.value) } }))} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none accent-indigo-600" /></div>
              </div>
            )}

            {/* TAB CONTENT: FILTERS */}
            {activeTab === 'filters' && (
              <div className="space-y-8">
                {['brightness', 'contrast', 'blur'].map((f) => (
                  <div key={f}><div className="flex justify-between mb-4"><label className={labelClasses}>{f}</label><span className="text-[10px] font-black text-indigo-500">{(backgroundSettings.filters as any)[f]}</span></div><input type="range" min="0" max={f === 'blur' ? 20 : 200} value={(backgroundSettings.filters as any)[f]} onChange={(e) => setBackgroundSettings(prev => ({ ...prev, filters: { ...prev.filters, [f]: Number(e.target.value) } }))} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none accent-indigo-600" /></div>
                ))}
                <button onClick={() => setBackgroundSettings(prev => ({ ...prev, filters: { brightness: 100, contrast: 100, blur: 0 } }))} className="w-full py-4 text-[10px] font-black uppercase text-slate-400 border border-slate-200 rounded-2xl flex items-center justify-center gap-2"><RotateCcw size={14} /> Reset Filters</button>
              </div>
            )}

            {/* TAB CONTENT: TYPOGRAPHY */}
            {activeTab === 'typography' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <label className={labelClasses}>Title Alignment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['left', 'center', 'right'].map((align) => (
                      <button
                        key={align}
                        onClick={() => setTextSettings((prev: any) => ({
                          ...prev,
                          title: { ...prev.title, align }
                        }))}
                        className={`py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${
                          textSettings.title.align === align ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-400'
                        }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <label className={labelClasses}>Title Size</label>
                    <span className="text-[10px] font-black text-indigo-500">{textSettings.title.fontSize}px</span>
                  </div>
                  <input 
                    type="range" min="24" max="120" 
                    value={textSettings.title.fontSize}
                    onChange={(e) => setTextSettings((prev: any) => ({
                      ...prev,
                      title: { ...prev.title, fontSize: Number(e.target.value) }
                    }))}
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none accent-indigo-600" 
                  />
                </div>

                <div>
                  <label className={labelClasses}>Text Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={textSettings.title.color}
                      onChange={(e) => setTextSettings((prev: any) => ({
                        ...prev,
                        title: { ...prev.title, color: e.target.value },
                        content: { ...prev.content, color: e.target.value }
                      }))}
                      className="w-12 h-12 rounded-xl cursor-pointer bg-slate-50 border border-slate-200 p-1" 
                    />
                    <div className="flex-1 flex gap-2 overflow-x-auto pb-2">
                      {['#ffffff', '#000000', '#6366f1', '#f43f5e', '#fbbf24'].map(c => (
                        <button 
                          key={c} 
                          onClick={() => setTextSettings((prev: any) => ({ ...prev, title: { ...prev.title, color: c }, content: { ...prev.content, color: c } }))}
                          className="w-10 h-10 rounded-full border border-slate-200 shrink-0" 
                          style={{ backgroundColor: c }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-900 flex gap-4">
            <button onClick={handleExport} className="flex-1 py-5 bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2"><Download size={16}/> Export</button>
            <button onClick={() => { onSave({ backgroundSettings, textSettings }); onClose(); }} className="flex-[1.5] py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2"><Save size={16}/> Apply</button>
          </div>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="flex-1 order-1 lg:order-2 relative flex flex-col overflow-hidden bg-slate-100 dark:bg-slate-900/50">
          
          {/* ZOOM CONTROLLER */}
          <div className="absolute top-6 right-6 z-30 flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-2 text-slate-800 dark:text-white">
              <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"><ZoomOut size={16} /></button>
              <span className="text-[10px] font-black w-10 text-center tabular-nums">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"><ZoomIn size={16} /></button>
            </div>
            <button onClick={() => setZoom(100)} className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md">Reset</button>
          </div>

          <div className="flex-1 overflow-auto p-12 lg:p-24 flex items-start justify-center scrollbar-hide">
            <div 
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              className="relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
            >
              <div 
                className="rounded-[2.5rem] overflow-hidden" 
                style={{ 
                  backgroundColor: '#e5e5f7', 
                  backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%, #cbd5e1), repeating-linear-gradient(45deg, #cbd5e1 25%, #f1f5f9 25%, #f1f5f9 75%, #cbd5e1 75%, #cbd5e1)', 
                  backgroundPosition: '0 0, 10px 10px', 
                  backgroundSize: '20px 20px' 
                }}
              >
                {/* Passed textSettings prop here */}
                <PosterPreview 
                  ref={posterRef} 
                  schedule={schedule} 
                  previewStyle={previewStyle} 
                  overlayStyle={overlayStyle} 
                  textSettings={textSettings}
                  aspectRatioClass={ASPECT_RATIOS[aspectRatio].class} 
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}