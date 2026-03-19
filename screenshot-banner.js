const puppeteer = require('puppeteer');
const path = require('path');

async function screenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 设置 5:2 比例的视口
  await page.setViewport({
    width: 2500,
    height: 1000,
    deviceScaleFactor: 1
  });

  // 加载 HTML
  const htmlPath = path.join(__dirname, 'banner-official-style.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // 等待一下确保渲染完成
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 截图
  const outputPath = path.join(__dirname, 'rootstock-official-banner.png');
  await page.screenshot({
    path: outputPath,
    fullPage: false
  });

  console.log(`✅ Banner saved to: ${outputPath}`);

  await browser.close();
}

screenshot().catch(console.error);
