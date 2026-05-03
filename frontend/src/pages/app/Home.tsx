import { useNavigate } from "react-router-dom";
import { mockCoverage, mockPolicies, mockAadhaar } from "../../fixtures/mockData";
import { formatINR, pct } from "../../utils/format";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";
import { AlertTriangle, ChevronRight, RefreshCw } from "lucide-react";

export default function Home() {
  const nav = useNavigate();
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);
  const usedPct = pct(mockCoverage.totalUsed, mockCoverage.totalSumInsured);

  return (
    <div className="px-4 pb-6 space-y-4">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d6e6e] rounded-b-3xl -mx-4 px-4 pt-4 pb-8 mb-2">
        <p className="text-white/60 text-xs">{t("hello")},</p>
        <h1 className="text-white text-xl font-bold">{mockAadhaar.name} 👋</h1>
        <p className="text-white/50 text-xs mt-0.5">{t("coverDashboard")}</p>

        {/* Coverage cards */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: t("totalCover"), value: formatINR(mockCoverage.totalSumInsured), accent: false },
            { label: t("usedThisYear"), value: formatINR(mockCoverage.totalUsed), accent: true },
            { label: t("remaining"), value: formatINR(mockCoverage.totalSumInsured - mockCoverage.totalUsed), accent: false },
          ].map((c) => (
            <div key={c.label} className="bg-white/10 rounded-2xl px-3 py-3 border border-white/10">
              <p className="text-white/50 text-[10px] leading-tight">{c.label}</p>
              <p className={`font-bold text-base mt-1 ${c.accent ? "text-[#e87c2b]" : "text-white"}`}>
                {c.value}
              </p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-white/50 mb-1">
            <span>Used: {usedPct}%</span>
            <span>{mockCoverage.activePolicies} active policies</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e87c2b] rounded-full transition-all duration-1000"
              style={{ width: `${usedPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Renewal countdown */}
      <div
        className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-[#1e3a5f]/10 shadow-sm cursor-pointer active:scale-98"
        onClick={() => nav("/app/renewals")}
      >
        <div className="w-10 h-10 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center shrink-0">
          <RefreshCw size={18} className="text-[#1e3a5f]" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">{t("renewsIn")}</p>
          <p className="font-bold text-[#1e3a5f] text-sm">
            {mockCoverage.nearestRenewalDays} {t("days")} — {mockCoverage.nearestRenewalPolicy}
          </p>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
      </div>

      {/* Gap alert */}
      <div
        className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-start gap-3 cursor-pointer active:scale-98"
        onClick={() => nav("/app/gap")}
      >
        <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-bold text-amber-700">{t("gapAlert")}</p>
          <p className="text-xs text-amber-600 mt-0.5">{t("gapDesc")}</p>
          <p className="text-xs text-amber-700 font-semibold mt-1">{t("exploreGap")}</p>
        </div>
      </div>

      {/* Your Policies */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-[#1e3a5f] text-sm">{t("yourPolicies")}</h2>
          <button
            className="text-[#e87c2b] text-xs font-semibold"
            onClick={() => nav("/app/policies")}
          >
            {t("viewAll")}
          </button>
        </div>

        <div className="space-y-3">
          {mockPolicies.slice(0, 2).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-[#1e3a5f]/8 shadow-sm cursor-pointer active:scale-98"
              onClick={() => nav(`/app/policies/${p.id}`)}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: p.logoColor + "18" }}
              >
                {p.type === "health" ? "🏥" : p.type === "life" ? "❤️" : "🚗"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1e3a5f] text-sm truncate">{p.name}</p>
                <p className="text-gray-400 text-xs">{p.insurer}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-[#1e3a5f] text-sm">₹{(p.sumInsured / 100000).toFixed(0)}L</p>
                <span className="text-[10px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Ask AI a question", icon: "🤖", to: "/app/ask", bg: "bg-[#1e3a5f]", text: "text-white" },
          { label: "Waiting periods", icon: "⏳", to: "/app/waiting", bg: "bg-[#0d6e6e]", text: "text-white" },
          { label: "Gap analysis", icon: "📊", to: "/app/gap", bg: "bg-amber-500", text: "text-white" },
          { label: "Renewal alerts", icon: "🔔", to: "/app/renewals", bg: "bg-[#e87c2b]", text: "text-white" },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => nav(a.to)}
            className={`${a.bg} ${a.text} rounded-2xl px-4 py-4 text-left active:scale-95 transition-all`}
          >
            <span className="text-2xl block mb-1">{a.icon}</span>
            <span className="text-xs font-bold">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
