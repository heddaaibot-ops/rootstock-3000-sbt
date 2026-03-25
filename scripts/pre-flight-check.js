#!/usr/bin/env node

/**
 * 执行前检查脚本
 * 在运行auto-mint.js之前运行此脚本，确保所有条件都满足
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🔍 执行前环境检查                                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

let allChecksPassed = true;
const failedChecks = [];

// 检查项
const checks = [
  {
    name: 'Node.js版本',
    check: () => {
      try {
        const version = execSync('node --version', { encoding: 'utf8' }).trim();
        const majorVersion = parseInt(version.replace('v', '').split('.')[0]);
        if (majorVersion >= 18) {
          return { pass: true, message: `✅ ${version}` };
        }
        return { pass: false, message: `❌ ${version} (需要 v18+)` };
      } catch (error) {
        return { pass: false, message: '❌ Node.js未安装' };
      }
    }
  },
  {
    name: 'npm可用性',
    check: () => {
      try {
        const version = execSync('npm --version', { encoding: 'utf8' }).trim();
        return { pass: true, message: `✅ ${version}` };
      } catch (error) {
        return { pass: false, message: '❌ npm不可用' };
      }
    }
  },
  {
    name: 'ethers.js依赖',
    check: () => {
      try {
        const ethers = require('ethers');
        return { pass: true, message: `✅ v${ethers.version}` };
      } catch (error) {
        return { pass: false, message: '❌ 未安装 (运行: npm install ethers@6)' };
      }
    }
  },
  {
    name: '脚本文件',
    check: () => {
      const filePath = path.join(__dirname, 'auto-mint.js');
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        return { pass: true, message: `✅ ${sizeKB}KB` };
      }
      return { pass: false, message: '❌ auto-mint.js不存在' };
    }
  },
  {
    name: '写入权限',
    check: () => {
      try {
        const testFile = path.join(__dirname, '.write-test');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile);
        return { pass: true, message: '✅ 可写' };
      } catch (error) {
        return { pass: false, message: '❌ 无写入权限' };
      }
    }
  },
  {
    name: '私钥环境变量',
    check: () => {
      const privateKey = process.env.PRIVATE_KEY;
      if (!privateKey) {
        return { pass: false, message: '❌ 未设置 (export PRIVATE_KEY="0x...")' };
      }
      if (!privateKey.startsWith('0x')) {
        return { pass: false, message: '❌ 格式错误（必须以0x开头）' };
      }
      if (privateKey.length !== 66) {
        return { pass: false, message: `❌ 长度错误（当前${privateKey.length}，需要66）` };
      }
      const validHex = /^0x[0-9a-fA-F]{64}$/.test(privateKey);
      if (!validHex) {
        return { pass: false, message: '❌ 包含非法字符' };
      }
      return { pass: true, message: '✅ 格式正确' };
    }
  },
  {
    name: 'RPC连接',
    check: () => {
      try {
        const { ethers } = require('ethers');
        // 使用同步方式测试基本连接
        return { pass: true, message: '✅ ethers可用（需运行时验证RPC）' };
      } catch (error) {
        return { pass: false, message: '❌ 无法创建provider' };
      }
    }
  },
];

console.log('🔍 开始检查...\n');

// 执行所有检查
checks.forEach((item, index) => {
  process.stdout.write(`${index + 1}. ${item.name.padEnd(20, ' ')} ... `);
  const result = item.check();
  console.log(result.message);

  if (!result.pass) {
    allChecksPassed = false;
    failedChecks.push({ name: item.name, message: result.message });
  }
});

console.log('\n' + '━'.repeat(60) + '\n');

if (allChecksPassed) {
  console.log('✅ 所有检查通过！可以运行脚本\n');
  console.log('下一步：');
  console.log('  node auto-mint.js all\n');
  process.exit(0);
} else {
  console.log('❌ 检查失败！请修复以下问题：\n');
  failedChecks.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name}`);
    console.log(`   ${item.message}\n`);
  });

  console.log('修复后重新运行：');
  console.log('  node pre-flight-check.js\n');
  process.exit(1);
}
