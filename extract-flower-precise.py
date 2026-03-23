#!/usr/bin/env python3
"""
精确提取 sbt-preview.png 左上角的橙色花朵图标
"""
from PIL import Image

# 读取 SBT preview 图片
preview = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/images/sbt-preview.png')

print(f'Preview size: {preview.size}')

# 尝试不同的坐标来找到花朵
test_coords = [
    (55, 45, 145, 135, "flower-1"),
    (60, 50, 140, 130, "flower-2"),
    (50, 40, 130, 120, "flower-3"),
    (65, 55, 135, 125, "flower-4"),
]

for x1, y1, x2, y2, name in test_coords:
    crop = preview.crop((x1, y1, x2, y2))
    crop.save(f'/tmp/{name}.png', 'PNG')
    print(f'✅ {name}: ({x1},{y1},{x2},{y2}) size={crop.size}')

print('\n已保存测试裁剪到 /tmp/flower-*.png')
