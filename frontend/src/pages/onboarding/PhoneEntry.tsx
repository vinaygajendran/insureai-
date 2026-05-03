import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { ChevronRight, Phone } from "lucide-react";

export default function PhoneEntry() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const setStep = useAppStore((s) => s.setOnboardingStep);
  const savePhone = useAppStore((s) => s.setPhoneNumber);

  const handleSubmit = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    savePhone(digits);
    setStep("fetching-aadhaar");
  };

  return (
    <div className="flex flex-col h-full bg-[#fdf8f2]">
      {/* Header band */}
      <div className="bg-[#1e3a5f] px-6 pt-12 pb-10 rounded-b-3xl">
        <p className="text-[#e87c2b] text-xs font-semibold uppercase tracking-widest mb-1">
          Step 1 of 3
        </p>
        <h1 className="text-white text-2xl font-bold leading-tight">
          Enter your mobile number
        </h1>
        <p className="text-white/60 text-sm mt-2">
          We'll link your Aadhaar via DigiLocker to fetch your insurance records.
        </p>
      </div>

      <div className="flex-1 px-6 pt-8 space-y-6">
        {/* Phone input */}
        <div>
          <label className="block text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider mb-2">
            Mobile Number
          </label>
          <div className="flex items-center border-2 border-[#1e3a5f]/20 rounded-xl bg-white focus-within:border-[#e87c2b] transition-colors">
            <div className="flex items-center gap-1 px-3 border-r border-[#1e3a5f]/20">
              <span className="text-base">🇮🇳</span>
              <span className="text-sm font-semibold text-[#1e3a5f]">+91</span>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
              placeholder="9876543210"
              className="flex-1 px-4 py-4 text-lg font-semibold bg-transparent outline-none text-[#1e3a5f] placeholder-gray-300"
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>

        {/* Trust note */}
        <div className="bg-[#1e3a5f]/5 rounded-xl p-4 flex gap-3">
          <Phone size={18} className="text-[#1e3a5f] mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[#1e3a5f]">Linked to DigiLocker</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Your number must be registered with Aadhaar. Data is fetched securely from UIDAI and never stored on our servers.
            </p>
          </div>
        </div>

        {/* Digit pads shortcut — realistic UX */}
        <div className="grid grid-cols-3 gap-2">
          {["1","2","3","4","5","6","7","8","9","←","0","✓"].map((k) => (
            <button
              key={k}
              onClick={() => {
                if (k === "←") setPhone((p) => p.slice(0, -1));
                else if (k === "✓") handleSubmit();
                else if (phone.length < 10) setPhone((p) => p + k);
              }}
              className={`py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${
                k === "✓"
                  ? "bg-[#e87c2b] text-white"
                  : "bg-white border border-[#1e3a5f]/10 text-[#1e3a5f]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-8 safe-bottom">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#1e3a5f] active:scale-95 transition-all text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2"
        >
          Fetch my Aadhaar data <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
