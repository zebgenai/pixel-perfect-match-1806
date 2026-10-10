export const en = {
  meta: {
    brand: "[Brand Name]",
    title: "[Brand Name] — Social Media & AI Tool Subscriptions",
    description: "Social media services and AI tool subscriptions — Claude, Cursor, Lovable and more — from one provider.",
  },
  ui: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    mainNav: "Main",
    languageLabel: "Language",
    langShortEn: "EN",
    langShortAr: "عربي",
    cta: "Schedule a Meeting",
  },
  nav: { home: "Home", services: "We Offer", about: "About Us", contact: "Contact Us" },
  hero: {
    kicker: "Dare to be different?",
    line1: "Meet",
    line2: "[Brand Name]",
    sub: "A 360° social media and AI tools provider",
    body: "Grow your audience and get the AI tools you work with, without the hassle.",
    primary: "Explore Services",
    secondary: "Talk to Us",
  },
  intro: {
    kicker: "Who we are",
    title: "Results, not promises",
    body: "We run social media for brands and supply the AI subscriptions modern teams work with, all from one place and in one invoice.",
    link: "More About Us",
    stats: [
      { value: 0, suffix: "+", label: "Clients served", note: "[Add your figure]" },
      { value: 0, suffix: "+", label: "Subscriptions delivered", note: "[Add your figure]" },
      { value: 0, suffix: "+", label: "Countries", note: "[Add your figure]" },
    ],
  },
  services: {
    kicker: "The magic we do",
    title: "Our Services",
    more: "Want to Know More?",
    groups: [
      {
        name: "Social Media",
        items: [
          { title: "Social Media Management", body: "Content calendars, posting and community management across every platform." },
          { title: "Content Creation", body: "Reels, carousels, graphics and captions made for engagement." },
          { title: "Paid Ads", body: "Targeted campaigns on Meta, TikTok and more, tracked to results." },
        ],
      },
      {
        name: "AI Tool Subscriptions",
        items: [
          { title: "Claude", body: "Claude Pro and Team plans, set up and ready to use." },
          { title: "Cursor", body: "Cursor Pro for developers who code with AI." },
          { title: "Lovable", body: "Lovable plans to build apps and websites with AI." },
          { title: "ChatGPT & More", body: "ChatGPT, Midjourney, Canva and other tools on request." },
        ],
      },
    ],
    marquee: ["Claude", "Cursor", "Lovable", "ChatGPT", "Midjourney", "Canva", "Instagram", "TikTok", "YouTube", "LinkedIn"],
  },
  benefits: {
    kicker: "How we make the magic happen",
    title: "Our Benefits",
    items: [
      { title: "Tested & Proven Strategies", body: "Methods refined across many niches." },
      { title: "One Provider, Every Tool", body: "Social media and AI subscriptions in one place." },
      { title: "Fast Activation", body: "Get your subscriptions running quickly." },
      { title: "Results-Driven Approach", body: "Everything measured against your goals." },
    ],
  },
  visit: {
    kicker: "Let's talk",
    title: "Learn What We Can Do For You",
    body: "Tell us what you need — growth on social, or the right AI tools for your team — and we'll put together a plan.",
    hours: "[Opening hours]",
    button: "Schedule a Meeting",
  },
  contact: {
    kicker: "Get in touch",
    title: "Let's Discuss Your Project",
    phoneLabel: "Phone",
    phone: "[Phone]",
    emailLabel: "Email",
    email: "[Email]",
    addressLabel: "Location",
    address: "[Address]",
    form: {
      name: "Your name",
      email: "Email",
      service: "What do you need?",
      message: "Message",
      submit: "Send Message",
      sending: "Sending…",
      success: "Thanks — we'll be in touch soon.",
      again: "Send another",
      errors: { name: "Please enter your name.", email: "Please enter a valid email.", message: "Please write at least 10 characters." },
      options: ["Social media", "Claude", "Cursor", "Lovable", "Other"],
    },
  },
  footer: {
    tagline: "Social media growth and AI tools, from one provider.",
    rights: "All rights reserved.",
    year: "2026",
  },
};

export type Content = typeof en;
