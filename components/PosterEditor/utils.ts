import { AlignType } from '@/lib/types';

export function formatDate(dateString: string): { 
  day: string; 
  month: string; 
  year: string; 
  time: string; 
  weekday: string; 
  fullDate: string 
} {
  if (!dateString) return { day: '', month: '', year: '', time: '', weekday: '', fullDate: '' };
  
  try {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: date.getFullYear().toString(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      fullDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  } catch {
    return { day: '', month: '', year: '', time: '', weekday: '', fullDate: '' };
  }
}

export function getAlignmentClasses(align: AlignType): { 
  text: string; 
  items: string; 
  justify: string 
} {
  switch (align) {
    case 'left':
      return { text: 'text-left', items: 'items-start', justify: 'justify-start' };
    case 'right':
      return { text: 'text-right', items: 'items-end', justify: 'justify-end' };
    default:
      return { text: 'text-center', items: 'items-center', justify: 'justify-center' };
  }
}