import React from "react";
import { Frown } from "lucide-react";

interface SearchResultItem {
  id: string;
  name: string;
  status: string;
  flakiness_score: number;
  timestamp: string;
}

interface EmptyStateCardProps {
  message: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  message,
  ctaText,
  onCtaClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-surface_light dark:bg-surface_dark rounded-md shadow-sm text-muted">
      <Frown className="h-16 w-16 mb-4" />
      <p className="text-lg font-semibold mb-2">{message}</p>
      {ctaText && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary_hover transition-colors duration-normal"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};

const SkeletonShimmer: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
    </div>
  );
};

interface SearchResultsProps {
  results: SearchResultItem[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm">
          <SkeletonShimmer />
        </div>
        <div className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm">
          <SkeletonShimmer />
        </div>
        <div className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm">
          <SkeletonShimmer />
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <EmptyStateCard
        message="No results found for your search."
        ctaText="Clear Filters"
        onCtaClick={() => console.log("Clear filters action")}
      />
    );
  }

  return (
    <div className="space-y-4">
      {results.map((item) => (
        <a
          key={item.id}
          href={`/tests/${item.id}`}
          className="block p-4 rounded-md shadow-sm bg-surface_light dark:bg-surface_dark hover:lift hover:shadow-md transition-all duration-normal"
        >
          <h3 className="text-lg font-semibold text-text_light dark:text-text_dark mb-1">
            {item.name}
          </h3>
          <p className="text-muted text-sm">
            Status: {item.status} | Flakiness: {item.flakiness_score.toFixed(2)} | {new Date(item.timestamp).toLocaleDateString()}
          </p>
        </a>
      ))}
    </div>
  );
};

export default SearchResults;
