// Central business details and page content.
// Replace the placeholder contact info (phone, links, address) with real values before launch.

export const site = {
  name: "Home of Detail",
  tagline: "Premium Car Detailing & Coating Studio",
  description:
    "Home of Detail is a premium car detailing studio specializing in ceramic coating, paint protection film, paint correction and professional auto detailing.",
  url: "https://homeofdetail.com",
  phone: "0976-155-8566",
  phoneHref: "tel:+639761558566",
  whatsapp: "639761558566",
  messenger: "https://www.facebook.com/HomeOfDetail",
  facebook: "https://www.facebook.com/HomeOfDetail",
  instagram: "https://instagram.com/homeofdetail",
  email: "homeofdetail@gmail.com",
  address: "123 Detail Avenue, Your City, Your Province",
  mapsQuery: "Home of Detail car detailing",
  hours: [
    { days: "Mon – Sat", time: "8:00 AM – 6:00 PM" },
    { days: "Sunday", time: "By appointment" },
  ],
  serviceAreas: ["Your City", "Neighboring Town", "North District", "South District", "Metro Area"],
  stats: [
    { value: "5.0", label: "Average rating" },
    { value: "1,000+", label: "Cars detailed" },
    { value: "9H", label: "Coating hardness" },
    { value: "<5 min", label: "Chat reply time" },
  ],
} as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
}

export type ServiceCategory = "major" | "minor";

export const serviceCategories: Record<ServiceCategory, { slug: ServiceCategory; name: string; intro: string }> = {
  major: {
    slug: "major",
    name: "Major Services",
    intro: "Long-term protection and restoration work: coatings, films, tint and paint repair, done over one or more days in our studio.",
  },
  minor: {
    slug: "minor",
    name: "Minor Services",
    intro: "Fast, focused detailing for interiors, exteriors, headlights and glass. Most are finished the same day.",
  },
};

export type Service = {
  slug: string;
  category: ServiceCategory;
  name: string;
  short: string;
  summary: string;
  startingAt: string;
  duration: string;
  icon: "shield" | "film" | "sparkles" | "droplets" | "hexagon" | "sun" | "spray" | "armchair" | "lightbulb";
  paint: string;
  highlights: string[];
  includes: string[];
  idealFor: string;
};

// Prices and durations are placeholders. Replace them with your real rates.
export const services: Service[] = [
  // ---------- Major services ----------
  {
    slug: "paint-protection-film",
    category: "major",
    name: "Paint Protection Film",
    short: "PPF",
    summary:
      "Invisible, self-healing urethane armor that absorbs rock chips, road debris and light scratches before they ever reach your paint.",
    startingAt: "₱35,000",
    duration: "3 – 5 days",
    icon: "film",
    paint: "#5a0f16",
    highlights: ["Self-healing top coat", "Rock chip protection", "Gloss or matte finish", "Up to 10-year warranty"],
    includes: [
      "Paint inspection & prep",
      "Computer-cut patterns for your exact model",
      "Wrapped edges where possible",
      "Front-end, track pack or full-body options",
      "Optional ceramic top coat over film",
    ],
    idealFor: "Brand-new vehicles and anyone who drives highways and provincial roads often.",
  },
  {
    slug: "graphene-coating",
    category: "major",
    name: "Graphene Coating",
    short: "Graphene",
    summary:
      "Next-generation graphene-infused coating with higher slickness, better heat resistance and less water spotting than traditional ceramic.",
    startingAt: "₱25,000",
    duration: "2 – 3 days",
    icon: "hexagon",
    paint: "#14202e",
    highlights: ["Up to 7 years protection", "Reduced water spotting", "Superior heat dissipation", "Ultra-slick, candy-like gloss"],
    includes: [
      "Multi-stage hand wash & decontamination",
      "Clay bar treatment",
      "Paint correction to remove swirls",
      "Panel wipe & surface prep",
      "Graphene coating on paint, wheels & trim",
      "Infrared curing",
    ],
    idealFor: "Owners who want the longest-lasting, lowest-maintenance coating available.",
  },
  {
    slug: "ceramic-coating",
    category: "major",
    name: "Ceramic Coating",
    short: "Ceramic",
    summary:
      "A hardened, hydrophobic layer that bonds to your clear coat for years of deep gloss, easy washing and defense against water spots, UV and bird droppings.",
    startingAt: "₱18,000",
    duration: "2 – 3 days",
    icon: "shield",
    paint: "#0f3a5f",
    highlights: ["Up to 5 years protection", "Extreme water beading", "UV & oxidation defense", "Mirror-like depth"],
    includes: [
      "Multi-stage hand wash & decontamination",
      "Clay bar treatment",
      "Single or multi-step paint correction",
      "Panel wipe & surface prep",
      "Professional-grade 9H ceramic application",
      "Infrared curing",
      "Wheel faces & glass coating",
    ],
    idealFor: "New and well-kept cars that need long-term gloss with minimal upkeep.",
  },
  {
    slug: "window-tint",
    category: "major",
    name: "Window Tint",
    short: "Tint",
    summary:
      "Premium nano-ceramic window film that blocks heat and UV, cuts glare and adds privacy without interfering with phone or GPS signals.",
    startingAt: "₱8,000",
    duration: "1 day",
    icon: "sun",
    paint: "#1c1c1f",
    highlights: ["Up to 99% UV rejection", "Major heat reduction", "Glare & privacy control", "No signal interference"],
    includes: [
      "Glass deep-clean & prep",
      "Precision-cut film for every window",
      "Choice of shade levels",
      "Bubble-free heat-shrink installation",
      "Warranty against fading & peeling",
    ],
    idealFor: "Anyone who wants a cooler, more private cabin and protection for their interior.",
  },
  {
    slug: "repaint-and-repair",
    category: "major",
    name: "Repaint and Repair",
    short: "Repaint",
    summary:
      "Professional dent, scratch and panel repair with factory-matched paint, so damage disappears and the finish blends seamlessly.",
    startingAt: "₱6,000 / panel",
    duration: "2 – 5 days",
    icon: "spray",
    paint: "#7a1f12",
    highlights: ["Computer color matching", "Dent & scratch repair", "Spot or full-panel repaint", "Seamless blending"],
    includes: [
      "Damage assessment & quote",
      "Dent pulling & body filler work",
      "Primer, base coat & clear coat",
      "Paint-booth curing",
      "Wet sanding & polishing to match",
    ],
    idealFor: "Cars with scratches, scuffs, dents or faded panels that need more than polishing.",
  },

  // ---------- Minor services ----------
  {
    slug: "interior-detail",
    category: "minor",
    name: "Interior Detail",
    short: "Interior",
    summary: "A deep clean of every surface inside your car, from carpets and seats to vents and headliner, leaving it fresh and sanitized.",
    startingAt: "₱3,500",
    duration: "4 – 6 hours",
    icon: "armchair",
    paint: "#3b3f45",
    highlights: ["Seat & carpet shampoo", "Leather clean & condition", "Steam sanitizing", "Odor removal"],
    includes: [
      "Full vacuum incl. trunk",
      "Hot-water extraction of seats & carpets",
      "Leather cleaning & conditioning",
      "Dashboard, vents & trim detailing",
      "Steam sanitizing of high-touch areas",
      "Interior glass cleaning",
    ],
    idealFor: "Family cars, ride-share vehicles and anyone whose cabin needs a full reset.",
  },
  {
    slug: "exterior-detail",
    category: "minor",
    name: "Exterior Detail",
    short: "Exterior",
    summary: "A thorough, scratch-free exterior clean and decontamination with a protective sealant for instant gloss and shine.",
    startingAt: "₱3,000",
    duration: "3 – 4 hours",
    icon: "sparkles",
    paint: "#1f2a36",
    highlights: ["Scratch-free hand wash", "Iron & tar removal", "Clay bar decontamination", "Sealant for gloss & beading"],
    includes: [
      "Snow foam pre-wash",
      "Two-bucket contact wash",
      "Iron fallout & tar removal",
      "Clay bar treatment",
      "Spray sealant application",
      "Wheels, tires & trim dressing",
    ],
    idealFor: "Regular upkeep, pre-sale prep, or reviving paint that has lost its shine.",
  },
  {
    slug: "headlight-detail",
    category: "minor",
    name: "Headlight Detail",
    short: "Headlight",
    summary: "Restores yellowed, cloudy headlights to crystal clarity and seals them with UV protection, for better looks and safer night driving.",
    startingAt: "₱1,500",
    duration: "1 – 2 hours",
    icon: "lightbulb",
    paint: "#9aa3ad",
    highlights: ["Removes yellowing & haze", "Brighter night visibility", "UV-protective sealant", "Like-new appearance"],
    includes: [
      "Masking of surrounding paint",
      "Multi-stage wet sanding",
      "Machine polishing to full clarity",
      "UV-resistant coating",
    ],
    idealFor: "Older vehicles with faded or oxidized headlight lenses.",
  },
  {
    slug: "glass-detail",
    category: "minor",
    name: "Glass Detail",
    short: "Glass",
    summary: "Removes water spots, film and wiper haze from all glass, then applies a water-repellent coating for clear visibility in heavy rain.",
    startingAt: "₱1,800",
    duration: "1 – 2 hours",
    icon: "droplets",
    paint: "#0c2a52",
    highlights: ["Water spot removal", "Rain-repellent coating", "Reduced wiper chatter", "Streak-free clarity"],
    includes: [
      "Glass decontamination",
      "Water spot & mineral removal",
      "Glass polishing",
      "Hydrophobic glass coating",
      "Interior glass cleaning",
    ],
    idealFor: "Drivers who want better visibility during rainy season and night driving.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesIn(category: ServiceCategory) {
  return services.filter((s) => s.category === category);
}

export const reasons = [
  {
    icon: "award",
    title: "Certified technicians",
    body: "Trained installers following manufacturer-approved methods on every panel.",
  },
  {
    icon: "lightbulb",
    title: "Studio-grade equipment",
    body: "Inspection lighting, climate-controlled bays and professional-grade products only.",
  },
  {
    icon: "coffee",
    title: "Comfortable lounge",
    body: "Air-conditioned waiting area with Wi-Fi and complimentary coffee while you wait.",
  },
  {
    icon: "eye",
    title: "Full transparency",
    body: "Clear quotes after inspection and progress photos sent straight to your phone.",
  },
] as const;

export const processSteps = [
  { title: "Chat & consult", body: "Message us on Messenger or WhatsApp. Tell us about your car and goals." },
  { title: "Paint inspection", body: "We measure and inspect your paint, then recommend the right package." },
  { title: "Precision service", body: "Our specialists correct, protect and finish every surface by hand." },
  { title: "Final handover", body: "Walk-around under studio lights, aftercare guide and warranty card." },
];

export const testimonials = [
  {
    name: "Mark D.",
    location: "Toyota Fortuner owner",
    rating: 5,
    text: "The gloss after the ceramic coating is unreal. Rain just slides off and washing takes half the time now. Worth every peso.",
  },
  {
    name: "Sarah V.",
    location: "Honda Civic owner",
    rating: 5,
    text: "Super responsive team — they sent photos throughout the process. The swirl marks I had for years are completely gone.",
  },
  {
    name: "Paolo R.",
    location: "Ford Everest owner",
    rating: 5,
    text: "Got full-front PPF on my new Everest. After months of highway driving there isn't a single chip. Great workmanship on the edges.",
  },
  {
    name: "Jen T.",
    location: "Mitsubishi Montero owner",
    rating: 5,
    text: "The interior detail made my 6-year-old SUV smell and feel brand new. The lounge was a nice touch while I waited.",
  },
  {
    name: "Carlo M.",
    location: "BMW 3 Series owner",
    rating: 5,
    text: "Very particular about who touches my car. These guys know paint. Honest recommendations, no upselling.",
  },
  {
    name: "Angela S.",
    location: "Nissan Navara owner",
    rating: 5,
    text: "Booked through WhatsApp, got a slot the same week, and the truck came out looking better than when I bought it.",
  },
];

export const faqs = [
  {
    q: "What's the best protection for a brand-new car?",
    a: "For maximum protection we recommend PPF on high-impact areas (hood, bumper, fenders, mirrors) combined with ceramic coating on the rest of the car. You get chip resistance where it matters and easy-clean gloss everywhere else.",
  },
  {
    q: "How much does premium detailing cost?",
    a: "Pricing depends on your vehicle's size and paint condition. We publish starting prices on each service page and give you a clear, final quote after a quick in-person or photo inspection — no hidden fees.",
  },
  {
    q: "Do I need an appointment?",
    a: "Yes. Coating and PPF jobs take multiple days and need dedicated bay time, so we work on a booking basis. Message us to secure a slot — premium washes can sometimes be accommodated same-day.",
  },
  {
    q: "How long does ceramic coating last?",
    a: "Depending on the package, our coatings last from 2 to 5 years with proper maintenance. We'll give you an aftercare guide and recommend periodic maintenance washes to keep it performing.",
  },
  {
    q: "Can I wash my car after getting it coated?",
    a: "Wait 7 days after application to let the coating fully cure. After that, use pH-neutral shampoo and avoid automatic brush washes. Our Exterior Detail uses only coating-safe products.",
  },
  {
    q: "Is PPF visible on the car?",
    a: "Modern gloss PPF is virtually invisible. We use precision-cut patterns and wrap edges where possible so the film blends seamlessly with the paint.",
  },
  {
    q: "Do you offer warranties?",
    a: "Yes. Ceramic coatings and PPF come with manufacturer-backed warranties. Your warranty card and coverage details are provided at handover.",
  },
];

export type GalleryItem = {
  vehicle: string;
  service: Service["slug"];
  paint: string;
  note: string;
};

export const gallery: GalleryItem[] = [
  { vehicle: "Toyota Fortuner", service: "paint-protection-film", paint: "#e9ebee", note: "Full-front PPF: hood, bumper, fenders & mirrors" },
  { vehicle: "BMW 3 Series", service: "paint-protection-film", paint: "#0c2a52", note: "Full-body gloss film with ceramic top coat" },
  { vehicle: "Lexus RX", service: "graphene-coating", paint: "#14202e", note: "Paint correction + 7-year graphene coating" },
  { vehicle: "2025 Ford Everest", service: "ceramic-coating", paint: "#1f2a36", note: "Two-step correction + 5-year coating" },
  { vehicle: "Honda Civic", service: "ceramic-coating", paint: "#8a0f1a", note: "Deep red restored to full depth" },
  { vehicle: "Toyota Innova", service: "window-tint", paint: "#3b3f45", note: "Nano-ceramic tint, all windows" },
  { vehicle: "Ford Ranger", service: "repaint-and-repair", paint: "#7a1f12", note: "Rear quarter dent repair & color-matched repaint" },
  { vehicle: "Mitsubishi Montero", service: "interior-detail", paint: "#3b3f45", note: "Full cabin shampoo & leather conditioning" },
  { vehicle: "Nissan Navara", service: "exterior-detail", paint: "#5b6470", note: "Decontamination, clay & sealant" },
  { vehicle: "Toyota Vios", service: "headlight-detail", paint: "#9aa3ad", note: "Yellowed lenses restored & UV sealed" },
  { vehicle: "Hyundai Tucson", service: "glass-detail", paint: "#0c2a52", note: "Water spots removed + rain-repellent coating" },
];

// Videos: set `youtubeId` (the part after "v=" in a YouTube link) to embed a video.
// Entries without an id show a "coming soon" placeholder.
export type VideoItem = {
  title: string;
  service: Service["slug"];
  youtubeId?: string;
  paint: string;
};

export const videos: VideoItem[] = [
  { title: "PPF self-healing demo", service: "paint-protection-film", paint: "#5a0f16" },
  { title: "Installing full-front PPF on a Fortuner", service: "paint-protection-film", paint: "#e9ebee" },
  { title: "Graphene vs. ceramic: water-spot test", service: "graphene-coating", paint: "#14202e" },
  { title: "Ceramic coating water-beading test", service: "ceramic-coating", paint: "#0f3a5f" },
  { title: "Full ceramic coating process, start to finish", service: "ceramic-coating", paint: "#1f2a36" },
  { title: "Nano-ceramic window tint heat test", service: "window-tint", paint: "#1c1c1f" },
  { title: "Dent repair & color-matched repaint", service: "repaint-and-repair", paint: "#7a1f12" },
  { title: "Interior deep clean transformation", service: "interior-detail", paint: "#3b3f45" },
  { title: "Headlight restoration: before & after", service: "headlight-detail", paint: "#9aa3ad" },
];
