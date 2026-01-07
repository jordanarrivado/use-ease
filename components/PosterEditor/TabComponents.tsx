import { Calendar, Type, Users, Eye, EyeOff, Image, Trash2, Shuffle, RotateCcw, Maximize } from 'lucide-react';
import { BackgroundSettings, TextSettings, AlignType, RatioType, FilterKey } from '@/lib/types';
import { ASPECT_RATIOS, LAYOUT_PRESETS, COLOR_PALETTE_FLAT, GRADIENT_PRESETS, FONT_STYLE_PRESETS, FILTER_CONFIG } from './constants';
import { labelClasses } from './UIComponents';

interface AspectRatioSelectorProps {
  aspectRatio: RatioType;
  onChange: (ratio: RatioType) => void;
}

export function AspectRatioSelector({ aspectRatio, onChange }: AspectRatioSelectorProps) {
  return (
    <section>
      <label className={labelClasses}>Aspect Ratio</label>
      <div className="grid grid-cols-3 gap-2 lg:gap-3">
        {(Object.keys(ASPECT_RATIOS) as RatioType[]).map((r) => (
          <button 
            key={r} 
            onClick={() => onChange(r)} 
            className={`flex flex-col items-center gap-1.5 lg:gap-2 py-3 lg:py-4 rounded-xl lg:rounded-2xl border-2 transition-all ${
              aspectRatio === r 
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 shadow-lg' 
                : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-indigo-300'
            }`}
          >
            <Maximize size={14} className={r === 'story' ? 'rotate-90' : ''} />
            <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-tighter">{r}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

interface LayoutTabProps {
  textSettings: TextSettings;
  backgroundSettings: BackgroundSettings;
  showOverlay: boolean;
  onTextChange: (settings: Partial<TextSettings>) => void;
  onBackgroundChange: (settings: Partial<BackgroundSettings>) => void;
  onOverlayToggle: () => void;
  onRandomPreset: () => void;
}

export function LayoutTab({ 
  textSettings, 
  backgroundSettings, 
  showOverlay, 
  onTextChange, 
  onBackgroundChange, 
  onOverlayToggle,
  onRandomPreset 
}: LayoutTabProps) {
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Quick Layouts */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <label className={labelClasses}>Quick Layouts</label>
          <button 
            onClick={onRandomPreset}
            className="text-[9px] font-black uppercase text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <Shuffle size={12} /> Random
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:gap-3">
          {LAYOUT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onTextChange({
                  title: { ...textSettings.title, ...preset.text.title },
                  content: { ...textSettings.content, ...preset.text.content },
                  layoutStyle: preset.text.layoutStyle
                });
                onBackgroundChange({ overlay: { ...preset.overlay } });
              }}
              className={`group p-3 lg:p-4 rounded-xl lg:rounded-2xl border-2 transition-all text-left ${
                textSettings.layoutStyle === preset.text.layoutStyle
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10'
                  : 'border-slate-100 dark:border-slate-800 hover:border-indigo-300'
              }`}
            >
              <div className="text-xs lg:text-sm font-black uppercase tracking-tight mb-0.5 lg:mb-1">
                {preset.name}
              </div>
              <div className="text-[8px] lg:text-[9px] text-slate-400 mb-2 lg:mb-3">
                {preset.description}
              </div>
              <div className="h-10 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700" />
            </button>
          ))}
        </div>
      </section>

      {/* Content Visibility */}
      <section>
        <label className={labelClasses}>Show/Hide Elements</label>
        <div className="space-y-2">
          {[
            { key: 'showDate', label: 'Date & Time', icon: Calendar },
            { key: 'showDescription', label: 'Description', icon: Type },
            { key: 'showAssignees', label: 'Participants', icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <label 
              key={key}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon size={14} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {label}
                </span>
              </div>
              <input
                type="checkbox"
                checked={(textSettings as any)[key]}
                onChange={(e) => onTextChange({ [key]: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 accent-indigo-600"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Overlay Settings */}
      <section>
        <label className={labelClasses}>Overlay</label>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Show overlay
            </span>
            <button
              onClick={onOverlayToggle}
              className={`p-2 rounded-lg transition-all ${
                showOverlay ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {showOverlay ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase mb-2 block">Color</span>
              <input 
                type="color" 
                value={backgroundSettings.overlay.color} 
                onChange={(e) => onBackgroundChange({ 
                  overlay: { ...backgroundSettings.overlay, color: e.target.value } 
                })} 
                className="w-full h-10 lg:h-12 rounded-lg lg:rounded-xl cursor-pointer border-2 border-slate-200 dark:border-slate-700" 
              />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase mb-2 block">
                Opacity: {backgroundSettings.overlay.opacity}%
              </span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={backgroundSettings.overlay.opacity} 
                onChange={(e) => onBackgroundChange({ 
                  overlay: { ...backgroundSettings.overlay, opacity: Number(e.target.value) } 
                })} 
                className="w-full h-10 lg:h-12 accent-indigo-600" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== IMAGE TAB ====================
interface ImageTabProps {
  image: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onFileInputClick: () => void;
}

export function ImageTab({ image, fileInputRef, onImageUpload, onImageRemove, onFileInputClick }: ImageTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <input 
        ref={fileInputRef}
        type="file" 
        className="hidden" 
        accept="image/*"
        onChange={onImageUpload}
      />
      <button 
        onClick={onFileInputClick}
        className="flex flex-col items-center justify-center w-full h-40 lg:h-48 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-3xl cursor-pointer hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group"
      >
        <div className="w-12 lg:w-16 h-12 lg:h-16 bg-slate-100 dark:bg-slate-800 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
          <Image className="text-slate-400 group-hover:text-indigo-500" size={24} />
        </div>
        <span className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-widest">
          Upload Background
        </span>
        <span className="text-[9px] lg:text-[10px] text-slate-400 mt-1">PNG, JPG up to 10MB</span>
      </button>
      
      {image && (
        <div className="space-y-3">
          <div className="relative w-full h-28 lg:h-32 rounded-xl lg:rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            <img 
              src={image} 
              alt="Background preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={onImageRemove} 
            className="w-full py-2.5 lg:py-3 text-[9px] lg:text-[10px] font-black uppercase text-red-500 bg-red-50 dark:bg-red-950/30 rounded-xl lg:rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
          >
            <Trash2 size={12} /> Remove Image
          </button>
        </div>
      )}
    </div>
  );
}

// ==================== GRADIENT TAB ====================
interface GradientTabProps {
  backgroundSettings: BackgroundSettings;
  onChange: (settings: Partial<BackgroundSettings>) => void;
}

export function GradientTab({ backgroundSettings, onChange }: GradientTabProps) {
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <label className={labelClasses}>Gradient Presets</label>
        <div className="grid grid-cols-4 gap-1.5 lg:gap-2">
          {GRADIENT_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange({
                image: '',
                gradient: { 
                  ...backgroundSettings.gradient, 
                  color1: preset.color1, 
                  color2: preset.color2, 
                  angle: preset.angle 
                }
              })}
              className="group relative h-10 lg:h-12 rounded-lg lg:rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-500 hover:scale-105 transition-all"
              style={{ 
                backgroundImage: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})` 
              }}
              title={preset.name}
            />
          ))}
        </div>
      </section>

      <section>
        <label className={labelClasses}>Gradient Type</label>
        <div className="grid grid-cols-3 gap-2">
          {(['linear', 'radial', 'conic'] as const).map((t) => (
            <button 
              key={t} 
              onClick={() => onChange({ 
                gradient: { ...backgroundSettings.gradient, type: `${t}-gradient` } 
              })} 
              className={`py-2.5 lg:py-3 rounded-lg lg:rounded-xl border-2 text-[9px] lg:text-[10px] font-black uppercase transition-all ${
                backgroundSettings.gradient.type.includes(t) 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' 
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:border-indigo-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:gap-4">
        <div>
          <label className={labelClasses}>Color 1</label>
          <input 
            type="color" 
            value={backgroundSettings.gradient.color1} 
            onChange={(e) => onChange({ 
              gradient: { ...backgroundSettings.gradient, color1: e.target.value } 
            })} 
            className="w-full h-12 lg:h-14 rounded-lg lg:rounded-xl cursor-pointer border-2 border-slate-200 dark:border-slate-700" 
          />
        </div>
        <div>
          <label className={labelClasses}>Color 2</label>
          <input 
            type="color" 
            value={backgroundSettings.gradient.color2} 
            onChange={(e) => onChange({ 
              gradient: { ...backgroundSettings.gradient, color2: e.target.value } 
            })} 
            className="w-full h-12 lg:h-14 rounded-lg lg:rounded-xl cursor-pointer border-2 border-slate-200 dark:border-slate-700" 
          />
        </div>
      </section>

      {backgroundSettings.gradient.type !== 'radial-gradient' && (
        <section>
          <div className="flex justify-between mb-2 lg:mb-3">
            <label className={labelClasses}>Angle</label>
            <span className="text-[10px] font-black text-indigo-500">
              {backgroundSettings.gradient.angle}°
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={backgroundSettings.gradient.angle} 
            onChange={(e) => onChange({ 
              gradient: { ...backgroundSettings.gradient, angle: Number(e.target.value) } 
            })} 
            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600" 
          />
        </section>
      )}
    </div>
  );
}

// ==================== TYPOGRAPHY TAB ====================
interface TypographyTabProps {
  textSettings: TextSettings;
  onChange: (settings: Partial<TextSettings>) => void;
}

export function TypographyTab({ textSettings, onChange }: TypographyTabProps) {
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <label className={labelClasses}>Font Style</label>
        <div className="grid grid-cols-2 gap-2 lg:gap-3">
          {FONT_STYLE_PRESETS.map((font) => (
            <button
              key={font.id}
              onClick={() => onChange({
                title: {
                  ...textSettings.title,
                  fontStyle: font.class,
                  fontFamily: font.class,
                  fontWeight: font.weight,
                  letterSpacing: font.spacing
                },
              })}
              className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl border-2 transition-all text-left ${
                textSettings.title.fontStyle === font.class
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
              }`}
            >
              <div className={`text-xl lg:text-2xl ${font.class}`} style={{ fontWeight: font.weight }}>Aa</div>
              <div className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest mt-1.5 lg:mt-2 text-slate-400">
                {font.name}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <label className={labelClasses}>Alignment</label>
        <div className="grid grid-cols-3 gap-2">
          {(['left', 'center', 'right'] as AlignType[]).map((align) => (
            <button
              key={align}
              onClick={() => onChange({
                title: { ...textSettings.title, align },
                content: { ...textSettings.content, align }
              })}
              className={`py-2.5 lg:py-3 rounded-lg lg:rounded-xl border-2 text-[9px] lg:text-[10px] font-black uppercase transition-all ${
                textSettings.title.align === align
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:border-indigo-300'
              }`}
            >
              {align}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between mb-2 lg:mb-3">
          <label className={labelClasses}>Title Size</label>
          <span className="text-[10px] font-black text-indigo-500">
            {textSettings.title.fontSize}px
          </span>
        </div>
        <input 
          type="range" 
          min="24" 
          max="72" 
          value={textSettings.title.fontSize}
          onChange={(e) => onChange({
            title: { ...textSettings.title, fontSize: Number(e.target.value) }
          })}
          className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600" 
        />
      </section>

      <section>
        <label className={labelClasses}>Text Color</label>
        <div className="flex gap-2">
          <input 
            type="color" 
            value={textSettings.title.color}
            onChange={(e) => onChange({
              title: { ...textSettings.title, color: e.target.value },
              content: { ...textSettings.content, color: e.target.value }
            })}
            className="w-12 lg:w-14 h-12 lg:h-14 rounded-lg lg:rounded-xl cursor-pointer border-2 border-slate-200 dark:border-slate-700 shrink-0" 
          />
          <div className="flex-1 flex gap-1.5 lg:gap-2 overflow-x-auto pb-2">
            {/* Use COLOR_PALETTE_FLAT */}
            {COLOR_PALETTE_FLAT.map(c => (
              <button 
                key={c} 
                onClick={() => onChange({ 
                  title: { ...textSettings.title, color: c }, 
                  content: { ...textSettings.content, color: c } 
                })}
                className="w-10 lg:w-12 h-10 lg:h-12 rounded-lg lg:rounded-xl border-2 border-slate-200 dark:border-slate-700 shrink-0 hover:scale-110 transition-transform" 
                style={{ backgroundColor: c }} 
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <input
            type="checkbox"
            checked={textSettings.title.shadow}
            onChange={(e) => onChange({
              title: { ...textSettings.title, shadow: e.target.checked }
            })}
            className="w-4 h-4 rounded border-slate-300 accent-indigo-600"
          />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Add text shadow
          </span>
        </label>
      </section>
    </div>
  );
}

// ==================== FILTERS TAB ====================
interface FiltersTabProps {
  filters: BackgroundSettings['filters'];
  onChange: (filters: BackgroundSettings['filters']) => void;
  onReset: () => void;
}

export function FiltersTab({ filters, onChange, onReset }: FiltersTabProps) {
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {FILTER_CONFIG.map(({ key, label, max, unit }) => (
        <section key={key}>
          <div className="flex justify-between mb-2 lg:mb-3">
            <label className={labelClasses}>{label}</label>
            <span className="text-[10px] font-black text-indigo-500">
              {filters[key]}{unit}
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={max} 
            value={filters[key]} 
            onChange={(e) => onChange({ 
              ...filters, 
              [key]: Number(e.target.value) 
            })} 
            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600" 
          />
        </section>
      ))}
      
      <button 
        onClick={onReset} 
        className="w-full py-3 lg:py-4 text-[9px] lg:text-[10px] font-black uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-xl lg:rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
      >
        <RotateCcw size={12} /> Reset Filters
      </button>
    </div>
  );
}