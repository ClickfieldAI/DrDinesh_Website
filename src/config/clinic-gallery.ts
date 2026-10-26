export interface ClinicPhoto {
  src: string;
  alt: string;
  /**
   * Short, neutral caption shown under each photo. Deliberately generic
   * (per client sign-off) rather than naming a specific procedure, patient
   * or outcome — none of that is documented for these images. Swap for
   * real, case-specific captions only once that information is confirmed.
   */
  caption: string;
}

/**
 * Real clinic/behind-the-scenes photography of Dr. Dinesh Kumar, supplied
 * directly by the practice — distinct from the before/after patient-result
 * gallery, which requires per-case informed consent.
 */
export const clinicPhotos: ClinicPhoto[] = [
  { src: "/gallery/clinic-03.jpg", alt: "Dr. Dinesh Kumar, studio portrait", caption: "Professional Practice" },
  {
    src: "/gallery/clinic-07.jpg",
    alt: "Dr. Dinesh Kumar with a stethoscope, studio portrait",
    caption: "Clinical Practice",
  },
  { src: "/gallery/clinic-01.jpg", alt: "Dr. Dinesh Kumar at the clinic", caption: "Aesthetic Consultation" },
  {
    src: "/gallery/clinic-02.jpg",
    alt: "Dr. Dinesh Kumar at the clinic, with awards and certifications in the background",
    caption: "Professional Practice",
  },
  {
    src: "/gallery/clinic-04.jpg",
    alt: "Dr. Dinesh Kumar with fellow surgeons",
    caption: "Treatment Planning",
  },
  {
    src: "/gallery/clinic-05.jpg",
    alt: "Dr. Dinesh Kumar with a colleague at the hospital",
    caption: "Clinical Practice",
  },
  {
    src: "/gallery/clinic-06.jpg",
    alt: "Dr. Dinesh Kumar with fellow surgeons at the hospital",
    caption: "Treatment Planning",
  },
];
