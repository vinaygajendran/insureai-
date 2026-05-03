import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockPolicies } from "../../fixtures/mockData";
import { formatDate, formatINR, pct } from "../../utils/format";
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";

const tabs = ["plainSummary", "whatsCovered", "whatsNotCovered", "keyDates"] as const;
type Tab = typeof tabs[number];

const coverageDetails: Record<string, { covered: string[]; notCovered: string[]; summary: string[] }> = {
  "pol-001": {
    summary: [
      "₹5L cover for family of 3 (you, spouse, daughter) on floater basis.",
      "Cashless at 14,000+ network hospitals across India.",
      "Pre & post hospitalisation: 60 days before, 90 days after.",
      "Day-care procedures (250+) covered including chemotherapy.",
      "Ambulance charges up to ₹2,000 per hospitalisation.",
      "AYUSH treatments covered up to ₹20,000/year at NABH hospitals.",
    ],
    covered: [
      "In-patient hospitalisation (min 24 hrs)",
      "ICU and critical care",
      "Organ donor expenses",
      "Road ambulance",
      "Day-care procedures (250+)",
      "AYUSH inpatient treatment",
      "Domiciliary hospitalisation (7+ days)",
    ],
    notCovered: [
      "OPD consultations and pharmacy (no OPD rider)",
      "Cosmetic or aesthetic treatments",
      "Dental treatment (unless accident-related)",
      "Congenital diseases (listed exclusions)",
      "Self-inflicted injuries or substance abuse",
      "War or nuclear risks",
      "Maternity (waiting period: until Apr 2026)",
      "Pre-existing Hypertension (waiting: until Apr 2025 ✓ expired)",
    ],
  },
  "pol-002": {
    summary: [
      "₹3L individual cover — fully separate from family floater.",
      "Zero claims this year — full ₹3L available.",
      "Active since July 2023; all waiting periods now completed.",
      "Cashless at HDFC ERGO network hospitals.",
      "No-Claim Bonus: 50% top-up available on renewal.",
    ],
    covered: [
      "In-patient hospitalisation",
      "Pre/post hospitalisation (30/60 days)",
      "Day-care procedures",
      "Ambulance (up to ₹1,500)",
      "Modern treatments (robotics, stem cell)",
    ],
    notCovered: [
      "OPD and pharmacy (no rider)",
      "Dental and optical",
      "Maternity and newborn",
      "Adventure sports injuries",
      "Experimental treatments",
    ],
  },
  "pol-003": {
    summary: [
      "₹10L life cover — paid out to nominee on death.",
      "20-year endowment plan; matures Jan 2040.",
      "Bonus accrual: ₹24,000/year (simple reversionary).",
      "Partial surrender after 3 years.",
      "Accidental death benefit: additional ₹10L (rider).",
    ],
    covered: [
      "Death benefit (₹10L + accrued bonus)",
      "Accidental death rider (₹10L additional)",
      "Maturity benefit (₹10L + bonus if alive at 2040)",
      "Survival benefits at specified intervals",
    ],
    notCovered: [
      "Health / hospitalisation (life policy only)",
      "Suicide within 12 months of policy (clause 45)",
      "Death by war or terrorism",
      "Critical illness (no CI rider attached)",
    ],
  },
};

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("plainSummary");
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);

  const policy = mockPolicies.find((p) => p.id === id);
  if (!policy) return <div className="p-6 text-center text-gray-400">Policy not found</div>;

  const details = coverageDetails[policy.id] ?? { summary: [], covered: [], notCovered: [] };
  const usedPct = pct(policy.usedAmount, policy.sumInsured);

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <div
        className="px-4 pt-4 pb-8 rounded-b-3xl"
        style={{ background: `linear-gradient(135deg, ${policy.logoColor}dd, ${policy.logoColor}99)` }}
      >
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-1 text-white/70 text-sm mb-4"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-white font-bold text-lg leading-tight">{policy.name}</h1>
        <p className="text-white/70 text-xs mt-0.5">{policy.insurer}</p>
        <p className="text-white/50 text-xs mt-0.5">{t("policyNumber")}: {policy.policyNumber}</p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/20 rounded-xl px-3 py-3">
            <p className="text-white/60 text-[10px]">{t("sumInsured")}</p>
            <p className="text-white font-bold text-base">{formatINR(policy.sumInsured)}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-3">
            <p className="text-white/60 text-[10px]">Used This Year</p>
            <p className="text-white font-bold text-base">{formatINR(policy.usedAmount)}</p>
          </div>
        </div>

        {policy.type === "health" && (
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-white/60 mb-1">
              <span>Used: {usedPct}%</span>
              <span>Available: {formatINR(policy.sumInsured - policy.usedAmount)}</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${usedPct}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "border-[#e87c2b] text-[#e87c2b]"
                : "border-transparent text-gray-400"
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 px-4 py-5 space-y-3">
        {activeTab === "plainSummary" && (
          <>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Plain-language summary</p>
            <div className="space-y-2">
              {details.summary.map((s) => (
                <div key={s} className="bg-white rounded-xl px-4 py-3 border border-[#1e3a5f]/8 flex items-start gap-2">
                  <span className="text-[#e87c2b] mt-0.5">•</span>
                  <p className="text-sm text-[#1e3a5f]">{s}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "whatsCovered" && (
          <div className="space-y-2">
            {details.covered.map((s) => (
              <div key={s} className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500 shrink-0" />
                <p className="text-sm text-green-800">{s}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "whatsNotCovered" && (
          <div className="space-y-2">
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-700 font-semibold">These exclusions are buried in fine print. Read carefully before claiming.</p>
            </div>
            {details.notCovered.map((s) => (
              <div key={s} className="bg-white border border-red-100 rounded-xl px-4 py-3 flex items-start gap-2">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{s}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "keyDates" && (
          <div className="space-y-3">
            {[
              { label: "Policy Start", value: formatDate(policy.startDate), color: "bg-green-100 text-green-700" },
              { label: "Policy End / Renewal", value: formatDate(policy.endDate), color: "bg-amber-100 text-amber-700" },
              { label: "Members Covered", value: policy.members.join(", "), color: "bg-blue-100 text-blue-700" },
              { label: "Premium", value: `${formatINR(policy.premium)} / ${policy.premiumFrequency}`, color: "bg-purple-100 text-purple-700" },
            ].map((d) => (
              <div key={d.label} className="bg-white rounded-xl border border-[#1e3a5f]/8 px-4 py-3 flex justify-between items-center">
                <p className="text-sm text-gray-500">{d.label}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${d.color}`}>{d.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
