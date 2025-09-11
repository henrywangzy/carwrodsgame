// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

/**
 * 专门用于截图的快速测试套件
 */

const GAME_FILE_PATH = path.resolve(__dirname, '..', '赛车单词游戏.html');
const GAME_URL = `file:///${GAME_FILE_PATH.replace(/\\/g, '/')}`;

test.describe('赛车单词游戏 - 截图收集', () => {

  test('收集所有页面截图', async ({ page }) => {
    console.log('开始截图收集...');
    
    if (!fs.existsSync(GAME_FILE_PATH)) {
      test.skip(true, '游戏文件不存在');
    }

    await page.goto(GAME_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // 等待动画完成

    // 1. 首页截图
    console.log('捕获首页截图...');
    await page.screenshot({
      path: 'test-results/screenshots/01-homepage.png',
      fullPage: true
    });

    // 2. 检查是否能找到并点击开始按钮
    const startButtonSelectors = [
      '#startGameBtn',
      '.start-game-btn',
      'button:has-text("开始游戏")',
      'button:has-text("开始")',
      '.btn:has-text("开始")'
    ];

    let gameStarted = false;
    for (const selector of startButtonSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0) {
        console.log(`找到开始按钮: ${selector}`);
        await button.click();
        await page.waitForTimeout(3000);
        gameStarted = true;
        break;
      }
    }

    // 3. 游戏界面截图
    if (gameStarted) {
      console.log('捕获游戏界面截图...');
      await page.screenshot({
        path: 'test-results/screenshots/02-game-in-progress.png',
        fullPage: true
      });
    }

    // 4. 尝试查找并访问词汇页面
    const vocabSelectors = [
      '#vocabBtn',
      '.vocab-btn',
      'button:has-text("词汇")',
      'button:has-text("单词")',
      'a[href*="vocab"]',
      '.vocabulary-btn'
    ];

    for (const selector of vocabSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0) {
        console.log(`找到词汇按钮: ${selector}`);
        await button.click();
        await page.waitForTimeout(2000);
        
        await page.screenshot({
          path: 'test-results/screenshots/03-vocabulary-page.png',
          fullPage: true
        });
        break;
      }
    }

    // 5. 尝试查找并访问单词浏览页面
    const browseSelectors = [
      '#browseBtn',
      '.browse-btn',
      'button:has-text("浏览")',
      'button:has-text("学习")',
      '.word-browse-btn'
    ];

    for (const selector of browseSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0) {
        console.log(`找到浏览按钮: ${selector}`);
        await button.click();
        await page.waitForTimeout(2000);
        
        await page.screenshot({
          path: 'test-results/screenshots/04-word-browse-page.png',
          fullPage: true
        });
        break;
      }
    }

    // 6. 移动端截图
    console.log('捕获移动端视图...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/screenshots/05-mobile-view.png',
      fullPage: true
    });

    // 7. 平板截图
    console.log('捕获平板视图...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/screenshots/06-tablet-view.png',
      fullPage: true
    });

    console.log('所有截图收集完成！');
  });

});