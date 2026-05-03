import { useNavigate } from "react-router-dom";
import { mockPolicies } from "../../fixtures/mockData";
import { formatDate } from "../../utils/format";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";
import { ChevronRight } from "lucide-react";

const typeIcon: Record<string, string> = { health: "🏥", life: "❤️", motor: "🚗", travel: "✈️", home: "🏠" };

export default function Policies() {
  const nav = useNavigate();
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#1e3a5f]">{t("yourPolicies")}</h1>
        <span className="text-xs text-gray-400">{mockPolicies.length} total</span>
      </div>

      {mockPolicies.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-2xl border border-[#1e3a5f]/8 shadow-sm overflow-hidden cursor-pointer active:scale-98 transition-all"
          onClick={() => nav(`/app/policies/${p.id}`)}
        >
          {/* Colored top stripe */}
          <div className="h-1.5" style={{ background: p.logoColor }} />
          <div className="px-4 py-4">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: p.logoColor + "18" }}
              >
                {typeIcon[p.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1e3a5f] text-sm leading-tight">{p.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{p.insurer}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full uppercase">
                    {p.status}
                  </span>
                  <span className="text-[10px] text-gray-400 capitalize">{p.type} insurance</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 mt-1 shrink-0" />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: t("sumInsured"), value: `₹${(p.sumInsured / 100000).toFixed(0)}L` },
                { label: t("premium"), value: `₹${(p.premium / 1000).toFixed(1)}K` },
                { label: "Renewal", value: formatDate(p.endDate) },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#fdf8f2] rounded-xl px-2 py-2 text-center">
                  <p className="text-[10px] text-gray-400">{stat.label}</p>
                  <p className="text-xs font-bold text-[#1e3a5f] mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Members */}
            <div className="flex flex-wrap gap-1 mt-3">
              {p.members.map((m) => (
                <span key={m} className="text-[10px] bg-[#1e3a5f]/8 text-[#1e3a5f] px-2 py-0.5 rounded-full font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
