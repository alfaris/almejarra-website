import { ArrowLeft, Award, Users } from 'lucide-react'

import { JoinCta } from '@/components/JoinCta'
import { PersonGrid } from '@/components/PersonGrid'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'

export function TeamPage() {
  const { t } = useI18n()
  const page = t.teamPage
  return (
    <>
      <section id="top" className="relative overflow-hidden bg-space pb-20 pt-32 text-white md:pb-28 md:pt-44">
        <div
          className="absolute inset-0 -z-0"
          style={{
            background:
              'radial-gradient(50% 70% at 80% 0%, color-mix(in oklch, var(--nebula) 45%, transparent), transparent 70%), radial-gradient(30% 40% at 10% 100%, color-mix(in oklch, var(--rim-blue) 18%, transparent), transparent 70%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <a href="#top" className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden />
            {page.back}
          </a>
          <SectionHeading eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} dark />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-12 flex items-center gap-3">
            <Users className="size-7 text-primary" aria-hidden />
            <h2 className="font-display text-3xl font-semibold md:text-4xl">{page.crew.title}</h2>
          </Reveal>
          <PersonGrid people={page.crew.members} className="md:grid-cols-4" />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="rounded-[2rem] bg-secondary p-6 md:p-12">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <Award className="mb-4 size-8 text-primary" aria-hidden />
                <h2 className="font-display text-3xl font-semibold md:text-4xl">{page.honors.title}</h2>
                <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                  {page.honors.intro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <img
                  src={site.images.crew}
                  alt={page.honors.photoAlt}
                  loading="lazy"
                  width={1000}
                  height={667}
                  className="mt-8 aspect-[3/2] w-full rounded-3xl object-cover"
                />
              </Reveal>
              <PersonGrid people={page.honors.members} ring="border-secondary" className="lg:col-span-8" />
            </div>
          </div>
          <Reveal className="mt-10">
            <JoinCta />
          </Reveal>
        </div>
      </section>
    </>
  )
}
