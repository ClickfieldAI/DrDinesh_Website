import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ConcernIcon } from "@/components/ui/ConcernIcons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { concerns } from "@/config/concerns";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Procedures",
  description:
    "Explore aesthetic and reconstructive procedures by the area or concern you would like to understand.",
  alternates: { canonical: "/procedures" },
};

/**
 * Same source photography as the homepage "Explore" section, rendered
 * through the identical monochrome filter recipe so the two card sets read
 * as one consistent editorial photography collection across the site.
 */
const concernImages: Partial<Record<string, string>> = {
  face: "/images/procedures/face-explorer.jpg",
  nose: "/images/procedures/nose-explorer.jpg",
  eyes: "/images/procedures/eyes-explorer.jpg",
  breast: "/images/procedures/breast-explorer.jpg",
  body: "/images/procedures/body-explorer.jpg",
  men: "/images/procedures/men-explorer.jpg",
};

export default function ProceduresPage(): React.ReactElement {
  return (
    <main id="main-content" className="flex-1">
      <Section spacing="xl">
        <Container width="wide">
          <PageHeader
            eyebrow="Procedures"
            title="Explore procedures by area."
            description="Every procedure begins with understanding your goals and concerns. Select an area to learn more."
          />

          <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-24">
            {concerns.map((concern, index) => {
              const image = concernImages[concern.slug];

              return (
                <li key={concern.slug} className="group">
                  <Link
                    href={`/procedures/${concern.slug}`}
                    data-cursor="Explore"
                    className="flex h-full flex-col overflow-hidden rounded-[10px] border border-(--color-border) bg-(--color-surface) transition-colors duration-(--duration-base) ease-(--ease-editorial) hover:border-(--color-accent)"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--color-bg-secondary)">
                      {image ? (
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                          className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-[1.03]"
                          style={{ filter: "grayscale(1) contrast(0.92) brightness(1.06)" }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ConcernIcon slug={concern.slug} className="h-10 w-10 text-(--color-accent-strong)/40" />
                        </div>
                      )}
                      <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-(--color-bg)/90 font-(family-name:--font-display) text-sm italic text-(--color-accent)">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-(family-name:--font-display) text-2xl text-(--color-ink) transition-colors duration-(--duration-base) ease-(--ease-editorial) group-hover:text-(--color-accent)">
                          {concern.label}
                        </span>
                        <ConcernIcon
                          slug={concern.slug}
                          className="h-6 w-6 shrink-0 text-(--color-ink-faint) transition-colors duration-(--duration-base) ease-(--ease-editorial) group-hover:text-(--color-accent)"
                        />
                      </div>
                      <p className="text-body text-(--color-ink-muted)">{concern.descriptor}</p>

                      <span
                        aria-hidden="true"
                        className="mt-auto flex h-8 w-8 items-center justify-center self-start rounded-full border border-(--color-border-strong) text-(--color-accent) transition-all duration-(--duration-base) ease-(--ease-editorial) group-hover:translate-x-1 group-hover:border-(--color-accent)"
                      >
                        &rarr;
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
