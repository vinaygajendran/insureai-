import type {
  Policy,
  WaitingPeriod,
  RenewalAlert,
  GapInsight,
  CoverageAggregate,
  AadhaarData,
  ChatMessage,
} from "../types/policy";

export const mockAadhaar: AadhaarData = {
  maskedAadhaar: "XXXX-XXXX-4821",
  name: "Arjun Sharma",
  dob: "12 March 1988",
  gender: "Male",
  address: "204, Prestige Meadows, Whitefield",
  state: "Karnataka",
  pincode: "560066",
};

export const mockPolicies: Policy[] = [
  {
    id: "pol-001",
    name: "Star Health Comprehensive",
    insurer: "Star Health & Allied Insurance",
    type: "health",
    status: "active",
    policyNumber: "P/211321/01/2024/001842",
    sumInsured: 500000,
    premium: 18420,
    premiumFrequency: "annual",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    members: ["Self", "Spouse", "Daughter (4 yrs)"],
    usedAmount: 95000,
    logoColor: "#e87c2b",
  },
  {
    id: "pol-002",
    name: "HDFC Ergo Optima Secure",
    insurer: "HDFC ERGO General Insurance",
    type: "health",
    status: "active",
    policyNumber: "2825/89221041/00/000",
    sumInsured: 300000,
    premium: 12650,
    premiumFrequency: "annual",
    startDate: "2023-07-15",
    endDate: "2025-07-14",
    members: ["Self"],
    usedAmount: 0,
    logoColor: "#004c8c",
  },
  {
    id: "pol-003",
    name: "LIC New Jeevan Anand",
    insurer: "Life Insurance Corporation of India",
    type: "life",
    status: "active",
    policyNumber: "729861240",
    sumInsured: 1000000,
    premium: 4210,
    premiumFrequency: "quarterly",
    startDate: "2020-01-10",
    endDate: "2040-01-09",
    members: ["Self"],
    usedAmount: 0,
    logoColor: "#1e3a5f",
  },
];

export const mockCoverage: CoverageAggregate = {
  totalSumInsured: 1800000,
  totalUsed: 95000,
  totalPolicies: 3,
  activePolicies: 3,
  nearestRenewalDays: 45,
  nearestRenewalPolicy: "Star Health Comprehensive",
};

export const mockWaitingPeriods: WaitingPeriod[] = [
  {
    id: "wp-001",
    policyId: "pol-001",
    policyName: "Star Health Comprehensive",
    condition: "Pre-existing conditions (Hypertension)",
    type: "PED",
    startDate: "2024-04-01",
    endDate: "2025-04-01",
    daysRemaining: 0,
    notifyEnabled: false,
  },
  {
    id: "wp-002",
    policyId: "pol-001",
    policyName: "Star Health Comprehensive",
    condition: "Maternity benefit",
    type: "maternity",
    startDate: "2024-04-01",
    endDate: "2026-04-01",
    daysRemaining: 334,
    notifyEnabled: true,
  },
  {
    id: "wp-003",
    policyId: "pol-001",
    policyName: "Star Health Comprehensive",
    condition: "Joint replacement surgeries",
    type: "specific",
    startDate: "2024-04-01",
    endDate: "2025-10-01",
    daysRemaining: 0,
    notifyEnabled: false,
  },
  {
    id: "wp-004",
    policyId: "pol-002",
    policyName: "HDFC Ergo Optima Secure",
    condition: "Initial waiting period (all claims)",
    type: "initial",
    startDate: "2023-07-15",
    endDate: "2023-10-15",
    daysRemaining: 0,
    notifyEnabled: false,
  },
];

export const mockRenewals: RenewalAlert[] = [
  {
    id: "ren-001",
    policyId: "pol-001",
    policyName: "Star Health Comprehensive",
    insurer: "Star Health & Allied Insurance",
    renewalDate: "2025-03-31",
    daysUntilRenewal: 45,
    premium: 18420,
    tip: "Your family has grown — consider upgrading sum insured to ₹10L before renewal.",
  },
  {
    id: "ren-002",
    policyId: "pol-002",
    policyName: "HDFC Ergo Optima Secure",
    insurer: "HDFC ERGO General Insurance",
    renewalDate: "2025-07-14",
    daysUntilRenewal: 73,
    premium: 12650,
    tip: "No claims this year — you may be eligible for a No Claim Bonus top-up.",
  },
];

export const mockGapInsight: GapInsight = {
  suggestedCover: 1000000,
  currentCover: 800000,
  gap: 200000,
  city: "Bengaluru",
  familySize: 3,
  riskLevel: "medium",
  reasons: [
    "Bengaluru ICU costs average ₹25,000–₹40,000/day (Apollo, Manipal)",
    "Your daughter's pediatric cover is under-estimated by ~₹2L",
    "No critical illness rider detected on any active policy",
    "Maternity benefit active but sum capped at ₹50,000",
  ],
};

export const suggestedQuestions = [
  "Is my father's knee replacement covered?",
  "What is my maternity waiting period end date?",
  "Does my policy cover COVID-19 treatment?",
  "What is my remaining cover for this year?",
  "Is Ayurvedic treatment (AYUSH) covered?",
  "Can I claim OPD expenses?",
];

const cannedAnswers: Record<string, { text: string; type: "yes" | "no" | "partial" }> = {
  "Is my father's knee replacement covered?": {
    text: "**Partial.** Knee replacement is covered under Star Health Comprehensive, but only after a **2-year waiting period** (ends April 2026). Also, your father is not listed as a covered member on this policy — you would need to add him at renewal. HDFC Ergo Optima Secure covers only you.",
    type: "partial",
  },
  "What is my maternity waiting period end date?": {
    text: "**April 1, 2026** is your maternity waiting period end date on Star Health Comprehensive. That's roughly **11 months away**. The benefit covers delivery expenses up to ₹50,000 + newborn cover up to ₹25,000 for the first 90 days.",
    type: "yes",
  },
  "Does my policy cover COVID-19 treatment?": {
    text: "**Yes.** Both Star Health and HDFC Ergo Optima Secure cover COVID-19 hospitalisation as per IRDAI circular. Minimum 24-hour admission is required. Home care packages are **not covered** under your current plans.",
    type: "yes",
  },
  "What is my remaining cover for this year?": {
    text: "You've used **₹95,000** out of your **₹5,00,000** Star Health cover this policy year. Remaining: **₹4,05,000**. Your HDFC Ergo policy (₹3,00,000) has **₹0 used** — fully available. Total remaining across health policies: **₹7,05,000**.",
    type: "yes",
  },
  "Is Ayurvedic treatment (AYUSH) covered?": {
    text: "**Partial.** AYUSH treatments are covered under Star Health Comprehensive up to **₹20,000 per year** — only for inpatient treatment at NABH-accredited AYUSH hospitals. OPD Ayurveda consultations are **not covered**.",
    type: "partial",
  },
  "Can I claim OPD expenses?": {
    text: "**No.** Neither of your current health policies includes an OPD rider. OPD expenses (doctor consultations, pharmacy, diagnostics without hospitalisation) must be paid out of pocket. You may want to add an OPD top-up at next renewal.",
    type: "no",
  },
};

export function getAiAnswer(question: string): { text: string; type: "yes" | "no" | "partial" } {
  return (
    cannedAnswers[question] ?? {
      text: "I've reviewed your policies on this question. Based on the terms in your **Star Health Comprehensive** and **HDFC Ergo Optima Secure** documents, this specific scenario is not explicitly mentioned. I recommend calling Star Health at **1800-425-2255** or checking your policy schedule for clause 3.2 (General Exclusions).",
      type: "partial",
    }
  );
}

export const initialChatMessages: ChatMessage[] = [
  {
    id: "sys-001",
    role: "assistant",
    content:
      "Hi Arjun! I've read all 3 of your policies. Ask me anything — coverage questions, exclusions, waiting periods, or claims. I'll give you a straight answer based on **your actual documents**.",
    timestamp: new Date(),
  },
];
