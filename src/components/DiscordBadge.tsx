import { Shield, Sparkles, Code2, Bug, Heart, Award, Wrench, Crown, Star, Zap, Hammer, BadgeCheck } from "lucide-react";

const ICONS: Record<string, { Icon: React.ComponentType<{ className?: string }>; color: string }> = {
  staff: { Icon: Shield, color: "text-[#5865F2]" },
  partner: { Icon: BadgeCheck, color: "text-[#5865F2]" },
  hypesquad: { Icon: Crown, color: "text-[#f8a532]" },
  bug_hunter_1: { Icon: Bug, color: "text-[#3ba55d]" },
  bravery: { Icon: Zap, color: "text-[#9b59b6]" },
  brilliance: { Icon: Sparkles, color: "text-[#f47b67]" },
  balance: { Icon: Star, color: "text-[#45ddc0]" },
  early_supporter: { Icon: Heart, color: "text-[#ff73fa]" },
  bug_hunter_2: { Icon: Bug, color: "text-[#3ba55d]" },
  verified_dev: { Icon: Code2, color: "text-[#5865F2]" },
  moderator: { Icon: Hammer, color: "text-[#5865F2]" },
  active_dev: { Icon: Wrench, color: "text-[#3ba55d]" },
};

interface BadgeProps {
  badgeKey: string;
  label: string;
}

export const DiscordBadge = ({ badgeKey, label }: BadgeProps) => {
  const entry = ICONS[badgeKey] ?? { Icon: Award, color: "text-muted-foreground" };
  const { Icon, color } = entry;
  return (
    <div
      title={label}
      aria-label={label}
      className="grid h-6 w-6 place-items-center rounded-md bg-surface-inner ring-1 ring-surface-border transition-transform hover:scale-110"
    >
      <Icon className={`h-3.5 w-3.5 ${color}`} />
    </div>
  );
};
