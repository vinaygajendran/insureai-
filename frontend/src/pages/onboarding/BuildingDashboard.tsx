import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";

const checks = [
  { icon: "💰", label: "Coverage totals calculated", detail: "₹18L total sum insured across 3 policies" },
  { icon: "⏳", label: "Waiting periods mapped", detail: "2 active waiting periods tracked" },
  { icon: "🔔", label: "Renewal alerts set", detail: "45-day alert for Star Health" },
  { icon: "📊", label: "Gap analysis ready", detail: "₹2L gap detected for Bengaluru family" },
  { icon: "🤖", label: "AI ready to answer questions", detail: "Powered by Claude · Your data only" },
];

export default function BuildingDashboard() {
  const [done, setDone] = useState(0);
  const complete = useAppStore((s) => s.completeOnboarding);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setDone(count);
      if (count >= checks.length) {
        clearInterval(interval);
        setTimeout(complete, 900);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [complete]);

  return (
    <div className="flex flex-col h-full items-center justify-center bg-gradient-to-b from-[#1e3a5f] to-[#0d6e6e] px-6 gap-8">
      <div className="text-center">
        <div className="text-5xl mb-4">🏗️</div>
        <h2 className="text-white text-xl font-bold">Building Your Dashboard</h2>
        <p className="text-white/60 text-sm mt-1">Almost there…</p>
      </div>

      <div className="w-full space-y-3">
        {checks.map((c, i) => (
          <div
            key={c.label}
            className={`flex items-center gap-4 bg-white/10 rounded-2xl px-4 py-3 transition-all duration-500 ${
              i < done ? "opacity-100 border border-green-400/30" : "opacity-30"
            }`}
          >
            <span className="text-2xl">{c.icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${i < done ? "text-white" : "text-white/50"}`}>
                {c.label}
              </p>
              {i < done && (
                <p className="text-xs text-green-300 mt-0.5">{c.detail}</p>
              )}
            </div>
            {i < done && (
              <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 10 10" className="w-3.5 h-3.5">
                  <polyline points="1,5 4,8 9,2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {done >= checks.length && (
        <p className="text-green-300 font-bold text-lg animate-pulse">Dashboard ready! ✨</p>
      )}
    </div>
  );
}
