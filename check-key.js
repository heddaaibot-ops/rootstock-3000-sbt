const { ethers } = require('ethers');

const privateKey = '0x4ac84e573041aa3a28a0911ebfddd17f48187d322489f6caddc27dc83a451a62';
const wallet = new ethers.Wallet(privateKey);

console.log('私鑰對應的地址:', wallet.address);
console.log('期望的地址: 0x22cd1c7b62a9cda1fc1868ae0deab62f6fd57800');
console.log('匹配:', wallet.address.toLowerCase() === '0x22cd1c7b62a9cda1fc1868ae0deab62f6fd57800'.toLowerCase());
