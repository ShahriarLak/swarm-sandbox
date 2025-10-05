export type NavItem = {
  label: string;
  href: string;
};

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type PricingTier = {
  name: string;
  price: string;
  frequency: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  highlighted?: boolean;
  features: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FooterLinkGroup = {
  title: string;
  links: NavItem[];
};

export const siteConfig = {
  name: "PulsePilot",
  description:
    "PulsePilot centralizes customer feedback and release plans so your product org can move with focus and clarity.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ] satisfies NavItem[],
  hero: {
    eyebrow: "Product Ops for high-velocity teams",
    title: "Bring every roadmap into focus",
    description:
      "PulsePilot connects strategy, execution, and customer insights in one place. Give every teammate the context they need to ship faster and delight customers.",
    primaryCta: { label: "Start for free", href: "/dashboard" },
    secondaryCta: { label: "View pricing", href: "#pricing" },
  },
  logos: ["Arc", "Vercel", "Linear", "Pitch", "Raycast", "Novel"],
  features: [
    {
      icon: "🧭",
      title: "Guided roadmaps",
      description:
        "Plan, prioritize, and communicate product roadmaps with clarity so every launch stays on track.",
    },
    {
      icon: "📊",
      title: "Insight dashboards",
      description:
        "Translate feedback into actionable themes and share dashboards that keep leadership aligned.",
    },
    {
      icon: "⚡",
      title: "Automated workflows",
      description:
        "Eliminate manual updates with rules that route updates to the right owners instantly.",
    },
    {
      icon: "🤝",
      title: "Customer-ready briefs",
      description:
        "Turn roadmap milestones into polished narratives tailored to customer-facing teams.",
    },
  ] satisfies Feature[],
  pricing: [
    {
      name: "Starter",
      price: "$0",
      frequency: "/month",
      description: "For individuals experimenting with product ops.",
      cta: { label: "Get started", href: "/dashboard" },
      features: [
        "Unlimited personal boards",
        "1 shared workspace",
        "Feedback inbox",
      ],
    },
    {
      name: "Growth",
      price: "$29",
      frequency: "/seat",
      description: "Best for growing product teams that need cross-functional visibility.",
      cta: { label: "Start free trial", href: "/dashboard" },
      highlighted: true,
      features: [
        "Unlimited workspaces",
        "AI-powered summaries",
        "Advanced permissions",
        "Custom integrations",
      ],
    },
    {
      name: "Scale",
      price: "Let's chat",
      frequency: "",
      description: "Enterprise-grade security and tailored onboarding.",
      cta: { label: "Talk to sales", href: "mailto:sales@pulsepilot.io" },
      features: [
        "Dedicated success manager",
        "SOC 2 Type II compliance",
        "Custom data residency",
        "White-glove migration",
      ],
    },
  ] satisfies PricingTier[],
  faq: [
    {
      question: "How does the free plan work?",
      answer:
        "Create a workspace, invite collaborators, and explore every core feature. Upgrade only when you're ready to scale across teams.",
    },
    {
      question: "Can I import data from my existing tools?",
      answer:
        "Yes. PulsePilot integrates with the tools you already use—import from spreadsheets, project trackers, and feedback forms in minutes.",
    },
    {
      question: "Is there a discount for startups?",
      answer:
        "Absolutely. Early-stage startups under 25 employees qualify for 50% off the Growth plan for the first year.",
    },
    {
      question: "Do you support single sign-on (SSO)?",
      answer:
        "SSO is available on the Scale plan with support for SAML and SCIM provisioning.",
    },
  ] satisfies FAQItem[],
  footer: {
    links: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Blog", href: "#" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Contact", href: "mailto:hello@pulsepilot.io" },
          { label: "LinkedIn", href: "#" },
          { label: "Support", href: "#" },
        ],
      },
    ] satisfies FooterLinkGroup[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
