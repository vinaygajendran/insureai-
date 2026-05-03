import { NavLink } from "react-router-dom";
import { Home, FileText, Clock, MessageCircle, Menu } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { useT } from "../i18n/strings";

const navItems = [
  { to: "/app", label: "home", Icon: Home, exact: true },
  { to: "/app/policies", label: "policies", Icon: FileText, exact: false },
  { to: "/app/waiting", label: "waitingPeriods", Icon: Clock, exact: false },
  { to: "/app/ask", label: "askAi", Icon: MessageCircle, exact: false },
  { to: "/app/more", label: "more", Icon: Menu, exact: false },
];

export default function BottomNav() {
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);

  return (
    <nav className="bg-white border-t border-gray-100 flex safe-bottom shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      {navItems.map(({ to, label, Icon, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors min-h-[56px] ${
              isActive
                ? "text-[#e87c2b]"
                : "text-gray-400"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-[#e87c2b]/10" : ""}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className="text-[10px] font-semibold">{t(label)}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
