import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SolutionCardProps {
  id: string;
  title: string;
  snippet: string;
  votes: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ title, snippet, votes }) => {
  return (
    <div className="bg-bg_light dark:bg-surface_dark rounded-lg p-4 shadow-sm hover:scale-102 hover:shadow-md transition-all duration-200 cursor-pointer">
      <h4 className="font-semibold text-text_light dark:text-text_dark mb-2 truncate">{title}</h4>
      <p className="text-sm text-muted mb-3 line-clamp-2">{snippet}</p>
      <div className="flex items-center text-sm text-muted">
        <Lightbulb className="h-4 w-4 mr-1" />
        <span>{votes} Upvotes</span>
      </div>
    </div>
  );
};

interface TopSolutionsProps {
  solutions?: SolutionCardProps[];
}

const TopSolutions: React.FC<TopSolutionsProps> = ({ solutions }) => {
  return (
    <div className="bg-surface_light dark:bg-surface_dark rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-text_light dark:text-text_dark mb-4">Top Solutions</h3>
      {solutions && solutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} {...solution} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-muted">
          <Lightbulb className="h-12 w-12 mb-4" />
          <p className="text-center">No solutions found yet.</p>
        </div>
      )}
    </div>
  );
};

export default TopSolutions;