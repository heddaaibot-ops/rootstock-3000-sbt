#!/usr/bin/env python3
"""
从 Figma 指南精确提取 SVG - Logo 右侧的橙色花朵图标
"""
from PIL import Image

# 读取 Figma 指南
figma = Image.open('/tmp/rootstock-logo.png')

print(f'Figma size: {figma.size}')

# 从 "SVG - Logo" 右侧提取橙色花朵
# 观察图片：橙色花朵在 X: 485-555, Y: 915-985 附近
icon = figma.crop((485, 915, 560, 990))

icon.save('/tmp/svg-logo-icon.png', 'PNG')
print(f'✅ Extracted SVG Logo icon: {icon.size}')

# 创建 512x512 黑色背景
size = 512
bg = Image.new('RGB', (size, size), (0, 0, 0))

# 调整大小 - 宽度 50%
new_width = int(size * 0.5)
aspect_ratio = icon.height / icon.width
new_height = int(new_width * aspect_ratio)

icon_resized = icon.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 居中
x = (size - new_width) // 2
y = (size - new_height) // 2

bg.paste(icon_resized, (x, y))

# 保存
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512)')

favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Official Rootstock icon from Figma!')
