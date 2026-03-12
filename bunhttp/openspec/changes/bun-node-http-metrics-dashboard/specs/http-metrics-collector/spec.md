## ADDED Requirements

### Requirement: Metrics collector tracks request count
The metrics collector SHALL track the total number of requests processed.

#### Scenario: Increment on request
- **WHEN** a request is processed
- **THEN** request_count MUST be incremented by 1

#### Scenario: Reset metrics
- **WHEN** reset() method is called
- **THEN** all metrics SHALL be reset to initial values

### Requirement: Metrics collector tracks response times
The metrics collector SHALL track response time statistics.

#### Scenario: Record response time
- **WHEN** a request completes with duration
- **THEN** response time SHALL be added to the timing collection

#### Scenario: Calculate average response time
- **WHEN** getMetrics() is called
- **THEN** avg_response_time MUST be calculated from collected samples

### Requirement: Metrics collector provides JSON output
The metrics collector SHALL provide metrics in JSON format.

#### Scenario: Get metrics returns JSON
- **WHEN** getMetrics() is called
- **THEN** response MUST be valid JSON with keys: request_count, avg_response_time, total_response_time

#### Scenario: Metrics include throughput
- **WHEN** getMetrics() is called
- **THEN** metrics MUST include requests_per_second calculated from uptime
