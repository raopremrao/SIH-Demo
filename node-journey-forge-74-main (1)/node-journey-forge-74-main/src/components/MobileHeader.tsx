import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function MobileHeader({ onMenuClick, title }: MobileHeaderProps) {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-muted rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-foreground" />
      </button>
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="w-10" /> {/* Spacer for centering */}
    </div>
  );
}