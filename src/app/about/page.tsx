import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { aboutPillars, aboutStory, doctorIntro, fellowships, philosophy } from "@/config/about";
import { consultationHref } from "@/config/navigation";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description: doctorIntro.headline,
  alternates: { canonical: "/about" },
};

const headlineAccent = "cosmetic surgery.";
const headlineLead = doctorIntro.headline.endsWith(headlineAccent)
  ? doctorIntro.headline.slice(0, -headlineAccent.length)
  : doctorIntro.headline;

const heroFacts = [
  { label: "Qualifications", value: "MBBS, MS, MCh" },
  { label: "Specialty", value: "Plastic & Cosmetic Surgery" },
  { label: "Fellowship", value: "Advanced Fellowship Training" },
  { label: "Trained at", value: "Akademikliniken, Stockholm" },
];

const storyFacts = [
  { label: "Qualifications", value: "MBBS, MS, MCh", detail: "Plastic Surgery" },
  { label: "Fellowship", value: "Akademikliniken", detail: "Advanced Cosmetic Surgery Training, Stockholm" },
  { label: "Location", value: "Chennai, India", detail: "Multiple hospitals & clinics" },
];

function GraduationIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2 8l10-4.5L22 8l-10 4.5L2 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 10.3V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutPage(): React.ReactElement {
  return (
    <main id="main-content" className="flex-1">
      <section className="bg-(--color-bg)">
        <Container width="wide" className="flex flex-col py-10 md:py-14 lg:min-h-[calc(100svh-var(--nav-height))] lg:py-12">
          <span className="text-eyebrow">02 &mdash; {doctorIntro.eyebrow}</span>

          <div className="mt-8 grid flex-1 grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
            <div>
              <h1
                className="max-w-[12.5em] font-(family-name:--font-display) font-normal text-(--color-ink)"
                style={{ fontSize: "clamp(2.75rem, 4.4vw, 5.25rem)", lineHeight: 0.98, letterSpacing: "-0.025em" }}
              >
                {headlineLead}
                <em className="text-(--color-accent)">{headlineAccent}</em>
              </h1>

              <div className="mt-7 h-px w-14 bg-(--color-accent)" />

              <p className="mt-6 max-w-[520px] text-base leading-[1.6] text-(--color-ink-muted)">
                {doctorIntro.paragraphs[1]}
              </p>

              <div className="mt-8">
                <TextLink href={consultationHref}>Book a consultation &rarr;</TextLink>
              </div>
            </div>

            <div className="relative h-[26rem] w-full md:h-[32rem] lg:h-[clamp(34rem,70vh,40rem)]">
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-(--color-bg-secondary)">
                <span
                  aria-hidden="true"
                  className="absolute -left-4 -top-10 select-none font-(family-name:--font-display) text-[16rem] leading-none text-(--color-ink)/[0.06]"
                >
                  D
                </span>
              </div>
              <div className="absolute inset-x-0 top-0 bottom-0">
                <Image
                  src="/images/doctor/dr-dinesh-profile-cutout.png"
                  alt="Dr. Dinesh Kumar, consultant plastic and cosmetic surgeon"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 90vw"
                  className="object-contain object-bottom drop-shadow-[0_20px_28px_rgba(80,65,45,0.16)]"
                />
              </div>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-(--color-border) pt-6 lg:grid-cols-4">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-eyebrow text-(--color-ink-faint)">{fact.label}</dt>
                <dd className="mt-1.5 text-sm text-(--color-ink)">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section spacing="lg">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-[42rem]">
              <span className="text-eyebrow">03 &mdash; The Full Story</span>
              <div className="mt-4 h-px w-14 bg-(--color-accent)" />

              <div className="mt-8">
                {aboutStory.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-[1.0625rem] leading-[1.75] text-(--color-ink-muted) md:text-[1.1875rem] ${index > 0 ? "mt-7" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="font-(family-name:--font-display) mt-10 text-xl italic text-(--color-ink)">
                {doctorIntro.signature}
              </p>

              <p className="text-body mt-8 text-(--color-ink-faint)">
                To discuss your own goals and concerns directly,{" "}
                <TextLink href={consultationHref}>book a consultation</TextLink>.
              </p>
            </div>

            <dl className="lg:border-l lg:border-(--color-border) lg:pl-10 lg:self-start lg:sticky lg:top-28">
              {storyFacts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={index > 0 ? "mt-7 border-t border-(--color-border) pt-7" : "border-t border-(--color-border) pt-7 lg:border-t-0 lg:pt-0"}
                >
                  <dt className="text-eyebrow text-(--color-ink-faint)">{fact.label}</dt>
                  <dd className="mt-3 font-(family-name:--font-display) text-xl text-(--color-ink)">{fact.value}</dd>
                  <dd className="mt-1 text-sm leading-relaxed text-(--color-ink-muted)">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container width="wide">
          <span className="text-eyebrow">Fellowships &amp; Advanced Training</span>
          <h2 className="text-h2 mt-4 max-w-2xl text-(--color-ink)">
            Dedicated training beyond formal qualification.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-8 border-t border-(--color-border) pt-10 sm:grid-cols-2 md:mt-20">
            {fellowships.map((fellowship) => (
              <div
                key={fellowship.title}
                className="rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-8 transition-transform duration-(--duration-base) ease-(--ease-editorial) hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-bg-secondary) text-(--color-accent)">
                  <GraduationIcon className="h-5 w-5" />
                </span>

                <p className="font-(family-name:--font-display) mt-6 text-2xl text-(--color-ink)">
                  {fellowship.title}
                </p>

                <dl className="mt-6 flex flex-col gap-4 border-t border-(--color-border) pt-6">
                  <div>
                    <dt className="text-eyebrow text-(--color-ink-faint)">Mentor</dt>
                    <dd className="mt-1 text-sm text-(--color-ink-muted)">{fellowship.mentor}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-(--color-ink-faint)">Location</dt>
                    <dd className="mt-1 text-sm text-(--color-ink-muted)">{fellowship.location}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="xl" background="bg-secondary">
        <Container width="wide">
          <span className="text-eyebrow">The Approach</span>
          <h2 className="text-h2 mt-4 max-w-2xl text-(--color-ink)">
            Science, precision, artistry and listening.
          </h2>

          <dl className="mt-14 grid grid-cols-1 gap-10 border-t border-(--color-border) pt-10 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
            {aboutPillars.map((pillar, index) => (
              <div key={pillar.title}>
                <dt className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="text-small tabular-nums text-(--color-ink-faint)">
                    0{index + 1}
                  </span>
                  <span className="text-h3 text-(--color-ink)">{pillar.title}</span>
                </dt>
                <dd className="text-body mt-3 text-(--color-ink-muted)">{pillar.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container width="wide">
          <span className="text-eyebrow">Philosophy</span>
          <blockquote className="mt-6">
            <p className="text-h1 max-w-3xl text-(--color-ink)">&ldquo;{philosophy.quote}&rdquo;</p>
          </blockquote>

          <ul className="mt-14 grid grid-cols-1 gap-6 border-t border-(--color-border) pt-10 sm:grid-cols-2">
            {philosophy.supporting.map((point) => (
              <li key={point} className="text-body text-(--color-ink-muted)">
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
