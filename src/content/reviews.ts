// Member reviews, shown under the Google rating in the Reviews section.
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

// Copied word for word from AlMejarra's Google Maps listing, newest first.
export const reviews: Review[] = [
  {
    name: 'Nadine Haytham',
    quote: "Perfect spot to get things done, it's cozy and the staff are so friendly and welcoming, Highly recommended 🤩",
    quoteLang: 'en',
    source: 'Google',
    rating: 5,
  },
  {
    name: 'ahmed Ibrahim',
    quote: 'احسن مكان فعليا تشتغل او تذاكر فيه والناس اللي فيه معاملتهم عظيمة❤️❤️',
    quoteLang: 'ar',
    source: 'Google',
    rating: 5,
  },
  {
    name: 'Ahmed Ayman',
    quote: 'The best co working space in zagazig',
    quoteLang: 'en',
    source: 'Google',
    rating: 5,
  },
  {
    name: 'Abdelrahman Elghandour',
    quote: 'Perfect place for working and the vibes are Incredible',
    quoteLang: 'en',
    source: 'Google',
    rating: 5,
  },
  {
    name: 'Omar Mansour',
    quote: 'مكان محترم والله وجميل جدا وهادي وفيه خدمات كتيره ♥',
    quoteLang: 'ar',
    source: 'Google',
    rating: 5,
  },
  {
    name: 'Omar Alelwah',
    quote: 'مكان هادئ وجيد للدراسة مفتوح معظم الوقت والخدمات فيه جيدة',
    quoteLang: 'ar',
    source: 'Google',
    rating: 5,
  },
  {
    name: 'Eman Abdelaal',
    quote: 'Almejarra is an awesome place with great persons who seek to make world is better. Every year in progress ,almejarra :)',
    quoteLang: 'en',
    source: 'Google',
    rating: 5,
  },
  {
    name: 'Ahmed Ahmed Mokhtar',
    quote: 'The First and the best co-working space at Alsharkia located not at Zagazig, Highly recommended to visit there is interested events and activities there',
    quoteLang: 'en',
    source: 'Google',
    rating: 5,
  },
]
