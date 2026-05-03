import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";
import { useNavigate } from "react-router-dom";
import { mockAadhaar } from "../../fixtures/mockData";
import type { Locale } from "../../store/useAppStore";
import { LogOut, Bell, ChevronRight, Globe, Shield } from "lucide-react";
import toast from "react-hot-toast";

const locales: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
];

export default function More() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);
  const reset = useAppStore((s) => s.resetOnboarding);
  const t = useT(locale);
  const nav = useNavigate();

  const handleLogout = () => {
    reset();
    nav("/");
  };

  const handleNotification = () => {
    toast("Firebase + WhatsApp Business API — Coming in Phase 2.", {
      icon: "🔔",
      style: { background: "#1e3a5f", color: "white", fontSize: "13px" },
    });
  };

  const handleSubscription = () => {
    toast("Razorpay subscription integration — Coming in Phase 2.", {
      icon: "💳",
      style: { background: "#1e3a5f", color: "white", fontSize: "13px" },
    });
  };

  return (
    <div className="px-4 py-5 space-y-5 pb-8">
      {/* Profile card */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d6e6e] rounded-2xl px-5 py-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-white">
            {mockAadhaar.name[0]}
          </div>
          <div>
            <p className="text-white font-bold text-base">{mockAadhaar.name}</p>
            <p className="text-white/60 text-xs">{mockAadhaar.maskedAadhaar}</p>
            <div className="flex items-center gap-1 mt-1">
              <Shield size={11} className="text-green-300" />
              <p className="text-green-300 text-[10px] font-semibold">Aadhaar Verified</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: "Policies", value: "3" },
            { label: "Active", value: "3" },
            { label: "Cover", value: "₹18L" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl py-2 text-center">
              <p className="text-white font-bold text-base">{s.value}</p>
              <p className="text-white/50 text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="bg-white rounded-2xl border border-[#1e3a5f]/8 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <Globe size={14} className="text-[#1e3a5f]" />
          <p className="text-sm font-bold text-[#1e3a5f]">{t("language")}</p>
        </div>
        {locales.map(({ code, label, native }) => (
          <button
            key={code}
            onClick={() => setLocale(code)}
            className={`w-full flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 active:bg-gray-50 ${
              locale === code ? "bg-[#e87c2b]/5" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{native}</span>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
            {locale === code && (
              <div className="w-5 h-5 rounded-full bg-[#e87c2b] flex items-center justify-center">
                <svg viewBox="0 0 10 10" className="w-3 h-3">
                  <polyline points="1,5 4,8 9,2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Other settings */}
      <div className="bg-white rounded-2xl border border-[#1e3a5f]/8 shadow-sm overflow-hidden">
        {[
          { icon: Bell, label: t("notifications"), action: handleNotification },
          { icon: null, label: "Subscription Plan", action: handleSubscription },
        ].map(({ icon: Icon, label, action }) => (
          <button
            key={label}
            onClick={action}
            className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-0 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {Icon && <Icon size={16} className="text-[#1e3a5f]" />}
              <span className="text-sm font-medium text-[#1e3a5f]">{label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>

      {/* Phase 2 */}
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl px-5 py-4 space-y-2">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">🔜 {t("comingSoon")}</p>
        {[
          "Real-time claim balance tracking",
          "Cashless hospital network by location",
          "Claims history & analytics",
          "WhatsApp renewal reminders",
        ].map((f) => (
          <div key={f} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <p className="text-xs text-gray-400">{f}</p>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full border border-red-200 text-red-500 font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <LogOut size={16} />
        {t("logout")}
      </button>

      <p className="text-center text-gray-300 text-xs">
        InsureAi v0.1 · IRDAI Compliant Demo · Not a licensed insurer
      </p>
    </div>
  );
}
