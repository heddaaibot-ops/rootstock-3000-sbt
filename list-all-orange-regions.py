#!/usr/bin/env python3
"""
列出 Figma 指南中所有橙色区域，找到花朵图标
"""
from PIL import Image
import numpy as np
from scipy import ndimage

# 读取 Figma 指南
figma = Image.open('/tmp/rootstock-logo.png')
img_array = np.array(figma)

print(f'Image size: {figma.size}\n')

# Rootstock 橙色 #FF9100
orange_mask = (
    (img_array[:, :, 0] > 240) &
    (img_array[:, :, 1] > 130) & (img_array[:, :, 1] < 160) &
    (img_array[:, :, 2] < 20)
)

# 连通组件分析
labeled, num_features = ndimage.label(orange_mask)

print(f'Found {num_features} orange regions\n')

# 分析所有区域，按大小排序
regions = []

for i in range(1, min(num_features + 1, 200)):  # 最多200个
    component = (labeled == i)
    coords = np.where(component)

    if len(coords[0]) == 0:
        continue

    y_min, y_max = coords[0].min(), coords[0].max()
    x_min, x_max = coords[1].min(), coords[1].max()

    width = x_max - x_min
    height = y_max - y_min
    area = len(coords[0])

    regions.append({
        'id': i,
        'x': x_min,
        'y': y_min,
        'width': width,
        'height': height,
        'area': area
    })

# 按面积排序
regions.sort(key=lambda x: x['area'], reverse=True)

print('Top 15 largest orange regions:\n')

for idx, r in enumerate(regions[:15]):
    print(f'{idx + 1}. Size: {r["width"]}x{r["height"]}, Area: {r["area"]} pixels')
    print(f'   Position: X={r["x"]}, Y={r["y"]}')
    print(f'   Crop: ({r["x"]}, {r["y"]}, {r["x"]+r["width"]}, {r["y"]+r["height"]})')
    print()
