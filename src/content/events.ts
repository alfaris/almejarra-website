// Upcoming events. Add one entry per event; past events hide themselves automatically
// (an event shows until the end of its last day). Dates are YYYY-MM-DD.
//
// Example:
// {
//   date: '2026-11-14',
//   time: '6:00 PM',
//   title: { ar: 'ورشة تصميم واجهات', en: 'UI design workshop' },
//   description: { ar: 'ورشة عملية لمدة 3 ساعات.', en: 'A hands-on 3-hour workshop.' },
//   place: { ar: 'قاعة المكوك', en: 'The Shuttle' },
//   link: 'https://www.facebook.com/events/…',
// },

export interface EventItem {
  date: string
  /** Last day for multi-day events. */
  endDate?: string
  time?: string
  title: { ar: string; en: string }
  description?: { ar: string; en: string }
  place?: { ar: string; en: string }
  /** Registration or details page. */
  link?: string
}

export const events: EventItem[] = []
