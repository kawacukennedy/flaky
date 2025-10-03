import type { Meta, StoryObj } from '@storybook/react';
import DetailsPanel from '../components/flakes/DetailsPanel';

const meta = {
  title: 'Flakes/DetailsPanel',
  component: DetailsPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSummaryContent = (
  <div>
    <h3 className="text-lg font-semibold mb-2">Test Summary</h3>
    <p>This test, <code>LoginFlowTest.test_successful_login</code>, has a flakiness score of <strong>7.2/10</strong>. It has failed 15 times in the last 30 days, primarily due to network latency and occasional UI element not found errors.</p>
    <p className="mt-2"><strong>Last Failed:</strong> 2023-10-27 14:35 UTC</p>
    <p><strong>Average Duration:</strong> 1250ms</p>
  </div>
);

const mockRootCausesContent = (
  <div>
    <h3 className="text-lg font-semibold mb-2">Identified Root Causes</h3>
    <ul className="list-disc list-inside space-y-1">
      <li><strong>Network Latency:</strong> 60% of failures. API calls occasionally time out.</li>
      <li><strong>Element Not Found:</strong> 30% of failures. UI elements sometimes load slowly or are not present in the DOM when the test expects them.</li>
      <li><strong>Race Condition:</strong> 10% of failures. Concurrent user sessions sometimes interfere.</li>
    </ul>
    <p className="mt-4 text-sm text-muted">Suggested action: Implement explicit waits and retries for UI interactions.</p>
  </div>
);

const mockLinkedIssuesContent = (
  <div>
    <h3 className="text-lg font-semibold mb-2">Linked Issues</h3>
    <ul className="list-disc list-inside space-y-1">
      <li><a href="#" className="text-primary hover:underline">GH-123: Investigate Login Flakiness</a> (Open)</li>
      <li><a href="#" className="text-primary hover:underline">JIRA-456: Implement Retry Logic for UI Tests</a> (In Progress)</li>
      <li><a href="#" className="text-primary hover:underline">GH-789: Optimize API Gateway Performance</a> (Closed)</li>
    </ul>
    <p className="mt-4 text-sm text-muted">Automatically linked from commit messages and error logs.</p>
  </div>
);

export const Default: Story = {
  args: {
    summaryContent: mockSummaryContent,
    rootCausesContent: mockRootCausesContent,
    linkedIssuesContent: mockLinkedIssuesContent,
  },
};

export const WithRootCausesActive: Story = {
  args: {
    summaryContent: mockSummaryContent,
    rootCausesContent: mockRootCausesContent,
    linkedIssuesContent: mockLinkedIssuesContent,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rootCausesTab = canvas.getByRole('tab', { name: 'Root Causes' });
    await userEvent.click(rootCausesTab);
  },
};