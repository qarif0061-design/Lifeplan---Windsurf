import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthModal } from "@/contexts/AuthModalContext";

/** Legacy route kept for backward-compat with already-distributed links
 * (referral links use ?ref=, the homepage wizard uses ?intent=wizard).
 * Opens the auth popup over the homepage instead of rendering a page. */
const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const referralCode = searchParams.get("ref") || undefined;
    const intentParam = searchParams.get("intent");
    openAuthModal({
      intent: intentParam === "wizard" ? "signup" : referralCode ? "signup" : "signin",
      referralCode,
    });
    navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Auth;
