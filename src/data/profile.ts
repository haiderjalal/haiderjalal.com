import type { Profile } from "@/types/profile";

// Single source of truth for portfolio copy. Edit content here, not inside components.
// Sources: LinkedIn profile PDF, the public Instagram bio, the owner's brief, the Musme website,
// and projects from the previous portfolio. Personal contact details from the PDF are left out on purpose.
export const profile: Profile = {
  name: "Haider Jalal",
  headline: "AI generalist and software engineer",
  description:
    "AI generalist and software engineer based in Islamabad, Pakistan. Founder of Musme, taking on AI consultancy and remote freelance projects.",
  intro:
    "I help businesses grow with AI through automation, content, and websites. Based in Islamabad, working with clients remotely.",
  roles: ["AI generalist", "Software engineer", "Founder, Musme"],
  location: { city: "Islamabad", country: "Pakistan", countryCode: "PK" },
  portrait: {
    src: "/images/haider-portrait.png",
    alt: "Portrait of Haider Jalal",
  },
  about: {
    heading: "Hands-on across AI and software.",
    paragraphs: [
      "I'm an AI generalist and software engineer based in Islamabad, Pakistan.",
      "I've worked with startups and organizations at different stages. Today I'm the founder of Musme, and I take on AI consultancy and remote freelance projects for clients.",
    ],
    facts: [
      { label: "Based in", value: "Islamabad, Pakistan" },
      { label: "Working", value: "Remote, with clients" },
      { label: "Focus", value: "AI consultancy, automation, content, websites" },
      { label: "Founder of", value: "Musme" },
    ],
  },
  tickerItems: [
    "AI consultancy",
    "AI automation",
    "AI content",
    "Websites",
    "Remote freelance",
  ],
  services: [
    {
      title: "AI consultancy",
      description:
        "Practical guidance on where AI fits your business, what to build first, and how to roll it out.",
      icon: "consultancy",
    },
    {
      title: "AI automation",
      description:
        "Workflows that connect your tools and remove repetitive manual work.",
      icon: "automation",
    },
    {
      title: "AI content",
      description:
        "AI-assisted content production for brands, from first concept to finished assets.",
      icon: "content",
    },
    {
      title: "Websites",
      description:
        "Fast, modern websites and web apps that load quickly and work on every device.",
      icon: "websites",
      image: { src: "/projects/yfdental.jpg", alt: "YF Dental website" },
    },
  ],
  projects: [
    {
      name: "Pak Tribal Furniture",
      summary:
        "Solid wood furniture brand with collection browsing and an enquiry-led sales flow.",
      url: "https://www.paktribalfurniture.com/",
      image: {
        src: "/projects/pak-tribal-furniture.jpg",
        alt: "Pak Tribal Furniture website",
      },
      tags: ["Web", "E-commerce", "SEO"],
    },
    {
      name: "YF Dental",
      summary:
        "Clinic site for two Western Sydney practices, built around free-consult bookings.",
      url: "https://yfdental.vercel.app/",
      image: { src: "/projects/yfdental.jpg", alt: "YF Dental website" },
      tags: ["Web", "Bookings", "SEO"],
    },
    {
      name: "Bubish",
      summary:
        "Editorial site for a landscape, irrigation and interior studio in Islamabad.",
      url: "https://bubish.vercel.app/",
      image: { src: "/projects/bubish.jpg", alt: "Bubish website" },
      tags: ["Brand", "UI", "Motion"],
    },
    {
      name: "OptiSource PK",
      summary:
        "B2B wholesale optical supply, with catalogue browsing and a trade inquiry pipeline.",
      url: "https://www.optisourcepk.com/",
      image: { src: "/projects/optisourcepk.jpg", alt: "OptiSource PK website" },
      tags: ["B2B", "Catalogue", "Leads"],
    },
    {
      name: "Divers Optics",
      summary:
        "Eyewear retail site with curated browsing and WhatsApp-led customer enquiries.",
      url: "https://www.diversoptics.com/",
      image: { src: "/projects/diversoptics.jpg", alt: "Divers Optics website" },
      tags: ["Retail", "UI", "Responsive"],
    },
    {
      name: "PeptoLogics",
      summary:
        "Research peptide catalogue with a manual inquiry pipeline and lot documentation.",
      url: "https://www.peptologics.com/",
      image: { src: "/projects/peptologics.jpg", alt: "PeptoLogics website" },
      tags: ["Next.js", "Supabase", "Leads"],
    },
  ],
  experience: [
    {
      role: "Founder",
      organization: "Musme",
      period: "Jul 2024 - Present",
      summary:
        "AI automation, AI content, and digital products for owner-led businesses.",
    },
    {
      role: "Deputy Director",
      organization: "Anti Narcotics & Crime Control (ANCC)",
      period: "Nov 2023 - Present",
      summary:
        "Manages a dual role strengthening human capital and digital infrastructure for a nationwide mission against drug abuse and crime.",
    },
    {
      role: "Assistant Director",
      organization: "Anti Narcotics & Crime Control (ANCC)",
      period: "Mar 2023 - Nov 2023",
    },
    {
      role: "Quality Assurance Engineer",
      organization: "ScholarBee",
      period: "Jul 2025 - Aug 2025",
      summary: "Tested the ScholarBee product.",
    },
    {
      role: "Marketing Manager",
      organization: "National Incubation Center for Aerospace Technologies",
      period: "Jul 2025 - Aug 2025",
    },
    {
      role: "Automation Engineer",
      organization: "Code Huddle",
      period: "Feb 2025 - Jun 2025",
    },
    {
      role: "Software Developer",
      organization: "Code Huddle",
      period: "Jan 2025",
    },
    {
      role: "Project Manager",
      organization: "Excelerate",
      period: "Feb 2025 - Mar 2025",
      summary:
        "Supported planning for a Global Experiential Learning Event and helped define project scope, goals, and deliverables with cross-functional teams.",
    },
    {
      role: "Student",
      organization: "School of Leadership Foundation",
      period: "Feb 2024 - Apr 2024",
      summary:
        "Completed the three-month Green Urban Development School (GUDS) course.",
    },
    {
      role: "Full Stack Developer",
      organization: "RFZ Digital",
      period: "Jan 2024 - Apr 2024",
    },
    {
      role: "Founder",
      organization: "STEAM",
      period: "Jan 2023 - May 2023",
      summary:
        "Founded STEAM to combine software, engineering, and marketing under one brand. Led business strategy, product development, and client work.",
    },
  ],
  education: [
    {
      school: "COMSATS University Islamabad",
      degree: "Bachelor's degree, Software Engineering",
      period: "Sep 2020 - Jun 2024",
    },
  ],
  socials: [
    {
      label: "LinkedIn",
      handle: "in/haiderjalal",
      href: "https://linkedin.com/in/haiderjalal",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      handle: "@haider.jalals",
      href: "https://instagram.com/haider.jalals",
      icon: "instagram",
    },
    {
      label: "Facebook",
      handle: "facebook.com/haiderjalalo",
      href: "https://www.facebook.com/haiderjalalo",
      icon: "facebook",
    },
    {
      label: "Musme",
      handle: "musme.co",
      href: "https://musme.co",
      icon: "website",
    },
  ],
};
