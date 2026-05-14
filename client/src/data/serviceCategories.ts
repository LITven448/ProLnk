export interface ServiceCategory {
  id: string;
  name: string;
  tier: 1 | 2 | 3 | 4 | 5;
  icon: string;
  avgJobsPerMonth: number;
  avgJobValue: number;
  description: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // TIER 1 — Critical / Daily
  { id: "hvac", name: "HVAC", tier: 1, icon: "❄️", avgJobsPerMonth: 18, avgJobValue: 425, description: "Heating, ventilation & air conditioning install, repair, and maintenance" },
  { id: "plumbing", name: "Plumbing", tier: 1, icon: "🔧", avgJobsPerMonth: 20, avgJobValue: 310, description: "Pipes, fixtures, water heaters, drains, and emergency plumbing" },
  { id: "electrical", name: "Electrical", tier: 1, icon: "⚡", avgJobsPerMonth: 16, avgJobValue: 380, description: "Wiring, panels, outlets, lighting, and electrical code compliance" },
  { id: "roofing", name: "Roofing", tier: 1, icon: "🏠", avgJobsPerMonth: 10, avgJobValue: 1200, description: "Roof repair, replacement, inspection, and storm damage restoration" },
  { id: "house-cleaning", name: "House Cleaning", tier: 1, icon: "🧹", avgJobsPerMonth: 28, avgJobValue: 180, description: "Recurring and one-time residential cleaning services" },
  { id: "landscaping", name: "Landscaping", tier: 1, icon: "🌿", avgJobsPerMonth: 22, avgJobValue: 250, description: "Lawn care, mowing, design, and seasonal maintenance" },
  { id: "pest-control", name: "Pest Control", tier: 1, icon: "🦟", avgJobsPerMonth: 14, avgJobValue: 220, description: "Extermination, prevention, and pest management programs" },
  { id: "handyman", name: "Handyman", tier: 1, icon: "🛠️", avgJobsPerMonth: 24, avgJobValue: 195, description: "General repairs, installations, and small home maintenance tasks" },
  { id: "painting", name: "Painting", tier: 1, icon: "🎨", avgJobsPerMonth: 8, avgJobValue: 950, description: "Interior and exterior painting, staining, and surface prep" },
  { id: "appliance-repair", name: "Appliance Repair", tier: 1, icon: "🔌", avgJobsPerMonth: 18, avgJobValue: 215, description: "Washer, dryer, dishwasher, refrigerator, and oven repair" },

  // TIER 2 — High Demand
  { id: "flooring", name: "Flooring", tier: 2, icon: "🪵", avgJobsPerMonth: 6, avgJobValue: 1800, description: "Hardwood, LVP, tile, laminate installation and refinishing" },
  { id: "carpet-cleaning", name: "Carpet Cleaning", tier: 2, icon: "🧽", avgJobsPerMonth: 20, avgJobValue: 180, description: "Steam cleaning, stain removal, and carpet restoration" },
  { id: "carpet-installation", name: "Carpet Installation", tier: 2, icon: "🏡", avgJobsPerMonth: 5, avgJobValue: 1400, description: "New carpet fitting, stretching, and replacement" },
  { id: "pool-service", name: "Pool Service", tier: 2, icon: "🏊", avgJobsPerMonth: 16, avgJobValue: 280, description: "Pool cleaning, chemical balancing, and equipment maintenance" },
  { id: "tree-service", name: "Tree Service", tier: 2, icon: "🌳", avgJobsPerMonth: 10, avgJobValue: 650, description: "Tree trimming, removal, stump grinding, and emergency services" },
  { id: "concrete", name: "Concrete", tier: 2, icon: "🏗️", avgJobsPerMonth: 6, avgJobValue: 2100, description: "Driveways, sidewalks, patios, flatwork, and concrete repair" },
  { id: "fencing", name: "Fencing", tier: 2, icon: "🚧", avgJobsPerMonth: 5, avgJobValue: 2800, description: "Wood, vinyl, chain-link, and ornamental fence install and repair" },
  { id: "garage-door", name: "Garage Door", tier: 2, icon: "🚪", avgJobsPerMonth: 14, avgJobValue: 320, description: "Garage door repair, opener install, and new door replacement" },
  { id: "window-cleaning", name: "Window Cleaning", tier: 2, icon: "🪟", avgJobsPerMonth: 12, avgJobValue: 250, description: "Residential and commercial window washing and track cleaning" },
  { id: "pressure-washing", name: "Pressure Washing", tier: 2, icon: "💦", avgJobsPerMonth: 14, avgJobValue: 280, description: "Driveways, siding, decks, and exterior surface cleaning" },
  { id: "gutter-service", name: "Gutter Service", tier: 2, icon: "🌧️", avgJobsPerMonth: 12, avgJobValue: 220, description: "Gutter cleaning, repair, and new gutter installation" },
  { id: "moving", name: "Moving", tier: 2, icon: "📦", avgJobsPerMonth: 8, avgJobValue: 850, description: "Local and long-distance residential moving and packing" },
  { id: "junk-removal", name: "Junk Removal", tier: 2, icon: "🗑️", avgJobsPerMonth: 16, avgJobValue: 290, description: "Furniture hauling, cleanouts, and debris disposal" },
  { id: "locksmith", name: "Locksmith", tier: 2, icon: "🔑", avgJobsPerMonth: 18, avgJobValue: 175, description: "Lockouts, rekeying, lock installation, and security upgrades" },
  { id: "drywall", name: "Drywall", tier: 2, icon: "🧱", avgJobsPerMonth: 8, avgJobValue: 680, description: "Drywall hanging, finishing, patching, and texture matching" },
  { id: "tile", name: "Tile", tier: 2, icon: "🔲", avgJobsPerMonth: 6, avgJobValue: 1500, description: "Tile installation, grouting, and repair for floors and walls" },

  // TIER 3 — Steady
  { id: "kitchen-remodel", name: "Kitchen Remodel", tier: 3, icon: "🍳", avgJobsPerMonth: 3, avgJobValue: 8500, description: "Full kitchen renovation, layout, and fixture replacement" },
  { id: "bathroom-remodel", name: "Bathroom Remodel", tier: 3, icon: "🚿", avgJobsPerMonth: 4, avgJobValue: 6000, description: "Bathroom renovation, fixture upgrades, and layout changes" },
  { id: "cabinet-install", name: "Cabinet Installation", tier: 3, icon: "🗄️", avgJobsPerMonth: 5, avgJobValue: 3200, description: "Kitchen and bath cabinet installation, refacing, and refinishing" },
  { id: "deck-patio", name: "Deck & Patio", tier: 3, icon: "🪑", avgJobsPerMonth: 4, avgJobValue: 4500, description: "Wood and composite deck building, repair, and patio installation" },
  { id: "foundation-repair", name: "Foundation Repair", tier: 3, icon: "⚒️", avgJobsPerMonth: 3, avgJobValue: 5500, description: "Foundation crack repair, leveling, waterproofing, and stabilization" },
  { id: "insulation", name: "Insulation", tier: 3, icon: "🌡️", avgJobsPerMonth: 6, avgJobValue: 2200, description: "Blown-in, spray foam, batt insulation install and removal" },
  { id: "chimney", name: "Chimney Service", tier: 3, icon: "🧱", avgJobsPerMonth: 8, avgJobValue: 380, description: "Chimney sweep, inspection, lining, and masonry repair" },
  { id: "masonry", name: "Masonry", tier: 3, icon: "🪨", avgJobsPerMonth: 5, avgJobValue: 2800, description: "Brick, block, stone work for walls, steps, and exteriors" },
  { id: "siding", name: "Siding", tier: 3, icon: "🏘️", avgJobsPerMonth: 3, avgJobValue: 7500, description: "Vinyl, fiber cement, wood siding install, repair, and painting" },
  { id: "window-replacement", name: "Window Replacement", tier: 3, icon: "🔲", avgJobsPerMonth: 4, avgJobValue: 3800, description: "Energy-efficient window and door replacement and installation" },
  { id: "door-install", name: "Door Installation", tier: 3, icon: "🚪", avgJobsPerMonth: 7, avgJobValue: 750, description: "Interior and exterior door installation, framing, and hardware" },
  { id: "irrigation", name: "Irrigation", tier: 3, icon: "💧", avgJobsPerMonth: 8, avgJobValue: 1200, description: "Sprinkler system install, repair, winterization, and smart upgrades" },
  { id: "drainage", name: "Drainage", tier: 3, icon: "🌊", avgJobsPerMonth: 6, avgJobValue: 1800, description: "French drains, yard grading, and stormwater management" },
  { id: "air-duct-cleaning", name: "Air Duct Cleaning", tier: 3, icon: "💨", avgJobsPerMonth: 10, avgJobValue: 350, description: "HVAC duct and dryer vent cleaning and sanitization" },
  { id: "septic", name: "Septic Service", tier: 3, icon: "⚙️", avgJobsPerMonth: 8, avgJobValue: 420, description: "Septic pumping, inspection, repair, and new system install" },
  { id: "security-systems", name: "Security Systems", tier: 3, icon: "🔒", avgJobsPerMonth: 8, avgJobValue: 850, description: "Alarm systems, cameras, and access control installation" },
  { id: "smart-home", name: "Smart Home", tier: 3, icon: "📡", avgJobsPerMonth: 10, avgJobValue: 650, description: "Smart lighting, thermostats, voice control, and automation setup" },
  { id: "generator", name: "Generator", tier: 3, icon: "⚡", avgJobsPerMonth: 5, avgJobValue: 3200, description: "Standby and portable generator install, service, and repair" },
  { id: "solar", name: "Solar", tier: 3, icon: "☀️", avgJobsPerMonth: 3, avgJobValue: 18000, description: "Solar panel install, battery storage, and grid connection" },
  { id: "ev-charger", name: "EV Charger", tier: 3, icon: "🔋", avgJobsPerMonth: 8, avgJobValue: 1100, description: "Level 2 and DC fast charger installation and electrical work" },
  { id: "countertops", name: "Countertops", tier: 3, icon: "🪨", avgJobsPerMonth: 5, avgJobValue: 2800, description: "Granite, quartz, marble, and laminate countertop fabrication and install" },
  { id: "water-heater", name: "Water Heater", tier: 3, icon: "🔥", avgJobsPerMonth: 10, avgJobValue: 1100, description: "Tankless and traditional water heater install and repair" },
  { id: "water-softener", name: "Water Treatment", tier: 3, icon: "💧", avgJobsPerMonth: 6, avgJobValue: 1800, description: "Water softeners, filtration systems, and RO install and service" },
  { id: "wallpaper", name: "Wallpaper", tier: 3, icon: "🖼️", avgJobsPerMonth: 6, avgJobValue: 750, description: "Wallpaper hanging, removal, and specialty wall treatments" },
  { id: "stairs-railing", name: "Stairs & Railing", tier: 3, icon: "🪜", avgJobsPerMonth: 5, avgJobValue: 2200, description: "Stair installation, railing fabrication, and handrail repair" },
  { id: "fireplace", name: "Fireplace", tier: 3, icon: "🔥", avgJobsPerMonth: 5, avgJobValue: 1500, description: "Fireplace install, gas line, insert replacement, and surround work" },
  { id: "gutter-guards", name: "Gutter Guards", tier: 3, icon: "🍂", avgJobsPerMonth: 8, avgJobValue: 1200, description: "Gutter guard and leaf filter installation" },

  // TIER 4 — Specialty
  { id: "pool-construction", name: "Pool Construction", tier: 4, icon: "🏊", avgJobsPerMonth: 2, avgJobValue: 45000, description: "New in-ground pool design, excavation, and build" },
  { id: "home-theater", name: "Home Theater", tier: 4, icon: "🎬", avgJobsPerMonth: 4, avgJobValue: 3500, description: "Projector, screen, surround sound, and media room setup" },
  { id: "shower-refinishing", name: "Shower Refinishing", tier: 4, icon: "🚿", avgJobsPerMonth: 8, avgJobValue: 650, description: "Bathtub and shower resurfacing, reglazing, and refinishing" },
  { id: "sauna-hot-tub", name: "Sauna & Hot Tub", tier: 4, icon: "♨️", avgJobsPerMonth: 4, avgJobValue: 2800, description: "Hot tub, swim spa, and sauna install, repair, and service" },
  { id: "attic-conversion", name: "Attic Conversion", tier: 4, icon: "🏗️", avgJobsPerMonth: 2, avgJobValue: 22000, description: "Attic-to-living space conversion and storage build-out" },
  { id: "basement-finishing", name: "Basement Finishing", tier: 4, icon: "🏠", avgJobsPerMonth: 2, avgJobValue: 28000, description: "Unfinished basement conversion to living space" },
  { id: "mold-remediation", name: "Mold Remediation", tier: 4, icon: "🦠", avgJobsPerMonth: 6, avgJobValue: 2500, description: "Mold testing, removal, containment, and prevention treatment" },
  { id: "fire-water-restoration", name: "Fire & Water Restoration", tier: 4, icon: "🔥", avgJobsPerMonth: 4, avgJobValue: 8500, description: "Damage restoration after fire, smoke, flood, and water events" },
  { id: "asbestos-removal", name: "Asbestos Removal", tier: 4, icon: "⚠️", avgJobsPerMonth: 3, avgJobValue: 3800, description: "Licensed asbestos abatement, testing, and safe disposal" },
  { id: "roof-coating", name: "Roof Coating", tier: 4, icon: "🏠", avgJobsPerMonth: 5, avgJobValue: 2800, description: "Flat and low-slope roof coating, sealing, and waterproofing" },
  { id: "skylight", name: "Skylight", tier: 4, icon: "🌤️", avgJobsPerMonth: 4, avgJobValue: 2200, description: "Skylight installation, flashing, and repair" },
  { id: "sunroom", name: "Sunroom & Enclosures", tier: 4, icon: "🌞", avgJobsPerMonth: 2, avgJobValue: 18000, description: "Sunroom, screen porch, and four-season room additions" },
  { id: "radiant-floor", name: "Radiant Floor Heating", tier: 4, icon: "🌡️", avgJobsPerMonth: 3, avgJobValue: 5500, description: "Electric and hydronic in-floor heating system install" },
  { id: "window-tinting", name: "Window Tinting", tier: 4, icon: "🕶️", avgJobsPerMonth: 8, avgJobValue: 480, description: "Residential and commercial window film and solar tint" },
  { id: "epoxy-flooring", name: "Epoxy Flooring", tier: 4, icon: "🏭", avgJobsPerMonth: 6, avgJobValue: 2200, description: "Garage, basement, and commercial epoxy floor coating" },
  { id: "stucco-repair", name: "Stucco & Plaster", tier: 4, icon: "🏚️", avgJobsPerMonth: 5, avgJobValue: 1800, description: "Stucco repair, application, and EIFS exterior system work" },
  { id: "mosquito-control", name: "Mosquito Control", tier: 4, icon: "🦟", avgJobsPerMonth: 10, avgJobValue: 320, description: "Seasonal mosquito and tick barrier spray programs" },
  { id: "wildlife-removal", name: "Wildlife Removal", tier: 4, icon: "🦝", avgJobsPerMonth: 8, avgJobValue: 480, description: "Humane animal trapping, exclusion, and attic remediation" },
  { id: "home-inspection", name: "Home Inspection", tier: 4, icon: "🔍", avgJobsPerMonth: 12, avgJobValue: 380, description: "Pre-purchase, pre-listing, and new construction home inspections" },
  { id: "radon-testing", name: "Radon Testing", tier: 4, icon: "☢️", avgJobsPerMonth: 8, avgJobValue: 280, description: "Radon testing, mitigation system install, and post-mitigation testing" },
  { id: "lead-paint", name: "Lead Paint Testing", tier: 4, icon: "⚠️", avgJobsPerMonth: 4, avgJobValue: 550, description: "Lead paint inspection, XRF testing, and risk assessment reports" },
  { id: "holiday-lighting", name: "Holiday Lighting", tier: 4, icon: "🎄", avgJobsPerMonth: 6, avgJobValue: 850, description: "Professional holiday light install, takedown, and storage" },
  { id: "home-organizing", name: "Home Organizing", tier: 4, icon: "📦", avgJobsPerMonth: 8, avgJobValue: 420, description: "Whole-home decluttering, closet design, and organization systems" },

  // TIER 5 — Niche
  { id: "mobile-car-mechanic", name: "Mobile Car Mechanic", tier: 5, icon: "🚗", avgJobsPerMonth: 14, avgJobValue: 280, description: "On-site oil changes, brakes, diagnostics, and minor repairs" },
  { id: "mobile-auto-detailing", name: "Mobile Auto Detailing", tier: 5, icon: "✨", avgJobsPerMonth: 16, avgJobValue: 220, description: "Mobile car detailing, ceramic coating, and paint correction" },
  { id: "mobile-dog-grooming", name: "Mobile Dog Grooming", tier: 5, icon: "🐕", avgJobsPerMonth: 18, avgJobValue: 95, description: "At-home dog grooming, bathing, and nail trimming" },
  { id: "dog-walking", name: "Dog Walking & Pet Sitting", tier: 5, icon: "🦮", avgJobsPerMonth: 40, avgJobValue: 45, description: "Dog walking, pet sitting, boarding, and drop-in visits" },
  { id: "tv-mounting", name: "TV Mounting", tier: 5, icon: "📺", avgJobsPerMonth: 14, avgJobValue: 180, description: "TV wall mounting, cord concealment, and cable management" },
  { id: "furniture-assembly", name: "Furniture Assembly", tier: 5, icon: "🪑", avgJobsPerMonth: 16, avgJobValue: 120, description: "IKEA and flat-pack furniture assembly and installation" },
  { id: "appliance-install", name: "Appliance Installation", tier: 5, icon: "🍽️", avgJobsPerMonth: 12, avgJobValue: 175, description: "Dishwasher, range, refrigerator, and washer/dryer hookup" },
  { id: "moving-packing", name: "Moving & Packing", tier: 5, icon: "📫", avgJobsPerMonth: 8, avgJobValue: 480, description: "Professional packing, unpacking, and moving labor services" },
  { id: "personal-chef", name: "Personal Chef", tier: 5, icon: "👨‍🍳", avgJobsPerMonth: 10, avgJobValue: 350, description: "In-home meal prep, cooking, and private dining experiences" },
  { id: "home-photography", name: "Home Photography", tier: 5, icon: "📷", avgJobsPerMonth: 12, avgJobValue: 280, description: "Real estate photography, drone, virtual tours, and staging shots" },
  { id: "interior-design", name: "Interior Design", tier: 5, icon: "🛋️", avgJobsPerMonth: 4, avgJobValue: 2200, description: "Full-service interior design, space planning, and sourcing" },
  { id: "estate-sale", name: "Estate Sale", tier: 5, icon: "🏛️", avgJobsPerMonth: 3, avgJobValue: 1800, description: "Estate sale management, pricing, marketing, and cleanout" },
  { id: "home-staging", name: "Home Staging", tier: 5, icon: "🏡", avgJobsPerMonth: 4, avgJobValue: 1500, description: "Real estate staging, furniture rental, and photo-ready setup" },
  { id: "biohazard-cleanup", name: "Biohazard Cleanup", tier: 5, icon: "🧪", avgJobsPerMonth: 2, avgJobValue: 4500, description: "Crime scene, trauma, hoarding, and hazardous material cleanup" },
  { id: "notary", name: "Mobile Notary", tier: 5, icon: "📝", avgJobsPerMonth: 20, avgJobValue: 85, description: "Mobile notary, loan signings, and document authentication" },
];

export const TIER_LABELS: Record<number, string> = {
  1: "Critical / Daily",
  2: "High Demand",
  3: "Steady",
  4: "Specialty",
  5: "Niche",
};

export function getCategoriesByTier(tier: 1 | 2 | 3 | 4 | 5): ServiceCategory[] {
  return SERVICE_CATEGORIES.filter((c) => c.tier === tier);
}

export function getCategoryById(id: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.id === id);
}
