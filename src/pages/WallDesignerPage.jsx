import React from 'react';

export default function WallDesignerPage() {
  return (
    <div className="w-full h-screen bg-[#121212] overflow-hidden flex flex-col">
      <iframe
        src="/tu-thiet-ke-vach/"
        title="Tự thiết kế vách 3D Studio - Nhựa AMC"
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
