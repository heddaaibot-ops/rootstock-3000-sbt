#!/usr/bin/env python3
"""
创建 Rootstock favicon - 橙色背景 + 白色 logo
"""
from PIL import Image

# Rootstock 品牌橙色
ORANGE = (255, 145, 0, 255)  # #FF9100

# 创建 512x512 橙色背景
bg = Image.new('RGBA', (512, 512), ORANGE)

# 读取白色 logo
logo = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/images/figma/rootstock-logo.png')

# 计算缩放比例 - logo 宽度为背景的 70%
scale = 0.7
new_width = int(512 * scale)
aspect_ratio = logo.height / logo.width
new_height = int(new_width * aspect_ratio)

# 调整 logo 大小
logo_resized = logo.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 居中放置
x = (512 - new_width) // 2
y = (512 - new_height) // 2

# 粘贴 logo（保留透明度）
bg.paste(logo_resized, (x, y), logo_resized)

# 保存为 icon.png (512x512)
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512)')

# 创建 favicon.ico (32x32)
favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Favicon created with Rootstock orange background (#FF9100)')
