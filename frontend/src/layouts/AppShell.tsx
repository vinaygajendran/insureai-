import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

export default function AppShell() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader />
      <main className="flex-1 overflow-y-auto bg-[#fdf8f2]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
