import { useEffect, useRef } from "react";
import { Target, Calendar, Award, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { gsap } from "gsap";
import { MobileHeader } from "@/components/MobileHeader";

interface GoalsProps {
  onMenuClick?: () => void;
}

export function Goals({ onMenuClick }: GoalsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // Animate progress bars
      progressRefs.current.forEach((progress, index) => {
        const percentage = parseFloat(progress.dataset.percentage || '0');
        gsap.fromTo(progress, 
          { width: '0%' },
          { width: `${percentage}%`, duration: 1.5, delay: 0.5 + index * 0.2, ease: "power2.out" }
        );
      });
    }
  }, []);

  const weeklyGoals = [
    {
      id: 1,
      title: "Complete 15 Lessons",
      description: "Finish at least 15 programming lessons this week",
      progress: 8,
      target: 15,
      reward: "200 XP + Streak Badge",
      daysLeft: 3,
      category: "Learning"
    },
    {
      id: 2,
      title: "Solve 10 Challenges",
      description: "Successfully complete 10 coding challenges",
      progress: 6,
      target: 10,
      reward: "150 XP + Problem Solver Badge",
      daysLeft: 3,
      category: "Practice"
    },
    {
      id: 3,
      title: "Study 5 Hours",
      description: "Spend at least 5 hours learning this week",
      progress: 3.2,
      target: 5,
      reward: "100 XP + Dedication Badge",
      daysLeft: 3,
      category: "Time"
    }
  ];

  const monthlyGoals = [
    {
      id: 4,
      title: "Master Python Basics",
      description: "Complete all fundamental Python concepts",
      progress: 12,
      target: 20,
      reward: "500 XP + Python Master Badge",
      daysLeft: 18,
      category: "Mastery"
    },
    {
      id: 5,
      title: "Build 3 Projects",
      description: "Create 3 practical coding projects",
      progress: 1,
      target: 3,
      reward: "800 XP + Project Builder Title",
      daysLeft: 18,
      category: "Projects"
    }
  ];

  const achievements = [
    { title: "First Steps", description: "Completed your first lesson", earned: true, icon: "🎯" },
    { title: "Quick Learner", description: "Finished 5 lessons in one day", earned: true, icon: "⚡" },
    { title: "Problem Solver", description: "Solved 25 coding challenges", earned: false, icon: "🧩" },
    { title: "Streak Master", description: "Maintained a 30-day learning streak", earned: false, icon: "🔥" }
  ];

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Learning": return "border-primary/50 bg-primary/10";
      case "Practice": return "border-secondary/50 bg-secondary/10";
      case "Time": return "border-success/50 bg-success/10";
      case "Mastery": return "border-warning/50 bg-warning/10";
      case "Projects": return "border-destructive/50 bg-destructive/10";
      default: return "border-muted";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {onMenuClick && <MobileHeader onMenuClick={onMenuClick} title="Learning Goals" />}
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Learning Goals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Set and track your learning objectives to stay motivated and measure progress!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevated text-center">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">68%</h3>
          <p className="text-sm text-muted-foreground">Weekly Progress</p>
        </div>
        <div className="card-elevated text-center">
          <Award className="w-8 h-8 text-warning mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">1,250</h3>
          <p className="text-sm text-muted-foreground">XP This Week</p>
        </div>
        <div className="card-elevated text-center">
          <Calendar className="w-8 h-8 text-success mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">7</h3>
          <p className="text-sm text-muted-foreground">Day Streak</p>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Weekly Goals
        </h2>
        {weeklyGoals.map((goal, index) => {
          const percentage = getProgressPercentage(goal.progress, goal.target);
          return (
            <div key={goal.id} className={`card-elevated border-2 ${getCategoryColor(goal.category)}`}>
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-4">
                <div className="flex-1 w-full lg:w-auto">
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">{goal.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm lg:text-base">{goal.description}</p>
                  <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{goal.daysLeft} days left</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goal.category === "Learning" ? "bg-primary/20 text-primary" :
                      goal.category === "Practice" ? "bg-secondary/20 text-secondary" :
                      goal.category === "Time" ? "bg-success/20 text-success" :
                      "bg-muted/20 text-muted-foreground"
                    }`}>
                      {goal.category}
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-right w-full lg:w-auto">
                  <div className="text-xl lg:text-2xl font-bold text-foreground">
                    {goal.progress}/{goal.target}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {percentage.toFixed(0)}% Complete
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    ref={(el) => el && (progressRefs.current[index] = el)}
                    data-percentage={percentage}
                    className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all duration-500"
                    style={{ width: '0%' }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Reward:</span> {goal.reward}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Goals */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Target className="w-6 h-6 text-secondary" />
          Monthly Goals
        </h2>
        {monthlyGoals.map((goal, index) => {
          const percentage = getProgressPercentage(goal.progress, goal.target);
          const progressIndex = weeklyGoals.length + index;
          return (
            <div key={goal.id} className={`card-elevated border-2 ${getCategoryColor(goal.category)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{goal.title}</h3>
                  <p className="text-muted-foreground mb-3">{goal.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{goal.daysLeft} days left</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goal.category === "Mastery" ? "bg-warning/20 text-warning" :
                      goal.category === "Projects" ? "bg-destructive/20 text-destructive" :
                      "bg-muted/20 text-muted-foreground"
                    }`}>
                      {goal.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {goal.progress}/{goal.target}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {percentage.toFixed(0)}% Complete
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    ref={(el) => el && (progressRefs.current[progressIndex] = el)}
                    data-percentage={percentage}
                    className="bg-gradient-to-r from-secondary to-warning h-3 rounded-full transition-all duration-500"
                    style={{ width: '0%' }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Reward:</span> {goal.reward}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Award className="w-6 h-6 text-warning" />
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className={`card-elevated flex items-center gap-4 ${
              achievement.earned ? 'border-success/50 bg-success/10' : 'opacity-60'
            }`}>
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              {achievement.earned && (
                <CheckCircle className="w-6 h-6 text-success" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}