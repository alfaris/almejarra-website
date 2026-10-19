import type { ProfileLink } from './site'

export type Lang = 'ar' | 'en'

export type IconName =
  | 'wifi'
  | 'coffee'
  | 'armchair'
  | 'printer'
  | 'users'
  | 'sparkles'
  | 'calendar'
  | 'wallet'
  | 'sun'
  | 'projector'
  | 'presentation'
  | 'lightbulb'
  | 'handshake'
  | 'rocket'
  | 'graduation'
  | 'lock'

export interface SpaceItem {
  id: 'space' | 'shuttle' | 'capsule' | 'planet'
  name: string
  kicker: string
  description: string
  features: { icon: IconName; label: string }[]
  capacity?: string
  image?: string
  /** Small photos are shown framed on a blurred backdrop instead of stretched. */
  framed?: boolean
  cta: string
}

export interface Person {
  name: string
  role: string
  /** Without a photo, a placeholder avatar is shown. */
  image?: string
}

export interface PackageItem {
  id: string
  name: string
  description: string
  features: string[]
  highlighted?: boolean
  /** Shown as the price line. Leave as a "contact us" string until prices are published. */
  price: string
}

export interface Content {
  /** Page titles and descriptions; edit them in meta.json (also used to generate the HTML pages). */
  meta: { title: string; description: string; team: { title: string; description: string } }
  brand: { name: string; tagline: string }
  nav: {
    links: { id: string; label: string }[]
    team: string
    book: string
    switchLang: string
    menu: string
    close: string
  }
  hero: {
    eyebrow: string
    title: [string, string]
    subtitle: string
    primary: string
    secondary: string
    scroll: string
    hashtag: string
  }
  marquee: string[]
  about: {
    eyebrow: string
    title: string
    body: string[]
    vision: { title: string; text: string }
    mission: { title: string; text: string }
    stats: { value: number; suffix?: string; label: string }[]
    pillars: { icon: IconName; title: string; text: string }[]
    /** Link to the reel on Instagram, and the play button's accessible name. */
    reelLabel: string
    reelPlay: string
  }
  spaces: { eyebrow: string; title: string; subtitle: string; items: SpaceItem[] }
  packages: { eyebrow: string; title: string; subtitle: string; items: PackageItem[]; note: string; cta: string }
  why: { eyebrow: string; title: string; items: { icon: IconName; title: string; text: string }[] }
  gallery: {
    eyebrow: string
    title: string
    subtitle?: string
    /** Bento order: room, shuttle, chairs, balloon, wide. */
    items: { src: string; alt: string }[]
  }
  events: {
    eyebrow: string
    title: string
    subtitle: string
    emptyTitle: string
    emptyText: string
    follow: string
    host: string
    details: string
  }
  reviews: { eyebrow: string; title: string; subtitle: string; rating: string; seeAll: string }
  story: {
    eyebrow: string
    title: string
    items: { date: string; title: string; text: string }[]
  }
  team: {
    eyebrow: string
    title: string
    subtitle?: string
    members: { name: string; role: string; bio: string; image: string; links: ProfileLink[] }[]
    /** Accessible names for profile links, e.g. "Website"; brand names are used for the rest. */
    linkLabels: { website: string; facebook: string; linkedin: string; x: string; instagram: string; youtube: string }
    /** Link to the team page. */
    teamLink: string
    join: { title: string; text: string; cta: string }
    media: { title: string; items: { name: string; href: string }[] }
  }
  teamPage: {
    eyebrow: string
    title: string
    subtitle: string
    back: string
    crew: { title: string; members: Person[] }
    /** The first crew who built AlMejarra with its founder (the old site's honors board). */
    honors: { title: string; intro: string[]; photoAlt: string; members: Person[] }
  }
  network: {
    eyebrow: string
    title: string
    subtitle: string
    groups: { title: string; items: { name: string; city: string; href: string }[] }[]
  }
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    addressLabel: string
    address: string
    phoneLabel: string
    emailLabel: string
    followLabel: string
    directions: string
    form: {
      title: string
      name: string
      phone: string
      email: string
      occupation: string
      interest: string
      interestOptions: string[]
      date: string
      message: string
      messagePlaceholder: string
      whatsapp: string
      emailCta: string
      required: string
      note: string
      intro: string
    }
  }
  whatsappFab: { label: string; message: string }
  footer: { about: string; rights: string; backToTop: string; madeWith: string }
}
