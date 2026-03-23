#!/usr/bin/env python3
"""
创建 Rootstock 官方 favicon - 黑色方形背景 + 橙色花朵图标
"""
from PIL import Image

# 读取 SBT preview 图片
preview = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/images/sbt-preview.png')

# 提取左上角的花朵 icon（只要花朵，不要文字）
# 花朵大约在 (40, 30) 开始，宽度约 130px
flower_crop = preview.crop((40, 30, 170, 160))  # (left, top, right, bottom)

# 确保是 RGBA 模式
if flower_crop.mode != 'RGBA':
    flower_crop = flower_crop.convert('RGBA')

# 保存裁剪的花朵（用于检查）
flower_crop.save('/tmp/rootstock-flower.png', 'PNG')
print(f'✅ Cropped flower size: {flower_crop.size}')

# 创建正方形黑色背景
size = 512
bg = Image.new('RGB', (size, size), (0, 0, 0))  # 黑色背景

# 调整花朵大小 - 宽度为 50%（花朵较小，需要放大）
new_width = int(size * 0.5)
aspect_ratio = flower_crop.height / flower_crop.width
new_height = int(new_width * aspect_ratio)

flower_resized = flower_crop.resize((new_width, new_height), Image.Resampling.LANCZOS)

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

print('\n🎨 Favicon created with official Rootstock icon (black background + orange flower)')
