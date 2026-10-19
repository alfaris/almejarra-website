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
  meta: { title: string; description: string }
  brand: { name: string; tagline: string }
  nav: {
    links: { id: string; label: string }[]
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
  }
  spaces: { eyebrow: string; title: string; subtitle: string; items: SpaceItem[] }
  packages: { eyebrow: string; title: string; subtitle: string; items: PackageItem[]; note: string; cta: string }
  why: { eyebrow: string; title: string; items: { icon: IconName; title: string; text: string }[] }
  story: {
    eyebrow: string
    title: string
    items: { date: string; title: string; text: string }[]
  }
  team: {
    eyebrow: string
    title: string
    subtitle?: string
    members: { name: string; role: string; bio: string; image: string }[]
    /** The first crew who built AlMejarra with its founder (the old site's honors board). */
    honors: { title: string; intro: string[]; members: { name: string; role: string; image: string }[] }
    join: { title: string; text: string; cta: string }
    media: { title: string; items: { name: string; href: string }[] }
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
  footer: { about: string; rights: string; backToTop: string; madeWith: string }
}
