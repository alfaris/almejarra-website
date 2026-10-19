import { useEffect, useState, type FormEvent } from 'react'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { SocialIcon } from '@/components/SocialIcon'
import { Button } from '@/components/ui/button'
import { Input, Label, Select, Textarea } from '@/components/ui/input'
import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'

interface FormState {
  name: string
  phone: string
  email: string
  occupation: string
  interest: string
  date: string
  message: string
}

const empty: FormState = { name: '', phone: '', email: '', occupation: '', interest: '', date: '', message: '' }

export function Contact() {
  const { t, lang } = useI18n()
  const c = t.contact
  const f = c.form
  const [form, setForm] = useState<FormState>(empty)
  const [touched, setTouched] = useState(false)

  // Packages and "join the team" buttons pre-select the interest field.
  useEffect(() => {
    const onInterest = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      const match = f.interestOptions.find((o) => o.includes(detail)) ?? detail
      setForm((s) => ({ ...s, interest: match }))
    }
    window.addEventListener('almejarra:interest', onInterest)
    return () => window.removeEventListener('almejarra:interest', onInterest)
  }, [f.interestOptions])

  const set = (key: keyof FormState) => (e: { target: { value: string } }) => setForm((s) => ({ ...s, [key]: e.target.value }))
  const valid = form.name.trim() !== '' && form.phone.trim() !== ''

  const composeMessage = () =>
    [
      `${f.name}: ${form.name}`,
      `${f.phone}: ${form.phone}`,
      form.email && `${f.email}: ${form.email}`,
      form.occupation && `${f.occupation} ${form.occupation}`,
      form.interest && `${f.interest} ${form.interest}`,
      form.date && `${f.date}: ${form.date}`,
      form.message && `\n${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(composeMessage())}`, '_blank', 'noopener')
  }

  const sendEmail = () => {
    setTouched(true)
    if (!valid) return
    const subject = `${t.brand.name} | ${form.interest || f.title} | ${form.name}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeMessage())}`
  }

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${site.map.lat},${site.map.lng}`
  const embed = `https://maps.google.com/maps?q=${site.map.lat},${site.map.lng}&z=16&hl=${lang}&output=embed`

  return (
    <section id="contact" className="relative overflow-hidden bg-space py-24 text-white md:py-36">
      <div className="pointer-events-none absolute -end-40 -top-40 size-[36rem] rounded-full bg-nebula/30 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} dark />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-star" aria-hidden />
                  <div>
                    <p className="text-sm text-white/50">{c.addressLabel}</p>
                    <p className="text-lg">{c.address}</p>
                    <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-star underline-offset-4 hover:underline">
                      {c.directions}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-star" aria-hidden />
                  <div>
                    <p className="text-sm text-white/50">{c.phoneLabel}</p>
                    <p className="flex flex-wrap gap-x-4 text-lg" dir="ltr">
                      {site.phones.map((p) => (
                        <a key={p} href={`tel:+2${p}`} className="hover:text-star">
                          {p}
                        </a>
                      ))}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 size-5 shrink-0 text-star" aria-hidden />
                  <div>
                    <p className="text-sm text-white/50">{c.emailLabel}</p>
                    <a href={`mailto:${site.email}`} className="text-lg hover:text-star">
                      {site.email}
                    </a>
                  </div>
                </li>
              </ul>
              <div>
                <p className="mb-3 text-sm text-white/50">{c.followLabel}</p>
                <div className="flex gap-2">
                  {site.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.id}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 transition hover:border-star hover:bg-star hover:text-space"
                    >
                      <SocialIcon id={s.id} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative mt-2 min-h-64 flex-1 overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  title={c.address}
                  src={embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full grayscale invert-[0.9] hue-rotate-180 contrast-[0.9]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={sendWhatsApp} noValidate className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-10">
              <h3 className="font-display text-3xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-white/60">{f.intro}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">{f.name} *</Label>
                  <Input id="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={touched && !form.name.trim()} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">{f.phone} *</Label>
                  <Input id="phone" type="tel" dir="ltr" autoComplete="tel" value={form.phone} onChange={set('phone')} aria-invalid={touched && !form.phone.trim()} required className="rtl:text-right" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{f.email}</Label>
                  <Input id="email" type="email" dir="ltr" autoComplete="email" value={form.email} onChange={set('email')} className="rtl:text-right" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="occupation">{f.occupation}</Label>
                  <Input id="occupation" value={form.occupation} onChange={set('occupation')} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interest">{f.interest}</Label>
                  <Select id="interest" value={form.interest} onChange={set('interest')}>
                    <option value="">—</option>
                    {f.interestOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">{f.date}</Label>
                  <Input id="date" type="date" value={form.date} onChange={set('date')} className="[color-scheme:dark]" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="message">{f.message}</Label>
                  <Textarea id="message" placeholder={f.messagePlaceholder} value={form.message} onChange={set('message')} />
                </div>
              </div>
              {touched && !valid && (
                <p role="alert" className="mt-4 text-sm text-rim-red">
                  {f.name} / {f.phone}: {f.required}
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" variant="star" size="lg" className="sm:flex-1">
                  <MessageCircle />
                  {f.whatsapp}
                </Button>
                <Button type="button" variant="glass" size="lg" className="sm:flex-1" onClick={sendEmail}>
                  <Send className="rtl:-scale-x-100" />
                  {f.emailCta}
                </Button>
              </div>
              <p className="mt-4 text-xs text-white/60">{f.note}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
