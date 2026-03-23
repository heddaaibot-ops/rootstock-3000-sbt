#!/usr/bin/env python3
"""
在 sbt-preview.png 中找到橙色花朵的精确位置
"""
from PIL import Image
import numpy as np

# 读取 SBT preview
preview = Image.open('/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/frontend/public/images/sbt-preview.png')
img_array = np.array(preview)

print(f'Image size: {preview.size}')
print(f'Looking for orange pixels (#FF9100)...\n')

# Rootstock 橙色 #FF9100 = RGB(255, 145, 0)
orange_mask = (
    (img_array[:, :, 0] > 240) &  # R > 240
    (img_array[:, :, 1] > 130) & (img_array[:, :, 1] < 160) &  # G around 145
    (img_array[:, :, 2] < 20)  # B < 20
)

# 找到橙色像素
orange_coords = np.where(orange_mask)

if len(orange_coords[0]) > 0:
    y_min, y_max = orange_coords[0].min(), orange_coords[0].max()
    x_min, x_max = orange_coords[1].min(), orange_coords[1].max()

    print(f'所有橙色区域:')
    print(f'  X: {x_min} to {x_max}')
    print(f'  Y: {y_min} to {y_max}')
    print(f'  Width: {x_max - x_min}, Height: {y_max - y_min}')

    # 左上角的花朵（X < 200, Y < 200）
    topleft_mask = orange_mask.copy()
    topleft_mask[200:, :] = False  # 只看上面 200 行
    topleft_mask[:, 200:] = False  # 只看左边 200 列

    tl_coords = np.where(topleft_mask)
    if len(tl_coords[0]) > 0:
        tly_min, tly_max = tl_coords[0].min(), tl_coords[0].max()
        tlx_min, tlx_max = tl_coords[1].min(), tl_coords[1].max()

        print(f'\n左上角花朵 (X<200, Y<200):')
        print(f'  X: {tlx_min} to {tlx_max}')
        print(f'  Y: {tly_min} to {tly_max}')
        print(f'  Width: {tlx_max - tlx_min}, Height: {tly_max - tly_min}')

        # 添加边距
        margin = 5
        crop_box = (
            max(0, tlx_min - margin),
            max(0, tly_min - margin),
            min(preview.width, tlx_max + margin),
            min(preview.height, tly_max + margin)
        )

        print(f'\n推荐裁剪坐标: {crop_box}')
    else:
        print('\n左上角没有找到橙色像素')
else:
    print('No orange pixels found!')
