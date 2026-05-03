import { CheckCircle, ChevronRight } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { mockPolicies } from "../../fixtures/mockData";

const policyTypeIcon: Record<string, string> = {
  health: "🏥",
  life: "❤️",
  motor: "🚗",
  travel: "✈️",
  home: "🏠",
};

export default function PoliciesFound() {
  const setStep = useAppStore((s) => s.setOnboardingStep);

  return (
    <div className="flex flex-col h-full bg-[#fdf8f2]">
      {/* Header */}
      <div className="bg-[#0d6e6e] px-6 pt-12 pb-10 rounded-b-3xl">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
          Step 2 of 3
        </p>
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-300" size={22} />
          <h1 className="text-white text-2xl font-bold">Policies Found!</h1>
        </div>
        <p className="text-white/70 text-sm mt-2">
          We found <strong className="text-white">{mockPolicies.length} active policies</strong> linked to your Aadhaar.
        </p>
      </div>

      <div className="flex-1 px-6 pt-6 overflow-y-auto space-y-4">
        {mockPolicies.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-[#0d6e6e]/10 px-4 py-4 flex items-center gap-4 shadow-sm"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: p.logoColor + "18" }}
            >
              {policyTypeIcon[p.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1e3a5f] text-sm leading-tight truncate">{p.name}</p>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{p.insurer}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full uppercase">
                  {p.status}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">{p.type}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">Sum Insured</p>
              <p className="font-bold text-[#1e3a5f] text-sm">
                ₹{(p.sumInsured / 100000).toFixed(0)}L
              </p>
            </div>
          </div>
        ))}

        <div className="bg-[#0d6e6e]/5 border border-[#0d6e6e]/20 rounded-xl px-4 py-3">
          <p className="text-xs text-[#0d6e6e] font-semibold">
            📌 Source: eIA repositories (CAMSRep, NSDL, Centrico)
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            All policies are stored digitally as per IRDAI mandate (April 2024).
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-8 safe-bottom pt-4">
        <button
          onClick={() => setStep("loading-policies")}
          className="w-full bg-[#0d6e6e] active:scale-95 transition-all text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg"
        >
          Load & Analyse Policies <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
