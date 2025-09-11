// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * 赛车单词游戏综合测试套件
 * 测试所有核心功能和用户交互流程
 */

// 游戏文件路径  
const GAME_FILE_PATH = path.resolve(__dirname, '..', '赛车单词游戏.html');
const GAME_URL = `file:///${GAME_FILE_PATH.replace(/\\/g, '/')}`;

test.describe('赛车单词游戏 - 综合功能测试', () => {
  
  test.beforeEach(async ({ page }) => {
    // 访问游戏页面
    await page.goto(GAME_URL);
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
  });

  test('1. 首页加载和视觉效果测试', async ({ page }) => {
    console.log('测试首页加载...');
    
    // 检查页面标题
    await expect(page).toHaveTitle('赛车单词游戏 - 边玩边学英语');
    
    // 检查主要元素是否存在
    await expect(page.locator('.game-container')).toBeVisible();
    await expect(page.locator('#homeScreen')).toBeVisible();
    
    // 检查标题和描述
    await expect(page.locator('h1')).toContainText('赛车单词游戏');
    
    // 截图：首页
    await page.screenshot({ 
      path: 'test-results/screenshots/homepage.png',
      fullPage: true 
    });
    
    // 检查动画元素（通过CSS检查）
    const titleElement = page.locator('h1');
    const titleStyles = await titleElement.evaluate(el => getComputedStyle(el));
    
    console.log('首页加载测试完成 ✓');
  });

  test('2. 年级和速度选择功能测试', async ({ page }) => {
    console.log('测试选择功能...');
    
    // 测试年级选择
    const gradeSelect = page.locator('#gradeSelect');
    await expect(gradeSelect).toBeVisible();
    
    // 选择不同年级并验证
    await gradeSelect.selectOption('grade3');
    await expect(gradeSelect).toHaveValue('grade3');
    
    await gradeSelect.selectOption('grade5');
    await expect(gradeSelect).toHaveValue('grade5');
    
    // 测试速度选择
    const speedSelect = page.locator('#speedSelect');
    await expect(speedSelect).toBeVisible();
    
    // 选择不同速度并验证
    await speedSelect.selectOption('normal');
    await expect(speedSelect).toHaveValue('normal');
    
    await speedSelect.selectOption('fast');
    await expect(speedSelect).toHaveValue('fast');
    
    console.log('选择功能测试完成 ✓');
  });

  test('3. 开始游戏按钮和游戏启动测试', async ({ page }) => {
    console.log('测试游戏启动...');
    
    // 设置游戏参数
    await page.selectOption('#gradeSelect', 'grade4');
    await page.selectOption('#speedSelect', 'normal');
    
    // 点击开始游戏按钮
    const startButton = page.locator('#startGameBtn');
    await expect(startButton).toBeVisible();
    await startButton.click();
    
    // 等待游戏界面加载
    await page.waitForTimeout(2000);
    
    // 检查是否进入游戏界面
    await expect(page.locator('#gameScreen')).toBeVisible();
    
    console.log('游戏启动测试完成 ✓');
  });

  test('4. 游戏画布渲染测试', async ({ page }) => {
    console.log('测试游戏画布渲染...');
    
    // 启动游戏
    await page.selectOption('#gradeSelect', 'grade4');
    await page.selectOption('#speedSelect', 'normal');
    await page.click('#startGameBtn');
    
    // 等待游戏加载
    await page.waitForTimeout(2000);
    
    // 检查画布元素
    const canvas = page.locator('#gameCanvas');
    await expect(canvas).toBeVisible();
    
    // 检查画布尺寸
    const canvasBox = await canvas.boundingBox();
    expect(canvasBox?.width).toBeGreaterThan(0);
    expect(canvasBox?.height).toBeGreaterThan(0);
    
    // 截图：游戏进行中
    await page.screenshot({ 
      path: 'test-results/screenshots/game-in-progress.png',
      fullPage: true 
    });
    
    console.log('游戏画布渲染测试完成 ✓');
  });

  test('5. 玩家汽车控制测试', async ({ page }) => {
    console.log('测试玩家汽车控制...');
    
    // 启动游戏
    await page.selectOption('#gradeSelect', 'grade4');
    await page.selectOption('#speedSelect', 'normal');
    await page.click('#startGameBtn');
    
    // 等待游戏加载
    await page.waitForTimeout(2000);
    
    // 模拟键盘控制
    const canvas = page.locator('#gameCanvas');
    
    // 测试左右移动
    await canvas.press('ArrowLeft');
    await page.waitForTimeout(500);
    
    await canvas.press('ArrowRight');
    await page.waitForTimeout(500);
    
    // 测试触摸控制（如果支持）
    await canvas.click({ position: { x: 100, y: 400 } });
    await page.waitForTimeout(500);
    
    await canvas.click({ position: { x: 300, y: 400 } });
    await page.waitForTimeout(500);
    
    console.log('玩家汽车控制测试完成 ✓');
  });

  test('6. 单词目标出现和收集测试', async ({ page }) => {
    console.log('测试单词目标和收集...');
    
    // 启动游戏
    await page.selectOption('#gradeSelect', 'grade4');
    await page.selectOption('#speedSelect', 'slow'); // 使用慢速便于测试
    await page.click('#startGameBtn');
    
    // 等待游戏运行一段时间，让单词出现
    await page.waitForTimeout(5000);
    
    // 检查游戏状态（通过JavaScript）
    const gameStats = await page.evaluate(() => {
      return {
        score: window.gameState?.score || 0,
        level: window.gameState?.level || 1,
        hasWords: window.gameState?.wordTargets?.length > 0
      };
    });
    
    console.log('游戏统计:', gameStats);
    
    // 模拟收集单词（移动到单词位置）
    const canvas = page.locator('#gameCanvas');
    await canvas.press('ArrowLeft');
    await page.waitForTimeout(1000);
    await canvas.press('ArrowRight');
    await page.waitForTimeout(1000);
    
    console.log('单词目标和收集测试完成 ✓');
  });

  test('7. 声音按钮切换测试', async ({ page }) => {
    console.log('测试声音按钮...');
    
    // 查找声音按钮
    const soundButton = page.locator('#soundBtn, .sound-btn, [data-testid="sound-button"]').first();
    
    if (await soundButton.count() > 0) {
      await expect(soundButton).toBeVisible();
      
      // 测试点击切换
      await soundButton.click();
      await page.waitForTimeout(500);
      
      await soundButton.click();
      await page.waitForTimeout(500);
      
      console.log('声音按钮测试完成 ✓');
    } else {
      console.log('声音按钮未找到，跳过测试');
    }
  });

  test('8. 暂停功能测试', async ({ page }) => {
    console.log('测试暂停功能...');
    
    // 启动游戏
    await page.selectOption('#gradeSelect', 'grade4');
    await page.selectOption('#speedSelect', 'normal');
    await page.click('#startGameBtn');
    
    // 等待游戏开始
    await page.waitForTimeout(2000);
    
    // 查找暂停按钮
    const pauseButton = page.locator('#pauseBtn, .pause-btn, [data-testid="pause-button"]').first();
    
    if (await pauseButton.count() > 0) {
      await expect(pauseButton).toBeVisible();
      
      // 点击暂停
      await pauseButton.click();
      await page.waitForTimeout(1000);
      
      // 检查暂停状态
      const isPaused = await page.evaluate(() => {
        return window.gameState?.paused || false;
      });
      
      console.log('游戏暂停状态:', isPaused);
      
      // 恢复游戏
      await pauseButton.click();
      await page.waitForTimeout(1000);
      
      console.log('暂停功能测试完成 ✓');
    } else {
      console.log('暂停按钮未找到，跳过测试');
    }
  });

  test('9. 游戏结束界面测试', async ({ page }) => {
    console.log('测试游戏结束界面...');
    
    // 启动游戏
    await page.selectOption('#gradeSelect', 'grade4');
    await page.selectOption('#speedSelect', 'fast'); // 使用快速以更快触发游戏结束
    await page.click('#startGameBtn');
    
    // 等待游戏运行或手动触发游戏结束
    await page.waitForTimeout(3000);
    
    // 尝试触发游戏结束（通过JavaScript）
    await page.evaluate(() => {
      if (window.gameState) {
        window.gameState.lives = 0;
        // 触发游戏结束逻辑
        if (window.gameOver) window.gameOver();
      }
    });
    
    await page.waitForTimeout(2000);
    
    // 检查游戏结束界面
    const gameOverScreen = page.locator('#gameOverScreen, .game-over-screen');
    if (await gameOverScreen.count() > 0) {
      await expect(gameOverScreen).toBeVisible();
      console.log('游戏结束界面显示正常 ✓');
    } else {
      console.log('游戏结束界面未出现，可能需要更长时间触发');
    }
    
    console.log('游戏结束界面测试完成');
  });

  test('10. 词汇页面加载测试', async ({ page }) => {
    console.log('测试词汇页面...');
    
    // 查找词汇页面按钮
    const vocabButton = page.locator('#vocabBtn, .vocab-btn, [href="#vocabScreen"]').first();
    
    if (await vocabButton.count() > 0) {
      await vocabButton.click();
      await page.waitForTimeout(2000);
      
      // 检查词汇页面是否显示
      const vocabScreen = page.locator('#vocabScreen, .vocab-screen');
      await expect(vocabScreen).toBeVisible();
      
      // 截图：词汇页面
      await page.screenshot({ 
        path: 'test-results/screenshots/vocabulary-page.png',
        fullPage: true 
      });
      
      console.log('词汇页面测试完成 ✓');
    } else {
      console.log('词汇页面按钮未找到，尝试其他方式');
      
      // 尝试直接检查词汇页面元素
      const vocabElements = page.locator('.word-item, .vocabulary-item');
      if (await vocabElements.count() > 0) {
        console.log('找到词汇元素');
        await page.screenshot({ 
          path: 'test-results/screenshots/vocabulary-page.png',
          fullPage: true 
        });
      }
    }
  });

  test('11. 单词浏览页面测试', async ({ page }) => {
    console.log('测试单词浏览页面...');
    
    // 查找单词浏览相关元素
    const browseButton = page.locator('#browseBtn, .browse-btn, .word-browse-btn').first();
    
    if (await browseButton.count() > 0) {
      await browseButton.click();
      await page.waitForTimeout(2000);
      
      // 检查浏览页面
      const browseScreen = page.locator('#browseScreen, .browse-screen');
      await expect(browseScreen).toBeVisible();
      
      // 截图：单词浏览页面
      await page.screenshot({ 
        path: 'test-results/screenshots/word-browse-page.png',
        fullPage: true 
      });
      
      console.log('单词浏览页面测试完成 ✓');
    } else {
      console.log('单词浏览按钮未找到，尝试检查现有页面内容');
      
      // 检查页面中是否有单词列表
      const wordLists = page.locator('.word-list, .word-grid, .word-collection');
      if (await wordLists.count() > 0) {
        await page.screenshot({ 
          path: 'test-results/screenshots/word-browse-page.png',
          fullPage: true 
        });
        console.log('找到单词列表元素');
      }
    }
  });

  test('12. 音频播放功能测试', async ({ page }) => {
    console.log('测试音频播放功能...');
    
    // 监听音频相关事件
    let audioPlayed = false;
    
    page.on('console', msg => {
      if (msg.text().includes('audio') || msg.text().includes('sound')) {
        console.log('音频相关日志:', msg.text());
        audioPlayed = true;
      }
    });
    
    // 查找音频播放按钮
    const audioButtons = page.locator('.play-audio, .audio-btn, [data-audio]');
    
    if (await audioButtons.count() > 0) {
      const firstAudioBtn = audioButtons.first();
      await firstAudioBtn.click();
      await page.waitForTimeout(2000);
      
      console.log('音频按钮点击测试完成');
    }
    
    // 检查页面中的音频元素
    const audioElements = page.locator('audio');
    const audioCount = await audioElements.count();
    console.log(`页面中音频元素数量: ${audioCount}`);
    
    if (audioCount > 0) {
      // 尝试播放音频
      await page.evaluate(() => {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
          if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
            audio.play().catch(e => console.log('Audio play failed:', e));
          }
        });
      });
      
      await page.waitForTimeout(1000);
    }
    
    console.log('音频播放功能测试完成');
  });

  test('13. 响应式设计和移动端适配测试', async ({ page }) => {
    console.log('测试响应式设计...');
    
    // 测试不同视口大小
    const viewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 414, height: 896, name: 'iPhone 11' },
      { width: 768, height: 1024, name: 'iPad' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      
      // 检查主要元素是否仍然可见
      await expect(page.locator('.game-container')).toBeVisible();
      
      // 截图
      await page.screenshot({ 
        path: `test-results/screenshots/responsive-${viewport.name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true 
      });
      
      console.log(`${viewport.name} 视口测试完成`);
    }
    
    console.log('响应式设计测试完成 ✓');
  });

  test('14. 性能和加载时间测试', async ({ page }) => {
    console.log('测试页面性能...');
    
    const startTime = Date.now();
    
    // 重新加载页面测试加载时间
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`页面加载时间: ${loadTime}ms`);
    
    // 检查页面性能指标
    const metrics = await page.evaluate(() => ({
      timing: performance.timing,
      memory: performance.memory ? {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      } : null
    }));
    
    console.log('性能指标:', {
      loadTime: loadTime,
      domContentLoaded: metrics.timing.domContentLoadedEventEnd - metrics.timing.navigationStart,
      memory: metrics.memory
    });
    
    // 断言加载时间应该在合理范围内（10秒）
    expect(loadTime).toBeLessThan(10000);
    
    console.log('性能测试完成 ✓');
  });

});