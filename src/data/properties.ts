export type ListingMode = 'buy' | 'rent' | 'shortlet';

export type PropertyCategory =
  | 'Villa'
  | 'Detached Duplex'
  | 'Penthouse'
  | 'Terraced House'
  | 'Waterfront';

export type GalleryAngle =
  | 'Exterior Dusk'
  | 'Living Atrium'
  | 'Primary Suite'
  | 'Courtyard & Pool'
  | 'Architectural Plan';

export interface PropertyListing {
  id: string;
  title: string;
  subtitle: string;
  neighborhood:
    | 'Mgbuoba / NTA Road'
    | 'New GRA Phase 2'
    | 'Old GRA'
    | 'Peter Odili Road'
    | 'Woji';
  address: string;
  mode: ListingMode;
  category: PropertyCategory;
  priceNgn: number;
  pricePeriod: 'total' | 'year' | 'night';
  covaEstimateNgn: number;
  appreciationYoY: number;
  rentalYieldPct: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  lotSqm: number;
  yearBuilt: number;
  architecturalStyle: string;
  imageUrl: string;
  galleryPhotos: Record<Exclude<GalleryAngle, 'Architectural Plan'>, string>;
  illustrationVariant:
    | 'villa'
    | 'duplex'
    | 'penthouse'
    | 'terrace'
    | 'waterfront'
    | 'estate'
    | 'courtyard'
    | 'pavilion';
  galleryAngles: GalleryAngle[];
  amenities: string[];
  titleDocument: string;
  powerSpec: string;
  securitySpec: string;
  distanceToHqKm: number;
  rating?: number;
  reviewCount?: number;
  cleaningFeeNgn?: number;
  minNights?: number;
  priceHistory: { year: string; valueMillionNgn: number }[];
  floorPlanRooms: { name: string; dimensions: string; level: string }[];
  description: string;
}

export interface NeighborhoodMetric {
  name:
    | 'Mgbuoba / NTA Road'
    | 'New GRA Phase 2'
    | 'Old GRA'
    | 'Peter Odili Road'
    | 'Woji';
  avgPricePerSqmNgn: number;
  yoyGrowthPct: number;
  avgRentalYieldPct: number;
  activeListingsCount: number;
  demandIndex: string;
  summary: string;
}

export const COVA_HQ = {
  name: 'Cova Real Estate & Constructions HQ',
  address:
    '33A Ehio Street (Opp. Bobby Filling Station, off NTA Road), Mgbuoba, Port Harcourt, Rivers State',
  phone: '+234 803 510 0004',
  email: 'advisory@covarealestate.ng',
  hours: 'Mon – Sat · 8:30 AM – 6:00 PM WAT',
};

export const HERO_SLIDES = [
  {
    id: 'slide-01',
    propertyId: 'cova-01',
    kicker: '01 · Flagship Cova Development · Mgbuoba, Port Harcourt',
    headline: 'The Ehio Crest Pavilion',
    subheadline:
      'Board-formed architectural concrete, warm Nigerian iroko louvers, and a zero-edge courtyard pool just 200 meters from Cova HQ on Ehio Street.',
    priceLabel: '₦165,000,000',
    specsLabel: '5 Bed En-Suite · 460 m² Floor Area · Verified Rivers State C of O',
    imageUrl: '/images/villa-01.jpg',
    ctaLabel: 'Inspect Residence Dossier',
  },
  {
    id: 'slide-02',
    propertyId: 'cova-05',
    kicker: '02 · Waterfront Collection · Peter Odili Boulevard',
    headline: 'Odili Creek Waterfront Sanctuary',
    subheadline:
      'Commanding serene views along the Peter Odili waterway with private teak jetty access, infinity lap pool, and 20kVA hybrid solar autonomy.',
    priceLabel: '₦285,000,000',
    specsLabel: '5 Bed Villa · 560 m² Internal · 850 m² Waterfront Plot',
    imageUrl: '/images/waterfront-05.jpg',
    ctaLabel: 'Explore Waterfront Villa',
  },
  {
    id: 'slide-03',
    propertyId: 'cova-02',
    kicker: '03 · Diplomatic Enclave · New GRA Phase 2',
    headline: 'Avenue 14 Travertine Residence',
    subheadline:
      'Set on over 1,000 square meters in the quiet heart of New GRA Phase 2 with unpolished travertine slabs, private cinema, and 18-meter lap pool.',
    priceLabel: '₦340,000,000',
    specsLabel: '6 Bed Compound · 680 m² Internal · 1,050 m² Land',
    imageUrl: '/images/villa-02.jpg',
    ctaLabel: 'View New GRA Compound',
  },
  {
    id: 'slide-04',
    propertyId: 'cova-03',
    kicker: '04 · Executive Short-Let Hospitality · New GRA',
    headline: 'Cova Botanica Sky Penthouse',
    subheadline:
      'Serviced luxury penthouse engineered for visiting energy executives and diplomats. Uninterrupted solar-hybrid power, Starlink fiber, and daily concierge.',
    priceLabel: '₦185,000 / night',
    specsLabel: '3 Bed Penthouse · 245 m² · ★ 4.96 (64 Executive Stays)',
    imageUrl: '/images/penthouse-03.jpg',
    ctaLabel: 'Reserve Executive Stay',
  },
];

export const NEIGHBORHOOD_METRICS: NeighborhoodMetric[] = [
  {
    name: 'Mgbuoba / NTA Road',
    avgPricePerSqmNgn: 420000,
    yoyGrowthPct: 16.4,
    avgRentalYieldPct: 9.2,
    activeListingsCount: 18,
    demandIndex: 'High Growth Corridor',
    summary:
      'Home to Cova HQ along Ehio Street & NTA Road. Rapidly appreciating residential enclave favored by executives and medical professionals.',
  },
  {
    name: 'New GRA Phase 2',
    avgPricePerSqmNgn: 780000,
    yoyGrowthPct: 12.8,
    avgRentalYieldPct: 8.5,
    activeListingsCount: 14,
    demandIndex: 'Prime Diplomatic & Executive',
    summary:
      'Port Harcourt’s premier low-density residential zone with tree-lined avenues, 33kVA dedicated power feeders, and gated architectural compounds.',
  },
  {
    name: 'Peter Odili Road',
    avgPricePerSqmNgn: 650000,
    yoyGrowthPct: 15.1,
    avgRentalYieldPct: 10.4,
    activeListingsCount: 12,
    demandIndex: 'Waterfront & Short-Let Hub',
    summary:
      'Modern boulevard featuring contemporary gated estates, high-occupancy luxury short-let apartments, and creekfront architectural villas.',
  },
  {
    name: 'Old GRA',
    avgPricePerSqmNgn: 840000,
    yoyGrowthPct: 11.2,
    avgRentalYieldPct: 7.8,
    activeListingsCount: 7,
    demandIndex: 'Ultra-Prime Heritage',
    summary:
      'Historic sprawling plots, institutional tranquility, and bespoke private residences close to Government House and golf course greens.',
  },
  {
    name: 'Woji',
    avgPricePerSqmNgn: 490000,
    yoyGrowthPct: 14.9,
    avgRentalYieldPct: 9.6,
    activeListingsCount: 15,
    demandIndex: 'Modern Family Terraces',
    summary:
      'Connected residential district bridging Trans-Amadi and Peter Odili with contemporary terraced townhouses and smart-home duplexes.',
  },
];

export const PROPERTIES: PropertyListing[] = [
  {
    id: 'cova-01',
    title: 'The Ehio Crest Pavilion',
    subtitle: 'Signature Cova Architectural Development · 200m from Cova HQ',
    neighborhood: 'Mgbuoba / NTA Road',
    address: '39 Ehio Street, off NTA Road, Mgbuoba, Port Harcourt',
    mode: 'buy',
    category: 'Detached Duplex',
    priceNgn: 165000000,
    pricePeriod: 'total',
    covaEstimateNgn: 171500000,
    appreciationYoY: 16.8,
    rentalYieldPct: 9.4,
    bedrooms: 5,
    bathrooms: 6,
    sqm: 460,
    lotSqm: 650,
    yearBuilt: 2026,
    architecturalStyle: 'Tropical Brutalist Minimalism',
    imageUrl: '/images/villa-01.jpg',
    galleryPhotos: {
      'Exterior Dusk': '/images/villa-01.jpg',
      'Living Atrium': '/images/interior-living.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
    },
    illustrationVariant: 'villa',
    galleryAngles: [
      'Exterior Dusk',
      'Living Atrium',
      'Primary Suite',
      'Courtyard & Pool',
      'Architectural Plan',
    ],
    amenities: [
      'Private Plunge Pool',
      '15kVA Hybrid Solar Inverter',
      'Double-Height Living Void',
      '2-Room Boys Quarters (BQ)',
      'Biometric Access Control',
      'Fitted Bosch Wet & Dry Kitchen',
    ],
    titleDocument: 'Rivers State Certificate of Occupancy (C of O)',
    powerSpec: 'Band A Public Feeder + 15kVA Lithium Solar Array',
    securitySpec: '24/7 Armed Estate Patrol + Perimeter CCTV & Electric Fence',
    distanceToHqKm: 0.2,
    priceHistory: [
      { year: '2022', valueMillionNgn: 98 },
      { year: '2023', valueMillionNgn: 114 },
      { year: '2024', valueMillionNgn: 132 },
      { year: '2025', valueMillionNgn: 148 },
      { year: '2026', valueMillionNgn: 165 },
    ],
    floorPlanRooms: [
      { name: 'Double-Height Great Room', dimensions: '8.4m × 6.2m', level: 'Ground Level' },
      { name: 'Chef Dry & Wet Kitchen', dimensions: '5.5m × 4.2m', level: 'Ground Level' },
      { name: 'Guest Suite 01', dimensions: '4.4m × 4.0m', level: 'Ground Level' },
      { name: 'Primary Cantilever Suite', dimensions: '7.2m × 5.8m', level: 'First Level' },
      { name: 'Family Lounge & Study', dimensions: '5.0m × 4.6m', level: 'First Level' },
      { name: 'Sky Terrace & Gym', dimensions: '6.8m × 4.5m', level: 'Roof Level' },
    ],
    description:
      'Engineered and constructed directly by Cova Real Estate & Constructions along Ehio Street in Mgbuoba. The Ehio Crest Pavilion pairs board-formed architectural concrete with warm Nigerian iroko timber louvers, natural cross-ventilation, and a zero-edge courtyard pool.',
  },
  {
    id: 'cova-02',
    title: 'Avenue 14 Travertine Residence',
    subtitle: 'Bespoke Gated Compound with Reflection Lap Pool',
    neighborhood: 'New GRA Phase 2',
    address: '14 Tombia Extension Link, New GRA Phase 2, Port Harcourt',
    mode: 'buy',
    category: 'Villa',
    priceNgn: 340000000,
    pricePeriod: 'total',
    covaEstimateNgn: 352000000,
    appreciationYoY: 14.1,
    rentalYieldPct: 8.7,
    bedrooms: 6,
    bathrooms: 7,
    sqm: 680,
    lotSqm: 1050,
    yearBuilt: 2025,
    architecturalStyle: 'Warm Limestone & Cantilevered Glass',
    imageUrl: '/images/villa-02.jpg',
    galleryPhotos: {
      'Exterior Dusk': '/images/villa-02.jpg',
      'Living Atrium': '/images/penthouse-03.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
    },
    illustrationVariant: 'pavilion',
    galleryAngles: [
      'Exterior Dusk',
      'Living Atrium',
      'Primary Suite',
      'Courtyard & Pool',
      'Architectural Plan',
    ],
    amenities: [
      '18m Lap Pool & Sunken Firepit',
      'Private Cinema Room',
      '30kVA Solar + Mikano Soundproof Backup',
      'Smart KNX Home Automation',
      '4-Car Covered Gallery Garage',
      'Dedicated Gatehouse & 2 BQ',
    ],
    titleDocument: 'Rivers State Certificate of Occupancy (C of O) & Deed of Assignment',
    powerSpec: '24hr GRA Dedicated Line + 30kVA Solar Storage',
    securitySpec: 'Diplomatic Zone Patrol + Biometric Gatehouse',
    distanceToHqKm: 4.1,
    priceHistory: [
      { year: '2022', valueMillionNgn: 210 },
      { year: '2023', valueMillionNgn: 242 },
      { year: '2024', valueMillionNgn: 278 },
      { year: '2025', valueMillionNgn: 308 },
      { year: '2026', valueMillionNgn: 340 },
    ],
    floorPlanRooms: [
      { name: 'Formal Reception & Atrium', dimensions: '10.2m × 7.0m', level: 'Ground Level' },
      { name: 'Acoustic Private Cinema', dimensions: '6.0m × 4.8m', level: 'Ground Level' },
      { name: 'Show Kitchen & Wine Vault', dimensions: '6.4m × 5.0m', level: 'Ground Level' },
      { name: 'Primary Wing & Walk-In Closet', dimensions: '9.0m × 6.2m', level: 'First Level' },
      { name: 'Four En-Suite Family Suites', dimensions: '5.2m × 4.5m each', level: 'First Level' },
    ],
    description:
      'Set on over 1,000 square meters in the quiet heart of New GRA Phase 2, Avenue 14 features unpolished travertine slabs, floor-to-ceiling low-E acoustic glazing, and an indoor-outdoor entertaining pavilion overlooking an 18-meter lap pool.',
  },
  {
    id: 'cova-03',
    title: 'Cova Botanica Short-Let Loft',
    subtitle: 'Serviced Architectural Penthouse · Instant Executive Booking',
    neighborhood: 'New GRA Phase 2',
    address: '8 Sani Abacha Link, New GRA, Port Harcourt',
    mode: 'shortlet',
    category: 'Penthouse',
    priceNgn: 185000,
    pricePeriod: 'night',
    covaEstimateNgn: 145000000,
    appreciationYoY: 13.5,
    rentalYieldPct: 11.8,
    bedrooms: 3,
    bathrooms: 3.5,
    sqm: 245,
    lotSqm: 245,
    yearBuilt: 2025,
    architecturalStyle: 'Scandinavian Tropical Loft',
    imageUrl: '/images/penthouse-03.jpg',
    galleryPhotos: {
      'Living Atrium': '/images/penthouse-03.jpg',
      'Exterior Dusk': '/images/villa-01.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
    },
    illustrationVariant: 'penthouse',
    galleryAngles: [
      'Living Atrium',
      'Exterior Dusk',
      'Primary Suite',
      'Courtyard & Pool',
      'Architectural Plan',
    ],
    amenities: [
      'Starlink High-Speed Fiber Enterprise Wi-Fi',
      '24/7 Uninterrupted Power + Solar',
      'Private Wrap-Around Sunset Terrace',
      'Daily Housekeeping & Concierge',
      'Dedicated Chauffeur Pickup Option',
      'Espresso Bar & Full Chef Kitchen',
    ],
    titleDocument: 'Verified Cova Managed Short-Let Portfolio',
    powerSpec: 'Zero-Downtime Dual Inverter + Dual Generator Grid',
    securitySpec: 'Armed Uniformed Concierge + Keycard Elevator Access',
    distanceToHqKm: 3.8,
    rating: 4.96,
    reviewCount: 64,
    cleaningFeeNgn: 35000,
    minNights: 2,
    priceHistory: [
      { year: '2022', valueMillionNgn: 88 },
      { year: '2023', valueMillionNgn: 102 },
      { year: '2024', valueMillionNgn: 118 },
      { year: '2025', valueMillionNgn: 131 },
      { year: '2026', valueMillionNgn: 145 },
    ],
    floorPlanRooms: [
      { name: 'Panoramic Living & Dining', dimensions: '7.8m × 5.4m', level: 'Penthouse Level' },
      { name: 'Wrap-Around Sunset Deck', dimensions: '9.5m × 2.8m', level: 'Penthouse Level' },
      { name: 'Primary King Suite', dimensions: '5.4m × 4.6m', level: 'Penthouse Level' },
      { name: 'Executive Workspace & Suite 2', dimensions: '4.5m × 4.2m', level: 'Penthouse Level' },
    ],
    description:
      'Designed for visiting energy executives, diplomats, and discerning travelers requiring Luxstay and Airbnb Plus standards in Port Harcourt. Enjoy uninterrupted power, Starlink enterprise connectivity, and hotel-grade linen service.',
  },
  {
    id: 'cova-04',
    title: 'NTA Groove Terraces (Unit B4)',
    subtitle: 'Contemporary 4-Bedroom Townhouse in Cova Gated Enclave',
    neighborhood: 'Mgbuoba / NTA Road',
    address: '12 Location Road Link, off NTA Road, Mgbuoba, Port Harcourt',
    mode: 'buy',
    category: 'Terraced House',
    priceNgn: 95000000,
    pricePeriod: 'total',
    covaEstimateNgn: 98500000,
    appreciationYoY: 17.2,
    rentalYieldPct: 9.8,
    bedrooms: 4,
    bathrooms: 4.5,
    sqm: 310,
    lotSqm: 380,
    yearBuilt: 2026,
    architecturalStyle: 'Minimalist Brick & Bronze Facade',
    imageUrl: '/images/terrace-04.jpg',
    galleryPhotos: {
      'Exterior Dusk': '/images/terrace-04.jpg',
      'Living Atrium': '/images/interior-living.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
    },
    illustrationVariant: 'terrace',
    galleryAngles: [
      'Exterior Dusk',
      'Living Atrium',
      'Primary Suite',
      'Courtyard & Pool',
      'Architectural Plan',
    ],
    amenities: [
      'Communal Clubhouse & Gym',
      '10kVA Solar Ready Infrastructure',
      'Private Rear Garden Patio',
      'En-Suite Maid Room',
      'Treated Central Borehole Water',
      '2 Dedicated Parking Bays',
    ],
    titleDocument: 'Registered Deed of Conveyance & C of O in View',
    powerSpec: 'NTA Dedicated Feeder + Central Estate Standby',
    securitySpec: 'Gated Single-Entry Access + Resident App Visitor Codes',
    distanceToHqKm: 0.6,
    priceHistory: [
      { year: '2022', valueMillionNgn: 54 },
      { year: '2023', valueMillionNgn: 63 },
      { year: '2024', valueMillionNgn: 74 },
      { year: '2025', valueMillionNgn: 84 },
      { year: '2026', valueMillionNgn: 95 },
    ],
    floorPlanRooms: [
      { name: 'Open-Plan Living & Dining', dimensions: '7.0m × 5.0m', level: 'Ground Level' },
      { name: 'Minimalist Fitted Kitchen', dimensions: '4.2m × 3.6m', level: 'Ground Level' },
      { name: 'Primary Suite + Balcony', dimensions: '5.6m × 4.5m', level: 'First Level' },
      { name: 'Bedrooms 2, 3 & 4', dimensions: '4.2m × 3.8m each', level: 'First & Second Level' },
    ],
    description:
      'Located less than two minutes from Cova Real Estate & Constructions HQ in Mgbuoba, NTA Groove Terraces delivers low-maintenance modern living with high rental demand and flexible 12-month milestone construction payment plans.',
  },
  {
    id: 'cova-05',
    title: 'Odili Creek Waterfront Sanctuary',
    subtitle: 'Private Jetty Access & Infinity Pool Residence',
    neighborhood: 'Peter Odili Road',
    address: 'Plot 22 Riviera Creek Drive, off Peter Odili Road, Port Harcourt',
    mode: 'buy',
    category: 'Waterfront',
    priceNgn: 285000000,
    pricePeriod: 'total',
    covaEstimateNgn: 294000000,
    appreciationYoY: 15.6,
    rentalYieldPct: 10.1,
    bedrooms: 5,
    bathrooms: 6,
    sqm: 560,
    lotSqm: 850,
    yearBuilt: 2025,
    architecturalStyle: 'Horizontal Concrete & Teak Decking',
    imageUrl: '/images/waterfront-05.jpg',
    galleryPhotos: {
      'Exterior Dusk': '/images/waterfront-05.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
      'Living Atrium': '/images/interior-living.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
    },
    illustrationVariant: 'waterfront',
    galleryAngles: [
      'Exterior Dusk',
      'Courtyard & Pool',
      'Living Atrium',
      'Primary Suite',
      'Architectural Plan',
    ],
    amenities: [
      'Waterfront Wooden Deck & Jetty Access',
      'Infinity Edge Pool Overlooking Creek',
      '20kVA Solar Hybrid System',
      'Outdoor Grill & Sunken Lounge',
      'Double-Glazed Soundproof Facade',
      '2-Room Detached BQ',
    ],
    titleDocument: 'Rivers State Certificate of Occupancy (C of O)',
    powerSpec: '20kVA Solar Array + 40kVA Cummins Backup',
    securitySpec: 'Marine & Land Perimeter Surveillance + Estate Security',
    distanceToHqKm: 10.2,
    priceHistory: [
      { year: '2022', valueMillionNgn: 168 },
      { year: '2023', valueMillionNgn: 195 },
      { year: '2024', valueMillionNgn: 224 },
      { year: '2025', valueMillionNgn: 252 },
      { year: '2026', valueMillionNgn: 285 },
    ],
    floorPlanRooms: [
      { name: 'Waterfront Great Room', dimensions: '9.4m × 6.5m', level: 'Ground Level' },
      { name: 'Teak Pool Deck & Pergola', dimensions: '12.0m × 5.2m', level: 'Ground Level' },
      { name: 'Primary Waterfront Suite', dimensions: '7.5m × 5.6m', level: 'First Level' },
      { name: 'Sky Lounge & Bar', dimensions: '6.5m × 5.0m', level: 'Second Level' },
    ],
    description:
      'Commanding serene views along the Peter Odili waterway, this five-bedroom architectural sanctuary combines marine-grade finishes, expansive teak decking, and effortless indoor-outdoor entertaining.',
  },
  {
    id: 'cova-06',
    title: 'The Courtyard Duplex at Old GRA',
    subtitle: 'Executive Corporate Lease · Fully Serviced Compound',
    neighborhood: 'Old GRA',
    address: '7 Forces Avenue Link, Old GRA, Port Harcourt',
    mode: 'rent',
    category: 'Detached Duplex',
    priceNgn: 18000000,
    pricePeriod: 'year',
    covaEstimateNgn: 260000000,
    appreciationYoY: 11.8,
    rentalYieldPct: 8.2,
    bedrooms: 4,
    bathrooms: 5,
    sqm: 440,
    lotSqm: 720,
    yearBuilt: 2024,
    architecturalStyle: 'Minimalist Courtyard Modernism',
    imageUrl: '/images/courtyard-06.jpg',
    galleryPhotos: {
      'Exterior Dusk': '/images/courtyard-06.jpg',
      'Living Atrium': '/images/interior-living.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
    },
    illustrationVariant: 'courtyard',
    galleryAngles: [
      'Exterior Dusk',
      'Living Atrium',
      'Courtyard & Pool',
      'Primary Suite',
      'Architectural Plan',
    ],
    amenities: [
      'Internal Landscaped Zen Courtyard',
      'Corporate Lease Ready (Multinational Vetted)',
      'Full Backup Power & Water Treatment Plant',
      '2-Room Staff Quarters',
      'Bullet-Resistant Security Doors',
      'Mature Mango & Palm Trees',
    ],
    titleDocument: 'Rivers State C of O · Direct Cova Facility Management',
    powerSpec: 'Old GRA Priority Grid + 30kVA Soundproof Generator',
    securitySpec: 'High Perimeter Wall + Diplomatic Corridor Patrol',
    distanceToHqKm: 8.9,
    priceHistory: [
      { year: '2022', valueMillionNgn: 175 },
      { year: '2023', valueMillionNgn: 196 },
      { year: '2024', valueMillionNgn: 218 },
      { year: '2025', valueMillionNgn: 238 },
      { year: '2026', valueMillionNgn: 260 },
    ],
    floorPlanRooms: [
      { name: 'Courtyard Gallery Living', dimensions: '8.2m × 5.8m', level: 'Ground Level' },
      { name: 'Internal Bamboo Courtyard', dimensions: '4.5m × 4.5m', level: 'Ground Level' },
      { name: 'Primary Executive Suite', dimensions: '6.8m × 5.2m', level: 'First Level' },
    ],
    description:
      'Available for annual corporate or family lease in Old GRA. Designed around an internal open-to-sky tropical courtyard that floods every corridor with diffused daylight while preserving complete privacy.',
  },
  {
    id: 'cova-07',
    title: 'Cova Residence II — Executive Short-Let',
    subtitle: 'Minimalist 2-Bedroom Serviced Suite near NTA Road',
    neighborhood: 'Mgbuoba / NTA Road',
    address: '33A Ehio Street Annex, Mgbuoba, Port Harcourt',
    mode: 'shortlet',
    category: 'Terraced House',
    priceNgn: 115000,
    pricePeriod: 'night',
    covaEstimateNgn: 78000000,
    appreciationYoY: 16.2,
    rentalYieldPct: 12.4,
    bedrooms: 2,
    bathrooms: 2.5,
    sqm: 165,
    lotSqm: 200,
    yearBuilt: 2025,
    architecturalStyle: 'Warm Minimalist Concrete & Oak',
    imageUrl: '/images/shortlet-07.jpg',
    galleryPhotos: {
      'Living Atrium': '/images/shortlet-07.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
      'Exterior Dusk': '/images/terrace-04.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
    },
    illustrationVariant: 'duplex',
    galleryAngles: [
      'Living Atrium',
      'Primary Suite',
      'Exterior Dusk',
      'Courtyard & Pool',
      'Architectural Plan',
    ],
    amenities: [
      '24/7 Hybrid Solar + Grid Power',
      'Fiber Wi-Fi + Dedicated Desk',
      'Self Check-In Smart Lock',
      'Private Gated Parking',
      'Washer/Dryer & Full Kitchen',
      'On-Site Cova Concierge Support',
    ],
    titleDocument: 'Cova Hospitality Managed Asset',
    powerSpec: '10kVA Solar Inverter + Automatic Changeover',
    securitySpec: '24/7 On-Site Security + CCTV',
    distanceToHqKm: 0.05,
    rating: 4.94,
    reviewCount: 49,
    cleaningFeeNgn: 25000,
    minNights: 1,
    priceHistory: [
      { year: '2022', valueMillionNgn: 45 },
      { year: '2023', valueMillionNgn: 53 },
      { year: '2024', valueMillionNgn: 61 },
      { year: '2025', valueMillionNgn: 69 },
      { year: '2026', valueMillionNgn: 78 },
    ],
    floorPlanRooms: [
      { name: 'Minimalist Lounge & Dining', dimensions: '6.2m × 4.4m', level: 'Ground Level' },
      { name: 'Primary Suite', dimensions: '4.8m × 4.2m', level: 'First Level' },
      { name: 'Guest Suite 02', dimensions: '4.2m × 3.8m', level: 'First Level' },
    ],
    description:
      'Situated adjacent to Cova Real Estate & Constructions HQ on Ehio Street, Cova Residence II offers quiet, hotel-grade minimalist hospitality with instant nightly booking and zero hidden agency fees.',
  },
  {
    id: 'cova-08',
    title: 'Woji Alcon Boulevard Smart Duplex',
    subtitle: 'Annual Lease or Outright Purchase · Contemporary 4-Bed',
    neighborhood: 'Woji',
    address: '19 Alcon Road Extension, Woji, Port Harcourt',
    mode: 'rent',
    category: 'Detached Duplex',
    priceNgn: 11500000,
    pricePeriod: 'year',
    covaEstimateNgn: 142000000,
    appreciationYoY: 15.0,
    rentalYieldPct: 9.5,
    bedrooms: 4,
    bathrooms: 5,
    sqm: 380,
    lotSqm: 500,
    yearBuilt: 2025,
    architecturalStyle: 'Contemporary Monolith',
    imageUrl: '/images/duplex-08.jpg',
    galleryPhotos: {
      'Exterior Dusk': '/images/duplex-08.jpg',
      'Living Atrium': '/images/interior-living.jpg',
      'Primary Suite': '/images/interior-suite.jpg',
      'Courtyard & Pool': '/images/pool-courtyard.jpg',
    },
    illustrationVariant: 'estate',
    galleryAngles: [
      'Exterior Dusk',
      'Living Atrium',
      'Primary Suite',
      'Courtyard & Pool',
      'Architectural Plan',
    ],
    amenities: [
      'Smart Lighting & Automated Gate',
      'Fitted Microwave, Oven & Extractor',
      'Stamped Concrete Compound (5 Cars)',
      '1-Room En-Suite BQ',
      'Pre-Installed Solar Conduit',
      'Security House',
    ],
    titleDocument: 'Registered Deed of Conveyance',
    powerSpec: '33kVA Woji Feeder + Inverter Ready',
    securitySpec: 'Gated Close with Uniformed Guards',
    distanceToHqKm: 9.4,
    priceHistory: [
      { year: '2022', valueMillionNgn: 82 },
      { year: '2023', valueMillionNgn: 96 },
      { year: '2024', valueMillionNgn: 111 },
      { year: '2025', valueMillionNgn: 126 },
      { year: '2026', valueMillionNgn: 142 },
    ],
    floorPlanRooms: [
      { name: 'Main Living Room', dimensions: '7.4m × 5.2m', level: 'Ground Level' },
      { name: 'Kitchen & Pantry', dimensions: '4.8m × 4.0m', level: 'Ground Level' },
      { name: 'Primary Suite + Terrace', dimensions: '6.0m × 4.8m', level: 'First Level' },
    ],
    description:
      'Positioned minutes from Trans-Amadi and Peter Odili Road, this newly completed 4-bedroom detached duplex in Woji blends generous parking, flood-free elevated drainage engineering, and refined interior joinery.',
  },
];

export function formatNgn(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_000_000_000) {
      return `₦${(amount / 1_000_000_000).toFixed(2)}B`;
    }
    if (amount >= 1_000_000) {
      const m = amount / 1_000_000;
      return `₦${Number.isInteger(m) ? m.toFixed(0) : m.toFixed(1)}M`;
    }
    if (amount >= 1_000) {
      return `₦${(amount / 1_000).toFixed(0)}k`;
    }
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}
