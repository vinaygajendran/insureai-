import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";

const stages = [
  "Connecting to DigiLocker…",
  "Authenticating via UIDAI…",
  "Reading Aadhaar eKYC record…",
  "Verifying linked mobile number…",
  "Aadhaar data retrieved!",
];

export default function FetchingAadhaar() {
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
        setTimeout(() => setStep("aadhaar-found"), 500);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [setStep]);

  return (
    <div className="flex flex-col h-full items-center justify-center bg-[#1e3a5f] px-8 gap-8">
      {/* Animated shield */}
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path
            d="M32 4L8 14v18c0 14 10 24 24 28C56 56 56 46 56 32V14L32 4z"
            fill="#e87c2b"
            fillOpacity="0.9"
          />
          <path
            d="M32 12L16 20v12c0 9 6 16 16 19 10-3 16-10 16-19V20L32 12z"
            fill="#fff"
            fillOpacity="0.15"
          />
        </svg>
        {/* Rotating ring */}
        <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "2s" }} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" stroke="white" strokeOpacity="0.2" strokeWidth="2" fill="none" strokeDasharray="30 100" strokeLinecap="round" />
        </svg>
      </div>

      <div className="text-center">
        <h2 className="text-white text-xl font-bold">Fetching Aadhaar Data</h2>
        <p className="text-white/50 text-xs mt-1">Powered by Setu DigiLocker API</p>
      </div>

      {/* Stage list */}
      <div className="w-full space-y-3">
        {stages.map((s, i) => (
          <div
            key={s}
            className={`flex items-center gap-3 transition-all duration-300 ${
              i < stageIdx ? "opacity-100" : i === stageIdx ? "opacity-100" : "opacity-20"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                i < stageIdx
                  ? "bg-green-400"
                  : i === stageIdx
                  ? "bg-[#e87c2b] pulse-dot"
                  : "bg-white/20"
              }`}
            >
              {i < stageIdx ? (
                <svg viewBox="0 0 10 10" className="w-3 h-3"><polyline points="1,5 4,8 9,2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span
              className={`text-sm ${
                i === stageIdx ? "text-white font-semibold" : i < stageIdx ? "text-green-300" : "text-white/40"
              }`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <p className="text-white/30 text-xs text-center">
        This is a secure, read-only connection. No data is stored.
      </p>
    </div>
  );
}
