#!/usr/bin/env python3
"""
使用浅色版本 Rootstock logo 创建 favicon
"""
from PIL import Image

# 读取浅色版本 logo
logo = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/rootstock-logo-light.jpg')

print(f'Light logo size: {logo.size}')
print(f'Mode: {logo.mode}')

# 转换为 RGB
if logo.mode != 'RGB':
    logo = logo.convert('RGB')

# 创建 512x512 icon.png
icon = logo.resize((512, 512), Image.Resampling.LANCZOS)
icon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512)')

# 创建 32x32 favicon.ico
favicon = logo.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Light favicon created!')
print('   White background + Orange flower ✨')
