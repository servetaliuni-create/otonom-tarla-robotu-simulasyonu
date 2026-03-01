import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import data from "./data.json";

export const RobotSimulation = () => {
  const frame = useCurrentFrame();

  // 1. ZAMAN VE KORDİNAT HESABI
  let currentIndex = 0;
  for (let i = 0; i < data.length; i++) {
    if (frame >= data[i].frame) {
      currentIndex = i;
    }
  }

  const currentData = data[currentIndex];
  
  // Akıllı Fren Sistemi
  let currentX = currentData.x;
  let currentY = currentData.y;
  if (currentIndex < data.length - 1) {
    const nextData = data[currentIndex + 1];
    currentX = interpolate(frame, [currentData.frame, nextData.frame], [currentData.x, nextData.x], { extrapolateRight: "clamp" });
    currentY = interpolate(frame, [currentData.frame, nextData.frame], [currentData.y, nextData.y], { extrapolateRight: "clamp" });
  }

  // --- 🌟 YENİ: ÇEYREK MATEMATİĞİ (Ekrandan Taşmayı Önler) ---
  // Robotun X ve Y konumu 50'den (ekranın ortasından) küçük mü büyük mü?
  const isLeft = currentX < 50; 
  const isTop = currentY < 50;  

  // --- HOLOGRAM ANİMASYON MANTIĞI ---
  const hologramDuration = 150; 
  const entryFrame = currentData.frame; 
  const nextEntryFrame = data[currentIndex + 1]?.frame || (entryFrame + hologramDuration + 20); 
  const hologramEndFrame = Math.min(entryFrame + hologramDuration, nextEntryFrame - 10);

  // a) Opacity Animasyonu (Yumuşak Geçiş)
  const hologramOpacity = interpolate(
    frame,
    [entryFrame, entryFrame + 10, hologramEndFrame - 10, hologramEndFrame], 
    [0, 1, 1, 0], 
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // b) Kinematik Scale (Büyüme) Animasyonu: Robotun içinden çıkar ve içine geri döner!
  const hologramScale = interpolate(
    frame,
    [entryFrame, entryFrame + 15, hologramEndFrame - 15, hologramEndFrame],
    [0, 1, 1, 0], 
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // c) Bilim Kurgu Glow Animasyonu
  const glowIntensity = interpolate(frame % 30, [0, 15, 30], [0.4, 0.8, 0.4], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-slate-950 text-white font-sans p-10 flex flex-col justify-between overflow-hidden">
      
      {/* 🌟 ÇÖZÜM 1: Arka Plan Grid (Açık Mavi ve Belirgin) */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#0ea5e9 2px, transparent 2px), linear-gradient(90deg, #0ea5e9 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>

      {/* Üst Panel */}
      <div className="flex justify-between items-center border-b border-emerald-900 pb-4 z-10 bg-slate-950/50 backdrop-blur-sm px-6 rounded-t-xl">
        <h1 className="text-4xl font-bold text-emerald-500 tracking-tight drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">Otonom Tarla Kontrol Ünitesi</h1>
        <div className="text-3xl flex items-center gap-4">
          <span className="text-slate-400">Güç:</span>
          <span className={`font-mono font-bold ${currentData.battery > 50 ? 'text-green-500' : 'text-yellow-500'}`}>
            %{currentData.battery}
          </span>
        </div>
      </div>

      {/* Tarla (Radar) Alanı */}
      <div className="flex-1 relative border-2 border-slate-800 bg-slate-900/80 my-6 rounded-2xl overflow-hidden shadow-2xl z-10">
        
        {/* Otonom Robot */}
        <div
          className="absolute w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.8)] z-20 transition-all duration-75"
          style={{
            left: `${currentX}%`,
            top: `${currentY}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* İçteki Beyaz Atan Kalp */}
          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>

          {/* 🌟 ÇÖZÜM 3: ÇEYREKLERE GÖRE DİNAMİK AÇILAN HOLOGRAM ANKRAJ NOKTASI */}
          <div className="absolute top-1/2 left-1/2 w-0 h-0 z-30">
            <div
              className={`absolute flex flex-col pointer-events-none transition-all duration-300
                ${isTop ? 'top-0 mt-8' : 'bottom-0 mb-8'} 
                ${isLeft ? 'left-0 ml-8' : 'right-0 mr-8'}
              `}
              style={{
                opacity: hologramOpacity, 
                transform: `scale(${hologramScale})`, 
                // Kilit Nokta: Animasyonun orijini robotun merkezine kilitlendi
                transformOrigin: `${isTop ? 'top' : 'bottom'} ${isLeft ? 'left' : 'right'}`,
                filter: `drop-shadow(0 0 25px rgba(249,115,22,${glowIntensity}))` 
              }}
            >
              
              {/* 🌟 ÇÖZÜM 2: Devasa Bilim Kurgu Hologram Şasisi */}
              {/* w-[450px] ile genişletildi, padding (p-8) artırıldı, yazılar büyütüldü */}
              <div className="w-[480px] bg-orange-950/80 border-2 border-orange-500 text-orange-400 p-8 rounded-xl font-mono backdrop-blur-md relative overflow-hidden">
                
                {/* Kalın Köşe Süslemeleri */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-4 border-t-4 border-orange-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-r-4 border-t-4 border-orange-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-4 border-b-4 border-orange-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-4 border-b-4 border-orange-500"></div>

                {/* Hologram İçeriği */}
                <div className="flex justify-between items-center border-b border-orange-700 pb-3 mb-4">
                  <p className="text-sm uppercase tracking-widest text-orange-600 font-bold">Sistem Logu</p>
                  <p className="font-bold text-orange-300 text-xl">{currentData.status}</p>
                </div>
                
                <p className="text-xl leading-relaxed text-orange-100">{currentData.action}</p>
                
                {/* Alt tarama çizgisi */}
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-orange-500 opacity-60 animate-pulse"></div>
              </div>

            </div>
          </div>
          {/* -------------------------------------------------- */}

        </div>
      </div>

    </AbsoluteFill>
  );
};