import { useEffect, useState } from "react";
import { fetchSiteContent } from "../api/client";
import { FALLBACK_CONTENT } from "../lib/fallbackContent";

export function useContent() {
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchSiteContent()
      .then((data) => {
        if (!cancelled) setContent({ ...FALLBACK_CONTENT, ...data });
      })
      .catch(() => {
        if (!cancelled) setUsingFallback(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading, usingFallback };
}
