import { Clock, MapPin, Users } from 'lucide-react';
import { PosterPreviewProps } from '@/lib/types';
import { formatDate, getAlignmentClasses } from './utils';

export default function PosterPreview({ 
  posterRef, 
  schedule, 
  previewStyle, 
  overlayStyle, 
  textSettings, 
  aspectRatioClass 
}: PosterPreviewProps) {
  const dateInfo = formatDate(schedule.date || '');
  const validAssignees = schedule.assignees?.filter(a => a.roleName && a.member) || [];
  const alignment = getAlignmentClasses(textSettings.title.align);
  const contentAlignment = getAlignmentClasses(textSettings.content.align);
  
  const hasDate = textSettings.showDate && schedule.date;
  const hasDescription = textSettings.showDescription && schedule.description;
  const hasAssignees = textSettings.showAssignees && validAssignees.length > 0;

  const textShadow = textSettings.title.shadow 
    ? '0 2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)' 
    : 'none';

  const subtleShadow = textSettings.title.shadow 
    ? '0 1px 3px rgba(0,0,0,0.2)' 
    : 'none';

  return (
    <div 
      ref={posterRef as React.RefObject<HTMLDivElement>} 
      className={`${aspectRatioClass} w-full relative overflow-hidden`}
      style={previewStyle}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={overlayStyle} />
      
      {/* Decorative Elements */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: textSettings.title.color, opacity: 0.3 }}
      />
      
      {/* Content Container */}
      <div className={`absolute inset-0 flex flex-col ${alignment.items}`}>
      
        {hasDate && (
          <div className={`w-full px-8 pt-8 flex ${alignment.justify}`}>
            <div 
              className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl backdrop-blur-md"
              style={{ 
                backgroundColor: `${textSettings.title.color}12`,
                border: `1.5px solid ${textSettings.title.color}25`,
                boxShadow: subtleShadow
              }}
            >
              {/* Date Block */}
              <div className={`flex items-center gap-3 ${alignment.items}`}>
                <div 
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center"
                  style={{ backgroundColor: `${textSettings.title.color}20` }}
                >
                  <span 
                    className="text-lg font-black leading-none"
                    style={{ color: textSettings.title.color }}
                  >
                    {dateInfo.day}
                  </span>
                  <span 
                    className="text-[8px] font-bold tracking-wider"
                    style={{ color: textSettings.title.color, opacity: 0.8 }}
                  >
                    {dateInfo.month}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span 
                    className="text-xs font-bold"
                    style={{ color: textSettings.title.color }}
                  >
                    {dateInfo.weekday}
                  </span>
                  <span 
                    className="text-[10px] font-medium"
                    style={{ color: textSettings.title.color, opacity: 0.7 }}
                  >
                    {dateInfo.fullDate}
                  </span>
                </div>
              </div>
              
              {/* Divider */}
              <div 
                className="w-px h-10 rounded-full" 
                style={{ backgroundColor: `${textSettings.title.color}30` }} 
              />
              
              {/* Time */}
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: textSettings.title.color, opacity: 0.7 }} />
                <span 
                  className="text-sm font-bold"
                  style={{ color: textSettings.title.color }}
                >
                  {dateInfo.time}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ===== MIDDLE SECTION: Title & Description ===== */}
        <div className={`flex-1 w-full px-8 flex flex-col ${alignment.justify} ${alignment.items} py-8`}>
          <div className={`w-full max-w-full flex flex-col ${alignment.items} gap-4`}>
            
            {/* Pre-title Label */}
            <div 
              className={`flex items-center gap-2 ${alignment.justify}`}
              style={{ width: '100%' }}
            >
              <div 
                className="h-px flex-shrink-0"
                style={{ 
                  width: '24px',
                  backgroundColor: textSettings.title.color,
                  opacity: 0.4,
                  display: textSettings.title.align === 'center' ? 'block' : 'none'
                }}
              />
              <span 
                className="text-[9px] font-bold uppercase tracking-[0.25em]"
                style={{ 
                  color: textSettings.title.color, 
                  opacity: 0.6,
                  textShadow: subtleShadow
                }}
              >
                Schedule
              </span>
              <div 
                className="h-px flex-shrink-0"
                style={{ 
                  width: '24px',
                  backgroundColor: textSettings.title.color,
                  opacity: 0.4,
                  display: textSettings.title.align === 'center' ? 'block' : 'none'
                }}
              />
            </div>

            {/* Main Title */}
            <h1 
              className={`${textSettings.title.fontStyle} leading-[1.1] ${alignment.text} w-full`}
              style={{ 
                color: textSettings.title.color, 
                fontSize: `${textSettings.title.fontSize}px`,
                fontWeight: textSettings.title.fontWeight,
                letterSpacing: `${textSettings.title.letterSpacing}em`,
                textShadow: textShadow,
                wordBreak: 'break-word',
                hyphens: 'auto'
              }}
            >
              {schedule.title || 'Your Title Here'}
            </h1>
            
            {/* Decorative Line */}
            <div 
              className={`flex ${alignment.justify} w-full`}
              style={{ marginTop: '4px', marginBottom: '4px' }}
            >
              <div 
                className="h-1 rounded-full"
                style={{ 
                  width: textSettings.title.align === 'center' ? '60px' : '40px',
                  backgroundColor: textSettings.title.color,
                  opacity: 0.5
                }}
              />
            </div>

            {/* Description */}
            {hasDescription && (
              <p 
                className={`text-sm font-medium leading-relaxed ${contentAlignment.text} max-w-[85%]`}
                style={{ 
                  color: textSettings.content.color, 
                  opacity: textSettings.content.opacity,
                  textShadow: subtleShadow
                }}
              >
                {schedule.description}
              </p>
            )}

            {/* Location (if available) */}
            {schedule.location && (
              <div 
                className={`flex items-center gap-2 mt-2 ${alignment.justify}`}
                style={{ width: '100%' }}
              >
                <MapPin size={12} style={{ color: textSettings.title.color, opacity: 0.6 }} />
                <span 
                  className="text-xs font-medium"
                  style={{ color: textSettings.title.color, opacity: 0.6 }}
                >
                  {schedule.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ===== BOTTOM SECTION: Assignees ===== */}
        {hasAssignees && (
          <div className="w-full px-6 pb-6 mt-auto">
            
            {/* Section Header */}
            <div 
              className={`flex items-center gap-2 mb-2 ${
                textSettings.content.align === 'center' ? 'justify-center' : 
                textSettings.content.align === 'right' ? 'justify-end' : 'justify-start'
              }`}
            >
              <Users size={10} style={{ color: textSettings.title.color, opacity: 0.5 }} />
              <span 
                className="text-[8px] font-bold uppercase tracking-[0.15em]"
                style={{ color: textSettings.title.color, opacity: 0.5 }}
              >
                Participants
              </span>
            </div>

            {/* Compact List Container */}
            <div 
              className="rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: `${textSettings.title.color}10`,
                border: `1px solid ${textSettings.title.color}15`,
              }}
            >
              {validAssignees.map((assignee, index) => (
                <div 
                  key={assignee.id}
                  className={`flex items-center gap-3 px-3 py-2 ${
                    index !== validAssignees.length - 1 ? 'border-b' : ''
                  }`}
                  style={{ 
                    borderColor: `${textSettings.title.color}10`,
                  }}
                >
                  {/* Avatar */}
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: `${textSettings.title.color}20`,
                    }}
                  >
                    <span 
                      className="text-[9px] font-bold uppercase"
                      style={{ color: textSettings.title.color }}
                    >
                      {assignee.member?.name?.charAt(0) || '?'}
                    </span>
                  </div>
                  
                  {/* Role & Name */}
                  <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                    <span 
                      className="text-[10px] font-semibold truncate"
                      style={{ color: textSettings.title.color }}
                    >
                      {assignee.member?.name}
                    </span>
                    <span 
                      className="text-[8px] font-medium uppercase tracking-wide flex-shrink-0 px-2 py-0.5 rounded-full"
                      style={{ 
                        color: textSettings.title.color, 
                        opacity: 0.7,
                        backgroundColor: `${textSettings.title.color}10`
                      }}
                    >
                      {assignee.roleName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback Message */}
        {!hasDate && !hasDescription && !hasAssignees && (
          <div className="flex-1 flex items-center justify-center px-8">
            <p 
              className="text-sm font-medium text-center"
              style={{ 
                color: textSettings.content.color, 
                opacity: 0.5
              }}
            >
              Add schedule details to preview them here
            </p>
          </div>
        )}

        {/* Bottom Decorative Line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: textSettings.title.color, opacity: 0.3 }}
        />
      </div>
    </div>
  );
}