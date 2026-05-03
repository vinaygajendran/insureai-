import { mockRenewals } from "../../fixtures/mockData";
import { formatINR, formatDate } from "../../utils/format";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";
import { RefreshCw, Lightbulb, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function Renewals() {
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);

  const bucket = (days: number) => {
    if (days <= 30) return "30";
    if (days <= 60) return "60";
    return "90";
  };

  const grouped: Record<string, typeof mockRenewals> = { "30": [], "60": [], "90": [] };
  mockRenewals.forEach((r) => grouped[bucket(r.daysUntilRenewal)].push(r));

  const handleRenew = (name: string) => {
    toast(`Renewal for ${name} — Razorpay integration coming in Phase 2.`, {
      icon: "💳",
      style: { background: "#1e3a5f", color: "white", fontSize: "13px" },
    });
  };

  const bucketLabel: Record<string, string> = {
    "30": t("next30days"),
    "60": t("next60days"),
    "90": t("next90days"),
  };

  const bucketColor: Record<string, string> = {
    "30": "text-red-600 bg-red-50 border-red-200",
    "60": "text-amber-600 bg-amber-50 border-amber-200",
    "90": "text-blue-600 bg-blue-50 border-blue-200",
  };

  return (
    <div className="px-4 py-5 space-y-5 pb-8">
      <div>
        <h1 className="text-lg font-bold text-[#1e3a5f]">{t("renewalIntelligence")}</h1>
        <p className="text-xs text-gray-400 mt-0.5">Personalised renewal recommendations</p>
      </div>

      {["30", "60", "90"].map((b) => {
        const items = grouped[b];
        if (items.length === 0) return null;
        return (
          <div key={b}>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-3 ${bucketColor[b]}`}>
              <RefreshCw size={11} />
              {bucketLabel[b]}
            </div>
            <div className="space-y-3">
              {items.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl border border-[#1e3a5f]/8 shadow-sm overflow-hidden"
                >
                  <div className="px-4 py-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-[#1e3a5f] text-sm">{r.policyName}</p>
                        <p className="text-gray-400 text-xs">{r.insurer}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-gray-400">Premium</p>
                        <p className="font-bold text-[#1e3a5f]">{formatINR(r.premium)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-xs">
                      <span className="text-gray-500">Renewal: <strong className="text-[#1e3a5f]">{formatDate(r.renewalDate)}</strong></span>
                      <span className={`font-bold px-2 py-0.5 rounded-full ${
                        r.daysUntilRenewal <= 30 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {r.daysUntilRenewal} days
                      </span>
                    </div>
                  </div>

                  {/* Tip */}
                  <div className="bg-[#fdf8f2] border-t border-[#1e3a5f]/8 px-4 py-3 flex items-start gap-2">
                    <Lightbulb size={14} className="text-[#e87c2b] mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600">{r.tip}</p>
                  </div>

                  {/* Action */}
                  <div className="px-4 pb-3">
                    <button
                      onClick={() => handleRenew(r.policyName)}
                      className="w-full mt-2 bg-[#1e3a5f] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      Renew Now <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Phase 2 teaser */}
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl px-5 py-4 text-center">
        <p className="text-gray-400 text-xs font-semibold">🔜 {t("comingSoon")}</p>
        <p className="text-gray-300 text-xs mt-1">
          Auto-pay renewals · WhatsApp reminders · Compare quotes
        </p>
      </div>
    </div>
  );
}
