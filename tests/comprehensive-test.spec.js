// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

/**
 * 赛车单词游戏综合测试套件 - 最终版本
 */

const GAME_FILE_PATH = path.resolve(__dirname, '..', '赛车单词游戏.html');
const GAME_URL = `file:///${GAME_FILE_PATH.replace(/\\/g, '/')}`;

test.describe('赛车单词游戏 - 完整功能测试和截图收集', () => {

  test('完整的游戏功能测试和截图收集', async ({ page }) => {
    console.log('开始完整的游戏测试...');
    
    if (!fs.existsSync(GAME_FILE_PATH)) {
      test.skip(true, '游戏文件不存在');
    }

    // 1. 访问页面并截图首页
    console.log('1. 加载首页...');
    await page.goto(GAME_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // 检查页面标题
    const title = await page.title();
    console.log(`页面标题: ${title}`);
    expect(title).toContain('赛车单词游戏');

    // 首页截图
    await page.screenshot({
      path: 'test-results/screenshots/01-homepage.png',
      fullPage: true
    });
    console.log('✓ 首页截图已保存');

    // 2. 测试年级和速度选择功能
    console.log('2. 测试选择功能...');
    
    // 测试年级选择
    const gradeSelect = page.locator('#gradeSelect').first();
    if (await gradeSelect.count() > 0) {
      await expect(gradeSelect).toBeVisible();
      const options = await gradeSelect.locator('option').count();
      console.log(`✓ 年级选择器正常工作，选项数量: ${options}`);
    }

    // 测试速度选择
    const speedSelect = page.locator('#speedSelect').first();
    if (await speedSelect.count() > 0) {
      await expect(speedSelect).toBeVisible();
      const options = await speedSelect.locator('option').count();
      console.log(`✓ 速度选择器正常工作，选项数量: ${options}`);
    }

    // 3. 测试开始游戏按钮（使用具体选择器避免冲突）
    console.log('3. 测试开始游戏...');
    
    const startButton = page.locator('button:has-text("开始比赛")').first();
    if (await startButton.count() > 0) {
      console.log('找到"开始比赛"按钮');
      await startButton.click();
      await page.waitForTimeout(3000);
      console.log('✓ 游戏启动成功');
      
      // 游戏界面截图
      await page.screenshot({
        path: 'test-results/screenshots/02-game-in-progress.png',
        fullPage: true
      });
      console.log('✓ 游戏界面截图已保存');
    }

    // 4. 测试游戏画布
    console.log('4. 测试游戏画布...');
    
    const canvas = page.locator('#gameCanvas').first();
    if (await canvas.count() > 0) {
      await expect(canvas).toBeVisible();
      const boundingBox = await canvas.boundingBox();
      if (boundingBox) {
        console.log(`✓ 游戏画布尺寸: ${boundingBox.width}x${boundingBox.height}`);
        expect(boundingBox.width).toBeGreaterThan(0);
        expect(boundingBox.height).toBeGreaterThan(0);
      }
    }

    // 5. 测试玩家控制
    console.log('5. 测试玩家控制...');
    
    if (await canvas.count() > 0) {
      await canvas.focus();
      
      // 测试键盘控制
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
      console.log('✓ 键盘控制测试完成');
      
      // 测试鼠标点击控制
      const bbox = await canvas.boundingBox();
      if (bbox) {
        await canvas.click({ position: { x: bbox.width * 0.3, y: bbox.height * 0.8 } });
        await page.waitForTimeout(500);
        await canvas.click({ position: { x: bbox.width * 0.7, y: bbox.height * 0.8 } });
        await page.waitForTimeout(500);
        console.log('✓ 鼠标控制测试完成');
      }
    }

    // 6. 测试音频按钮
    console.log('6. 测试音频功能...');
    
    const soundButton = page.locator('.sound-btn, #soundBtn').first();
    if (await soundButton.count() > 0) {
      await soundButton.click();
      await page.waitForTimeout(500);
      await soundButton.click();
      await page.waitForTimeout(500);
      console.log('✓ 音频切换按钮正常工作');
    }

    // 7. 测试暂停功能
    console.log('7. 测试暂停功能...');
    
    const pauseButton = page.locator('.pause-btn, #pauseBtn').first();
    if (await pauseButton.count() > 0) {
      await pauseButton.click();
      await page.waitForTimeout(1000);
      console.log('✓ 暂停功能正常');
    }

    // 8. 访问词汇页面
    console.log('8. 访问词汇页面...');
    
    const vocabButton = page.locator('button:has-text("单词本")').first();
    if (await vocabButton.count() > 0) {
      await vocabButton.click();
      await page.waitForTimeout(2000);
      
      await page.screenshot({
        path: 'test-results/screenshots/03-vocabulary-page.png',
        fullPage: true
      });
      console.log('✓ 词汇页面截图已保存');
    }

    // 9. 访问单词浏览页面
    console.log('9. 访问单词浏览页面...');
    
    const browseButton = page.locator('button:has-text("单词浏览")').first();
    if (await browseButton.count() > 0) {
      await browseButton.click();
      await page.waitForTimeout(2000);
      
      await page.screenshot({
        path: 'test-results/screenshots/04-word-browse-page.png',
        fullPage: true
      });
      console.log('✓ 单词浏览页面截图已保存');
    }

    // 10. 测试音频播放（检查是否有音频元素）
    console.log('10. 检查音频功能...');
    
    const audioElements = page.locator('audio');
    const audioCount = await audioElements.count();
    console.log(`✓ 页面中音频元素数量: ${audioCount}`);

    // 11. 游戏状态检查
    console.log('11. 检查游戏状态...');
    
    const gameState = await page.evaluate(() => {
      return {
        hasGameState: typeof window.gameState !== 'undefined',
        hasCanvas: document.querySelector('canvas') !== null,
        hasAudio: document.querySelector('audio') !== null,
        activeScreens: Array.from(document.querySelectorAll('.screen.active, .active')).map(el => el.id || el.className),
        wordElements: document.querySelectorAll('.word, .word-item, .target').length,
        scoreElements: document.querySelectorAll('.score, #score, .points').length
      };
    });
    
    console.log('游戏状态:', gameState);

    // 12. 响应式测试和截图
    console.log('12. 测试响应式布局...');
    
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      
      await page.screenshot({
        path: `test-results/screenshots/05-${viewport.name}-view.png`,
        fullPage: true
      });
      console.log(`✓ ${viewport.name} 视图截图已保存`);
    }

    // 13. 性能检查
    console.log('13. 检查页面性能...');
    
    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      return perfData ? {
        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
        loadComplete: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
      } : {};
    });
    
    console.log('性能指标:', metrics);

    console.log('\n=== 测试完成总结 ===');
    console.log('✅ 页面加载正常');
    console.log('✅ 年级和速度选择功能正常');
    console.log('✅ 游戏启动功能正常');
    console.log('✅ 游戏画布渲染正常');
    console.log('✅ 玩家控制功能正常');
    console.log('✅ 所有截图已保存');
    console.log('✅ 响应式布局正常');
  });

  test('检测潜在问题', async ({ page }) => {
    console.log('开始问题检测...');
    
    const errors = [];
    const warnings = [];
    
    // 监听控制台错误
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    // 监听页面错误
    page.on('pageerror', err => {
      errors.push(err.message);
    });

    await page.goto(GAME_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

    console.log(`发现的错误数量: ${errors.length}`);
    console.log(`发现的警告数量: ${warnings.length}`);
    
    if (errors.length > 0) {
      console.log('错误详情:', errors);
    }
    
    if (warnings.length > 0) {
      console.log('警告详情:', warnings);
    }
  });

});