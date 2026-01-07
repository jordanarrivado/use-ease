// ============================================
// CORE TYPES
// ============================================
export type TabType = 'style' | 'image' | 'gradient' | 'overlay' | 'filters' | 'typography' | 'layout';
export type RatioType = 'portrait' | 'story' | 'square' | 'landscape' | 'wide' | 'pinterest';
export type AlignType = 'left' | 'center' | 'right';
export type FilterKey = 'brightness' | 'contrast' | 'blur' | 'saturation';
export type LayoutStyleType = 'classic' | 'modern' | 'minimal' | 'bold';
export type GradientCategory = 'all' | 'dark' | 'vibrant' | 'soft' | 'nature' | 'luxury' | 'modern';
export type ScheduleStatus = 'pending' | 'completed' | 'cancelled';

// ============================================
// MEMBER & ASSIGNEE
// ============================================
export interface Member {
  id?: string;
  name: string;
  age: number;
  department: string;
  avatar?: string;
}

export interface Assignee {
  id: string;
  roleName: string;
  member: Member | null;
}

// ============================================
// FILTERS & BACKGROUND
// ============================================
export interface Filters {
  brightness: number;
  contrast: number;
  blur: number;
  saturation: number;
}

export interface GradientSettings {
  type: string;
  angle: number;
  color1: string;
  color2: string;
  stop1: number;
  stop2: number;
}

export interface OverlaySettings {
  color: string;
  opacity: number;
}

export interface BackgroundSettings {
  image: string;
  gradient: GradientSettings;
  overlay: OverlaySettings;
  filters: Filters;
}

// ============================================
// TEXT SETTINGS
// ============================================
export interface TitleSettings {
  color: string;
  fontSize: number;
  align: AlignType;
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  shadow: boolean;
  letterSpacing: number;
}

export interface ContentSettings {
  color: string;
  opacity: number;
  align: AlignType;
}

export interface TextSettings {
  title: TitleSettings;
  content: ContentSettings;
  layoutStyle: LayoutStyleType;
  showDate: boolean;
  showAssignees: boolean;
  showDescription: boolean;
}

// ============================================
// SCHEDULE
// ============================================
export interface Schedule {
  id?: string;
  title?: string;
  date: string;
  description?: string;
  location?: string;
  status?: ScheduleStatus;
  assignees?: Assignee[];
  background?: BackgroundSettings;
  textSettings?: TextSettings;
  aspectRatio?: RatioType;
  createdAt?: string;
  updatedAt?: string;
}

export type ScheduleInput = Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>;

export type ScheduleUpdate = Partial<Omit<Schedule, 'id'>> & { id: string };

// ============================================
// PLAN & ANNOUNCEMENT
// ============================================
export interface Plan {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishAt: string;
  isAuto?: boolean;
}

// ============================================
// POSTER SETTINGS
// ============================================
export interface PosterSettings {
  backgroundSettings: BackgroundSettings;
  textSettings: TextSettings;
}

export interface PosterData extends PosterSettings {
  aspectRatio: RatioType;
}

// ============================================
// COMPONENT PROPS
// ============================================
export interface PosterPreviewProps {
  posterRef?: React.RefObject<HTMLDivElement | null>;
  schedule: Schedule;
  previewStyle: React.CSSProperties;
  overlayStyle: React.CSSProperties;
  textSettings: TextSettings;
  aspectRatioClass: string;
}

export interface ScheduleFormProps {
  schedule?: Schedule;
  onClose: () => void;
}

export interface SchedulePosterEditorProps {
  schedule: Schedule;
  onClose: () => void;
  onSave: (posterData: PosterData) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}