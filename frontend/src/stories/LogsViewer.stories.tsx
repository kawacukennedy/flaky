import type { Meta, StoryObj } from '@storybook/react';
import LogsViewer from '../components/flakes/LogsViewer';

const meta = {
  title: 'Flakes/LogsViewer',
  component: LogsViewer,
  parameters: {
    layout: 'fullscreen',
    a11y: { // Enable a11y checks for this component
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    logContent: { control: 'text' },
    language: { control: 'text' },
  },
} satisfies Meta<typeof LogsViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logContent: `
Error: Test failed: Login functionality
    at loginUser (./src/auth.ts:10:11)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.<anonymous> (./src/login.test.ts:5:3)
Caused by: Error: Network request failed
    at fetch (node_modules/node-fetch/lib/index.js:145:10)
    at callAPI (./src/api.ts:20:7)
    at loginUser (./src/auth.ts:8:5)
`,
    language: 'javascript',
  },
};

export const LongLog: Story = {
  args: {
    logContent: `
[2025-10-03T10:00:00.000Z] INFO: Starting application...
[2025-10-03T10:00:00.123Z] DEBUG: Loading configuration from config.json
[2025-10-03T10:00:00.456Z] INFO: Database connected successfully.
[2025-10-03T10:00:01.000Z] WARN: Deprecated API endpoint /old/api/v1 used by user 123
[2025-10-03T10:00:01.500Z] ERROR: Unhandled exception in request handler
    at processRequest (./src/server.ts:50:10)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at next (node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at /Users/user/project/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at expressInit (node_modules/express/lib/middleware/init.js:40:5)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at query (node_modules/express/lib/middleware/query.js:45:5)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at jsonParser (node_modules/body-parser/lib/types/json.js:119:7)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/node_modules/express/lib/router/index.js:275:10)
    at corsMiddleware (node_modules/cors/lib/index.js:188:7)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at router (node_modules/express/lib/router/index.js:275:10)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at urlencodedParser (node_modules/body-parser/lib/types/urlencoded.js:106:7)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at compression (node_modules/compression/index.js:208:5)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at serveStatic (node_modules/serve-static/index.js:75:16)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at finalhandler (node_modules/finalhandler/index.js:37:5)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (node_modules/express/lib/router/index.js:328:13)
    at /Users/user/project/node_modules/express/lib/router/index.js:286:7
    at Function.process_params (node_modules/express/lib/router/index.js:335:12)
    at next (node_modules/express/lib/router/index.js:275:10)
    at Function.handle (node_modules/express/lib/router/index.js:174:3)
    at EventEmitter.handle (node_modules/express/lib/application.js:174:3)
    at Server.app (node_modules/express/lib/express.js:49:9)
    at Server.emit (node:events:518:28)
    at parserOnIncoming (node:_http_server:990:12)
    at HTTPParser.onIncoming (node:_http_common:188:22)
`,
    language: 'javascript',
  },
};
