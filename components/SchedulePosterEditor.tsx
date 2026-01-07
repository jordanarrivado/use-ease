'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import { Download, Save, RotateCcw } from 'lucide-react';
import PosterPreview from './PosterEditor/PosterPreview';
import { EditorHeader, TabNavigation, ZoomControls, InfoBar } from './PosterEditor/UIComponents';
import { 
  AspectRatioSelector, 
  LayoutTab, 
  ImageTab, 
  GradientTab, 
  TypographyTab, 
  FiltersTab 
} from './PosterEditor/TabComponents';
import { 
  Schedule, 
  TabType, 
  RatioType, 
  PosterSettings, 
  BackgroundSettings, 
  TextSettings 
} from '@/lib/types';
import { ASPECT_RATIOS, DEFAULT_BACKGROUND_SETTINGS, DEFAULT_TEXT_SETTINGS, GRADIENT_PRESETS, LAYOUT_PRESETS, FONT_STYLE_PRESETS } from './PosterEditor/constants';

interface Props {
  schedule: Schedule;
  onClose: () => void;
  onSave: (settings: PosterSettings) => void;
}

export default function SchedulePosterEditor({ schedule, onClose, onSave }: Props) {
  // Refs
  const posterRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // State
  const [activeTab, setActiveTab] = useState<TabType>('layout');
  const [aspectRatio, setAspectRatio] = useState<RatioType>('portrait');
  const [zoom, setZoom] = useState(100);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const [textSettings, setTextSettings] = useState<TextSettings>(() => ({
    ...DEFAULT_TEXT_SETTINGS
  }));

  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>(() => ({
    ...DEFAULT_BACKGROUND_SETTINGS,
    image: schedule.background?.image || '', 
    gradient: {
      ...DEFAULT_BACKGROUND_SETTINGS.gradient,
      type: schedule.background?.gradient?.type || 'linear-gradient',
      angle: schedule.background?.gradient?.angle || 135,
      color1: schedule.background?.gradient?.color1 || '#6366f1',
      color2: schedule.background?.gradient?.color2 || '#a855f7',
    },
    overlay: {
      color: schedule.background?.overlay?.color || '#000000',
      opacity: schedule.background?.overlay?.opacity || 25,
    },
  }));

  // ==================== COMPUTED STYLES ====================
  const previewStyle = useMemo((): React.CSSProperties => {
    const style: React.CSSProperties = {
      backgroundColor: backgroundSettings.gradient.color1,
    };
    
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
    style.filter = `brightness(${backgroundSettings.filters.brightness}%) contrast(${backgroundSettings.filters.contrast}%) blur(${backgroundSettings.filters.blur}px) saturate(${backgroundSettings.filters.saturation}%)`;
    
    return style;
  }, [backgroundSettings]);

  const overlayStyle = useMemo((): React.CSSProperties => ({
    backgroundColor: backgroundSettings.overlay.color,
    opacity: showOverlay ? backgroundSettings.overlay.opacity / 100 : 0,
    transition: 'opacity 0.3s ease',
  }), [backgroundSettings.overlay, showOverlay]);

  // ==================== HANDLERS ====================
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      if (typeof window !== 'undefined') window.alert('Image size should be less than 10MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => setBackgroundSettings(prev => ({ ...prev, image: reader.result as string }));
    reader.onerror = () => { if (typeof window !== 'undefined') window.alert('Failed to read image file'); };
    reader.readAsDataURL(file);
  }, []);

 const handleExport = useCallback(async () => {
    if (!posterRef.current || isExporting) return;
    
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(posterRef.current, { 
        scale: 3,           
        useCORS: true,      
        backgroundColor: null,
        logging: false,
        allowTaint: true,
      });
      
      const fileName = `${schedule.title?.replace(/\s+/g, '-') || 'Poster'}-Schedule.png`;
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
      
    } catch (error) {
      console.error('Export failed:', error);
      if (typeof window !== 'undefined') {
        alert('Could not generate image. Check if your background image allows sharing (CORS).');
      }
    } finally {
      setIsExporting(false);
    }
  }, [schedule.title, isExporting]);

  const applyRandomPreset = useCallback(() => {
    const randomGradient = GRADIENT_PRESETS[Math.floor(Math.random() * GRADIENT_PRESETS.length)];
    const randomLayout = LAYOUT_PRESETS[Math.floor(Math.random() * LAYOUT_PRESETS.length)];
    const randomFont = FONT_STYLE_PRESETS[Math.floor(Math.random() * FONT_STYLE_PRESETS.length)];
    
    setBackgroundSettings(prev => ({
      ...prev,
      image: '',
      gradient: { ...prev.gradient, ...randomGradient },
      overlay: { ...randomLayout.overlay }
    }));
    
    setTextSettings(prev => ({
      ...prev,
      title: { 
        ...prev.title, 
        ...randomLayout.text.title,
        fontStyle: randomFont.class,
        fontFamily: randomFont.class,
      },
      content: { ...prev.content, ...randomLayout.text.content },
      layoutStyle: randomLayout.text.layoutStyle
    }));
  }, []);

  const resetAll = useCallback(() => {
    if (typeof window !== 'undefined' && window.confirm('Reset all settings to default?')) {
      setBackgroundSettings({ ...DEFAULT_BACKGROUND_SETTINGS });
      setTextSettings({ ...DEFAULT_TEXT_SETTINGS });
    }
  }, []);

  const handleSave = useCallback(() => {
    onSave({ backgroundSettings, textSettings });
    onClose();
  }, [backgroundSettings, textSettings, onSave, onClose]);

  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(200, prev + 25)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(25, prev - 25)), []);
  const handleZoomReset = useCallback(() => setZoom(100), []);
  const handleRemoveImage = useCallback(() => setBackgroundSettings(prev => ({ ...prev, image: '' })), []);
  const handleResetFilters = useCallback(() => setBackgroundSettings(prev => ({ 
    ...prev, 
    filters: { brightness: 100, contrast: 100, blur: 0, saturation: 100 } 
  })), []);
  const handleFileInputClick = useCallback(() => fileInputRef.current?.click(), []);
  const handleOverlayToggle = useCallback(() => setShowOverlay(prev => !prev), []);

  const updateTextSettings = useCallback((updates: Partial<TextSettings>) => {
    setTextSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const updateBackgroundSettings = useCallback((updates: Partial<BackgroundSettings>) => {
    setBackgroundSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // ==================== RENDER ====================
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row w-full h-full lg:h-[95vh] lg:max-w-[1400px] bg-white dark:bg-slate-950 lg:rounded-[3.5rem] overflow-hidden shadow-2xl">
        
        {/* ==================== LEFT PANEL: CONTROLS ==================== */}
        <div className="w-full lg:w-[440px] order-2 lg:order-1 bg-white dark:bg-slate-950 border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col h-[50vh] lg:h-full relative">
          
          <EditorHeader onClose={onClose} onRandomPreset={applyRandomPreset} />
          
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-4 lg:py-6 space-y-6 lg:space-y-8 scrollbar-hide pb-40 lg:pb-32">
            
            <AspectRatioSelector aspectRatio={aspectRatio} onChange={setAspectRatio} />

            {activeTab === 'layout' && (
              <LayoutTab 
                textSettings={textSettings}
                backgroundSettings={backgroundSettings}
                showOverlay={showOverlay}
                onTextChange={updateTextSettings}
                onBackgroundChange={updateBackgroundSettings}
                onOverlayToggle={handleOverlayToggle}
                onRandomPreset={applyRandomPreset}
              />
            )}

            {activeTab === 'image' && (
              <ImageTab 
                image={backgroundSettings.image}
                fileInputRef={fileInputRef}
                onImageUpload={handleImageUpload}
                onImageRemove={handleRemoveImage}
                onFileInputClick={handleFileInputClick}
              />
            )}

            {activeTab === 'gradient' && (
              <GradientTab 
                backgroundSettings={backgroundSettings}
                onChange={updateBackgroundSettings}
              />
            )}

            {activeTab === 'typography' && (
              <TypographyTab 
                textSettings={textSettings}
                onChange={updateTextSettings}
              />
            )}

            {activeTab === 'filters' && (
              <FiltersTab 
                filters={backgroundSettings.filters}
                onChange={(filters) => updateBackgroundSettings({ filters })}
                onReset={handleResetFilters}
              />
            )}
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-900 space-y-2 lg:space-y-3">
            <div className="flex gap-2 lg:gap-3">
              <button 
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 py-3 lg:py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black uppercase tracking-widest text-[9px] lg:text-[10px] rounded-xl lg:rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Download size={14} /> {isExporting ? 'Exporting...' : 'Export PNG'}
              </button>
              <button 
                onClick={handleSave} 
                className="flex-1 py-3 lg:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-widest text-[9px] lg:text-[10px] rounded-xl lg:rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Save size={14} /> Apply
              </button>
            </div>
            <button 
              onClick={resetAll}
              className="w-full py-2 lg:py-3 text-[9px] lg:text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={10} /> Reset All
            </button>
          </div>
        </div>

        {/* ==================== RIGHT PANEL: PREVIEW ==================== */}
        <div className="flex-1 order-1 lg:order-2 relative flex flex-col overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 min-h-[40vh] lg:min-h-0">
          
          <ZoomControls 
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onZoomReset={handleZoomReset}
          />

          {/* Preview Area */}
          <div className="flex-1 overflow-auto p-4 lg:p-12 flex items-center justify-center">
            <div 
              style={{ 
                transform: `scale(${zoom / 100})`, 
                transformOrigin: 'center',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
              }}
              className="relative flex-shrink-0"
            >
              <div 
                className="rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] ring-1 ring-slate-900/10" 
                style={{ 
                  width: '320px',
                  backgroundColor: '#e2e8f0',
                  backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%, #cbd5e1), repeating-linear-gradient(45deg, #cbd5e1 25%, #f1f5f9 25%, #f1f5f9 75%, #cbd5e1 75%, #cbd5e1)', 
                  backgroundPosition: '0 0, 8px 8px', 
                  backgroundSize: '16px 16px' 
                }}
              >
                <PosterPreview 
                  posterRef={posterRef} 
                  schedule={schedule} 
                  previewStyle={previewStyle} 
                  overlayStyle={overlayStyle} 
                  textSettings={textSettings}
                  aspectRatioClass={ASPECT_RATIOS[aspectRatio].class} 
                />
              </div>
            </div>
          </div>

          <InfoBar 
            width={ASPECT_RATIOS[aspectRatio].width}
            height={ASPECT_RATIOS[aspectRatio].height}
          />
        </div>

      </div>
    </div>
  );
}