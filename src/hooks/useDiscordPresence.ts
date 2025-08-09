import { useEffect, useState } from "react";

export type DiscordPresence = "online" | "idle" | "dnd" | "offline";

interface LanyardResponse {
  success: boolean;
  data?: {
    discord_status: DiscordPresence;
  };
}

export function useDiscordPresence(userId: string, pollMs: number = 25000) {
  const [status, setStatus] = useState<DiscordPresence | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let interval: number | undefined;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json: LanyardResponse = await res.json();
        if (!json.success || !json.data) throw new Error("Invalid response");
        if (!isMounted) return;
        setStatus(json.data.discord_status);
        setError(null);
      } catch (e) {
        if (!isMounted) return;
        setError((e as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStatus();
    interval = window.setInterval(fetchStatus, pollMs);

    return () => {
      isMounted = false;
      if (interval) window.clearInterval(interval);
    };
  }, [userId, pollMs]);

  return { status, loading, error };
}
