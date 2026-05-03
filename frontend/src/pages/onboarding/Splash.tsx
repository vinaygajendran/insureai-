import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import logoUrl from "../../assets/logo.svg";

export default function Splash() {
  const setStep = useAppStore((s) => s.setOnboardingStep);
  const hasCompleted = useAppStore((s) => s.hasCompletedOnboarding);

  useEffect(() => {
    if (hasCompleted) {
      setStep("done");
    }
  }, [hasCompleted, setStep]);

  return (
    <div className="flex flex-col items-center justify-between h-full bg-[#1e3a5f] text-white px-6 py-12 select-none">
      {/* Top decor */}
      <div className="w-full flex justify-end opacity-20">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="60" fill="white" fillOpacity="0.3" />
          <circle cx="60" cy="60" r="40" fill="white" fillOpacity="0.3" />
          <circle cx="60" cy="60" r="20" fill="white" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Brand */}
      <div className="flex flex-col items-center gap-5 mt-4">
        <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center shadow-xl">
          <img src={logoUrl} alt="InsureAi" className="w-14 h-14" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">InsureAi</h1>
          <p className="text-[#e87c2b] font-semibold text-sm mt-1 tracking-wide uppercase">
            Smart Insurance Agent
          </p>
          <p className="text-white/60 text-xs mt-1">Powered by AI India</p>
        </div>

        {/* Value bullets */}
        <div className="mt-6 space-y-3 w-full max-w-xs">
          {[
            ["🏥", "Know exactly what your policy covers"],
            ["⏱️", "Track waiting periods with real dates"],
            ["🤖", "Ask AI — get a straight Yes / No answer"],
            ["📋", "60-page documents → 2-minute reads"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <span className="text-lg">{icon}</span>
              <span className="text-sm text-white/90">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="w-full">
        <div className="flex justify-between mb-6 bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="text-center">
            <p className="text-[#e87c2b] text-xl font-bold">3.7%</p>
            <p className="text-white/50 text-xs">India GDP penetration</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-[#e87c2b] text-xl font-bold">₹26K Cr</p>
            <p className="text-white/50 text-xs">Claims rejected FY24</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-[#e87c2b] text-xl font-bold">96 Cr</p>
            <p className="text-white/50 text-xs">Under-insured Indians</p>
          </div>
        </div>

        <button
          onClick={() => setStep("phone")}
          className="w-full bg-[#e87c2b] hover:bg-[#d16d1f] active:scale-95 transition-all text-white font-bold py-4 rounded-2xl text-lg shadow-lg"
        >
          Get Started — It's Free
        </button>
        <p className="text-center text-white/40 text-xs mt-3">
          Uses your DigiLocker data. No manual uploads needed.
        </p>
      </div>
    </div>
  );
}
