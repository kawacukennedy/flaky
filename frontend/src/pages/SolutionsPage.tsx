import React from 'react';
import SolutionCard from '../components/solutions/SolutionCard';

const SolutionsPage: React.FC = () => {
  // Placeholder data for solutions
  const solutions = [
    {
      id: '1',
      title: 'Optimizing Test Environment Setup',
      snippet: 'Learn how to set up your test environment efficiently to reduce flakiness and speed up test execution.',
      source: 'Internal Wiki',
      tags: ['environment', 'setup', 'performance'],
      votes: 25,
    },
    {
      id: '2',
      title: 'Handling Asynchronous Operations in Tests',
      snippet: 'Best practices for testing asynchronous code, including using async/await and proper mocking techniques.',
      source: 'Engineering Blog',
      tags: ['async', 'javascript', 'testing'],
      votes: 18,
    },
    {
      id: '3',
      title: 'Strategies for Parallel Test Execution',
      snippet: 'Explore different strategies to run your tests in parallel without introducing new flakiness.',
      source: 'Confluence',
      tags: ['parallel', 'ci/cd', 'performance'],
      votes: 30,
    },
    {
      id: '4',
      title: 'Debugging Intermittent Failures',
      snippet: 'Techniques and tools to identify and debug tests that fail inconsistently.',
      source: 'Community Forum',
      tags: ['debugging', 'intermittent', 'troubleshooting'],
      votes: 10,
    },
    {
      id: '5',
      title: 'Mocking External Dependencies',
      snippet: 'How to effectively mock external services and APIs to make your tests reliable and fast.',
      source: 'Internal Docs',
      tags: ['mocking', 'api', 'dependencies'],
      votes: 22,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Solutions</h1>
      <div classNameName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} {...solution} />
        ))}
      </div>
    </div>
  );
};

export default SolutionsPage;