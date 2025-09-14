import { useEffect, useRef } from "react";
import { Store as StoreIcon, ShoppingBag, Star, Crown, Zap, Shield } from "lucide-react";
import { gsap } from "gsap";
import { MobileHeader } from "@/components/MobileHeader";

interface StoreProps {
  onMenuClick?: () => void;
}

export function Store({ onMenuClick }: StoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const categories = [
    { id: "themes", name: "Themes", icon: "🎨", count: 12 },
    { id: "boosters", name: "XP Boosters", icon: "⚡", count: 5 },
    { id: "cosmetics", name: "Cosmetics", icon: "👑", count: 8 },
    { id: "protection", name: "Protection", icon: "🛡️", count: 4 }
  ];

  const featuredItems = [
    {
      id: 1,
      name: "Galaxy Theme Pack",
      description: "Transform your profile with stunning cosmic visuals",
      price: 800,
      category: "Theme",
      rarity: "Epic",
      image: "🌌",
      discount: 25,
      popular: true
    },
    {
      id: 2,
      name: "Mega XP Booster",
      description: "Triple XP for 48 hours",
      price: 1500,
      category: "Booster",
      rarity: "Legendary",
      image: "🚀",
      discount: 0,
      popular: false
    },
    {
      id: 3,
      name: "Diamond Crown",
      description: "Ultimate prestige symbol for elite learners",
      price: 2000,
      category: "Cosmetic",
      rarity: "Legendary",
      image: "💎",
      discount: 0,
      popular: false
    }
  ];

  const storeItems = [
    {
      id: 4,
      name: "Ocean Breeze Theme",
      description: "Calming blue gradient theme",
      price: 400,
      category: "Theme",
      rarity: "Rare",
      image: "🌊"
    },
    {
      id: 5,
      name: "Code Ninja Avatar",
      description: "Exclusive ninja-themed avatar frame",
      price: 600,
      category: "Cosmetic",
      rarity: "Rare",
      image: "🥷"
    },
    {
      id: 6,
      name: "Streak Shield",
      description: "Protect your streak for 3 days",
      price: 500,
      category: "Protection",
      rarity: "Common",
      image: "🛡️"
    },
    {
      id: 7,
      name: "Golden Badge Set",
      description: "Collection of 5 premium badges",
      price: 1200,
      category: "Cosmetic",
      rarity: "Epic",
      image: "🏆"
    },
    {
      id: 8,
      name: "Double XP (24h)",
      description: "Double all XP gains for 24 hours",
      price: 750,
      category: "Booster",
      rarity: "Rare",
      image: "⚡"
    },
    {
      id: 9,
      name: "Sunset Theme",
      description: "Warm orange and purple gradients",
      price: 350,
      category: "Theme",
      rarity: "Common",
      image: "🌅"
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
      {onMenuClick && <MobileHeader onMenuClick={onMenuClick} title="Store" />}
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <StoreIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          SkillForge Store
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enhance your learning experience with premium themes, boosters, and exclusive items!
        </p>
      </div>

      {/* XP Balance & Cart */}
      <div className="flex items-center justify-between card-elevated">
        <div className="flex items-center gap-4">
          <Star className="w-8 h-8 text-warning" />
          <div>
            <h3 className="text-xl font-bold text-foreground">1,250 XP</h3>
            <p className="text-sm text-muted-foreground">Available Balance</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200">
          <ShoppingBag className="w-5 h-5" />
          Cart (0)
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={category.id} className="card-elevated text-center hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.count} items</p>
          </div>
        ))}
      </div>

      {/* Featured Items */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => el && (itemRefs.current[index] = el)}
              className={`card-elevated border-2 ${getRarityColor(item.rarity)} hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden`}
            >
              {item.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-warning to-secondary text-white px-2 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}
              {item.discount > 0 && (
                <div className="absolute top-4 left-4 bg-destructive text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{item.discount}%
                </div>
              )}
              
              <div className="text-center space-y-4">
                <div className="text-6xl mx-auto">{item.image}</div>
                
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.rarity === "Common" ? "bg-success/20 text-success" :
                      item.rarity === "Rare" ? "bg-primary/20 text-primary" :
                      item.rarity === "Epic" ? "bg-secondary/20 text-secondary" :
                      "bg-warning/20 text-warning"
                    }`}>
                      {item.rarity}
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-warning" />
                    {item.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg line-through text-muted-foreground">{item.price} XP</span>
                        <span className="text-xl font-bold text-foreground">{Math.round(item.price * (1 - item.discount / 100))} XP</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-foreground">{item.price} XP</span>
                    )}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Items */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">All Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => el && (itemRefs.current[featuredItems.length + index] = el)}
              className={`card-elevated border-2 ${getRarityColor(item.rarity)} hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div className="text-center space-y-4">
                <div className="text-5xl mx-auto">{item.image}</div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.rarity === "Common" ? "bg-success/20 text-success" :
                      item.rarity === "Rare" ? "bg-primary/20 text-primary" :
                      item.rarity === "Epic" ? "bg-secondary/20 text-secondary" :
                      "bg-warning/20 text-warning"
                    }`}>
                      {item.rarity}
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-warning" />
                    <span className="text-lg font-bold text-foreground">{item.price} XP</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="card-elevated bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-warning/20 border-purple-500/30">
        <div className="text-center space-y-4">
          <Crown className="w-16 h-16 text-warning mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Weekend Special!</h2>
          <p className="text-muted-foreground">Get 30% off on all XP Boosters this weekend only!</p>
          <button className="bg-gradient-to-r from-warning to-secondary text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
            <Zap className="w-5 h-5 inline mr-2" />
            Shop Boosters
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}