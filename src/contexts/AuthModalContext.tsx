import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getOrCreateUserProfile, getRedirectResult } from "@/firebase/auth";
import { auth } from "@/firebase/config";
import { showSuccess } from "@/utils/toast";
import { consumeWizardDraft } from "@/utils/wizardDraft";
import { useNavigate } from "react-router-dom";

export type AuthModalIntent = "signin" | "signup";

interface AuthModalOptions {
  intent?: AuthModalIntent;
  referralCode?: string;
}

interface AuthModalState extends Required<AuthModalOptions> {
  open: boolean;
}

interface AuthModalContextValue {
  state: AuthModalState;
  openAuthModal: (options?: AuthModalOptions) => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthModalState>({ open: false, intent: "signin", referralCode: "" });
  const navigate = useNavigate();

  const openAuthModal = (options?: AuthModalOptions) => {
    setState({
      open: true,
      intent: options?.intent ?? "signin",
      referralCode: options?.referralCode ?? "",
    });
  };

  const closeAuthModal = () => setState((s) => ({ ...s, open: false }));

  // OAuth redirect-based sign-in (fallback when a popup was blocked) completes with a
  // full page reload — this has to live here, at the app root, rather than inside the
  // modal itself, since the modal that started the redirect no longer exists by the
  // time the browser comes back.
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          await getOrCreateUserProfile(result.user);
          showSuccess("Welcome back!");
          const wentToGoal = await consumeWizardDraft(result.user.uid, navigate);
          if (!wentToGoal) navigate("/dashboard");
        }
      })
      .catch(() => {
        // User likely cancelled or there was a transient error — ignore
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthModalContext.Provider value={{ state, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextValue => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
};
