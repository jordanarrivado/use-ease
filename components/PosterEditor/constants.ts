import { RatioType, FilterKey, BackgroundSettings, TextSettings, AlignType, LayoutStyleType } from '@/lib/types';

// ============================================
// ASPECT RATIOS
// ============================================
export const ASPECT_RATIOS: Record<RatioType, { name: string; class: string; label: string; width: number; height: number; platform?: string }> = {
  portrait: { name: 'Portrait', class: 'aspect-[3/4]', label: '3:4', width: 900, height: 1200, platform: 'Instagram Post' },
  story: { name: 'Story', class: 'aspect-[9/16]', label: '9:16', width: 1080, height: 1920, platform: 'Instagram/TikTok Story' },
  square: { name: 'Square', class: 'aspect-square', label: '1:1', width: 1080, height: 1080, platform: 'Instagram/Facebook' },
  landscape: { name: 'Landscape', class: 'aspect-[16/9]', label: '16:9', width: 1920, height: 1080, platform: 'YouTube/Twitter' },
  wide: { name: 'Wide', class: 'aspect-[2/1]', label: '2:1', width: 1200, height: 600, platform: 'Twitter Header' },
  pinterest: { name: 'Pinterest', class: 'aspect-[2/3]', label: '2:3', width: 1000, height: 1500, platform: 'Pinterest' },
};

// ============================================
// GRADIENT PRESETS - Organized by mood/style
// ============================================
export const GRADIENT_PRESETS = [
  // Dark & Professional
  { name: 'Midnight', color1: '#0f172a', color2: '#1e293b', angle: 135, category: 'dark' },
  { name: 'Obsidian', color1: '#0a0a0a', color2: '#262626', angle: 180, category: 'dark' },
  { name: 'Deep Space', color1: '#000428', color2: '#004e92', angle: 135, category: 'dark' },
  { name: 'Royal Night', color1: '#141e30', color2: '#243b55', angle: 135, category: 'dark' },
  { name: 'Charcoal', color1: '#232526', color2: '#414345', angle: 180, category: 'dark' },
  
  // Vibrant & Energetic
  { name: 'Electric', color1: '#ff00cc', color2: '#3333ff', angle: 135, category: 'vibrant' },
  { name: 'Neon Burst', color1: '#f72585', color2: '#7209b7', angle: 45, category: 'vibrant' },
  { name: 'Cyber Punk', color1: '#ff006e', color2: '#8338ec', angle: 120, category: 'vibrant' },
  { name: 'Solar Flare', color1: '#f83600', color2: '#f9d423', angle: 180, category: 'vibrant' },
  { name: 'Tropical', color1: '#ff6b6b', color2: '#feca57', angle: 135, category: 'vibrant' },
  
  // Soft & Elegant
  { name: 'Rose Quartz', color1: '#f5e6e8', color2: '#d5c6e0', angle: 135, category: 'soft' },
  { name: 'Blush', color1: '#ffecd2', color2: '#fcb69f', angle: 135, category: 'soft' },
  { name: 'Lavender Mist', color1: '#e0c3fc', color2: '#8ec5fc', angle: 120, category: 'soft' },
  { name: 'Cotton Candy', color1: '#ff9a9e', color2: '#fecfef', angle: 135, category: 'soft' },
  { name: 'Peach Cream', color1: '#fff1eb', color2: '#ace0f9', angle: 135, category: 'soft' },
  
  // Nature Inspired
  { name: 'Forest', color1: '#134e5e', color2: '#71b280', angle: 135, category: 'nature' },
  { name: 'Ocean Breeze', color1: '#2193b0', color2: '#6dd5ed', angle: 135, category: 'nature' },
  { name: 'Aurora', color1: '#00c9ff', color2: '#92fe9d', angle: 45, category: 'nature' },
  { name: 'Sunset Beach', color1: '#fa709a', color2: '#fee140', angle: 45, category: 'nature' },
  { name: 'Northern Lights', color1: '#43cea2', color2: '#185a9d', angle: 135, category: 'nature' },
  
  // Premium & Luxury
  { name: 'Gold Rush', color1: '#f7971e', color2: '#ffd200', angle: 135, category: 'luxury' },
  { name: 'Rose Gold', color1: '#b76e79', color2: '#f8cecc', angle: 45, category: 'luxury' },
  { name: 'Champagne', color1: '#d4a574', color2: '#e8d5b7', angle: 135, category: 'luxury' },
  { name: 'Platinum', color1: '#c9d6df', color2: '#f0f5f9', angle: 180, category: 'luxury' },
  { name: 'Black Gold', color1: '#1a1a2e', color2: '#c9a227', angle: 135, category: 'luxury' },
  
  // Modern & Trendy
  { name: 'Mesh Purple', color1: '#667eea', color2: '#764ba2', angle: 135, category: 'modern' },
  { name: 'Glass Blue', color1: '#4facfe', color2: '#00f2fe', angle: 135, category: 'modern' },
  { name: 'Holographic', color1: '#a8edea', color2: '#fed6e3', angle: 45, category: 'modern' },
  { name: 'Gradient X', color1: '#6366f1', color2: '#a855f7', angle: 135, category: 'modern' },
  { name: 'Neo Tokyo', color1: '#f953c6', color2: '#b91d73', angle: 180, category: 'modern' },
] as const;

export const GRADIENT_CATEGORIES = ['all', 'dark', 'vibrant', 'soft', 'nature', 'luxury', 'modern'] as const;

// ============================================
// FONT STYLE PRESETS
// ============================================
export const FONT_STYLE_PRESETS = [
  { id: 'modern', name: 'Modern', class: 'font-sans', weight: 700, spacing: -0.02, description: 'Clean and contemporary' },
  { id: 'editorial', name: 'Editorial', class: 'font-serif', weight: 700, spacing: 0, description: 'Magazine style' },
  { id: 'luxury', name: 'Luxury', class: 'font-serif', weight: 400, spacing: 0.15, description: 'Elegant and refined' },
  { id: 'tech', name: 'Tech', class: 'font-mono', weight: 600, spacing: -0.02, description: 'Digital aesthetic' },
  { id: 'bold', name: 'Bold', class: 'font-sans', weight: 900, spacing: -0.04, description: 'Maximum impact' },
  { id: 'elegant', name: 'Elegant', class: 'font-serif', weight: 300, spacing: 0.2, description: 'Light and sophisticated' },
  { id: 'playful', name: 'Playful', class: 'font-sans', weight: 600, spacing: 0.02, description: 'Fun and friendly' },
  { id: 'minimal', name: 'Minimal', class: 'font-sans', weight: 400, spacing: 0.05, description: 'Simple and clean' },
  { id: 'vintage', name: 'Vintage', class: 'font-serif', weight: 500, spacing: 0.1, description: 'Classic retro feel' },
  { id: 'corporate', name: 'Corporate', class: 'font-sans', weight: 600, spacing: 0, description: 'Professional business' },
] as const;

// ============================================
// LAYOUT PRESETS
// ============================================
export const LAYOUT_PRESETS = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional centered layout',
    icon: '⬜',
    text: { 
      title: { align: 'center' as AlignType, fontSize: 42, fontWeight: 700, letterSpacing: -0.02 }, 
      content: { align: 'center' as AlignType, opacity: 0.85 },
      layoutStyle: 'classic' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 30 },
    padding: { top: 'auto', bottom: 'auto' },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean left-aligned layout',
    icon: '◧',
    text: { 
      title: { align: 'left' as AlignType, fontSize: 48, fontWeight: 800, letterSpacing: -0.03 }, 
      content: { align: 'left' as AlignType, opacity: 0.8 },
      layoutStyle: 'modern' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 25 },
    padding: { top: 'auto', bottom: '2rem' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and understated',
    icon: '○',
    text: { 
      title: { align: 'left' as AlignType, fontSize: 36, fontWeight: 500, letterSpacing: 0 }, 
      content: { align: 'left' as AlignType, opacity: 0.7 },
      layoutStyle: 'minimal' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 15 },
    padding: { top: '2rem', bottom: '2rem' },
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High impact statement',
    icon: '◼',
    text: { 
      title: { align: 'center' as AlignType, fontSize: 56, fontWeight: 900, letterSpacing: -0.04 }, 
      content: { align: 'center' as AlignType, opacity: 0.9 },
      layoutStyle: 'bold' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 40 },
    padding: { top: 'auto', bottom: 'auto' },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and refined',
    icon: '◇',
    text: { 
      title: { align: 'center' as AlignType, fontSize: 38, fontWeight: 400, letterSpacing: 0.1 }, 
      content: { align: 'center' as AlignType, opacity: 0.75 },
      layoutStyle: 'classic' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 20 },
    padding: { top: 'auto', bottom: 'auto' },
  },
  {
    id: 'magazine',
    name: 'Magazine',
    description: 'Editorial publication style',
    icon: '▭',
    text: { 
      title: { align: 'left' as AlignType, fontSize: 52, fontWeight: 700, letterSpacing: -0.01 }, 
      content: { align: 'left' as AlignType, opacity: 0.8 },
      layoutStyle: 'modern' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 35 },
    padding: { top: '3rem', bottom: '1.5rem' },
  },
  {
    id: 'split',
    name: 'Split',
    description: 'Text on one side',
    icon: '⬓',
    text: { 
      title: { align: 'right' as AlignType, fontSize: 44, fontWeight: 700, letterSpacing: -0.02 }, 
      content: { align: 'right' as AlignType, opacity: 0.85 },
      layoutStyle: 'modern' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 30 },
    padding: { top: 'auto', bottom: 'auto' },
  },
  {
    id: 'headline',
    name: 'Headline',
    description: 'News-style big title',
    icon: '▬',
    text: { 
      title: { align: 'center' as AlignType, fontSize: 64, fontWeight: 900, letterSpacing: -0.05 }, 
      content: { align: 'center' as AlignType, opacity: 0.9 },
      layoutStyle: 'bold' as LayoutStyleType
    },
    overlay: { color: '#000000', opacity: 45 },
    padding: { top: 'auto', bottom: 'auto' },
  },
] as const;

// ============================================
// COLOR PALETTES - Organized by theme
// ============================================
export const COLOR_PALETTE = {
  basic: [
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Dark Gray', value: '#374151' },
    { name: 'Light Gray', value: '#d1d5db' },
  ],
  brand: [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Blue', value: '#3b82f6' },
  ],
  accent: [
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Violet', value: '#8b5cf6' },
  ],
  pastel: [
    { name: 'Soft Pink', value: '#fce7f3' },
    { name: 'Soft Blue', value: '#dbeafe' },
    { name: 'Soft Green', value: '#dcfce7' },
    { name: 'Soft Purple', value: '#f3e8ff' },
    { name: 'Soft Yellow', value: '#fef9c3' },
  ],
  dark: [
    { name: 'Slate', value: '#1e293b' },
    { name: 'Zinc', value: '#27272a' },
    { name: 'Stone', value: '#292524' },
    { name: 'Navy', value: '#0f172a' },
    { name: 'Charcoal', value: '#171717' },
  ],
} as const;

// Flat color array for quick access
export const COLOR_PALETTE_FLAT = [
  '#ffffff', '#000000', '#6366f1', '#a855f7', '#ec4899',
  '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
  '#f97316', '#06b6d4', '#1e293b', '#fce7f3', '#dbeafe',
] as const;

// ============================================
// FILTER CONFIGURATION
// ============================================
export const FILTER_CONFIG: { key: FilterKey; label: string; min: number; max: number; default: number; unit: string; icon: string }[] = [
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, default: 100, unit: '%', icon: '☀️' },
  { key: 'contrast', label: 'Contrast', min: 0, max: 200, default: 100, unit: '%', icon: '◐' },
  { key: 'saturation', label: 'Saturation', min: 0, max: 200, default: 100, unit: '%', icon: '🎨' },
  { key: 'blur', label: 'Blur', min: 0, max: 20, default: 0, unit: 'px', icon: '💧' },
];

// ============================================
// FILTER PRESETS
// ============================================
export const FILTER_PRESETS = [
  { name: 'None', brightness: 100, contrast: 100, saturation: 100, blur: 0 },
  { name: 'Vivid', brightness: 110, contrast: 120, saturation: 130, blur: 0 },
  { name: 'Muted', brightness: 100, contrast: 90, saturation: 70, blur: 0 },
  { name: 'Vintage', brightness: 95, contrast: 85, saturation: 80, blur: 0 },
  { name: 'Dramatic', brightness: 90, contrast: 140, saturation: 110, blur: 0 },
  { name: 'Soft', brightness: 105, contrast: 95, saturation: 95, blur: 2 },
  { name: 'B&W', brightness: 100, contrast: 110, saturation: 0, blur: 0 },
  { name: 'Dreamy', brightness: 115, contrast: 85, saturation: 90, blur: 4 },
  { name: 'Cool', brightness: 100, contrast: 105, saturation: 85, blur: 0 },
  { name: 'Warm', brightness: 105, contrast: 100, saturation: 120, blur: 0 },
] as const;

// ============================================
// OVERLAY PRESETS
// ============================================
export const OVERLAY_PRESETS = [
  { name: 'None', color: '#000000', opacity: 0 },
  { name: 'Light', color: '#000000', opacity: 15 },
  { name: 'Medium', color: '#000000', opacity: 30 },
  { name: 'Dark', color: '#000000', opacity: 50 },
  { name: 'Heavy', color: '#000000', opacity: 70 },
  { name: 'White Fade', color: '#ffffff', opacity: 20 },
  { name: 'Blue Tint', color: '#1e3a5f', opacity: 40 },
  { name: 'Warm Tint', color: '#7c2d12', opacity: 30 },
  { name: 'Purple Haze', color: '#4c1d95', opacity: 35 },
  { name: 'Green Tint', color: '#14532d', opacity: 30 },
] as const;

// ============================================
// SHADOW PRESETS
// ============================================
export const TEXT_SHADOW_PRESETS = [
  { name: 'None', value: 'none' },
  { name: 'Subtle', value: '0 1px 2px rgba(0,0,0,0.3)' },
  { name: 'Medium', value: '0 2px 4px rgba(0,0,0,0.4)' },
  { name: 'Strong', value: '0 4px 8px rgba(0,0,0,0.5)' },
  { name: 'Glow', value: '0 0 20px rgba(255,255,255,0.5)' },
  { name: 'Neon', value: '0 0 10px currentColor, 0 0 20px currentColor' },
  { name: 'Hard', value: '2px 2px 0 rgba(0,0,0,0.8)' },
  { name: 'Outline', value: '-1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' },
] as const;

// ============================================
// COMPLETE STYLE PRESETS (One-click themes)
// ============================================
export const STYLE_PRESETS = [
  {
    id: 'professional-dark',
    name: 'Professional Dark',
    description: 'Sleek corporate look',
    thumbnail: '/presets/professional-dark.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 135, color1: '#0f172a', color2: '#1e293b', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 20 },
      filters: { brightness: 100, contrast: 100, blur: 0, saturation: 100 },
    },
    text: {
      title: { color: '#ffffff', fontSize: 44, align: 'left' as AlignType, fontFamily: 'font-sans', fontStyle: 'font-sans', fontWeight: 700, shadow: true, letterSpacing: -0.02 },
      content: { color: '#94a3b8', opacity: 0.9, align: 'left' as AlignType },
      layoutStyle: 'modern' as LayoutStyleType,
    },
  },
  {
    id: 'vibrant-gradient',
    name: 'Vibrant Gradient',
    description: 'Eye-catching colorful design',
    thumbnail: '/presets/vibrant-gradient.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 135, color1: '#667eea', color2: '#764ba2', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 15 },
      filters: { brightness: 100, contrast: 105, blur: 0, saturation: 110 },
    },
    text: {
      title: { color: '#ffffff', fontSize: 48, align: 'center' as AlignType, fontFamily: 'font-sans', fontStyle: 'font-sans', fontWeight: 800, shadow: true, letterSpacing: -0.03 },
      content: { color: '#ffffff', opacity: 0.9, align: 'center' as AlignType },
      layoutStyle: 'bold' as LayoutStyleType,
    },
  },
  {
    id: 'elegant-minimal',
    name: 'Elegant Minimal',
    description: 'Sophisticated and clean',
    thumbnail: '/presets/elegant-minimal.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 180, color1: '#fafafa', color2: '#e5e5e5', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 0 },
      filters: { brightness: 100, contrast: 100, blur: 0, saturation: 100 },
    },
    text: {
      title: { color: '#171717', fontSize: 40, align: 'center' as AlignType, fontFamily: 'font-serif', fontStyle: 'font-serif', fontWeight: 400, shadow: false, letterSpacing: 0.1 },
      content: { color: '#525252', opacity: 0.85, align: 'center' as AlignType },
      layoutStyle: 'classic' as LayoutStyleType,
    },
  },
  {
    id: 'bold-statement',
    name: 'Bold Statement',
    description: 'Maximum visual impact',
    thumbnail: '/presets/bold-statement.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 135, color1: '#000000', color2: '#1a1a1a', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 0 },
      filters: { brightness: 100, contrast: 110, blur: 0, saturation: 100 },
    },
    text: {
      title: { color: '#ffffff', fontSize: 56, align: 'center' as AlignType, fontFamily: 'font-sans', fontStyle: 'font-sans', fontWeight: 900, shadow: true, letterSpacing: -0.04 },
      content: { color: '#ffffff', opacity: 0.85, align: 'center' as AlignType },
      layoutStyle: 'bold' as LayoutStyleType,
    },
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel',
    description: 'Gentle and inviting',
    thumbnail: '/presets/soft-pastel.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 135, color1: '#fce7f3', color2: '#ddd6fe', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 5 },
      filters: { brightness: 102, contrast: 98, blur: 0, saturation: 95 },
    },
    text: {
      title: { color: '#4c1d95', fontSize: 42, align: 'center' as AlignType, fontFamily: 'font-sans', fontStyle: 'font-sans', fontWeight: 600, shadow: false, letterSpacing: 0 },
      content: { color: '#6b21a8', opacity: 0.8, align: 'center' as AlignType },
      layoutStyle: 'classic' as LayoutStyleType,
    },
  },
  {
    id: 'neon-nights',
    name: 'Neon Nights',
    description: 'Cyberpunk aesthetic',
    thumbnail: '/presets/neon-nights.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 135, color1: '#0a0a0a', color2: '#1a0a2e', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 10 },
      filters: { brightness: 100, contrast: 115, blur: 0, saturation: 120 },
    },
    text: {
      title: { color: '#f0abfc', fontSize: 48, align: 'center' as AlignType, fontFamily: 'font-sans', fontStyle: 'font-sans', fontWeight: 800, shadow: true, letterSpacing: -0.02 },
      content: { color: '#c4b5fd', opacity: 0.9, align: 'center' as AlignType },
      layoutStyle: 'bold' as LayoutStyleType,
    },
  },
  {
    id: 'nature-fresh',
    name: 'Nature Fresh',
    description: 'Organic and natural feel',
    thumbnail: '/presets/nature-fresh.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 180, color1: '#ecfdf5', color2: '#d1fae5', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 0 },
      filters: { brightness: 100, contrast: 100, blur: 0, saturation: 100 },
    },
    text: {
      title: { color: '#065f46', fontSize: 44, align: 'left' as AlignType, fontFamily: 'font-serif', fontStyle: 'font-serif', fontWeight: 600, shadow: false, letterSpacing: 0 },
      content: { color: '#047857', opacity: 0.85, align: 'left' as AlignType },
      layoutStyle: 'modern' as LayoutStyleType,
    },
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Premium and exclusive',
    thumbnail: '/presets/luxury-gold.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 135, color1: '#1a1a1a', color2: '#2d2d2d', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 10 },
      filters: { brightness: 100, contrast: 105, blur: 0, saturation: 100 },
    },
    text: {
      title: { color: '#d4af37', fontSize: 46, align: 'center' as AlignType, fontFamily: 'font-serif', fontStyle: 'font-serif', fontWeight: 400, shadow: true, letterSpacing: 0.15 },
      content: { color: '#f5deb3', opacity: 0.85, align: 'center' as AlignType },
      layoutStyle: 'classic' as LayoutStyleType,
    },
  },
  {
    id: 'ocean-vibes',
    name: 'Ocean Vibes',
    description: 'Calm and refreshing',
    thumbnail: '/presets/ocean-vibes.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 180, color1: '#0ea5e9', color2: '#0284c7', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 20 },
      filters: { brightness: 100, contrast: 100, blur: 0, saturation: 105 },
    },
    text: {
      title: { color: '#ffffff', fontSize: 44, align: 'center' as AlignType, fontFamily: 'font-sans', fontStyle: 'font-sans', fontWeight: 700, shadow: true, letterSpacing: -0.01 },
      content: { color: '#e0f2fe', opacity: 0.9, align: 'center' as AlignType },
      layoutStyle: 'classic' as LayoutStyleType,
    },
  },
  {
    id: 'sunset-warm',
    name: 'Sunset Warm',
    description: 'Warm and inviting atmosphere',
    thumbnail: '/presets/sunset-warm.jpg',
    background: {
      gradient: { type: 'linear-gradient', angle: 135, color1: '#f97316', color2: '#ea580c', stop1: 0, stop2: 100 },
      overlay: { color: '#000000', opacity: 25 },
      filters: { brightness: 100, contrast: 105, blur: 0, saturation: 110 },
    },
    text: {
      title: { color: '#ffffff', fontSize: 46, align: 'left' as AlignType, fontFamily: 'font-sans', fontStyle: 'font-sans', fontWeight: 700, shadow: true, letterSpacing: -0.02 },
      content: { color: '#fef3c7', opacity: 0.9, align: 'left' as AlignType },
      layoutStyle: 'modern' as LayoutStyleType,
    },
  },
] as const;

// ============================================
// DEFAULT SETTINGS
// ============================================
export const DEFAULT_BACKGROUND_SETTINGS: BackgroundSettings = {
  image: '',
  gradient: { type: 'linear-gradient', angle: 135, color1: '#6366f1', color2: '#a855f7', stop1: 0, stop2: 100 },
  overlay: { color: '#000000', opacity: 25 },
  filters: { brightness: 100, contrast: 100, blur: 0, saturation: 100 },
};

export const DEFAULT_TEXT_SETTINGS: TextSettings = {
  title: { 
    color: '#ffffff', 
    fontSize: 42, 
    align: 'center', 
    fontFamily: 'font-sans', 
    fontStyle: 'font-sans', 
    fontWeight: 700, 
    shadow: true,
    letterSpacing: -0.02
  },
  content: { color: '#ffffff', opacity: 0.85, align: 'center' },
  layoutStyle: 'classic',
  showDate: true,
  showAssignees: true,
  showDescription: true
};

// ============================================
// TYPOGRAPHY SCALE
// ============================================
export const FONT_SIZES = {
  xs: 24,
  sm: 32,
  md: 42,
  lg: 52,
  xl: 64,
  '2xl': 80,
} as const;

export const FONT_WEIGHTS = [
  { value: 100, label: 'Thin' },
  { value: 200, label: 'Extra Light' },
  { value: 300, label: 'Light' },
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semi Bold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
  { value: 900, label: 'Black' },
] as const;

export const LETTER_SPACING_OPTIONS = [
  { value: -0.05, label: 'Tight' },
  { value: -0.02, label: 'Slightly Tight' },
  { value: 0, label: 'Normal' },
  { value: 0.05, label: 'Slightly Wide' },
  { value: 0.1, label: 'Wide' },
  { value: 0.2, label: 'Extra Wide' },
] as const;

// ============================================
// TAB CONFIGURATION
// ============================================
export const EDITOR_TABS = [
  { id: 'style', name: 'Style', icon: '🎨', description: 'Quick style presets' },
  { id: 'image', name: 'Image', icon: '🖼️', description: 'Upload background image' },
  { id: 'gradient', name: 'Gradient', icon: '🌈', description: 'Gradient backgrounds' },
  { id: 'overlay', name: 'Overlay', icon: '◐', description: 'Color overlay settings' },
  { id: 'filters', name: 'Filters', icon: '✨', description: 'Image adjustments' },
  { id: 'typography', name: 'Typography', icon: 'Aa', description: 'Text styling' },
  { id: 'layout', name: 'Layout', icon: '⊞', description: 'Layout options' },
] as const;

// ============================================
// EXPORT TYPES
// ============================================
export type TabType = 'style' | 'image' | 'gradient' | 'overlay' | 'filters' | 'typography' | 'layout';
export type GradientCategory = typeof GRADIENT_CATEGORIES[number];