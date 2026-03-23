#!/usr/bin/env python3
"""
找到 Figma 指南中橙色花朵的精确坐标
"""
from PIL import Image
import numpy as np

# 读取 Figma 指南截图
figma_guide = Image.open('/tmp/rootstock-logo.png')
img_array = np.array(figma_guide)

print(f'Image size: {figma_guide.size}')
print(f'Looking for orange pixels (RGB around 255, 145, 0)...')

# Rootstock 橙色 #FF9100 = RGB(255, 145, 0)
# 找到橙色像素
orange_mask = (
    (img_array[:, :, 0] > 240) &  # R > 240
    (img_array[:, :, 1] > 130) & (img_array[:, :, 1] < 160) &  # G around 145
    (img_array[:, :, 2] < 20)  # B < 20
)

# 找到橙色像素的坐标
orange_coords = np.where(orange_mask)

if len(orange_coords[0]) > 0:
    y_min, y_max = orange_coords[0].min(), orange_coords[0].max()
    x_min, x_max = orange_coords[1].min(), orange_coords[1].max()

    print(f'\n橙色区域范围:')
    print(f'  X: {x_min} to {x_max}')
    print(f'  Y: {y_min} to {y_max}')
    print(f'  Width: {x_max - x_min}, Height: {y_max - y_min}')

    # 在 PNG - Logo 区域寻找（Y > 1100）
    png_logo_mask = orange_mask.copy()
    png_logo_mask[:1100, :] = False  # 只看下半部分

    png_coords = np.where(png_logo_mask)
    if len(png_coords[0]) > 0:
        py_min, py_max = png_coords[0].min(), png_coords[0].max()
        px_min, px_max = png_coords[1].min(), png_coords[1].max()

        print(f'\nPNG Logo 橙色区域 (Y > 1100):')
        print(f'  X: {px_min} to {px_max}')
        print(f'  Y: {py_min} to {py_max}')
        print(f'  Width: {px_max - px_min}, Height: {py_max - py_min}')

        # 右侧的橙色花朵（X > 400）
        right_icon_mask = png_logo_mask.copy()
        right_icon_mask[:, :400] = False

        right_coords = np.where(right_icon_mask)
        if len(right_coords[0]) > 0:
            ry_min, ry_max = right_coords[0].min(), right_coords[0].max()
            rx_min, rx_max = right_coords[1].min(), right_coords[1].max()

            print(f'\n右侧橙色花朵 (X > 400, Y > 1100):')
            print(f'  X: {rx_min} to {rx_max}')
            print(f'  Y: {ry_min} to {ry_max}')
            print(f'  Width: {rx_max - rx_min}, Height: {ry_max - ry_min}')

            # 添加边距提取
            margin = 5
            crop_box = (
                max(0, rx_min - margin),
                max(0, ry_min - margin),
                min(figma_guide.width, rx_max + margin),
                min(figma_guide.height, ry_max + margin)
            )

            print(f'\n推荐裁剪坐标: {crop_box}')
else:
    print('No orange pixels found!')
