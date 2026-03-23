#!/usr/bin/env python3
"""
从 Figma 指南截图提取官方 Rootstock 橙色花朵 icon
"""
from PIL import Image

# 读取 Figma 指南截图
figma_guide = Image.open('/tmp/rootstock-logo.png')

print(f'Figma guide size: {figma_guide.size}')

# 从 Assets 部分提取橙色 flower icon（PNG - Logo 右侧）
# 观察图片，橙色 icon 大约在 (485, 1188) 附近
icon_orange = figma_guide.crop((485, 1185, 560, 1260))  # 橙色花朵

icon_orange.save('/tmp/rootstock-icon-orange.png', 'PNG')
print(f'✅ Extracted orange icon: {icon_orange.size}')

# 创建黑色方形背景 512x512
size = 512
bg = Image.new('RGB', (size, size), (0, 0, 0))  # 黑色背景

# 调整 icon 大小 - 宽度为 50%
new_width = int(size * 0.5)
aspect_ratio = icon_orange.height / icon_orange.width
new_height = int(new_width * aspect_ratio)

icon_resized = icon_orange.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 居中放置
x = (size - new_width) // 2
y = (size - new_height) // 2

bg.paste(icon_resized, (x, y))

# 保存为 icon.png (512x512)
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512) - Black background + Orange flower')

# 创建 favicon.ico (32x32)
favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Official Rootstock favicon created from Figma guide!')
print('   Black square background + Orange flower icon ✨')
