export type ImageAsset = {
  src: string;
  alt: string;
  credit: string;
  kind: "conceptual-placeholder" | "business-asset";
};

export type Project = {
  slug: string;
  title: string;
  category: CollectionSlug;
  label: string;
  summary: string;
  image: ImageAsset;
  detailImages: ImageAsset[];
};

export type CollectionSlug = "living" | "bedroom" | "dining" | "kitchen" | "accent";

export type Collection = {
  slug: CollectionSlug;
  title: string;
  intro: string;
  image: ImageAsset;
};

export type Service = {
  slug: string;
  title: string;
  intro: string;
  details: string[];
  image: ImageAsset;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: ImageAsset;
  body: string[];
};

const unsplash = (id: string, params = "auto=format&fit=crop&w=1800&q=82") =>
  `https://images.unsplash.com/${id}?${params}`;

export const business = {
  name: "INDIS Interiors",
  location: "Hyderabad, Telangana, India",
  serviceRegion: "Andhra Pradesh and Telangana",
  experience: "Over 15 years",
  phone: "+91 98495 96989",
  phoneHref: "tel:+919849596989",
  whatsappHref: "https://wa.me/919849596989",
  email: "nikhil.indisinteriors@gmail.com",
  emailHref: "mailto:nikhil.indisinteriors@gmail.com",
  office: ["NBR Towers, 3rd Floor", "Road No-36, Jubilee Hills", "Hyderabad - 500033"],
  factory: ["Survey No 192/G/1/A, H.No 4-28/4", "Jukal (V), Shamshabad (M)", "Rangareddy District, Hyderabad"],
  differentiators: [
    "Quality materials",
    "On-time delivery with quality checks",
    "Lifetime support after handover",
    "Complete home interiors handled by the studio's own in-house team"
  ],
  process: [
    {
      title: "Initial Consultation",
      text: "Understand the client's vision, preferences, needs, style, and project budget."
    },
    {
      title: "Planning and Design",
      text: "Site inspections, layouts, colour schemes, design concepts, and material selections."
    },
    {
      title: "Execution and Handover",
      text: "Approved designs are executed with quality checks, final walkthrough, and handover."
    }
  ]
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/design-ideas", label: "Design Ideas" },
  { href: "/collections", label: "Collections" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Recent Projects" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Blogs" },
  { href: "/contact", label: "Contact" }
];

export const heroImage: ImageAsset = {
  src: unsplash("photo-1600607687920-4e2a09cf159d"),
  alt: "Warm contemporary living room with layered lighting and sculptural furniture",
  credit: "Conceptual placeholder photography — replace with genuine INDIS project imagery",
  kind: "conceptual-placeholder"
};

export const collections: Collection[] = [
  {
    slug: "living",
    title: "Living",
    intro: "Inviting everyday rooms with thoughtful proportions, storage, lighting, and material warmth.",
    image: {
      src: unsplash("photo-1600210492486-724fe5c67fb0"),
      alt: "Editorial living room with warm neutral materials",
      credit: "Conceptual placeholder",
      kind: "conceptual-placeholder"
    }
  },
  {
    slug: "bedroom",
    title: "Bedroom",
    intro: "Restful rooms shaped around comfort, wardrobes, texture, and quiet detail.",
    image: {
      src: unsplash("photo-1618221195710-dd6b41faaea6"),
      alt: "Calm bedroom with upholstered bed and soft natural light",
      credit: "Conceptual placeholder",
      kind: "conceptual-placeholder"
    }
  },
  {
    slug: "dining",
    title: "Dining",
    intro: "Dining spaces with proportion, lighting, and finishes that support daily life and hosting.",
    image: {
      src: unsplash("photo-1617806118233-18e1de247200"),
      alt: "Sophisticated dining space with pendant lighting",
      credit: "Conceptual placeholder",
      kind: "conceptual-placeholder"
    }
  },
  {
    slug: "kitchen",
    title: "Kitchen",
    intro: "Efficient modular kitchens planned around workflow, storage, durability, and finish quality.",
    image: {
      src: unsplash("photo-1556912173-3bb406ef7e77"),
      alt: "Modern kitchen with warm cabinetry and stone counter",
      credit: "Conceptual placeholder",
      kind: "conceptual-placeholder"
    }
  },
  {
    slug: "accent",
    title: "Accent",
    intro: "Details, feature walls, furniture pieces, lighting, and finishes that give each home its character.",
    image: {
      src: unsplash("photo-1600566753190-17f0baa2a6c3"),
      alt: "Interior detail with art, console, and decorative lighting",
      credit: "Conceptual placeholder",
      kind: "conceptual-placeholder"
    }
  }
];

export const projects: Project[] = [
  {
    slug: "living-gallery-placeholder",
    title: "Living Room Study",
    category: "living",
    label: "Awaiting INDIS project photography",
    summary: "A portfolio framework for a warm living room case study, ready for genuine INDIS photographs, room notes, and material details.",
    image: collections[0].image,
    detailImages: [collections[0].image, collections[4].image]
  },
  {
    slug: "bedroom-gallery-placeholder",
    title: "Bedroom Retreat Study",
    category: "bedroom",
    label: "Awaiting INDIS project photography",
    summary: "A quieter bedroom story template for wardrobe planning, lighting atmosphere, finish choices, and real room imagery.",
    image: collections[1].image,
    detailImages: [collections[1].image, collections[4].image]
  },
  {
    slug: "kitchen-gallery-placeholder",
    title: "Modular Kitchen Study",
    category: "kitchen",
    label: "Awaiting INDIS project photography",
    summary: "A refined kitchen case-study shell for workflow, storage planning, surfaces, lighting, and confirmed execution details.",
    image: collections[3].image,
    detailImages: [collections[3].image, collections[2].image]
  },
  {
    slug: "dining-gallery-placeholder",
    title: "Dining Room Study",
    category: "dining",
    label: "Awaiting INDIS project photography",
    summary: "An editorial dining space story prepared for actual project metadata without inventing location or client claims.",
    image: collections[2].image,
    detailImages: [collections[2].image, collections[0].image]
  }
];

export const services: Service[] = [
  {
    slug: "modular-kitchens",
    title: "Modular Kitchens",
    intro: "Kitchen planning, storage, finishes, lighting, and execution for homes across Hyderabad and the wider service region.",
    details: ["Workflow-led layouts", "Storage planning", "Finish and material coordination", "Execution with quality checks"],
    image: collections[3].image
  },
  {
    slug: "wardrobes-storage",
    title: "Wardrobes & Storage",
    intro: "Custom storage solutions for bedrooms and living spaces, designed around daily use and available space.",
    details: ["Wardrobe layouts", "Internal storage planning", "Space-saving solutions", "Finish coordination"],
    image: collections[1].image
  },
  {
    slug: "full-home-interiors",
    title: "Full Home Interiors",
    intro: "Complete home interiors handled by the INDIS team from consultation through execution and handover.",
    details: ["Home-wide design direction", "Room-by-room planning", "Material selections", "Final walkthrough and handover"],
    image: heroImage
  },
  {
    slug: "false-ceiling-lighting",
    title: "False Ceiling & Lighting",
    intro: "Ceiling and lighting concepts that support ambience, function, and architectural clarity.",
    details: ["Ceiling design", "Lighting zones", "Accent lighting", "Execution coordination"],
    image: collections[4].image
  },
  {
    slug: "custom-design-solutions",
    title: "Custom Design Solutions",
    intro: "Personalized design solutions for unique room needs, finishes, furniture, and spatial constraints.",
    details: ["Custom concepts", "Material direction", "Built-in furniture planning", "Detail-focused execution"],
    image: collections[0].image
  }
];

export const materialSamples = [
  { name: "Wood", text: "Warmth, grain, and cabinetry character.", image: collections[0].image },
  { name: "Stone", text: "Durable surfaces and quiet luxury.", image: collections[3].image },
  { name: "Lighting", text: "Layered ambience for everyday life.", image: collections[4].image },
  { name: "Fabric", text: "Softness, comfort, and acoustic warmth.", image: collections[1].image }
];

export const articles: Article[] = [
  {
    slug: "planning-a-functional-modular-kitchen",
    title: "Planning a functional modular kitchen",
    excerpt: "A practical starting point for workflow, storage, lighting, and finish decisions in contemporary Indian homes.",
    category: "Kitchen Planning",
    readTime: "4 min read",
    image: collections[3].image,
    body: [
      "A good kitchen starts with everyday movement. The distance between preparation, cooking, washing, and storage should feel natural rather than forced.",
      "Storage planning matters as much as finish selection. Tall units, corner solutions, drawers, and appliance zones should be discussed during design, not after execution begins.",
      "Lighting needs layers: general light for work, task light for counters, and warmer accent light where the kitchen connects with dining or living areas."
    ]
  },
  {
    slug: "how-lighting-shapes-interior-mood",
    title: "How lighting shapes interior mood",
    excerpt: "Why ceiling details, wall washing, and accent lights can change the way a room feels throughout the day.",
    category: "Lighting",
    readTime: "3 min read",
    image: collections[4].image,
    body: [
      "Lighting should support the room's use first. Bright task areas and calmer evening zones can coexist when the plan is considered early.",
      "False ceiling details can hide services, define zones, and create soft reflected light. They work best when proportion and ceiling height are respected.",
      "Accent lighting should reveal meaningful details rather than decorate every surface equally."
    ]
  },
  {
    slug: "making-small-spaces-feel-considered",
    title: "Making small spaces feel considered",
    excerpt: "A compact home can still feel generous when storage, scale, light, and material transitions are handled carefully.",
    category: "Design Ideas",
    readTime: "4 min read",
    image: collections[0].image,
    body: [
      "Small spaces benefit from fewer, better decisions. Built-in storage, measured furniture, and clear circulation make rooms feel calmer.",
      "Mirrors, lighter finishes, and uninterrupted surfaces can help, but the key is proportion. Oversized pieces and visual clutter reduce comfort quickly.",
      "A focused palette with one or two tactile accents often feels more premium than many competing materials."
    ]
  }
];

export const pages = [
  "/",
  "/projects",
  "/collections",
  "/services",
  "/design-ideas",
  "/about",
  "/journal",
  "/contact"
];
