import { useEffect, useRef } from "react";
import { Gift, Star, Crown, Zap, ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { MobileHeader } from "@/components/MobileHeader";

interface RedeemRewardsProps {
  onMenuClick?: () => void;
}

export function RedeemRewards({ onMenuClick }: RedeemRewardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rewardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const rewards = [
    {
      id: 1,
      title: "Amazon Gift Card ₹500",
      description: "Redeem for an Amazon India gift card worth ₹500",
      cost: 3000,
      type: "Gift Card",
      rarity: "Epic",
      icon: "🎁",
      available: false
    },
    {
      id: 2,
      title: "XP Booster (24h)",
      description: "Double XP for 24 hours",
      cost: 750,
      type: "Boost",
      rarity: "Rare",
      icon: "⚡",
      available: true
    },
    {
      id: 3,
      title: "Golden Avatar Frame",
      description: "Show off with a prestigious golden frame",
      cost: 1200,
      type: "Cosmetic",
      rarity: "Epic",
      icon: "👑",
      available: false
    },
    {
      id: 4,
      title: "Code Genius Badge",
      description: "Exclusive badge for your profile",
      cost: 300,
      type: "Badge",
      rarity: "Common",
      icon: "🏆",
      available: true
    },
    {
      id: 5,
      title: "Streak Freeze (7 days)",
      description: "Protect your learning streak for a week",
      cost: 1000,
      type: "Protection",
      rarity: "Rare",
      icon: "🛡️",
      available: true
    },
    {
      id: 6,
      title: "Diamond VIP Status",
      description: "Premium features and exclusive content",
      cost: 2500,
      type: "Membership",
      rarity: "Legendary",
      icon: "💎",
      available: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "border-success/50 bg-success/10";
      case "Rare": return "border-primary/50 bg-primary/10";
      case "Epic": return "border-secondary/50 bg-secondary/10";
      case "Legendary": return "border-warning/50 bg-warning/10";
      default: return "border-muted";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {onMenuClick && <MobileHeader onMenuClick={onMenuClick} title="Reward Store" />}
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-warning to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warning to-secondary bg-clip-text text-transparent">
          Reward Store
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Exchange your hard-earned XP for exclusive rewards and power-ups!
        </p>
      </div>

      {/* XP Balance */}
      <div className="card-elevated bg-gradient-to-r from-warning/20 to-secondary/20 border-warning/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-warning" />
            <div>
              <h3 className="text-xl font-bold text-foreground">Your XP Balance</h3>
              <p className="text-muted-foreground">Earned from completing lessons and challenges</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-warning">1,250</div>
            <div className="text-sm text-muted-foreground">XP Available</div>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, index) => (
          <div
            key={reward.id}
            ref={(el) => el && (rewardRefs.current[index] = el)}
            className={`card-elevated border-2 transition-all duration-300 hover:scale-105 ${getRarityColor(reward.rarity)} ${
              !reward.available ? 'opacity-60' : 'hover:shadow-2xl cursor-pointer'
            }`}
          >
            <div className="text-center space-y-4">
              <div className="reward-icon text-6xl mx-auto">{reward.icon}</div>
              
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">{reward.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    reward.rarity === "Common" ? "bg-success/20 text-success" :
                    reward.rarity === "Rare" ? "bg-primary/20 text-primary" :
                    reward.rarity === "Epic" ? "bg-secondary/20 text-secondary" :
                    "bg-warning/20 text-warning"
                  }`}>
                    {reward.rarity}
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {reward.type}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-warning" />
                  <span className="text-xl font-bold text-foreground">{reward.cost} XP</span>
                </div>
                
                <button
                  disabled={!reward.available || reward.cost > 1250}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                    !reward.available || reward.cost > 1250
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-gradient-to-r from-warning to-secondary text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {!reward.available ? 'Coming Soon' : 
                   reward.cost > 1250 ? 'Insufficient XP' : 
                   'Redeem Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Offer */}
      <div className="card-elevated bg-gradient-to-br from-primary/20 via-secondary/20 to-warning/20 border-primary/30">
        <div className="text-center space-y-4">
          <Crown className="w-16 h-16 text-warning mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Limited Time Offer!</h2>
          <p className="text-muted-foreground">Get 50% off on all XP Boosters this week!</p>
          <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
            <ShoppingBag className="w-5 h-5 inline mr-2" />
            Shop Now
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}