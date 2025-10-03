import { useState } from 'react';
import { Lightbulb, Copy, ExternalLink, ArrowUp } from 'lucide-react';
import Modal from '../components/Modal'; // Import the new Modal component

interface Solution {
  id: string;
  title: string;
  snippet: string;
  source: string;
  tags: string[];
  votes: number;
  full_description?: string; // Add full_description for modal content
}

const mockSolutions: Solution[] = [
  {
    id: '1',
    title: 'Fix Async Timing Issues',
    snippet: 'Ensure all asynchronous operations are properly awaited or handled with promises to prevent race conditions.',
    source: 'Internal Wiki',
    tags: ['async', 'timing', 'javascript'],
    votes: 15,
    full_description: 'Detailed explanation on how to fix asynchronous timing issues in tests. This often involves using `async/await` correctly, or employing testing utilities that wait for elements to appear or conditions to be met, rather than relying on arbitrary `setTimeout` calls. Consider using libraries like `@testing-library/react`'s `waitFor` or `findBy` methods.',
  },
  {
    id: '2',
    title: 'Isolate Test State',
    snippet: 'Each test should run in an isolated environment to avoid side effects from previous tests.',
    source: 'Blog Post',
    tags: ['state', 'isolation', 'testing'],
    votes: 22,
    full_description: 'To ensure test reliability, it's crucial that each test operates independently. This means setting up and tearing down test-specific data, mocks, and environment variables for every test case. Avoid shared state between tests, as this can lead to unpredictable failures and make debugging difficult.',
  },
  {
    id: '3',
    title: 'Use Stable Test Data',
    snippet: 'Avoid using dynamic or volatile data in tests; prefer static, well-defined datasets.',
    source: 'Team Docs',
    tags: ['data', 'stability'],
    votes: 18,
    full_description: 'Flaky tests often arise from reliance on dynamic data that changes between test runs. Instead, use stable, version-controlled test data. This could involve mocking API responses, using a dedicated test database with a known state, or generating deterministic data for each test scenario.',
  },
  {
    id: '4',
    title: 'Implement Retries for Network Calls',
    snippet: 'Add retry mechanisms for tests involving network requests to mitigate transient failures.',
    source: 'External Article',
    tags: ['network', 'retries'],
    votes: 10,
    full_description: 'Network requests are inherently unreliable and can cause flakiness due to temporary network issues or slow server responses. Implementing a retry logic with a backoff strategy can significantly reduce flakiness. Libraries like `axios-retry` or custom retry functions can be used to automatically re-attempt failed network calls within tests.',
  },
];

function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const handleCopyCode = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    alert('Snippet copied to clipboard!');
  };

  const handleUpvote = (id: string) => {
    setSolutions(prevSolutions =>
      prevSolutions.map(solution =>
        solution.id === id ? { ...solution, votes: solution.votes + 1 } : solution
      )
    );
  };

  const openSolutionModal = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  const closeSolutionModal = () => {
    setIsModalOpen(false);
    setSelectedSolution(null);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-text_light dark:text-text_dark mb-6">Solutions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {solutions.map(solution => (
          <div
            key={solution.id}
            className="bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-102 transition-all duration-200 ease-standard flex flex-col cursor-pointer"
            onClick={() => openSolutionModal(solution)}
          >
            <h2 className="text-xl font-semibold text-text_light dark:text-text_dark mb-2">{solution.title}</h2>
            <p className="text-muted text-sm mb-4 flex-grow">{solution.snippet}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {solution.tags.map(tag => (
                <span key={tag} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-muted mt-auto">
              <span>Source: {solution.source}</span>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); handleUpvote(solution.id); }} className="flex items-center gap-1 hover:text-primary">
                  <ArrowUp className="w-4 h-4" /> {solution.votes}
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleCopyCode(solution.snippet); }} className="hover:text-primary">
                  <Copy className="w-4 h-4" />
                </button>
                <a href="#" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-primary">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSolution && (
        <Modal isOpen={isModalOpen} onClose={closeSolutionModal} title={selectedSolution.title}>
          <div className="space-y-4">
            <p className="text-muted text-sm"><strong>Source:</strong> {selectedSolution.source}</p>
            <p className="text-muted text-sm"><strong>Tags:</strong> {selectedSolution.tags.join(', ')}</p>
            <p className="text-text_light dark:text-text_dark">{selectedSolution.full_description || selectedSolution.snippet}</p>
            {/* Add more details here if available */}
          </div>
        </Modal>
      )}
    </main>
  );
}

export default SolutionsPage;