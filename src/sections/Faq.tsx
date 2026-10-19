import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useI18n } from '@/lib/i18n'

export function Faq() {
  const { t } = useI18n()
  return (
    <section id="faq" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </div>
        <Reveal className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t">
            {t.faq.items.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
