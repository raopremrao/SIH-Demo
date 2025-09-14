import { useEffect, useRef } from "react";
import { User, Star, Trophy, Calendar, Target, Settings, Edit, Award, TrendingUp } from "lucide-react";
import { gsap } from "gsap";

export function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // Animate badges with staggered rotation
      badgeRefs.current.forEach((badge, index) => {
        gsap.fromTo(badge,
          { rotation: -45, scale: 0 },
          { rotation: 0, scale: 1, duration: 0.8, delay: 0.5 + index * 0.1, ease: "back.out(1.7)" }
        );
      });
    }
  }, []);

  const userStats = [
    { label: "Total XP", value: "1,250", icon: Star, color: "text-warning" },
    { label: "Lessons Completed", value: "24", icon: Trophy, color: "text-primary" },
    { label: "Current Streak", value: "7 days", icon: Calendar, color: "text-success" },
    { label: "Goals Achieved", value: "3", icon: Target, color: "text-secondary" }
  ];

  const achievements = [
    { id: 1, name: "First Steps", description: "Completed your first lesson", icon: "🎯", earned: true, rarity: "Common" },
    { id: 2, name: "Quick Learner", description: "Finished 5 lessons in one day", icon: "⚡", earned: true, rarity: "Rare" },
    { id: 3, name: "Streak Starter", description: "Maintained a 7-day learning streak", icon: "🔥", earned: true, rarity: "Rare" },
    { id: 4, name: "Python Basics", description: "Completed all Python fundamentals", icon: "🐍", earned: false, rarity: "Epic" },
    { id: 5, name: "Problem Solver", description: "Solved 25 coding challenges", icon: "🧩", earned: false, rarity: "Epic" },
    { id: 6, name: "Code Master", description: "Reached 10,000 XP", icon: "👑", earned: false, rarity: "Legendary" }
  ];

  const skillProgress = [
    { skill: "Python Basics", progress: 85, color: "from-primary to-primary-hover" },
    { skill: "Data Structures", progress: 45, color: "from-secondary to-secondary-hover" },
    { skill: "Algorithms", progress: 20, color: "from-success to-green-400" },
    { skill: "Object-Oriented Programming", progress: 65, color: "from-warning to-yellow-400" }
  ];

  const recentActivity = [
    { date: "Today", activity: "Completed 'Variables & Data Types' lesson", xp: "+50 XP" },
    { date: "Yesterday", activity: "Solved daily challenge", xp: "+75 XP" },
    { date: "2 days ago", activity: "Earned 'Streak Starter' achievement", xp: "+100 XP" },
    { date: "3 days ago", activity: "Completed 'Your First Program' lesson", xp: "+50 XP" }
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
    <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl border-4 border-primary/20">
            👨‍💻
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">CodeLearner123</h1>
          <p className="text-lg text-muted-foreground">Python Enthusiast • 7 Day Streak 🔥</p>
          <div className="flex items-center justify-center gap-2">
            <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              Level 3
            </div>
            <div className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
              Beginner
            </div>
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="flex justify-center gap-4">
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary-hover transition-all duration-200 hover:scale-105">
          <Edit className="w-5 h-5" />
          Edit Profile
        </button>
        <button className="flex items-center gap-2 bg-surface border border-card-border text-foreground px-6 py-3 rounded-xl hover:bg-surface-elevated transition-all duration-200">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-elevated text-center hover:shadow-xl transition-all duration-300">
              <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Skills Progress */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Skill Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillProgress.map((skill, index) => (
            <div key={skill.skill} className="card-elevated">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{skill.skill}</h3>
                <span className="text-sm font-medium text-foreground">{skill.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Award className="w-6 h-6 text-warning" />
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              ref={(el) => el && (badgeRefs.current[index] = el)}
              className={`card-elevated border-2 ${getRarityColor(achievement.rarity)} ${
                !achievement.earned ? 'opacity-60' : 'hover:shadow-xl'
              } transition-all duration-300`}
            >
              <div className="text-center space-y-3">
                <div className={`text-4xl ${achievement.earned ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    achievement.rarity === "Common" ? "bg-success/20 text-success" :
                    achievement.rarity === "Rare" ? "bg-primary/20 text-primary" :
                    achievement.rarity === "Epic" ? "bg-secondary/20 text-secondary" :
                    "bg-warning/20 text-warning"
                  }`}>
                    {achievement.rarity}
                  </div>
                  {achievement.earned && (
                    <div className="text-xs text-success font-medium">✓ Earned</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-success" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="card-elevated hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-medium text-foreground">{activity.activity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-5">{activity.date}</p>
                </div>
                <div className="text-success font-semibold">{activity.xp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Streak */}
      <div className="card-elevated bg-gradient-to-br from-success/20 to-primary/20 border-success/30">
        <div className="text-center space-y-4">
          <div className="text-6xl">🔥</div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">7 Day Streak!</h2>
            <p className="text-muted-foreground">You're on fire! Keep it up to maintain your streak.</p>
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}