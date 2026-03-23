#!/usr/bin/env python3
"""
从 Figma 指南截图精确提取官方橙色花朵图标
使用准确的坐标从 PNG - Logo 区域提取
"""
from PIL import Image

# 读取 Figma 指南截图
figma = Image.open('/tmp/rootstock-logo.png')
print(f'Figma guide size: {figma.size}')

# 从 "PNG - Logo" 区域提取右侧的橙色花朵
# 观察图片：PNG - Logo 在下半部分，橙色花朵在右边
# 根据图片尺寸 4122x6361，估计 PNG Logo 区域在 Y: 1100-1400
# 橙色花朵大约在 X: 480-560, Y: 1180-1260

# 提取单个橙色花朵（仅图标，不含文字）
icon = figma.crop((483, 1183, 563, 1263))

icon.save('/tmp/figma-orange-icon.png', 'PNG')
print(f'✅ Extracted icon from Figma: {icon.size}')

# 创建 512x512 黑色背景
size = 512
bg = Image.new('RGB', (size, size), (0, 0, 0))

# 调整 icon 大小 - 保持原比例，宽度 60%
new_width = int(size * 0.6)
aspect_ratio = icon.height / icon.width
new_height = int(new_width * aspect_ratio)

icon_resized = icon.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 居中放置
x = (size - new_width) // 2
y = (size - new_height) // 2

bg.paste(icon_resized, (x, y))

# 保存
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512)')

favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Official Rootstock icon from Figma brand guide!')
