import { useState } from "react";
import { Star, Lock, CheckCircle, Play } from "lucide-react";

interface LearningNodeProps {
  id: string;
  title: string;
  description: string;
  status: "locked" | "available" | "current" | "completed";
  position: { x: number; y: number };
  onNodeClick?: (id: string) => void;
}

export function LearningNode({ 
  id, 
  title, 
  description, 
  status, 
  position, 
  onNodeClick 
}: LearningNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (status) {
      case "locked":
        return <Lock className="w-4 h-4 lg:w-5 lg:h-5" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />;
      case "current":
        return <Play className="w-4 h-4 lg:w-5 lg:h-5" />;
      default:
        return <Star className="w-4 h-4 lg:w-5 lg:h-5" />;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "locked":
        return "locked";
      case "completed":
        return "completed";
      case "current":
        return "current";
      default:
        return "active";
    }
  };

  return (
    <div className="relative inline-block">
      <div
        className={`learning-node ${getStatusClass()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => status !== "locked" && onNodeClick?.(id)}
      >
        {getIcon()}
      </div>

      {/* Desktop Tooltip */}
      <div className={`node-tooltip hidden lg:block ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="card-elevated p-3 min-w-64 text-center shadow-xl">
          <h4 className="font-semibold text-sm text-foreground mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
          {status === "locked" && (
            <p className="text-xs text-warning mt-1">Complete previous lessons to unlock</p>
          )}
          {status === "completed" && (
            <p className="text-xs text-success mt-1">✓ Completed</p>
          )}
          {status === "current" && (
            <p className="text-xs text-secondary mt-1">🔥 In Progress</p>
          )}
        </div>
      </div>
    </div>
  );
}