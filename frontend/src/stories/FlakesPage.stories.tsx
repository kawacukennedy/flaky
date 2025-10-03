import type { Meta, StoryObj } from '@storybook/react';
import FlakesPage from '../pages/FlakesPage';
import LogsViewer from '../components/flakes/LogsViewer';
import DetailsPanel from '../components/flakes/DetailsPanel';

// Mock data for child components
const mockLogs = `
INFO:root:Starting data processing...
DEBUG:root:Loading configuration from config.yaml
ERROR:root:Failed to connect to database 'flaky_db'
Traceback (most recent call last):
  File "/app/processor.py", line 23, in connect_db
    conn = psycopg2.connect(database=db_name, user=db_user, password=db_pass)
psycopg2.OperationalError: connection to server at "localhost" (127.0.0.1), port 5432 failed: Connection refused
`;

const mockSummaryContent = (
  <div>
    <h3 className="text-lg font-semibold mb-2">Test Summary</h3>
    <p>This test, <code>LoginFlowTest.test_successful_login</code>, has a flakiness score of <strong>7.2/10</strong>.</p>
  </div>
);

const mockRootCausesContent = (
  <div>
    <h3 className="text-lg font-semibold mb-2">Identified Root Causes</h3>
    <p>Network Latency: 60% of failures.</p>
  </div>
);

const mockLinkedIssuesContent = (
  <div>
    <h3 className="text-lg font-semibold mb-2">Linked Issues</h3>
    <p>GH-123: Investigate Login Flakiness</p>
  </div>
);

// Mock the child components for Storybook
jest.mock('../components/flakes/LogsViewer', () => {
  return (props: any) => <LogsViewer {...props} logs={mockLogs} />;
});

jest.mock('../components/flakes/DetailsPanel', () => {
  return (props: any) => (
    <DetailsPanel
      {...props}
      summaryContent={mockSummaryContent}
      rootCausesContent={mockRootCausesContent}
      linkedIssuesContent={mockLinkedIssuesContent}
    />
  );
});

const meta = {
  title: 'Pages/FlakesPage',
  component: FlakesPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FlakesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
