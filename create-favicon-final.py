#!/usr/bin/env python3
"""
使用精确坐标创建 Rootstock favicon
"""
from PIL import Image

# 读取 SBT preview
preview = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/images/sbt-preview.png')

# 使用找到的橙色区域坐标，但扩大范围以包含完整花朵
# 左上角花朵大约在 X: 60-110, Y: 55-105（估计）
flower = preview.crop((60, 50, 110, 100))

flower.save('/tmp/flower-final.png', 'PNG')
print(f'✅ Extracted flower: {flower.size}')

# 创建黑色方形背景 512x512
size = 512
bg = Image.new('RGB', (size, size), (0, 0, 0))  # 黑色背景

# 调整花朵大小 - 宽度为 50%
new_width = int(size * 0.5)
aspect_ratio = flower.height / flower.width
new_height = int(new_width * aspect_ratio)

flower_resized = flower.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 居中放置
x = (size - new_width) // 2
y = (size - new_height) // 2

bg.paste(flower_resized, (x, y))

# 保存为 icon.png (512x512)
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512)')

# 创建 favicon.ico (32x32)
favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Rootstock favicon created!')
