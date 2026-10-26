export interface ProcedureDirectoryCategory {
  slug: string;
  label: string;
  procedures: string[];
  /**
   * Slug of an existing /procedures/[slug] detail page covering this
   * category, when one exists (see src/config/concerns.ts). Left
   * undefined for categories with no dedicated page yet — per the client
   * brief, those procedure names are shown as plain text rather than
   * linked, so nothing points to a 404.
   */
  linkSlug?: string;
}

/**
 * The full procedure taxonomy, as supplied directly by the client
 * (10 body-area categories, 21 individual procedure names — their brief
 * describes this as "nine categories / 22 entries" but the table they
 * provided lists 10 categories and 21 entries; implemented exactly as
 * tabulated, nothing added or merged beyond what they specified).
 * Deliberately just names — no descriptions, claims or outcomes are
 * invented for the procedures that don't already have a detail page.
 */
export const procedureDirectory: ProcedureDirectoryCategory[] = [
  {
    slug: "eyes",
    label: "Eyes",
    procedures: ["Blepharoplasty", "Eye rejuvenation"],
    linkSlug: "eyes",
  },
  {
    slug: "forehead",
    label: "Forehead",
    procedures: ["Botox"],
  },
  {
    slug: "cheeks",
    label: "Cheeks",
    procedures: ["Dermal fillers", "Fat grafting", "Dimple creation"],
  },
  {
    slug: "lips-and-facial-procedures",
    label: "Lips and Facial Procedures",
    procedures: ["Lip reduction", "Buccal fat removal"],
  },
  {
    slug: "chin",
    label: "Chin",
    procedures: ["Chin implants"],
  },
  {
    slug: "jawline",
    label: "Jawline",
    procedures: ["Jawline contouring"],
  },
  {
    slug: "nose",
    label: "Nose",
    procedures: ["Rhinoplasty"],
    linkSlug: "nose",
  },
  {
    slug: "breast",
    label: "Breast",
    procedures: ["Breast reduction", "Breast augmentation", "Breast lift"],
    linkSlug: "breast",
  },
  {
    slug: "body",
    label: "Body",
    procedures: ["Tummy tuck", "Mommy makeover", "Love handle reduction", "Hernia surgery"],
    linkSlug: "body",
  },
  {
    slug: "mens-procedures",
    label: "Men's Procedures",
    procedures: ["Gynecomastia surgery", "Hair transplant", "HD liposuction"],
    linkSlug: "men",
  },
];
