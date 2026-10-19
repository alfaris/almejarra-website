// Language-neutral facts shared by every translation. Edit here to update contact details.
const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`

export const site = {
  url: 'https://almejarra.com',
  email: 'connect@almejarra.com',
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
    crew: img('crew.webp'),
    shuttle: img('shuttle.webp'),
    capsule: img('capsule.webp'),
    teamAhmed: img('team-ahmed-fares.webp'),
    teamAmr: img('team-amr-herzo.webp'),
    teamWaleed: img('team-waleed.webp'),
  },
  videos: {
    about: 'XK3UR_DppZY',
    capsule: 'W5g_0Hvas6U',
  },
}

export type SocialId = (typeof site.socials)[number]['id']
