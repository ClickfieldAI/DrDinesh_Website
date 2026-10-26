import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { clinicPhotos } from "@/config/clinic-gallery";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at Dr. Dinesh Kumar at work, in the clinic and in theatre.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage(): React.ReactElement {
  return (
    <main id="main-content" className="flex-1">
      <Section spacing="xl">
        <Container>
          <PageHeader
            eyebrow="In the Clinic"
            title="Behind the scenes."
            description="A look at Dr. Dinesh Kumar at work — in consultation, in theatre, and alongside the surgical teams he collaborates with."
          />

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:mt-24 md:grid-cols-3 lg:grid-cols-4">
            {clinicPhotos.map((photo) => (
              <figure
                key={photo.src}
                className="group overflow-hidden rounded-[10px] border border-(--color-border)"
              >
                <MediaPlaceholder
                  aspect="portrait"
                  imageSrc={photo.src}
                  alt={photo.alt}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="transition-transform duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-[1.03]"
                />
                <figcaption className="text-eyebrow border-t border-(--color-border) px-3 py-2.5 text-(--color-ink-muted)">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
