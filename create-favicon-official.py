#!/usr/bin/env python3
"""
从 sbt-preview.png 提取 Rootstock 官方 logo 创建 favicon
"""
from PIL import Image

# 读取 SBT preview 图片
preview = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/images/sbt-preview.png')

# 提取左上角的 Rootstock logo（估计区域）
# Logo 大约在 (60, 30) 开始，宽度约 500px
logo_crop = preview.crop((40, 30, 640, 180))  # (left, top, right, bottom)

# 确保 logo 是 RGBA 模式
if logo_crop.mode != 'RGBA':
    logo_crop = logo_crop.convert('RGBA')

# 保存裁剪的 logo（用于检查）
logo_crop.save('/tmp/rootstock-logo-cropped.png', 'PNG')
print(f'✅ Cropped logo size: {logo_crop.size}')

# 创建正方形白色背景
size = 512
bg = Image.new('RGB', (size, size), (255, 255, 255))  # 白色背景（RGB）

# 调整 logo 大小 - 宽度为 70%
new_width = int(size * 0.7)
aspect_ratio = logo_crop.height / logo_crop.width
new_height = int(new_width * aspect_ratio)

logo_resized = logo_crop.resize((new_width, new_height), Image.Resampling.LANCZOS)

# 居中放置（不使用 alpha mask，直接粘贴）
x = (size - new_width) // 2
y = (size - new_height) // 2

bg.paste(logo_resized, (x, y))

# 保存为 icon.png (512x512)
bg.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512)')

# 创建 favicon.ico (32x32)
favicon = bg.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Favicon created with official Rootstock logo on white background')
