import { Trophy, Target, Flame, Star, X, ChevronRight } from "lucide-react";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Right Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 sm:w-96 lg:w-80 xl:w-96 bg-surface border-l border-card-border z-50 transform transition-transform duration-300 lg:relative lg:transform-none lg:z-auto overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        {/* Header - Mobile Only */}
        <div className="flex items-center justify-between p-4 border-b border-card-border lg:hidden">
          <h3 className="font-semibold text-foreground">Progress & Stats</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-background">🐍</span>
                </div>
                <span className="font-bold">0</span>
                <Flame className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-warning">0</span>
                <div className="w-4 h-4 bg-warning rounded" />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-secondary">5</span>
                <Star className="w-4 h-4 text-secondary" />
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Leaderboard
              </h3>
              <button className="text-primary text-sm hover:text-primary-hover flex items-center gap-1">
                View <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-muted-foreground rounded-full flex items-center justify-center">
                <span className="text-sm">🔒</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Reach 100 XP to unlock leaderboards!</p>
              </div>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Daily Goals
              </h3>
              <button className="text-primary text-sm hover:text-primary-hover flex items-center gap-1">
                View <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { task: "Complete 3 lessons", progress: "0/3", reward: "🏆" },
                { task: "Solve 2 challenges on first try", progress: "0/2", reward: "🏆" },
                { task: "Earn 95 XP", progress: "0/95", reward: "🏆" }
              ].map((goal, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <span className="text-sm text-foreground flex-1">{goal.task}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{goal.progress}</span>
                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-sm">{goal.reward}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Section */}
          <div className="card-elevated bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/20">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">0 day streak</h3>
              <p className="text-sm text-muted-foreground mb-4">Do a lesson today to start a new streak!</p>
              
              {/* Week Calendar */}
              <div className="flex justify-center gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-colors hover:bg-secondary/20">
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                ))}
              </div>
              
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                <Flame className="w-6 h-6 text-background" />
              </div>
            </div>
          </div>

          {/* Streak Club */}
          <div className="card-elevated hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <span className="text-lg">🔒</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm">Streak Club</h4>
                <p className="text-xs text-muted-foreground">Reach a 7 day streak to join a streak club and earn exclusive perks.</p>
              </div>
              <Flame className="w-5 h-5 text-secondary" />
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="card-elevated">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" />
              Recent Achievements
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs">🚀</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">First Steps</p>
                  <p className="text-xs text-muted-foreground">Complete your first lesson</p>
                </div>
              </div>
              <div className="text-center pt-2">
                <button className="text-primary text-sm hover:text-primary-hover flex items-center gap-1 mx-auto">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg">
            VIEW MORE
          </button>
        </div>
      </div>
    </>
  );
}