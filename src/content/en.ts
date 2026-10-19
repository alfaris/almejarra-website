import { founderLinks, site } from './site'
import type { Content } from './types'

const network: Content['network']['groups'] = [
  {
    title: 'Cairo & Giza',
    items: [
      { name: 'Qafeer', city: '6th of October', href: 'https://www.facebook.com/qafeerlabs' },
      { name: 'Eco', city: 'Heliopolis', href: 'https://www.facebook.com/Ecocoworking' },
      { name: 'Chefchaoun', city: 'Dokki', href: 'https://www.facebook.com/ChefchaounCo' },
      { name: 'Al Maqarr', city: 'Heliopolis', href: 'https://www.facebook.com/AlMaqarr' },
      { name: '302Labs', city: 'Nasr City', href: 'https://www.facebook.com/302Labs' },
      { name: 'Dekka', city: 'Mokattam', href: 'https://www.facebook.com/DecaAdef' },
    ],
  },
  {
    title: 'Governorates',
    items: [
      { name: 'M3mal', city: 'Alexandria', href: 'https://www.facebook.com/m3mal' },
      { name: 'Monk Space', city: 'Mansoura', href: 'https://www.facebook.com/MonkSpace.eg/' },
      { name: 'Al Makkan', city: 'Menoufia', href: 'https://www.facebook.com/AlMakkan' },
      { name: 'Cloud', city: 'Minya', href: 'https://www.facebook.com/cloudcoworking' },
      { name: 'Mok3b', city: 'Ismailia', href: 'https://www.facebook.com/mok3b' },
      { name: 'Boulevard', city: 'Port Said', href: 'https://www.facebook.com/Boulevardportsaid' },
    ],
  },
]

export const en: Content = {
  meta: {
    title: 'AlMejarra | The first coworking space in Sharqia',
    description:
      'AlMejarra is a coworking space and community hub in Zagazig, Egypt, for entrepreneurs, freelancers, students and tech geeks. Desks, training rooms, events and community.',
  },
  brand: { name: 'AlMejarra', tagline: 'Coworking Space' },
  nav: {
    links: [
      { id: 'about', label: 'About' },
      { id: 'spaces', label: 'Spaces' },
      { id: 'packages', label: 'Packages' },
      { id: 'community', label: 'Community' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' },
    ],
    team: 'Team',
    book: 'Book a spot',
    switchLang: 'العربية',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: 'Zagazig · Since 2015',
    title: ['The first coworking', 'space in Sharqia'],
    subtitle:
      'Where the comfort of home meets the focus of work. A community of entrepreneurs, freelancers, students and tech geeks who work, learn and grow together.',
    primary: 'Book a visit',
    secondary: 'Explore spaces',
    scroll: 'Scroll',
    hashtag: '#NotJustAPlace',
  },
  marquee: ['Coworking', 'Skill building', 'Event space', 'Geek community', 'Entrepreneurship', 'Freelancing', '#NotJustAPlace'],
  about: {
    eyebrow: 'Meet AlMejarra',
    title: 'We love collaboration, because differences spark creativity.',
    body: [
      'That belief is why we set out to build an environment where coworking, shared ideas and shared knowledge blend together: a place that helps people find solutions and encourages innovation.',
      'We founded AlMejarra (“the Galaxy”) as a coworking space and community hub: calm, comfortable and equipped with the tools you need to work or study at your best. Most importantly, you will meet professionals from many fields who are ready to swap ideas and grow their networks.',
    ],
    vision: {
      title: 'Our vision',
      text: 'The best work environment and community in Sharqia, supporting geeks, freelancers and entrepreneurs.',
    },
    mission: {
      title: 'Our mission',
      text: 'Support youth groups, initiatives, freelancers and entrepreneurs with a shared workspace and with learning, mentoring and networking opportunities, so they can discover their potential, develop their communities across Sharqia and connect with the world.',
    },
    stats: [
      { value: 2015, label: 'Year we launched' },
      { value: 60, label: 'Guests for events' },
      { value: 40, label: 'Seats in the Shuttle' },
      { value: 12, suffix: '+', label: 'Partner spaces in Egypt' },
    ],
    pillars: [
      {
        icon: 'users',
        title: 'Coworking',
        text: 'A shared workspace built on collaboration, with the comfort of home, a productive atmosphere and every amenity you need.',
      },
      {
        icon: 'graduation',
        title: 'Knowledge & skills',
        text: 'Activities, workshops and full bootcamps across many fields, with fresh methods and a support system for freelancers and founders.',
      },
      {
        icon: 'presentation',
        title: 'Event space',
        text: 'The right room and the right tools for talks, meetings and events, whether you are an initiative, a team, a startup or a volunteer group.',
      },
    ],
  },
  spaces: {
    eyebrow: 'Spaces',
    title: 'Choose your orbit',
    subtitle: 'Four spaces for every way of working, from a desk in the open space to a fully equipped training hall.',
    items: [
      {
        id: 'space',
        name: 'The Space',
        kicker: 'Open coworking',
        description:
          'A generous room overlooking the gardens around us, with sunlight and a fresh breeze. Carefully chosen IKEA desks and chairs and a distinctive interior make it a great place to work, study, read or meet your colleagues.',
        features: [
          { icon: 'wifi', label: 'Fast free Wi-Fi' },
          { icon: 'coffee', label: 'Drinks & snacks all day' },
          { icon: 'printer', label: 'Printer & scanner' },
          { icon: 'armchair', label: 'IKEA furniture & bean bags' },
        ],
        image: site.images.space,
        cta: 'Book a desk',
      },
      {
        id: 'shuttle',
        name: 'The Shuttle',
        kicker: 'Training & meeting room',
        description:
          'A room equipped for talks, meetings and workshops that seats up to 40 people. Food and drinks are available on request.',
        features: [
          { icon: 'projector', label: 'Projector & sound system' },
          { icon: 'presentation', label: 'Fixed & mobile whiteboards' },
          { icon: 'wifi', label: 'Wi-Fi internet' },
          { icon: 'coffee', label: 'Catering on request' },
        ],
        capacity: 'Up to 40 people',
        image: site.images.shuttle,
        cta: 'Book the Shuttle',
      },
      {
        id: 'capsule',
        name: 'The Capsule',
        kicker: 'Private office',
        description:
          'A dedicated space for founders and freelancers: a private desk with more privacy than the rest of the space. We also help you with online marketing through AlMejarra and give you every tool we can for your project to succeed, because your success is ours.',
        features: [
          { icon: 'lock', label: 'Private, dedicated desk' },
          { icon: 'wifi', label: 'High-speed internet' },
          { icon: 'coffee', label: 'Equipped kitchen' },
          { icon: 'rocket', label: 'Marketing support' },
        ],
        image: site.images.capsule,
        framed: true,
        cta: 'Ask about the Capsule',
      },
      {
        id: 'planet',
        name: 'The Planet',
        kicker: 'Event space',
        description:
          'When an idea outgrows a room, the whole space becomes a venue for up to 60 guests: community meetups, hackathons, demo days and bootcamps.',
        features: [
          { icon: 'users', label: 'Up to 60 guests' },
          { icon: 'calendar', label: 'Events & meetups' },
          { icon: 'projector', label: 'AV equipment' },
          { icon: 'handshake', label: 'Support from our team' },
        ],
        capacity: 'Up to 60 guests',
        cta: 'Host your event',
      },
    ],
  },
  packages: {
    eyebrow: 'Packages',
    title: 'Join the Galaxy',
    subtitle: 'Pick the package that fits your rhythm and send us a note; we will reply with details and pricing.',
    items: [
      {
        id: 'weekly',
        name: 'Weekly Use',
        description: 'For anyone who needs a calm place to work or study on set days of the week.',
        features: ['A desk in The Space', 'Wi-Fi & drinks', 'Printer & scanner'],
        price: 'Contact for pricing',
      },
      {
        id: 'alien',
        name: 'Alien',
        description: 'For freelancers who made AlMejarra their second planet: flexible access and a community around you.',
        features: ['Everything in Weekly Use', 'Priority for events & workshops', 'Network & community'],
        highlighted: true,
        price: 'Contact for pricing',
      },
      {
        id: 'pioneers',
        name: 'Pioneers',
        description: 'For founders and small teams who need a stable base.',
        features: ['Everything in Alien', 'Private desk option in the Capsule', 'Marketing support with AlMejarra'],
        price: 'Contact for pricing',
      },
    ],
    note: 'Pricing depends on duration and what you need. Message us and we will reply within 48 hours.',
    cta: 'Request package',
  },
  why: {
    eyebrow: 'Why AlMejarra?',
    title: 'No more excuses to work alone at home',
    items: [
      { icon: 'wifi', title: 'Fast Wi-Fi', text: 'Fast internet all the time, free of charge.' },
      { icon: 'coffee', title: 'Drinks all day', text: 'Grab your drink and snacks whenever you like (Google-style perks).' },
      { icon: 'sparkles', title: 'Motivation', text: 'Stay motivated by the people working and studying around you.' },
      { icon: 'wallet', title: 'Affordable', text: 'A desk at a reasonable cost, without rent or office overheads.' },
      { icon: 'handshake', title: 'Your network', text: 'Meet people from different fields and grow your network and knowledge.' },
      { icon: 'calendar', title: 'Events', text: 'Events and activities that meet your needs and build your skills.' },
      { icon: 'armchair', title: 'Smart furniture', text: 'Mostly IKEA furniture, plus carpets and bean bags.' },
      { icon: 'sun', title: 'Light & air', text: 'Garden views, sunlight and a breeze that calms your nerves.' },
    ],
  },
  story: {
    eyebrow: 'Mission log',
    title: 'From the Big Bang to a new launch',
    items: [
      { date: 'Jan 12, 2015', title: 'Launch', text: 'AlMejarra lifted off from its first home in 10th of Ramadan City.' },
      { date: 'Mar 2015', title: 'The Big Bang', text: 'The official opening, at an event called “The Big Bang”.' },
      { date: 'Dec 2015', title: 'A new launch', text: 'AlMejarra moved to University Villas in Zagazig and reopened with an event called “A New Launch”.' },
      { date: 'Today', title: 'Still orbiting', text: 'The first community for geeks, freelancers and entrepreneurs in Sharqia, and still growing.' },
    ],
  },
  team: {
    eyebrow: 'AlMejarra astronauts',
    title: 'Owners & founders',
    subtitle: 'Ahmed Fares launched AlMejarra with its first crew; Amr Herzo and Waleed Abdelhamid later joined as founders.',
    members: [
      {
        name: 'Ahmed Fares',
        role: 'Founder & Creative Director',
        bio: 'Web UI designer and developer focused on mobile UX. He sees entrepreneurship as a way of life and wants AlMejarra to leave a mark and spread knowledge everywhere.',
        image: site.images.teamAhmed,
        links: founderLinks.ahmed,
      },
      {
        name: 'Amr Herzo',
        role: 'Co-founder & CEO',
        bio: 'SAP consultant passionate about business intelligence and big data. He believes opportunities are made more than they are found, and in teamwork and community.',
        image: site.images.teamAmr,
        links: founderLinks.amr,
      },
      {
        name: 'Waleed Abdelhamid',
        role: 'Co-founder',
        bio: 'Independent lawyer and legal counsel to several companies. He believes in independent work and community, and that commitment to value and quality drives success.',
        image: site.images.teamWaleed,
        links: founderLinks.waleed,
      },
    ],
    linkLabels: { website: 'Website', facebook: 'Facebook', linkedin: 'LinkedIn', x: 'X', instagram: 'Instagram', youtube: 'YouTube' },
    teamLink: 'Meet the team & honors board',
    join: {
      title: 'Join the AlMejarra crew',
      text: 'Into marketing, community building, event planning, design or photography? Come build with us.',
      cta: 'Join the team',
    },
    media: {
      title: 'AlMejarra in the media',
      items: [
        { name: 'Bebasata Magazine', href: 'https://www.facebook.com/BeBasataMag/posts/892681924143854' },
        { name: 'Moheet', href: 'http://moheet.com/2015/03/28/2241314/المجرة-أول-مساحة-عمل-مشتركة-في-الشرقي.html' },
        { name: 'Radio Resala', href: 'https://www.youtube.com/watch?v=XK3UR_DppZY' },
        { name: 'Egypt Innovate', href: 'http://egyptinnovate.com/users/almejarra-coworking-space' },
      ],
    },
  },
  teamPage: {
    eyebrow: 'AlMejarra astronauts',
    title: 'The AlMejarra team',
    subtitle: 'The people who run AlMejarra and serve its community, and the first crew who started its story.',
    back: 'Home',
    crew: {
      title: 'The team',
      members: [
        { name: 'Israa Mohamed', role: 'Operations & front desk', image: site.images.staff.israa },
        { name: 'Saraa Adel El-Taher', role: 'Creative & photographer', image: site.images.staff.saraa },
        { name: 'Hend', role: 'Front desk' },
        { name: 'Ahmed Mokhtar', role: 'Social media marketing', image: site.images.staff.mokhtar },
        { name: 'Ashraf Fares', role: 'Tech lead', image: site.images.staff.ashraf },
        { name: 'Asmaa Farag', role: 'Events & community volunteer', image: site.images.staff.asmaa },
        { name: 'Aya Ashraf El-Ghanam', role: 'Social media marketing', image: site.images.staff.aya },
        { name: 'Sara Diaa', role: 'Social media marketing', image: site.images.staff.sara },
      ],
    },
    honors: {
      title: 'Honors board',
      intro: [
        'AlMejarra was built by a group of people who came together and learned a lot from volunteering, which led them to pool their ideas and effort to build the AlMejarra community, a big challenge and a first in Sharqia.',
        'Life moves on, but AlMejarra will never forget the first people who started its story, helped it exist, supported the community around them and left a lasting mark.',
      ],
      members: [
        { name: 'Nada Nagib Eldek', role: 'Co-founder, former Operations Manager', image: site.images.honors.nada },
        { name: 'Rehab Ahmed', role: 'Former Community Manager', image: site.images.honors.rehab },
        { name: 'Hassan Safwat Nour El-Din', role: 'Former Community Builder', image: site.images.honors.hassan },
        { name: 'Islam Mohamed Salmy', role: 'Former HR Manager', image: site.images.honors.islam },
        { name: 'Yousry Gamal', role: 'Designer of the AlMejarra logo & identity', image: site.images.honors.yousry },
        { name: 'Ahmed Sami', role: 'Former Social Media Manager', image: site.images.honors.sami },
        { name: 'Omar Hamdan', role: 'Former Events Coordinator', image: site.images.honors.omar },
        { name: 'Mohamed Mahmoud', role: 'Former Front Desk', image: site.images.honors.mohamed },
        { name: 'Nesma Essam', role: 'HR team', image: site.images.honors.nesma },
      ],
    },
  },
  network: {
    eyebrow: 'Stronger together',
    title: 'A constellation of coworking spaces',
    subtitle: 'AlMejarra is part of a bigger network. Meet other coworking spaces across Egypt.',
    groups: network,
  },
  faq: {
    eyebrow: 'Everything you want to know',
    title: 'Frequently asked',
    items: [
      {
        q: 'How and when did you start?',
        a: 'AlMejarra launched on January 12, 2015 in 10th of Ramadan City, with an official opening event called “The Big Bang” in March 2015. In December 2015 we moved to Zagazig and reopened with an event called “A New Launch”.',
      },
      {
        q: 'Who are you?',
        a: 'AlMejarra is a coworking space and community hub for students, freelancers, entrepreneurs and tech geeks. We offer coworking plus events that build skills and a community of independents and founders.',
      },
      {
        q: 'Where exactly are you?',
        a: '7 Omar Ibn El-Khattab St., University Villas, Zagazig, Sharqia, Egypt. Open the map from the contact section.',
      },
      {
        q: 'Can I book a room for a workshop or meeting?',
        a: 'Yes. The Shuttle seats up to 40 and has a projector, sound system and whiteboards, and the whole space can host events for up to 60. Send us the date, time and headcount.',
      },
      {
        q: 'What is included in the space?',
        a: 'Fast free Wi-Fi, hot and cold drinks and snacks, a printer and scanner, a kitchen and comfortable IKEA furniture.',
      },
      {
        q: 'How can I volunteer with the AlMejarra team?',
        a: 'Use the contact form, choose “Join the team”, and tell us your area: marketing, social media, community and events, fundraising, HR, design or photography.',
      },
    ],
  },
  contact: {
    eyebrow: 'Get in touch',
    title: 'We are always happy to hear from you',
    subtitle: 'Follow us on social media or message us directly. We reply within 48 hours.',
    addressLabel: 'Address',
    address: '7 Omar Ibn El-Khattab St., University Villas, Zagazig, Sharqia, Egypt',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    followLabel: 'Follow us',
    directions: 'Open in Google Maps',
    form: {
      title: 'Book or ask',
      intro: 'Fill in the details and we will prepare a ready-to-send message for WhatsApp or email.',
      name: 'Name',
      phone: 'Phone number',
      email: 'Email',
      occupation: 'What do you study / do?',
      interest: 'Interested in',
      interestOptions: [
        'A desk in The Space',
        'Weekly Use package',
        'Alien package',
        'Pioneers package',
        'Booking the Shuttle',
        'The Capsule (private office)',
        'Hosting an event',
        'Joining the team',
        'General question',
      ],
      date: 'Preferred date',
      message: 'Your message',
      messagePlaceholder: 'What can we prepare for you?',
      whatsapp: 'Send on WhatsApp',
      emailCta: 'Send by email',
      required: 'Required',
      note: 'Nothing is stored on this website; your message opens in WhatsApp or your email app.',
    },
  },
  footer: {
    about:
      'The first coworking space in Sharqia, and a community hub for entrepreneurs, freelancers, tech geeks and students.',
    rights: 'All rights reserved © AlMejarra Coworking Space',
    backToTop: 'Back to top',
    madeWith: 'Made with love in Zagazig',
  },
}
