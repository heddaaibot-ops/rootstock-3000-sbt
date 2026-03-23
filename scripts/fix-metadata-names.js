const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'metadata');
const targetDir = path.join(__dirname, '..', 'metadata-fixed');

// 创建目标文件夹
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('📁 开始复制并重命名文件...');

let count = 0;
for (let i = 0; i < 10000; i++) {
  const sourcePath = path.join(sourceDir, i.toString());
  const targetPath = path.join(targetDir, `${i}.json`);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    count++;
    if (count % 1000 === 0) {
      console.log(`✓ 已处理 ${count} 个文件...`);
    }
  }
}

console.log(`✅ 完成！共复制 ${count} 个文件`);
console.log(`📂 新文件夹：${targetDir}`);
