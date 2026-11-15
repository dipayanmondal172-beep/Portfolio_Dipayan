/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES IN THIS FILE.
 *  Edit text, links, metrics and images here; components read from it.
 *
 *  Evidence rule used throughout:
 *   - CV            = stated on Dipayan_Mondal_CV.pdf
 *   - Screenshot    = visible in an uploaded screenshot
 *   - Press release = public Neutrinos press release (linked)
 *   - Self-reported = stated by Dipayan, no document yet
 *  Fields set to `null` are hidden on the site until you fill them in.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Dipayan Mondal",
  positioning: "Product marketing, analyst relations, content strategy and digital growth.",
  email: "dipayanmondal172@gmail.com",
  linkedin: "https://www.linkedin.com/in/dipayan-mondal",
  // Hidden until you add it, e.g. "https://www.instagram.com/your_handle"
  instagram: null as string | null,
  // Kept off the public site on purpose (scrapers). Add a string to show it.
  phone: null as string | null,
  location: "Bangalore, India",
  resume: "/resume/Dipayan_Mondal_Resume.pdf",
  // Add "/images/portrait.webp" to show a photo in the About section.
  portrait: null as string | null,
};

export const hero = {
  headline: "I make complex things make sense to the people who have to decide on them.",
  intro:
    "I work across product marketing and analyst relations for an AI automation platform for insurers, and outside it I market events and run an anime content brand. Different audiences, same job.",
  proof: [
    {
      audience: "To analysts",
      line: "I own RFI submissions and present in analyst demo sessions for Neutrinos.",
      href: "/work/analyst-relations",
    },
    {
      audience: "To buyers",
      line: "I built the Neutrinos Marketplace: 120+ solution listings, structured so the right one is findable.",
      href: "/work/marketplace",
    },
    {
      audience: "To sales teams",
      line: "I build battlecards and pitch decks that carry positioning into live deals.",
      href: "/work/enablement",
    },
    {
      audience: "To event audiences",
      line: "I ran marketing for two maritime events in two months. Athens drew 370 registrations.",
      href: "/work/bluebridge",
    },
    {
      audience: "To everyone scrolling",
      line: "My anime reels on Zenwrath drew 10+ million views in 30 days.",
      href: "/work/zenwrath",
    },
  ],
};

export const about = {
  heading: "Translation is the job",
  paragraphs: [
    "I studied business twice over: a BBA at the Future Institute of Engineering and Management, then a PGDM at the Jagdish Sheth School of Management. Then I went to work inside an AI platform for insurers, and found that the most useful thing I could do was explain a technical product to someone who has to make a decision about it.",
    "At Neutrinos, that turned into two roles that usually sit with different people. In product marketing I write positioning, solution narratives and demo flows for claims, underwriting and fraud detection. In analyst relations I own the RFI submissions and present in the demo sessions, so the story I write is the one analysts actually hear.",
    "Outside the day job I run marketing, part-time, for BlueBridge Maritime, a company that stages maritime technology forums in Athens and Rotterdam. And I run Zenwrath, an anime Instagram brand where every reel is a small experiment in hooks and formats, judged by an audience that doesn’t pretend to be interested.",
    "An enterprise analyst, a ship operator and an anime fan want very different things. Working out what each one needs to hear, and saying it plainly, is the skill underneath all three.",
  ],
};

export type Role = {
  org: string;
  orgNote: string;
  title: string;
  location: string;
  dates: string | null; // null renders nothing
  summary: string;
  groups: { name: string; items: string[] }[];
  caseStudies: { label: string; href: string }[];
  visuals: string[]; // case-study diagrams shown beside this role
};

export const experience: Role[] = [
  {
    org: "Neutrinos",
    orgNote: "AI automation and orchestration platform for insurers",
    title: "Associate, Platform Content Marketing (Product Marketing & Analyst Relations)",
    location: "Bangalore, India",
    // Change to "2024 – January 2027" after your last day (4 January 2027).
    dates: "2024 – Present",
    summary:
      "Two tracks in one role: shaping how the platform is positioned, and carrying that positioning into analyst evaluations.",
    groups: [
      {
        name: "Product marketing and content",
        items: [
          "Platform positioning, solution narratives and use-case stories for insurance automation.",
          "Analyst-ready and customer-facing messaging, built with product, engineering and pre-sales.",
          "Structured demo walkthroughs for claims processing, underwriting and fraud detection.",
          "ROI narratives and business-impact messaging for evaluations and solution advisories.",
          "Led the Neutrinos Marketplace end to end: 120+ listings, the categorisation behind them, and their SEO.",
          "Sales enablement: battlecards and pre-sales pitch decks, from research to final design.",
        ],
      },
      {
        name: "Analyst relations",
        items: [
          "Owned RFI submissions across Intelligent Document Processing, Agentic AI and process orchestration.",
          "Ran briefings and vendor evaluations with 10+ analyst firms, including Gartner, IDC and Everest Group, with Forrester and Celent.",
          "Presented the platform in analyst demo sessions.",
        ],
      },
      {
        name: "In progress",
        items: [
          "Building an in-house social media automation tool for content scheduling and publishing.",
        ],
      },
    ],
    caseStudies: [
      { label: "Analyst relations case study", href: "/work/analyst-relations" },
      { label: "Marketplace case study", href: "/work/marketplace" },
      { label: "Enablement content case study", href: "/work/enablement" },
    ],
    visuals: ["analyst-relations", "marketplace", "enablement"],
  },
  {
    org: "BlueBridge Maritime",
    orgNote: "Maritime technology events in Athens, Istanbul and Rotterdam",
    title: "Event and digital marketing (part-time)",
    location: "Remote",
    dates: null, // e.g. "2025 – Present"
    summary:
      "End-to-end marketing for a small events company, alongside my full-time role. The organiser runs the events; I run how they’re marketed.",
    groups: [
      {
        name: "What I handle",
        items: [
          "Email: 42 campaigns to a list of about 7,300, plus the platform and domain setup behind them.",
          "Social media promotion and paid ads.",
          "All event design: roll-ups, banners, a 22-screen stage system, speaker invitations and a student brochure.",
          "Website change recommendations.",
          "Vendor and sponsor queries over email.",
        ],
      },
    ],
    caseStudies: [{ label: "BlueBridge case study", href: "/work/bluebridge" }],
    visuals: ["bluebridge"],
  },
  {
    org: "Zenwrath",
    orgNote: "Anime content brand on Instagram",
    title: "Founder and content strategist",
    location: "Independent",
    dates: null,
    summary:
      "A content brand I started and run on my own: concept, production, analysis and brand conversations. It now draws 10M+ views in 30 days.",
    groups: [
      {
        name: "What I do",
        items: [
          "Plan, research and produce reels and carousels.",
          "Test hooks, formats and calls to action, and read the results in Instagram Insights.",
          "Handle inbound brand partnership requests.",
        ],
      },
    ],
    caseStudies: [{ label: "Zenwrath case study", href: "/work/zenwrath" }],
    visuals: ["zenwrath"],
  },
];

export const contributions: {
  figure?: string;                          // a number, counted up on scroll
  glyph?: "research" | "positioning";       // or a small animated mark
  label: string;
  detail: string;
  href: string;                             // case study this contribution opens
}[] = [
  { figure: "120+", label: "Marketplace listings", detail: "Structured, written and published, from concept to launch.", href: "/work/marketplace" },
  { figure: "10+", label: "Global analyst firms", detail: "Including Gartner, IDC, Everest Group, Forrester and Celent. I own RFIs across IDP, Agentic AI and process orchestration, and present in the demo sessions.", href: "/work/analyst-relations" },
  { glyph: "research", label: "Market and competitor research", detail: "Competitor analysis, industry research and market intelligence that feed positioning and sales battlecards.", href: "/work/enablement" },
  { glyph: "positioning", label: "Product positioning", detail: "Solution narratives, ROI messaging and enablement content for enterprise insurance solutions.", href: "/work/analyst-relations" },
];

/** Public analyst placements from evaluation cycles Dipayan worked on. Source: press releases. */
export const analystPlacements = [
  {
    placement: "Leader",
    report: "Everest Group Insurance-specific IDP Products PEAK Matrix® Assessment 2026",
    date: "April 2026",
    context: null as string | null,
    href: "https://www.neutrinos.com/news/neutrinos-leader-everest-group-2026-insurance-idp-peak-matrix/",
  },
  {
    placement: "Technology Standout",
    report: "Celent Life Insurance Claims Administration System Technical Capability Matrix",
    date: "February 2026",
    context: "19 platforms evaluated",
    href: "https://www.neutrinos.com/news/neutrinos-named-a-technology-standout-in-life-insurance-claims-administration-by-celent/",
  },
  {
    placement: "Major Contender",
    report: "Everest Group Low-code Application Development Platforms PEAK Matrix® Assessment 2025",
    date: "October 2025",
    context: "24 providers evaluated",
    href: "https://www.neutrinos.com/news/everest-group-names-neutrinos-a-major-contender/",
  },
];

export const certifications = [
  { name: "Google Analytics Certification", issuer: "Google", image: null as string | null },
  { name: "Fundamentals of Digital Marketing", issuer: "Google", image: null as string | null },
  { name: "Email Marketing Certification", issuer: "HubSpot", image: null as string | null },
  { name: "Google Ads Measurement Certification", issuer: "Google", image: null as string | null },
  { name: "Data Visualization & Business Intelligence (Power BI)", issuer: "EdLightened", image: null as string | null },
];

/** Personal awards. Empty = the block is hidden. Add entries as you get documents. */
export const awards: { title: string; from: string; year: string; note?: string }[] = [];

export const skills: { group: string; items: string[] }[] = [
  { group: "Product marketing", items: ["Product positioning", "Go-to-market support", "Solution messaging", "Product storytelling", "Marketplace strategy", "Business value communication", "Demo storytelling", "Sales enablement", "Battlecards", "Pitch decks"] },
  { group: "Analyst relations", items: ["Analyst briefings", "RFI management", "Vendor evaluations", "Analyst engagements", "Industry analyst research", "Competitive intelligence", "Strategic communications"] },
  { group: "Content and digital", items: ["Content strategy", "Content marketing", "SEO", "Keyword research", "Metadata optimisation", "Creative briefs", "Website content", "Email marketing", "Social media content", "Campaign planning", "Thought leadership", "Copywriting"] },
  { group: "Research and strategy", items: ["Competitor analysis", "Market research", "Industry research", "Market intelligence", "Trend analysis", "Customer journey mapping"] },
  { group: "Events and social", items: ["Event marketing", "Event promotion", "Digital communications", "Audience engagement", "Influencer marketing", "Community building", "Content performance analysis"] },
  { group: "Insurance and technology", items: ["Claims", "Underwriting", "Fraud detection", "Document intelligence", "Process automation", "Agentic AI", "Intelligent document processing", "Process orchestration"] },
  { group: "Tools", items: ["PowerPoint", "Excel", "Canva", "Google Analytics", "Marketing automation", "Strapi", "Brevo", "Hostinger", "Instagram Insights", "Power BI", "Tableau", "Python", "SQL"] },
];

export const education = {
  // Set to false to hide CGPAs.
  showGrades: true,
  entries: [
    { school: "Jagdish Sheth School of Management (JAGSOM)", degree: "PGDM", dates: "2023 – 2025", grade: "CGPA 7.2" },
    { school: "Future Institute of Engineering and Management", degree: "BBA", dates: "2019 – 2022", grade: "CGPA 8.9" },
  ],
};

export const contact = {
  heading: "Have a project, opportunity, or idea in mind?",
  body: "Email is the fastest way to reach me. I’m open to product marketing, analyst relations, content and growth roles, and to freelance marketing work.",
};

/* ─────────────────────────── CASE STUDIES ─────────────────────────── */

export type Block =
  | { kind: "text"; heading: string; body: string[] }
  | { kind: "list"; heading: string; intro?: string; items: { title: string; body: string }[] }
  | { kind: "flow"; heading: string; intro?: string; steps: { title: string; body: string }[] }
  | { kind: "figures"; heading: string; note?: string; items: { figure: string; label: string }[] }
  | { kind: "table"; heading: string; intro?: string; columns: string[]; rows: string[][]; note?: string }
  | { kind: "placements"; heading: string; intro?: string }
  | { kind: "gallery"; heading: string; cols?: 2 | 3; images: { src: string; alt: string; caption: string; width: number; height: number; tall?: boolean; wide?: boolean }[] };

export type CaseStudy = {
  slug: string;
  pillar: string;
  title: string;
  summary: string;
  role: string;
  tools: string[];
  liveUrl?: string | null;
  cover: { src: string; alt: string; width: number; height: number } | null;
  blocks: Block[];
  demonstrates: string;
  samplesOnRequest?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "analyst-relations",
    pillar: "Neutrinos",
    title: "Analyst Relations & Strategic Industry Engagements",
    summary:
      "Owning the RFIs and demo sessions that shape how independent analysts place an insurance AI platform in their markets.",
    role: "Owner, end to end: RFI responses, evidence gathering, analyst messaging and live demo sessions.",
    tools: ["PowerPoint", "Excel"],
    cover: null,
    blocks: [
      {
        kind: "text",
        heading: "Why it matters",
        body: [
          "Enterprise insurers often check what Gartner, Everest Group or Celent think of a vendor before shortlisting it. For a focused platform, an analyst placement does work that no amount of its own marketing can: it is a third party saying the product is credible.",
          "Analysts form that view from what vendors submit and show them. So the quality of an RFI response and a demo session shapes market perception directly.",
        ],
      },
      {
        kind: "flow",
        heading: "How the work moves from product to perception",
        intro: "How an evaluation cycle runs, from the inside.",
        steps: [
          { title: "Gather the evidence", body: "Pull capability detail, customer proof and roadmap from product, engineering and pre-sales." },
          { title: "Write for the analyst", body: "Turn it into RFI answers and messaging framed around business outcomes, with ROI narratives where they hold up." },
          { title: "Show it working", body: "Design and present demo walkthroughs for claims, underwriting and fraud detection." },
          { title: "Brief and follow through", body: "Prepare and support briefings and vendor evaluations, and answer follow-up questions." },
          { title: "The placement", body: "The firm publishes its assessment, and the result becomes part of how the market sees the platform." },
        ],
      },
      {
        kind: "list",
        heading: "What I was responsible for",
        items: [
          { title: "RFI ownership", body: "Submissions across Intelligent Document Processing, Agentic AI and process orchestration, from first draft to final answer." },
          { title: "Analyst engagements", body: "Briefings and vendor evaluations with 10+ analyst firms, including Gartner, IDC, Everest Group, Forrester and Celent." },
          { title: "Demo sessions", body: "Built the walkthroughs and spoke in the sessions, so the narrative and the demo matched." },
          { title: "Use-case submissions", body: "Researched and wrote an AI claims use case for Gartner, structured around challenge, solution, implementation and outcomes, with evidence validated by internal teams." },
          { title: "Cross-team coordination", body: "Worked with product, engineering and pre-sales to agree one story and one set of claims we could back up." },
        ],
      },
      {
        kind: "list",
        heading: "Two decisions",
        items: [
          { title: "Lead with outcomes, not features", body: "Analysts compare dozens of vendors on the same capability checklist. Tying each answer to a business result, such as faster claims or less manual underwriting, is what separates a submission from the rest of the pile." },
          { title: "One story from RFI to demo", body: "Because I wrote the answers and presented the demo, the demo proved exactly what the RFI claimed. Analysts notice when a written response and a live session don’t match." },
        ],
      },
      {
        kind: "text",
        heading: "What I’d do differently",
        body: [
          "Build a shared evidence library from the first cycle: approved customer proof, metrics and screenshots, tagged by capability. Each new RFI would then start from validated answers instead of a fresh hunt through teams.",
        ],
      },
      {
        kind: "placements",
        heading: "Outcomes from cycles I worked on",
        intro:
          "These are Neutrinos’ placements, awarded independently by each firm. I owned the RFI and demo work behind them. I have no affiliation with these firms, and nothing here is an endorsement by them.",
      },
    ],
    demonstrates:
      "I can take a technical platform, find the claims it can actually back up, and hold that story steady under expert questioning.",
  },
  {
    slug: "marketplace",
    pillar: "Neutrinos",
    title: "Building and Structuring the Neutrinos Marketplace",
    summary:
      "Turning a platform’s agents, accelerators and connectors into a catalog insurers can browse, search and understand, and that search engines can find.",
    role: "Led end to end: content framework, categorisation, listing copy, SEO, creative briefs and publication.",
    tools: [],
    liveUrl: "https://marketplace.neutrinos.com",
    cover: { src: "/images/marketplace/catalog-home.webp", alt: "Neutrinos Marketplace home page with category tabs, filters and solution cards", width: 1600, height: 732 },
    blocks: [
      {
        kind: "text",
        heading: "The problem",
        body: [
          "A platform’s capabilities only help sell it if buyers can find them. Neutrinos had a growing set of AI agents, accelerators, components and connectors, and needed one place where an insurer could see what existed, which pieces fit their problem, and why it mattered to the business.",
        ],
      },
      {
        kind: "figures",
        heading: "At a glance",
        items: [
          { figure: "120+", label: "solution listings created and published" },
          { figure: "5", label: "solution types" },
          { figure: "4", label: "filter dimensions" },
        ],
      },
      {
        kind: "flow",
        heading: "How I built it",
        steps: [
          { title: "Content framework", body: "Set one structure for every listing: the problem, the solution, its capabilities and the business value." },
          { title: "Categorisation", body: "Defined five solution types and four filters, so a buyer can narrow by what a solution is and where it applies." },
          { title: "Research", body: "Mapped platform capabilities to business use cases, and researched the keywords, industry terms and intent buyers search with." },
          { title: "Writing and SEO", body: "Wrote 120+ listings with page titles, meta descriptions and keywords for organic discoverability." },
          { title: "Creative", body: "Wrote briefs, headlines and CTAs for banners and visuals, and worked with the design team to keep them on brand." },
          { title: "Validation and publishing", body: "Checked every claim with product and technical owners before it went live." },
        ],
      },
      {
        kind: "list",
        heading: "The structure buyers see",
        items: [
          { title: "By type", body: "Intelligent Agents, Accelerators, Components, Connectors and Extensions." },
          { title: "By fit", body: "Filters for industry, capability, platform module and geography." },
          { title: "By outcome", body: "Every listing leads with what it does for the insurer, not how it’s built." },
        ],
      },
      {
        kind: "table",
        heading: "Writing the listings",
        intro: "Each listing gets one line to earn a click. A few that went live:",
        columns: ["Listing", "One-line description"],
        rows: [
          ["Claim Eligibility Checker", "Validate claims in real time with automated eligibility checks"],
          ["Underwriting Document Intake Agent", "Accelerate underwriting with automated document validation and accuracy"],
          ["Claim Filing Orchestrator", "Automates claim submission, routes exceptions, and ensures SLA compliance"],
          ["Health Risk Scoring Agent", "Generates dynamic, explainable health risk scores for personalized and fair underwriting decisions"],
        ],
      },
      {
        kind: "gallery",
        heading: "The live marketplace",
        images: [
          { src: "/images/marketplace/catalog-home.webp", alt: "Marketplace home with type tabs, filter panel and trending agent cards", caption: "Catalog home: type tabs across the top, fit filters on the left.", width: 1600, height: 732 },
          { src: "/images/marketplace/catalog-listings.webp", alt: "Marketplace listing grid with a promotional banner and claims-related agents", caption: "Listing grid with a campaign banner, and claims agents written outcome-first.", width: 1600, height: 751 },
          { src: "/images/marketplace/platform-page.webp", alt: "Neutrinos website marketplace page headed Quickly Operationalize AI Agents and Intelligent Workflows", caption: "The marketplace sits under Platform on neutrinos.com.", width: 1600, height: 750 },
        ],
      },
      {
        kind: "list",
        heading: "Two decisions",
        items: [
          { title: "Outcome-first copy", body: "Every one-line description says what the solution does for the insurer before how it works. A buyer scanning dozens of cards decides in seconds, and outcomes are what they’re scanning for." },
          { title: "Two ways to narrow", body: "Buyers think in two directions: what kind of thing they need, and where it has to fit. Type tabs and fit filters answer both, so nobody has to scroll 120+ listings." },
        ],
      },
      {
        kind: "text",
        heading: "What I’d do differently",
        body: [
          "Instrument the catalog from launch: searches, filter use and listing views. The categories could then evolve from what buyers actually look for, not just from how the platform is built.",
        ],
      },
    ],
    demonstrates:
      "Information architecture is a marketing decision. I can design a structure that makes a large product portfolio legible to buyers and to search engines, then write and brief creative at the scale it needs.",
  },
  {
    slug: "enablement",
    pillar: "Neutrinos",
    title: "Sales and Analyst Enablement Content",
    summary:
      "The assets sellers and analysts actually use: a battlecard for heads of underwriting, a pre-sales and analyst pitch deck, and an AI use case written for Gartner.",
    role: "Content owner on each asset: research, messaging, structure and design direction, with product leaders and the design team.",
    tools: ["PowerPoint"],
    liveUrl: null,
    cover: { src: "/images/enablement/battlecard-blurred.webp", alt: "Blurred preview of an underwriting sales battlecard layout", width: 1400, height: 871 },
    blocks: [
      {
        kind: "text",
        heading: "Why these matter",
        body: [
          "Positioning only works if it reaches the conversations where deals and evaluations happen. Enablement assets carry it there: a seller has two minutes before a call, and an analyst reads dozens of vendor submissions. Each asset has to work for a reader in a hurry.",
          "These are internal and confidential, so the previews below are deliberately blurred. Full samples are available on request.",
        ],
      },
      {
        kind: "list",
        heading: "The three assets",
        items: [
          { title: "Sales battlecard for heads of underwriting", body: "Built end to end, from requirements with internal leaders to design ideation and final layout. One page covers the buyer’s pain points and objectives, the solution and its features, differentiators and pitch angles, competition, customer proof, resources and pricing model." },
          { title: "Pre-sales and analyst relations pitch deck", body: "A ten-slide narrative from who the company is, through platform architecture and the AI layer, to proof points and why clients choose it. I researched and wrote the content and messaging, structured around capabilities, value propositions, use cases and stakeholder needs." },
          { title: "AI use case for Gartner", body: "A one-page claims automation case written for analyst consideration: the business problem, the solution, technologies used and outcomes. I gathered and validated the evidence with internal stakeholders and fitted it to the analyst’s format." },
        ],
      },
      {
        kind: "flow",
        heading: "How I build an enablement asset",
        steps: [
          { title: "Pin down the reader", body: "Agree with internal leaders who will use it, in which conversation, and what they need to say." },
          { title: "Research", body: "Buyer pain points, the product’s real capabilities, competitors and proof." },
          { title: "Structure first", body: "Lay out the sections before writing, so the reader can find any answer in seconds." },
          { title: "Write and validate", body: "Draft the messaging, then check every claim with the people who can back it up." },
          { title: "Design direction", body: "Shape the visual hierarchy with the design team so the most-used parts are the easiest to see." },
        ],
      },
      {
        kind: "list",
        heading: "Two decisions",
        items: [
          { title: "One page for sellers", body: "A seller has minutes before a call. The battlecard fits on one page, with sections in the order a conversation runs: the buyer’s pain, what we do, why us, and proof." },
          { title: "Validate before design", body: "Every claim was checked with the people who could back it up before anything went to design. A good-looking battlecard with one wrong claim does more damage than a plain one." },
        ],
      },
      {
        kind: "text",
        heading: "What I’d do differently",
        body: [
          "Close the loop with sales a few weeks after launch: which sections get used in calls, which get skipped. Then cut what nobody uses.",
        ],
      },
      {
        kind: "gallery",
        heading: "Previews",
        images: [
          { src: "/images/enablement/battlecard-blurred.webp", alt: "Blurred battlecard showing a multi-panel one-page layout", caption: "Underwriting battlecard. Blurred: internal and confidential.", width: 1400, height: 871 },
          { src: "/images/enablement/deck-platform-blurred.webp", alt: "Blurred pitch deck slide showing a layered platform diagram", caption: "Pitch deck, platform overview. Blurred: internal and confidential.", width: 1400, height: 787 },
          { src: "/images/enablement/deck-architecture-blurred.webp", alt: "Blurred pitch deck slide showing a platform architecture diagram", caption: "Pitch deck, platform architecture. Blurred: internal and confidential.", width: 1400, height: 787 },
        ],
      },
    ],
    demonstrates:
      "I can turn positioning into tools other people use under pressure, and I know what stays confidential.",
    samplesOnRequest: true,
  },
  {
    slug: "bluebridge",
    pillar: "BlueBridge Maritime",
    title: "Marketing Maritime Events in Athens and Istanbul",
    summary:
      "Two industry events in two months: selling stage slots to suppliers, filling rooms and live streams with shipping companies, and building every touchpoint in between.",
    role: "Part-time, end to end. The organiser owns the events, programme and sponsor sales; I own email, social, paid, creative, stage screens and vendor communication.",
    tools: ["Brevo", "Hostinger", "LinkedIn", "Canva", "AI image generation"],
    liveUrl: null,
    cover: { src: "/images/bluebridge/stage-welcome.webp", alt: "Stage screen reading Welcome to the Istanbul Series 2026, BlueBridge Stage at Europort Istanbul", width: 1467, height: 825 },
    blocks: [
      {
        kind: "figures",
        heading: "At a glance",
        note: "Opens are from the five most recent sends in Brevo. Registrations are from the event platform.",
        items: [
          { figure: "370", label: "registrations for the Athens forum" },
          { figure: "42", label: "email campaigns" },
          { figure: "7,300", label: "contacts per send, approximately" },
          { figure: "28", label: "sponsors and partners on the Athens partner wall" },
        ],
      },
      {
        kind: "text",
        heading: "The marketing problem",
        body: [
          "BlueBridge Maritime puts shipping companies in a room with technology providers. In 2026 that meant the Athens Innovation Forum on 17 September and a two-day BlueBridge Stage at Europort Istanbul on 4 and 5 November, with every session streamed live.",
          "Suppliers pay to present; shipping companies attend free. Each needs its own message, and the free audience is what sells the paid one.",
        ],
      },
      {
        kind: "text",
        heading: "Building to Athens",
        body: [
          "Most of the 42 campaigns built up to the Athens forum, alongside LinkedIn promotion and ads. The forum drew 370 registrations, the bulk of the 403 users the event platform now holds across five events.",
          "That result belongs to the whole team: the programme and the sponsors had to be worth registering for. Marketing’s job was to make sure the right people heard about it.",
        ],
      },
      {
        kind: "table",
        heading: "The sequence after Athens",
        intro: "Five sends, from closing one event to opening the next.",
        columns: ["Send", "Date", "Opens", "Unsubscribes"],
        rows: [
          ["Thank the whole list", "21 Sep", "47.95%", "0.27%"],
          ["Sell the last stage slots (€750 / €995)", "23 Sep", "42.45%", "0.23%"],
          ["Resend the slot offer", "29 Sep", "39.81%", "0.14%"],
          ["Launch Istanbul", "26 Oct", "39.41%", "0.14%"],
          ["Final reminder, two days out", "2 Nov", "33.29%", "0.33%"],
        ],
        note: "Click rates are left out on purpose: corporate security scanners click every link automatically, which pushes reported rates past 100%.",
      },
      {
        kind: "list",
        heading: "Two decisions",
        items: [
          { title: "Thank before selling", body: "Straight after Athens the list was at its warmest. A message that asked for nothing earned the highest open rate of the run, so the slot offer two days later reached people who had just engaged, not people bracing for another pitch." },
          { title: "Resend instead of rewriting", body: "The offer hadn’t changed and the slots had a deadline. Busy inboxes mean many people never see a first send. The resend still reached about 40% of the list with the lowest unsubscribe rate of the run, so repeating the ask didn’t wear the list out." },
        ],
      },
      {
        kind: "list",
        heading: "Beyond the inbox",
        items: [
          { title: "Speaker invitations", body: "Every Istanbul speaker got a personalised invitation to send to their own clients, turning each speaker into a channel the list couldn’t reach." },
          { title: "Student access", body: "A clickable brochure offered University of the Aegean students complimentary virtual access to Athens, framed around their three fields of study." },
          { title: "Stage screens that recruit", body: "I designed a 22-screen system for the Istanbul stage: welcome, an ‘up next’ for every speaker, breaks and close. Each screen carried the free online registration link, so idle moments in the hall became sign-up prompts." },
          { title: "Print", body: "Roll-ups and main banners for Athens carrying the 28-partner logo wall, plus a reusable banner template for future editions." },
        ],
      },
      {
        kind: "gallery",
        heading: "Istanbul stage screens",
        cols: 2,
        images: [
          { src: "/images/bluebridge/stage-up-next.webp", alt: "Up next stage screen for an 11:30 session on engine room footprint, with speaker photo and company logo", caption: "‘Up next’ screen, one per speaker.", width: 1467, height: 825 },
          { src: "/images/bluebridge/stage-break.webp", alt: "Lunch break stage screen announcing the programme resumes at 13:30 and naming the first speaker after the break", caption: "Break screen, previewing who’s on next.", width: 1467, height: 825 },
        ],
      },
      {
        kind: "gallery",
        heading: "Print, invitations and brochure",
        cols: 3,
        images: [
          { src: "/images/bluebridge/partner-banner.webp", alt: "Wide BlueBridge Maritime Athens banner thanking 28 sponsors and partners, with their logos", caption: "Athens main banner with the partner wall.", width: 1600, height: 533, wide: true },
          { src: "/images/bluebridge/partner-rollup.webp", alt: "Vertical roll-up banner for BlueBridge Maritime Athens listing sponsors and partners", caption: "Athens roll-up.", width: 818, height: 1923 },
          { src: "/images/bluebridge/speaker-invitation.webp", alt: "Personalised invitation from a speaker’s company to the BlueBridge Istanbul Presentation Series 2026", caption: "Speaker invitation, one per speaker.", width: 1000, height: 1413 },
          { src: "/images/bluebridge/student-brochure.webp", alt: "Brochure offering University of the Aegean students complimentary virtual access to the Athens forum", caption: "Student brochure for the University of the Aegean.", width: 910, height: 1287 },
        ],
      },
      {
        kind: "gallery",
        heading: "The campaign list in Brevo",
        images: [
          { src: "/images/bluebridge/brevo-campaigns.webp", alt: "Brevo campaign list showing five sends with recipients, opens, clicks and unsubscribes", caption: "The five most recent sends. The click column is the scanner-inflated figure noted above.", width: 1600, height: 637 },
        ],
      },
      {
        kind: "text",
        heading: "What I’d do differently",
        body: [
          "Set up conversion tracking from the first send. The data shows people opened and acted, but not which email turned into which registration. Next time, attribution comes first.",
        ],
      },
    ],
    demonstrates:
      "I can run a complete B2B marketing operation on my own: lifecycle email, speaker and partner distribution, print and on-screen design, for a specialist industry audience.",
  },
  {
    slug: "zenwrath",
    pillar: "Zenwrath",
    title: "Building an Anime Content Brand and Digital Community",
    summary:
      "An Instagram brand built on one recognisable frame and a constant run of small experiments, now drawing 10M+ views a month.",
    role: "Founder: concept, research, production, analysis and brand conversations.",
    tools: ["Instagram", "Instagram Insights"],
    cover: { src: "/images/zenwrath/profile-grid.webp", alt: "Zenwrath Instagram grid of reels, each in the same LED-lit frame with a one-line hook", width: 900, height: 1217 },
    blocks: [
      {
        kind: "figures",
        heading: "Where it stands",
        note: "From Instagram’s professional dashboard and Insights. Views for a 30-day window to November 2026; followers from the 8 January – 7 April 2026 report.",
        items: [
          { figure: "10M+", label: "views in 30 days" },
          { figure: "14.6K", label: "followers, April 2026" },
          { figure: "4", label: "inbound paid partnership invitations" },
        ],
      },
      {
        kind: "text",
        heading: "The concept",
        body: [
          "Zenwrath speaks to anime fans who don’t just watch, but argue about rankings, lore and favourite moments. Every reel uses the same frame: a viewer in a room lit by fairy lights or LED glow, the scene playing on a TV, and one line of text on top.",
          "The fixed frame makes the account recognisable in a feed within a second, and it means each new reel tests one idea at a time.",
        ],
      },
      {
        kind: "list",
        heading: "What I test",
        items: [
          { title: "Hooks", body: "The single line on screen: a question, a ranking, a bold claim or a moment fans recognise. It decides whether someone stops scrolling." },
          { title: "Formats", body: "Reels for reach, carousels for depth, and which topics suit which." },
          { title: "Calls to action", body: "Prompts that invite comments and shares, since conversation is what pushes a reel to new viewers." },
        ],
      },
      {
        kind: "text",
        heading: "Reach versus retention",
        body: [
          "Over the 90 days to 7 April 2026 the account gained 3,651 followers and lost 3,046, a net gain of 605. Reels travel far beyond the people who follow, and many who follow after one popular post don’t stay.",
          "That’s the useful lesson: views measure distribution, but retention measures whether the brand means something.",
        ],
      },
      {
        kind: "list",
        heading: "Two decisions",
        items: [
          { title: "Fix the frame, change the idea", body: "Keeping the visual identical post after post made the brand instantly recognisable, and made it clear which idea a result belonged to." },
          { title: "Read Insights, not just views", body: "A view count says a reel travelled. Follows, unfollows and shares say whether it built anything. I plan from the second set." },
        ],
      },
      {
        kind: "text",
        heading: "Brand partnerships",
        body: [
          "The account has drawn unsolicited paid partnership invitations from a self-improvement app, a car accessories brand, a streaming utility and an AI chat platform. One offer paired a flat fee with a performance bonus, which shows how brands value this kind of reach.",
        ],
      },
      {
        kind: "gallery",
        heading: "From the account",
        images: [
          { src: "/images/zenwrath/follower-insights.webp", alt: "Instagram follower insights: 14,595 followers, 3,651 follows and 3,046 unfollows over 90 days", caption: "Follower Insights, 8 January – 7 April 2026.", width: 720, height: 1410, tall: true },
        ],
      },
      {
        kind: "text",
        heading: "What I’d do differently",
        body: [
          "Design for retention from the start: recurring series and formats that give a new viewer a reason to follow, not just a reason to watch once.",
        ],
      },
    ],
    demonstrates:
      "I understand distribution from the inside: how a hook earns attention, what the numbers actually say, and the difference between reach and an audience.",
  },
];

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Recognition", href: "/#recognition" },
  { label: "Contact", href: "/#contact" },
];
