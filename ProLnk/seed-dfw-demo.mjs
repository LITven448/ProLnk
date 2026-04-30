/**
 * W23: DFW Demo Data Seed
 * Seeds 50 realistic DFW partners, 200 jobs, and 300 AI-detected opportunities
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

// Parse DATABASE_URL
const url = new URL(DB_URL);
const conn = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port || '3306'),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
});

console.log('Connected to DB');

// ─── DFW Partner Data ───────────────────────────────────────────────────────
const dfwPartners = [
  // Roofing
  { businessName: 'Lone Star Roofing Co.', businessType: 'Roofing', contactName: 'Mike Hargrove', contactEmail: 'mike@lonestarroofing.com', contactPhone: '214-555-0101', serviceArea: 'Plano, TX', serviceAreaLat: '33.0198', serviceAreaLng: '-96.6989', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 78, rating: '4.8', reviewCount: 47, referralCount: 23, jobsLogged: 89, opportunitiesGenerated: 34, totalCommissionEarned: '8420.00', totalCommissionPaid: '7100.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'DFW Storm Shield Roofing', businessType: 'Roofing', contactName: 'Carlos Mendez', contactEmail: 'carlos@dfwstormshield.com', contactPhone: '972-555-0102', serviceArea: 'Frisco, TX', serviceAreaLat: '33.1507', serviceAreaLng: '-96.8236', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 65, rating: '4.6', reviewCount: 31, referralCount: 15, jobsLogged: 54, opportunitiesGenerated: 19, totalCommissionEarned: '4200.00', totalCommissionPaid: '3500.00', weeklyLeadCap: 15, status: 'approved' },
  // HVAC
  { businessName: 'Arctic Air HVAC Solutions', businessType: 'HVAC', contactName: 'James Whitfield', contactEmail: 'james@arcticairhvac.com', contactPhone: '817-555-0103', serviceArea: 'Arlington, TX', serviceAreaLat: '32.7357', serviceAreaLng: '-97.1081', tier: 'company', subscriptionFee: '499.00', commissionRate: '0.7200', platformFeeRate: '0.1200', referralCommissionRate: '0.0864', priorityScore: 88, rating: '4.9', reviewCount: 112, referralCount: 67, jobsLogged: 201, opportunitiesGenerated: 89, totalCommissionEarned: '22400.00', totalCommissionPaid: '19800.00', weeklyLeadCap: 60, status: 'approved' },
  { businessName: 'Comfort Zone HVAC', businessType: 'HVAC', contactName: 'Sandra Torres', contactEmail: 'sandra@comfortzonehvac.com', contactPhone: '214-555-0104', serviceArea: 'Irving, TX', serviceAreaLat: '32.8140', serviceAreaLng: '-96.9489', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 61, rating: '4.5', reviewCount: 28, referralCount: 12, jobsLogged: 43, opportunitiesGenerated: 14, totalCommissionEarned: '3100.00', totalCommissionPaid: '2600.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Texas Breeze Air & Heat', businessType: 'HVAC', contactName: 'Robert Kim', contactEmail: 'robert@texasbreezeair.com', contactPhone: '972-555-0105', serviceArea: 'McKinney, TX', serviceAreaLat: '33.1972', serviceAreaLng: '-96.6397', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 72, rating: '4.7', reviewCount: 58, referralCount: 29, jobsLogged: 97, opportunitiesGenerated: 41, totalCommissionEarned: '9800.00', totalCommissionPaid: '8200.00', weeklyLeadCap: 30, status: 'approved' },
  // Plumbing
  { businessName: 'Metroplex Master Plumbing', businessType: 'Plumbing', contactName: 'David Chen', contactEmail: 'david@metroplexplumbing.com', contactPhone: '214-555-0106', serviceArea: 'Dallas, TX', serviceAreaLat: '32.7767', serviceAreaLng: '-96.7970', tier: 'company', subscriptionFee: '499.00', commissionRate: '0.7200', platformFeeRate: '0.1200', referralCommissionRate: '0.0864', priorityScore: 91, rating: '4.9', reviewCount: 143, referralCount: 78, jobsLogged: 234, opportunitiesGenerated: 102, totalCommissionEarned: '28900.00', totalCommissionPaid: '25100.00', weeklyLeadCap: 60, status: 'approved' },
  { businessName: 'Flow Right Plumbing', businessType: 'Plumbing', contactName: 'Maria Gonzalez', contactEmail: 'maria@flowrightplumbing.com', contactPhone: '817-555-0107', serviceArea: 'Fort Worth, TX', serviceAreaLat: '32.7555', serviceAreaLng: '-97.3308', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 58, rating: '4.4', reviewCount: 22, referralCount: 9, jobsLogged: 38, opportunitiesGenerated: 11, totalCommissionEarned: '2400.00', totalCommissionPaid: '1900.00', weeklyLeadCap: 15, status: 'approved' },
  // Electrical
  { businessName: 'Spark Pro Electrical', businessType: 'Electrical', contactName: 'Tony Nguyen', contactEmail: 'tony@sparkproelectrical.com', contactPhone: '972-555-0108', serviceArea: 'Garland, TX', serviceAreaLat: '32.9126', serviceAreaLng: '-96.6389', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 74, rating: '4.7', reviewCount: 63, referralCount: 31, jobsLogged: 108, opportunitiesGenerated: 47, totalCommissionEarned: '11200.00', totalCommissionPaid: '9400.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Volt Masters Electric', businessType: 'Electrical', contactName: 'Lisa Park', contactEmail: 'lisa@voltmasters.com', contactPhone: '214-555-0109', serviceArea: 'Richardson, TX', serviceAreaLat: '32.9483', serviceAreaLng: '-96.7299', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 55, rating: '4.3', reviewCount: 19, referralCount: 7, jobsLogged: 31, opportunitiesGenerated: 9, totalCommissionEarned: '1800.00', totalCommissionPaid: '1400.00', weeklyLeadCap: 15, status: 'approved' },
  // Landscaping
  { businessName: 'Green Thumb Landscaping DFW', businessType: 'Landscaping', contactName: 'Jorge Reyes', contactEmail: 'jorge@greenthumbdfw.com', contactPhone: '817-555-0110', serviceArea: 'Southlake, TX', serviceAreaLat: '32.9401', serviceAreaLng: '-97.1336', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 69, rating: '4.6', reviewCount: 44, referralCount: 21, jobsLogged: 76, opportunitiesGenerated: 28, totalCommissionEarned: '6700.00', totalCommissionPaid: '5600.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Prestige Lawn & Garden', businessType: 'Landscaping', contactName: 'Amanda Foster', contactEmail: 'amanda@prestigelawn.com', contactPhone: '972-555-0111', serviceArea: 'Allen, TX', serviceAreaLat: '33.1032', serviceAreaLng: '-96.6706', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 52, rating: '4.2', reviewCount: 16, referralCount: 6, jobsLogged: 27, opportunitiesGenerated: 8, totalCommissionEarned: '1600.00', totalCommissionPaid: '1200.00', weeklyLeadCap: 15, status: 'approved' },
  // Painting
  { businessName: 'Brushstroke Painting Co.', businessType: 'Painting', contactName: 'Kevin O\'Brien', contactEmail: 'kevin@brushstrokepainting.com', contactPhone: '214-555-0112', serviceArea: 'Addison, TX', serviceAreaLat: '32.9618', serviceAreaLng: '-96.8289', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 60, rating: '4.5', reviewCount: 26, referralCount: 11, jobsLogged: 41, opportunitiesGenerated: 13, totalCommissionEarned: '2900.00', totalCommissionPaid: '2400.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Premier Coat Painters', businessType: 'Painting', contactName: 'Rachel Adams', contactEmail: 'rachel@premiercoat.com', contactPhone: '817-555-0113', serviceArea: 'Keller, TX', serviceAreaLat: '32.9343', serviceAreaLng: '-97.2294', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 66, rating: '4.6', reviewCount: 38, referralCount: 18, jobsLogged: 62, opportunitiesGenerated: 22, totalCommissionEarned: '5400.00', totalCommissionPaid: '4500.00', weeklyLeadCap: 30, status: 'approved' },
  // Flooring
  { businessName: 'DFW Hardwood & Tile', businessType: 'Flooring', contactName: 'Steven Wu', contactEmail: 'steven@dfwhardwood.com', contactPhone: '972-555-0114', serviceArea: 'Lewisville, TX', serviceAreaLat: '33.0462', serviceAreaLng: '-96.9942', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 71, rating: '4.7', reviewCount: 51, referralCount: 24, jobsLogged: 83, opportunitiesGenerated: 31, totalCommissionEarned: '7800.00', totalCommissionPaid: '6500.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Floors by Design', businessType: 'Flooring', contactName: 'Patricia Moore', contactEmail: 'patricia@floorsbydesign.com', contactPhone: '214-555-0115', serviceArea: 'Carrollton, TX', serviceAreaLat: '32.9537', serviceAreaLng: '-96.8903', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 54, rating: '4.3', reviewCount: 18, referralCount: 7, jobsLogged: 29, opportunitiesGenerated: 9, totalCommissionEarned: '2100.00', totalCommissionPaid: '1700.00', weeklyLeadCap: 15, status: 'approved' },
  // Windows & Doors
  { businessName: 'Crystal Clear Windows DFW', businessType: 'Windows & Doors', contactName: 'Brian Taylor', contactEmail: 'brian@crystalclearwindows.com', contactPhone: '817-555-0116', serviceArea: 'Euless, TX', serviceAreaLat: '32.8371', serviceAreaLng: '-97.0819', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 57, rating: '4.4', reviewCount: 21, referralCount: 8, jobsLogged: 34, opportunitiesGenerated: 10, totalCommissionEarned: '2300.00', totalCommissionPaid: '1900.00', weeklyLeadCap: 15, status: 'approved' },
  // Pool & Spa
  { businessName: 'Blue Wave Pool Service', businessType: 'Pool & Spa', contactName: 'Chris Martinez', contactEmail: 'chris@bluewavepool.com', contactPhone: '972-555-0117', serviceArea: 'Prosper, TX', serviceAreaLat: '33.2362', serviceAreaLng: '-96.8009', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 70, rating: '4.7', reviewCount: 49, referralCount: 22, jobsLogged: 78, opportunitiesGenerated: 29, totalCommissionEarned: '7200.00', totalCommissionPaid: '6000.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Oasis Pool & Spa Experts', businessType: 'Pool & Spa', contactName: 'Diana Lee', contactEmail: 'diana@oasispoolspa.com', contactPhone: '214-555-0118', serviceArea: 'Celina, TX', serviceAreaLat: '33.3237', serviceAreaLng: '-96.7853', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 53, rating: '4.2', reviewCount: 14, referralCount: 5, jobsLogged: 24, opportunitiesGenerated: 7, totalCommissionEarned: '1500.00', totalCommissionPaid: '1200.00', weeklyLeadCap: 15, status: 'approved' },
  // Pest Control
  { businessName: 'Bug Busters Pest Control', businessType: 'Pest Control', contactName: 'Frank Johnson', contactEmail: 'frank@bugbusterspest.com', contactPhone: '817-555-0119', serviceArea: 'Hurst, TX', serviceAreaLat: '32.8232', serviceAreaLng: '-97.1883', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 59, rating: '4.4', reviewCount: 24, referralCount: 10, jobsLogged: 39, opportunitiesGenerated: 12, totalCommissionEarned: '2700.00', totalCommissionPaid: '2200.00', weeklyLeadCap: 15, status: 'approved' },
  // Fence
  { businessName: 'Lone Star Fence & Gate', businessType: 'Fence & Gate', contactName: 'Gary Wilson', contactEmail: 'gary@lonestarfence.com', contactPhone: '972-555-0120', serviceArea: 'Wylie, TX', serviceAreaLat: '33.0151', serviceAreaLng: '-96.5388', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 56, rating: '4.3', reviewCount: 20, referralCount: 8, jobsLogged: 32, opportunitiesGenerated: 10, totalCommissionEarned: '2200.00', totalCommissionPaid: '1800.00', weeklyLeadCap: 15, status: 'approved' },
  // Concrete
  { businessName: 'Solid Ground Concrete', businessType: 'Concrete & Masonry', contactName: 'Paul Rivera', contactEmail: 'paul@solidgroundconcrete.com', contactPhone: '214-555-0121', serviceArea: 'Mesquite, TX', serviceAreaLat: '32.7668', serviceAreaLng: '-96.5992', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 51, rating: '4.1', reviewCount: 13, referralCount: 5, jobsLogged: 22, opportunitiesGenerated: 6, totalCommissionEarned: '1400.00', totalCommissionPaid: '1100.00', weeklyLeadCap: 15, status: 'approved' },
  // Gutters
  { businessName: 'Clean Flow Gutters', businessType: 'Gutters', contactName: 'Nancy Brown', contactEmail: 'nancy@cleanflowgutters.com', contactPhone: '817-555-0122', serviceArea: 'Bedford, TX', serviceAreaLat: '32.8440', serviceAreaLng: '-97.1431', tier: 'scout', subscriptionFee: '0.00', commissionRate: '0.4000', platformFeeRate: '0.1200', referralCommissionRate: '0.0480', priorityScore: 38, rating: '4.0', reviewCount: 8, referralCount: 3, jobsLogged: 14, opportunitiesGenerated: 4, totalCommissionEarned: '800.00', totalCommissionPaid: '600.00', weeklyLeadCap: 5, status: 'approved' },
  // Insulation
  { businessName: 'Texas Insulation Pros', businessType: 'Insulation', contactName: 'Mark Davis', contactEmail: 'mark@texasinsulationpros.com', contactPhone: '972-555-0123', serviceArea: 'Rowlett, TX', serviceAreaLat: '32.9029', serviceAreaLng: '-96.5638', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 55, rating: '4.3', reviewCount: 17, referralCount: 7, jobsLogged: 28, opportunitiesGenerated: 8, totalCommissionEarned: '1900.00', totalCommissionPaid: '1500.00', weeklyLeadCap: 15, status: 'approved' },
  // Cabinet & Woodwork
  { businessName: 'Craftsman Cabinet Co.', businessType: 'Cabinets & Woodwork', contactName: 'Helen Scott', contactEmail: 'helen@craftsmancabinet.com', contactPhone: '214-555-0124', serviceArea: 'Flower Mound, TX', serviceAreaLat: '33.0146', serviceAreaLng: '-97.0969', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 67, rating: '4.6', reviewCount: 41, referralCount: 19, jobsLogged: 67, opportunitiesGenerated: 25, totalCommissionEarned: '6100.00', totalCommissionPaid: '5100.00', weeklyLeadCap: 30, status: 'approved' },
  // Drywall
  { businessName: 'Smooth Finish Drywall', businessType: 'Drywall', contactName: 'Eric Thompson', contactEmail: 'eric@smoothfinishdrywall.com', contactPhone: '817-555-0125', serviceArea: 'North Richland Hills, TX', serviceAreaLat: '32.8343', serviceAreaLng: '-97.2289', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 50, rating: '4.1', reviewCount: 12, referralCount: 4, jobsLogged: 20, opportunitiesGenerated: 6, totalCommissionEarned: '1300.00', totalCommissionPaid: '1000.00', weeklyLeadCap: 15, status: 'approved' },
  // Irrigation
  { businessName: 'Rain Bird Irrigation DFW', businessType: 'Irrigation', contactName: 'Susan Clark', contactEmail: 'susan@rainbirddfw.com', contactPhone: '972-555-0126', serviceArea: 'The Colony, TX', serviceAreaLat: '33.0851', serviceAreaLng: '-96.8886', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 53, rating: '4.2', reviewCount: 15, referralCount: 6, jobsLogged: 25, opportunitiesGenerated: 7, totalCommissionEarned: '1600.00', totalCommissionPaid: '1300.00', weeklyLeadCap: 15, status: 'approved' },
  // Cleaning
  { businessName: 'Sparkle Pro Cleaning', businessType: 'Cleaning', contactName: 'Linda Harris', contactEmail: 'linda@sparkleprocleaning.com', contactPhone: '214-555-0127', serviceArea: 'Coppell, TX', serviceAreaLat: '32.9543', serviceAreaLng: '-97.0147', tier: 'scout', subscriptionFee: '0.00', commissionRate: '0.4000', platformFeeRate: '0.1200', referralCommissionRate: '0.0480', priorityScore: 35, rating: '3.9', reviewCount: 7, referralCount: 2, jobsLogged: 11, opportunitiesGenerated: 3, totalCommissionEarned: '600.00', totalCommissionPaid: '400.00', weeklyLeadCap: 5, status: 'approved' },
  // Foundation
  { businessName: 'Rock Solid Foundation Repair', businessType: 'Foundation Repair', contactName: 'Tom Anderson', contactEmail: 'tom@rocksolidfoundation.com', contactPhone: '817-555-0128', serviceArea: 'Mansfield, TX', serviceAreaLat: '32.5632', serviceAreaLng: '-97.1411', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 73, rating: '4.7', reviewCount: 55, referralCount: 27, jobsLogged: 91, opportunitiesGenerated: 38, totalCommissionEarned: '9100.00', totalCommissionPaid: '7600.00', weeklyLeadCap: 30, status: 'approved' },
  // Appliance Repair
  { businessName: 'Fix It Fast Appliance Repair', businessType: 'Appliance Repair', contactName: 'Karen White', contactEmail: 'karen@fixitfastappliance.com', contactPhone: '972-555-0129', serviceArea: 'Sachse, TX', serviceAreaLat: '32.9757', serviceAreaLng: '-96.5738', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 48, rating: '4.0', reviewCount: 11, referralCount: 4, jobsLogged: 18, opportunitiesGenerated: 5, totalCommissionEarned: '1100.00', totalCommissionPaid: '800.00', weeklyLeadCap: 15, status: 'approved' },
  // More trades to reach 50
  { businessName: 'DFW Deck & Patio Builders', businessType: 'Decks & Patios', contactName: 'Jason Lewis', contactEmail: 'jason@dfwdeckpatio.com', contactPhone: '214-555-0130', serviceArea: 'Rockwall, TX', serviceAreaLat: '32.9312', serviceAreaLng: '-96.4597', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 54, rating: '4.3', reviewCount: 16, referralCount: 6, jobsLogged: 26, opportunitiesGenerated: 8, totalCommissionEarned: '1700.00', totalCommissionPaid: '1400.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Smart Home Solutions DFW', businessType: 'Smart Home & Security', contactName: 'Michael Young', contactEmail: 'michael@smarthomesdfw.com', contactPhone: '817-555-0131', serviceArea: 'Colleyville, TX', serviceAreaLat: '32.8888', serviceAreaLng: '-97.1503', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 68, rating: '4.6', reviewCount: 43, referralCount: 20, jobsLogged: 71, opportunitiesGenerated: 26, totalCommissionEarned: '6400.00', totalCommissionPaid: '5300.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Prestige Pressure Washing', businessType: 'Pressure Washing', contactName: 'Angela Robinson', contactEmail: 'angela@prestigepressure.com', contactPhone: '972-555-0132', serviceArea: 'Murphy, TX', serviceAreaLat: '33.0151', serviceAreaLng: '-96.6097', tier: 'scout', subscriptionFee: '0.00', commissionRate: '0.4000', platformFeeRate: '0.1200', referralCommissionRate: '0.0480', priorityScore: 32, rating: '3.8', reviewCount: 6, referralCount: 2, jobsLogged: 9, opportunitiesGenerated: 2, totalCommissionEarned: '400.00', totalCommissionPaid: '300.00', weeklyLeadCap: 5, status: 'approved' },
  { businessName: 'Remodel Right Kitchen & Bath', businessType: 'Kitchen & Bath Remodel', contactName: 'Daniel Hall', contactEmail: 'daniel@remodelright.com', contactPhone: '214-555-0133', serviceArea: 'Grapevine, TX', serviceAreaLat: '32.9343', serviceAreaLng: '-97.0781', tier: 'company', subscriptionFee: '499.00', commissionRate: '0.7200', platformFeeRate: '0.1200', referralCommissionRate: '0.0864', priorityScore: 85, rating: '4.8', reviewCount: 97, referralCount: 52, jobsLogged: 178, opportunitiesGenerated: 74, totalCommissionEarned: '18600.00', totalCommissionPaid: '16200.00', weeklyLeadCap: 60, status: 'approved' },
  { businessName: 'Texas Tree Service', businessType: 'Tree Service', contactName: 'Barbara Walker', contactEmail: 'barbara@texastreeservice.com', contactPhone: '817-555-0134', serviceArea: 'Azle, TX', serviceAreaLat: '32.8957', serviceAreaLng: '-97.5464', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 49, rating: '4.1', reviewCount: 12, referralCount: 4, jobsLogged: 19, opportunitiesGenerated: 5, totalCommissionEarned: '1200.00', totalCommissionPaid: '900.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Garage Door Pros DFW', businessType: 'Garage Doors', contactName: 'Charles Allen', contactEmail: 'charles@garagedoorpros.com', contactPhone: '972-555-0135', serviceArea: 'Rowlett, TX', serviceAreaLat: '32.9029', serviceAreaLng: '-96.5638', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 52, rating: '4.2', reviewCount: 14, referralCount: 5, jobsLogged: 23, opportunitiesGenerated: 7, totalCommissionEarned: '1500.00', totalCommissionPaid: '1200.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Solar Star Energy DFW', businessType: 'Solar', contactName: 'Jennifer King', contactEmail: 'jennifer@solarstardfw.com', contactPhone: '214-555-0136', serviceArea: 'Plano, TX', serviceAreaLat: '33.0198', serviceAreaLng: '-96.6989', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 64, rating: '4.5', reviewCount: 33, referralCount: 15, jobsLogged: 52, opportunitiesGenerated: 18, totalCommissionEarned: '4500.00', totalCommissionPaid: '3700.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Waterproof Basement Solutions', businessType: 'Waterproofing', contactName: 'Joseph Wright', contactEmail: 'joseph@waterproofbasement.com', contactPhone: '817-555-0137', serviceArea: 'Burleson, TX', serviceAreaLat: '32.5421', serviceAreaLng: '-97.3208', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 47, rating: '4.0', reviewCount: 10, referralCount: 3, jobsLogged: 17, opportunitiesGenerated: 5, totalCommissionEarned: '1000.00', totalCommissionPaid: '800.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Elite Tile & Stone', businessType: 'Tile & Stone', contactName: 'Margaret Turner', contactEmail: 'margaret@elitetilestone.com', contactPhone: '972-555-0138', serviceArea: 'Frisco, TX', serviceAreaLat: '33.1507', serviceAreaLng: '-96.8236', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 63, rating: '4.5', reviewCount: 29, referralCount: 13, jobsLogged: 47, opportunitiesGenerated: 16, totalCommissionEarned: '3900.00', totalCommissionPaid: '3200.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Pro Stucco & Siding', businessType: 'Siding & Stucco', contactName: 'William Phillips', contactEmail: 'william@prostuccosiding.com', contactPhone: '214-555-0139', serviceArea: 'Carrollton, TX', serviceAreaLat: '32.9537', serviceAreaLng: '-96.8903', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 50, rating: '4.1', reviewCount: 11, referralCount: 4, jobsLogged: 18, opportunitiesGenerated: 5, totalCommissionEarned: '1100.00', totalCommissionPaid: '900.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'DFW Chimney & Fireplace', businessType: 'Chimney & Fireplace', contactName: 'Dorothy Campbell', contactEmail: 'dorothy@dfwchimney.com', contactPhone: '817-555-0140', serviceArea: 'Weatherford, TX', serviceAreaLat: '32.7593', serviceAreaLng: '-97.7975', tier: 'scout', subscriptionFee: '0.00', commissionRate: '0.4000', platformFeeRate: '0.1200', referralCommissionRate: '0.0480', priorityScore: 30, rating: '3.7', reviewCount: 5, referralCount: 1, jobsLogged: 8, opportunitiesGenerated: 2, totalCommissionEarned: '300.00', totalCommissionPaid: '200.00', weeklyLeadCap: 5, status: 'approved' },
  { businessName: 'Scoop Duke DFW', businessType: 'Pet Waste Removal', contactName: 'Andrew Duke', contactEmail: 'andrew@scoopduke.com', contactPhone: '214-555-0001', serviceArea: 'Dallas, TX', serviceAreaLat: '32.7767', serviceAreaLng: '-96.7970', tier: 'enterprise', subscriptionFee: '0.00', commissionRate: '1.0000', platformFeeRate: '0.0000', referralCommissionRate: '0.0000', priorityScore: 100, rating: '5.0', reviewCount: 200, referralCount: 150, jobsLogged: 500, opportunitiesGenerated: 200, totalCommissionEarned: '0.00', totalCommissionPaid: '0.00', weeklyLeadCap: 0, status: 'approved', isExempt: true },
  { businessName: 'Apex Roofing & Restoration', businessType: 'Roofing', contactName: 'Steven Carter', contactEmail: 'steven@apexroofing.com', contactPhone: '972-555-0141', serviceArea: 'Sachse, TX', serviceAreaLat: '32.9757', serviceAreaLng: '-96.5738', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 56, rating: '4.4', reviewCount: 19, referralCount: 7, jobsLogged: 30, opportunitiesGenerated: 9, totalCommissionEarned: '2000.00', totalCommissionPaid: '1600.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Pinnacle Plumbing Services', businessType: 'Plumbing', contactName: 'Ruth Mitchell', contactEmail: 'ruth@pinnacleplumbing.com', contactPhone: '214-555-0142', serviceArea: 'Duncanville, TX', serviceAreaLat: '32.6518', serviceAreaLng: '-96.9083', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 51, rating: '4.2', reviewCount: 13, referralCount: 5, jobsLogged: 21, opportunitiesGenerated: 6, totalCommissionEarned: '1400.00', totalCommissionPaid: '1100.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Sunbelt Electrical Services', businessType: 'Electrical', contactName: 'Larry Robinson', contactEmail: 'larry@sunbeltelectrical.com', contactPhone: '817-555-0143', serviceArea: 'Grand Prairie, TX', serviceAreaLat: '32.7460', serviceAreaLng: '-97.0208', tier: 'crew', subscriptionFee: '299.00', commissionRate: '0.6500', platformFeeRate: '0.1200', referralCommissionRate: '0.0780', priorityScore: 69, rating: '4.6', reviewCount: 45, referralCount: 21, jobsLogged: 73, opportunitiesGenerated: 27, totalCommissionEarned: '6500.00', totalCommissionPaid: '5400.00', weeklyLeadCap: 30, status: 'approved' },
  { businessName: 'Greenscape Lawn Care', businessType: 'Lawn Care', contactName: 'Betty Nelson', contactEmail: 'betty@greenscapelawn.com', contactPhone: '972-555-0144', serviceArea: 'Wylie, TX', serviceAreaLat: '33.0151', serviceAreaLng: '-96.5388', tier: 'scout', subscriptionFee: '0.00', commissionRate: '0.4000', platformFeeRate: '0.1200', referralCommissionRate: '0.0480', priorityScore: 33, rating: '3.9', reviewCount: 6, referralCount: 2, jobsLogged: 10, opportunitiesGenerated: 3, totalCommissionEarned: '500.00', totalCommissionPaid: '400.00', weeklyLeadCap: 5, status: 'approved' },
  { businessName: 'Premier Mold Remediation', businessType: 'Mold Remediation', contactName: 'Raymond Carter', contactEmail: 'raymond@premiermold.com', contactPhone: '214-555-0145', serviceArea: 'Mesquite, TX', serviceAreaLat: '32.7668', serviceAreaLng: '-96.5992', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 48, rating: '4.0', reviewCount: 10, referralCount: 3, jobsLogged: 17, opportunitiesGenerated: 5, totalCommissionEarned: '1000.00', totalCommissionPaid: '800.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'DFW Epoxy Flooring', businessType: 'Epoxy & Concrete Coating', contactName: 'Sharon Evans', contactEmail: 'sharon@dfwepoxyfloor.com', contactPhone: '817-555-0146', serviceArea: 'Haltom City, TX', serviceAreaLat: '32.7993', serviceAreaLng: '-97.2697', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 46, rating: '4.0', reviewCount: 9, referralCount: 3, jobsLogged: 15, opportunitiesGenerated: 4, totalCommissionEarned: '900.00', totalCommissionPaid: '700.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Texas Home Theater & AV', businessType: 'Home Theater & AV', contactName: 'Gregory Stewart', contactEmail: 'gregory@texashometheater.com', contactPhone: '972-555-0147', serviceArea: 'Allen, TX', serviceAreaLat: '33.1032', serviceAreaLng: '-96.6706', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 53, rating: '4.2', reviewCount: 15, referralCount: 6, jobsLogged: 24, opportunitiesGenerated: 7, totalCommissionEarned: '1600.00', totalCommissionPaid: '1300.00', weeklyLeadCap: 15, status: 'approved' },
  { businessName: 'Lone Star Locksmith', businessType: 'Locksmith & Security', contactName: 'Deborah Sanchez', contactEmail: 'deborah@lonestar locksmith.com', contactPhone: '214-555-0148', serviceArea: 'Irving, TX', serviceAreaLat: '32.8140', serviceAreaLng: '-96.9489', tier: 'scout', subscriptionFee: '0.00', commissionRate: '0.4000', platformFeeRate: '0.1200', referralCommissionRate: '0.0480', priorityScore: 28, rating: '3.6', reviewCount: 4, referralCount: 1, jobsLogged: 7, opportunitiesGenerated: 2, totalCommissionEarned: '200.00', totalCommissionPaid: '100.00', weeklyLeadCap: 5, status: 'approved' },
  { businessName: 'DFW Generator Experts', businessType: 'Generator Installation', contactName: 'Arthur Morris', contactEmail: 'arthur@dfwgenerator.com', contactPhone: '817-555-0149', serviceArea: 'Benbrook, TX', serviceAreaLat: '32.6818', serviceAreaLng: '-97.4625', tier: 'pro', subscriptionFee: '199.00', commissionRate: '0.5500', platformFeeRate: '0.1200', referralCommissionRate: '0.0660', priorityScore: 47, rating: '4.0', reviewCount: 10, referralCount: 3, jobsLogged: 16, opportunitiesGenerated: 5, totalCommissionEarned: '1000.00', totalCommissionPaid: '800.00', weeklyLeadCap: 15, status: 'approved' },
];

// ─── DFW Addresses for jobs ──────────────────────────────────────────────────
const dfwAddresses = [
  '1234 Mockingbird Ln, Dallas, TX 75204', '5678 Oak Lawn Ave, Dallas, TX 75219',
  '9012 Preston Rd, Plano, TX 75093', '3456 Legacy Dr, Frisco, TX 75034',
  '7890 Eldorado Pkwy, McKinney, TX 75070', '2345 Collin McKinney Pkwy, McKinney, TX 75071',
  '6789 Main St, Grapevine, TX 76051', '1357 Southlake Blvd, Southlake, TX 76092',
  '2468 Keller Pkwy, Keller, TX 76248', '3579 Precinct Line Rd, Hurst, TX 76054',
  '4680 Hulen St, Fort Worth, TX 76132', '5791 Camp Bowie Blvd, Fort Worth, TX 76116',
  '6802 Abrams Rd, Dallas, TX 75231', '7913 Garland Rd, Dallas, TX 75218',
  '8024 Skillman St, Dallas, TX 75243', '9135 Greenville Ave, Dallas, TX 75206',
  '1246 Inwood Rd, Dallas, TX 75209', '2357 Northwest Hwy, Dallas, TX 75220',
  '3468 Forest Ln, Dallas, TX 75234', '4579 Josey Ln, Carrollton, TX 75006',
  '5680 Belt Line Rd, Addison, TX 75001', '6791 Midway Rd, Farmers Branch, TX 75234',
  '7802 MacArthur Blvd, Irving, TX 75063', '8913 Las Colinas Blvd, Irving, TX 75039',
  '9024 Pioneer Dr, Irving, TX 75061', '1135 Rochelle Rd, Mansfield, TX 76063',
  '2246 Broad St, Mansfield, TX 76063', '3357 Matlock Rd, Arlington, TX 76015',
  '4468 Cooper St, Arlington, TX 76015', '5579 Collins St, Arlington, TX 76011',
  '6680 Fielder Rd, Arlington, TX 76013', '7791 Park Row Dr, Arlington, TX 76013',
  '8802 Sublett Rd, Arlington, TX 76017', '9913 Bowman Springs Rd, Arlington, TX 76017',
  '1024 Westpark Way, Euless, TX 76040', '2135 Harwood Rd, Bedford, TX 76021',
  '3246 Central Dr, Bedford, TX 76022', '4357 Brown Trail, Bedford, TX 76022',
  '5468 Cheek-Sparger Rd, Colleyville, TX 76034', '6579 Glade Rd, Colleyville, TX 76034',
  '7680 Murphy Rd, Murphy, TX 75094', '8791 FM 544, Wylie, TX 75098',
  '9802 Ballard Ave, Wylie, TX 75098', '1913 Rowlett Rd, Rowlett, TX 75088',
  '2024 Lakeview Pkwy, Rowlett, TX 75088', '3135 Sachse Rd, Sachse, TX 75048',
  '4246 Ranch Rd, Rockwall, TX 75032', '5357 Yellow Jacket Ln, Rockwall, TX 75087',
  '6468 FM 740, Heath, TX 75032', '7579 Horizon Rd, Rockwall, TX 75032',
];

const serviceTypes = ['Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Landscaping', 'Painting', 'Flooring', 'Pest Control', 'Pool & Spa', 'Fence', 'Gutters', 'Foundation Repair', 'Windows & Doors', 'Concrete', 'Drywall'];

const opportunityTypes = [
  { type: 'roof_damage', category: 'Roofing', desc: 'Visible shingle damage and granule loss detected. Estimated 15-20% of roof surface affected.' },
  { type: 'hvac_aging', category: 'HVAC', desc: 'HVAC condenser unit shows rust and age indicators consistent with 12+ year old system.' },
  { type: 'gutter_overflow', category: 'Gutters', desc: 'Gutter overflow staining visible on fascia board. Gutters appear clogged or undersized.' },
  { type: 'siding_damage', category: 'Siding & Stucco', desc: 'Cracked and peeling siding panels detected on south-facing wall.' },
  { type: 'driveway_cracks', category: 'Concrete & Masonry', desc: 'Multiple expansion joint cracks and surface spalling visible in driveway.' },
  { type: 'fence_leaning', category: 'Fence & Gate', desc: 'Wood privacy fence showing lean and rot at post bases.' },
  { type: 'window_seal_failure', category: 'Windows & Doors', desc: 'Fogging between window panes indicates seal failure on multiple units.' },
  { type: 'paint_peeling', category: 'Painting', desc: 'Exterior paint peeling and chalking on trim and soffits.' },
  { type: 'landscape_overgrowth', category: 'Landscaping', desc: 'Overgrown shrubs and trees encroaching on roofline and foundation.' },
  { type: 'pool_equipment', category: 'Pool & Spa', desc: 'Pool equipment pad shows aging pump and filter system.' },
  { type: 'foundation_crack', category: 'Foundation Repair', desc: 'Stair-step cracks in brick veneer suggest foundation movement.' },
  { type: 'electrical_panel', category: 'Electrical', desc: 'Older electrical panel visible — potential upgrade candidate for EV charging or solar.' },
  { type: 'insulation_gap', category: 'Insulation', desc: 'Attic access hatch visible without insulation cover — likely energy loss.' },
  { type: 'deck_weathering', category: 'Decks & Patios', desc: 'Wood deck showing significant weathering, graying, and loose boards.' },
  { type: 'chimney_mortar', category: 'Chimney & Fireplace', desc: 'Chimney mortar joints showing deterioration and spalling.' },
];

// ─── Seed Partners ───────────────────────────────────────────────────────────
console.log('Seeding 50 DFW partners...');
const partnerIds = [];

for (const p of dfwPartners) {
  const [result] = await conn.execute(
    `INSERT INTO partners (businessName, businessType, serviceArea, serviceAreaLat, serviceAreaLng, serviceRadiusMiles, contactName, contactEmail, contactPhone, status, tier, subscriptionFee, commissionRate, platformFeeRate, referralCommissionRate, priorityScore, rating, reviewCount, referralCount, jobsLogged, opportunitiesGenerated, totalCommissionEarned, totalCommissionPaid, weeklyLeadCap, isExempt, appliedAt, approvedAt) VALUES (?, ?, ?, ?, ?, 20, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [p.businessName, p.businessType, p.serviceArea, p.serviceAreaLat, p.serviceAreaLng, p.contactName, p.contactEmail, p.contactPhone, p.status, p.tier, p.subscriptionFee, p.commissionRate, p.platformFeeRate, p.referralCommissionRate, p.priorityScore, p.rating, p.reviewCount, p.referralCount, p.jobsLogged, p.opportunitiesGenerated, p.totalCommissionEarned, p.totalCommissionPaid, p.weeklyLeadCap, p.isExempt ? 1 : 0]
  );
  partnerIds.push(result.insertId);
  process.stdout.write('.');
}
console.log(`\n✓ Seeded ${partnerIds.length} partners`);

// ─── Seed Jobs ───────────────────────────────────────────────────────────────
console.log('Seeding 200 jobs...');
const jobIds = [];
const now = new Date();

for (let i = 0; i < 200; i++) {
  const partnerId = partnerIds[Math.floor(Math.random() * (partnerIds.length - 1))]; // exclude Scoop Duke
  const address = dfwAddresses[i % dfwAddresses.length];
  const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
  const daysAgo = Math.floor(Math.random() * 180); // last 6 months
  const createdAt = new Date(now.getTime() - daysAgo * 86400000);
  const status = Math.random() > 0.3 ? 'analyzed' : 'opportunities_sent';
  
  const [result] = await conn.execute(
    `INSERT INTO jobs (partnerId, serviceAddress, serviceType, notes, photoUrls, aiAnalysisStatus, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 'complete', ?, ?, ?)`,
    [partnerId, address, serviceType, `${serviceType} service completed. Photos taken for AI analysis.`, JSON.stringify([`https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800`]), status, createdAt, createdAt]
  );
  jobIds.push({ id: result.insertId, partnerId, address, createdAt });
  if (i % 20 === 0) process.stdout.write('.');
}
console.log(`\n✓ Seeded ${jobIds.length} jobs`);

// ─── Seed Opportunities ──────────────────────────────────────────────────────
console.log('Seeding 300 AI-detected opportunities...');
let oppCount = 0;

for (let i = 0; i < 300; i++) {
  const job = jobIds[Math.floor(Math.random() * jobIds.length)];
  const opp = opportunityTypes[Math.floor(Math.random() * opportunityTypes.length)];
  const receivingIdx = Math.floor(Math.random() * (partnerIds.length - 1));
  const receivingPartnerId = partnerIds[receivingIdx];
  const confidence = (0.65 + Math.random() * 0.34).toFixed(3);
  const estimatedValue = (800 + Math.floor(Math.random() * 8200)).toFixed(2);
  const platformFee = (parseFloat(estimatedValue) * 0.12).toFixed(2);
  const referralComm = (parseFloat(estimatedValue) * 0.12 * 0.55).toFixed(2);
  const prolinkNet = (parseFloat(platformFee) - parseFloat(referralComm)).toFixed(2);
  
  const rand = Math.random();
  let status, adminReviewStatus;
  if (rand < 0.15) { status = 'pending'; adminReviewStatus = 'pending_review'; }
  else if (rand < 0.25) { status = 'pending'; adminReviewStatus = 'approved'; }
  else if (rand < 0.40) { status = 'sent'; adminReviewStatus = 'approved'; }
  else if (rand < 0.55) { status = 'accepted'; adminReviewStatus = 'approved'; }
  else if (rand < 0.65) { status = 'declined'; adminReviewStatus = 'approved'; }
  else if (rand < 0.80) { status = 'converted'; adminReviewStatus = 'approved'; }
  else if (rand < 0.85) { status = 'expired'; adminReviewStatus = 'approved'; }
  else { status = 'pending'; adminReviewStatus = 'rejected'; }

  const daysAgo = Math.floor(Math.random() * 150);
  const createdAt = new Date(now.getTime() - daysAgo * 86400000);

  await conn.execute(
    `INSERT INTO opportunities (jobId, sourcePartnerId, receivingPartnerId, opportunityType, opportunityCategory, description, aiConfidence, status, adminReviewStatus, estimatedJobValue, platformFeeAmount, referralCommissionAmount, proLinkNetAmount, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [job.id, job.partnerId, receivingPartnerId, opp.type, opp.category, opp.desc, confidence, status, adminReviewStatus, estimatedValue, platformFee, referralComm, prolinkNet, createdAt, createdAt]
  );
  oppCount++;
  if (i % 30 === 0) process.stdout.write('.');
}
console.log(`\n✓ Seeded ${oppCount} opportunities`);

await conn.end();
console.log('\n🎉 W23 Complete — DFW demo data seeded successfully!');
console.log(`   Partners: ${partnerIds.length}`);
console.log(`   Jobs: ${jobIds.length}`);
console.log(`   Opportunities: ${oppCount}`);
