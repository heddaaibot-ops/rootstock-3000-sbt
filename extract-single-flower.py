#!/usr/bin/env python3
"""
从 Figma 指南精确提取单个橙色花朵图标
根据 Figma 指南图片，"SVG - Logo" 右侧有黑色和橙色花朵
"""
from PIL import Image

# 读取 Figma 指南截图
figma_guide = Image.open('/tmp/rootstock-logo.png')

print(f'Figma guide size: {figma_guide.size}')

# 从 "SVG - Logo" 右侧提取橙色花朵
# 观察图片：橙色花朵在黑色花朵右边
# 尝试多个可能的位置

positions = [
    (485, 910, 565, 990, "svg-logo-orange"),
    (410, 910, 485, 990, "svg-logo-black"),
    (485, 1195, 565, 1275, "png-logo-orange"),
    (410, 1195, 485, 1275, "png-logo-black"),
]

for x1, y1, x2, y2, name in positions:
    crop = figma_guide.crop((x1, y1, x2, y2))
    crop.save(f'/tmp/{name}.png', 'PNG')
    print(f'✅ {name}: {crop.size}')

print('\n已保存所有测试裁剪到 /tmp/')
