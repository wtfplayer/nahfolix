import { Badge } from "@/components/ui/badge";
import { useDiscordPresence } from "@/hooks/useDiscordPresence";

interface StatusBadgeProps {
  userId: string;
  align?: "left" | "center" | "right";
}

function statusLabel(status: string | null): string {
  switch (status) {
    case "online":
      return "Online";
    case "idle":
      return "Idle";
    case "dnd":
      return "Do Not Disturb";
    case "offline":
      return "Offline";
    default:
      return "Status";
  }
}

export default function StatusBadge({ userId, align = "center" }: StatusBadgeProps) {
  const { status, loading } = useDiscordPresence(userId);

  const justify = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

  return (
    <div className={`flex ${justify}`}>
      <Badge variant="secondary" aria-live="polite" aria-busy={loading} className="gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden="true" />
        {loading ? "Checking…" : statusLabel(status)}
      </Badge>
    </div>
  );
}
