/**
 * ColorfulRectangles Component
 * 彩色矩形装饰元素 - 淡色主题版本
 * 基于 Figma 设计稿的旋转矩形（降低透明度适配淡色背景）
 */

export function ColorfulRectangles() {
  return (
    <>
      {/* 绿黄色矩形 - 左上角 */}
      <div
        className="absolute top-[-50px] left-[-100px] w-[387px] h-[132px] bg-rsk-neon-green/20 animate-float"
        style={{
          transform: 'rotate(15deg)',
        }}
      />

      {/* 粉色矩形 - 左下角 */}
      <div
        className="absolute bottom-[200px] left-[-200px] w-[350px] h-[120px] bg-rsk-pink/15 animate-float-delayed"
        style={{
          transform: 'rotate(-12deg)',
        }}
      />

      {/* 橙色矩形 - 右上角 */}
      <div
        className="absolute top-[100px] right-[-150px] w-[400px] h-[140px] bg-rsk-orange/15 animate-float"
        style={{
          transform: 'rotate(-18deg)',
        }}
      />

      {/* 绿黄色矩形2 - 右中 */}
      <div
        className="absolute top-[400px] right-[-180px] w-[360px] h-[130px] bg-rsk-neon-green/15 animate-float-delayed"
        style={{
          transform: 'rotate(20deg)',
        }}
      />

      {/* 粉色矩形2 - 右下角 */}
      <div
        className="absolute bottom-[-50px] right-[-100px] w-[380px] h-[125px] bg-rsk-pink/20 animate-float"
        style={{
          transform: 'rotate(-15deg)',
        }}
      />
    </>
  );
}
