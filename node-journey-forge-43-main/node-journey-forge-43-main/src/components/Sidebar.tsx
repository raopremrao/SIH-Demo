import { 
  Rocket, 
  Zap, 
  Target, 
  Trophy, 
  Store, 
  User, 
  MoreHorizontal, 
  Gift,
  Gamepad2,
  X
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: "journey", label: "Journey", icon: Rocket },
  { id: "daily-challenge", label: "Daily Challenge", icon: Zap },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "redeem-rewards", label: "Redeem Rewards", icon: Gift },
  { id: "goals", label: "Goals", icon: Target },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "store", label: "Store", icon: Store },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: MoreHorizontal },
];

export function Sidebar({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="mobile-nav-overlay" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? '' : 'closed'} lg:w-64 lg:relative lg:translate-x-0`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SkillForge
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 text-center">
            v1.0.0 • SkillForge Platform
          </div>
        </div>
      </div>
    </>
  );
}