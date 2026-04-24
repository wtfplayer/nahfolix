import { useEffect, useMemo, useState } from "react";

type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    global_name: string | null;
    display_name: string | null;
    avatar: string | null;
    public_flags: number;
  };
  discord_status: DiscordStatus;
  activities: Array<{
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
  }>;
  listening_to_spotify: boolean;
  spotify: {
    track_id: string;
    timestamps: { start: number; end: number };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let pollId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    // REST fallback — works even if user isn't in the Lanyard Discord server
    const fetchRest = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json = await res.json();
        if (json?.success && json?.data && !cancelled) {
          setData(json.data);
          setLoading(false);
        } else if (!cancelled) {
          // Even on failure, mark as loaded so UI shows offline state
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRest();
    pollId = setInterval(fetchRest, 15000);

    const connect = () => {
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.op === 1) {
          socket?.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: userId },
            })
          );
          heartbeat = setInterval(() => {
            socket?.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
        } else if (msg.op === 0) {
          if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
            const payload = msg.t === "INIT_STATE" ? msg.d[userId] : msg.d;
            if (payload && !cancelled) {
              setData(payload);
              setLoading(false);
            }
          }
        }
      };

      socket.onclose = () => {
        if (heartbeat) clearInterval(heartbeat);
        if (!cancelled) setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      cancelled = true;
      if (heartbeat) clearInterval(heartbeat);
      if (pollId) clearInterval(pollId);
      socket?.close();
    };
  }, [userId]);

  return { data, loading };
}

export function getAvatarUrl(user: LanyardData["discord_user"] | undefined, size = 256) {
  if (!user) return "";
  if (!user.avatar) {
    const idx = Number(BigInt(user.id) % 6n);
    return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
  }
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`;
}

export const STATUS_LABEL: Record<DiscordStatus, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do not disturb",
  offline: "Offline",
};

export function useDiscordBadges(publicFlags: number | undefined) {
  return useMemo(() => {
    if (!publicFlags) return [];
    const FLAGS: Array<{ bit: number; key: string; label: string }> = [
      { bit: 1 << 0, key: "staff", label: "Discord Staff" },
      { bit: 1 << 1, key: "partner", label: "Partner" },
      { bit: 1 << 2, key: "hypesquad", label: "HypeSquad Events" },
      { bit: 1 << 3, key: "bug_hunter_1", label: "Bug Hunter" },
      { bit: 1 << 6, key: "bravery", label: "HypeSquad Bravery" },
      { bit: 1 << 7, key: "brilliance", label: "HypeSquad Brilliance" },
      { bit: 1 << 8, key: "balance", label: "HypeSquad Balance" },
      { bit: 1 << 9, key: "early_supporter", label: "Early Supporter" },
      { bit: 1 << 14, key: "bug_hunter_2", label: "Bug Hunter Level 2" },
      { bit: 1 << 17, key: "verified_dev", label: "Early Verified Bot Developer" },
      { bit: 1 << 18, key: "moderator", label: "Certified Moderator" },
      { bit: 1 << 22, key: "active_dev", label: "Active Developer" },
    ];
    return FLAGS.filter((f) => (publicFlags & f.bit) !== 0);
  }, [publicFlags]);
}
