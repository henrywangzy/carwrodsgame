const { chromium } = require('playwright');
const path = require('path');

async function testWordPopup() {
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500 
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // 加载游戏页面
    const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
    await page.goto(filePath);
    
    console.log('测试开始...\n');
    
    // 测试1: 主页面不应该有单词弹窗
    console.log('测试1: 检查主页面是否有单词弹窗');
    await page.waitForTimeout(1000);
    let wordIndicator = await page.$('#wordIndicator');
    let vocabIndicator = await page.$('#vocabSpeakIndicator');
    console.log(`  主页面单词弹窗(游戏): ${wordIndicator ? '❌ 存在' : '✅ 不存在'}`);
    console.log(`  主页面单词弹窗(单词本): ${vocabIndicator ? '❌ 存在' : '✅ 不存在'}\n`);
    
    // 测试2: 进入单词本页面
    console.log('测试2: 进入单词本页面');
    await page.click('button:has-text("📚 单词本")');
    await page.waitForTimeout(1000);
    
    // 点击朗读按钮
    const playButton = await page.$('.play-word-btn');
    if (playButton) {
        console.log('  点击朗读按钮...');
        await playButton.click();
        await page.waitForTimeout(500);
        
        // 检查弹窗是否出现在单词本页面
        vocabIndicator = await page.$('#vocabSpeakIndicator');
        console.log(`  单词本页面朗读弹窗: ${vocabIndicator ? '✅ 正常显示' : '❌ 未显示'}`);
        
        if (vocabIndicator) {
            // 获取弹窗内容
            const content = await vocabIndicator.textContent();
            console.log(`  弹窗内容包含: ${content.includes('🔊') ? '✅' : '❌'} 喇叭图标`);
        }
    }
    
    // 测试3: 切换到主页面，检查弹窗是否被清理
    console.log('\n测试3: 返回主页面');
    await page.click('.back-btn');
    await page.waitForTimeout(500);
    
    wordIndicator = await page.$('#wordIndicator');
    vocabIndicator = await page.$('#vocabSpeakIndicator');
    console.log(`  返回后游戏弹窗: ${wordIndicator ? '❌ 存在' : '✅ 不存在'}`);
    console.log(`  返回后单词本弹窗: ${vocabIndicator ? '❌ 存在' : '✅ 不存在'}\n`);
    
    // 测试4: 进入游戏页面
    console.log('测试4: 进入游戏页面');
    await page.selectOption('#gradeSelect', '1');
    await page.click('button:has-text("开始比赛")');
    await page.waitForTimeout(2000);
    
    // 等待单词出现并收集
    console.log('  等待收集单词...');
    await page.waitForTimeout(3000);
    
    // 检查游戏中的单词弹窗
    wordIndicator = await page.$('#wordIndicator');
    if (wordIndicator) {
        console.log(`  游戏页面单词弹窗: ✅ 正常显示`);
        const content = await wordIndicator.textContent();
        console.log(`  弹窗内容包含: ${content.includes('🔊') ? '✅' : '❌'} 喇叭图标`);
    } else {
        console.log(`  游戏页面单词弹窗: ⚠️ 未检测到（可能还未收集到单词）`);
    }
    
    // 测试5: 暂停游戏返回主页
    console.log('\n测试5: 暂停游戏并返回主页');
    await page.keyboard.press(' '); // 空格键暂停
    await page.waitForTimeout(500);
    
    const pauseModal = await page.$('.pause-modal.active');
    console.log(`  暂停弹窗: ${pauseModal ? '✅ 显示' : '❌ 未显示'}`);
    
    if (pauseModal) {
        await page.click('button:has-text("返回主页")');
        await page.waitForTimeout(500);
        
        // 检查所有弹窗是否被清理
        const pauseModalAfter = await page.$('.pause-modal.active');
        wordIndicator = await page.$('#wordIndicator');
        vocabIndicator = await page.$('#vocabSpeakIndicator');
        
        console.log(`  返回主页后:`);
        console.log(`    暂停弹窗: ${pauseModalAfter ? '❌ 仍显示' : '✅ 已关闭'}`);
        console.log(`    游戏弹窗: ${wordIndicator ? '❌ 仍存在' : '✅ 已清理'}`);
        console.log(`    单词本弹窗: ${vocabIndicator ? '❌ 仍存在' : '✅ 已清理'}`);
    }
    
    console.log('\n测试完成!');
    
    await page.waitForTimeout(2000);
    await browser.close();
}

// 运行测试
testWordPopup().catch(console.error);