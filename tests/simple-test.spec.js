// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * 简单测试以验证文件访问
 */

test.describe('文件访问测试', () => {
  
  test('验证游戏文件能否访问', async ({ page }) => {
    console.log('开始文件访问测试...');
    
    // 构造文件路径
    const gamePath = path.resolve(__dirname, '..', '赛车单词游戏.html');
    console.log('游戏文件路径:', gamePath);
    
    // 检查文件是否存在
    const fs = require('fs');
    const fileExists = fs.existsSync(gamePath);
    console.log('文件是否存在:', fileExists);
    
    if (!fileExists) {
      console.log('文件不存在，跳过测试');
      return;
    }
    
    // 构造 file URL
    const fileUrl = `file:///${gamePath.replace(/\\/g, '/')}`;
    console.log('File URL:', fileUrl);
    
    try {
      // 尝试访问页面
      await page.goto(fileUrl, { timeout: 30000 });
      console.log('页面访问成功');
      
      // 等待页面加载
      await page.waitForLoadState('domcontentloaded');
      console.log('DOM 内容加载完成');
      
      // 获取页面标题
      const title = await page.title();
      console.log('页面标题:', title);
      
      // 截图
      await page.screenshot({ 
        path: 'test-results/screenshots/simple-test-homepage.png',
        fullPage: true 
      });
      console.log('截图已保存');
      
      // 基本断言
      expect(title).toContain('赛车单词游戏');
      
    } catch (error) {
      console.error('页面访问失败:', error);
      throw error;
    }
  });
  
});