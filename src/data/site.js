// Central place for business details — edit these and the whole site updates.
export const SITE = {
  name: "Dev16 Studio",
  email: "jbrown16.dev@gmail.com",
  whatsapp: "233552384351",
  whatsappMessage: "Hi Dev16 Studio, I'd like to talk about a website.",
  location: "Based in Ghana · Working with clients worldwide",
};

export const whatsappLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  SITE.whatsappMessage
)}`;

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Clients" },
];
