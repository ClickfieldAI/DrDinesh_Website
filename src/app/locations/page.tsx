import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LocationsMap } from "@/components/interactive/LocationsMap";
import { locations } from "@/config/locations";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Locations",
  description: "Consultation locations for Dr. Dinesh Kumar across Chennai.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage(): React.ReactElement {
  return (
    <main id="main-content" className="flex-1">
      <Section spacing="xl">
        <Container width="wide">
          <PageHeader
            eyebrow="Locations"
            title="Consultation locations."
            description="Dr. Dinesh Kumar consults across the following hospitals and clinics in Chennai. Select a location on the map or in the list to see its address and directions."
          />

          <div className="mt-14 md:mt-20">
            <LocationsMap locations={locations} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
