import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { LearningPath } from "@/components/LearningPath";
import { RightSidebar } from "@/components/RightSidebar";
import { DailyChallenge } from "@/components/sections/DailyChallenge";
import { RedeemRewards } from "@/components/sections/RedeemRewards";
import { Goals } from "@/components/sections/Goals";
import { Leaderboard } from "@/components/sections/Leaderboard";
import { Store } from "@/components/sections/Store";
import { Profile } from "@/components/sections/Profile";
import { Settings } from "@/components/sections/Settings";
import { BarChart3 } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  const [activeSection, setActiveSection] = useState("journey");
  const [currentChapter, setCurrentChapter] = useState("Getting Started with Python");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  useLenis();

  const handleNodeClick = (nodeId: string) => {
    console.log("Node clicked:", nodeId);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "journey":
        return (
          <LearningPath 
            currentChapter={currentChapter}
            onNodeClick={handleNodeClick}
            onMenuClick={() => setLeftSidebarOpen(true)}
          />
        );
      case "daily-challenge":
        return <DailyChallenge />;
      case "redeem-rewards":
        return <RedeemRewards />;
      case "goals":
        return <Goals />;
      case "leaderboard":
        return <Leaderboard />;
      case "store":
        return <Store />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return (
          <LearningPath 
            currentChapter={currentChapter}
            onNodeClick={handleNodeClick}
            onMenuClick={() => setLeftSidebarOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isOpen={leftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
      />
      
      <div className="relative z-10 flex-1">
        {renderActiveSection()}
      </div>
      
      <RightSidebar 
        isOpen={rightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
      />

      <button
        onClick={() => setRightSidebarOpen(true)}
        className="fab lg:hidden animate-glow-pulse"
        aria-label="Open progress panel"
      >
        <BarChart3 className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Index;
