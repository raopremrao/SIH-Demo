import { useEffect, useRef } from "react";
import { Bot, Users, Globe, Play, Trophy, Clock, Star, Zap } from "lucide-react";
import { gsap } from "gsap";
import { MobileHeader } from "@/components/MobileHeader";

interface GamesProps {
  onMenuClick?: () => void;
}

export function Games({ onMenuClick }: GamesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  const gameCategories = [
    {
      title: "VS AI",
      description: "Test your skills against our smart AI opponents",
      icon: Bot,
      color: "from-primary to-primary-variant",
      textColor: "text-primary",
      games: [
        { name: "Code Speed Challenge", difficulty: "Medium", time: "10 min", players: "1 vs AI" },
        { name: "Algorithm Battle", difficulty: "Hard", time: "15 min", players: "1 vs AI" },
        { name: "Debug Race", difficulty: "Easy", time: "5 min", players: "1 vs AI" }
      ]
    },
    {
      title: "With Friends",
      description: "Compete with your friends in private rooms",
      icon: Users,
      color: "from-success to-green-400",
      textColor: "text-success",
      games: [
        { name: "Team Coding", difficulty: "Medium", time: "20 min", players: "2-4 Players" },
        { name: "Friend Quiz Battle", difficulty: "Easy", time: "8 min", players: "2-6 Players" },
        { name: "Pair Programming", difficulty: "Hard", time: "30 min", players: "2 Players" }
      ]
    },
    {
      title: "Online Multiplayer",
      description: "Join global competitions with players worldwide",
      icon: Globe,
      color: "from-warning to-orange-400",
      textColor: "text-warning",
      games: [
        { name: "Global Tournament", difficulty: "Expert", time: "45 min", players: "16 Players" },
        { name: "Quick Match", difficulty: "Medium", time: "12 min", players: "2-8 Players" },
        { name: "Ranked Ladder", difficulty: "Variable", time: "15 min", players: "2 Players" }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-success bg-success/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'hard': return 'text-destructive bg-destructive/20';
      case 'expert': return 'text-purple-500 bg-purple-500/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {onMenuClick && <MobileHeader onMenuClick={onMenuClick} title="Games" />}
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Play className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Competitive Games
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself against AI, compete with friends, or join global tournaments!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="card-elevated text-center p-4">
            <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-warning mx-auto mb-2" />
            <h3 className="text-lg lg:text-xl font-bold text-foreground">847</h3>
            <p className="text-xs lg:text-sm text-muted-foreground">Games Won</p>
          </div>
          <div className="card-elevated text-center p-4">
            <Star className="w-6 h-6 lg:w-8 lg:h-8 text-primary mx-auto mb-2" />
            <h3 className="text-lg lg:text-xl font-bold text-foreground">1,250</h3>
            <p className="text-xs lg:text-sm text-muted-foreground">Rating</p>
          </div>
          <div className="card-elevated text-center p-4">
            <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-success mx-auto mb-2" />
            <h3 className="text-lg lg:text-xl font-bold text-foreground">15</h3>
            <p className="text-xs lg:text-sm text-muted-foreground">Win Streak</p>
          </div>
          <div className="card-elevated text-center p-4">
            <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="text-lg lg:text-xl font-bold text-foreground">42h</h3>
            <p className="text-xs lg:text-sm text-muted-foreground">Time Played</p>
          </div>
        </div>

        {/* Game Categories */}
        <div className="space-y-6 lg:space-y-8">
          {gameCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-xl lg:text-2xl font-bold ${category.textColor}`}>
                      {category.title}
                    </h2>
                    <p className="text-sm lg:text-base text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {category.games.map((game, gameIndex) => (
                    <div key={game.name} className="card-elevated hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base lg:text-lg">
                            {game.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                            {game.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{game.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{game.players}</span>
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-sm lg:text-base">
                          Play Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Tournaments */}
        <div className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Active Tournaments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="card-elevated bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Weekly Championship</h3>
                  <p className="text-sm text-muted-foreground">Ends in 2 days, 14 hours</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">1,500 XP</div>
                  <div className="text-xs text-muted-foreground">Prize Pool</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Users className="w-4 h-4" />
                <span>2,847 participants</span>
              </div>
              <button className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                Join Tournament
              </button>
            </div>

            <div className="card-elevated bg-gradient-to-r from-warning/10 to-orange-400/10 border-warning/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Speed Coding Blitz</h3>
                  <p className="text-sm text-muted-foreground">Starts in 3 hours</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-warning">500 XP</div>
                  <div className="text-xs text-muted-foreground">Winner Prize</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4" />
                <span>5 min rounds</span>
              </div>
              <button className="w-full bg-warning text-white font-semibold py-2 px-4 rounded-lg hover:bg-warning/90 transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}