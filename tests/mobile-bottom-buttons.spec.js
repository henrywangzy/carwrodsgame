const { test, expect } = require('@playwright/test');

test.describe('赛车单词游戏移动端底部按钮测试', () => {
  let page;
  const gameUrl = 'file:///' + process.cwd().replace(/\\/g, '/') + '/index.html';

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }, // iPhone 12 Pro 尺寸
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    page = await context.newPage();
    
    // 导航到游戏页面
    await page.goto(gameUrl);
    await page.waitForTimeout(2000); // 等待页面完全加载
  });

  test('测试游戏结束页面底部按钮可见性', async () => {
    console.log('开始测试游戏结束页面...');
    
    // 等待页面加载完成
    await page.waitForSelector('#main-menu', { state: 'visible' });
    
    // 开始游戏
    await page.click('#start-game-btn');
    await page.waitForSelector('#game-screen', { state: 'visible' });
    await page.waitForTimeout(1000);
    
    // 模拟游戏结束（通过设置生命值为0）
    await page.evaluate(() => {
      window.gameInstance.player.health = 0;
      window.gameInstance.gameOver = true;
      window.gameInstance.showGameOver();
    });
    
    // 等待游戏结束页面显示
    await page.waitForSelector('#game-over-screen', { state: 'visible' });
    await page.waitForTimeout(1000);
    
    // 截图游戏结束页面
    await page.screenshot({ 
      path: 'test-results/game-over-mobile.png',
      fullPage: true
    });
    
    // 检查底部按钮是否可见
    const gameOverButtons = page.locator('.game-over-buttons');
    await expect(gameOverButtons).toBeVisible();
    
    // 获取按钮位置信息
    const buttonsBox = await gameOverButtons.boundingBox();
    const viewportHeight = page.viewportSize().height;
    
    console.log(`按钮位置: top=${buttonsBox.y}, bottom=${buttonsBox.y + buttonsBox.height}`);
    console.log(`视口高度: ${viewportHeight}`);
    
    // 验证按钮完全在视口内
    expect(buttonsBox.y + buttonsBox.height).toBeLessThanOrEqual(viewportHeight);
    
    // 检查specific按钮是否可点击
    const retryBtn = page.locator('#retry-btn');
    const backBtn = page.locator('#back-to-menu-btn');
    
    await expect(retryBtn).toBeVisible();
    await expect(backBtn).toBeVisible();
    
    // 测试按钮点击
    const retryBtnBox = await retryBtn.boundingBox();
    const backBtnBox = await backBtn.boundingBox();
    
    console.log(`重试按钮位置: top=${retryBtnBox.y}, bottom=${retryBtnBox.y + retryBtnBox.height}`);
    console.log(`返回按钮位置: top=${backBtnBox.y}, bottom=${backBtnBox.y + backBtnBox.height}`);
  });

  test('测试单词本页面底部分页按钮可见性', async () => {
    console.log('开始测试单词本页面...');
    
    // 等待主菜单加载
    await page.waitForSelector('#main-menu', { state: 'visible' });
    
    // 点击单词本按钮
    await page.click('#vocab-btn');
    await page.waitForSelector('#vocab-screen', { state: 'visible' });
    await page.waitForTimeout(1000);
    
    // 截图单词本页面
    await page.screenshot({ 
      path: 'test-results/vocab-screen-mobile.png',
      fullPage: true
    });
    
    // 检查分页按钮是否可见
    const pagination = page.locator('.pagination');
    await expect(pagination).toBeVisible();
    
    // 获取分页按钮位置信息
    const paginationBox = await pagination.boundingBox();
    const viewportHeight = page.viewportSize().height;
    
    console.log(`分页按钮位置: top=${paginationBox.y}, bottom=${paginationBox.y + paginationBox.height}`);
    console.log(`视口高度: ${viewportHeight}`);
    
    // 验证分页按钮完全在视口内
    expect(paginationBox.y + paginationBox.height).toBeLessThanOrEqual(viewportHeight);
    
    // 检查具体的分页按钮
    const prevBtn = page.locator('#prev-vocab-page');
    const nextBtn = page.locator('#next-vocab-page');
    
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
    
    // 测试按钮点击
    const prevBtnBox = await prevBtn.boundingBox();
    const nextBtnBox = await nextBtn.boundingBox();
    
    console.log(`上一页按钮位置: top=${prevBtnBox.y}, bottom=${prevBtnBox.y + prevBtnBox.height}`);
    console.log(`下一页按钮位置: top=${nextBtnBox.y}, bottom=${nextBtnBox.y + nextBtnBox.height}`);
  });

  test('测试单词浏览页面底部分页按钮可见性', async () => {
    console.log('开始测试单词浏览页面...');
    
    // 等待主菜单加载
    await page.waitForSelector('#main-menu', { state: 'visible' });
    
    // 点击单词浏览按钮
    await page.click('#browse-words-btn');
    await page.waitForSelector('#browse-words-screen', { state: 'visible' });
    await page.waitForTimeout(1000);
    
    // 截图单词浏览页面
    await page.screenshot({ 
      path: 'test-results/browse-words-mobile.png',
      fullPage: true
    });
    
    // 检查分页按钮是否可见
    const pagination = page.locator('.pagination');
    await expect(pagination).toBeVisible();
    
    // 获取分页按钮位置信息
    const paginationBox = await pagination.boundingBox();
    const viewportHeight = page.viewportSize().height;
    
    console.log(`分页按钮位置: top=${paginationBox.y}, bottom=${paginationBox.y + paginationBox.height}`);
    console.log(`视口高度: ${viewportHeight}`);
    
    // 验证分页按钮完全在视口内
    expect(paginationBox.y + paginationBox.height).toBeLessThanOrEqual(viewportHeight);
    
    // 检查具体的分页按钮
    const prevBtn = page.locator('#prev-page');
    const nextBtn = page.locator('#next-page');
    
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
    
    // 测试按钮点击
    const prevBtnBox = await prevBtn.boundingBox();
    const nextBtnBox = await nextBtn.boundingBox();
    
    console.log(`上一页按钮位置: top=${prevBtnBox.y}, bottom=${prevBtnBox.y + nextBtnBox.height}`);
    console.log(`下一页按钮位置: top=${nextBtnBox.y}, bottom=${nextBtnBox.y + nextBtnBox.height}`);
    
    // 滚动测试 - 确保单词列表有足够的padding-bottom
    const wordList = page.locator('.word-list');
    const wordCardContainer = page.locator('.word-card-container');
    
    if (await wordList.isVisible()) {
      const wordListBox = await wordList.boundingBox();
      console.log(`单词列表位置: top=${wordListBox.y}, bottom=${wordListBox.y + wordListBox.height}`);
      
      // 检查padding-bottom是否足够
      const wordListStyles = await wordList.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          paddingBottom: styles.paddingBottom,
          marginBottom: styles.marginBottom
        };
      });
      console.log('单词列表样式:', wordListStyles);
    }
    
    if (await wordCardContainer.isVisible()) {
      const containerBox = await wordCardContainer.boundingBox();
      console.log(`单词卡片容器位置: top=${containerBox.y}, bottom=${containerBox.y + containerBox.height}`);
      
      // 检查padding-bottom是否足够
      const containerStyles = await wordCardContainer.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          paddingBottom: styles.paddingBottom,
          marginBottom: styles.marginBottom
        };
      });
      console.log('单词卡片容器样式:', containerStyles);
    }
  });

  test('验证CSS底部间距设置', async () => {
    console.log('开始验证CSS设置...');
    
    // 导航到页面
    await page.goto(gameUrl);
    await page.waitForTimeout(2000);
    
    // 检查CSS变量和样式设置
    const cssCheck = await page.evaluate(() => {
      const results = {};
      
      // 检查游戏结束按钮样式
      const gameOverButtons = document.querySelector('.game-over-buttons');
      if (gameOverButtons) {
        const styles = window.getComputedStyle(gameOverButtons);
        results.gameOverButtons = {
          bottom: styles.bottom,
          position: styles.position,
          paddingBottom: styles.paddingBottom
        };
      }
      
      // 检查分页按钮样式
      const pagination = document.querySelector('.pagination');
      if (pagination) {
        const styles = window.getComputedStyle(pagination);
        results.pagination = {
          bottom: styles.bottom,
          position: styles.position,
          paddingBottom: styles.paddingBottom
        };
      }
      
      // 检查单词列表样式
      const wordList = document.querySelector('.word-list');
      if (wordList) {
        const styles = window.getComputedStyle(wordList);
        results.wordList = {
          paddingBottom: styles.paddingBottom,
          marginBottom: styles.marginBottom
        };
      }
      
      // 检查单词卡片容器样式
      const wordCardContainer = document.querySelector('.word-card-container');
      if (wordCardContainer) {
        const styles = window.getComputedStyle(wordCardContainer);
        results.wordCardContainer = {
          paddingBottom: styles.paddingBottom,
          marginBottom: styles.marginBottom
        };
      }
      
      return results;
    });
    
    console.log('CSS样式检查结果:', JSON.stringify(cssCheck, null, 2));
    
    // 验证关键样式设置
    if (cssCheck.gameOverButtons) {
      expect(cssCheck.gameOverButtons.bottom).toBe('140px');
    }
    
    if (cssCheck.pagination) {
      expect(cssCheck.pagination.bottom).toBe('80px');
    }
    
    if (cssCheck.wordList) {
      expect(cssCheck.wordList.paddingBottom).toBe('130px');
    }
    
    if (cssCheck.wordCardContainer) {
      expect(cssCheck.wordCardContainer.paddingBottom).toBe('130px');
    }
  });

  test('滚动测试 - 确保内容不被底部按钮遮挡', async () => {
    console.log('开始滚动测试...');
    
    // 等待主菜单加载
    await page.waitForSelector('#main-menu', { state: 'visible' });
    
    // 测试单词浏览页面的滚动
    await page.click('#browse-words-btn');
    await page.waitForSelector('#browse-words-screen', { state: 'visible' });
    await page.waitForTimeout(1000);
    
    // 滚动到页面底部
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    await page.waitForTimeout(1000);
    
    // 截图滚动到底部的状态
    await page.screenshot({ 
      path: 'test-results/scroll-to-bottom-mobile.png',
      fullPage: true
    });
    
    // 检查最后一个单词卡片是否完全可见
    const lastWordCard = page.locator('.word-card').last();
    if (await lastWordCard.isVisible()) {
      const lastCardBox = await lastWordCard.boundingBox();
      const paginationBox = await page.locator('.pagination').boundingBox();
      
      console.log(`最后一个单词卡片位置: bottom=${lastCardBox.y + lastCardBox.height}`);
      console.log(`分页按钮位置: top=${paginationBox.y}`);
      
      // 验证最后一个卡片不与分页按钮重叠
      expect(lastCardBox.y + lastCardBox.height).toBeLessThanOrEqual(paginationBox.y);
    }
  });

  test.afterEach(async () => {
    if (page) {
      await page.close();
    }
  });
});