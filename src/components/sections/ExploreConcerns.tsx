import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ConcernIcon } from "@/components/ui/ConcernIcons";
import { concerns } from "@/config/concerns";
import { proceduresHref } from "@/config/navigation";

/**
 * Procedure-area photography — one distinct photo per card, never reused
 * across two concerns. nose-explorer.jpg is a free-license Unsplash photo
 * (Zulfugar Karimov, unsplash.com/photos/cGUuNMJvkmE — standard Unsplash
 * license, free for commercial use), mirrored so the profile faces the
 * same direction as the rest of the row. All six are rendered through a
 * single shared monochrome filter recipe (below) so they read as one
 * editorial photography collection rather than six differently-toned
 * source photos.
 */
const concernImages: Partial<Record<string, string>> = {
  face: "/images/procedures/face-explorer.jpg",
  nose: "/images/procedures/nose-explorer.jpg",
  eyes: "/images/procedures/eyes-explorer.jpg",
  breast: "/images/procedures/breast-explorer.jpg",
  body: "/images/procedures/body-explorer.jpg",
  men: "/images/procedures/men-explorer.jpg",
};

/**
 * Compact grid index of procedure areas. Each card is a horizontal
 * editorial composition — copy and the number/arrow on the left, the
 * area's photograph filling the right ~40%, masked with a gradient so it
 * reads as integrated into the card rather than a pasted-in thumbnail.
 */
export function ExploreConcerns(): React.ReactElement {
  return (
    <section className="bg-(--color-bg)">
      <Container width="wide" className="py-16 md:py-24">
        <div className="flex items-baseline justify-between border-b border-(--color-border) pb-6">
          <span className="text-eyebrow">03 &mdash; Explore</span>
          <Link
            href={proceduresHref}
            className="text-eyebrow inline-flex items-center gap-2 text-(--color-ink) transition-colors duration-(--duration-fast) ease-(--ease-editorial) hover:text-(--color-accent)"
          >
            Explore All Procedures
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {concerns.map((concern, index) => {
            const image = concernImages[concern.slug];

            return (
              <li key={concern.slug} className="group">
                <Link
                  href={`/procedures/${concern.slug}`}
                  data-cursor="Explore"
                  className="grid h-full min-h-[13rem] grid-cols-5 overflow-hidden rounded-[10px] border border-(--color-border) bg-[#FBF9F3] shadow-[0_10px_30px_rgba(80,60,40,0.04)] transition-colors duration-(--duration-base) ease-(--ease-editorial) hover:border-(--color-accent)"
                >
                  <div className="col-span-3 flex flex-col gap-3 p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <span className="font-(family-name:--font-display) text-lg italic text-(--color-accent)">0{index + 1}</span>
                      <ConcernIcon
                        slug={concern.slug}
                        className="h-5 w-5 shrink-0 text-(--color-ink-faint) transition-colors duration-(--duration-base) ease-(--ease-editorial) group-hover:text-(--color-accent)"
                      />
                    </div>

                    <div>
                      <span className="font-(family-name:--font-display) text-xl text-(--color-ink) transition-colors duration-(--duration-base) ease-(--ease-editorial) group-hover:text-(--color-accent) sm:text-2xl">
                        {concern.label}
                      </span>
                      <p className="text-xs mt-1.5 text-(--color-ink-muted)">{concern.descriptor}</p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-auto flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border-strong) text-(--color-accent) transition-all duration-(--duration-base) ease-(--ease-editorial) group-hover:translate-x-1 group-hover:border-(--color-accent)"
                    >
                      &rarr;
                    </span>
                  </div>

                  <div className="relative col-span-2 overflow-hidden bg-(--color-bg-secondary)">
                    {image ? (
                      <>
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 14vw, (min-width: 640px) 20vw, 40vw"
                          className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-[1.03]"
                          style={{ filter: "grayscale(1) contrast(0.92) brightness(1.06)" }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(90deg, #FBF9F3 0%, transparent 65%)" }}
                        />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ConcernIcon
                          slug={concern.slug}
                          className="h-10 w-10 text-(--color-accent-strong)/40"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
