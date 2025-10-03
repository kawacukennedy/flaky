// Purpose: Send Java JUnit results to backend

// This would typically be a Java Agent or a custom JUnit Runner/Listener.
// For simplicity, this is a placeholder class.

package plugins.junit;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

public class FlakeHunterAgent {

    private static final String FLAKYHUNTER_API_URL = System.getenv().getOrDefault("FLAKYHUNTER_API_URL", "http://localhost:8000");
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    public static void sendTestResult(String testName, String status, long duration, String stackTrace) {
        Map<Object, Object> data = new HashMap<>();
        data.put("test_name", testName);
        data.put("status", status);
        data.put("duration", duration);
        data.put("stack_trace", stackTrace);
        data.put("env", Map.of("java_version", System.getProperty("java.version"), "os", System.getProperty("os.name")));

        String json = new org.json.JSONObject(data).toString();

        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .uri(URI.create(FLAKYHUNTER_API_URL + "/tests"))
                .setHeader("User-Agent", "Java FlakeHunter Agent")
                .header("Content-Type", "application/json")
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("[FlakyHunter] Sent test result for " + testName + ". Status: " + response.statusCode());
        } catch (IOException | InterruptedException e) {
            System.err.println("[FlakyHunter] Error sending test result for " + testName + ": " + e.getMessage());
        }
    }

    // Example usage (would be integrated into a test listener/runner)
    public static void main(String[] args) {
        sendTestResult("com.example.MyTest.testSomething", "pass", 120, null);
        sendTestResult("com.example.MyTest.testFlakyFeature", "fail", 350, "java.lang.AssertionError: Expected true but was false");
    }
}