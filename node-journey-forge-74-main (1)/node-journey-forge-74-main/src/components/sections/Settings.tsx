import { useEffect, useRef } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Database, HelpCircle } from "lucide-react";
import { gsap } from "gsap";
import { Switch } from "@/components/ui/switch";
import { MobileHeader } from "@/components/MobileHeader";

interface SettingsProps {
  onMenuClick?: () => void;
}

export function Settings({ onMenuClick }: SettingsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  const settingsSections = [
    {
      title: "Account Settings",
      icon: User,
      settings: [
        { label: "Profile Visibility", description: "Make your profile visible to other users", enabled: true },
        { label: "Activity Status", description: "Show when you're online", enabled: false },
        { label: "Learning Progress", description: "Display your progress publicly", enabled: true }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { label: "Daily Reminders", description: "Get daily learning reminders", enabled: true },
        { label: "Challenge Alerts", description: "Notify when new challenges are available", enabled: true },
        { label: "Achievement Notifications", description: "Get notified about new achievements", enabled: false },
        { label: "Email Updates", description: "Receive weekly progress emails", enabled: false }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      settings: [
        { label: "Two-Factor Authentication", description: "Add extra security to your account", enabled: false },
        { label: "Data Analytics", description: "Help improve the platform with usage data", enabled: true },
        { label: "Third-party Cookies", description: "Allow tracking for personalized experience", enabled: false }
      ]
    },
    {
      title: "Appearance",
      icon: Palette,
      settings: [
        { label: "Dark Mode", description: "Use dark theme", enabled: true },
        { label: "Animations", description: "Enable smooth animations", enabled: true },
        { label: "Reduced Motion", description: "Minimize animations for accessibility", enabled: false }
      ]
    },
    {
      title: "Language & Region",
      icon: Globe,
      settings: [
        { label: "Auto-detect Language", description: "Detect language from browser", enabled: true },
        { label: "Regional Content", description: "Show content relevant to your region", enabled: true }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {onMenuClick && <MobileHeader onMenuClick={onMenuClick} title="Settings" />}
      <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-8 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
          Customize your SkillForge experience and manage your account preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 md:space-y-8">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          
          return (
            <div key={section.title} className="card-elevated space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-card-border">
                <Icon className="w-6 h-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{section.title}</h2>
              </div>
              
              <div className="space-y-4">
                {section.settings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1 text-sm md:text-base">
                        {setting.label}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground pr-4">
                        {setting.description}
                      </p>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Data & Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="card-elevated space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-secondary" />
              <h2 className="text-lg md:text-xl font-bold text-foreground">Data Management</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm md:text-base">
                Export Learning Data
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm md:text-base">
                Download Account Data
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-destructive/20 hover:bg-destructive/30 transition-colors text-destructive text-sm md:text-base">
                Delete Account
              </button>
            </div>
          </div>

          <div className="card-elevated space-y-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-warning" />
              <h2 className="text-lg md:text-xl font-bold text-foreground">Help & Support</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm md:text-base">
                Contact Support
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm md:text-base">
                FAQ & Documentation
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm md:text-base">
                Report a Bug
              </button>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center pt-8 border-t border-card-border">
          <p className="text-xs md:text-sm text-muted-foreground">
            SkillForge Platform v1.0.0 • Last updated: December 2024
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}