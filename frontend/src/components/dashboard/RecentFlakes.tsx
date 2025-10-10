import React from "react";
import { Inbox } from "lucide-react";

interface RecentFlakesProps {
  flakes?: { id: string; name: string; timestamp: string }[];
}

const RecentFlakes: React.FC<RecentFlakesProps> = ({ flakes }) => {
  const displayFlakes = flakes?.slice(0, 5); // Max 5 items

  return (
    <div className="bg-surface_light dark:bg-surface_dark rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-text_light dark:text-text_dark mb-4">
        Recent Flakes
      </h3>
      {displayFlakes && displayFlakes.length > 0 ? (
        <ul className="space-y-3">
          {displayFlakes.map((flake) => (
            <li
              key={flake.id}
              className="flex items-center justify-between text-text_light dark:text-text_dark"
            >
              <span className="truncate">{flake.name}</span>
              <span className="text-sm text-muted">{flake.timestamp}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-muted">
          <Inbox className="h-12 w-12 mb-4" />
          <p className="text-center">No flaky tests yet.</p>
        </div>
      )}
    </div>
  );
};

export default RecentFlakes;
