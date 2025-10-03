import React from 'react';
import { Copy, ExternalLink, ArrowUp } from 'lucide-react';
import Button from '../Button';
import Modal from '../Modal';

interface SolutionCardProps {
  id: string;
  title: string;
  snippet: string;
  source: string;
  tags: string[];
  votes: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  snippet,
  source,
  tags,
  votes,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('// Placeholder for actual code snippet');
    alert('Code copied to clipboard!');
  };

  const handleViewSource = () => {
    window.open('#', '_blank'); // Placeholder for actual source URL
  };

  const handleUpvote = () => {
    alert('Upvoted!');
  };

  return (
    <div className="bg-surface_light dark:bg-surface_dark rounded-lg shadow-sm p-4 transition-all duration-normal ease-standard hover:translate-y-[-2px] hover:shadow-md">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-sm text-muted mb-3 line-clamp-3">{snippet}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-muted mb-4">
        <span>Source: {source}</span>
        <span className="flex items-center">
          <ArrowUp className="w-4 h-4 mr-1" />
          {votes}
        </span>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={handleCopyCode} className="p-2">
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="secondary" onClick={handleViewSource} className="p-2">
          <ExternalLink className="w-4 h-4" />
        </Button>
        <Button variant="secondary" onClick={handleUpvote} className="p-2">
          <ArrowUp className="w-4 h-4" />
        </Button>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} className="p-2">
          View Full Solution
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
      >
        <p>{snippet}</p>
        {/* Full solution content goes here */}
        <p className="mt-4 text-sm text-muted">Source: {source}</p>
      </Modal>
    </div>
  );
};

export default SolutionCard;