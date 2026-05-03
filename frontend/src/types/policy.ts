export type PolicyType = "health" | "life" | "motor" | "travel" | "home";
export type PolicyStatus = "active" | "expired" | "pending";

export interface Policy {
  id: string;
  name: string;
  insurer: string;
  type: PolicyType;
  status: PolicyStatus;
  policyNumber: string;
  sumInsured: number;
  premium: number;
  premiumFrequency: "monthly" | "quarterly" | "annual";
  startDate: string;
  endDate: string;
  members: string[];
  usedAmount: number;
  logoColor: string;
}

export interface WaitingPeriod {
  id: string;
  policyId: string;
  policyName: string;
  condition: string;
  type: "PED" | "maternity" | "specific" | "initial";
  startDate: string;
  endDate: string;
  daysRemaining: number;
  notifyEnabled: boolean;
}

export interface RenewalAlert {
  id: string;
  policyId: string;
  policyName: string;
  insurer: string;
  renewalDate: string;
  daysUntilRenewal: number;
  premium: number;
  tip: string;
}

export interface GapInsight {
  suggestedCover: number;
  currentCover: number;
  gap: number;
  city: string;
  familySize: number;
  riskLevel: "low" | "medium" | "high";
  reasons: string[];
}

export interface CoverageAggregate {
  totalSumInsured: number;
  totalUsed: number;
  totalPolicies: number;
  activePolicies: number;
  nearestRenewalDays: number;
  nearestRenewalPolicy: string;
}

export interface AadhaarData {
  maskedAadhaar: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  state: string;
  pincode: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  answerType?: "yes" | "no" | "partial";
}
