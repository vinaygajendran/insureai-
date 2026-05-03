import { create } from "zustand";
import type { ChatMessage, WaitingPeriod } from "../types/policy";
import { mockWaitingPeriods, initialChatMessages } from "../fixtures/mockData";

export type Locale = "en" | "hi" | "kn" | "ta" | "te";

export type OnboardingStep =
  | "splash"
  | "phone"
  | "fetching-aadhaar"
  | "aadhaar-found"
  | "fetching-policies"
  | "policies-found"
  | "loading-policies"
  | "building-dashboard"
  | "done";

interface AppState {
  onboardingStep: OnboardingStep;
  phoneNumber: string;
  locale: Locale;
  chatMessages: ChatMessage[];
  waitingPeriods: WaitingPeriod[];
  hasCompletedOnboarding: boolean;

  setOnboardingStep: (step: OnboardingStep) => void;
  setPhoneNumber: (phone: string) => void;
  setLocale: (locale: Locale) => void;
  addChatMessage: (msg: ChatMessage) => void;
  toggleWaitingPeriodNotify: (id: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const STORAGE_KEY = "insureai_onboarded";

export const useAppStore = create<AppState>((set) => ({
  onboardingStep: "splash",
  phoneNumber: "",
  locale: "en",
  chatMessages: initialChatMessages,
  waitingPeriods: mockWaitingPeriods,
  hasCompletedOnboarding: localStorage.getItem(STORAGE_KEY) === "true",

  setOnboardingStep: (step) => set({ onboardingStep: step }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setLocale: (locale) => set({ locale }),
  addChatMessage: (msg) =>
    set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  toggleWaitingPeriodNotify: (id) =>
    set((s) => ({
      waitingPeriods: s.waitingPeriods.map((wp) =>
        wp.id === id ? { ...wp, notifyEnabled: !wp.notifyEnabled } : wp
      ),
    })),
  completeOnboarding: () => {
    localStorage.setItem(STORAGE_KEY, "true");
    set({ hasCompletedOnboarding: true, onboardingStep: "done" });
  },
  resetOnboarding: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      hasCompletedOnboarding: false,
      onboardingStep: "splash",
      phoneNumber: "",
      chatMessages: initialChatMessages,
    });
  },
}));
