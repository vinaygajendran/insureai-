import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import logoUrl from "../assets/logo.svg";
import type { Locale } from "../store/useAppStore";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  hi: "हि",
  kn: "ಕ",
  ta: "த",
  te: "తె",
};

export default function AppHeader() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);
  const nav = useNavigate();

  const cycleLocale = () => {
    const order: Locale[] = ["en", "hi", "kn", "ta", "te"];
    const next = order[(order.indexOf(locale) + 1) % order.length];
    setLocale(next);
  };

  return (
    <header className="bg-[#1e3a5f] flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <img src={logoUrl} alt="InsureAi" className="w-7 h-7" />
        <div>
          <p className="text-white font-bold text-base leading-none">InsureAi</p>
          <p className="text-white/40 text-[9px] leading-none tracking-wide uppercase">Smart Insurance Agent</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={cycleLocale}
          className="bg-white/10 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-white/20"
          aria-label="Switch language"
        >
          {localeLabels[locale]}
        </button>
        <button
          onClick={() => nav("/app/more")}
          className="bg-white/10 text-white p-2 rounded-lg border border-white/20 relative"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#e87c2b] rounded-full" />
        </button>
      </div>
    </header>
  );
}
