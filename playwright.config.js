// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * 赛车单词游戏 Playwright 测试配置
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* 并行运行测试 */
  fullyParallel: true,
  /* 失败时不要在 CI 上重试 */
  forbidOnly: !!process.env.CI,
  /* 在 CI 上重试失败的测试 */
  retries: process.env.CI ? 2 : 0,
  /* 选择报告器 */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  /* 共享设置 */
  use: {
    /* 测试失败时收集跟踪信息 */
    trace: 'on-first-retry',
    /* 截图设置 */
    screenshot: 'only-on-failure',
    /* 视频录制 */
    video: 'retain-on-failure',
    /* 超时设置 */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  /* 测试超时 */
  timeout: 60000,

  /* 配置不同浏览器的测试项目 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 移动端测试 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

});