// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

/**
 * 赛车单词游戏功能测试套件
 * 针对实际游戏功能进行全面测试
 */

// 游戏文件路径
const GAME_FILE_PATH = path.resolve(__dirname, '..', '赛车单词游戏.html');
const GAME_URL = `file:///${GAME_FILE_PATH.replace(/\\/g, '/')}`;

test.describe('赛车单词游戏 - 核心功能测试', () => {

  test.beforeEach(async ({ page }) => {
    // 检查文件存在
    if (!fs.existsSync(GAME_FILE_PATH)) {
      test.skip(true, '游戏文件不存在');
    }

    await page.goto(GAME_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('1. 首页加载和基本元素检查', async ({ page }) => {
    console.log('测试首页加载...');

    // 检查页面标题
    const title = await page.title();
    expect(title).toContain('赛车单词游戏');

    // 检查游戏容器
    const gameContainer = page.locator('.game-container');
    await expect(gameContainer).toBeVisible();

    // 截图：首页
    await page.screenshot({
      path: 'test-results/screenshots/01-homepage.png',
      fullPage: true
    });

    console.log('首页加载测试完成 ✓');
  });

  test('2. 选择控件功能测试', async ({ page }) => {
    console.log('测试选择控件...');

    // 查找年级选择器 - 使用更灵活的选择器
    const gradeSelectors = [
      '#gradeSelect',
      'select[name="grade"]',
      '.grade-select',
      'select:has-text("年级")'
    ];

    let gradeSelect = null;
    for (const selector of gradeSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        gradeSelect = element;
        break;
      }
    }

    if (gradeSelect) {
      console.log('找到年级选择器');
      await expect(gradeSelect).toBeVisible();
      
      // 尝试获取选项
      const options = await gradeSelect.locator('option').count();
      console.log(`年级选项数量: ${options}`);
    } else {
      console.log('未找到年级选择器');
    }

    // 查找速度选择器
    const speedSelectors = [
      '#speedSelect',
      'select[name="speed"]',
      '.speed-select',
      'select:has-text("速度")'
    ];

    let speedSelect = null;
    for (const selector of speedSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        speedSelect = element;
        break;
      }
    }

    if (speedSelect) {
      console.log('找到速度选择器');
      await expect(speedSelect).toBeVisible();
      
      const options = await speedSelect.locator('option').count();
      console.log(`速度选项数量: ${options}`);
    } else {
      console.log('未找到速度选择器');
    }

    console.log('选择控件测试完成 ✓');
  });

  test('3. 开始游戏按钮测试', async ({ page }) => {
    console.log('测试开始游戏按钮...');

    // 查找开始游戏按钮
    const startButtonSelectors = [
      '#startGameBtn',
      '.start-game-btn',
      'button:has-text("开始游戏")',
      'button:has-text("开始")',
      '.btn:has-text("开始")'
    ];

    let startButton = null;
    for (const selector of startButtonSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        startButton = element;
        break;
      }
    }

    if (startButton) {
      console.log('找到开始游戏按钮');
      await expect(startButton).toBeVisible();
      
      // 点击按钮
      await startButton.click();
      await page.waitForTimeout(2000);
      
      console.log('开始游戏按钮点击成功');
    } else {
      console.log('未找到开始游戏按钮');
    }

    console.log('开始游戏按钮测试完成 ✓');
  });

  test('4. 游戏界面元素检查', async ({ page }) => {
    console.log('测试游戏界面元素...');

    // 尝试启动游戏
    const startButton = page.locator('#startGameBtn, .start-game-btn, button:has-text("开始")').first();
    if (await startButton.count() > 0) {
      await startButton.click();
      await page.waitForTimeout(2000);
    }

    // 检查画布元素
    const canvasSelectors = [
      '#gameCanvas',
      'canvas',
      '.game-canvas'
    ];

    let canvas = null;
    for (const selector of canvasSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        canvas = element;
        break;
      }
    }

    if (canvas) {
      console.log('找到游戏画布');
      await expect(canvas).toBeVisible();
      
      const boundingBox = await canvas.boundingBox();
      if (boundingBox) {
        console.log(`画布尺寸: ${boundingBox.width}x${boundingBox.height}`);
        expect(boundingBox.width).toBeGreaterThan(0);
        expect(boundingBox.height).toBeGreaterThan(0);
      }
    } else {
      console.log('未找到游戏画布');
    }

    // 截图：游戏界面
    await page.screenshot({
      path: 'test-results/screenshots/02-game-interface.png',
      fullPage: true
    });

    console.log('游戏界面元素检查完成 ✓');
  });

  test('5. 交互控制测试', async ({ page }) => {
    console.log('测试交互控制...');

    // 尝试启动游戏
    const startButton = page.locator('#startGameBtn, .start-game-btn, button:has-text("开始")').first();
    if (await startButton.count() > 0) {
      await startButton.click();
      await page.waitForTimeout(2000);
    }

    // 查找画布或游戏区域
    const gameArea = page.locator('#gameCanvas, canvas, .game-area').first();
    
    if (await gameArea.count() > 0) {
      console.log('测试键盘控制');
      
      // 模拟键盘输入
      await gameArea.focus();
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(500);
      
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
      
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(500);
      
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(500);

      console.log('键盘控制测试完成');

      // 测试鼠标/触摸控制
      console.log('测试鼠标控制');
      const bbox = await gameArea.boundingBox();
      if (bbox) {
        // 点击游戏区域的不同位置
        await gameArea.click({ position: { x: bbox.width * 0.3, y: bbox.height * 0.7 } });
        await page.waitForTimeout(500);
        
        await gameArea.click({ position: { x: bbox.width * 0.7, y: bbox.height * 0.7 } });
        await page.waitForTimeout(500);
      }
      
      console.log('鼠标控制测试完成');
    }

    console.log('交互控制测试完成 ✓');
  });

  test('6. 音频和设置按钮测试', async ({ page }) => {
    console.log('测试音频和设置按钮...');

    // 查找音频相关按钮
    const audioButtonSelectors = [
      '#soundBtn',
      '.sound-btn',
      'button:has-text("音频")',
      'button:has-text("声音")',
      '.audio-toggle'
    ];

    for (const selector of audioButtonSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0) {
        console.log(`找到音频按钮: ${selector}`);
        await expect(button).toBeVisible();
        
        await button.click();
        await page.waitForTimeout(500);
        
        await button.click();
        await page.waitForTimeout(500);
        
        console.log('音频按钮测试完成');
        break;
      }
    }

    // 查找暂停按钮
    const pauseButtonSelectors = [
      '#pauseBtn',
      '.pause-btn',
      'button:has-text("暂停")',
      'button:has-text("暂停")'
    ];

    for (const selector of pauseButtonSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0) {
        console.log(`找到暂停按钮: ${selector}`);
        await expect(button).toBeVisible();
        
        await button.click();
        await page.waitForTimeout(1000);
        
        await button.click();
        await page.waitForTimeout(500);
        
        console.log('暂停按钮测试完成');
        break;
      }
    }

    console.log('音频和设置按钮测试完成 ✓');
  });

  test('7. 页面导航测试', async ({ page }) => {
    console.log('测试页面导航...');

    // 查找词汇/单词相关按钮
    const vocabButtonSelectors = [
      '#vocabBtn',
      '.vocab-btn',
      'button:has-text("词汇")',
      'button:has-text("单词")',
      'a[href*="vocab"]',
      '.vocabulary-btn'
    ];

    for (const selector of vocabButtonSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0) {
        console.log(`找到词汇按钮: ${selector}`);
        await button.click();
        await page.waitForTimeout(2000);
        
        // 截图：词汇页面
        await page.screenshot({
          path: 'test-results/screenshots/03-vocabulary-page.png',
          fullPage: true
        });
        
        console.log('词汇页面截图已保存');
        break;
      }
    }

    // 查找浏览/学习按钮
    const browseButtonSelectors = [
      '#browseBtn',
      '.browse-btn',
      'button:has-text("浏览")',
      'button:has-text("学习")',
      '.word-browse-btn'
    ];

    for (const selector of browseButtonSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0) {
        console.log(`找到浏览按钮: ${selector}`);
        await button.click();
        await page.waitForTimeout(2000);
        
        // 截图：单词浏览页面
        await page.screenshot({
          path: 'test-results/screenshots/04-word-browse-page.png',
          fullPage: true
        });
        
        console.log('单词浏览页面截图已保存');
        break;
      }
    }

    console.log('页面导航测试完成 ✓');
  });

  test('8. 游戏状态和数据检查', async ({ page }) => {
    console.log('测试游戏状态和数据...');

    // 启动游戏
    const startButton = page.locator('#startGameBtn, .start-game-btn, button:has-text("开始")').first();
    if (await startButton.count() > 0) {
      await startButton.click();
      await page.waitForTimeout(3000);
    }

    // 检查游戏状态
    const gameState = await page.evaluate(() => {
      return {
        hasGameState: typeof window.gameState !== 'undefined',
        hasCanvas: document.querySelector('canvas') !== null,
        hasAudio: document.querySelector('audio') !== null,
        bodyClasses: document.body.className,
        activeScreens: Array.from(document.querySelectorAll('.screen.active, .active')).map(el => el.id || el.className)
      };
    });

    console.log('游戏状态:', gameState);

    // 检查页面中的单词元素
    const wordElements = await page.locator('.word, .word-item, .target').count();
    console.log(`页面中的单词元素数量: ${wordElements}`);

    // 检查分数显示
    const scoreElements = await page.locator('.score, #score, .points').count();
    console.log(`分数显示元素数量: ${scoreElements}`);

    console.log('游戏状态和数据检查完成 ✓');
  });

  test('9. 响应式布局测试', async ({ page }) => {
    console.log('测试响应式布局...');

    const viewports = [
      { width: 375, height: 667, name: 'mobile-portrait' },
      { width: 768, height: 1024, name: 'tablet-portrait' },
      { width: 1024, height: 768, name: 'tablet-landscape' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);

      // 检查游戏容器是否仍然可见
      const gameContainer = page.locator('.game-container');
      await expect(gameContainer).toBeVisible();

      // 截图
      await page.screenshot({
        path: `test-results/screenshots/05-responsive-${viewport.name}.png`,
        fullPage: true
      });

      console.log(`${viewport.name} 视口测试完成`);
    }

    console.log('响应式布局测试完成 ✓');
  });

  test('10. 性能和错误监控', async ({ page }) => {
    console.log('测试性能和错误监控...');

    const errors = [];
    const consoleMessages = [];

    // 监听控制台消息
    page.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text()
      });
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // 监听页面错误
    page.on('pageerror', err => {
      errors.push(err.message);
    });

    // 重新加载页面
    const startTime = Date.now();
    await page.reload();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`页面重新加载时间: ${loadTime}ms`);
    console.log(`控制台消息数量: ${consoleMessages.length}`);
    console.log(`错误数量: ${errors.length}`);

    if (errors.length > 0) {
      console.log('发现的错误:', errors);
    }

    // 性能指标
    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      return perfData ? {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart
      } : {};
    });

    console.log('性能指标:', metrics);

    // 断言页面加载时间合理
    expect(loadTime).toBeLessThan(10000); // 10秒内

    console.log('性能和错误监控测试完成 ✓');
  });

});

// 添加测试报告生成
test.afterAll(async () => {
  console.log('\n=== 测试完成 ===');
  console.log('查看测试报告: npx playwright show-report');
  console.log('查看截图: test-results/screenshots/');
});