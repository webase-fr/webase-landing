import { defineConfig } from "@playwright/test";
import path from "node:path";
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.join(process.cwd(), ".cache/playwright");
const baseURL = process.env.E2E_BASE_URL || "http://127.0.0.1:3000";
export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: ".cache/test-results",
  timeout: 30000,
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "chromium", use: { browserName: "chromium" } },
  ],
  reporter: [["list"], ["json", { outputFile: ".cache/e2e-report.json" }]],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: process.env.CI
          ? "pnpm start --hostname 127.0.0.1 --port 3000"
          : "pnpm dev --hostname 127.0.0.1 --port 3000",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
});
