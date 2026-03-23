#!/usr/bin/env python3
"""
从 Figma 指南精确提取单个橙色花朵图标
"""
from PIL import Image

# 读取 Figma 指南截图
figma_guide = Image.open('/tmp/rootstock-logo.png')

print(f'Figma guide size: {figma_guide.size}')

# 从之前的分析，PNG - Logo 区域的橙色花朵在右侧
# 尝试提取单个花朵（宽度约 75 像素）
# 在 X: 485-565, Y: 1185-1265 附近（PNG - Logo 右侧）

# 让我尝试提取 "PNG - Logo" 标题右侧的大花朵
# 根据图片观察，花朵应该在 (485, 1185) 附近，大小约 80x80
icon_orange = figma_guide.crop((480, 1180, 565, 1265))

icon_orange.save('/tmp/test-icon-1.png', 'PNG')
print(f'Test 1 saved: {icon_orange.size}')

# 再试试更下方的位置（如果上面的不对）
icon_orange2 = figma_guide.crop((1480, 1180, 1565, 1265))
icon_orange2.save('/tmp/test-icon-2.png', 'PNG')
print(f'Test 2 saved: {icon_orange2.size}')

# 试试更右边
icon_orange3 = figma_guide.crop((485, 1330, 565, 1410))
icon_orange3.save('/tmp/test-icon-3.png', 'PNG')
print(f'Test 3 saved: {icon_orange3.size}')

print('\n已保存3个测试裁剪，请检查 /tmp/test-icon-*.png')
