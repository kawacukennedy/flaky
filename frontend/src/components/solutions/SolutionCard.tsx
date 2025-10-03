import React from 'react';
import { Copy, ExternalLink, ArrowUp, Tag } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  snippet: string;
  source: string;
  tags: string[];
  votes: number;
  onClick?: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  snippet,
  source,
  tags,
  votes,
  onClick,
}) => {
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet);
    // Optionally, add a toast notification here
  };

  const handleViewSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(source, '_blank');
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Upvoting solution:', title);
    // Implement actual upvote logic here
  };

  return (
    <div
      className="bg-surface_light dark:bg-surface_dark rounded-md p-4 shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-normal cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-text_light dark:text-text_dark mb-2">{title}</h3>
      <p className="text-muted text-sm mb-3 line-clamp-3">{snippet}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center text-xs bg-bg_light dark:bg-bg_dark text-muted px-2 py-1 rounded-full">
            <Tag size={12} className="mr-1" /> {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Source: {source}</span>
        <div className="flex space-x-3">
          <button onClick={handleCopyCode} className="flex items-center hover:text-primary transition-colors duration-fast" aria-label="Copy Code">
            <Copy size={16} className="mr-1" /> Copy Code
          </button>
          <button onClick={handleViewSource} className="flex items-center hover:text-primary transition-colors duration-fast" aria-label="View Source">
            <ExternalLink size={16} className="mr-1" /> View Source
          </button>
          <button onClick={handleUpvote} className="flex items-center hover:text-primary transition-colors duration-fast" aria-label="Upvote">
            <ArrowUp size={16} className="mr-1" /> {votes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;