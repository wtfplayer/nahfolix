import { useEffect, useState } from "react";
import { MapPin, Clock, Eye, Github, ExternalLink, Disc3, MessageCircle, Gamepad2, Copy, Check } from "lucide-react";
import { useLanyard, getAvatarUrl, useDiscordBadges, STATUS_LABEL } from "@/hooks/useLanyard";
import { StarsBackground } from "@/components/StarsBackground";
import { DiscordBadge } from "@/components/DiscordBadge";
import { toast } from "sonner";

const DISCORD_ID = "938124385817092096";
const VIEWS_KEY = "icegodftbl_profile_views";

const StatusDot = ({ status }: { status: string }) => {
  const cls =
    status === "online"
      ? "bg-status-online"
      : status === "idle"
      ? "bg-status-idle"
      : status === "dnd"
      ? "bg-status-dnd"
      : "bg-status-offline";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${cls}`} />;
};

const useLocalTime = (timeZone: string) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone,
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
};

const useViews = () => {
  const [views, setViews] = useState<number>(0);
  useEffect(() => {
    const stored = Number(localStorage.getItem(VIEWS_KEY) ?? "5230");
    const next = stored + 1;
    localStorage.setItem(VIEWS_KEY, String(next));
    setViews(next);
  }, []);
  return views;
};

const StatCard = ({
  label,
  icon: Icon,
  value,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}) => (
  <div className="rounded-2xl bg-surface-inner/70 p-4 ring-1 ring-surface-border">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </p>
    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-foreground">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span>{value}</span>
    </div>
  </div>
);

interface SocialButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  onClick?: () => void;
  href?: string;
  trailing?: "external" | "copy" | "copied";
}

const SocialButton = ({ icon: Icon, label, sub, onClick, href, trailing = "external" }: SocialButtonProps) => {
  const Trailing =
    trailing === "copied" ? Check : trailing === "copy" ? Copy : ExternalLink;
  const content = (
    <>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-background/60 ring-1 ring-surface-border">
        <Icon className="h-4 w-4 text-foreground" />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      <Trailing className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
    </>
  );
  const className =
    "group flex w-full items-center gap-3 rounded-2xl bg-surface-inner/70 p-3 ring-1 ring-surface-border transition-all hover:bg-surface-inner hover:ring-foreground/20";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
};

const Index = () => {
  const { data, loading } = useLanyard(DISCORD_ID);
  const localTime = useLocalTime("America/New_York");
  const views = useViews();
  const badges = useDiscordBadges(data?.discord_user.public_flags);
  const [copied, setCopied] = useState(false);

  const status = data?.discord_status ?? "offline";
  const statusLabel = STATUS_LABEL[status as keyof typeof STATUS_LABEL] ?? "Offline";
  const avatar = data ? getAvatarUrl(data.discord_user, 256) : "";
  const username = data?.discord_user.username ?? "icegodftbl";

  const handleCopyValorant = async () => {
    try {
      await navigator.clipboard.writeText("folix#envy");
      setCopied(true);
      toast.success("Copied folix#envy to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  };

  return (
    <>
      <StarsBackground />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <article className="w-full max-w-md rounded-3xl bg-surface-card/90 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-surface-border backdrop-blur-xl sm:p-7">
          {/* Header */}
          <header className="flex flex-col items-start gap-4 sm:flex-row">
            <div className="relative shrink-0">
              <div className="h-20 w-20 overflow-hidden rounded-2xl bg-surface-inner ring-1 ring-surface-border">
                {avatar && (
                  <img
                    src={avatar}
                    alt={`${username} Discord avatar`}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                )}
              </div>
              <span
                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-surface-card ${
                  status === "online"
                    ? "bg-status-online"
                    : status === "idle"
                    ? "bg-status-idle"
                    : status === "dnd"
                    ? "bg-status-dnd status-pulse-dnd"
                    : "bg-status-offline"
                }`}
                title={statusLabel}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {loading ? "loading…" : "nahfolix"}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-xs text-foreground/90">
                <StatusDot status={status} />
                <span className="font-medium">{statusLabel}</span>
              </div>
              <p className="mt-1.5 text-xs text-foreground/80">fuck israel</p>

              {badges.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {badges.map((b) => (
                    <DiscordBadge key={b.key} badgeKey={b.key} label={b.label} />
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-3 gap-3">
            <StatCard label="Location" icon={MapPin} value="Maryland" />
            <StatCard label="Local Time" icon={Clock} value={localTime || "--:--"} />
            <StatCard label="Views" icon={Eye} value={views.toLocaleString()} />
          </section>

          {/* Social grid */}
          <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SocialButton
              icon={Github}
              label="GitHub"
              sub="wtfplayer"
              href="https://github.com/wtfplayer"
            />
            <SocialButton
              icon={Gamepad2}
              label="Valorant"
              sub="folix#envy"
              onClick={handleCopyValorant}
              trailing={copied ? "copied" : "copy"}
            />
            <SocialButton
              icon={Gamepad2}
              label="Roblox"
              sub="zxfolix"
              href="https://www.roblox.com/users/3784100047/profile"
            />
            <SocialButton
              icon={MessageCircle}
              label="Discord"
              sub="nahfolix"
              href={`https://discord.com/users/${DISCORD_ID}`}
            />
          </section>

          {/* Spotify */}
          <section className="mt-5">
            {data?.listening_to_spotify && data.spotify ? (
              <a
                href={`https://open.spotify.com/track/${data.spotify.track_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl bg-surface-inner/70 p-3 ring-1 ring-surface-border transition-all hover:ring-[#1DB954]/40"
              >
                <img
                  src={data.spotify.album_art_url}
                  alt={`${data.spotify.album} cover`}
                  className="h-12 w-12 rounded-lg object-cover ring-1 ring-surface-border"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1DB954]">
                    Listening on Spotify
                  </p>
                  <p className="truncate text-sm font-semibold text-foreground">
                    {data.spotify.song}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    by {data.spotify.artist}
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl bg-surface-inner/70 p-3 ring-1 ring-surface-border">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-background/60 ring-1 ring-surface-border">
                  <Disc3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Not Playing
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Spotify is inactive
                  </p>
                </div>
              </div>
            )}
          </section>
        </article>
      </main>
    </>
  );
};

export default Index;
