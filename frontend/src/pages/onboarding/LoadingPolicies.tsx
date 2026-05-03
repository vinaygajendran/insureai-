import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";

const stages = [
  { label: "Reading Star Health Comprehensive…", sub: "Extracting schedule of benefits" },
  { label: "Reading HDFC Ergo Optima Secure…", sub: "Parsing exclusion clauses" },
  { label: "Reading LIC New Jeevan Anand…", sub: "Identifying coverage terms" },
  { label: "Extracting waiting periods…", sub: "PED, maternity, specific ailments" },
  { label: "Mapping sum insured & riders…", sub: "Aggregating coverage totals" },
  { label: "Identifying exclusions…", sub: "Highlighting fine print" },
];

export default function LoadingPolicies() {
  const [stageIdx, setStageIdx] = useState(0);
  const [pct, setPct] = useState(0);
  const setStep = useAppStore((s) => s.setOnboardingStep);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setPct(Math.min(100, Math.round((idx / stages.length) * 100)));
      if (idx < stages.length) {
        setStageIdx(idx);
      } else {
        clearInterval(interval);
        setTimeout(() => setStep("building-dashboard"), 500);
      }
    }, 750);
    return () => clearInterval(interval);
  }, [setStep]);

  return (
    <div className="flex flex-col h-full bg-[#1e3a5f] px-6">
      {/* Top */}
      <div className="pt-16 pb-8 text-center">
        <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-5">
          <span className="text-4xl">🔍</span>
        </div>
        <h2 className="text-white text-xl font-bold">Loading Policy Data</h2>
        <p className="text-white/50 text-xs mt-1">Reading documents, understanding your cover</p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-[#e87c2b] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[#e87c2b] text-xs font-bold text-right mb-8">{pct}%</p>

      {/* Stage list */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {stages.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-start gap-4 transition-all duration-500 ${
              i <= stageIdx ? "opacity-100 translate-x-0" : "opacity-20 translate-x-4"
            }`}
          >
            <div
              className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                i < stageIdx
                  ? "bg-green-400"
                  : i === stageIdx
                  ? "bg-[#e87c2b] pulse-dot"
                  : "bg-white/20"
              }`}
            >
              {i < stageIdx ? (
                <svg viewBox="0 0 10 10" className="w-3 h-3">
                  <polyline points="1,5 4,8 9,2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <div>
              <p className={`text-sm font-semibold ${i === stageIdx ? "text-white" : i < stageIdx ? "text-green-300" : "text-white/40"}`}>
                {s.label}
              </p>
              <p className={`text-xs mt-0.5 ${i <= stageIdx ? "text-white/40" : "text-white/20"}`}>
                {s.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pb-12 pt-6 text-center">
        <p className="text-white/25 text-xs">No PDF is stored. Analysis runs locally.</p>
      </div>
    </div>
  );
}
