export interface DoctorIntroContent {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  signature: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface AboutPillar {
  title: string;
  description: string;
}

export interface PhilosophyContent {
  quote: string;
  supporting: string[];
}

export interface Fellowship {
  title: string;
  mentor: string;
  location: string;
}

/**
 * Homepage/About "Meet Dr. Dinesh" content. Facts here (qualifications,
 * fellowship training, location) are sourced from the doctor-supplied
 * brief. Do not add institution names, registration numbers, additional
 * fellowships, memberships, years of experience or case counts beyond
 * what is listed here until confirmed.
 */
export const doctorIntro: DoctorIntroContent = {
  eyebrow: "Meet Dr. Dinesh",
  headline: "A considered approach to plastic and cosmetic surgery.",
  paragraphs: [
    "Dr. Dinesh Kumar is a Consultant Plastic & Cosmetic Surgeon. He completed his MBBS, MS (General Surgery) and MCh (Plastic Surgery), followed by advanced fellowship training in cosmetic surgery, including training at Akademikliniken, Stockholm.",
    "His approach is built on listening first — understanding what a patient is concerned about and hopes to achieve, and just as importantly, what they may not need — before discussing realistic, natural-looking options.",
  ],
  signature: "Dr. Dinesh Kumar",
  ctaLabel: "Read the full story",
  ctaHref: "/about",
};

/** The four pillars framing the About page's telling of the doctor's approach. */
export const aboutPillars: AboutPillar[] = [
  {
    title: "Science",
    description: "Technical surgical knowledge and medical training — MBBS, MS (General Surgery) and MCh (Plastic Surgery).",
  },
  {
    title: "Precision",
    description: "Understanding anatomy, proportion and symmetry before any treatment is discussed.",
  },
  {
    title: "Artistry",
    description: "Creating results that stay harmonious with an individual's own features, not a fixed idea of beauty.",
  },
  {
    title: "Listening",
    description: "Understanding what a patient actually wants — and doesn't need — before recommending treatment.",
  },
];

/** Full first-person story for the About page, as supplied by Dr. Dinesh Kumar. */
export const aboutStory: string[] = [
  "I am Dr. Dinesh Kumar, Consultant Plastic & Cosmetic Surgeon, and my journey in plastic surgery has been driven by a simple belief — when people feel comfortable and confident in themselves, it can positively influence every aspect of their lives.",
  "I completed my MBBS, MS (General Surgery) and MCh (Plastic Surgery), followed by advanced fellowship training in cosmetic surgery, including training at Akademikliniken, Stockholm.",
  "What drew me towards cosmetic surgery was the unique combination of science, precision and artistry. Unlike many other areas of surgery, aesthetic surgery requires not only technical expertise, but also an understanding of proportion, symmetry and what makes an individual look naturally balanced.",
  "Over the years, I have had the opportunity to work with patients seeking both subtle enhancements and more significant changes. One thing I have learnt is that there is no universal definition of beauty. Every face and every body is different, and the same procedure can have very different goals for different people.",
  "That is why I believe the most important part of cosmetic treatment begins before the procedure itself — with listening. I take the time to understand what a patient is concerned about, what they hope to achieve and, equally importantly, what they may not need. I believe in giving honest advice, explaining realistic possibilities and discussing the benefits, limitations, risks and recovery associated with every treatment.",
  "Whether it is a subtle non-surgical enhancement or a carefully planned surgical procedure, my approach is centred around natural-looking results, personalised treatment and patient safety.",
  "For me, the most rewarding part of being a cosmetic surgeon is not simply seeing a change in appearance. It is seeing the change in confidence, comfort and the way a patient carries themselves afterwards. That is what continues to inspire me every day.",
];

/**
 * Named fellowships / advanced training beyond the formal MBBS, MS, MCh
 * qualification, shown on the About page's "Fellowships & Advanced
 * Training" section. Source of truth: doctor-supplied brief. Do not add
 * dates, institutions or additional fellowships beyond what is listed
 * here without further verification.
 */
export const fellowships: Fellowship[] = [
  {
    title: "IAAPS Fellowship",
    mentor: "Dr. Rajat Gupta",
    location: "New Delhi, India",
  },
];

export const philosophy: PhilosophyContent = {
  quote:
    "I don't want to change who you are. I want to help you become the version of yourself that you feel most confident being.",
  supporting: [
    "Natural-looking results, not a template repeated across patients.",
    "Individualised treatment, planned around your own anatomy and goals.",
    "Honest consultation, with realistic expectations discussed from the start.",
    "Patient safety and listening before treatment, in every conversation.",
  ],
};
