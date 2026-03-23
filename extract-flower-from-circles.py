#!/usr/bin/env python3
"""
根据找到的圆圈坐标提取完整花朵图标
圆圈位置：X=797-909, Y=390-412
扩大范围以包含所有9个圆圈
"""
from PIL import Image

# 读取 Figma 指南
figma = Image.open('/tmp/rootstock-logo.png')

print(f'Figma size: {figma.size}')

# 根据圆圈位置，扩大范围提取完整花朵
# 圆圈中心大约在 X=850, Y=400
# 花朵半径估计约 60-80px
margin = 50
center_x, center_y = 850, 400
radius = 80

x1 = center_x - radius - margin
y1 = center_y - radius - margin
x2 = center_x + radius + margin
y2 = center_y + radius + margin

flower = figma.crop((x1, y1, x2, y2))

flower.save('/tmp/flower-from-circles.png', 'PNG')
print(f'✅ Extracted flower: {flower.size}')
print(f'   Coordinates: ({x1}, {y1}, {x2}, {y2})')

# 创建 512x512 黑色背景
size = 512
bg = Image.new('RGB', (size, size), (0, 0, 0))

# 调整大小 - 宽度50%
new_width = int(size * 0.5)
aspect_ratio = flower.height / flower.width
new_height = int(new_width * aspect_ratio)

flower_resized = flower.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 居中
x = (size - new_width) // 2
y = (size - new_height) // 2

bg.paste(flower_resized, (x, y))

# 保存
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512)')

favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Extracted flower from Figma brand guide!')
