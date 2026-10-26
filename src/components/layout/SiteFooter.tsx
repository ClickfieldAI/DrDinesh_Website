import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/interactive/Magnetic";
import { concerns } from "@/config/concerns";
import { contactInfo, socialLinks } from "@/config/contact";
import { educationEntries } from "@/config/education";
import { consultationHref, proceduresHref } from "@/config/navigation";

interface FooterLink {
  label: string;
  href: string;
}

function InstagramIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 10.2v6.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7.5" cy="7.3" r="0.9" fill="currentColor" />
      <path
        d="M11 16.5v-3.6c0-1.5 1-2.7 2.5-2.7s2.2 1.1 2.2 2.6v3.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 10.2v6.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FooterGroup({ title, links }: { title: string; links: FooterLink[] }): React.ReactElement {
  return (
    <div>
      <p className="text-eyebrow">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-small text-(--color-ink-muted) transition-colors duration-(--duration-fast) ease-(--ease-editorial) hover:text-(--color-accent)"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Global footer. Static and server-rendered; navigation groups reuse the
 * existing concerns/education config so the site's real routes stay the
 * single source of truth instead of a duplicated link list.
 */
export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-bg)">
      <Container width="wide" className="py-16 md:py-24">
        <p className="text-giant text-(--color-ink)">Dinesh Kumar</p>
        <p className="text-eyebrow mt-3">Plastic &amp; Cosmetic Surgery</p>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Magnetic data-cursor="Open">
              <Button href={consultationHref} variant="secondary">
                Book a Consultation
              </Button>
            </Magnetic>
            <dl className="mt-8 flex flex-col gap-2">
              <dd>
                <a
                  href={contactInfo.phoneHref}
                  className="text-small text-(--color-ink-muted) transition-colors duration-(--duration-fast) ease-(--ease-editorial) hover:text-(--color-accent)"
                >
                  {contactInfo.phoneDisplay}
                </a>
              </dd>
              <dd>
                <a
                  href={contactInfo.emailHref}
                  className="text-small text-(--color-ink-muted) transition-colors duration-(--duration-fast) ease-(--ease-editorial) hover:text-(--color-accent)"
                >
                  {contactInfo.email}
                </a>
              </dd>
            </dl>
          </div>

          <nav aria-label="Footer" className="md:col-start-6 md:col-end-13">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <FooterGroup
                title="About"
                links={[
                  { label: "About Dr. Dinesh", href: "/about" },
                  { label: "Before & After", href: "/gallery" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Locations", href: "/locations" },
                ]}
              />
              <FooterGroup
                title="Procedures"
                links={[
                  { label: "All Procedures", href: proceduresHref },
                  ...concerns.map((concern) => ({
                    label: concern.label,
                    href: `/procedures/${concern.slug}`,
                  })),
                ]}
              />
              <FooterGroup
                title="Patient Education"
                links={[
                  { label: "Education Hub", href: "/education" },
                  ...educationEntries.map((entry) => ({
                    label: entry.title,
                    href: entry.href,
                  })),
                ]}
              />
              <div>
                <p className="text-eyebrow">Follow</p>
                <ul className="mt-4 flex flex-col gap-3">
                  <li>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Dr. Dinesh Kumar on Instagram (opens in a new tab)"
                      className="flex items-center gap-2 text-small text-(--color-ink-muted) transition-colors duration-(--duration-fast) ease-(--ease-editorial) hover:text-(--color-accent)"
                    >
                      <InstagramIcon className="h-4 w-4 shrink-0" />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Dr. Dinesh Kumar on LinkedIn (opens in a new tab)"
                      className="flex items-center gap-2 text-small text-(--color-ink-muted) transition-colors duration-(--duration-fast) ease-(--ease-editorial) hover:text-(--color-accent)"
                    >
                      <LinkedInIcon className="h-4 w-4 shrink-0" />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-(--color-border) pt-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-small text-(--color-ink-faint)">
            &copy; {new Date().getFullYear()} Dr. Dinesh Kumar. All rights reserved.
          </p>
          <p className="text-small text-(--color-ink-faint)">Chennai, India</p>
        </div>
      </Container>
    </footer>
  );
}
