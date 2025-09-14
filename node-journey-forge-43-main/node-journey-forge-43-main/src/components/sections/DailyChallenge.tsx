import { useEffect, useRef } from "react";
import { Calendar, Clock, Trophy, Target, Zap, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { MobileHeader } from "@/components/MobileHeader";

interface DailyChallengeProps {
  onMenuClick?: () => void;
}

export function DailyChallenge({ onMenuClick }: DailyChallengeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  const challenges = [
    {
      id: 1,
      title: "Python Variables Mastery",
      description: "Complete 5 variable exercises without errors",
      xp: 150,
      timeLeft: "6h 42m",
      difficulty: "Beginner",
      progress: 2,
      total: 5,
      icon: "🎯"
    },
    {
      id: 2,
      title: "Loop Logic Challenge",
      description: "Solve 3 loop problems in under 10 minutes each",
      xp: 250,
      timeLeft: "6h 42m",
      difficulty: "Intermediate",
      progress: 0,
      total: 3,
      icon: "🔄"
    },
    {
      id: 3,
      title: "Debug Detective",
      description: "Find and fix 4 bugs in provided code",
      xp: 200,
      timeLeft: "6h 42m",
      difficulty: "Intermediate",
      progress: 1,
      total: 4,
      icon: "🐛"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {onMenuClick && <MobileHeader onMenuClick={onMenuClick} title="Daily Challenges" />}
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-warning rounded-2xl flex items-center justify-center shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-warning bg-clip-text text-transparent">
          Daily Challenges
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete daily coding challenges to earn bonus XP and maintain your streak!
        </p>
      </div>

      {/* Timer and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevated text-center">
          <Clock className="w-8 h-8 text-secondary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">6h 42m</h3>
          <p className="text-sm text-muted-foreground">Time Remaining</p>
        </div>
        <div className="card-elevated text-center">
          <Trophy className="w-8 h-8 text-warning mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">600 XP</h3>
          <p className="text-sm text-muted-foreground">Available Today</p>
        </div>
        <div className="card-elevated text-center">
          <Target className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">3/5</h3>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Today's Challenges</h2>
        {challenges.map((challenge, index) => (
          <div
            key={challenge.id}
            ref={(el) => el && (cardsRef.current[index] = el)}
            className="card-elevated hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{challenge.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      challenge.difficulty === "Beginner" ? "bg-success/20 text-success" :
                      challenge.difficulty === "Intermediate" ? "bg-warning/20 text-warning" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {challenge.difficulty}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {challenge.timeLeft}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="text-center sm:text-right">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="font-semibold text-foreground">{challenge.progress}/{challenge.total}</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-sm text-muted-foreground">Reward</p>
                      <p className="font-semibold text-secondary">{challenge.xp} XP</p>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-secondary to-warning h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Streak Info */}
      <div className="card-elevated bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Daily Challenge Streak</h3>
          <p className="text-muted-foreground mb-4">Complete challenges daily to maintain your streak!</p>
          <div className="text-3xl font-bold text-primary">7 Days</div>
        </div>
      </div>
    </div>
    </div>
  );
}