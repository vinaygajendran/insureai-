import { mockGapInsight } from "../../fixtures/mockData";
import { formatINR } from "../../utils/format";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";
import { AlertTriangle, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const riskColor = { low: "text-green-600", medium: "text-amber-600", high: "text-red-600" };

export default function GapAnalysis() {
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);
  const g = mockGapInsight;

  const handleAdvisor = () => {
    toast("Our advisor team will reach you within 24 hours.", {
      icon: "📞",
      style: { background: "#1e3a5f", color: "white", fontSize: "13px" },
    });
  };

  const currentPct = Math.round((g.currentCover / g.suggestedCover) * 100);

  return (
    <div className="px-4 py-5 space-y-5 pb-8">
      <div>
        <h1 className="text-lg font-bold text-[#1e3a5f]">{t("gapAnalysis")}</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Personalised for family of {g.familySize} in {g.city}
        </p>
      </div>

      {/* Visual gap meter */}
      <div className="bg-white rounded-2xl border border-[#1e3a5f]/8 shadow-sm px-5 py-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cover vs. Recommended</p>
          <span className={`text-xs font-bold uppercase ${riskColor[g.riskLevel]}`}>
            {g.riskLevel} risk
          </span>
        </div>

        {/* Meter */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{t("currentCover")}</span>
              <span className="font-bold text-[#1e3a5f]">{formatINR(g.currentCover)}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0d6e6e] rounded-full transition-all duration-1000"
                style={{ width: `${currentPct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{t("suggestedRecommend")}</span>
              <span className="font-bold text-[#1e3a5f]">{formatINR(g.suggestedCover)}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1e3a5f] rounded-full w-full" />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500 shrink-0" />
            <p className="text-sm font-bold text-amber-700">{t("gapAmount")}</p>
          </div>
          <p className="text-base font-bold text-amber-700">{formatINR(g.gap)}</p>
        </div>
      </div>

      {/* Why this gap */}
      <div className="bg-white rounded-2xl border border-[#1e3a5f]/8 shadow-sm px-5 py-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-[#1e3a5f]" />
          <p className="text-sm font-bold text-[#1e3a5f]">Why this gap exists</p>
        </div>
        <div className="space-y-2">
          {g.reasons.map((r) => (
            <div key={r} className="flex items-start gap-2">
              <span className="text-[#e87c2b] mt-1 shrink-0">•</span>
              <p className="text-sm text-gray-600">{r}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmark */}
      <div className="bg-[#1e3a5f] rounded-2xl px-5 py-4">
        <p className="text-white font-bold text-sm mb-1">Bengaluru Benchmark (2024)</p>
        <p className="text-white/60 text-xs leading-relaxed">
          Average family health spend (3-member): <strong className="text-white">₹8.2L per year</strong> including ICU stays at top-tier hospitals (Apollo, Manipal, Narayana). Your current cover would be exhausted in a single critical event.
        </p>
      </div>

      {/* Phase 2 placeholder */}
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl px-5 py-4 text-center">
        <p className="text-gray-400 text-xs font-semibold">🔜 {t("comingSoon")}</p>
        <p className="text-gray-300 text-xs mt-1">Live hospital cost data · Real-time insurer quotes</p>
      </div>

      {/* CTA */}
      <button
        onClick={handleAdvisor}
        className="w-full bg-[#e87c2b] text-white font-bold py-4 rounded-2xl text-base active:scale-95 transition-all shadow-lg"
      >
        {t("talkAdvisor")} — Free consultation
      </button>
    </div>
  );
}
