import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Reset scroll to top on every wouter route change.
 * Skips when the URL has a hash so anchor-jumps (e.g. /faq#question) still work.
 * Mount once inside the Router subtree.
 */
export function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}
