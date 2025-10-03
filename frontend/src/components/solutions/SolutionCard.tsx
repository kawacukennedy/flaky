import React, { useState } from 'react';
import clsx from 'clsx';
import { Copy, ExternalLink, ArrowUp, MessageSquare } from 'lucide-react';
import Button from '../Button';
import Modal from '../Modal'; // Assuming Modal component will be created

interface SolutionCardProps {
  title: string;
  snippet: string;
  source: string;
  tags: string[];
  votes: number;
  fullContent?: string; // Optional: for modal display
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  snippet,
  source,
  tags,
  votes,
  fullContent = 'Full solution content goes here...',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fullContent);
    // Optionally, show a toast notification
  };

  const handleViewSource = () => {
    // Placeholder for navigating to source
    window.open('#', '_blank');
  };

  const handleUpvote = () => {
    // Placeholder for upvote logic
    console.log('Upvoted!');
  };

  return (
    <div
      className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm transition-all duration-fast ease-standard hover:scale-[1.02] hover:shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <h3 className="text-lg font-semibold text-text_light dark:text-text_dark mb-2">{title}</h3>
      <p className="text-muted text-sm mb-3 line-clamp-3">{snippet}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-muted">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" /> {source}
        </span>
        <span className="flex items-center">
          <ArrowUp className="h-4 w-4 mr-1 text-primary" /> {votes}
        </span>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title}>
        <div className="prose dark:prose-invert max-w-none">
          {fullContent}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button label="Copy Code" variant="secondary" onClick={handleCopyCode} />
          <Button label="View Source" variant="secondary" onClick={handleViewSource} />
          <Button label="Upvote" variant="primary" onClick={handleUpvote} />
        </div>
      </Modal>
    </div>
  );
};

export default SolutionCard;
