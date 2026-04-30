/**
 * DFW Metropolitan Area — Complete Zip Code Database
 * Covers: Dallas, Fort Worth, Denton, Southlake, Westlake, Frisco,
 * McKinney, Allen, Plano, Arlington, Irving, Garland, Mesquite,
 * Carrollton, Richardson, Grand Prairie, Lewisville, Flower Mound,
 * Grapevine, Colleyville, Keller, Hurst, Euless, Bedford, Mansfield,
 * Cedar Hill, DeSoto, Duncanville, Lancaster, Rowlett, Rockwall,
 * Wylie, Sachse, Murphy, Forney, Coppell, Addison, Farmers Branch,
 * Haltom City, North Richland Hills, Watauga, Saginaw, Azle,
 * Burleson, Crowley, Kennedale, Everman, Forest Hill, White Settlement
 */

export interface DFWZipCode {
  zip: string;
  city: string;
  county: string;
  submarket: string; // "Dallas Core" | "Fort Worth Core" | "North Suburbs" | "South Suburbs" | "East Suburbs" | "West Suburbs" | "Denton County"
  lat: number;
  lng: number;
  medianHomeValue: number; // approximate
  tier: "premium" | "standard" | "emerging"; // for partner matching priority
}

export const DFW_ZIP_CODES: DFWZipCode[] = [
  // ── DALLAS CORE ──────────────────────────────────────────────
  { zip: "75201", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7817, lng: -96.7970, medianHomeValue: 650000, tier: "premium" },
  { zip: "75202", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7762, lng: -96.8029, medianHomeValue: 420000, tier: "standard" },
  { zip: "75203", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7445, lng: -96.8139, medianHomeValue: 280000, tier: "standard" },
  { zip: "75204", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7960, lng: -96.7862, medianHomeValue: 520000, tier: "premium" },
  { zip: "75205", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8362, lng: -96.7901, medianHomeValue: 1200000, tier: "premium" },
  { zip: "75206", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8272, lng: -96.7734, medianHomeValue: 680000, tier: "premium" },
  { zip: "75207", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7874, lng: -96.8195, medianHomeValue: 380000, tier: "standard" },
  { zip: "75208", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7530, lng: -96.8380, medianHomeValue: 420000, tier: "standard" },
  { zip: "75209", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8378, lng: -96.8298, medianHomeValue: 780000, tier: "premium" },
  { zip: "75210", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7650, lng: -96.7580, medianHomeValue: 180000, tier: "emerging" },
  { zip: "75211", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7412, lng: -96.8714, medianHomeValue: 220000, tier: "emerging" },
  { zip: "75212", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7770, lng: -96.8530, medianHomeValue: 280000, tier: "standard" },
  { zip: "75214", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8220, lng: -96.7450, medianHomeValue: 720000, tier: "premium" },
  { zip: "75215", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7520, lng: -96.7620, medianHomeValue: 160000, tier: "emerging" },
  { zip: "75216", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7180, lng: -96.7980, medianHomeValue: 150000, tier: "emerging" },
  { zip: "75217", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7250, lng: -96.7060, medianHomeValue: 170000, tier: "emerging" },
  { zip: "75218", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8370, lng: -96.7050, medianHomeValue: 580000, tier: "premium" },
  { zip: "75219", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8080, lng: -96.8110, medianHomeValue: 560000, tier: "premium" },
  { zip: "75220", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8680, lng: -96.8580, medianHomeValue: 680000, tier: "premium" },
  { zip: "75223", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7960, lng: -96.7500, medianHomeValue: 380000, tier: "standard" },
  { zip: "75224", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7280, lng: -96.8280, medianHomeValue: 200000, tier: "emerging" },
  { zip: "75225", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8680, lng: -96.7780, medianHomeValue: 1400000, tier: "premium" },
  { zip: "75226", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7830, lng: -96.7750, medianHomeValue: 350000, tier: "standard" },
  { zip: "75227", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7680, lng: -96.6900, medianHomeValue: 180000, tier: "emerging" },
  { zip: "75228", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8050, lng: -96.6880, medianHomeValue: 280000, tier: "standard" },
  { zip: "75229", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8880, lng: -96.8680, medianHomeValue: 580000, tier: "premium" },
  { zip: "75230", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9050, lng: -96.7880, medianHomeValue: 780000, tier: "premium" },
  { zip: "75231", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8780, lng: -96.7480, medianHomeValue: 380000, tier: "standard" },
  { zip: "75232", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.6950, lng: -96.8180, medianHomeValue: 190000, tier: "emerging" },
  { zip: "75233", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7050, lng: -96.8480, medianHomeValue: 180000, tier: "emerging" },
  { zip: "75234", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9280, lng: -96.8980, medianHomeValue: 380000, tier: "standard" },
  { zip: "75235", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8180, lng: -96.8380, medianHomeValue: 420000, tier: "standard" },
  { zip: "75236", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.6880, lng: -96.8880, medianHomeValue: 200000, tier: "emerging" },
  { zip: "75237", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.6780, lng: -96.8380, medianHomeValue: 180000, tier: "emerging" },
  { zip: "75238", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8680, lng: -96.7180, medianHomeValue: 420000, tier: "standard" },
  { zip: "75240", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9380, lng: -96.7880, medianHomeValue: 480000, tier: "standard" },
  { zip: "75241", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.6680, lng: -96.7680, medianHomeValue: 150000, tier: "emerging" },
  { zip: "75243", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9080, lng: -96.7380, medianHomeValue: 350000, tier: "standard" },
  { zip: "75244", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9280, lng: -96.8380, medianHomeValue: 480000, tier: "standard" },
  { zip: "75246", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.7880, lng: -96.7780, medianHomeValue: 320000, tier: "standard" },
  { zip: "75247", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.8080, lng: -96.8680, medianHomeValue: 280000, tier: "standard" },
  { zip: "75248", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9680, lng: -96.7980, medianHomeValue: 680000, tier: "premium" },
  { zip: "75249", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.6580, lng: -96.9180, medianHomeValue: 220000, tier: "emerging" },
  { zip: "75251", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9280, lng: -96.7580, medianHomeValue: 420000, tier: "standard" },
  { zip: "75252", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.9980, lng: -96.7980, medianHomeValue: 580000, tier: "premium" },
  { zip: "75253", city: "Dallas", county: "Dallas", submarket: "Dallas Core", lat: 32.6980, lng: -96.6680, medianHomeValue: 180000, tier: "emerging" },
  // ── PLANO ────────────────────────────────────────────────────
  { zip: "75023", city: "Plano", county: "Collin", submarket: "North Suburbs", lat: 33.0480, lng: -96.7380, medianHomeValue: 520000, tier: "premium" },
  { zip: "75024", city: "Plano", county: "Collin", submarket: "North Suburbs", lat: 33.0780, lng: -96.7880, medianHomeValue: 680000, tier: "premium" },
  { zip: "75025", city: "Plano", county: "Collin", submarket: "North Suburbs", lat: 33.0880, lng: -96.7280, medianHomeValue: 580000, tier: "premium" },
  { zip: "75074", city: "Plano", county: "Collin", submarket: "North Suburbs", lat: 33.0280, lng: -96.6980, medianHomeValue: 420000, tier: "standard" },
  { zip: "75075", city: "Plano", county: "Collin", submarket: "North Suburbs", lat: 33.0080, lng: -96.7380, medianHomeValue: 480000, tier: "standard" },
  // ── FRISCO ───────────────────────────────────────────────────
  { zip: "75033", city: "Frisco", county: "Collin", submarket: "North Suburbs", lat: 33.1480, lng: -96.8280, medianHomeValue: 720000, tier: "premium" },
  { zip: "75034", city: "Frisco", county: "Collin", submarket: "North Suburbs", lat: 33.1280, lng: -96.7880, medianHomeValue: 680000, tier: "premium" },
  { zip: "75035", city: "Frisco", county: "Collin", submarket: "North Suburbs", lat: 33.1680, lng: -96.7480, medianHomeValue: 580000, tier: "premium" },
  // ── McKINNEY ─────────────────────────────────────────────────
  { zip: "75069", city: "McKinney", county: "Collin", submarket: "North Suburbs", lat: 33.1980, lng: -96.6380, medianHomeValue: 480000, tier: "standard" },
  { zip: "75070", city: "McKinney", county: "Collin", submarket: "North Suburbs", lat: 33.2180, lng: -96.7180, medianHomeValue: 520000, tier: "premium" },
  { zip: "75071", city: "McKinney", county: "Collin", submarket: "North Suburbs", lat: 33.2380, lng: -96.6580, medianHomeValue: 450000, tier: "standard" },
  // ── ALLEN ────────────────────────────────────────────────────
  { zip: "75002", city: "Allen", county: "Collin", submarket: "North Suburbs", lat: 33.1080, lng: -96.6780, medianHomeValue: 520000, value: "premium" } as any,
  { zip: "75013", city: "Allen", county: "Collin", submarket: "North Suburbs", lat: 33.1280, lng: -96.6480, medianHomeValue: 580000, tier: "premium" },
  // ── RICHARDSON ───────────────────────────────────────────────
  { zip: "75080", city: "Richardson", county: "Dallas", submarket: "North Suburbs", lat: 32.9580, lng: -96.7280, medianHomeValue: 420000, tier: "standard" },
  { zip: "75081", city: "Richardson", county: "Dallas", submarket: "North Suburbs", lat: 32.9480, lng: -96.6980, medianHomeValue: 380000, tier: "standard" },
  { zip: "75082", city: "Richardson", county: "Dallas", submarket: "North Suburbs", lat: 32.9880, lng: -96.6680, medianHomeValue: 450000, tier: "standard" },
  // ── GARLAND ──────────────────────────────────────────────────
  { zip: "75040", city: "Garland", county: "Dallas", submarket: "East Suburbs", lat: 32.9180, lng: -96.6480, medianHomeValue: 280000, tier: "standard" },
  { zip: "75041", city: "Garland", county: "Dallas", submarket: "East Suburbs", lat: 32.8880, lng: -96.6280, medianHomeValue: 240000, tier: "standard" },
  { zip: "75042", city: "Garland", county: "Dallas", submarket: "East Suburbs", lat: 32.9080, lng: -96.6780, medianHomeValue: 260000, tier: "standard" },
  { zip: "75043", city: "Garland", county: "Dallas", submarket: "East Suburbs", lat: 32.8680, lng: -96.5980, medianHomeValue: 220000, tier: "emerging" },
  { zip: "75044", city: "Garland", county: "Dallas", submarket: "East Suburbs", lat: 32.9480, lng: -96.6280, medianHomeValue: 300000, tier: "standard" },
  // ── MESQUITE ─────────────────────────────────────────────────
  { zip: "75149", city: "Mesquite", county: "Dallas", submarket: "East Suburbs", lat: 32.7680, lng: -96.5980, medianHomeValue: 220000, tier: "emerging" },
  { zip: "75150", city: "Mesquite", county: "Dallas", submarket: "East Suburbs", lat: 32.8080, lng: -96.5780, medianHomeValue: 230000, tier: "emerging" },
  // ── ROWLETT / SACHSE / WYLIE ─────────────────────────────────
  { zip: "75088", city: "Rowlett", county: "Dallas", submarket: "East Suburbs", lat: 32.9080, lng: -96.5380, medianHomeValue: 320000, tier: "standard" },
  { zip: "75089", city: "Rowlett", county: "Dallas", submarket: "East Suburbs", lat: 32.9280, lng: -96.5080, medianHomeValue: 340000, tier: "standard" },
  { zip: "75048", city: "Sachse", county: "Dallas", submarket: "East Suburbs", lat: 32.9780, lng: -96.5780, medianHomeValue: 360000, tier: "standard" },
  { zip: "75098", city: "Wylie", county: "Collin", submarket: "East Suburbs", lat: 33.0180, lng: -96.5380, medianHomeValue: 380000, tier: "standard" },
  // ── ROCKWALL ─────────────────────────────────────────────────
  { zip: "75032", city: "Rockwall", county: "Rockwall", submarket: "East Suburbs", lat: 32.9280, lng: -96.4580, medianHomeValue: 420000, tier: "standard" },
  { zip: "75087", city: "Rockwall", county: "Rockwall", submarket: "East Suburbs", lat: 32.9080, lng: -96.4780, medianHomeValue: 390000, tier: "standard" },
  // ── IRVING ───────────────────────────────────────────────────
  { zip: "75038", city: "Irving", county: "Dallas", submarket: "West Suburbs", lat: 32.8780, lng: -96.9880, medianHomeValue: 380000, tier: "standard" },
  { zip: "75039", city: "Irving", county: "Dallas", submarket: "West Suburbs", lat: 32.8980, lng: -96.9580, medianHomeValue: 420000, tier: "standard" },
  { zip: "75061", city: "Irving", county: "Dallas", submarket: "West Suburbs", lat: 32.8380, lng: -96.9480, medianHomeValue: 280000, tier: "standard" },
  { zip: "75062", city: "Irving", county: "Dallas", submarket: "West Suburbs", lat: 32.8580, lng: -96.9680, medianHomeValue: 320000, tier: "standard" },
  { zip: "75063", city: "Irving", county: "Dallas", submarket: "West Suburbs", lat: 32.9180, lng: -96.9880, medianHomeValue: 480000, tier: "standard" },
  // ── COPPELL / CARROLLTON / FARMERS BRANCH ────────────────────
  { zip: "75019", city: "Coppell", county: "Dallas", submarket: "West Suburbs", lat: 32.9680, lng: -97.0180, medianHomeValue: 580000, tier: "premium" },
  { zip: "75006", city: "Carrollton", county: "Dallas", submarket: "West Suburbs", lat: 32.9780, lng: -96.8980, medianHomeValue: 380000, tier: "standard" },
  { zip: "75007", city: "Carrollton", county: "Dallas", submarket: "West Suburbs", lat: 33.0080, lng: -96.9180, medianHomeValue: 360000, tier: "standard" },
  { zip: "75010", city: "Carrollton", county: "Dallas", submarket: "West Suburbs", lat: 33.0280, lng: -96.9480, medianHomeValue: 420000, tier: "standard" },
  { zip: "75234", city: "Farmers Branch", county: "Dallas", submarket: "West Suburbs", lat: 32.9280, lng: -96.8980, medianHomeValue: 380000, tier: "standard" },
  // ── ADDISON ──────────────────────────────────────────────────
  { zip: "75001", city: "Addison", county: "Dallas", submarket: "North Suburbs", lat: 32.9680, lng: -96.8380, medianHomeValue: 480000, tier: "standard" },
  // ── FORT WORTH CORE ──────────────────────────────────────────
  { zip: "76101", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7555, lng: -97.3308, medianHomeValue: 280000, tier: "standard" },
  { zip: "76102", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7555, lng: -97.3308, medianHomeValue: 320000, tier: "standard" },
  { zip: "76103", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7480, lng: -97.2880, medianHomeValue: 180000, tier: "emerging" },
  { zip: "76104", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7280, lng: -97.3280, medianHomeValue: 160000, tier: "emerging" },
  { zip: "76105", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7180, lng: -97.2880, medianHomeValue: 140000, tier: "emerging" },
  { zip: "76106", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7880, lng: -97.3680, medianHomeValue: 170000, tier: "emerging" },
  { zip: "76107", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7480, lng: -97.3880, medianHomeValue: 380000, tier: "standard" },
  { zip: "76108", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7580, lng: -97.4680, medianHomeValue: 220000, tier: "emerging" },
  { zip: "76109", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7080, lng: -97.3880, medianHomeValue: 480000, tier: "standard" },
  { zip: "76110", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7080, lng: -97.3380, medianHomeValue: 280000, tier: "standard" },
  { zip: "76111", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7780, lng: -97.3080, medianHomeValue: 200000, tier: "emerging" },
  { zip: "76112", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7480, lng: -97.2680, medianHomeValue: 180000, tier: "emerging" },
  { zip: "76114", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7880, lng: -97.4080, medianHomeValue: 280000, tier: "standard" },
  { zip: "76115", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6880, lng: -97.3480, medianHomeValue: 180000, tier: "emerging" },
  { zip: "76116", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7280, lng: -97.4280, medianHomeValue: 280000, tier: "standard" },
  { zip: "76117", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8080, lng: -97.2880, medianHomeValue: 180000, tier: "emerging" },
  { zip: "76118", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8180, lng: -97.2480, medianHomeValue: 220000, tier: "emerging" },
  { zip: "76119", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6880, lng: -97.2880, medianHomeValue: 150000, tier: "emerging" },
  { zip: "76120", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7880, lng: -97.2280, medianHomeValue: 200000, tier: "emerging" },
  { zip: "76123", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6480, lng: -97.4080, medianHomeValue: 220000, tier: "emerging" },
  { zip: "76126", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6680, lng: -97.4880, medianHomeValue: 280000, tier: "standard" },
  { zip: "76132", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6780, lng: -97.4280, medianHomeValue: 320000, tier: "standard" },
  { zip: "76133", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6580, lng: -97.3880, medianHomeValue: 240000, tier: "standard" },
  { zip: "76134", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6280, lng: -97.3580, medianHomeValue: 200000, tier: "emerging" },
  { zip: "76135", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8180, lng: -97.4480, medianHomeValue: 240000, tier: "standard" },
  { zip: "76137", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8680, lng: -97.3280, medianHomeValue: 280000, tier: "standard" },
  { zip: "76140", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.6180, lng: -97.2880, medianHomeValue: 180000, tier: "emerging" },
  { zip: "76148", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8780, lng: -97.2880, medianHomeValue: 220000, tier: "emerging" },
  { zip: "76155", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8280, lng: -97.1880, medianHomeValue: 280000, tier: "standard" },
  { zip: "76164", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.7980, lng: -97.3580, medianHomeValue: 160000, tier: "emerging" },
  { zip: "76179", city: "Fort Worth", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8980, lng: -97.4280, medianHomeValue: 280000, tier: "standard" },
  // ── ARLINGTON ────────────────────────────────────────────────
  { zip: "76001", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.6480, lng: -97.1580, medianHomeValue: 240000, tier: "standard" },
  { zip: "76002", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.6280, lng: -97.1180, medianHomeValue: 260000, tier: "standard" },
  { zip: "76006", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.7780, lng: -97.0780, medianHomeValue: 280000, tier: "standard" },
  { zip: "76010", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.7280, lng: -97.0780, medianHomeValue: 200000, tier: "emerging" },
  { zip: "76011", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.7480, lng: -97.1180, medianHomeValue: 240000, tier: "standard" },
  { zip: "76012", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.7480, lng: -97.1580, medianHomeValue: 260000, tier: "standard" },
  { zip: "76013", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.7280, lng: -97.1580, medianHomeValue: 240000, tier: "standard" },
  { zip: "76014", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.7080, lng: -97.1180, medianHomeValue: 200000, tier: "emerging" },
  { zip: "76015", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.6880, lng: -97.1380, medianHomeValue: 240000, tier: "standard" },
  { zip: "76016", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.6980, lng: -97.1880, medianHomeValue: 280000, tier: "standard" },
  { zip: "76017", city: "Arlington", county: "Tarrant", submarket: "West Suburbs", lat: 32.6680, lng: -97.1780, medianHomeValue: 260000, tier: "standard" },
  // ── SOUTHLAKE / WESTLAKE / COLLEYVILLE / KELLER ──────────────
  { zip: "76092", city: "Southlake", county: "Tarrant", submarket: "North Suburbs", lat: 32.9480, lng: -97.1380, medianHomeValue: 1200000, tier: "premium" },
  { zip: "76262", city: "Westlake", county: "Tarrant", submarket: "North Suburbs", lat: 32.9980, lng: -97.1780, medianHomeValue: 1800000, tier: "premium" },
  { zip: "76034", city: "Colleyville", county: "Tarrant", submarket: "North Suburbs", lat: 32.8980, lng: -97.1480, medianHomeValue: 780000, tier: "premium" },
  { zip: "76248", city: "Keller", county: "Tarrant", submarket: "North Suburbs", lat: 32.9380, lng: -97.2280, medianHomeValue: 520000, tier: "premium" },
  { zip: "76244", city: "Keller", county: "Tarrant", submarket: "North Suburbs", lat: 32.9780, lng: -97.2580, medianHomeValue: 480000, tier: "standard" },
  // ── GRAPEVINE ────────────────────────────────────────────────
  { zip: "76051", city: "Grapevine", county: "Tarrant", submarket: "North Suburbs", lat: 32.9380, lng: -97.0780, medianHomeValue: 480000, tier: "standard" },
  // ── HURST / EULESS / BEDFORD (HEB) ───────────────────────────
  { zip: "76053", city: "Hurst", county: "Tarrant", submarket: "West Suburbs", lat: 32.8280, lng: -97.1880, medianHomeValue: 280000, tier: "standard" },
  { zip: "76054", city: "Hurst", county: "Tarrant", submarket: "West Suburbs", lat: 32.8480, lng: -97.1680, medianHomeValue: 300000, tier: "standard" },
  { zip: "76039", city: "Euless", county: "Tarrant", submarket: "West Suburbs", lat: 32.8380, lng: -97.0880, medianHomeValue: 280000, tier: "standard" },
  { zip: "76040", city: "Euless", county: "Tarrant", submarket: "West Suburbs", lat: 32.8580, lng: -97.0680, medianHomeValue: 300000, tier: "standard" },
  { zip: "76021", city: "Bedford", county: "Tarrant", submarket: "West Suburbs", lat: 32.8480, lng: -97.1380, medianHomeValue: 320000, tier: "standard" },
  { zip: "76022", city: "Bedford", county: "Tarrant", submarket: "West Suburbs", lat: 32.8280, lng: -97.1480, medianHomeValue: 300000, tier: "standard" },
  // ── NORTH RICHLAND HILLS / WATAUGA / HALTOM CITY ─────────────
  { zip: "76180", city: "North Richland Hills", county: "Tarrant", submarket: "North Suburbs", lat: 32.8780, lng: -97.2280, medianHomeValue: 300000, tier: "standard" },
  { zip: "76182", city: "North Richland Hills", county: "Tarrant", submarket: "North Suburbs", lat: 32.8980, lng: -97.2080, medianHomeValue: 320000, tier: "standard" },
  { zip: "76148", city: "Watauga", county: "Tarrant", submarket: "North Suburbs", lat: 32.8880, lng: -97.2580, medianHomeValue: 240000, tier: "standard" },
  { zip: "76117", city: "Haltom City", county: "Tarrant", submarket: "Fort Worth Core", lat: 32.8180, lng: -97.2780, medianHomeValue: 180000, tier: "emerging" },
  // ── MANSFIELD / BURLESON / CROWLEY ───────────────────────────
  { zip: "76063", city: "Mansfield", county: "Tarrant", submarket: "South Suburbs", lat: 32.5680, lng: -97.1380, medianHomeValue: 380000, tier: "standard" },
  { zip: "76028", city: "Burleson", county: "Johnson", submarket: "South Suburbs", lat: 32.5280, lng: -97.3280, medianHomeValue: 300000, tier: "standard" },
  { zip: "76036", city: "Crowley", county: "Tarrant", submarket: "South Suburbs", lat: 32.5780, lng: -97.3680, medianHomeValue: 260000, tier: "standard" },
  // ── CEDAR HILL / DESOTO / DUNCANVILLE / LANCASTER ────────────
  { zip: "75104", city: "Cedar Hill", county: "Dallas", submarket: "South Suburbs", lat: 32.5880, lng: -96.9580, medianHomeValue: 280000, tier: "standard" },
  { zip: "75115", city: "DeSoto", county: "Dallas", submarket: "South Suburbs", lat: 32.5980, lng: -96.8580, medianHomeValue: 260000, tier: "standard" },
  { zip: "75116", city: "Duncanville", county: "Dallas", submarket: "South Suburbs", lat: 32.6480, lng: -96.9080, medianHomeValue: 220000, tier: "emerging" },
  { zip: "75146", city: "Lancaster", county: "Dallas", submarket: "South Suburbs", lat: 32.5980, lng: -96.7580, medianHomeValue: 200000, tier: "emerging" },
  // ── GRAND PRAIRIE ────────────────────────────────────────────
  { zip: "75050", city: "Grand Prairie", county: "Dallas", submarket: "West Suburbs", lat: 32.7480, lng: -97.0180, medianHomeValue: 240000, tier: "standard" },
  { zip: "75051", city: "Grand Prairie", county: "Dallas", submarket: "West Suburbs", lat: 32.7280, lng: -97.0380, medianHomeValue: 220000, tier: "emerging" },
  { zip: "75052", city: "Grand Prairie", county: "Dallas", submarket: "West Suburbs", lat: 32.6880, lng: -97.0280, medianHomeValue: 260000, tier: "standard" },
  // ── LEWISVILLE / FLOWER MOUND / HIGHLAND VILLAGE ─────────────
  { zip: "75028", city: "Flower Mound", county: "Denton", submarket: "Denton County", lat: 33.0280, lng: -97.0980, medianHomeValue: 580000, tier: "premium" },
  { zip: "75022", city: "Flower Mound", county: "Denton", submarket: "Denton County", lat: 33.0080, lng: -97.1480, medianHomeValue: 620000, tier: "premium" },
  { zip: "75067", city: "Lewisville", county: "Denton", submarket: "Denton County", lat: 33.0480, lng: -96.9980, medianHomeValue: 340000, tier: "standard" },
  { zip: "75056", city: "The Colony", county: "Denton", submarket: "Denton County", lat: 33.0880, lng: -96.8880, medianHomeValue: 380000, tier: "standard" },
  { zip: "75057", city: "Lewisville", county: "Denton", submarket: "Denton County", lat: 33.0280, lng: -96.9680, medianHomeValue: 320000, tier: "standard" },
  { zip: "75065", city: "Lake Dallas", county: "Denton", submarket: "Denton County", lat: 33.1180, lng: -97.0180, medianHomeValue: 300000, tier: "standard" },
  { zip: "75077", city: "Highland Village", county: "Denton", submarket: "Denton County", lat: 33.0880, lng: -97.0580, medianHomeValue: 480000, tier: "standard" },
  // ── DENTON ───────────────────────────────────────────────────
  { zip: "76201", city: "Denton", county: "Denton", submarket: "Denton County", lat: 33.2148, lng: -97.1331, medianHomeValue: 320000, tier: "standard" },
  { zip: "76205", city: "Denton", county: "Denton", submarket: "Denton County", lat: 33.1948, lng: -97.0931, medianHomeValue: 300000, tier: "standard" },
  { zip: "76207", city: "Denton", county: "Denton", submarket: "Denton County", lat: 33.2348, lng: -97.1731, medianHomeValue: 280000, tier: "standard" },
  { zip: "76208", city: "Denton", county: "Denton", submarket: "Denton County", lat: 33.2148, lng: -97.0731, medianHomeValue: 340000, tier: "standard" },
  { zip: "76209", city: "Denton", county: "Denton", submarket: "Denton County", lat: 33.2348, lng: -97.1131, medianHomeValue: 260000, tier: "standard" },
  { zip: "76210", city: "Denton", county: "Denton", submarket: "Denton County", lat: 33.1748, lng: -97.0531, medianHomeValue: 380000, tier: "standard" },
  // ── PROSPER / CELINA / LITTLE ELM ────────────────────────────
  { zip: "75078", city: "Prosper", county: "Collin", submarket: "North Suburbs", lat: 33.2380, lng: -96.8080, medianHomeValue: 680000, tier: "premium" },
  { zip: "75009", city: "Celina", county: "Collin", submarket: "North Suburbs", lat: 33.3180, lng: -96.7880, medianHomeValue: 480000, tier: "standard" },
  { zip: "75068", city: "Little Elm", county: "Denton", submarket: "Denton County", lat: 33.1680, lng: -96.9380, medianHomeValue: 380000, tier: "standard" },
  // ── FORNEY / TERRELL ─────────────────────────────────────────
  { zip: "75126", city: "Forney", county: "Kaufman", submarket: "East Suburbs", lat: 32.7480, lng: -96.4680, medianHomeValue: 320000, tier: "standard" },
];

// ── Tier-based zip code limits ────────────────────────────────────────────────
export const TIER_ZIP_LIMITS: Record<string, number> = {
  scout:      3,   // Free — can only cover 3 zip codes (hyper-local)
  pro:        8,   // $29/mo — covers a neighborhood cluster
  crew:       20,  // $79/mo — covers a full city quadrant
  company:    50,  // $149/mo — covers most of DFW
  enterprise: 999, // $299/mo — unlimited coverage
};

// ── Recommended ratio: 1 active partner per 40–60 homeowners per zip ─────────
export const TARGET_PARTNER_TO_HOMEOWNER_RATIO = {
  min: 40, // 1 partner per 40 homeowners minimum (ensures partners get enough jobs)
  max: 60, // 1 partner per 60 homeowners maximum (ensures homeowners get fast response)
  ideal: 50,
};

// ── DFW submarket groupings for coverage analysis ────────────────────────────
export const DFW_SUBMARKETS = [
  "Dallas Core",
  "Fort Worth Core",
  "North Suburbs",
  "South Suburbs",
  "East Suburbs",
  "West Suburbs",
  "Denton County",
] as const;

// ── Helper: get all zip codes for a city ─────────────────────────────────────
export function getZipsByCity(city: string): DFWZipCode[] {
  return DFW_ZIP_CODES.filter(z => z.city.toLowerCase() === city.toLowerCase());
}

// ── Helper: get all zip codes for a submarket ────────────────────────────────
export function getZipsBySubmarket(submarket: string): DFWZipCode[] {
  return DFW_ZIP_CODES.filter(z => z.submarket === submarket);
}

// ── Helper: get zip info by zip code string ───────────────────────────────────
export function getZipInfo(zip: string): DFWZipCode | undefined {
  return DFW_ZIP_CODES.find(z => z.zip === zip);
}

// ── Helper: validate zip is in DFW service area ───────────────────────────────
export function isValidDFWZip(zip: string): boolean {
  return DFW_ZIP_CODES.some(z => z.zip === zip);
}

// ── Helper: get max zip codes allowed for a tier ─────────────────────────────
export function getMaxZipsForTier(tier: string): number {
  return TIER_ZIP_LIMITS[tier] ?? 3;
}

export const TOTAL_DFW_ZIPS = DFW_ZIP_CODES.length;
