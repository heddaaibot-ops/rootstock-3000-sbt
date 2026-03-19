/**
 * GridBackground Component
 * 网格背景系统 - 淡色主题版本
 * 基于 Figma 设计稿的 GRID 系统
 */

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
      {/* 垂直网格线 - 使用深色线条 */}
      <div className="absolute inset-0 flex justify-between">
        {[...Array(5)].map((_, i) => (
          <div
            key={`vertical-${i}`}
            className="w-px bg-rsk-dark h-full"
            style={{
              marginLeft: i === 0 ? '0' : '441px',
            }}
          />
        ))}
      </div>

      {/* 水平网格线 - 使用深色线条 */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className="h-px bg-rsk-dark w-full"
            style={{
              marginTop: `${i * 150}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
