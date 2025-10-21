import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Instant;

public class FlakeHunterAgent {
    private static final String API_URL = System.getenv().getOrDefault("FLAKEHUNTER_API_URL", "http://localhost:8000");
    private static final String PROJECT_ID = System.getenv("FLAKEHUNTER_PROJECT_ID");

    public static void sendTestResult(String testName, String status, double duration, String environment) {
        String json = String.format(
            "{\"test_name\":\"%s\",\"status\":\"%s\",\"duration\":%f,\"environment\":\"%s\",\"project_id\":\"%s\",\"timestamp\":\"%s\"}",
            testName, status, duration, environment, PROJECT_ID, Instant.now().toString()
        );

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(API_URL + "/plugins/tests"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                System.err.println("Failed to send test data: " + response.body());
            }
        } catch (Exception e) {
            System.err.println("Error sending test data: " + e.getMessage());
        }
    }
}