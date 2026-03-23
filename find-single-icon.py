#!/usr/bin/env python3
"""
在 Figma 指南中找到单个橙色花朵图标（正方形，约 80-150px）
"""
from PIL import Image
import numpy as np
from scipy import ndimage

# 读取 Figma 指南
figma = Image.open('/tmp/rootstock-logo.png')
img_array = np.array(figma)

print(f'Image size: {figma.size}')

# Rootstock 橙色 #FF9100
orange_mask = (
    (img_array[:, :, 0] > 240) &
    (img_array[:, :, 1] > 130) & (img_array[:, :, 1] < 160) &
    (img_array[:, :, 2] < 20)
)

# 使用连通组件分析找到独立的橙色区域
labeled, num_features = ndimage.label(orange_mask)

print(f'Found {num_features} separate orange regions\n')

# 分析每个区域
icon_candidates = []

for i in range(1, num_features + 1):
    component = (labeled == i)
    coords = np.where(component)

    if len(coords[0]) == 0:
        continue

    y_min, y_max = coords[0].min(), coords[0].max()
    x_min, x_max = coords[1].min(), coords[1].max()

    width = x_max - x_min
    height = y_max - y_min
    area = len(coords[0])

    # 找正方形的花朵图标（宽高比接近1:1，大小在 50-150px）
    aspect_ratio = width / height if height > 0 else 0

    if (50 < width < 200 and
        50 < height < 200 and
        0.8 < aspect_ratio < 1.2 and
        area > 1000):  # 至少1000个像素

        icon_candidates.append({
            'id': i,
            'x': x_min,
            'y': y_min,
            'width': width,
            'height': height,
            'area': area,
            'aspect': aspect_ratio
        })

# 按 Y 坐标排序（从上到下）
icon_candidates.sort(key=lambda x: x['y'])

print(f'Found {len(icon_candidates)} icon candidates:\n')

for idx, icon in enumerate(icon_candidates[:10]):  # 只显示前10个
    print(f'{idx + 1}. Position: ({icon["x"]}, {icon["y"]})')
    print(f'   Size: {icon["width"]}x{icon["height"]} (aspect: {icon["aspect"]:.2f})')
    print(f'   Area: {icon["area"]} pixels')
    print(f'   Crop: ({icon["x"]}, {icon["y"]}, {icon["x"]+icon["width"]}, {icon["y"]+icon["height"]})')
    print()
