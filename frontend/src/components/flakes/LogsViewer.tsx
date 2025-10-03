import React, { useState } from 'react';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';

interface LogsViewerProps {
  logs?: string;
}

const LogsViewer: React.FC<LogsViewerProps> = ({ logs: initialLogs }) => {
  const defaultLogs = `
1: INFO: Test started: com.example.FlakyTest.testLogin
2: DEBUG: Initializing WebDriver for Chrome...
3: INFO: Navigating to login page: http://localhost:3000/login
4: DEBUG: Entering username 'testuser'
5: DEBUG: Entering password 'password123'
6: ERROR: Element not found: //*[@id="login-button"] - Retrying...
7: WARN: Retrying login attempt (1/3)
8: DEBUG: Entering username 'testuser'
9: DEBUG: Entering password 'password123'
10: ERROR: Element not found: //*[@id="login-button"] - Retrying...
11: WARN: Retrying login attempt (2/3)
12: DEBUG: Entering username 'testuser'
13: DEBUG: Entering password 'password123'
14: ERROR: Element not found: //*[@id="login-button"] - Max retries reached.
15: FATAL: Test failed: com.example.FlakyTest.testLogin - Login button not found after multiple attempts.
16: STACKTRACE: 
17:   at com.example.FlakyTest.testLogin(FlakyTest.java:45)
18:   at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
19:   at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
20:   at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
21:   at java.base/java.lang.reflect.Method.invoke(Method.java:566)
22:   at org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:725)
23:   at org.junit.jupiter.engine.execution.MethodInvocation.proceed(MethodInvocation.java:60)
24:   at org.junit.jupiter.engine.execution.InvocationInterceptorChain$ValidatingInvocationInterceptor.intercept(InvocationInterceptorChain.java:126)
25:   at org.junit.jupiter.engine.extension.TimeoutExtension.intercept(TimeoutExtension.java:149)
26:   at org.junit.jupiter.engine.extension.TimeoutExtension.intercept(TimeoutExtension.java:144)
27:   at org.junit.jupiter.engine.execution.ExecutableInvoker.lambda$invoke$0(ExecutableInvoker.java:117)
28:   at org.junit.jupiter.engine.execution.InvocationInterceptorChain$InterceptedInvocation.proceed(InvocationInterceptorChain.java:106)
29:   at org.junit.jupiter.engine.execution.InvocationInterceptorChain.proceed(InvocationInterceptorChain.java:64)
30:   at org.junit.jupiter.engine.execution.InvocationInterceptorChain.chainAndInvoke(InvocationInterceptorChain.java:45)
31:   at org.junit.jupiter.engine.execution.ExecutableInvoker.invoke(ExecutableInvoker.java:116)
32:   at org.junit.jupiter.engine.execution.ExecutableInvoker.invoke(ExecutableInvoker.java:110)
33:   at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.lambda$invokeTestMethod$7(TestMethodTestDescriptor.java:217)
34:   at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
35:   at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.invokeTestMethod(TestMethodTestDescriptor.java:213)
36:   at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:158)
37:   at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:79)
38:   at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$6(NodeTestTask.java:151)
39:   at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
40:   at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:141)
41:   at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:137)
42:   at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$9(NodeTestTask.java:139)
43:   at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
44:   at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:138)
45:   at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:95)
46:   at java.base/java.util.ArrayList.forEach(ArrayList.java:1541)
47:   at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestEngine.lambda$execute$1(SameThreadHierarchicalTestEngine.java:57)
48:   at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
49:   at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestEngine.execute(SameThreadHierarchicalTestEngine.java:51)
50:   at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:114)
51:   at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:86)
52:   at org.junit.platform.launcher.core.DefaultLauncherSession$DelegatingLauncher.execute(DefaultLauncherSession.java:269)
53:   at org.junit.platform.launcher.core.DefaultLauncherSession.execute(DefaultLauncherSession.java:246)
54:   at org.gradle.api.internal.tasks.testing.junitplatform.JUnitPlatformTestClassProcessor$CollectAllTestClassesExecutor.processAllTestClasses(JUnitPlatformTestClassProcessor.java:99)
55:   at org.gradle.api.internal.tasks.testing.junitplatform.JUnitPlatformTestClassProcessor$CollectAllTestClassesExecutor.access$000(JUnitPlatformTestClassProcessor.java:79)
56:   at org.gradle.api.internal.tasks.testing.junitplatform.JUnitPlatformTestClassProcessor.stop(JUnitPlatformTestClassProcessor.java:75)
57:   at org.gradle.api.internal.tasks.testing.worker.TestWorker$3.run(TestWorker.java:193)
58:   at org.gradle.api.internal.tasks.testing.worker.TestWorker.execute(TestWorker.java:129)
59:   at org.gradle.api.internal.tasks.testing.worker.TestWorker.executeFromRemote(TestWorker.java:72)
60:   at org.gradle.api.internal.tasks.testing.worker.TestWorker.main(TestWorker.java:56)
61: 
62: INFO: Test finished: com.example.FlakyTest.testLogin - FAILED
  `

  const [expandedStacktrace, setExpandedStacktrace] = useState(false);
  const logsArray = (initialLogs || defaultLogs).trim().split('\n');

  const stacktraceStartIndex = logsArray.findIndex(line => line.includes('STACKTRACE:'));
  const preStacktraceLogs = stacktraceStartIndex !== -1 ? logsArray.slice(0, stacktraceStartIndex) : logsArray;
  const stacktraceLogs = stacktraceStartIndex !== -1 ? logsArray.slice(stacktraceStartIndex) : [];

  const handleCopy = () => {
    navigator.clipboard.writeText(initialLogs || defaultLogs);
    // Optionally, add a toast notification here
  };

  const getLogLineClass = (line: string) => {
    if (line.includes('ERROR:') || line.includes('FATAL:')) return 'text-danger';
    if (line.includes('WARN:')) return 'text-warning';
    if (line.includes('INFO:')) return 'text-info';
    if (line.includes('DEBUG:')) return 'text-muted';
    return '';
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleCopy}
          className="flex items-center px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-primary_hover transition-colors duration-fast ease-standard"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Logs
        </button>
      </div>
      <div className="font-mono text-sm h-full overflow-y-auto bg-bg_dark text-text_dark p-4 rounded-md">
        {preStacktraceLogs.map((line, index) => (
          <div key={index} className={`${getLogLineClass(line)} whitespace-pre-wrap`}>
            <span className="text-muted mr-2">{String(index + 1).padStart(3, ' ')}</span>
            {line.substring(line.indexOf(':') + 1)}
          </div>
        ))}
        {stacktraceLogs.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setExpandedStacktrace(!expandedStacktrace)}
              className="flex items-center text-info hover:underline mb-2"
            >
              {expandedStacktrace ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
              {stacktraceStartIndex !== -1 ? logsArray[stacktraceStartIndex] : 'Stacktrace'}
            </button>
            {expandedStacktrace && (
              <div>
                {stacktraceLogs.slice(1).map((line, index) => (
                  <div key={`stack-${index}`} className="text-muted whitespace-pre-wrap">
                    <span className="text-muted mr-2">{String(stacktraceStartIndex + index + 2).padStart(3, ' ')}</span>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsViewer;