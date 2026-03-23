#!/usr/bin/env python3
"""
创建官方 Rootstock favicon - 从 sbt-preview.png 提取花朵图标
黑色方形背景 + 橙色花朵（与官方 favicon 一致）
"""
from PIL import Image

# 读取 SBT preview 图片
preview = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/images/sbt-preview.png')

print(f'Preview size: {preview.size}')

# 提取左上角的花朵图标（只要花朵，不要文字）
# 花朵大约在 (40, 30) 开始，宽高约 90x90
flower = preview.crop((38, 28, 125, 115))

# 确保是 RGBA 模式
if flower.mode != 'RGBA':
    flower = flower.convert('RGBA')

flower.save('/tmp/rootstock-flower-extracted.png', 'PNG')
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

# 粘贴花朵（直接粘贴，不用 alpha mask）
bg.paste(flower_resized, (x, y))

# 保存为 icon.png (512x512)
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512) - Black square + Orange flower')

# 创建 favicon.ico (32x32)
favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Official Rootstock favicon created!')
print('   Black square background + Orange flower icon ✨')
