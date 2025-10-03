import type { Meta, StoryObj } from '@storybook/react';
import LogsViewer from '../components/flakes/LogsViewer';

const meta = {
  title: 'Flakes/LogsViewer',
  component: LogsViewer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogsViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

const longPythonLogs = `
INFO:root:Starting data processing...
DEBUG:root:Loading configuration from config.yaml
WARNING:root:Cache directory not found, creating one at /tmp/cache
ERROR:root:Failed to connect to database 'flaky_db'
Traceback (most recent call last):
  File "/app/processor.py", line 23, in connect_db
    conn = psycopg2.connect(database=db_name, user=db_user, password=db_pass)
  File "/usr/local/lib/python3.9/site-packages/psycopg2/__init__.py", line 127, in connect
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
psycopg2.OperationalError: connection to server at "localhost" (127.0.0.1), port 5432 failed: Connection refused
    Is the server running on that host and accepting TCP/IP connections?

INFO:root:Processing batch 1 of 10
DEBUG:root:Item 1 processed successfully.
... (many more lines) ...
INFO:root:Processing complete.
`;

const javascriptErrorLogs = `
[2023-10-27T10:00:00.000Z] INFO: User 'john.doe' logged in.
[2023-10-27T10:00:05.000Z] WARN: Deprecated API endpoint '/api/v1/old-feature' accessed.
[2023-10-27T10:00:10.000Z] ERROR: Uncaught TypeError: Cannot read properties of undefined (reading 'id')
    at renderUserComponent (http://localhost:3000/static/js/main.chunk.js:123:45)
    at processQueue (http://localhost:3000/static/js/bundle.js:4567:23)
    at HTMLButtonElement.dispatch (http://localhost:3000/static/js/bundle.js:345:12)
    at HTMLButtonElement.elemData.handle (http://localhost:3000/static/js/bundle.js:321:12)
[2023-10-27T10:00:11.000Z] INFO: Application state updated.
`;

export const Default = {
  args: {
    logs: simpleLogs,
    language: 'text',
  },
};

export const WithPythonStacktrace = {
  args: {
    logs: longPythonLogs,
    language: 'python',
  },
};

export const WithJavascriptStacktrace = {
  args: {
    logs: javascriptErrorLogs,
    language: 'javascript',
  },
};

export const LongLogsNoStacktrace = {
  args: {
    logs: Array(50).fill('This is a log line without any stacktrace information.').join('\n'),
    language: 'text',
  },
};