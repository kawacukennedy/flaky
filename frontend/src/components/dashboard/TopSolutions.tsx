import React from 'react';

interface SolutionCardProps {
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
  return (
    <div className="bg-surface_light dark:bg-surface_dark rounded-lg shadow-sm p-4 transition-all duration-normal ease-standard hover:scale-[1.02] hover:shadow-md">
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
      <div className="flex justify-between items-center text-sm text-muted">
        <span>Source: {source}</span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
          {votes}
        </span>
      </div>
    </div>
  );
};

const TopSolutions: React.FC = () => {
  // Placeholder for top solutions data
  const solutions: SolutionCardProps[] = [
    {
      title: 'Fixing Async Test Flakiness',
      snippet: 'Implement proper async/await patterns and use testing utilities like waitFor to prevent race conditions.',
      source: 'Internal Wiki',
      tags: ['async', 'jest', 'react-testing-library'],
      votes: 12,
    },
    {
      title: 'Database Seeding Best Practices',
      snippet: 'Ensure your test database is reset and seeded consistently before each test run to avoid state-related flakiness.',
      source: 'Confluence',
      tags: ['database', 'testing', 'setup'],
      votes: 8,
    },
    {
      title: 'Mocking API Calls Effectively',
      snippet: 'Use MSW (Mock Service Worker) to intercept and mock API requests, ensuring predictable test environments.',
      source: 'Blog Post',
      tags: ['api', 'mocking', 'msw'],
      votes: 15,
    },
  ];

  return (
    <div className="bg-surface_light dark:bg-surface_dark p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Top Solutions</h3>
      <div classNameName="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solutions.map((solution, index) => (
          <SolutionCard key={index} {...solution} />
        ))}
      </div>
    </div>
  );
};

export default TopSolutions;