import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";
import { Bell, BellOff, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

const typeColor: Record<string, string> = {
  PED: "bg-red-100 text-red-700 border-red-200",
  maternity: "bg-pink-100 text-pink-700 border-pink-200",
  specific: "bg-orange-100 text-orange-700 border-orange-200",
  initial: "bg-blue-100 text-blue-700 border-blue-200",
};

const typeLabel: Record<string, string> = {
  PED: "Pre-existing Disease",
  maternity: "Maternity",
  specific: "Specific Ailment",
  initial: "Initial Wait",
};

export default function WaitingPeriods() {
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);
  const waitingPeriods = useAppStore((s) => s.waitingPeriods);
  const toggle = useAppStore((s) => s.toggleWaitingPeriodNotify);

  const done = waitingPeriods.filter((w) => w.daysRemaining === 0);
  const active = waitingPeriods.filter((w) => w.daysRemaining > 0);

  const handleToggle = (id: string, enabled: boolean) => {
    toggle(id);
    toast(
      enabled ? "Notification turned off" : "You'll be notified 30 days before waiting period ends!",
      { icon: enabled ? "🔕" : "🔔", style: { fontSize: "13px" } }
    );
  };

  return (
    <div className="px-4 py-5 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1e3a5f]">Waiting Periods</h1>
        <p className="text-xs text-gray-400 mt-0.5">Track when your coverage unlocks</p>
      </div>

      {/* Education banner */}
      <div className="bg-[#1e3a5f] rounded-2xl px-4 py-4">
        <p className="text-white text-xs font-bold">⏳ What is a waiting period?</p>
        <p className="text-white/60 text-xs mt-1 leading-relaxed">
          Insurers impose waiting periods during which claims for certain conditions are not admissible.
          These are often buried in 60-page documents. InsureAi surfaces them for you.
        </p>
      </div>

      {/* Active waiting periods */}
      {active.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t("active")}</p>
          <div className="space-y-3">
            {active.map((wp) => (
              <div key={wp.id} className="bg-white rounded-2xl border border-[#1e3a5f]/8 shadow-sm overflow-hidden">
                <div className={`px-4 py-2 border-b flex items-center justify-between ${typeColor[wp.type]}`}>
                  <span className="text-xs font-bold">{typeLabel[wp.type]}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span className="text-xs font-bold">{wp.daysRemaining} {t("daysLeft")}</span>
                  </div>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <p className="font-semibold text-[#1e3a5f] text-sm">{wp.condition}</p>
                  <p className="text-xs text-gray-400">{wp.policyName}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Started: {new Date(wp.startDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    <span className="font-semibold text-[#1e3a5f]">
                      Ends: {new Date(wp.endDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e87c2b] rounded-full"
                      style={{
                        width: `${Math.min(100, 100 - Math.round((wp.daysRemaining / 730) * 100))}%`,
                      }}
                    />
                  </div>

                  {/* Notify toggle */}
                  <button
                    onClick={() => handleToggle(wp.id, wp.notifyEnabled)}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                      wp.notifyEnabled
                        ? "bg-[#e87c2b]/10 text-[#e87c2b]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {wp.notifyEnabled ? (
                      <><Bell size={13} /> {t("notifying")}</>
                    ) : (
                      <><BellOff size={13} /> {t("notifyMe")}</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {done.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t("waitingPeriodDone")}</p>
          <div className="space-y-2">
            {done.map((wp) => (
              <div key={wp.id} className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 flex items-center gap-3">
                <CheckCircle size={18} className="text-green-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800">{wp.condition}</p>
                  <p className="text-xs text-green-600">{wp.policyName} · Unlocked {new Date(wp.endDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
