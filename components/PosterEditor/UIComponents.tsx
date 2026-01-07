import { X, Shuffle, ZoomIn, ZoomOut, Image, Palette, Sparkles, Sliders, Type } from 'lucide-react';
import { TabType } from '@/lib/types';

interface HeaderProps {
  onClose: () => void;
  onRandomPreset: () => void;
}

export function EditorHeader({ onClose, onRandomPreset }: HeaderProps) {
  return (
    <div className="p-6 lg:p-8 flex justify-between items-center border-b border-slate-100 dark:border-slate-900">
      <div>
        <h2 className="text-xl lg:text-2xl font-black italic tracking-tighter uppercase leading-none bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Poster Lab
        </h2>
        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1 block">
          Studio Edition
        </span>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onRandomPreset}
          className="p-2.5 lg:p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-xl lg:rounded-2xl hover:bg-indigo-100 transition-all"
          title="Random preset"
        >
          <Shuffle size={16} />
        </button>
        <button 
          onClick={onClose} 
          className="p-2.5 lg:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl lg:rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS = [
  { id: 'layout' as TabType, icon: Sparkles, label: 'Layout' },
  { id: 'image' as TabType, icon: Image, label: 'Image' },
  { id: 'gradient' as TabType, icon: Palette, label: 'Gradient' },
  { id: 'typography' as TabType, icon: Type, label: 'Type' },
  { id: 'filters' as TabType, icon: Sliders, label: 'Effects' },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="px-4 lg:px-8 py-3 lg:py-4 border-b border-slate-100 dark:border-slate-900">
      <div className="flex p-1 lg:p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl lg:rounded-[1.5rem]">
        {TABS.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => onTabChange(tab.id)} 
            className={`flex-1 flex flex-col items-center gap-0.5 lg:gap-1 py-2 lg:py-3 rounded-lg lg:rounded-xl transition-all ${
              activeTab === tab.id 
                ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-lg' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title={tab.label}
          >
            <tab.icon size={16} />
            <span className="text-[7px] lg:text-[8px] font-black uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== ZOOM CONTROLS ====================
interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut, onZoomReset }: ZoomControlsProps) {
  return (
    <div className="absolute top-4 lg:top-6 right-4 lg:right-6 z-30 flex items-center gap-2 lg:gap-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl px-3 lg:px-4 py-2 rounded-xl lg:rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
      <button 
        onClick={onZoomOut} 
        className="p-1.5 lg:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
        disabled={zoom <= 25}
      >
        <ZoomOut size={14} className={zoom <= 25 ? 'text-slate-300' : 'text-slate-600'} />
      </button>
      <span className="text-[10px] lg:text-[11px] font-black w-10 lg:w-12 text-center tabular-nums text-slate-700 dark:text-slate-300">
        {zoom}%
      </span>
      <button 
        onClick={onZoomIn} 
        className="p-1.5 lg:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
        disabled={zoom >= 200}
      >
        <ZoomIn size={14} className={zoom >= 200 ? 'text-slate-300' : 'text-slate-600'} />
      </button>
      <div className="w-px h-5 lg:h-6 bg-slate-200 dark:bg-slate-700" />
      <button 
        onClick={onZoomReset} 
        className="px-2 lg:px-3 py-1 text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
      >
        Reset
      </button>
    </div>
  );
}

// ==================== INFO BAR ====================
interface InfoBarProps {
  width: number;
  height: number;
}

export function InfoBar({ width, height }: InfoBarProps) {
  return (
    <div className="px-4 lg:px-8 py-3 lg:py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between text-[9px] lg:text-[10px] font-semibold text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Preview
        </span>
        <span>
          {width} × {height}px
        </span>
      </div>
    </div>
  );
}

// ==================== LABEL ====================
export const labelClasses = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block";