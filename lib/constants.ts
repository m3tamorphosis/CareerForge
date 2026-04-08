import type { ResumeFormValues } from "@/types";

export const appConfig = {
  name: "CareerForge AI",
  tagline: "Land better opportunities with AI-crafted resumes, cover letters, and job tracking.",
};

export const applicationStatuses = [
  "WISHLIST",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
] as const;

export const pricingPlans = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    description: "Get started with structured job search essentials.",
    features: [
      "1 resume workspace",
      "5 AI bullet improvements / month",
      "3 cover letters / month",
      "Basic job tracker",
    ],
  },
  {
    name: "Pro",
    monthly: 19,
    yearly: 15,
    description: "For ambitious candidates running a serious search.",
    features: [
      "Unlimited resumes",
      "Unlimited AI bullet improvements",
      "Unlimited cover letters",
      "Advanced job tracking insights",
      "Priority support",
    ],
  },
];

export const featureComparison = [
  ["Resume builder", "1 resume", "Unlimited"],
  ["Cover letters", "3 / month", "Unlimited"],
  ["AI bullet rewriting", "5 / month", "Unlimited"],
  ["Job tracker", "Basic", "Advanced"],
  ["PDF export", "Yes", "Yes"],
];

export const defaultResume: ResumeFormValues = {
  title: "Senior Product Designer Resume",
  summary:
    "Strategic product designer with 6+ years building polished, high-converting experiences across SaaS and growth products.",
  personal: {
    fullName: "Alex Morgan",
    role: "Senior Product Designer",
    email: "alex@careerforge.ai",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "portfolio.example.com",
  },
  experience: [
    {
      id: "exp-1",
      company: "Northstar Labs",
      role: "Senior Product Designer",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Led redesign of onboarding flows that improved activation by 26% across self-serve accounts.",
        "Partnered with engineering and growth to ship experimentation frameworks for lifecycle conversion.",
      ],
    },
    {
      id: "exp-2",
      company: "Baseline Studio",
      role: "Product Designer",
      startDate: "2019",
      endDate: "2022",
      bullets: [
        "Designed core collaboration surfaces used by 50k+ weekly active users.",
        "Built a scalable design system that reduced design-to-dev cycle time by 30%.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "California College of the Arts",
      degree: "BFA, Interaction Design",
      year: "2019",
    },
  ],
  skills: ["Product Strategy", "Design Systems", "Figma", "User Research", "Prototyping", "Cross-functional Leadership"],
};
