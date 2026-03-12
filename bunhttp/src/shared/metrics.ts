export class MetricsCollector {
  private requestCount: number = 0;
  private responseTimes: number[] = [];
  private startTime: number = Date.now();

  recordRequest(durationMs: number): void {
    this.requestCount++;
    this.responseTimes.push(durationMs);
  }

  getMetrics(): {
    request_count: number;
    avg_response_time: number;
    total_response_time: number;
    requests_per_second: number;
    min_response_time: number;
    max_response_time: number;
  } {
    const avgResponseTime = this.responseTimes.length > 0
      ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
      : 0;
    
    const uptimeSeconds = (Date.now() - this.startTime) / 1000;
    const requestsPerSecond = uptimeSeconds > 0 ? this.requestCount / uptimeSeconds : 0;

    return {
      request_count: this.requestCount,
      avg_response_time: Math.round(avgResponseTime * 100) / 100,
      total_response_time: Math.round(this.responseTimes.reduce((a, b) => a + b, 0) * 100) / 100,
      requests_per_second: Math.round(requestsPerSecond * 100) / 100,
      min_response_time: this.responseTimes.length > 0 ? Math.min(...this.responseTimes) : 0,
      max_response_time: this.responseTimes.length > 0 ? Math.max(...this.responseTimes) : 0,
    };
  }

  reset(): void {
    this.requestCount = 0;
    this.responseTimes = [];
    this.startTime = Date.now();
  }
}

export const metrics = new MetricsCollector();
