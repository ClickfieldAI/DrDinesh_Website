export interface ConsultationLocation {
  slug: string;
  name: string;
  area: string;
  address: string;
  /** Google Maps link supplied directly by the client for this location. */
  googleMapsUrl: string;
  /** Marker coordinates for the interactive map. */
  lat: number;
  lng: number;
  /**
   * False means the coordinate above is a locality-level approximation
   * (sourced from a public reference for the surrounding area, e.g.
   * Wikipedia), not a verified building-level pin. These are flagged
   * rather than silently treated as exact — see PROJECT notes / the
   * implementation summary for which ones still need confirmation
   * against the actual premises.
   */
  coordinatesVerified: boolean;
}

/**
 * Consultation locations, as supplied directly. No timings are listed —
 * none were provided, and none should be invented.
 *
 * Coordinates: JS Global Hospital's coordinates were cross-checked against
 * a third-party clinic directory's "get directions" link for that exact
 * premises (high confidence). Supreme Speciality Hospitals and iGen
 * Clinics use locality-level coordinates (Padur and Saidapet respectively)
 * as a close approximation pending exact building confirmation. Vijaya
 * Hospital, Panaiyur could not be independently verified from this
 * environment and uses a best-estimate ECR/Panaiyur-area coordinate —
 * flagged below for confirmation rather than treated as exact.
 */
export const locations: ConsultationLocation[] = [
  {
    slug: "supreme-speciality-hospitals",
    name: "Supreme Speciality Hospitals",
    area: "Padur, OMR",
    address: "1/56, Old Mahabalipuram Road, Padur, Chennai, Tamil Nadu 603103",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Supreme+Speciality+Hospitals+1%2F56+OMR+Padur+Chennai",
    lat: 12.8077,
    lng: 80.2258,
    coordinatesVerified: false,
  },
  {
    slug: "vijaya-hospital-panaiyur",
    name: "Vijaya Hospital, Panaiyur",
    area: "Panaiyur, ECR",
    address: "Panaiyur, ECR, Chennai, Tamil Nadu 600119",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Vijaya+Hospital+Panaiyur+ECR+Chennai",
    lat: 12.8558,
    lng: 80.2472,
    coordinatesVerified: false,
  },
  {
    slug: "igen-clinics",
    name: "iGen Clinics",
    area: "Srinagar Colony, Saidapet",
    address: "30, North Avenue, Srinagar Colony, Saidapet, Chennai, Tamil Nadu 600015",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=iGen+Clinics+30+North+Avenue+Srinagar+Colony+Saidapet+Chennai",
    lat: 13.0214,
    lng: 80.2214,
    coordinatesVerified: false,
  },
  {
    slug: "js-global-hospital",
    name: "JS Global Hospital",
    area: "Semmancheri, OMR",
    address: "1/176, Rajiv Gandhi Salai, Semmancheri, Chennai, Tamil Nadu 600119",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=JS+Global+Hospital+1%2F176+Rajiv+Gandhi+Salai+Semmancheri+Chennai",
    lat: 12.860010,
    lng: 80.225515,
    coordinatesVerified: true,
  },
];
