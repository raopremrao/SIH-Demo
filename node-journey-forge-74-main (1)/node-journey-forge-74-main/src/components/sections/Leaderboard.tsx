import { useEffect, useRef } from "react";
import { Trophy, Medal, Crown, Star, TrendingUp, Users } from "lucide-react";
import { gsap } from "gsap";
import { MobileHeader } from "@/components/MobileHeader";

interface LeaderboardProps {
  onMenuClick?: () => void;
}

export function Leaderboard({ onMenuClick }: LeaderboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const podiumRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // Animate podium entries
      podiumRefs.current.forEach((podium, index) => {
        gsap.fromTo(podium,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 1, delay: 0.5 + index * 0.2, ease: "back.out(1.7)" }
        );
      });
    }
  }, []);

  const topUsers = [
    {
      rank: 1,
      name: "CodeMaster_Alex",
      avatar: "👨‍💻",
      xp: 15420,
      streak: 45,
      badgeCount: 12,
      country: "🇺🇸"
    },
    {
      rank: 2,
      name: "PythonNinja_Sarah",
      avatar: "👩‍💻",
      xp: 14850,
      streak: 38,
      badgeCount: 10,
      country: "🇨🇦"
    },
    {
      rank: 3,
      name: "DevGuru_Mike",
      avatar: "🧑‍💻",
      xp: 14200,
      streak: 42,
      badgeCount: 11,
      country: "🇬🇧"
    }
  ];

  const regularUsers = [
    { rank: 4, name: "JS_Wizard_Emma", avatar: "👩‍🎓", xp: 13750, streak: 25, country: "🇩🇪" },
    { rank: 5, name: "CodeBreaker_John", avatar: "👨‍🎓", xp: 13200, streak: 30, country: "🇦🇺" },
    { rank: 6, name: "AlgoQueen_Lisa", avatar: "👸", xp: 12850, streak: 28, country: "🇫🇷" },
    { rank: 7, name: "BugHunter_Sam", avatar: "🕵️", xp: 12400, streak: 22, country: "🇯🇵" },
    { rank: 8, name: "DataDriven_Ana", avatar: "👩‍🔬", xp: 12100, streak: 20, country: "🇧🇷" },
    { rank: 9, name: "LogicLord_Ben", avatar: "🤴", xp: 11900, streak: 18, country: "🇰🇷" },
    { rank: 10, name: "CodeCrusher_Max", avatar: "⚔️", xp: 11650, streak: 15, country: "🇮🇳" }
  ];

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return "h-32";
      case 2: return "h-24";
      case 3: return "h-20";
      default: return "h-16";
    }
  };

  const getPodiumColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-t from-warning to-yellow-400";
      case 2: return "bg-gradient-to-t from-gray-400 to-gray-300";
      case 3: return "bg-gradient-to-t from-orange-600 to-orange-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {onMenuClick && <MobileHeader onMenuClick={onMenuClick} title="Leaderboard" />}
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-warning to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warning to-yellow-500 bg-clip-text text-transparent">
          Global Leaderboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Compete with learners worldwide and see where you rank among the top coders!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevated text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">50,847</h3>
          <p className="text-sm text-muted-foreground">Active Learners</p>
        </div>
        <div className="card-elevated text-center">
          <TrendingUp className="w-8 h-8 text-success mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">#342</h3>
          <p className="text-sm text-muted-foreground">Your Global Rank</p>
        </div>
        <div className="card-elevated text-center">
          <Star className="w-8 h-8 text-warning mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">1,250</h3>
          <p className="text-sm text-muted-foreground">Your XP</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground text-center">Top Performers</h2>
        <div className="flex items-end justify-center gap-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-2xl border-4 border-gray-400">
                {topUsers[1].avatar}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
            </div>
            <div className="space-y-1 mb-4">
              <h3 className="font-bold text-foreground">{topUsers[1].name}</h3>
              <p className="text-warning font-semibold">{topUsers[1].xp.toLocaleString()} XP</p>
              <p className="text-sm text-muted-foreground">{topUsers[1].streak} day streak</p>
            </div>
            <div 
              ref={(el) => el && (podiumRefs.current[1] = el)}
              className={`${getPodiumHeight(2)} ${getPodiumColor(2)} rounded-t-lg flex items-center justify-center`}
            >
              <Medal className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-warning to-yellow-500 rounded-full flex items-center justify-center text-3xl border-4 border-yellow-400">
                {topUsers[0].avatar}
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-warning rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-1 mb-4">
              <h3 className="font-bold text-foreground text-lg">{topUsers[0].name}</h3>
              <p className="text-warning font-semibold text-lg">{topUsers[0].xp.toLocaleString()} XP</p>
              <p className="text-sm text-muted-foreground">{topUsers[0].streak} day streak</p>
            </div>
            <div 
              ref={(el) => el && (podiumRefs.current[0] = el)}
              className={`${getPodiumHeight(1)} ${getPodiumColor(1)} rounded-t-lg flex items-center justify-center`}
            >
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl border-4 border-orange-500">
                {topUsers[2].avatar}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
            </div>
            <div className="space-y-1 mb-4">
              <h3 className="font-bold text-foreground">{topUsers[2].name}</h3>
              <p className="text-warning font-semibold">{topUsers[2].xp.toLocaleString()} XP</p>
              <p className="text-sm text-muted-foreground">{topUsers[2].streak} day streak</p>
            </div>
            <div 
              ref={(el) => el && (podiumRefs.current[2] = el)}
              className={`${getPodiumHeight(3)} ${getPodiumColor(3)} rounded-t-lg flex items-center justify-center`}
            >
              <Medal className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Rankings List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Global Rankings</h2>
        <div className="space-y-3">
          {regularUsers.map((user, index) => (
            <div key={user.rank} className="card-elevated hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    user.rank <= 5 ? 'bg-gradient-to-r from-warning to-yellow-500' : 'bg-muted'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="text-2xl">{user.avatar}</div>
                  <span className="text-lg">{user.country}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user.streak} day streak</p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-warning">{user.xp.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">XP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position */}
      <div className="card-elevated bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center font-bold text-white text-lg">
              342
            </div>
            <div className="text-2xl">👤</div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Your Position</h3>
              <p className="text-muted-foreground">Keep learning to climb higher!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">1,250</div>
            <div className="text-sm text-muted-foreground">XP</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}