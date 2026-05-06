import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";

// Pages
import Home from "@/pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ApiDocs from "./pages/ApiDocs";
import TermsOfService from "@/pages/TermsOfService";
import CCPARights from "@/pages/legal/CCPARights";
import CookiePolicy from "@/pages/legal/CookiePolicy";
import Demo from "@/pages/Demo";
import Apply from "./pages/Apply";
import ApplicationStatus from "./pages/ApplicationStatus";
import SetPassword from "./pages/SetPassword";
import PartnerDashboard from "./pages/PartnerDashboard";
import InboundLeads from "./pages/InboundLeads";
import MyReferrals from "./pages/MyReferrals";
import ProLnkApp from "./pages/ProLnkApp";
import AdminDashboard from "./pages/AdminDashboard";
import LogJob from "./pages/LogJob";
import PartnerDirectory from "./pages/PartnerDirectory";
import PartnerSpotlight from "./pages/PartnerSpotlight";
import AdminCommissionRates from "./pages/AdminCommissionRates";
import AdminOpportunityFeed from "./pages/AdminOpportunityFeed";
import GoogleReviews from "./pages/admin/GoogleReviews";
import Payouts from "./pages/admin/Payouts";
import PaymentArchitecture from "./pages/admin/PaymentArchitecture";
import PartnerVerification from "./pages/admin/PartnerVerification";
import PlatformHealth from "./pages/admin/PlatformHealth";
import ActivityLog from "./pages/admin/ActivityLog";
import TrustyProLeads from "./pages/admin/TrustyProLeads";
import TrustyProOverview from "./pages/admin/TrustyProOverview";
import TrustyProScans from "./pages/admin/TrustyProScans";
import KnowledgeGraph from "./pages/admin/KnowledgeGraph";
import BusinessPacket from "./pages/admin/BusinessPacket";
import TrustyProAgentsPage from "./pages/admin/TrustyProAgents";
import TrustyProOrgChartPage from "./pages/admin/TrustyProOrgChart";
import TrustyProRevenuePage from "./pages/admin/TrustyProRevenue";
import MediaAgentsPage from "./pages/admin/MediaAgents";
import MediaOrgChartPage from "./pages/admin/MediaOrgChart";
import MediaRevenuePage from "./pages/admin/MediaRevenue";
import PartnerAnalytics from "./pages/PartnerAnalytics";
import PerformanceAlerts from "./pages/PerformanceAlerts";
import AIChatAssistant from "./pages/AIChatAssistant";
import EarningsTracker from "./pages/EarningsTracker";
import WhatsNew from "./pages/WhatsNew";
import PartnerProfileEditor from "./pages/PartnerProfileEditor";
import AdminSetup from "./pages/AdminSetup";
import JobHistory from "./pages/JobHistory";
import PartnerReviews from "./pages/PartnerReviews";

// Wave pages -- Partner Portal
import CommissionLedger from "./pages/CommissionLedger";
import Onboarding from "./pages/Onboarding";
import PhotoUpload from "./pages/PhotoUpload";
import PhotoGuidelines from "./pages/PhotoGuidelines";
import NetworkFeed from "./pages/NetworkFeed";
import TierProgress from "./pages/TierProgress";
import ReferralLink from "./pages/ReferralLink";
import ReferralHub from "./pages/dashboard/ReferralHub";
import ReferralFunnelTracker from "./pages/ReferralFunnelTracker";
import TierUpgradeFlow from "./pages/TierUpgradeFlow";
import Notifications from "./pages/Notifications";
import NotificationPreferences from "./pages/NotificationPreferences";
import IntegrationSettings from "./pages/IntegrationSettings";
import PartnerSettings from "./pages/PartnerSettings";
import FieldApp from "./pages/FieldApp";
import FieldOS from "./pages/fieldos/FieldOS";

// Wave pages -- Admin
import Leaderboard from "./pages/admin/Leaderboard";
import LeadScoring from "./pages/admin/LeadScoring";
import HeatMap from "./pages/admin/HeatMap";
import Analytics from "./pages/admin/Analytics";
import OpportunityDetector from "./pages/admin/OpportunityDetector";
import GrowthEngine from "./pages/admin/GrowthEngine";

// Wave 2 -- Integration & Adoption pages
import ServiceTitanMarketplace from "./pages/admin/ServiceTitanMarketplace";
import JobberIntegration from "./pages/admin/JobberIntegration";
import HousecallProIntegration from "./pages/admin/HousecallProIntegration";
import FieldAppV2 from "./pages/FieldAppV2";
import OnboardingWizard from "./pages/OnboardingWizard";
import AutoApproval from "./pages/admin/AutoApproval";
import IntegrationHealth from "./pages/admin/IntegrationHealth";
import PhotoPipeline from "./pages/admin/PhotoPipeline";
import CompanyCamSync from "./pages/admin/CompanyCamSync";
import MassAdoption from "./pages/admin/MassAdoption";
import CompanyCamGuide from "./pages/admin/CompanyCamGuide";

// Brain Trust build -- new pages
import ReferralPipeline from "@/pages/admin/ReferralPipeline";
import DataIntelligence from "@/pages/admin/DataIntelligence";
import CommSequence from "./pages/admin/CommSequence";
import InfographicShowcase from "./pages/InfographicShowcase";
import JobCompletion from "./pages/JobCompletion";

// New Admin Command Center pages
import CommandCenter from "./pages/admin/CommandCenter";
import PortfolioDashboard from "./pages/admin/PortfolioDashboard";
import StrategicOverview from "./pages/admin/StrategicOverview";
import HomeIntelligence from "./pages/admin/HomeIntelligence";
import NetworkMap from "./pages/admin/NetworkMap";
import PartnerIntelligence from "./pages/admin/PartnerIntelligence";
import AIOpportunityEngine from "./pages/admin/AIOpportunityEngine";
import FinancialCenter from "./pages/admin/FinancialCenter";
import ApplicationPipeline from "./pages/admin/ApplicationPipeline";
import BroadcastCenter from "./pages/admin/BroadcastCenter";
import MarketExpansion from "./pages/admin/MarketExpansion";
import Integrations from "./pages/admin/Integrations";
import IntegrationHub from "./pages/admin/IntegrationHub";
import CommsIntegrations from "./pages/admin/CommsIntegrations";
import BuildiumIntegration from "./pages/admin/BuildiumIntegration";
import ProServicesAgreement from "./pages/admin/ProServicesAgreement";
import FsmWebhookLog from "./pages/admin/FsmWebhookLog";
import WebhookManager from "./pages/admin/WebhookManager";
import N8nSetupGuide from "./pages/admin/N8nSetupGuide";
import CommissionDisputes from "./pages/admin/CommissionDisputes";
import PhotoApprovalQueue from "./pages/admin/PhotoApprovalQueue";
import CustomerDealPage from "./pages/CustomerDealPage";
import PartnerProfile from "./pages/PartnerProfile";
import Exchange from "./pages/Exchange";
import ExchangeProfile from "./pages/ExchangeProfile";
import PublicLeaderboard from "./pages/Leaderboard";
import NetworkStats from "./pages/NetworkStats";
import DealManagement from "./pages/admin/DealManagement";
import DealPipelineKanban from "./pages/admin/DealPipelineKanban";
import DealComposer from "./pages/admin/DealComposer";
import TrustCenter from "./pages/TrustCenter";
import ServiceCategories from "./pages/admin/ServiceCategories";
import MarketingKit from "./pages/MarketingKit";
import CommsTimeline from "./pages/admin/CommsTimeline";
import PropertyTimeline from "./pages/admin/PropertyTimeline";
import PropertyReport from "./pages/admin/PropertyReport";
import PartnerReport from "./pages/admin/PartnerReport";
import SmartNotifications from "./pages/admin/SmartNotifications";
import StrikeManagement from "./pages/admin/StrikeManagement";
import HomeownerCRM from "./pages/admin/HomeownerCRM";
import AnalyticsExport from "./pages/admin/AnalyticsExport";
import ReviewPage from "./pages/ReviewPage";

// V6 -- Predictive Engine pages
import EventEngineDashboard from "./pages/admin/EventEngineDashboard";
import AIPipelineMonitor from "./pages/admin/AIPipelineMonitor";
import StormWatch from "./pages/admin/StormWatch";
import StormDashboard from "./pages/admin/StormDashboard";
import AgentStatusDashboard from "./pages/admin/AgentStatusDashboard";
import AgentTracker from "./pages/admin/AgentTracker";
import Accountability from "./pages/admin/Accountability";
import CompanyOrgChart from "./pages/admin/CompanyOrgChart";
// 7 Company-level Executive Dashboards (top-level)
import ExecutiveDashboard from "./pages/admin/dashboards/ExecutiveDashboard";
import OperationsDashboard from "./pages/admin/dashboards/OperationsDashboard";
import SalesDashboard from "./pages/admin/dashboards/SalesDashboard";
import MarketingDashboard from "./pages/admin/dashboards/MarketingDashboard";
import SupportDashboard from "./pages/admin/dashboards/SupportDashboard";
import FinancialDashboard from "./pages/admin/dashboards/FinancialDashboard";
import AIAgentsDashboard from "./pages/admin/dashboards/AIAgentsDashboard";
// ProLnk Residential per-company dashboards
import { ProLnkExecutive, ProLnkOperations, ProLnkSales, ProLnkMarketing, ProLnkSupport, ProLnkFinancial, ProLnkAgents } from "./pages/admin/dashboards/prolnk";
// TrustyPro per-company dashboards
import { TrustyProExecutive, TrustyProOperations, TrustyProSales, TrustyProMarketing, TrustyProSupport, TrustyProFinancial, TrustyProAgents } from "./pages/admin/dashboards/trustypro";
// ProLnk Media per-company dashboards
import { MediaExecutive, MediaOperations, MediaSales, MediaMarketing, MediaSupport, MediaFinancial, MediaAgents } from "./pages/admin/dashboards/media";
import AgentCommandCenter from "./pages/admin/AgentCommandCenter";
import AssetAging from "./pages/admin/AssetAging";
import SafetyRecalls from "./pages/admin/SafetyRecalls";
import DataMarketplace from "./pages/admin/DataMarketplace";
import PartnerIntegrationHealth from "./pages/admin/PartnerIntegrationHealth";

// Overnight Sprint -- new pages
import CustomerSuccess from "./pages/admin/CustomerSuccess";
import TaxReports from "./pages/admin/TaxReports";
import DisputeCenter from "./pages/DisputeCenter";
import PayoutSetup from "./pages/PayoutSetup";
import PayoutHistory from "./pages/PayoutHistory";
import UpgradeSuccess from "./pages/UpgradeSuccess";
import ComplianceDocs from "./pages/ComplianceDocs";
import TrainingHub from "./pages/TrainingHub";
import CommissionCalculator from "./pages/CommissionCalculator";
import AnalyticsDeepDive from "./pages/admin/AnalyticsDeepDive";
import HomeownerReferral from "./pages/homeowner/HomeownerReferral";
import HomeHealthVault from "./pages/homeowner/HomeHealthVault";
import ScanHistory from "./pages/homeowner/ScanHistory";
import AdminTaskList from "./pages/admin/AdminTaskList";

// Contest page
import Contest from "./pages/Contest";

// Waitlist landing pages
import ProWaitlist from "./pages/ProWaitlist";
import TrustyProWaitlistPage from "./pages/TrustyProWaitlist";
import TrustyProWaitlistStatus from "./pages/TrustyProWaitlistStatus";
import TrustyProComingSoon from "./pages/TrustyProComingSoon";
import HomeownerWaitlistForm from "./pages/HomeownerWaitlistForm";
import WaitlistManager from "./pages/admin/WaitlistManager";
import WaitlistIntelligence from "./pages/admin/WaitlistIntelligence";
import WaitlistProLanding from "./pages/WaitlistProLanding";
import WaitlistHomeLanding from "./pages/WaitlistHomeLanding";

// TrustyPro -- Homeowner Platform
import TrustyProHome from "./pages/trustypro/TrustyProHome";
import TrustyProLogin from "./pages/trustypro/TrustyProLogin";
import TrustyProWaitlist from "./pages/trustypro/TrustyProWaitlist";
import PhotoScan from "./pages/trustypro/PhotoScan";
import TrustyProDirectory from "./pages/homeowner/TrustyProDirectory";
import HomeownerDashboard from "./pages/homeowner/HomeownerDashboard";
import HomeownerOffers from "./pages/homeowner/HomeownerOffers";
import HomeownerPhotos from "./pages/homeowner/HomeownerPhotos";
import HomeownerMessages from "./pages/homeowner/HomeownerMessages";
import HomeownerInvoices from "./pages/homeowner/HomeownerInvoices";
import HomeownerPros from "./pages/homeowner/HomeownerPros";
import HomeownerProperty from "./pages/homeowner/HomeownerProperty";
import HomeownerSetup from "./pages/homeowner/HomeownerSetup";
import HomeSetupWizard from "./pages/homeowner/HomeSetupWizard";
import HomeownerQuickStart from "./pages/homeowner/HomeownerQuickStart";
import HomeownerReviews from "./pages/homeowner/HomeownerReviews";
import HomeownerProfile from "./pages/homeowner/HomeownerProfile";
import HomeownerPrivacy from "./pages/homeowner/HomeownerPrivacy";
import HomeownerRequestPro from "./pages/homeowner/HomeownerRequestPro";
import HomeownerFavorites from "./pages/homeowner/HomeownerFavorites";
import BeforeAfterGenerator from "./pages/homeowner/BeforeAfterGenerator";
import HomeownerProjects from "./pages/homeowner/HomeownerProjects";
import HomeownerTimeline from "./pages/homeowner/HomeownerTimeline";
import NpsSurvey from "./pages/NpsSurvey";

import BusinessPlan from "./pages/admin/BusinessPlan";
import InvestorDashboard from "./pages/admin/InvestorDashboard";
import PatentDisclosure from "./pages/admin/PatentDisclosure";
import CampaignCenter from "./pages/admin/CampaignCenter";
import MarketingAutomationDashboard from "./pages/admin/MarketingAutomationDashboard";
import PlatformSettings from "./pages/admin/PlatformSettings";
import PartnerAgreement from "./pages/PartnerAgreement";
import TerritoryMarketplace from "./pages/admin/TerritoryMarketplace";
import B2BDataExchange from "./pages/admin/B2BDataExchange";
import EnterpriseIntegrations from "./pages/admin/EnterpriseIntegrations";
import PropertyConditionReports from "./pages/admin/PropertyConditionReports";
import AIRetraining from "./pages/admin/AIRetraining";
import RealEstateAgents from "./pages/admin/RealEstateAgents";
import InsuranceClaims from "./pages/admin/InsuranceClaims";
import FeaturedAdvertisersAdmin from "./pages/admin/FeaturedAdvertisers";
import AdvertisingPreview from "./pages/admin/AdvertisingPreview";
import UnifiedInbox from "./pages/UnifiedInbox";
import JobSchedule from "./pages/JobSchedule";
import CommissionRates from "./pages/CommissionRates";
import CommissionStrategy from "./pages/admin/CommissionStrategy";
import TrustedProAlgorithm from "./pages/admin/TrustedProAlgorithm";
import Pricing from "./pages/Pricing";
import PhotoQueue from "./pages/admin/PhotoQueue";
import BundleOffers from "./pages/admin/BundleOffers";
import ApiCreditsGuide from "./pages/admin/ApiCreditsGuide";
import PaymentFlowDiagrams from "./pages/admin/PaymentFlowDiagrams";

// V12 + 20-feature build
import ProjectGallery from "./pages/trustypro/ProjectGallery";
import ProLnkExchangeCommercial from "./pages/ProLnkExchangeCommercial";
import AchAuthorizationPage from "./pages/AchAuthorizationPage";
import MilestoneTracker from "./pages/homeowner/MilestoneTracker";
import GrowthCalculator from "./pages/GrowthCalculator";
import CommunityForum from "./pages/CommunityForum";
import TrueCostGuide from "./pages/homeowner/TrueCostGuide";
import MaintenanceSchedule from "./pages/homeowner/MaintenanceSchedule";
import SavingsTracker from "./pages/homeowner/SavingsTracker";
import HomeValueImpact from "./pages/homeowner/HomeValueImpact";
import PartnerLeaderboard from "./pages/PartnerLeaderboard";
import PartnerHealthDashboard from "./pages/admin/PartnerHealthDashboard";
import GeoExpansionMap from "./pages/admin/GeoExpansionMap";
import RevenueForecast from "./pages/admin/RevenueForecast";
import LeadQualityCenter from "./pages/admin/LeadQualityCenter";
import HomeAssistant from "./pages/homeowner/HomeAssistant";
import HomeDiagnostic from "./pages/homeowner/HomeDiagnostic";
import SkillsMarketplace from "./pages/SkillsMarketplace";
import TrainingAcademy from "./pages/TrainingAcademy";
import JobMatchingPreferences from "./pages/JobMatchingPreferences";
import ReviewManagement from "./pages/ReviewManagement";
import QuoteGenerator from "./pages/QuoteGenerator";
import PerformanceReport from "./pages/PerformanceReport";
import AvailabilityCalendar from "./pages/AvailabilityCalendar";
import UpsellPlaybook from "./pages/UpsellPlaybook";
import ProposalBuilder from "./pages/ProposalBuilder";
import NetworkingEvents from "./pages/NetworkingEvents";
import TaxEstimator from "./pages/TaxEstimator";
import ContractorComparison from "./pages/homeowner/ContractorComparison";
import SeasonalPrepGuide from "./pages/homeowner/SeasonalPrepGuide";
import NotificationSettings from "./pages/homeowner/NotificationSettings";
import DocumentVault from "./pages/homeowner/DocumentVault";
import ReferralProgram from "./pages/homeowner/ReferralProgram";
import EmergencyServices from "./pages/homeowner/EmergencyServices";
import NeighborhoodDeals from "./pages/homeowner/NeighborhoodDeals";
import PropertyComparison from "./pages/homeowner/PropertyComparison";
import JobTimeline from "./pages/homeowner/JobTimeline";
import ChurnPrediction from "./pages/admin/ChurnPrediction";
import TierUpgradeCenter from "./pages/admin/TierUpgradeCenter";
import ContentManagement from "./pages/admin/ContentManagement";
import AdminPartnerContent from "./pages/admin/AdminPartnerContent";
import OnboardingFunnel from "./pages/admin/OnboardingFunnel";
import ABTestManager from "./pages/admin/ABTestManager";
import NPSSurveyManager from "./pages/admin/NPSSurveyManager";
import CoverageZones from "./pages/admin/FranchiseTerritories";
import AdminPayoutHistory from "./pages/admin/PayoutHistory";
import SeasonalCampaigns from "./pages/admin/SeasonalCampaigns";
import PaymentMonitor from "./pages/admin/PaymentMonitor";
import AdminCoverageMap from "./pages/admin/AdminCoverageMap";
import PlatformIntelligence from "@/pages/admin/PlatformIntelligence";
import CompetitorIntelligence from "@/pages/admin/CompetitorIntelligence";
import TaskManager from "@/pages/admin/TaskManager";
import OnboardingChecklist from "@/pages/OnboardingChecklist";
import ServiceAreaManager from "@/pages/ServiceAreaManager";
import QuickQuoteRequest from "@/pages/homeowner/QuickQuoteRequest";
import RoomMakeover from "@/pages/homeowner/RoomMakeover";
import PartnerQuoteInbox from "@/pages/PartnerQuoteInbox";
import Partner360Profile from "@/pages/Partner360Profile";
import Homeowner360Profile from "@/pages/homeowner/Homeowner360Profile";
import Admin360Members from "@/pages/admin/Admin360Members";
import AgentPortal from "@/pages/AgentPortal";
import ResourceCenter from "@/pages/ResourceCenter";
import BillingPortal from "@/pages/BillingPortal";
import ProLnkMedia from "@/pages/ProLnkMedia";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import SecurityTrustCenter from "@/pages/SecurityTrustCenter";
import PhotoAccessLog from "@/pages/admin/PhotoAccessLog";
import PartnerCheckIns from "./pages/admin/PartnerCheckIns";
import PartnerSpotlightsAdmin from "./pages/admin/PartnerSpotlights";
import NotificationCenterAdmin from "./pages/admin/NotificationCenter";
import AutomationRulesEngine from "./pages/admin/AutomationRulesEngine";
import MediaLibraryAdmin from "./pages/admin/MediaLibraryAdmin";
import SeasonalMaintenanceAdmin from "./pages/admin/SeasonalMaintenanceAdmin";
import IntegrationWebhookDashboard from "./pages/admin/IntegrationWebhookDashboard";

// Wave 14: Content & Marketing
import Blog from "./pages/Blog";
import HowAIWorks from "./pages/HowAIWorks";
import ForRealEstateAgents from "./pages/ForRealEstateAgents";
import ForInsuranceAgents from "./pages/ForInsuranceAgents";
import ForPropertyManagers from "./pages/ForPropertyManagers";

// Wave 33: Multi-Property
import LandlordView from "./pages/homeowner/LandlordView";
import PropertyPortfolio from "./pages/homeowner/PropertyPortfolio";

// Wave 34: Insurance
import InsuranceCarrierDB from "./pages/admin/InsuranceCarrierDB";
import InsuranceClaimAssistant from "./pages/homeowner/InsuranceClaimAssistant";
import InsuranceCoverageChecker from "./pages/homeowner/InsuranceCoverageChecker";

// Wave 35: Agent Portal
import AgentSignup from "./pages/AgentSignup";
import AgentDashboard from "./pages/AgentDashboard";
import PreListingScan from "./pages/PreListingScan";

// Wave 36: Warranty
import WarrantyTracker from "./pages/homeowner/WarrantyTracker";

// Wave 38: Partner Training
import PartnerResourceCenter from "./pages/PartnerResourceCenter";
import PhotoGuide from "./pages/PhotoGuide";
import MaximizeEarnings from "./pages/MaximizeEarnings";
import PartnerFAQ from "./pages/PartnerFAQ";
import PartnerSuccessStories from "./pages/PartnerSuccessStories";

// Wave 40: Data Visualization
import DashboardBuilder from "./pages/admin/DashboardBuilder";
import ReportGenerator from "./pages/admin/ReportGenerator";
import ScheduledReports from "./pages/admin/ScheduledReports";
import KPITracker from "./pages/admin/KPITracker";

// Wave 16-30 Pages
import CheckInSystem from "./pages/homeowner/CheckInSystem";
import LeadInbox from "./pages/LeadInbox";
import LeadDetail from "./pages/LeadDetail";
import JobDocumentation from "./pages/JobDocumentation";
import MonthlyRevenueReport from "./pages/admin/MonthlyRevenueReport";
import TradeRevenueBreakdown from "./pages/admin/TradeRevenueBreakdown";
import AskAPro from "./pages/homeowner/AskAPro";
import BulkOperations from "./pages/admin/BulkOperations";
import ConversionFunnel from "./pages/admin/ConversionFunnel";
import TierBenefits from "./pages/TierBenefits";
import ContentLibrary from "./pages/ContentLibrary";
import ApiKeyManagement from "./pages/admin/ApiKeyManagement";

// Wave 31-45 Pages
import MobileOptimization from "./pages/admin/MobileOptimization";
import AccessibilitySettings from "./pages/admin/AccessibilitySettings";
import ErrorMonitoring from "./pages/admin/ErrorMonitoring";
import PerformanceMonitoring from "./pages/admin/PerformanceMonitoring";
import Documentation from "./pages/Documentation";

// Domain-based routing: trustypro.io → /trustypro
function DomainRouter() {
  const [location, navigate] = useLocation();
  useEffect(() => {
    const hostname = window.location.hostname;
    const isTrustyPro =
      hostname === "trustypro.io" ||
      hostname === "www.trustypro.io" ||
      hostname.endsWith(".trustypro.io");
    if (isTrustyPro) {
      // Allow /waitlist/* paths to work directly on trustypro.io (homeowner waitlist)
      if (location.startsWith("/waitlist")) return;
      // Allow /trustypro/* paths through
      if (location.startsWith("/trustypro")) return;
      // Redirect root and all other paths to /trustypro
      navigate("/trustypro", { replace: true });
    }
  }, [location, navigate]);
  return null;
}

// Redirect /login  OAuth login URL
function LoginRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    window.location.href = getLoginUrl();
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      {/* Public -- smooth scroll landing pages */}
      <Route path="/">
        <SmoothScrollProvider><Home /></SmoothScrollProvider>
      </Route>
      <Route path="/demo" component={Demo} />
      <Route path="/apply" component={Apply} />
      <Route path="/application-status" component={ApplicationStatus} />
      <Route path="/set-password" component={SetPassword} />
      <Route path="/pro-waitlist" component={ProWaitlist} />
      <Route path="/home-waitlist" component={HomeownerWaitlistForm} />
      <Route path="/join" component={HomeownerWaitlistForm} />
      <Route path="/waitlist/pro" component={ProWaitlist} />
      <Route path="/waitlist/homeowner" component={TrustyProWaitlistPage} />
      <Route path="/waitlist/homeowner/status" component={TrustyProWaitlistStatus} />
      <Route path="/contest" component={Contest} />
      <Route path="/partners" component={PartnerDirectory} />
      <Route path="/pro/:id" component={PartnerSpotlight} />
      <Route path="/login" component={LoginRedirect} />

      {/* Partner */}
      <Route path="/dashboard" component={PartnerDashboard} />
      <Route path="/dashboard/leads" component={InboundLeads} />
      <Route path="/dashboard/referrals" component={MyReferrals} />
      <Route path="/job/new" component={LogJob} />
      <Route path="/jobs" component={JobHistory} />
      <Route path="/dashboard/reviews" component={PartnerReviews} />
      <Route path="/dashboard/commissions" component={CommissionLedger} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/job/photo" component={PhotoUpload} />
      <Route path="/dashboard/photo-guidelines" component={PhotoGuidelines} />
      <Route path="/dashboard/feed" component={NetworkFeed} />
      <Route path="/dashboard/tier" component={TierProgress} />
      <Route path="/dashboard/analytics" component={PartnerAnalytics} />
      <Route path="/dashboard/alerts" component={PerformanceAlerts} />
      <Route path="/dashboard/ai" component={AIChatAssistant} />
      <Route path="/dashboard/earnings" component={EarningsTracker} />
      <Route path="/dashboard/whats-new" component={WhatsNew} />
      <Route path="/dashboard/profile" component={PartnerProfileEditor} />
      <Route path="/dashboard/referral" component={ReferralLink} />
      <Route path="/dashboard/growth/referral-hub" component={ReferralHub} />
      <Route path="/dashboard/referral-hub" component={ReferralHub} />
      <Route path="/dashboard/referral-funnel" component={ReferralFunnelTracker} />
      <Route path="/dashboard/recruit" component={ReferralFunnelTracker} />
      <Route path="/dashboard/upgrade" component={TierUpgradeFlow} />
      <Route path="/dashboard/notifications" component={Notifications} />
      <Route path="/dashboard/notification-preferences" component={NotificationPreferences} />
      <Route path="/dashboard/integrations" component={IntegrationSettings} />
      <Route path="/dashboard/settings" component={PartnerSettings} />
      <Route path="/dashboard/inbox" component={UnifiedInbox} />
      <Route path="/dashboard/schedule" component={JobSchedule} />
      <Route path="/dashboard/commission-rates" component={CommissionRates} />
      <Route path="/dashboard/exchange" component={Exchange} />
      <Route path="/dashboard/exchange/profile/:id" component={ExchangeProfile} />
      <Route path="/dashboard/exchange/profile" component={ExchangeProfile} />
      <Route path="/field" component={FieldApp} />
      <Route path="/field-os" component={FieldOS} />
      <Route path="/app" component={ProLnkApp} />

      {/* Admin -- Legacy */}
      <Route path="/admin/legacy" component={AdminDashboard} />
      <Route path="/admin/setup" component={AdminSetup} />
      <Route path="/admin/google-reviews" component={GoogleReviews} />
      <Route path="/admin/verification" component={PartnerVerification} />
      <Route path="/admin/health" component={PlatformHealth} />
      <Route path="/admin/activity" component={ActivityLog} />
      <Route path="/admin/activity-logs" component={ActivityLog} />
      <Route path="/admin/rates" component={AdminCommissionRates} />
      <Route path="/admin/opportunities-old" component={AdminOpportunityFeed} />

      {/* Admin Command Center */}
      <Route path="/admin" component={CommandCenter} />
      <Route path="/admin/dashboard" component={PortfolioDashboard} />
      <Route path="/admin/prolnk/overview" component={CommandCenter} />
      <Route path="/admin/trustypro/overview" component={TrustyProOverview} />
      <Route path="/admin/strategic-overview" component={StrategicOverview} />
      <Route path="/admin/map" component={NetworkMap} />
      <Route path="/admin/partners" component={PartnerIntelligence} />
      <Route path="/admin/ai" component={AIOpportunityEngine} />
      <Route path="/admin/opportunities" component={AIOpportunityEngine} />
      <Route path="/admin/finance" component={FinancialCenter} />
      <Route path="/admin/payouts" component={Payouts} />
      <Route path="/admin/payment-architecture" component={PaymentArchitecture} />
      <Route path="/admin/pipeline" component={ApplicationPipeline} />
      <Route path="/admin/broadcast" component={BroadcastCenter} />
      <Route path="/admin/market" component={MarketExpansion} />
      <Route path="/admin/integrations" component={Integrations} />
      <Route path="/admin/agreements" component={ProServicesAgreement} />
      <Route path="/admin/fsm-webhooks" component={FsmWebhookLog} />
      <Route path="/admin/n8n-webhooks" component={WebhookManager} />
      <Route path="/admin/n8n-setup" component={N8nSetupGuide} />
      <Route path="/admin/n8n" component={N8nSetupGuide} />
      <Route path="/admin/disputes" component={CommissionDisputes} />
      <Route path="/admin/deals" component={DealManagement} />
      <Route path="/admin/deal-pipeline" component={DealPipelineKanban} />
      <Route path="/admin/deal-composer" component={DealComposer} />
      <Route path="/trust" component={TrustCenter} />
      <Route path="/admin/categories" component={ServiceCategories} />
      <Route path="/dashboard/marketing-kit" component={MarketingKit} />
      <Route path="/admin/comms" component={CommsTimeline} />
      <Route path="/admin/properties" component={PropertyTimeline} />
      <Route path="/admin/properties/:address/report" component={PropertyReport} />
      <Route path="/admin/partners/:id/report" component={PartnerReport} />
      <Route path="/admin/smart-notifications" component={SmartNotifications} />
      <Route path="/admin/leaderboard" component={Leaderboard} />
      <Route path="/admin/lead-scoring" component={LeadScoring} />
      <Route path="/admin/heatmap" component={HeatMap} />
      <Route path="/admin/analytics" component={Analytics} />
      <Route path="/admin/detector" component={OpportunityDetector} />
      <Route path="/admin/growth" component={GrowthEngine} />
      <Route path="/admin/referral-pipeline" component={ReferralPipeline} />
      <Route path="/admin/data-intelligence" component={DataIntelligence} />
      <Route path="/admin/competitor-intelligence" component={CompetitorIntelligence} />
      <Route path="/admin/platform-settings" component={PlatformSettings} />
      <Route path="/admin/comm-sequence" component={CommSequence} />
      <Route path="/admin/trustypro-leads" component={TrustyProLeads} />
      <Route path="/admin/trustypro" component={TrustyProOverview} />
      <Route path="/admin/trustypro-scans" component={TrustyProScans} />
      <Route path="/admin/photo-access-log" component={PhotoAccessLog} />
      <Route path="/admin/home-intelligence" component={HomeIntelligence} />
      <Route path="/admin/knowledge-graph" component={KnowledgeGraph} />
      <Route path="/admin/business-packet" component={BusinessPacket} />
      <Route path="/admin/tp-agents" component={TrustyProAgentsPage} />
      <Route path="/admin/tp-org-chart" component={TrustyProOrgChartPage} />
      <Route path="/admin/tp-revenue" component={TrustyProRevenuePage} />
      <Route path="/admin/media-agents" component={MediaAgentsPage} />
      <Route path="/admin/media-org-chart" component={MediaOrgChartPage} />
      <Route path="/admin/media-revenue" component={MediaRevenuePage} />

      {/* 7 Top-level Executive Dashboards */}
      <Route path="/admin/dashboard/executive"  component={ExecutiveDashboard} />
      <Route path="/admin/dashboard/operations" component={OperationsDashboard} />
      <Route path="/admin/dashboard/sales"      component={SalesDashboard} />
      <Route path="/admin/dashboard/marketing"  component={MarketingDashboard} />
      <Route path="/admin/dashboard/support"    component={SupportDashboard} />
      <Route path="/admin/dashboard/financial"  component={FinancialDashboard} />
      <Route path="/admin/dashboard/agents"     component={AIAgentsDashboard} />

      {/* ProLnk Residential — 7 company dashboards */}
      <Route path="/admin/prolnk/executive"   component={ProLnkExecutive}   />
      <Route path="/admin/prolnk/operations"  component={ProLnkOperations}  />
      <Route path="/admin/prolnk/sales"       component={ProLnkSales}       />
      <Route path="/admin/prolnk/marketing"   component={ProLnkMarketing}   />
      <Route path="/admin/prolnk/support"     component={ProLnkSupport}     />
      <Route path="/admin/prolnk/financial"   component={ProLnkFinancial}   />
      <Route path="/admin/prolnk/agents"      component={ProLnkAgents}      />

      {/* TrustyPro — 7 company dashboards */}
      <Route path="/admin/tp/executive"       component={TrustyProExecutive}   />
      <Route path="/admin/tp/operations"      component={TrustyProOperations}  />
      <Route path="/admin/tp/sales"           component={TrustyProSales}       />
      <Route path="/admin/tp/marketing"       component={TrustyProMarketing}   />
      <Route path="/admin/tp/support"         component={TrustyProSupport}     />
      <Route path="/admin/tp/financial"       component={TrustyProFinancial}   />
      <Route path="/admin/tp/agents"          component={TrustyProAgents}      />

      {/* ProLnk Media — 7 company dashboards */}
      <Route path="/admin/media-dash/executive"  component={MediaExecutive}   />
      <Route path="/admin/media-dash/operations" component={MediaOperations}  />
      <Route path="/admin/media-dash/sales"      component={MediaSales}       />
      <Route path="/admin/media-dash/marketing"  component={MediaMarketing}   />
      <Route path="/admin/media-dash/support"    component={MediaSupport}     />
      <Route path="/admin/media-dash/financial"  component={MediaFinancial}   />
      <Route path="/admin/media-dash/agents"     component={MediaAgents}      />

      {/* V6 -- Predictive Engine */}
      <Route path="/admin/predict" component={EventEngineDashboard} />
      <Route path="/admin/ai-pipeline" component={AIPipelineMonitor} />
      <Route path="/admin/storm-watch" component={StormWatch} />
      <Route path="/admin/storm" component={StormDashboard} />
      <Route path="/admin/agents" component={AgentTracker} />
      <Route path="/admin/org-chart" component={CompanyOrgChart} />
      <Route path="/admin/accountability" component={Accountability} />
      <Route path="/admin/agent-command-center" component={AgentCommandCenter} />
      <Route path="/admin/asset-aging" component={AssetAging} />
      <Route path="/admin/recalls" component={SafetyRecalls} />
      <Route path="/admin/data-marketplace" component={DataMarketplace} />
      <Route path="/admin/partner-integration-health" component={PartnerIntegrationHealth} />

      {/* Wave 2 -- Integration & Adoption */}
      <Route path="/admin/servicetitan" component={ServiceTitanMarketplace} />
      <Route path="/admin/jobber" component={JobberIntegration} />
      <Route path="/admin/housecallpro" component={HousecallProIntegration} />
      <Route path="/admin/auto-approval" component={AutoApproval} />
      <Route path="/admin/integration-health" component={IntegrationHealth} />
      <Route path="/admin/integration-hub" component={IntegrationHub} />
      <Route path="/admin/comms-integrations" component={CommsIntegrations} />
      <Route path="/admin/buildium" component={BuildiumIntegration} />
      <Route path="/marketing-kit" component={MarketingKit} />
      <Route path="/admin/photo-pipeline" component={PhotoPipeline} />
      <Route path="/admin/companycam" component={CompanyCamSync} />
      <Route path="/admin/companycam-guide" component={CompanyCamGuide} />
      <Route path="/admin/mass-adoption" component={MassAdoption} />
      <Route path="/admin/analytics-export" component={AnalyticsExport} />
      <Route path="/field/v2" component={FieldAppV2} />
      <Route path="/infographic-showcase" component={InfographicShowcase} />
      <Route path="/deal/:token" component={CustomerDealPage} />
      <Route path="/partner/:id" component={PartnerProfile} />
      <Route path="/stats" component={NetworkStats} />

      {/* TrustyPro -- Homeowner Platform */}
      <Route path="/trustypro">
        <SmoothScrollProvider><TrustyProHome /></SmoothScrollProvider>
      </Route>
      <Route path="/trustypro/login" component={TrustyProLogin} />
      <Route path="/trustypro/waitlist" component={TrustyProWaitlist} />
      <Route path="/pro/waitlist" component={TrustyProWaitlistPage} />
      {/* WAITLIST PHASE: /trustypro/scan and all /my-home/* routes are gated until launch */}
      <Route path="/trustypro/scan" component={PhotoScan} />
      <Route path="/trustypro/pros" component={TrustyProDirectory} />
      <Route path="/my-home" component={HomeownerDashboard} />
      <Route path="/my-home/offers" component={HomeownerOffers} />
      <Route path="/my-home/photos" component={HomeownerPhotos} />
      <Route path="/my-home/projects" component={HomeownerProjects} />
      <Route path="/my-home/timeline" component={HomeownerTimeline} />
      <Route path="/my-home/messages" component={HomeownerMessages} />
      <Route path="/my-home/invoices" component={HomeownerInvoices} />
      <Route path="/my-home/pros" component={HomeownerPros} />
      <Route path="/my-home/property" component={HomeownerProperty} />
      <Route path="/my-home/setup" component={HomeownerSetup} />
      <Route path="/my-home/wizard" component={HomeSetupWizard} />
      <Route path="/my-home/quick-start" component={HomeownerQuickStart} />
      <Route path="/my-home/reviews" component={HomeownerReviews} />
      <Route path="/my-home/profile" component={HomeownerProfile} />
      <Route path="/my-home/request-pro" component={HomeownerRequestPro} />
      <Route path="/my-home/ai-transform" component={BeforeAfterGenerator} />
      <Route path="/my-home/privacy" component={HomeownerPrivacy} />
      <Route path="/my-home/vault" component={HomeHealthVault} />
      <Route path="/my-home/scan-history" component={ScanHistory} />
      <Route path="/job/:token" component={JobCompletion} />
      <Route path="/survey/:token" component={NpsSurvey} />
      <Route path="/job/demo" component={JobCompletion} />
      <Route path="/review/:token" component={ReviewPage} />
      <Route path="/onboarding/wizard" component={OnboardingWizard} />
      <Route path="/onboarding/checklist" component={OnboardingChecklist} />
      <Route path="/dashboard/onboarding" component={OnboardingChecklist} />
      <Route path="/dashboard/disputes" component={DisputeCenter} />
      <Route path="/dashboard/payout-setup" component={PayoutSetup} />
      <Route path="/dashboard/payout-history" component={PayoutHistory} />
      <Route path="/dashboard/training" component={TrainingHub} />
      <Route path="/dashboard/calculator" component={CommissionCalculator} />
      <Route path="/dashboard/compliance" component={ComplianceDocs} />
      <Route path="/upgrade/success" component={UpgradeSuccess} />
      <Route path="/admin/analytics-deep-dive" component={AnalyticsDeepDive} />
      <Route path="/admin/tasks" component={AdminTaskList} />
      <Route path="/admin/business-plan" component={BusinessPlan} />
      <Route path="/admin/investor" component={InvestorDashboard} />
      <Route path="/admin/patent" component={PatentDisclosure} />
      <Route path="/admin/campaigns" component={CampaignCenter} />
      <Route path="/admin/marketing-automation" component={MarketingAutomationDashboard} />
      <Route path="/partner-agreement" component={PartnerAgreement} />
      <Route path="/admin/compliance" component={StrikeManagement} />
      <Route path="/admin/waitlist" component={WaitlistManager} />
      <Route path="/admin/waitlist-intelligence" component={WaitlistIntelligence} />
      <Route path="/admin/homeowners" component={HomeownerCRM} />
      <Route path="/admin/customer-success" component={CustomerSuccess} />
      <Route path="/admin/tax-reports" component={TaxReports} />
      <Route path="/admin/territory" component={TerritoryMarketplace} />
      <Route path="/admin/b2b-data" component={B2BDataExchange} />
      <Route path="/admin/enterprise-integrations" component={EnterpriseIntegrations} />
      <Route path="/admin/property-reports" component={PropertyConditionReports} />
      <Route path="/admin/ai-retraining" component={AIRetraining} />
      <Route path="/admin/real-estate-agents" component={RealEstateAgents} />
      <Route path="/admin/insurance-claims" component={InsuranceClaims} />
      <Route path="/admin/featured-advertisers" component={FeaturedAdvertisersAdmin} />
      <Route path="/admin/advertising-preview" component={AdvertisingPreview} />
      <Route path="/agent-portal" component={AgentPortal} />
      <Route path="/resources" component={ResourceCenter} />
      <Route path="/admin/commission-strategy" component={CommissionStrategy} />
      <Route path="/admin/trusted-pro-algorithm" component={TrustedProAlgorithm} />
      <Route path="/admin/photo-queue" component={PhotoQueue} />
      <Route path="/admin/photo-approval" component={PhotoApprovalQueue} />
      <Route path="/admin/platform-intelligence" component={PlatformIntelligence} />
      <Route path="/admin/task-manager" component={TaskManager} />
      <Route path="/admin/bundle-offers" component={BundleOffers} />
      <Route path="/admin/api-credits" component={ApiCreditsGuide} />
      <Route path="/admin/payment-flows" component={PaymentFlowDiagrams} />
      <Route path="/advertise" component={ProLnkMedia} />
      <Route path="/pricing" component={Pricing} />

      {/* Fallback */}
      <Route path="/docs/api" component={ApiDocs} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/ccpa" component={CCPARights} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/security" component={SecurityTrustCenter} />
      <Route path="/404" component={NotFound} />
      {/* V12 + 20-feature routes */}
      <Route path="/trustypro/gallery" component={ProjectGallery} />
      <Route path="/exchange/commercial" component={ProLnkExchangeCommercial} />
      <Route path="/ach-authorization" component={AchAuthorizationPage} />
      <Route path="/my-home/milestones" component={TrustyProComingSoon} />
      <Route path="/dashboard/growth-calculator" component={GrowthCalculator} />
      <Route path="/dashboard/community" component={CommunityForum} />
      <Route path="/leaderboard" component={PartnerLeaderboard} />
      <Route path="/network/leaderboard" component={PublicLeaderboard} />
      <Route path="/my-home/true-cost" component={TrueCostGuide} />
      <Route path="/my-home/maintenance" component={MaintenanceSchedule} />
      <Route path="/my-home/savings" component={SavingsTracker} />
      <Route path="/my-home/home-value" component={HomeValueImpact} />
      <Route path="/my-home/assistant" component={HomeAssistant} />
      <Route path="/my-home/diagnose" component={TrustyProComingSoon} />
      <Route path="/admin/partner-health" component={PartnerHealthDashboard} />
      <Route path="/admin/home-health" component={TrustyProOverview} />
      <Route path="/admin/media-analytics" component={Analytics} />
      <Route path="/admin/media-settings" component={PlatformSettings} />
      <Route path="/admin/geo-expansion" component={GeoExpansionMap} />
      <Route path="/admin/revenue-forecast" component={RevenueForecast} />
      <Route path="/admin/lead-quality" component={LeadQualityCenter} />
      <Route path="/dashboard/academy" component={TrainingAcademy} />
      <Route path="/dashboard/skills" component={SkillsMarketplace} />
      <Route path="/dashboard/review-management" component={ReviewManagement} />
      <Route path="/dashboard/job-preferences" component={JobMatchingPreferences} />
      <Route path="/dashboard/quote-builder" component={ProposalBuilder} />
      <Route path="/dashboard/quote-generator" component={QuoteGenerator} />
      <Route path="/dashboard/performance" component={PerformanceReport} />
      <Route path="/dashboard/availability" component={AvailabilityCalendar} />
      <Route path="/dashboard/upsell" component={UpsellPlaybook} />
      <Route path="/dashboard/events" component={NetworkingEvents} />
      <Route path="/dashboard/tax-estimator" component={TaxEstimator} />
      <Route path="/my-home/compare-contractors" component={TrustyProComingSoon} />
      <Route path="/my-home/seasonal-prep" component={SeasonalPrepGuide} />
      <Route path="/my-home/notifications" component={NotificationSettings} />
      <Route path="/my-home/notification-settings" component={NotificationSettings} />
      <Route path="/my-home/documents" component={DocumentVault} />
      <Route path="/my-home/document-vault" component={DocumentVault} />
      <Route path="/my-home/referral" component={HomeownerReferral} />
      <Route path="/my-home/homeowner-referral" component={HomeownerReferral} />
      <Route path="/my-home/photos" component={HomeownerPhotos} />
      <Route path="/my-home/emergency" component={EmergencyServices} />
      <Route path="/my-home/neighborhood-deals" component={TrustyProComingSoon} />
      <Route path="/my-home/favorites" component={HomeownerFavorites} />
      <Route path="/my-home/saved-pros" component={HomeownerFavorites} />
      <Route path="/my-home/property-comparison" component={TrustyProComingSoon} />
      <Route path="/my-home/job-timeline" component={HomeownerTimeline} />
      <Route path="/admin/churn-prediction" component={ChurnPrediction} />
      <Route path="/admin/tier-upgrades" component={TierUpgradeCenter} />
      <Route path="/admin/content" component={ContentManagement} />
      <Route path="/admin/partner-content" component={AdminPartnerContent} />
      <Route path="/admin/onboarding-funnel" component={OnboardingFunnel} />
      <Route path="/admin/ab-tests" component={ABTestManager} />
      <Route path="/admin/nps" component={NPSSurveyManager} />
      <Route path="/admin/coverage-zones" component={CoverageZones} />
      <Route path="/admin/franchise-territories" component={CoverageZones} />
      <Route path="/admin/payout-history" component={AdminPayoutHistory} />
      <Route path="/admin/seasonal-campaigns" component={SeasonalCampaigns} />
      <Route path="/admin/payment-monitor" component={PaymentMonitor} />
      <Route path="/admin/coverage-map" component={AdminCoverageMap} />
      <Route path="/dashboard/service-area" component={ServiceAreaManager} />
      <Route path="/dashboard/quote-inbox" component={PartnerQuoteInbox} />
      <Route path="/dashboard/billing" component={BillingPortal} />
      <Route path="/my-home/quick-quote" component={QuickQuoteRequest} />
      <Route path="/my-home/room-makeover" component={RoomMakeover} />
      <Route path="/dashboard/360-profile" component={Partner360Profile} />
      <Route path="/my-home/360-profile" component={Homeowner360Profile} />
      <Route path="/admin/360-members" component={Admin360Members} />
      <Route path="/admin/exchange" component={B2BDataExchange} />
      <Route path="/admin/commercial" component={ProLnkExchangeCommercial} />
      <Route path="/admin/partner-check-ins" component={PartnerCheckIns} />
      <Route path="/admin/partner-spotlights" component={PartnerSpotlightsAdmin} />
      <Route path="/admin/notification-center" component={NotificationCenterAdmin} />
      <Route path="/admin/automation-rules" component={AutomationRulesEngine} />
      <Route path="/admin/media-library" component={MediaLibraryAdmin} />
      <Route path="/admin/seasonal-maintenance" component={SeasonalMaintenanceAdmin} />
      <Route path="/admin/integration-webhooks" component={IntegrationWebhookDashboard} />
      <Route path="/admin/insurance-carriers" component={InsuranceCarrierDB} />
      <Route path="/admin/dashboard-builder" component={DashboardBuilder} />
      <Route path="/admin/report-generator" component={ReportGenerator} />
      <Route path="/admin/scheduled-reports" component={ScheduledReports} />
      <Route path="/admin/kpi-tracker" component={KPITracker} />
      <Route path="/admin/monthly-revenue" component={MonthlyRevenueReport} />
      <Route path="/admin/trade-revenue" component={TradeRevenueBreakdown} />
      <Route path="/admin/bulk-operations" component={BulkOperations} />
      <Route path="/admin/conversion-funnel" component={ConversionFunnel} />
      <Route path="/admin/api-keys" component={ApiKeyManagement} />
      <Route path="/admin/mobile-optimization" component={MobileOptimization} />
      <Route path="/admin/accessibility" component={AccessibilitySettings} />
      <Route path="/admin/error-monitoring" component={ErrorMonitoring} />
      <Route path="/admin/performance" component={PerformanceMonitoring} />

      {/* Content & Marketing */}
      <Route path="/blog" component={Blog} />
      <Route path="/how-ai-works" component={HowAIWorks} />
      <Route path="/for-real-estate-agents" component={ForRealEstateAgents} />
      <Route path="/for-insurance-agents" component={ForInsuranceAgents} />
      <Route path="/for-property-managers" component={ForPropertyManagers} />

      {/* Agent Portal */}
      <Route path="/agent/signup" component={AgentSignup} />
      <Route path="/agent/dashboard" component={AgentDashboard} />
      <Route path="/agent/pre-listing-scan" component={PreListingScan} />

      {/* Partner Training */}
      <Route path="/resources" component={PartnerResourceCenter} />
      <Route path="/resources/photo-guide" component={PhotoGuide} />
      <Route path="/resources/maximize-earnings" component={MaximizeEarnings} />
      <Route path="/resources/faq" component={PartnerFAQ} />
      <Route path="/resources/success-stories" component={PartnerSuccessStories} />

      {/* Lead Management */}
      <Route path="/leads" component={LeadInbox} />
      <Route path="/leads/:id" component={LeadDetail} />
      <Route path="/jobs/:id/document" component={JobDocumentation} />
      <Route path="/tier-benefits" component={TierBenefits} />
      <Route path="/content-library" component={ContentLibrary} />

      {/* Homeowner Extensions */}
      <Route path="/my-home/check-in" component={CheckInSystem} />
      <Route path="/my-home/ask-a-pro" component={AskAPro} />
      <Route path="/my-home/landlord" component={LandlordView} />
      <Route path="/my-home/portfolio" component={PropertyPortfolio} />
      <Route path="/my-home/insurance-claim" component={InsuranceClaimAssistant} />
      <Route path="/my-home/insurance-coverage" component={InsuranceCoverageChecker} />
      <Route path="/my-home/warranties" component={WarrantyTracker} />

      <Route path="/docs" component={Documentation} />
      <Route path="/media" component={ProLnkMedia} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  return (
    <>
      <DomainRouter />
      <Router />
      <CookieConsentBanner />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
