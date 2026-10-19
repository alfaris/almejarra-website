// Language-neutral facts shared by every translation. Edit here to update contact details.
import { assetUrl } from '@/lib/paths'

const img = (name: string) => assetUrl(`images/${name}`)

export const site = {
  url: 'https://almejarra.com',
  email: 'connect@almejarra.com',
  facebookEvents: 'https://www.facebook.com/almejarra/events',
  phones: ['01005048220'],
  // International format, digits only, used for wa.me links.
  whatsapp: '201005048220',
  map: {
    lat: 30.587802,
    lng: 31.487646,
  },
  socials: [
    { id: 'facebook', href: 'https://facebook.com/almejarra' },
    { id: 'instagram', href: 'https://instagram.com/almejarra' },
    { id: 'x', href: 'https://twitter.com/almejarra' },
    { id: 'linkedin', href: 'https://linkedin.com/company/almejarra-المچرة' },
    { id: 'youtube', href: 'https://youtube.com/almejarra' },
  ] as const,
  images: {
    logo: img('logo.png'),
    logoMark: img('logo-mark.png'),
    space: img('space.webp'),
    spaceRoom: img('space-room.webp'),
    spaceWide: img('space-wide.webp'),
    openingBalloon: img('opening-balloon.webp'),
    crew: img('crew.webp'),
    shuttle: img('shuttle.webp'),
    capsule: img('capsule.webp'),
    teamAhmed: img('team-ahmed-fares.webp'),
    teamAmr: img('team-amr-herzo.webp'),
    teamWaleed: img('team-waleed.webp'),
    staff: {
      israa: img('team-israa.webp'),
      saraa: img('team-saraa.webp'),
      mokhtar: img('team-mokhtar.webp'),
      ashraf: img('team-ashraf.webp'),
      asmaa: img('team-asmaa.webp'),
      aya: img('team-aya.webp'),
      sara: img('team-sara.webp'),
    },
    honors: {
      nada: img('honors-nada.webp'),
      rehab: img('honors-rehab.webp'),
      hassan: img('honors-hassan.webp'),
      islam: img('honors-islam.webp'),
      yousry: img('honors-yousry.webp'),
      sami: img('honors-sami.webp'),
      omar: img('honors-omar.webp'),
      mohamed: img('honors-mohamed.webp'),
      nesma: img('honors-nesma.webp'),
    },
  },
  /** Featured reel on the home page: a self-hosted copy of the Instagram post, plus its link. */
  reel: {
    instagram: 'https://www.instagram.com/p/DUGxZ_yD9D5/',
    video: assetUrl('videos/almejarra-reel.mp4'),
    poster: img('reel-cover.webp'),
  },
  videos: {
    about: 'XK3UR_DppZY',
    capsule: 'W5g_0Hvas6U',
  },
}

export type SocialId = (typeof site.socials)[number]['id']

export interface ProfileLink {
  id: SocialId | 'website'
  href: string
}

// Founders' profiles, from the old "Meet AlMejarra" page.
export const founderLinks = {
  ahmed: [
    { id: 'website', href: 'http://alfaris.ws' },
    { id: 'facebook', href: 'https://facebook.com/alfaris' },
    { id: 'linkedin', href: 'https://www.linkedin.com/in/ahmedfaris' },
    { id: 'x', href: 'https://x.com/alfaris' },
  ],
  amr: [
    { id: 'facebook', href: 'https://www.facebook.com/7erzo' },
    { id: 'linkedin', href: 'https://www.linkedin.com/in/amrherzo' },
    { id: 'x', href: 'https://x.com/7erzo' },
  ],
  waleed: [{ id: 'facebook', href: 'https://www.facebook.com/waled.herzo' }],
} satisfies Record<string, ProfileLink[]>
