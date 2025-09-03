export enum EventCategory {
  MEETING = 'MEETING',
  PERSONAL = 'PERSONAL', 
  WORK = 'WORK',
  SOCIAL = 'SOCIAL',
  EDUCATION = 'EDUCATION',
  HEALTH = 'HEALTH',
  TRAVEL = 'TRAVEL',
  OTHER = 'OTHER'
}

export const EVENT_CATEGORY_COLORS = {
  [EventCategory.MEETING]: '#3B82F6', // blue
  [EventCategory.PERSONAL]: '#10B981', // green
  [EventCategory.WORK]: '#F59E0B', // yellow
  [EventCategory.SOCIAL]: '#EF4444', // red
  [EventCategory.EDUCATION]: '#8B5CF6', // purple
  [EventCategory.HEALTH]: '#06B6D4', // cyan
  [EventCategory.TRAVEL]: '#F97316', // orange
  [EventCategory.OTHER]: '#6B7280', // gray
}