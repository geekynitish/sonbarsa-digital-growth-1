import { useEffect } from "react";
import { useLocation } from "@/lib/router-shim";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_TRACKING_ID = "G-MNWTFDQ04D";

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    let script1: HTMLScriptElement | null = null;
    let script2: HTMLScriptElement | null = null;
    let loaded = false;

    // Load Google Analytics on the first real user interaction (or after a
    // fallback timeout so data isn't lost for users who never interact).
    // gtag.js is ~165KB and mostly unused during the initial page load, so
    // deferring it this far keeps it out of Lighthouse's TBT / unused-JS
    // audits entirely for users who bounce before interacting.
    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanupTriggers();

      script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script1);

      script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
      `;
      document.head.appendChild(script2);
    };

    const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    const onInteraction = () => load();
    interactionEvents.forEach((event) =>
      window.addEventListener(event, onInteraction, { once: true, passive: true })
    );
    const timeoutHandle = window.setTimeout(load, 5000);

    function cleanupTriggers() {
      interactionEvents.forEach((event) => window.removeEventListener(event, onInteraction));
      window.clearTimeout(timeoutHandle);
    }

    return () => {
      cleanupTriggers();
      if (script1) document.head.removeChild(script1);
      if (script2) document.head.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (typeof window.gtag === "function") {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);

  return null;
};
