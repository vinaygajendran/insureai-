import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppStore } from "./store/useAppStore";

// Onboarding
import Splash from "./pages/onboarding/Splash";
import PhoneEntry from "./pages/onboarding/PhoneEntry";
import FetchingAadhaar from "./pages/onboarding/FetchingAadhaar";
import AadhaarFound from "./pages/onboarding/AadhaarFound";
import FetchingPolicies from "./pages/onboarding/FetchingPolicies";
import PoliciesFound from "./pages/onboarding/PoliciesFound";
import LoadingPolicies from "./pages/onboarding/LoadingPolicies";
import BuildingDashboard from "./pages/onboarding/BuildingDashboard";

// App shell
import AppShell from "./layouts/AppShell";
import Home from "./pages/app/Home";
import Policies from "./pages/app/Policies";
import PolicyDetail from "./pages/app/PolicyDetail";
import WaitingPeriods from "./pages/app/WaitingPeriods";
import AskAi from "./pages/app/AskAi";
import GapAnalysis from "./pages/app/GapAnalysis";
import Renewals from "./pages/app/Renewals";
import More from "./pages/app/More";

function OnboardingRouter() {
  const step = useAppStore((s) => s.onboardingStep);

  if (step === "done") return <Navigate to="/app" replace />;

  return (
    <>
      {step === "splash" && <Splash />}
      {step === "phone" && <PhoneEntry />}
      {step === "fetching-aadhaar" && <FetchingAadhaar />}
      {step === "aadhaar-found" && <AadhaarFound />}
      {step === "fetching-policies" && <FetchingPolicies />}
      {step === "policies-found" && <PoliciesFound />}
      {step === "loading-policies" && <LoadingPolicies />}
      {step === "building-dashboard" && <BuildingDashboard />}
    </>
  );
}

function GuardedApp() {
  const done = useAppStore((s) => s.hasCompletedOnboarding);
  if (!done) return <Navigate to="/" replace />;
  return <AppShell />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: { maxWidth: "360px", borderRadius: "12px" },
        }}
      />
      <Routes>
        <Route path="/" element={<OnboardingRouter />} />
        <Route path="/app" element={<GuardedApp />}>
          <Route index element={<Home />} />
          <Route path="policies" element={<Policies />} />
          <Route path="policies/:id" element={<PolicyDetail />} />
          <Route path="waiting" element={<WaitingPeriods />} />
          <Route path="ask" element={<AskAi />} />
          <Route path="gap" element={<GapAnalysis />} />
          <Route path="renewals" element={<Renewals />} />
          <Route path="more" element={<More />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
