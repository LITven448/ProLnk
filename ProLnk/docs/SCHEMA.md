# Database Schema - 130+ Tables Overview

**Database**: TiDB Cloud (MySQL-compatible)
**Schema File**: drizzle/schema.ts (auto-generated, do not edit manually)
**Tables**: 130+ total across 10 major groups

---

## Table Group 1: Core Users (15 tables)

### Partners (Professional Users)

**partners** - Main pro profile
- id (PK), email, passwordHash, phoneNumber
- firstName, lastName, businessName
- tradeType (plumber, electrician, hvac, etc.)
- serviceAreaZips (JSON array of zip codes)
- serviceRadius (miles)
- tier (1-5, commission tier)
- yearsExperience, licensedStates, insuranceInfo
- monthlyEarnings, lifetimeEarnings
- rating (0-5), reviewCount
- isActive, isSuspended, suspendedReason
- referrerId (who recruited this pro)
- createdAt, updatedAt, lastLoginAt

**partners_verification** - License/insurance verification
- id, partnerId (FK), type (license, insurance, background)
- status (pending, approved, rejected)
- verificationImageUrl, expiryDate
- verifiedBy (admin ID), verifiedAt

**partners_social_accounts** - Auth integration
- id, partnerId (FK), provider (google, apple, facebook)
- providerUserId, accessToken, refreshToken
- createdAt, lastUsedAt

**partners_devices** - Device tracking
- id, partnerId (FK), deviceId (unique per phone/browser)
- deviceType (ios, android, web), osVersion
- appVersion, lastLocationLat, lastLocationLon
- lastUsedAt, isActive

**partners_preferences** - User settings
- id, partnerId (FK)
- notificationPreferences (JSON: email, sms, push booleans)
- privacyLevel (public, private, network-only)
- languages, timezone, currency
- darkMode, theme preferences

### Homeowners (Customer Users)

**homeowners** - Main homeowner profile
- id (PK), email, passwordHash, phoneNumber
- firstName, lastName
- primaryAddress, city, state, zipCode, latitude, longitude
- homeOwnershipStatus (own, rent, other)
- numberOfProperties
- referrerId (who referred this homeowner)
- isActive, isSuspended
- createdAt, updatedAt, lastLoginAt

**homeowner_homes** - Homes associated with homeowner
- id (PK), homeownerId (FK)
- address, city, state, zipCode
- latitude, longitude (for geo-matching)
- yearBuilt, squareFeet, propertyValue
- isVerified (address verification), verifiedAt
- isPrimary (main address)
- createdAt, updatedAt

**homeowner_contacts** - Contact records
- id (PK), homeownerId (FK)
- type (primary, secondary, emergency)
- firstName, lastName, phoneNumber
- email, relationship

### Waitlist (May 6 Launch)

**partner_signups** - Pro signup form submissions (May 6)
- id, email, name, phoneNumber
- tradeType, serviceAreas (JSON)
- referralSource, ipAddress
- isConfirmed, confirmedAt
- isConverted (to full partner), convertedAt
- metadata (form version, utm params)

**homeowner_signups** - Homeowner form submissions (May 6)
- id, email, name, phoneNumber
- address, serviceNeeded
- referralSource, ipAddress
- isConfirmed, confirmedAt
- isConverted (to full account), convertedAt
- metadata

### Admin/Support

**admins** - Admin user accounts
- id, email, passwordHash, displayName
- role (superadmin, moderator, support)
- permissions (JSON array)
- isActive, createdAt, lastLoginAt

**support_tickets** - Help desk
- id, partnerId/homeownerId (FK), type
- subject, description, attachments (JSON)
- status (open, in_progress, resolved, closed)
- assignedTo (admin ID), priority
- createdAt, updatedAt, resolvedAt

---

## Table Group 2: Opportunities & Matching (20 tables)

### Opportunities (Leads)

**opportunities** - Main lead record
- id (PK), homeownerId (FK), homeId (FK)
- serviceCategory (electrical, plumbing, hvac, roofing, etc.)
- description, budget (low/medium/high), estimatedValue
- urgency (emergency/urgent/normal/flexible)
- status (open, matched, in_progress, completed, archived)
- expiresAt (lead validity window)
- referrerId (who referred homeowner)
- matchedProId (first match), matchedAt
- createdAt, updatedAt, completedAt

**opportunity_quotes** - Multiple pro quotes per lead
- id, opportunityId (FK), proId (FK)
- quotedValue, quotedDate, expiresAt
- status (pending, accepted, rejected, expired)
- quoteDetails (JSON)
- acceptedAt, rejectedReason, rejectedAt
- completionDate (actual)

**opportunity_notes** - Internal notes
- id, opportunityId (FK), createdByProId/homeownerId (FK)
- noteType (internal, customer-visible)
- content, attachments (JSON)
- createdAt, isPinned

### Matching Logic

**pro_matches** - Match record (pro-lead connection)
- id (PK), opportunityId (FK), proId (FK), homeownerId (FK)
- matchScore (0-100, quality score)
- scoreBreakdown (JSON: service type match, distance, tier, etc.)
- matchedAt, matchedBy (system or manual)
- proViewedAt, proAcceptedAt, proRejectedAt
- homeownerAcceptedAt, homeownerRejectedAt
- matchStatus (pending, accepted, rejected, working, completed)

**pro_service_areas** - Geographic coverage
- id, proId (FK), zipCode
- zipCodeLatitude, zipCodeLongitude, radiusInMiles
- isFocusArea (preferred area)
- coverage (full, partial), isActive
- createdAt, updatedAt

**pro_service_types** - Service specialties
- id, proId (FK), serviceType
- yearsSpecializing, certificationLevel
- isSpecialty (focus area), ratingsInCategory
- costTier (budget/standard/premium)

### Lead Quality

**lead_scoring_factors** - Algorithm inputs
- id, opportunityId (FK)
- propertyValue, homeAge, homeSize
- serviceUrgency, budgetAvailable
- locationDensity (pros available), demandLevel
- seasonalFactor, weatherFactor
- qualityScore (output of all factors)
- lastCalculatedAt

**lead_performance_history** - Analytics
- id, opportunityId (FK)
- impressionCount (how many pros saw it)
- clickCount, quoteCount
- acceptedQuoteCount, completionCount
- completionRate, avgQuoteValue
- proSatisfaction (if completed)
- createdAt, analyzedAt

---

## Table Group 3: Home Health Vault (35 tables)

### Core Home Data

**homes** - Main home record (in Vault)
- id (PK), homeownerId (FK)
- address, city, state, zipCode, lat/lon
- originatorId (who added to vault, earns override)
- bedrooms, bathrooms, squareFeet
- yearBuilt, yearRenovated, architectureStyle
- numberOfFloors, basement, attic
- lotSize, propertyValue
- isVerified, verifyMethod (deed, self-reported)
- createdAt, updatedAt, lastUpdatedBy (homeowner/pro)

### Structural Systems (30+ tables)

**homes_roof** - Roof details
- homeId (FK), roofType (asphalt, metal, tile, slate)
- roofShape, numberOfRidges, roofArea
- roofPitchDegrees, roofMaterial (details)
- yearInstalled, yearsRemaining, condition (good/fair/poor)
- inspectionDate, nextReplacementEstimate

**homes_electrical** - Electrical system
- homeId (FK), mainPanelAmperage, panelType
- numberOfCircuits, groundedSystem (yes/no)
- lastUpgradeYear, knobAndTube (yes/no)
- aluminum wiring (yes/no), grounding status
- lastInspectionDate, hazards (JSON)

**homes_plumbing** - Plumbing system
- homeId (FK), waterSourceType (municipal/well)
- waterHeaterType (gas/electric/tankless), waterHeaterYear
- waterHeaterCapacity
- drainageType (sewer/septic), sewerLastInspected
- pipeType (copper/pvc/galvanized), pipeCondition
- waterPressure (psi), hasGasLine, hasBackflow

**homes_hvac** - Heating/cooling
- homeId (FK), heatingType (gas/electric/heat_pump/oil)
- coolingType (ac/central/none), acAge
- furnaceAge, boilerAge
- acCoolCapacity (ton), heatingCapacity (btu)
- thermostats (number, smart/manual)
- ducts (type, condition), lastMaintenance

**homes_insulation** - Insulation & weatherization
- homeId (FK), atticInsulation (r-value, type)
- wallInsulation (type, r-value), basementInsulation
- foundationType (concrete/brick/stone/wood)
- foundationCondition, crawlspaceCondition
- weatherStripping (yes/no), caulking (yes/no)
- weatherSealing (level 1-5)

**homes_foundation** - Foundation details
- homeId (FK), foundationType, foundationMaterial
- foundationCondition (good/fair/poor)
- cracks (yes/no), crackDetails
- settlement (yes/no), waterIntrusion (yes/no)
- lastInspectionDate, issues (JSON)

**homes_windows_doors** - Openings
- homeId (FK), numberOfWindows, numberOfDoors
- windowType (single/double/triple pane)
- windowCondition, yearInstalled
- doorsType (wood/metal), doorsCondition
- hasStormDoors, hasWeatherStripping

**homes_kitchen** - Kitchen details
- homeId (FK), kitchenSize (small/medium/large)
- cabinetType, counterMaterial
- applianceAge (stove, dishwasher, fridge)
- applianceCondition, kitchenUpdatedYear

**homes_bathrooms** - Bathroom details (one per)
- homeId (FK), bathroomNumber
- bathroomSize, fixtures (toilet/sink/tub/shower)
- tileCondition, mold (yes/no), ventilation

**homes_siding** - Exterior siding
- homeId (FK), sidingType (vinyl/wood/brick/stone/metal)
- sidingCondition (good/fair/poor)
- sidingYearInstalled, repaintNeeded
- exteriorCondition, pests (yes/no)

**homes_solar** - Solar panel info
- homeId (FK), hasSolar (yes/no)
- panelCount, systemCapacityKw
- installedYear, warrantyYears
- productionMonthlyKwh, batteryStorage

**homes_garage** - Garage/carport
- homeId (FK), garageType (attached/detached/carport)
- spacesCount, openerType (manual/electric)
- conditionLevel, numberOfDoors

**homes_pool** - Pool/spa info
- homeId (FK), hasPool (yes/no)
- poolType (in_ground/above_ground)
- poolSize (gallons), poolMaterial
- filtrationSystem, maintenanceLevel

### Health & Safety (8 tables)

**home_health_hazards** - Known issues
- homeId (FK), hazardType (mold/lead/asbestos/radon)
- hazardStatus (identified/mitigated/unknown)
- hazardLocation, hazardDetails
- testDate, testResults
- remediationDate, remediation method

**home_lead_assessment** - Lead paint testing
- homeId (FK), yearBuilt (pre-1978), hasLeadPaint
- testedDate, testResult (positive/negative)
- leadLocations (JSON), leadRemediationDate
- certificates

**home_mold_assessment** - Mold history
- homeId (FK), moldFound (yes/no), moldTypes (JSON)
- moldAreas (attic/basement/crawlspace)
- moldRemediationDate, remediated (yes/no)
- hasHumidityControl, ventilationAdequate

**home_radon_assessment** - Radon testing
- homeId (FK), radonTested (yes/no)
- radonLevel (pCi/L), testDate
- aboveAction (yes/no), mitigation system
- mitigationDate

**home_water_quality** - Water testing
- homeId (FK), sourceTested (yes/no), wellwater (yes/no)
- chlorineLevel, phLevel, hardness, bacteria
- contaminants (JSON), tested Date

**home_air_quality** - Air quality
- homeId (FK), airQualityTested (yes/no)
- co2Level, voc (volatile organic compounds)
- dustLevel, particulates, tested Date

**home_pest_history** - Pest issues
- homeId (FK), pestType (termites/ants/mice/roaches)
- pestInfestationDate, severity
- treatmentApplied, treatmentDate
- currentStatus (clear/active)

**home_flooding_risk** - Flood/water
- homeId (FK), floodZone (fema designation)
- riverProximity (feet), floodHistory (yes/no)
- floodInsurance (yes/no), waterIntrusion
- drainageAdequate (yes/no)

### Maintenance & History (3 tables)

**home_maintenance_records** - Work done
- homeId (FK), maintenanceType
- serviceProvider, maintenanceDate
- cost, description, attachments (JSON)
- nextMaintenanceDue

**home_warranties** - Product warranties
- homeId (FK), productType, manufacturer
- purchaseDate, warrantyLength, expiryDate
- warrantyDetails (JSON)

**home_permits** - Building permits
- homeId (FK), permitNumber, permitType
- permitDate, permitCompleted
- permitDetails (JSON), inspector

---

## Table Group 4: Commissions & Payouts (12 tables)

### Commission Records

**commissions** - Individual commission earned
- id, matchId (FK), proId (FK), homeownerId (FK)
- commissionType (direct_match, network_l1, network_l2, network_l3, network_l4, subscription, homeowner, home_origination)
- baseAmount, rate (percentage), calculatedAmount
- status (pending, approved, disputed, paid)
- earnedAt, paidAt, disputedAt
- disputer Id, disputeReason

**commission_payout** - Monthly aggregate payout
- id, partnerId (FK), payoutMonth (YYYY-MM)
- commissionTotal, overrideTotal, subscriptionTotal
- homeownerOverrideTotal, homeOriginationTotal
- grossTotal, platformFeeDeducted, netTotal
- payoutStatus (pending, processing, sent, failed)
- paymentMethod (stripe_connect, ach, wire)
- stripePayoutId, achReferenceId
- processedAt, sentAt, failureReason

**commission_disputes** - Disputed commissions
- id, commissionId (FK), disputerId (FK)
- disputeType (amount_wrong, duplicate, unauthorized)
- description, attachments (JSON)
- status (open, in_review, resolved, rejected)
- resolution (uphold, adjust, reject)
- adjustmentAmount, resolvedAt, resolvedBy

### Referral System

**referrals** - Tracking who referred whom
- id, referrerId (FK), refereeId (FK)
- refereeType (pro/homeowner)
- referralDate, bonusAmount
- bonusStatus (pending, earned, paid)
- conversionDate (if referral converted)
- campaignSource (email, link, code, organic)

**referral_codes** - Unique codes for tracking
- id, partnerId (FK), referralCode (unique, 8 chars)
- generatedAt, usageCount, lastUsedAt
- isActive, expiryDate

---

## Table Group 5: Taxes & Compliance (10 tables)

### Tax Documents

**tax_1099_nec** - 1099-NEC forms
- id, partnerId (FK), taxYear
- grossAmount, quarterlyAmounts (q1-q4)
- addressOnFile, tinVerified
- fileStatus (draft, filed, submitted)
- filedDate, tin Hash (hashed for security)

**tax_quarterly_estimates** - Q1-Q4 projections
- id, partnerId (FK), taxYear, quarter
- estimatedIncome, estimatedTax
- lastCalculatedAt, notes

### Compliance Tracking

**compliance_audit_log** - Regulation adherence
- id, entityType (partner/homeowner), entityId
- complianceType (ccpa/gdpr/tcpa/respa)
- complianceStatus (compliant/non_compliant/review)
- lastAuditDate, auditNotes
- remediation Action, remediatedAt

**data_processing_agreement** - DPA tracking
- id, partnerId (FK), dpaStatus (signed/pending/rejected)
- dpaSignedDate, dpaExpiryDate
- dataProcessingTerms (JSON)

**gdpr_consent** - EU user consent
- id, partnerId/homeownerId (FK)
- consentType (marketing/analytics/profiling)
- consentGiven (yes/no), consentDate
- consentWithdrawnAt

**ccpa_rights** - Privacy request tracking
- id, homeownerId (FK), requestType (access/delete/opt_out)
- requestDate, requestStatus (pending/fulfilled/denied)
- dataSharedWith (JSON), deletedAt

**tcpa_opt_out** - Do not call list
- id, phoneNumber (hashed), emailAddress (hashed)
- optOutDate, optOutSource (request/complaint)
- isActive

### AML/Fraud

**aml_screening** - Anti-money laundering
- id, partnerId (FK), screeningDate
- screeningProvider, screeningResult
- riskLevel (low/medium/high/blocked)
- screeningDetails (JSON)

**fraud_alerts** - Suspicious activity
- id, entityType, entityId
- alertType (unusual_earnings, multi_account, collusion)
- alertDate, severity (low/medium/high/critical)
- investigation Status (open/investigated/dismissed)
- investigatedAt, findings

---

## Table Group 6: Communication (8 tables)

### Email/SMS Logs

**email_log** - Sent emails
- id, recipientEmail, senderType (system/partner/homeowner)
- emailType (confirmation/match/payout/marketing)
- subject, sentAt, openedAt, clickedAt
- deliveryStatus (sent/bounced/complained)
- template Used, parameterUsed (JSON)

**sms_log** - Sent text messages
- id, recipientPhone (hashed), senderType
- smsType (verification/notification/alert)
- messageBody, sentAt, readAt
- deliveryStatus (sent/failed/no_delivery)
- carrierId

### Notifications

**notifications** - In-app notifications
- id, recipientId, notificationType
- title, body, actionUrl
- isRead, readAt, createdAt
- expiresAt

**notification_preferences** - User choices
- id, partnerId/homeownerId (FK)
- emailNotifications (yes/no), smsNotifications
- pushNotifications, frequencyLimit
- doNotDisturbHours (JSON)

---

## Table Group 7: Analytics & Events (15 tables)

### Event Tracking

**events** - User action log
- id, userId (FK), userType (partner/homeowner)
- eventType (signup/login/view_lead/accept_match/submit_quote)
- eventData (JSON: page, button clicked, etc.)
- sessionId, ipAddress, userAgent
- createdAt, timestamp

**sessions** - Login sessions
- id, userId (FK), userType
- sessionToken (jwt/bearer), expiryDate
- loginAt, lastActivityAt, logoutAt
- ipAddress, userAgent, deviceId

### Analytics Tables

**daily_metrics** - Aggregated daily stats
- date, metricType (signups/matches/revenue)
- metricValue, breakdown (JSON by channel/region)

**cohort_analysis** - User cohorts
- cohortDate, cohortSize
- day1Retention, day7Retention, day30Retention
- day1Revenue, day7Revenue, day30Revenue

**geographic_heatmap** - Location-based metrics
- zipCode, latitude, longitude
- prosInZone, opportunitiesInZone
- averageMatchTime, conversionRate

---

## Table Group 8: Configuration (8 tables)

### System Config

**settings** - Global app settings
- key (unique), value, valueType (string/number/json)
- description, isSecret, lastChangedAt

**feature_flags** - Feature toggles
- flagName, isEnabled
- rolloutPercentage (0-100 for gradual rollout)
- enabledFor (JSON: list of partner IDs for testing)
- startDate, endDate

**email_templates** - Email content
- templateId, templateName
- subject, htmlBody, textBody
- placeholders (JSON), version

### Integrations

**stripe_accounts** - Stripe integration
- id, partnerId/companyId (FK)
- stripeCustomerId, stripeAccountId
- connectStatus (pending/connected/disconnected)
- paymentMethods (JSON), last4 (card)

**n8n_workflows** - Automation triggers
- workflowId, workflowName, workflowType
- triggerEvent, status (active/paused)
- lastExecuted, nextScheduled

---

## Table Group 9: Content (5 tables)

### CMS

**blog_posts** - Blog content
- id, title, slug, authorId (FK)
- content (markdown), featuredImage
- status (draft/published/archived)
- publishedAt, updatedAt, viewCount

**pages** - Static pages
- pageSlug, pageTitle, pageContent (markdown)
- metaDescription, metaKeywords
- lastUpdatedAt

**faqs** - FAQ entries
- id, question, answer, category
- displayOrder, isPublished, helpfulVotes

---

## Table Group 10: Misc/Support (10 tables)

### Audit & Logs

**audit_trail** - System audit log
- id, actionType, actorType (admin/system), actorId
- resourceType, resourceId, changeDetails (JSON)
- timestamp, ipAddress

**api_logs** - API call logging
- id, endpoint, method (GET/POST), statusCode
- responseTime (ms), userId (if authenticated)
- requestBody (JSON), errorMessage (if failed)
- timestamp

**backup_logs** - Database backups
- backupId, backupDate, backupSize
- backupStatus (success/failed), restorePoint
- retentionDays

### Misc

**push_tokens** - Device push notifications
- id, userId, tokenType (ios/android)
- deviceToken, isActive, expiryDate

**invitations** - Beta/early access
- id, email, invitationToken (unique)
- invitationType (beta/partner/investor)
- sentAt, claimedAt, expiresAt

**feature_requests** - User suggestions
- id, submitterId, feature Title, description
- votes, priority, status (open/in_progress/implemented)
- createdAt, closedAt

**announcements** - Site-wide messages
- id, title, content, priority (low/medium/high)
- publishedAt, expiresAt, audience (all/pros/homeowners)

---

## Schema Statistics

| Category | Count | Notes |
|----------|-------|-------|
| User & Auth | 15 | Partners, homeowners, waitlist, admin, devices |
| Opportunities | 20 | Leads, matching, scoring, performance |
| Vault | 35 | Homes, systems, health, maintenance, permits |
| Commissions | 12 | Earnings, payouts, disputes, referrals |
| Compliance | 10 | Taxes, audit, GDPR, CCPA, TCPA, AML, fraud |
| Communication | 8 | Emails, SMS, notifications, preferences |
| Analytics | 15 | Events, sessions, cohorts, heatmaps, metrics |
| Configuration | 8 | Settings, flags, templates, integrations |
| Content | 5 | Blog, pages, FAQs |
| Misc | 10 | Audit logs, backups, invites, features |
| **Total** | **138** | Complete schema for May 6 launch |

---

## Most-Queried Tables

These tables should have indexes for performance:

1. **opportunities** - Filtered by status, serviceCategory, location
2. **pro_matches** - Filtered by opportunityId, proId, matchStatus
3. **commissions** - Filtered by partnerId, payoutMonth
4. **partners** - Filtered by tier, serviceType, location
5. **homes** - Filtered by homeownerId, verified status
6. **events** - Filtered by userId, eventType, timestamp
7. **email_log** - Filtered by recipientEmail, sentAt
