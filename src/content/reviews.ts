// Member reviews. The section stays hidden until at least one is added.
// Use real reviews only, with the person's permission. Quotes are shown in their original
// language on both the Arabic and English pages.
//
// Example:
// {
//   name: 'Sara Ahmed',
//   role: { ar: 'مصممة مستقلة', en: 'Freelance designer' },
//   quote: 'أحسن مكان أشتغل فيه في الزقازيق…',
//   quoteLang: 'ar',
//   source: 'Google',
//   rating: 5,
// },

export interface Review {
  name: string
  role?: { ar: string; en: string }
  quote: string
  quoteLang: 'ar' | 'en'
  /** Where the review was posted, e.g. "Google" or "Facebook". */
  source?: string
  link?: string
  /** 1 to 5 stars, if the review has a rating. */
  rating?: number
}

export const reviews: Review[] = []
