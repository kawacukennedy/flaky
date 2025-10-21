import React from "react";
import { Search, Bookmark, Send } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "search" | "flake" | "solution";
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "search":
        return <Search size={16} className="text-info" />;
      case "flake":
        return <Bookmark size={16} className="text-warning" />;
      case "solution":
        return <Send size={16} className="text-success" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {activities && activities.length > 0 ? (
        <ul className="relative border-l border-border ml-2 pl-6">
          {activities.map((activity) => (
            <li key={activity.id} className="mb-6 last:mb-0">
              <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-surface_light dark:border-surface_dark"></div>
              <div className="flex items-center mb-1">
                <span className="mr-2">{getIcon(activity.type)}</span>
                <p className="text-text_light dark:text-text_dark text-sm font-medium">
                  {activity.description}
                </p>
              </div>
              <time className="block text-xs text-muted">
                {activity.timestamp}
              </time>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-muted py-8">
          <p>No recent activity.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
