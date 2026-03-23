#!/usr/bin/env python3
"""
绘制官方 Rootstock favicon - 黑色方形 + 橙色花朵（更小更精致）
"""
from PIL import Image, ImageDraw
import math

# 创建黑色背景
size = 512
img = Image.new('RGB', (size, size), (0, 0, 0))
draw = ImageDraw.Draw(img)

# Rootstock 橙色 #FF9100
orange = (255, 145, 0)

# 花朵参数 - 缩小到 40% 大小
center_x, center_y = size // 2, size // 2
node_radius = int(size * 0.06)  # 节点半径（6% instead of 8%）
outer_distance = int(size * 0.14)  # 外围节点距离（14% instead of 18%）

# 绘制中心节点
draw.ellipse(
    (center_x - node_radius, center_y - node_radius,
     center_x + node_radius, center_y + node_radius),
    fill=orange
)

# 绘制 8 个外围节点（环绕中心，每个45度）
for i in range(8):
    angle = math.radians(i * 45)
    x = center_x + int(outer_distance * math.cos(angle))
    y = center_y + int(outer_distance * math.sin(angle))

    draw.ellipse(
        (x - node_radius, y - node_radius,
         x + node_radius, y + node_radius),
        fill=orange
    )

# 保存为 icon.png
img.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/src/app/icon.png', 'PNG')
print('✅ Created icon.png (512x512) - Smaller flower')

# 创建 favicon.ico (32x32)
favicon = img.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/favicon.ico', 'ICO')
print('✅ Created favicon.ico (32x32)')

print('\n🎨 Rootstock favicon created with smaller flower icon!')
