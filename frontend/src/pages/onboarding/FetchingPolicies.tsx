import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";

const stages = [
  "Linking to eIA repositories…",
  "Checking CAMSRep…",
  "Checking NSDL Insurance…",
  "Checking CDSL Insurance (Centrico)…",
  "Checking Karvy Insurance Repository…",
  "Aggregating policy records…",
  "3 policies found!",
];

export default function FetchingPolicies() {
  const [stageIdx, setStageIdx] = useState(0);
  const setStep = useAppStore((s) => s.setOnboardingStep);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < stages.length) {
        setStageIdx(idx);
      } else {
        clearInterval(interval);
        setTimeout(() => setStep("policies-found"), 600);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [setStep]);

  return (
    <div className="flex flex-col h-full items-center justify-center bg-[#0d6e6e] px-8 gap-8">
      {/* Icon */}
      <div className="relative w-28 h-28">
        <div className="w-28 h-28 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center">
          <span className="text-5xl">📋</span>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping opacity-30" />
      </div>

      <div className="text-center">
        <h2 className="text-white text-xl font-bold">Fetching Policy Data</h2>
        <p className="text-white/50 text-xs mt-1">Scanning all 4 eIA repositories</p>
      </div>

      {/* eIA repos */}
      <div className="w-full space-y-3">
        {stages.map((s, i) => (
          <div
            key={s}
            className={`flex items-center gap-3 transition-all duration-300 ${
              i <= stageIdx ? "opacity-100" : "opacity-20"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                i < stageIdx
                  ? "bg-green-400"
                  : i === stageIdx
                  ? "bg-white pulse-dot"
                  : "bg-white/20"
              }`}
            >
              {i < stageIdx ? (
                <svg viewBox="0 0 10 10" className="w-3 h-3">
                  <polyline points="1,5 4,8 9,2" stroke="#0d6e6e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              ) : (
                <div className="w-2 h-2 rounded-full bg-[#0d6e6e]" />
              )}
            </div>
            <span
              className={`text-sm ${
                i === stageIdx
                  ? "text-white font-semibold"
                  : i < stageIdx
                  ? "text-green-300"
                  : "text-white/40"
              }`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <p className="text-white/30 text-xs text-center">
        eIA repositories mandated by IRDAI from April 1, 2024
      </p>
    </div>
  );
}
