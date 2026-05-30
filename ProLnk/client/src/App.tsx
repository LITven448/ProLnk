import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useState, Suspense, lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";

// Pages -- eager (critical path: first pages users see)
import Home from "@/pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Apply from "./pages/Apply";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerForgotPassword from "./pages/PartnerForgotPassword";
import AdminLogin from "./pages/AdminLogin";
import TrustyProHome from "./pages/trustypro/TrustyProHome";
import HomeownerWaitlistForm from "./pages/HomeownerWaitlistForm";
import TrustyProWaitlistPage from "./pages/trustypro/TrustyProHome";
import JoinLanding from "./pages/JoinLanding";
import JoinBySlug from "./pages/JoinBySlug";
import ReferralLanding from "./pages/ReferralLanding";
const GetQuotes = lazy(() => import("./pages/GetQuotes"));
const QuoteComparison = lazy(() => import("./pages/QuoteComparison"));
const HomeHealthVaultLanding = lazy(() => import("./pages/HomeHealthVaultLanding"));
import CookieConsentBanner from "@/components/CookieConsentBanner";
import RewardfulScript from "@/components/RewardfulScript";

// Pages -- lazy loaded (all admin, dashboard, homeowner, feature pages)
const ApiDocs = lazy(() => import("./pages/ApiDocs"));
const CCPARights = lazy(() => import("@/pages/legal/CCPARights"));
const CookiePolicy = lazy(() => import("@/pages/legal/CookiePolicy"));
const Demo = lazy(() => import("@/pages/Demo"));
const ApplicationStatus = lazy(() => import("./pages/ApplicationStatus"));
const SetPassword = lazy(() => import("./pages/SetPassword"));
const AccountDeletion = lazy(() => import("./pages/AccountDeletion"));
const PartnerCheckout = lazy(() => import("./pages/PartnerCheckout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const CheckoutCancel = lazy(() => import("./pages/CheckoutCancel"));
const PartnerDashboard = lazy(() => import("./pages/PartnerDashboard"));
const PartnerOffers = lazy(() => import("./pages/PartnerOffers"));
const RequestService = lazy(() => import("./pages/RequestService"));
const MatchingConsole = lazy(() => import("./pages/admin/MatchingConsole"));
const InboundLeads = lazy(() => import("./pages/InboundLeads"));
const LeadMarketplace = lazy(() => import("./pages/LeadMarketplace"));
const MyReferrals = lazy(() => import("./pages/MyReferrals"));
const MatchHistory = lazy(() => import("./pages/MatchHistory"));
const ProLnkApp = lazy(() => import("./pages/ProLnkApp"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LogJob = lazy(() => import("./pages/LogJob"));
const JobLog = lazy(() => import("./pages/JobLog"));
const PartnerDirectory = lazy(() => import("./pages/PartnerDirectory"));
const PartnerSpotlight = lazy(() => import("./pages/PartnerSpotlight"));
const AdminCommissionRates = lazy(() => import("./pages/AdminCommissionRates"));
const AdminOpportunityFeed = lazy(() => import("./pages/AdminOpportunityFeed"));
const GoogleReviews = lazy(() => import("./pages/admin/GoogleReviews"));
const Payouts = lazy(() => import("./pages/admin/Payouts"));
const PaymentArchitecture = lazy(() => import("./pages/admin/PaymentArchitecture"));
const PartnerVerification = lazy(() => import("./pages/admin/PartnerVerification"));
const PlatformHealth = lazy(() => import("./pages/admin/PlatformHealth"));
const ActivityLog = lazy(() => import("./pages/admin/ActivityLog"));
const TrustyProLeads = lazy(() => import("./pages/admin/TrustyProLeads"));
const TrustyProOverview = lazy(() => import("./pages/admin/TrustyProOverview"));
const TrustyProScans = lazy(() => import("./pages/admin/TrustyProScans"));
const KnowledgeGraph = lazy(() => import("./pages/admin/KnowledgeGraph"));
const BusinessPacket = lazy(() => import("./pages/admin/BusinessPacket"));
const TrustyProAgentsPage = lazy(() => import("./pages/admin/TrustyProAgents"));
const TrustyProOrgChartPage = lazy(() => import("./pages/admin/TrustyProOrgChart"));
const TrustyProRevenuePage = lazy(() => import("./pages/admin/TrustyProRevenue"));
const MediaAgentsPage = lazy(() => import("./pages/admin/MediaAgents"));
const MediaOrgChartPage = lazy(() => import("./pages/admin/MediaOrgChart"));
const MediaRevenuePage = lazy(() => import("./pages/admin/MediaRevenue"));
const PartnerAnalytics = lazy(() => import("./pages/PartnerAnalytics"));
const PerformanceAlerts = lazy(() => import("./pages/PerformanceAlerts"));
const AIChatAssistant = lazy(() => import("./pages/AIChatAssistant"));
const AIChat = lazy(() => import("./pages/dashboard/AIChat"));
const EarningsTracker = lazy(() => import("./pages/EarningsTracker"));
const WhatsNew = lazy(() => import("./pages/WhatsNew"));
const PartnerProfileEditor = lazy(() => import("./pages/PartnerProfileEditor"));
const PartnerVerificationPage = lazy(() => import("./pages/PartnerVerification"));
const AdminSetup = lazy(() => import("./pages/AdminSetup"));
const JobHistory = lazy(() => import("./pages/JobHistory"));
const PartnerReviews = lazy(() => import("./pages/PartnerReviews"));
const EarningsHistory = lazy(() => import("./pages/EarningsHistory"));
const EarningsHistoryDashboard = lazy(() => import("./pages/dashboard/EarningsHistory"));
const EarningsCalendar = lazy(() => import("./pages/dashboard/EarningsCalendar"));

// Wave pages -- Partner Portal
const CommissionLedger = lazy(() => import("./pages/CommissionLedger"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const PartnerOnboarding = lazy(() => import("./pages/PartnerOnboarding"));
const PhotoUpload = lazy(() => import("./pages/PhotoUpload"));
const PhotoGuidelines = lazy(() => import("./pages/PhotoGuidelines"));
const NetworkFeed = lazy(() => import("./pages/NetworkFeed"));
const TierProgress = lazy(() => import("./pages/TierProgress"));
const ReferralLink = lazy(() => import("./pages/ReferralLink"));
const ReferralHub = lazy(() => import("./pages/dashboard/ReferralHub"));
const NetworkIncomeSummary = lazy(() => import("./pages/dashboard/NetworkIncomeSummary"));
const PartnerHome = lazy(() => import("./pages/dashboard/PartnerHome"));
const FoundingNetworkDashboard = lazy(() => import("./pages/dashboard/FoundingNetworkDashboard"));
const NetworkPartnerDirectory = lazy(() => import("./pages/dashboard/NetworkPartnerDirectory"));
const GoalTracker = lazy(() => import("./pages/dashboard/GoalTracker"));
const CharterInvites = lazy(() => import("./pages/dashboard/CharterInvites"));
const ReferralFunnelTracker = lazy(() => import("./pages/ReferralFunnelTracker"));
const NetworkTree = lazy(() => import("./pages/NetworkTree"));
const TierUpgradeFlow = lazy(() => import("./pages/TierUpgradeFlow"));
const Notifications = lazy(() => import("./pages/Notifications"));
const NotificationPreferences = lazy(() => import("./pages/NotificationPreferences"));
const IntegrationSettings = lazy(() => import("./pages/IntegrationSettings"));
const PartnerSettings = lazy(() => import("./pages/PartnerSettings"));
const FieldApp = lazy(() => import("./pages/FieldApp"));
const FieldOS = lazy(() => import("./pages/fieldos/FieldOS"));

// Wave pages -- Admin
const Leaderboard = lazy(() => import("./pages/admin/Leaderboard"));
const LeadScoring = lazy(() => import("./pages/admin/LeadScoring"));
const HeatMap = lazy(() => import("./pages/admin/HeatMap"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const NetworkAnalytics = lazy(() => import("./pages/admin/NetworkAnalytics"));
const OpportunityDetector = lazy(() => import("./pages/admin/OpportunityDetector"));
const GrowthEngine = lazy(() => import("./pages/admin/GrowthEngine"));

// Wave 2 -- Integration & Adoption pages
const ServiceTitanMarketplace = lazy(() => import("./pages/admin/ServiceTitanMarketplace"));
const JobberIntegration = lazy(() => import("./pages/admin/JobberIntegration"));
const HousecallProIntegration = lazy(() => import("./pages/admin/HousecallProIntegration"));
const FieldAppV2 = lazy(() => import("./pages/FieldAppV2"));
const OnboardingWizard = lazy(() => import("./pages/OnboardingWizard"));
const AutoApproval = lazy(() => import("./pages/admin/AutoApproval"));
const IntegrationHealth = lazy(() => import("./pages/admin/IntegrationHealth"));
const PhotoPipeline = lazy(() => import("./pages/admin/PhotoPipeline"));
const CompanyCamSync = lazy(() => import("./pages/admin/CompanyCamSync"));
const MassAdoption = lazy(() => import("./pages/admin/MassAdoption"));
const CompanyCamGuide = lazy(() => import("./pages/admin/CompanyCamGuide"));

// Brain Trust build -- new pages
const ReferralPipeline = lazy(() => import("@/pages/admin/ReferralPipeline"));
const DataIntelligence = lazy(() => import("@/pages/admin/DataIntelligence"));
const CommSequence = lazy(() => import("./pages/admin/CommSequence"));
const InfographicShowcase = lazy(() => import("./pages/InfographicShowcase"));
const JobCompletion = lazy(() => import("./pages/JobCompletion"));
const JobComplete = lazy(() => import("./pages/JobComplete"));

// New Admin Command Center pages
const CommandCenter = lazy(() => import("./pages/admin/CommandCenter"));
const PortfolioDashboard = lazy(() => import("./pages/admin/PortfolioDashboard"));
const StrategicOverview = lazy(() => import("./pages/admin/StrategicOverview"));
const HomeIntelligence = lazy(() => import("./pages/admin/HomeIntelligence"));
const NetworkMap = lazy(() => import("./pages/admin/NetworkMap"));
const PartnerIntelligence = lazy(() => import("./pages/admin/PartnerIntelligence"));
const AIOpportunityEngine = lazy(() => import("./pages/admin/AIOpportunityEngine"));
const FinancialCenter = lazy(() => import("./pages/admin/FinancialCenter"));
const ApplicationPipeline = lazy(() => import("./pages/admin/ApplicationPipeline"));
const BroadcastCenter = lazy(() => import("./pages/admin/BroadcastCenter"));
const MarketExpansion = lazy(() => import("./pages/admin/MarketExpansion"));
const Integrations = lazy(() => import("./pages/admin/Integrations"));
const IntegrationHub = lazy(() => import("./pages/admin/IntegrationHub"));
const CommsIntegrations = lazy(() => import("./pages/admin/CommsIntegrations"));
const BuildiumIntegration = lazy(() => import("./pages/admin/BuildiumIntegration"));
const ProServicesAgreement = lazy(() => import("./pages/admin/ProServicesAgreement"));
const FsmWebhookLog = lazy(() => import("./pages/admin/FsmWebhookLog"));
const WebhookManager = lazy(() => import("./pages/admin/WebhookManager"));
const N8nSetupGuide = lazy(() => import("./pages/admin/N8nSetupGuide"));
const CommissionDisputes = lazy(() => import("./pages/admin/CommissionDisputes"));
const PhotoApprovalQueue = lazy(() => import("./pages/admin/PhotoApprovalQueue"));
const CustomerDealPage = lazy(() => import("./pages/CustomerDealPage"));
const PartnerProfile = lazy(() => import("./pages/PartnerProfile"));
const Exchange = lazy(() => import("./pages/Exchange"));
const ExchangeLanding = lazy(() => import("./pages/ExchangeLanding"));
const ExchangeHome = lazy(() => import("./pages/ExchangeHome"));
const ExchangeJobs = lazy(() => import("./pages/ExchangeJobs"));
const ExchangeMyBids = lazy(() => import("./pages/ExchangeMyBids"));
const ExchangePostJob = lazy(() => import("./pages/ExchangePostJob"));
const ExchangeProfile = lazy(() => import("./pages/ExchangeProfile"));
const ExchangeContractors = lazy(() => import("./pages/ExchangeContractors"));
const PublicLeaderboard = lazy(() => import("./pages/Leaderboard"));
const NetworkStats = lazy(() => import("./pages/NetworkStats"));
const DealManagement = lazy(() => import("./pages/admin/DealManagement"));
const DealPipelineKanban = lazy(() => import("./pages/admin/DealPipelineKanban"));
const DealComposer = lazy(() => import("./pages/admin/DealComposer"));
const TrustCenter = lazy(() => import("./pages/TrustCenter"));
const ServiceCategories = lazy(() => import("./pages/admin/ServiceCategories"));
const MarketingKit = lazy(() => import("./pages/MarketingKit"));
const CommsTimeline = lazy(() => import("./pages/admin/CommsTimeline"));
const PropertyTimeline = lazy(() => import("./pages/admin/PropertyTimeline"));
const PropertyReport = lazy(() => import("./pages/admin/PropertyReport"));
const PartnerReport = lazy(() => import("./pages/admin/PartnerReport"));
const SmartNotifications = lazy(() => import("./pages/admin/SmartNotifications"));
const StrikeManagement = lazy(() => import("./pages/admin/StrikeManagement"));
const HomeownerCRM = lazy(() => import("./pages/admin/HomeownerCRM"));
const AnalyticsExport = lazy(() => import("./pages/admin/AnalyticsExport"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));

// V6 -- Predictive Engine pages
const EventEngineDashboard = lazy(() => import("./pages/admin/EventEngineDashboard"));
const AIPipelineMonitor = lazy(() => import("./pages/admin/AIPipelineMonitor"));
const StormWatch = lazy(() => import("./pages/admin/StormWatch"));
const StormDashboard = lazy(() => import("./pages/admin/StormDashboard"));
const AgentStatusDashboard = lazy(() => import("./pages/admin/AgentStatusDashboard"));
const AgentTracker = lazy(() => import("./pages/admin/AgentTracker"));
const Accountability = lazy(() => import("./pages/admin/Accountability"));
const CompanyOrgChart = lazy(() => import("./pages/admin/CompanyOrgChart"));

// 7 Company-level Executive Dashboards (top-level)
const ExecutiveDashboard = lazy(() => import("./pages/admin/dashboards/ExecutiveDashboard"));
const OperationsDashboard = lazy(() => import("./pages/admin/dashboards/OperationsDashboard"));
const SalesDashboard = lazy(() => import("./pages/admin/dashboards/SalesDashboard"));
const MarketingDashboard = lazy(() => import("./pages/admin/dashboards/MarketingDashboard"));
const SupportDashboard = lazy(() => import("./pages/admin/dashboards/SupportDashboard"));
const FinancialDashboard = lazy(() => import("./pages/admin/dashboards/FinancialDashboard"));
const AIAgentsDashboard = lazy(() => import("./pages/admin/dashboards/AIAgentsDashboard"));

// ProLnk Residential per-company dashboards
const ProLnkExecutive = lazy(async () => { const m = await import("./pages/admin/dashboards/prolnk"); return { default: m.ProLnkExecutive }; });
const ProLnkOperations = lazy(async () => { const m = await import("./pages/admin/dashboards/prolnk"); return { default: m.ProLnkOperations }; });
const ProLnkSales = lazy(async () => { const m = await import("./pages/admin/dashboards/prolnk"); return { default: m.ProLnkSales }; });
const ProLnkMarketing = lazy(async () => { const m = await import("./pages/admin/dashboards/prolnk"); return { default: m.ProLnkMarketing }; });
const ProLnkSupport = lazy(async () => { const m = await import("./pages/admin/dashboards/prolnk"); return { default: m.ProLnkSupport }; });
const ProLnkFinancial = lazy(async () => { const m = await import("./pages/admin/dashboards/prolnk"); return { default: m.ProLnkFinancial }; });
const ProLnkAgents = lazy(async () => { const m = await import("./pages/admin/dashboards/prolnk"); return { default: m.ProLnkAgents }; });
// TrustyPro per-company dashboards
const TrustyProExecutive = lazy(async () => { const m = await import("./pages/admin/dashboards/trustypro"); return { default: m.TrustyProExecutive }; });
const TrustyProOperations = lazy(async () => { const m = await import("./pages/admin/dashboards/trustypro"); return { default: m.TrustyProOperations }; });
const TrustyProSales = lazy(async () => { const m = await import("./pages/admin/dashboards/trustypro"); return { default: m.TrustyProSales }; });
const TrustyProMarketing = lazy(async () => { const m = await import("./pages/admin/dashboards/trustypro"); return { default: m.TrustyProMarketing }; });
const TrustyProSupport = lazy(async () => { const m = await import("./pages/admin/dashboards/trustypro"); return { default: m.TrustyProSupport }; });
const TrustyProFinancial = lazy(async () => { const m = await import("./pages/admin/dashboards/trustypro"); return { default: m.TrustyProFinancial }; });
const TrustyProAgents = lazy(async () => { const m = await import("./pages/admin/dashboards/trustypro"); return { default: m.TrustyProAgents }; });
// ProLnk Media per-company dashboards
const MediaExecutive = lazy(async () => { const m = await import("./pages/admin/dashboards/media"); return { default: m.MediaExecutive }; });
const MediaOperations = lazy(async () => { const m = await import("./pages/admin/dashboards/media"); return { default: m.MediaOperations }; });
const MediaSales = lazy(async () => { const m = await import("./pages/admin/dashboards/media"); return { default: m.MediaSales }; });
const MediaMarketing = lazy(async () => { const m = await import("./pages/admin/dashboards/media"); return { default: m.MediaMarketing }; });
const MediaSupport = lazy(async () => { const m = await import("./pages/admin/dashboards/media"); return { default: m.MediaSupport }; });
const MediaFinancial = lazy(async () => { const m = await import("./pages/admin/dashboards/media"); return { default: m.MediaFinancial }; });
const MediaAgents = lazy(async () => { const m = await import("./pages/admin/dashboards/media"); return { default: m.MediaAgents }; });
const AgentCommandCenter = lazy(() => import("./pages/admin/AgentCommandCenter"));
const AssetAging = lazy(() => import("./pages/admin/AssetAging"));
const SafetyRecalls = lazy(() => import("./pages/admin/SafetyRecalls"));
const DataMarketplace = lazy(() => import("./pages/admin/DataMarketplace"));
const PartnerIntegrationHealth = lazy(() => import("./pages/admin/PartnerIntegrationHealth"));

// Overnight Sprint -- new pages
const CustomerSuccess = lazy(() => import("./pages/admin/CustomerSuccess"));
const TaxReports = lazy(() => import("./pages/admin/TaxReports"));
const DisputeCenter = lazy(() => import("./pages/DisputeCenter"));
const PayoutSetup = lazy(() => import("./pages/PayoutSetup"));
const PayoutHistory = lazy(() => import("./pages/PayoutHistory"));
const UpgradeSuccess = lazy(() => import("./pages/UpgradeSuccess"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const ComplianceDocs = lazy(() => import("./pages/ComplianceDocs"));
const TrainingHub = lazy(() => import("./pages/TrainingHub"));
const CommissionCalculator = lazy(() => import("./pages/CommissionCalculator"));
const AnalyticsDeepDive = lazy(() => import("./pages/admin/AnalyticsDeepDive"));
const HomeownerReferral = lazy(() => import("./pages/homeowner/HomeownerReferral"));
const NeighborhoodReferral = lazy(() => import("./pages/homeowner/NeighborhoodReferral"));
const HomeHealthVault = lazy(() => import("./pages/homeowner/HomeHealthVault"));
const ScanHistory = lazy(() => import("./pages/homeowner/ScanHistory"));
const AdminTaskList = lazy(() => import("./pages/admin/AdminTaskList"));

// Contest page
const Contest = lazy(() => import("./pages/Contest"));

// Waitlist landing pages
const ProWaitlist = lazy(() => import("./pages/ProWaitlist"));
const TrustyProWaitlistStatus = lazy(() => import("./pages/TrustyProWaitlistStatus"));
const TrustyProComingSoon = lazy(() => import("./pages/TrustyProComingSoon"));
const WaitlistManager = lazy(() => import("./pages/admin/WaitlistManager"));
const CharterTracking = lazy(() => import("./pages/admin/CharterTracking"));
const WaitlistIntelligence = lazy(() => import("./pages/admin/WaitlistIntelligence"));
const ReferralTree = lazy(() => import("./pages/admin/ReferralTree"));
const WaitlistProLanding = lazy(() => import("./pages/WaitlistProLanding"));
const WaitlistHomeLanding = lazy(() => import("./pages/WaitlistHomeLanding"));

// TrustyPro -- Homeowner Platform (TrustyProHome kept eager above)
const ClaimHome = lazy(() => import("./pages/trustypro/ClaimHome"));
const TrustyProLogin = lazy(() => import("./pages/trustypro/TrustyProLogin"));
const TrustyProWaitlist = lazy(() => import("./pages/trustypro/TrustyProWaitlist"));
const PhotoScan = lazy(() => import("./pages/trustypro/PhotoScan"));
const HomeHealthDashboard = lazy(() => import("./pages/trustypro/HomeHealthDashboard"));
const HomeownerLogin = lazy(() => import("./pages/trustypro/HomeownerLogin"));
const TrustyProHomeownerDashboard = lazy(() => import("./pages/trustypro/HomeownerDashboard"));
const PropertySetup = lazy(() => import("./pages/trustypro/PropertySetup"));
const TrustyProDirectory = lazy(() => import("./pages/homeowner/TrustyProDirectory"));
const BookPro = lazy(() => import("./pages/trustypro/BookPro"));
const HomeownerDashboard = lazy(() => import("./pages/homeowner/HomeownerDashboard"));
const HomeownerOffers = lazy(() => import("./pages/homeowner/HomeownerOffers"));
const HomeownerPhotos = lazy(() => import("./pages/homeowner/HomeownerPhotos"));
const HomeownerMessages = lazy(() => import("./pages/homeowner/HomeownerMessages"));
const HomeownerInvoices = lazy(() => import("./pages/homeowner/HomeownerInvoices"));
const HomeownerPros = lazy(() => import("./pages/homeowner/HomeownerPros"));
const HomeownerProperty = lazy(() => import("./pages/homeowner/HomeownerProperty"));
const HomeownerSetup = lazy(() => import("./pages/homeowner/HomeownerSetup"));
const HomeSetupWizard = lazy(() => import("./pages/homeowner/HomeSetupWizard"));
const HomeownerQuickStart = lazy(() => import("./pages/homeowner/HomeownerQuickStart"));
const HomeownerReviews = lazy(() => import("./pages/homeowner/HomeownerReviews"));
const HomeownerProfile = lazy(() => import("./pages/homeowner/HomeownerProfile"));
const HomeownerPrivacy = lazy(() => import("./pages/homeowner/HomeownerPrivacy"));
const HomeownerRequestPro = lazy(() => import("./pages/homeowner/HomeownerRequestPro"));
const HomeownerFavorites = lazy(() => import("./pages/homeowner/HomeownerFavorites"));
const BeforeAfterGenerator = lazy(() => import("./pages/homeowner/BeforeAfterGenerator"));
const HomeownerProjects = lazy(() => import("./pages/homeowner/HomeownerProjects"));
const HomeownerTimeline = lazy(() => import("./pages/homeowner/HomeownerTimeline"));
const NpsSurvey = lazy(() => import("./pages/NpsSurvey"));

const BusinessPlan = lazy(() => import("./pages/admin/BusinessPlan"));
const InvestorDashboard = lazy(() => import("./pages/admin/InvestorDashboard"));
const PatentDisclosure = lazy(() => import("./pages/admin/PatentDisclosure"));
const CampaignCenter = lazy(() => import("./pages/admin/CampaignCenter"));
const MarketingAutomationDashboard = lazy(() => import("./pages/admin/MarketingAutomationDashboard"));
const PlatformSettings = lazy(() => import("./pages/admin/PlatformSettings"));
const PartnerAgreement = lazy(() => import("./pages/PartnerAgreement"));
const TerritoryMarketplace = lazy(() => import("./pages/admin/TerritoryMarketplace"));
const B2BDataExchange = lazy(() => import("./pages/admin/B2BDataExchange"));
const EnterpriseIntegrations = lazy(() => import("./pages/admin/EnterpriseIntegrations"));
const PropertyConditionReports = lazy(() => import("./pages/admin/PropertyConditionReports"));
const AIRetraining = lazy(() => import("./pages/admin/AIRetraining"));
const RealEstateAgents = lazy(() => import("./pages/admin/RealEstateAgents"));
const InsuranceClaims = lazy(() => import("./pages/admin/InsuranceClaims"));
const FeaturedAdvertisersAdmin = lazy(() => import("./pages/admin/FeaturedAdvertisers"));
const AdvertisingPreview = lazy(() => import("./pages/admin/AdvertisingPreview"));
const UnifiedInbox = lazy(() => import("./pages/UnifiedInbox"));
const JobSchedule = lazy(() => import("./pages/JobSchedule"));
const JobScheduler = lazy(() => import("./pages/JobScheduler"));
const CommissionRates = lazy(() => import("./pages/CommissionRates"));
const CommissionStrategy = lazy(() => import("./pages/admin/CommissionStrategy"));
const TrustedProAlgorithm = lazy(() => import("./pages/admin/TrustedProAlgorithm"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PostFoundingPricing = lazy(() => import("./pages/PostFoundingPricing"));
const PhotoQueue = lazy(() => import("./pages/admin/PhotoQueue"));
const BundleOffers = lazy(() => import("./pages/admin/BundleOffers"));
const ApiCreditsGuide = lazy(() => import("./pages/admin/ApiCreditsGuide"));
const PaymentFlowDiagrams = lazy(() => import("./pages/admin/PaymentFlowDiagrams"));

// V12 + 20-feature build
const ProjectGallery = lazy(() => import("./pages/trustypro/ProjectGallery"));
const TrustyProPartnerDashboard = lazy(() => import("./pages/trustypro/TrustyProPartnerDashboard"));
const TrustyProApp = lazy(() => import("./pages/trustypro/TrustyProApp"));
const ProLnkExchangeCommercial = lazy(() => import("./pages/ProLnkExchangeCommercial"));
const AchAuthorizationPage = lazy(() => import("./pages/AchAuthorizationPage"));
const MilestoneTracker = lazy(() => import("./pages/homeowner/MilestoneTracker"));
const GrowthCalculator = lazy(() => import("./pages/GrowthCalculator"));
const CommunityForum = lazy(() => import("./pages/CommunityForum"));
const TrueCostGuide = lazy(() => import("./pages/homeowner/TrueCostGuide"));
const MaintenanceSchedule = lazy(() => import("./pages/homeowner/MaintenanceSchedule"));
const SavingsTracker = lazy(() => import("./pages/homeowner/SavingsTracker"));
const HomeValueImpact = lazy(() => import("./pages/homeowner/HomeValueImpact"));
const PartnerLeaderboard = lazy(() => import("./pages/PartnerLeaderboard"));
const PartnerHealthDashboard = lazy(() => import("./pages/admin/PartnerHealthDashboard"));
const GeoExpansionMap = lazy(() => import("./pages/admin/GeoExpansionMap"));
const RevenueForecast = lazy(() => import("./pages/admin/RevenueForecast"));
const RevenueForecaster = lazy(() => import("./pages/admin/RevenueForecaster"));
const NetworkGrowthDashboard = lazy(() => import("./pages/admin/NetworkGrowthDashboard"));
const LeadQualityCenter = lazy(() => import("./pages/admin/LeadQualityCenter"));
const HomeAssistant = lazy(() => import("./pages/homeowner/HomeAssistant"));
const HomeDiagnostic = lazy(() => import("./pages/homeowner/HomeDiagnostic"));
const SkillsMarketplace = lazy(() => import("./pages/SkillsMarketplace"));
const TrainingAcademy = lazy(() => import("./pages/TrainingAcademy"));
const JobMatchingPreferences = lazy(() => import("./pages/JobMatchingPreferences"));
const ReviewManagement = lazy(() => import("./pages/ReviewManagement"));
const QuoteGenerator = lazy(() => import("./pages/QuoteGenerator"));
const PerformanceReport = lazy(() => import("./pages/PerformanceReport"));
const AvailabilityCalendar = lazy(() => import("./pages/AvailabilityCalendar"));
const UpsellPlaybook = lazy(() => import("./pages/UpsellPlaybook"));
const ProposalBuilder = lazy(() => import("./pages/ProposalBuilder"));
const NetworkingEvents = lazy(() => import("./pages/NetworkingEvents"));
const TaxEstimator = lazy(() => import("./pages/TaxEstimator"));
const TaxCenter = lazy(() => import("./pages/dashboard/TaxCenter"));
const ContractorComparison = lazy(() => import("./pages/homeowner/ContractorComparison"));
const SeasonalPrepGuide = lazy(() => import("./pages/homeowner/SeasonalPrepGuide"));
const NotificationSettings = lazy(() => import("./pages/homeowner/NotificationSettings"));
const DocumentVault = lazy(() => import("./pages/homeowner/DocumentVault"));
const ReferralProgram = lazy(() => import("./pages/homeowner/ReferralProgram"));
const EmergencyServices = lazy(() => import("./pages/homeowner/EmergencyServices"));
const NeighborhoodDeals = lazy(() => import("./pages/homeowner/NeighborhoodDeals"));
const PropertyComparison = lazy(() => import("./pages/homeowner/PropertyComparison"));
const JobTimeline = lazy(() => import("./pages/homeowner/JobTimeline"));
const ChurnPrediction = lazy(() => import("./pages/admin/ChurnPrediction"));
const TierUpgradeCenter = lazy(() => import("./pages/admin/TierUpgradeCenter"));
const ContentManagement = lazy(() => import("./pages/admin/ContentManagement"));
const AdminPartnerContent = lazy(() => import("./pages/admin/AdminPartnerContent"));
const OnboardingFunnel = lazy(() => import("./pages/admin/OnboardingFunnel"));
const ABTestManager = lazy(() => import("./pages/admin/ABTestManager"));
const NPSSurveyManager = lazy(() => import("./pages/admin/NPSSurveyManager"));
const CoverageZones = lazy(() => import("./pages/admin/FranchiseTerritories"));
const AdminPayoutHistory = lazy(() => import("./pages/admin/PayoutHistory"));
const SeasonalCampaigns = lazy(() => import("./pages/admin/SeasonalCampaigns"));
const PaymentMonitor = lazy(() => import("./pages/admin/PaymentMonitor"));
const AdminCoverageMap = lazy(() => import("./pages/admin/AdminCoverageMap"));
const PlatformIntelligence = lazy(() => import("@/pages/admin/PlatformIntelligence"));
const CompetitorIntelligence = lazy(() => import("@/pages/admin/CompetitorIntelligence"));
const TaskManager = lazy(() => import("@/pages/admin/TaskManager"));
const OnboardingChecklist = lazy(() => import("@/pages/OnboardingChecklist"));
const DashboardOnboardingChecklist = lazy(() => import("@/pages/dashboard/OnboardingChecklist"));
const FeatureDiscovery = lazy(() => import("@/pages/dashboard/FeatureDiscovery"));
const SocialShare = lazy(() => import("@/pages/dashboard/SocialShare"));
const ServiceAreaManager = lazy(() => import("@/pages/ServiceAreaManager"));
const QuickQuoteRequest = lazy(() => import("@/pages/homeowner/QuickQuoteRequest"));
const RoomMakeover = lazy(() => import("@/pages/homeowner/RoomMakeover"));
const PartnerQuoteInbox = lazy(() => import("@/pages/PartnerQuoteInbox"));
const Partner360Profile = lazy(() => import("@/pages/Partner360Profile"));
const Homeowner360Profile = lazy(() => import("@/pages/homeowner/Homeowner360Profile"));
const Admin360Members = lazy(() => import("@/pages/admin/Admin360Members"));
const AgentPortal = lazy(() => import("@/pages/AgentPortal"));
const ResourceCenter = lazy(() => import("@/pages/ResourceCenter"));
const BillingPortal = lazy(() => import("@/pages/BillingPortal"));
const ProLnkMedia = lazy(() => import("@/pages/ProLnkMedia"));
const ProLnkMediaSite = lazy(() => import("@/pages/media/ProLnkMediaSite"));
const MediaSiteLazy = () => <Suspense fallback={<div style={{background:"#050508",minHeight:"100vh"}} />}><ProLnkMediaSite /></Suspense>;
const SecurityTrustCenter = lazy(() => import("@/pages/SecurityTrustCenter"));
const PhotoAccessLog = lazy(() => import("@/pages/admin/PhotoAccessLog"));
const PartnerCheckIns = lazy(() => import("./pages/admin/PartnerCheckIns"));
const PartnerSpotlightsAdmin = lazy(() => import("./pages/admin/PartnerSpotlights"));
const NotificationCenterAdmin = lazy(() => import("./pages/admin/NotificationCenter"));
const AutomationRulesEngine = lazy(() => import("./pages/admin/AutomationRulesEngine"));
const MediaLibraryAdmin = lazy(() => import("./pages/admin/MediaLibraryAdmin"));
const SeasonalMaintenanceAdmin = lazy(() => import("./pages/admin/SeasonalMaintenanceAdmin"));
const IntegrationWebhookDashboard = lazy(() => import("./pages/admin/IntegrationWebhookDashboard"));

// New admin pages
const IntegrationsDashboard = lazy(() => import("./pages/admin/IntegrationsDashboard"));
const BackgroundChecks = lazy(() => import("./pages/admin/BackgroundChecks"));
const PartnerVerificationQueue = lazy(() => import("./pages/admin/PartnerVerificationQueue"));
const PaymentMonitorDashboard = lazy(() => import("./pages/admin/PaymentMonitorDashboard"));
const TaxReportingCenter = lazy(() => import("./pages/admin/TaxReportingCenter"));
const AddressValidationLog = lazy(() => import("./pages/admin/AddressValidationLog"));
const PartnerPerformanceCoach = lazy(() => import("./pages/admin/PartnerPerformanceCoach"));
const ProspectPipeline = lazy(() => import("./pages/admin/ProspectPipeline"));
const MarketExpansionPlanner = lazy(() => import("./pages/admin/MarketExpansionPlanner"));
const RevenueAnalytics = lazy(() => import("./pages/admin/RevenueAnalytics"));

// New homeowner pages
const NeighborhoodInsights = lazy(() => import("./pages/homeowner/NeighborhoodInsights"));
const DigitalHomeRecord = lazy(() => import("./pages/homeowner/DigitalHomeRecord"));
const HomeMaintenanceBudget = lazy(() => import("./pages/homeowner/HomeMaintenanceBudget"));
const HomeApplianceTracker = lazy(() => import("./pages/homeowner/HomeApplianceTracker"));
const EmergencyResponsePlan = lazy(() => import("./pages/homeowner/EmergencyResponsePlan"));
const InsuranceVault = lazy(() => import("./pages/homeowner/InsuranceVault"));
const SmartAlerts = lazy(() => import("./pages/homeowner/SmartAlerts"));
const ImprovementPlanner = lazy(() => import("./pages/homeowner/ImprovementPlanner"));
const HomeValueTracker = lazy(() => import("./pages/homeowner/HomeValueTracker"));
const LocalServiceAlerts = lazy(() => import("./pages/homeowner/LocalServiceAlerts"));
const HomeownerOnboarding = lazy(() => import("./pages/homeowner/HomeownerOnboarding"));

// New dashboard pages
const EarningsForecast = lazy(() => import("./pages/dashboard/EarningsForecast"));
const EarningsDeepDive = lazy(() => import("./pages/dashboard/EarningsDeepDive"));
const NetworkVisualization = lazy(() => import("./pages/dashboard/NetworkVisualization"));
const ReferralContest = lazy(() => import("./pages/dashboard/ReferralContest"));
const JobPipeline = lazy(() => import("./pages/dashboard/JobPipeline"));
const CertificationsLicenses = lazy(() => import("./pages/dashboard/CertificationsLicenses"));

// New top-level pages
const CommissionCalculatorAdvanced = lazy(() => import("./pages/CommissionCalculatorAdvanced"));

// New TrustyPro pages
const TrustyProScanHistory = lazy(() => import("./pages/trustypro/ScanHistory"));

// Trade SEO landing pages
const TradeLanding = lazy(() => import("./pages/TradeLanding"));
const TradeLandingList = lazy(() => import("./pages/TradeLandingList"));

// City SEO landing pages
const CityLanding = lazy(() => import("./pages/CityLanding"));
const CityLandingList = lazy(() => import("./pages/CityLandingList"));

// Investor & Press
const InvestorPage = lazy(() => import("./pages/InvestorPage"));
const PressKit = lazy(() => import("./pages/PressKit"));

// Wave 14: Content & Marketing
const Blog = lazy(() => import("./pages/Blog"));
const HowAIWorks = lazy(() => import("./pages/HowAIWorks"));
const ForRealEstateAgents = lazy(() => import("./pages/ForRealEstateAgents"));
const ForInsuranceAgents = lazy(() => import("./pages/ForInsuranceAgents"));
const ForPropertyManagers = lazy(() => import("./pages/ForPropertyManagers"));
const StormAlert = lazy(() => import("./pages/StormAlert"));

// Wave 33: Multi-Property
const LandlordView = lazy(() => import("./pages/homeowner/LandlordView"));
const PropertyPortfolio = lazy(() => import("./pages/homeowner/PropertyPortfolio"));

// Wave 34: Insurance
const InsuranceCarrierDB = lazy(() => import("./pages/admin/InsuranceCarrierDB"));
const InsuranceClaimAssistant = lazy(() => import("./pages/homeowner/InsuranceClaimAssistant"));
const InsuranceCoverageChecker = lazy(() => import("./pages/homeowner/InsuranceCoverageChecker"));

// Wave 35: Agent Portal
const AgentSignup = lazy(() => import("./pages/AgentSignup"));
const PartnerSignup = lazy(() => import("./pages/PartnerSignup"));
const AgentDashboard = lazy(() => import("./pages/AgentDashboard"));
const PreListingScan = lazy(() => import("./pages/PreListingScan"));

// Wave 36: Warranty
const WarrantyTracker = lazy(() => import("./pages/homeowner/WarrantyTracker"));

// Wave 38: Partner Training
const PartnerResourceCenter = lazy(() => import("./pages/PartnerResourceCenter"));
const PhotoGuide = lazy(() => import("./pages/PhotoGuide"));
const MaximizeEarnings = lazy(() => import("./pages/MaximizeEarnings"));
const PartnerSuccessStories = lazy(() => import("./pages/PartnerSuccessStories"));
const ProLnkAcademy = lazy(() => import("./pages/resources/ProLnkAcademy"));
const SuccessStoriesPage = lazy(() => import("./pages/resources/SuccessStoriesPage"));

// Wave 40: Data Visualization
const DashboardBuilder = lazy(() => import("./pages/admin/DashboardBuilder"));
const ReportGenerator = lazy(() => import("./pages/admin/ReportGenerator"));
const ScheduledReports = lazy(() => import("./pages/admin/ScheduledReports"));
const KPITracker = lazy(() => import("./pages/admin/KPITracker"));

// Wave 16-30 Pages
const CheckInSystem = lazy(() => import("./pages/homeowner/CheckInSystem"));
const LeadInbox = lazy(() => import("./pages/LeadInbox"));
const LeadDetail = lazy(() => import("./pages/LeadDetail"));
const JobDocumentation = lazy(() => import("./pages/JobDocumentation"));
const HomeDocumentation = lazy(() => import("./pages/HomeDocumentation"));
const MonthlyRevenueReport = lazy(() => import("./pages/admin/MonthlyRevenueReport"));
const TradeRevenueBreakdown = lazy(() => import("./pages/admin/TradeRevenueBreakdown"));
const AskAPro = lazy(() => import("./pages/homeowner/AskAPro"));
const BulkOperations = lazy(() => import("./pages/admin/BulkOperations"));
const ConversionFunnel = lazy(() => import("./pages/admin/ConversionFunnel"));
const TierBenefits = lazy(() => import("./pages/TierBenefits"));
const WaitlistStatus = lazy(() => import("./pages/WaitlistStatus"));
const ContentLibrary = lazy(() => import("./pages/ContentLibrary"));
const ApiKeyManagement = lazy(() => import("./pages/admin/ApiKeyManagement"));

const FoundingPartnerPage = lazy(() => import("./pages/FoundingPartnerPage"));
const PartnerBilling = lazy(() => import("./pages/PartnerBilling"));
const MarketIntelligence = lazy(() => import("./pages/dashboard/MarketIntelligence"));
const CompetitiveAdvantage = lazy(() => import("./pages/resources/CompetitiveAdvantage"));

// Wave 31-45 Pages
const MobileOptimization = lazy(() => import("./pages/admin/MobileOptimization"));
const AccessibilitySettings = lazy(() => import("./pages/admin/AccessibilitySettings"));
const ErrorMonitoring = lazy(() => import("./pages/admin/ErrorMonitoring"));
const PerformanceMonitoring = lazy(() => import("./pages/admin/PerformanceMonitoring"));
const Documentation = lazy(() => import("./pages/Documentation"));
const FAQ = lazy(() => import("./pages/FAQ"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const APIGuide = lazy(() => import("./pages/APIGuide"));


// Wave 50: New feature pages
const CheckrIntegration = lazy(() => import("./pages/admin/CheckrIntegration"));
const IncomeStreamsExplainer = lazy(() => import("./pages/IncomeStreamsExplainer"));
const FirstTimeBuyerGuide = lazy(() => import("./pages/homeowner/FirstTimeBuyerGuide"));
const NeighborhoodSafetyMap = lazy(() => import("./pages/homeowner/NeighborhoodSafetyMap"));
const SocialSharingKit = lazy(() => import("./pages/dashboard/SocialSharingKit"));
const SchoolDistrictGuide = lazy(() => import("./pages/homeowner/SchoolDistrictGuide"));
const LeadHeatMap = lazy(() => import("./pages/admin/LeadHeatMap"));
const DIYVsProCalculator = lazy(() => import("./pages/homeowner/DIYVsProCalculator"));
const SpotlightCreator = lazy(() => import("./pages/admin/SpotlightCreator"));
const IncomeComparison = lazy(() => import("./pages/IncomeComparison"));
const NetworkIncomeCalculator = lazy(() => import("./pages/NetworkIncomeCalculator"));
const PoolSpaGuide = lazy(() => import("./pages/homeowner/PoolSpaGuide"));
const WebhookMonitor = lazy(() => import("./pages/admin/WebhookMonitor"));
const FunnelAnalyticsDashboard = lazy(() => import("./pages/admin/FunnelAnalyticsDashboard"));
const GarageDoorGuide = lazy(() => import("./pages/homeowner/GarageDoorGuide"));
const PhotoTipsGuide = lazy(() => import("./pages/dashboard/PhotoTipsGuide"));
const WindowGuide = lazy(() => import("./pages/homeowner/WindowGuide"));
const DailyBriefing = lazy(() => import("./pages/dashboard/DailyBriefing"));
const AirQualityGuide = lazy(() => import("./pages/homeowner/AirQualityGuide"));
const PartnerCommunicationHub = lazy(() => import("./pages/admin/PartnerCommunicationHub"));
const MilestoneSystem = lazy(() => import("./pages/dashboard/MilestoneSystem"));
const PestControlGuide = lazy(() => import("./pages/homeowner/PestControlGuide"));
const IncomeStatement = lazy(() => import("./pages/dashboard/IncomeStatement"));
const HomeMaintenanceCalendar = lazy(() => import("./pages/homeowner/HomeMaintenanceCalendar"));
const LeaderboardAdmin = lazy(() => import("./pages/admin/LeaderboardAdmin"));
const MorningChecklist = lazy(() => import("./pages/dashboard/MorningChecklist"));
const DeepCleaningGuide = lazy(() => import("./pages/homeowner/DeepCleaningGuide"));
const AnnouncementCenter = lazy(() => import("./pages/admin/AnnouncementCenter"));
const IncomeGoals = lazy(() => import("./pages/dashboard/IncomeGoals"));
const WinRateOptimizer = lazy(() => import("./pages/dashboard/WinRateOptimizer"));
const SmartBudgetPlanner = lazy(() => import("./pages/homeowner/SmartBudgetPlanner"));
const PlatformHealthSummary = lazy(() => import("./pages/admin/PlatformHealthSummary"));
const MarketIntelligenceFeed = lazy(() => import("./pages/dashboard/MarketIntelligenceFeed"));
const TierBreakdownDashboard = lazy(() => import("./pages/admin/TierBreakdownDashboard"));
const RenovationFinancingGuide = lazy(() => import("./pages/homeowner/RenovationFinancingGuide"));
const AICommandCenter = lazy(() => import("./pages/admin/AICommandCenter"));
const SystemHealthDashboard = lazy(() => import("./pages/admin/SystemHealthDashboard"));


// App preview mockup screens
const ProLnkHomePreview = lazy(() => import("./pages/app-preview/HomeScreen"));
const ProLnkLeadPreview = lazy(() => import("./pages/app-preview/LeadDetailScreen"));
const ProLnkEarningsPreview = lazy(() => import("./pages/app-preview/EarningsScreen"));
const ProLnkNetworkPreview = lazy(() => import("./pages/app-preview/NetworkScreen"));
const ProLnkFieldPreview = lazy(() => import("./pages/app-preview/JobDocScreen"));
const TPHomePreview = lazy(() => import("./pages/trustypro/app-preview/HomeScreen"));
const TPScanPreview = lazy(() => import("./pages/trustypro/app-preview/ScanScreen"));
const TPPropertyPreview = lazy(() => import("./pages/trustypro/app-preview/PropertyScreen"));
const TPFindProPreview = lazy(() => import("./pages/trustypro/app-preview/FindProScreen"));
const TPAlertsPreview = lazy(() => import("./pages/trustypro/app-preview/AlertsScreen"));
const FenceInstallationGuide = lazy(() => import('./pages/homeowner/FenceInstallationGuide'));
const PoolMaintenanceGuide = lazy(() => import('./pages/homeowner/PoolMaintenanceGuide'));
const NetworkGrowthPlaybook = lazy(() => import('./pages/partner/NetworkGrowthPlaybook'));
const DrainageAndGradingGuide = lazy(() => import('./pages/homeowner/DrainageAndGradingGuide'));
const ProLnkVsGoingAlone = lazy(() => import('./pages/partner/ProLnkVsGoingAlone'));
const KitchenRemodelGuide = lazy(() => import('./pages/homeowner/KitchenRemodelGuide'));
const RoofInspectionGuide = lazy(() => import('./pages/homeowner/RoofInspectionGuide'));
const DrivewayMaintenanceGuide = lazy(() => import('./pages/homeowner/DrivewayMaintenanceGuide'));
// const GarageOrganizationGuide = lazy(() => import('./pages/homeowner/GarageOrganizationGuide'));  // QUARANTINED: build error
// const HomeTheaterGuide = lazy(() => import('./pages/homeowner/HomeTheaterGuide'));  // QUARANTINED: build error
const PartnerWeekendWarriorGuide = lazy(() => import('./pages/PartnerWeekendWarriorGuide'));
const TrustyProPricingExplainer = lazy(() => import('./pages/TrustyProPricingExplainer'));
const PartnerFirst30Days = lazy(() => import('./pages/partner/PartnerFirst30Days'));
const PartnerAnnualIncomeForecaster = lazy(() => import('./pages/partner/PartnerAnnualIncomeForecaster'));
const PartnerFAQ = lazy(() => import('./pages/partner/PartnerFAQ'));
const PartnerTaxGuide = lazy(() => import('./pages/partner/PartnerTaxGuide'));
const CharterVsFoundingComparison = lazy(() => import('./pages/partner/CharterVsFoundingComparison'));
const PartnerMarketingKit = lazy(() => import('./pages/partner/PartnerMarketingKit'));
const ReferralNetworkCalculator = lazy(() => import('./pages/partner/ReferralNetworkCalculator'));
const SidingReplacementGuide = lazy(() => import('./pages/homeowner/SidingReplacementGuide'));
const ElectricalPanelUpgradeGuide = lazy(() => import('./pages/homeowner/ElectricalPanelUpgradeGuide'));
const CarpetVsHardwoodGuide = lazy(() => import('./pages/homeowner/CarpetVsHardwoodGuide'));
const MoldRemediationGuide = lazy(() => import('./pages/homeowner/MoldRemediationGuide'));
const DFWBackyardRemodelGuide = lazy(() => import('./pages/homeowner/DFWBackyardRemodelGuide'));
const HomeEquityGuide = lazy(() => import('./pages/homeowner/HomeEquityGuide'));
const DFWPermitGuide = lazy(() => import('./pages/homeowner/DFWPermitGuide'));
const ExteriorPaintGuide = lazy(() => import('./pages/homeowner/ExteriorPaintGuide'));
const TreeServiceGuide = lazy(() => import('./pages/homeowner/TreeServiceGuide'));

// Domain-based routing: trustypro.io → TrustyPro experience at root /
function DomainRouter() {
  const [location, navigate] = useLocation();
  useEffect(() => {
    const hostname = window.location.hostname;
    const isTrustyPro =
      hostname === "trustypro.io" ||
      hostname === "www.trustypro.io" ||
      hostname.endsWith(".trustypro.io");
    if (isTrustyPro) {
      // trustypro.io/waitlist → homeowner waitlist
      if (location === "/waitlist" || location === "/waitlist/") {
        navigate("/waitlist/homeowner", { replace: true });
        return;
      }
      // Allow /waitlist/* paths through
      if (location.startsWith("/waitlist")) return;
      // Allow /trustypro/* paths through
      if (location.startsWith("/trustypro")) return;
      // Allow homeowner job-request intake on the trustypro brand
      if (location.startsWith("/request-service")) return;
      // trustypro.io root → stay at / (TrustyProHome renders via Router below)
      if (location === "/" || location === "") return;
      // Any unmatched trustypro.io path → redirect to root
      navigate("/", { replace: true });
    }
  }, [location, navigate]);
  return null;
}

// /login — Email/password login form (OAuth fallback when VITE_OAUTH_PORTAL_URL not set)
function LoginRedirect() {
  const loginUrl = getLoginUrl();
  useEffect(() => {
    if (loginUrl && !loginUrl.endsWith('/login')) {
      window.location.href = loginUrl;
    }
  }, []);
  if (loginUrl && !loginUrl.endsWith('/login')) return null;
  return <AdminLoginForm />;
}

function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginMutation = trpc.partnerAuth.login.useMutation({
    onSuccess: () => { window.location.href = "/admin/waitlist"; },
    onError: (e) => setError(e.message),
  });
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f1117",fontFamily:"sans-serif"}}>
      <div style={{background:"#1a1d27",padding:"40px",borderRadius:"16px",width:"380px",boxSizing:"border-box"}}>
        <div style={{fontSize:"26px",fontWeight:700,color:"#fff",marginBottom:"6px"}}>ProLnk</div>
        <div style={{color:"#888",fontSize:"13px",marginBottom:"28px"}}>Sign in to your account</div>
        <form onSubmit={(e) => { e.preventDefault(); setError(""); loginMutation.mutate({ email, password }); }}
          style={{display:"flex",flexDirection:"column",gap:"14px"}}>
          <div>
            <label style={{display:"block",fontSize:"12px",color:"#aaa",marginBottom:"5px"}}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{width:"100%",padding:"10px 12px",background:"#252836",border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"14px",boxSizing:"border-box"}} />
          </div>
          <div>
            <label style={{display:"block",fontSize:"12px",color:"#aaa",marginBottom:"5px"}}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{width:"100%",padding:"10px 12px",background:"#252836",border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"14px",boxSizing:"border-box"}} />
          </div>
          {error && <div style={{color:"#f87171",fontSize:"13px",background:"rgba(239,68,68,0.1)",padding:"10px 12px",borderRadius:"8px"}}>{error}</div>}
          <button type="submit" disabled={loginMutation.isPending}
            style={{background:"#22c55e",color:"#fff",border:"none",padding:"12px",borderRadius:"8px",fontWeight:600,fontSize:"14px",cursor:"pointer",opacity:loginMutation.isPending?0.7:1}}>
            {loginMutation.isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <a href="/" style={{display:"block",textAlign:"center",color:"#555",fontSize:"12px",marginTop:"20px",textDecoration:"none"}}>← Back to homepage</a>
      </div>
    </div>
  );
}


const LazyFallback = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const WAITLIST_ALLOWED = new Set([
  "/join", "/pro-waitlist", "/home-waitlist", "/referral", "/dashboard",
  "/waitlist/pro", "/waitlist/homeowner", "/waitlist/homeowner/status",
  "/waitlist-status", "/waitlist/status", "/success",
  "/founding-partner", "/founding-network", "/leaderboard", "/network/leaderboard",
  "/privacy", "/terms", "/ccpa", "/cookies", "/security",
  "/trustypro", "/trustypro/waitlist", "/trustypro/app",
  "/login", "/admin-login", "/partner-login", "/partner-forgot-password",
  "/set-password", "/pricing", "/pricing/standard",
  "/partner-agreement", "/ach-authorization",
  "/partner/offers", "/request-service",
]);

function WaitlistGuard() {
  const [location, navigate] = useLocation();
  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    if (location === "/") {
      const isTrustyPro = (window as any).__BRAND__ === "trustypro";
      navigate((isTrustyPro ? "/waitlist/homeowner" : "/pro-waitlist") + search, { replace: true });
      return;
    }
    if (location.startsWith("/admin")) return;
    if (location.startsWith("/dashboard")) return;
    if (location.startsWith("/my-home")) return;
    if (location.startsWith("/join/")) return;
    if (location.startsWith("/trustypro/")) return;
    if (WAITLIST_ALLOWED.has(location)) return;
    const isTrustyPro = (window as any).__BRAND__ === "trustypro";
    navigate((isTrustyPro ? "/waitlist/homeowner" : "/pro-waitlist") + search, { replace: true });
  }, [location, navigate]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<LazyFallback />}>
    <WaitlistGuard />
    <Switch>
      {/* Public -- smooth scroll landing pages */}
      <Route path="/">
        <SmoothScrollProvider>
          {((window as any).__BRAND__ === "trustypro" || window.location.hostname.includes("trustypro")) ? <TrustyProHome /> : <Home />}
        </SmoothScrollProvider>
      </Route>
      <Route path="/demo" component={Demo} />
      <Route path="/apply" component={Apply} />
      <Route path="/application-status" component={ApplicationStatus} />
      <Route path="/set-password" component={SetPassword} />
      <Route path="/pro-waitlist" component={ProWaitlist} />
      <Route path="/checkout" component={PartnerCheckout} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/checkout/cancel" component={CheckoutCancel} />
      <Route path="/home-waitlist" component={HomeownerWaitlistForm} />
      <Route path="/get-quotes" component={GetQuotes} />
      <Route path="/quotes/compare" component={QuoteComparison} />
      <Route path="/home-health-vault" component={HomeHealthVaultLanding} />
      <Route path="/join/:slug" component={JoinBySlug} />
      <Route path="/join" component={JoinLanding} />
      <Route path="/pro/join" component={JoinLanding} />
      <Route path="/referral" component={ReferralLanding} />
      <Route path="/waitlist/pro" component={ProWaitlist} />
      <Route path="/waitlist/homeowner" component={TrustyProWaitlistPage} />
      <Route path="/waitlist/homeowner/status" component={TrustyProWaitlistStatus} />
      <Route path="/contest" component={Contest} />
      <Route path="/partners" component={PartnerDirectory} />
      <Route path="/pro/:id" component={PartnerSpotlight} />
      <Route path="/login" component={LoginRedirect} />
      <Route path="/partner-login" component={PartnerLogin} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/partner-forgot-password" component={PartnerForgotPassword} />

      {/* Partner */}
      <Route path="/dashboard" component={PartnerDashboard} />
      <Route path="/partner/offers" component={PartnerOffers} />
      <Route path="/request-service" component={RequestService} />
      <Route path="/dashboard/leads" component={InboundLeads} />
      <Route path="/leads/marketplace" component={LeadMarketplace} />
      <Route path="/dashboard/referrals" component={MyReferrals} />
      <Route path="/match-history" component={MatchHistory} />
      <Route path="/job/new" component={LogJob} />
      <Route path="/job-log" component={JobLog} />
      <Route path="/job-complete" component={JobComplete} />
      <Route path="/jobs" component={JobHistory} />
      <Route path="/dashboard/reviews" component={PartnerReviews} />
      <Route path="/dashboard/commissions" component={CommissionLedger} />
      <Route path="/commission-ledger" component={CommissionLedger} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/partner-onboarding" component={PartnerOnboarding} />
      <Route path="/job/photo" component={PhotoUpload} />
      <Route path="/photo-upload" component={PhotoUpload} />
      <Route path="/dashboard/photo-guidelines" component={PhotoGuidelines} />
      <Route path="/dashboard/feed" component={NetworkFeed} />
      <Route path="/dashboard/tier" component={TierProgress} />
      <Route path="/dashboard/analytics" component={PartnerAnalytics} />
      <Route path="/dashboard/alerts" component={PerformanceAlerts} />
      <Route path="/dashboard/ai" component={AIChat} />
      <Route path="/dashboard/earnings" component={EarningsTracker} />
      <Route path="/dashboard/earnings-history" component={EarningsHistoryDashboard} />
      <Route path="/dashboard/earnings-calendar" component={EarningsCalendar} />
      <Route path="/earnings-history" component={EarningsHistory} />
      <Route path="/dashboard/whats-new" component={WhatsNew} />
      <Route path="/dashboard/market" component={MarketIntelligence} />
      <Route path="/dashboard/profile" component={PartnerProfileEditor} />
      <Route path="/partner-verification" component={PartnerVerificationPage} />
      <Route path="/dashboard/referral" component={ReferralLink} />
      <Route path="/dashboard/partner-home" component={PartnerHome} />
      <Route path="/dashboard/founding" component={FoundingNetworkDashboard} />
      <Route path="/dashboard/growth/referral-hub" component={ReferralHub} />
      <Route path="/dashboard/referral-hub" component={ReferralHub} />
      <Route path="/dashboard/network-income" component={NetworkIncomeSummary} />
      <Route path="/dashboard/network-directory" component={NetworkPartnerDirectory} />
      <Route path="/dashboard/goals" component={GoalTracker} />
      <Route path="/dashboard/charter-invites" component={CharterInvites} />
      <Route path="/dashboard/referral-funnel" component={ReferralFunnelTracker} />
      <Route path="/network-tree" component={NetworkTree} />
      <Route path="/dashboard/recruit" component={ReferralFunnelTracker} />
      <Route path="/dashboard/upgrade" component={TierUpgradeFlow} />
      <Route path="/dashboard/notifications" component={Notifications} />
      <Route path="/dashboard/notification-preferences" component={NotificationPreferences} />
      <Route path="/dashboard/integrations" component={IntegrationSettings} />
      <Route path="/dashboard/settings" component={PartnerSettings} />
      <Route path="/account/delete" component={AccountDeletion} />
      <Route path="/dashboard/inbox" component={UnifiedInbox} />
      <Route path="/dashboard/schedule" component={JobSchedule} />
      <Route path="/jobs/schedule" component={JobScheduler} />
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
      <Route path="/admin/matching" component={MatchingConsole} />

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
      <Route path="/dashboard/social" component={SocialShare} />
      <Route path="/admin/comms" component={CommsTimeline} />
      <Route path="/admin/properties" component={PropertyTimeline} />
      <Route path="/admin/properties/:address/report" component={PropertyReport} />
      <Route path="/admin/partners/:id/report" component={PartnerReport} />
      <Route path="/admin/smart-notifications" component={SmartNotifications} />
      <Route path="/admin/leaderboard" component={Leaderboard} />
      <Route path="/admin/lead-scoring" component={LeadScoring} />
      <Route path="/admin/heatmap" component={HeatMap} />
      <Route path="/admin/analytics" component={Analytics} />
      <Route path="/admin/network-analytics" component={NetworkAnalytics} />
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

      {/* TrustyPro — 7 company dashboards */}

      {/* ProLnk Media — 7 company dashboards */}

      {/* V6 -- Predictive Engine */}
      <Route path="/admin/predict" component={EventEngineDashboard} />
      <Route path="/admin/ai-pipeline" component={AIPipelineMonitor} />
      <Route path="/admin/storm-watch" component={StormWatch} />
      <Route path="/admin/storm" component={StormDashboard} />
      <Route path="/admin/agents" component={AgentTracker} />
      <Route path="/admin/agent-status" component={AgentStatusDashboard} />
      <Route path="/admin/org-chart" component={CompanyOrgChart} />
      <Route path="/admin/accountability" component={Accountability} />
      <Route path="/admin/agent-command-center" component={AgentCommandCenter} />
      <Route path="/admin/ai-command-center" component={AICommandCenter} />
      <Route path="/admin/system-health" component={SystemHealthDashboard} />
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
      <Route path="/network-stats" component={NetworkStats} />

      {/* TrustyPro -- Homeowner Platform */}
      <Route path="/trustypro">
        <SmoothScrollProvider><TrustyProHome /></SmoothScrollProvider>
      </Route>
      <Route path="/trustypro/app" component={TrustyProApp} />
      <Route path="/trustypro/claim" component={ClaimHome} />
      <Route path="/trustypro/login" component={TrustyProLogin} />
      <Route path="/trustypro/homeowner-login" component={HomeownerLogin} />
      <Route path="/trustypro/dashboard" component={TrustyProHomeownerDashboard} />
      <Route path="/trustypro/waitlist" component={TrustyProWaitlist} />
      <Route path="/pro/waitlist" component={ProWaitlist} />
      {/* WAITLIST PHASE: /trustypro/scan and all /my-home/* routes are gated until launch */}
      <Route path="/trustypro/property-setup" component={PropertySetup} />
      <Route path="/trustypro/scan" component={PhotoScan} />
      <Route path="/trustypro/home-health" component={HomeHealthDashboard} />
      <Route path="/trustypro/pros" component={TrustyProDirectory} />
      <Route path="/trustypro/book" component={BookPro} />
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
      <Route path="/dashboard/onboarding" component={DashboardOnboardingChecklist} />
      <Route path="/dashboard/features" component={FeatureDiscovery} />
      <Route path="/dashboard/disputes" component={DisputeCenter} />
      <Route path="/dashboard/payout-setup" component={PayoutSetup} />
      <Route path="/dashboard/payout-history" component={PayoutHistory} />
      <Route path="/dashboard/training" component={TrainingHub} />
      <Route path="/dashboard/calculator" component={CommissionCalculator} />
      <Route path="/commission-calculator" component={CommissionCalculatorAdvanced} />
      <Route path="/dashboard/compliance" component={ComplianceDocs} />
      <Route path="/upgrade/success" component={UpgradeSuccess} />
      <Route path="/success" component={SuccessPage} />
      <Route path="/admin/analytics-deep-dive" component={AnalyticsDeepDive} />
      <Route path="/admin/tasks" component={AdminTaskList} />
      <Route path="/admin/business-plan" component={BusinessPlan} />
      <Route path="/admin/investor" component={InvestorDashboard} />
      <Route path="/admin/patent" component={PatentDisclosure} />
      <Route path="/admin/campaigns" component={CampaignCenter} />
      <Route path="/admin/marketing-automation" component={MarketingAutomationDashboard} />
      <Route path="/partner-agreement" component={PartnerAgreement} />
      <Route path="/partner-faq" component={PartnerFAQ} />
      <Route path="/partner-resources" component={PartnerResourceCenter} />
      <Route path="/compliance" component={ComplianceDocs} />
      <Route path="/admin/compliance" component={StrikeManagement} />
      <Route path="/admin/waitlist" component={WaitlistManager} />
      <Route path="/admin/charter-tracking" component={CharterTracking} />
      <Route path="/admin/waitlist-intelligence" component={WaitlistIntelligence} />
      <Route path="/admin/referral-tree" component={ReferralTree} />
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
      <Route path="/pricing" component={Pricing} />
      <Route path="/pricing/standard" component={PostFoundingPricing} />

      {/* Fallback */}
      <Route path="/docs/api" component={ApiDocs} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/ccpa" component={CCPARights} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/security" component={SecurityTrustCenter} />
      <Route path="/404" component={NotFound} />
      {/* V12 + 20-feature routes */}
      <Route path="/trustypro/scans" component={TrustyProScanHistory} />
      <Route path="/trustypro/gallery" component={ProjectGallery} />
      <Route path="/trustypro/partner-dashboard" component={TrustyProPartnerDashboard} />
      <Route path="/exchange" component={ExchangeLanding} />
      <Route path="/exchange/home" component={ExchangeHome} />
      <Route path="/exchange/jobs" component={ExchangeJobs} />
      <Route path="/exchange/contractors" component={ExchangeContractors} />
      <Route path="/exchange/my-bids" component={ExchangeMyBids} />
      <Route path="/exchange/post" component={ExchangePostJob} />
      <Route path="/exchange/commercial" component={ProLnkExchangeCommercial} />
      <Route path="/ach-authorization" component={AchAuthorizationPage} />
      <Route path="/my-home/milestones" component={TrustyProComingSoon} />
      <Route path="/dashboard/growth-calculator" component={GrowthCalculator} />
      <Route path="/dashboard/community" component={CommunityForum} />
      <Route path="/leaderboard" component={PublicLeaderboard} />
      <Route path="/network/leaderboard" component={PublicLeaderboard} />
      <Route path="/partner-leaderboard" component={PartnerLeaderboard} />
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
      <Route path="/admin/revenue-forecaster" component={RevenueForecaster} />
      <Route path="/admin/network-growth" component={NetworkGrowthDashboard} />
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
      <Route path="/dashboard/tax" component={TaxCenter} />
      <Route path="/my-home/compare-contractors" component={TrustyProComingSoon} />
      <Route path="/my-home/seasonal-prep" component={SeasonalPrepGuide} />
      <Route path="/my-home/notifications" component={NotificationSettings} />
      <Route path="/my-home/notification-settings" component={NotificationSettings} />
      <Route path="/my-home/documents" component={DocumentVault} />
      <Route path="/my-home/document-vault" component={DocumentVault} />
      <Route path="/my-home/referral" component={HomeownerReferral} />
      <Route path="/my-home/homeowner-referral" component={HomeownerReferral} />
      <Route path="/neighborhood-referral" component={NeighborhoodReferral} />
      <Route path="/my-home/neighborhood-referral" component={NeighborhoodReferral} />
      <Route path="/my-home/emergency" component={EmergencyServices} />
      <Route path="/my-home/neighborhood-deals" component={NeighborhoodDeals} />
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
      <Route path="/dashboard/forecast" component={EarningsForecast} />
      <Route path="/dashboard/earnings-detail" component={EarningsDeepDive} />
      <Route path="/dashboard/network" component={NetworkVisualization} />
      <Route path="/dashboard/contest" component={ReferralContest} />
      <Route path="/dashboard/jobs" component={JobPipeline} />
      <Route path="/dashboard/credentials" component={CertificationsLicenses} />
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
      <Route path="/admin/integrations-dashboard" component={IntegrationsDashboard} />
      <Route path="/admin/background-checks" component={BackgroundChecks} />
      <Route path="/admin/verification-queue" component={PartnerVerificationQueue} />
      <Route path="/admin/payment-monitor-dashboard" component={PaymentMonitorDashboard} />
      <Route path="/admin/tax-reporting" component={TaxReportingCenter} />
      <Route path="/admin/address-validation" component={AddressValidationLog} />
      <Route path="/admin/performance-coach" component={PartnerPerformanceCoach} />
      <Route path="/admin/prospect-pipeline" component={ProspectPipeline} />
      <Route path="/admin/market-expansion" component={MarketExpansionPlanner} />
      <Route path="/admin/revenue-analytics" component={RevenueAnalytics} />

      {/* Investor & Press */}
      <Route path="/investor" component={InvestorPage} />
      <Route path="/press" component={PressKit} />

      {/* Content & Marketing */}
      <Route path="/help" component={HelpCenter} />
      <Route path="/api-guide" component={APIGuide} />
      <Route path="/faq" component={FAQ} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/blog" component={Blog} />
      <Route path="/how-ai-works" component={HowAIWorks} />
      <Route path="/for-real-estate-agents" component={ForRealEstateAgents} />
      <Route path="/for-insurance-agents" component={ForInsuranceAgents} />
      <Route path="/for-property-managers" component={ForPropertyManagers} />
      <Route path="/storm-alert" component={StormAlert} />
      <Route path="/trades" component={TradeLandingList} />
      <Route path="/trades/:trade" component={TradeLanding} />
      <Route path="/cities" component={CityLandingList} />
      <Route path="/cities/:city" component={CityLanding} />

      {/* Agent Portal */}
      <Route path="/agent/signup" component={AgentSignup} />
      <Route path="/partner-signup" component={PartnerSignup} />
      <Route path="/agent/dashboard" component={AgentDashboard} />
      <Route path="/agent/pre-listing-scan" component={PreListingScan} />

      {/* Partner Training */}
      <Route path="/resources/photo-guide" component={PhotoGuide} />
      <Route path="/resources/maximize-earnings" component={MaximizeEarnings} />
      <Route path="/resources/faq" component={PartnerFAQ} />
      <Route path="/resources/success-stories" component={SuccessStoriesPage} />
      <Route path="/resources/academy" component={ProLnkAcademy} />
      <Route path="/resources/competitive" component={CompetitiveAdvantage} />

      {/* Lead Management */}
      <Route path="/leads" component={LeadInbox} />
      <Route path="/leads/:id" component={LeadDetail} />
      <Route path="/jobs/:id/document" component={JobDocumentation} />
      <Route path="/home-documentation" component={HomeDocumentation} />
      <Route path="/founding-partner" component={FoundingPartnerPage} />
      <Route path="/founding-network" component={FoundingPartnerPage} />
      <Route path="/billing" component={PartnerBilling} />
      <Route path="/tier-benefits" component={TierBenefits} />
      <Route path="/waitlist-status" component={WaitlistStatus} />
      <Route path="/waitlist/status" component={WaitlistStatus} />
      <Route path="/content-library" component={ContentLibrary} />

      {/* Homeowner Extensions */}
      <Route path="/my-home/check-in" component={CheckInSystem} />
      <Route path="/my-home/ask-a-pro" component={AskAPro} />
      <Route path="/my-home/landlord" component={LandlordView} />
      <Route path="/my-home/portfolio" component={PropertyPortfolio} />
      <Route path="/my-home/insurance-claim" component={InsuranceClaimAssistant} />
      <Route path="/my-home/insurance-coverage" component={InsuranceCoverageChecker} />
      <Route path="/my-home/warranties" component={WarrantyTracker} />
      <Route path="/my-home/neighborhood" component={NeighborhoodInsights} />
      <Route path="/my-home/record" component={DigitalHomeRecord} />
      <Route path="/my-home/budget" component={HomeMaintenanceBudget} />
      <Route path="/my-home/appliances" component={HomeApplianceTracker} />
      <Route path="/my-home/emergency-plan" component={EmergencyResponsePlan} />
      <Route path="/my-home/insurance" component={InsuranceVault} />
      <Route path="/my-home/alerts" component={SmartAlerts} />
      <Route path="/my-home/improvements" component={ImprovementPlanner} />
      <Route path="/my-home/value" component={HomeValueTracker} />
      <Route path="/my-home/local-alerts" component={LocalServiceAlerts} />
      <Route path="/welcome" component={HomeownerOnboarding} />


      {/* Wave 50: New feature routes */}
      <Route path="/admin/checkr" component={CheckrIntegration} />
      <Route path="/income-streams" component={IncomeStreamsExplainer} />
      <Route path="/homeowner/first-time-guide" component={FirstTimeBuyerGuide} />
      <Route path="/my-home/neighborhood-map" component={NeighborhoodSafetyMap} />
      <Route path="/dashboard/social-sharing" component={SocialSharingKit} />
      <Route path="/dashboard/social-kit" component={SocialSharingKit} />
      <Route path="/my-home/school-districts" component={SchoolDistrictGuide} />
      <Route path="/admin/lead-heat-map" component={LeadHeatMap} />
      <Route path="/my-home/diy-calculator" component={DIYVsProCalculator} />
      <Route path="/admin/spotlight-creator" component={SpotlightCreator} />
      <Route path="/income-comparison" component={IncomeComparison} />
      <Route path="/network-income-calculator" component={NetworkIncomeCalculator} />
      <Route path="/my-home/pool-spa" component={PoolSpaGuide} />
      <Route path="/admin/webhook-monitor" component={WebhookMonitor} />
      <Route path="/admin/funnel-analytics" component={FunnelAnalyticsDashboard} />
      <Route path="/my-home/garage-door" component={GarageDoorGuide} />
      <Route path="/dashboard/photo-tips" component={PhotoTipsGuide} />
      <Route path="/my-home/windows" component={WindowGuide} />
      <Route path="/dashboard/daily-briefing" component={DailyBriefing} />
      <Route path="/dashboard/briefing" component={DailyBriefing} />
      <Route path="/my-home/air-quality" component={AirQualityGuide} />
      <Route path="/admin/partner-comms" component={PartnerCommunicationHub} />
      <Route path="/my-home/fence-installation" component={FenceInstallationGuide} />
      <Route path="/my-home/pool-maintenance" component={PoolMaintenanceGuide} />
      <Route path="/my-home/kitchen-remodel" component={KitchenRemodelGuide} />
      <Route path="/my-home/roof-inspection" component={RoofInspectionGuide} />
      <Route path="/my-home/drainage-grading" component={DrainageAndGradingGuide} />
      <Route path="/my-home/driveway-maintenance" component={DrivewayMaintenanceGuide} />
      <Route path="/resources/network-growth-playbook" component={NetworkGrowthPlaybook} />
      <Route path="/resources/prolnk-vs-going-alone" component={ProLnkVsGoingAlone} />
      <Route path="/resources/weekend-warrior" component={PartnerWeekendWarriorGuide} />
      <Route path="/trustypro/pricing" component={TrustyProPricingExplainer} />
      <Route path="/dashboard/milestones" component={MilestoneSystem} />
      <Route path="/my-home/pest-control" component={PestControlGuide} />
      <Route path="/dashboard/income-statement" component={IncomeStatement} />
      <Route path="/my-home/maintenance-calendar" component={HomeMaintenanceCalendar} />
      <Route path="/admin/leaderboard-admin" component={LeaderboardAdmin} />
      <Route path="/dashboard/morning-checklist" component={MorningChecklist} />
      <Route path="/dashboard/morning" component={MorningChecklist} />
      <Route path="/my-home/cleaning" component={DeepCleaningGuide} />
      <Route path="/admin/announcements" component={AnnouncementCenter} />
      <Route path="/dashboard/income-goals" component={IncomeGoals} />
      <Route path="/dashboard/win-rate" component={WinRateOptimizer} />
      <Route path="/my-home/budget-planner" component={SmartBudgetPlanner} />
      <Route path="/admin/platform-health-summary" component={PlatformHealthSummary} />
      <Route path="/dashboard/market-intel" component={MarketIntelligenceFeed} />
      <Route path="/admin/tier-breakdown" component={TierBreakdownDashboard} />
      <Route path="/my-home/financing" component={RenovationFinancingGuide} />
      <Route path="/docs" component={Documentation} />
      
      {/* ── App Preview Screens (mobile mockups) ── */}
      <Route path="/app-preview/home" component={ProLnkHomePreview} />
      <Route path="/app-preview/lead" component={ProLnkLeadPreview} />
      <Route path="/app-preview/earnings" component={ProLnkEarningsPreview} />
      <Route path="/app-preview/network" component={ProLnkNetworkPreview} />
      <Route path="/app-preview/field" component={ProLnkFieldPreview} />
      <Route path="/trustypro/app-preview/home" component={TPHomePreview} />
      <Route path="/trustypro/app-preview/scan" component={TPScanPreview} />
      <Route path="/trustypro/app-preview/property" component={TPPropertyPreview} />
      <Route path="/trustypro/app-preview/find-pro" component={TPFindProPreview} />
      <Route path="/trustypro/app-preview/alerts" component={TPAlertsPreview} />
      <Route component={NotFound} />
      <Route path="/resources/partner-first-30-days" component={PartnerFirst30Days} />
      <Route path="/resources/income-forecaster" component={PartnerAnnualIncomeForecaster} />
      <Route path="/resources/partner-faq" component={PartnerFAQ} />
      <Route path="/resources/partner-tax-guide" component={PartnerTaxGuide} />
      <Route path="/resources/charter-vs-founding" component={CharterVsFoundingComparison} />
      <Route path="/resources/marketing-kit" component={PartnerMarketingKit} />
      <Route path="/resources/referral-calculator" component={ReferralNetworkCalculator} />
      <Route path="/my-home/siding" component={SidingReplacementGuide} />
      <Route path="/my-home/electrical-panel" component={ElectricalPanelUpgradeGuide} />
      <Route path="/my-home/flooring" component={CarpetVsHardwoodGuide} />
      <Route path="/my-home/mold-remediation" component={MoldRemediationGuide} />
      <Route path="/my-home/backyard-remodel" component={DFWBackyardRemodelGuide} />
      <Route path="/my-home/home-equity" component={HomeEquityGuide} />
      <Route path="/my-home/permits" component={DFWPermitGuide} />
      <Route path="/my-home/exterior-paint" component={ExteriorPaintGuide} />
      <Route path="/my-home/tree-service" component={TreeServiceGuide} />
    </Switch>
    </Suspense>
  );
}

function AppContent() {
  const [location] = useLocation();
  return (
    <>
      <RewardfulScript />
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
