import { CheckCircle, ChevronRight, AlertCircle } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { mockAadhaar } from "../../fixtures/mockData";
import toast from "react-hot-toast";

export default function AadhaarFound() {
  const setStep = useAppStore((s) => s.setOnboardingStep);

  const handleWrong = () => {
    toast("Please visit your nearest Aadhaar Seva Kendra to update details.", {
      icon: "ℹ️",
      style: { background: "#1e3a5f", color: "white", fontSize: "13px" },
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#fdf8f2]">
      {/* Header */}
      <div className="bg-[#1e3a5f] px-6 pt-12 pb-10 rounded-b-3xl">
        <p className="text-[#e87c2b] text-xs font-semibold uppercase tracking-widest mb-1">
          Step 1 of 3
        </p>
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-400" size={22} />
          <h1 className="text-white text-2xl font-bold">Aadhaar Data Found</h1>
        </div>
        <p className="text-white/60 text-sm mt-2">
          Please verify your details below before we proceed.
        </p>
      </div>

      <div className="flex-1 px-6 pt-6 overflow-y-auto">
        {/* Aadhaar card */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-[#1e3a5f]/10">
          {/* Card header */}
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d6e6e] px-5 py-4 flex justify-between items-center">
            <div>
              <p className="text-white/50 text-xs">Government of India</p>
              <p className="text-white font-bold text-base">Aadhaar Card</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-xl">🇮🇳</span>
            </div>
          </div>

          {/* Card body */}
          <div className="bg-white px-5 py-5 space-y-4">
            {/* Avatar row */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center text-2xl font-bold text-[#1e3a5f]">
                {mockAadhaar.name[0]}
              </div>
              <div>
                <p className="font-bold text-[#1e3a5f] text-lg">{mockAadhaar.name}</p>
                <p className="text-gray-500 text-sm">{mockAadhaar.dob} · {mockAadhaar.gender}</p>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {[
              ["Aadhaar Number", mockAadhaar.maskedAadhaar],
              ["Address", mockAadhaar.address],
              ["State / PIN", `${mockAadhaar.state} — ${mockAadhaar.pincode}`],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{label}</p>
                <p className="text-[#1e3a5f] font-semibold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Card footer */}
          <div className="bg-[#1e3a5f]/5 px-5 py-3 flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500" />
            <p className="text-xs text-gray-500">Verified via UIDAI · Read-only</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2">
          <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700">
            Only your name and Aadhaar number are used for identity. No biometric data is accessed.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-8 safe-bottom space-y-3 pt-4">
        <button
          onClick={() => setStep("fetching-policies")}
          className="w-full bg-[#e87c2b] active:scale-95 transition-all text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg"
        >
          Accept & Fetch My Policies <ChevronRight size={20} />
        </button>
        <button
          onClick={handleWrong}
          className="w-full border border-[#1e3a5f]/30 text-[#1e3a5f] font-semibold py-3 rounded-2xl text-sm"
        >
          Details look wrong
        </button>
      </div>
    </div>
  );
}
