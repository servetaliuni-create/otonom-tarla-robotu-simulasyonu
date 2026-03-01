import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const IntroSequence = () => {
  const frame = useCurrentFrame();
  
  // 1800 kareyi (60 saniyeyi), her biri yaklaşık 6.6 saniye (200 kare) süren 9 farklı sahneye bölüyoruz.
  const phase = Math.floor(frame / 200); 

  // Turuncu kutunun her sahne geçişinde yumuşakça belirip kaybolmasını sağlayan motor
  const boxOpacity = interpolate(frame % 200, [0, 15, 185, 200], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Senin o meşhur Turuncu Bilgi Kutucuğu (HUD) Şablonumuz
  const InfoBox = ({ title, text, top, left, right, bottom, transform }: any) => (
    <div
      className="absolute w-[450px] bg-orange-950/90 border-2 border-orange-500 p-6 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.6)] z-50"
      style={{ top, left, right, bottom, transform, opacity: boxOpacity }}
    >
      <h3 className="text-orange-400 font-bold text-xl mb-2 uppercase tracking-widest border-b border-orange-700 pb-2">{title}</h3>
      <p className="text-orange-100 text-xl leading-relaxed">{text}</p>
    </div>
  );

  return (
    <AbsoluteFill className="text-white font-sans overflow-hidden">
      
      {phase < 3 ? (
        // ================= KISIM 1: ROBOT ŞEMASI (BLUEPRINT) =================
        <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
           {/* Kağıt üzeri çizim hissi veren mimari ızgara */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           <h1 className="absolute top-10 left-10 text-4xl font-mono text-sky-400 tracking-widest">SİSTEM ANATOMİSİ // V1.0</h1>

           {/* Sadece CSS ile Çizilmiş Otonom Robot Şeması */}
           <div className="relative w-72 h-[450px] border-4 border-sky-500 rounded-[40px] flex flex-col items-center justify-between p-6 shadow-[0_0_50px_rgba(14,165,233,0.2)]">
              {/* Sensör Bölümü */}
              <div className={`w-24 h-24 rounded-full border-4 ${phase === 0 ? 'border-red-500 bg-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 'border-sky-400 border-dashed'} transition-all duration-500`}></div>
              
              {/* Zeka / Beyin Bölümü */}
              <div className={`w-40 h-40 rounded-xl border-4 ${phase === 2 ? 'border-red-500 bg-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 'border-sky-400'} transition-all duration-500`}></div>
              
              {/* Tekerlekler */}
              <div className={`absolute -left-12 top-24 w-10 h-64 border-4 rounded-xl ${phase === 1 ? 'border-red-500 bg-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 'border-sky-400'} transition-all duration-500`}></div>
              <div className={`absolute -right-12 top-24 w-10 h-64 border-4 rounded-xl ${phase === 1 ? 'border-red-500 bg-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 'border-sky-400'} transition-all duration-500`}></div>
           </div>

           {/* Şema Bilgi Kutucukları */}
           {phase === 0 && <InfoBox title="Lidar & Optik Sensör" text="Burası robotumuzun ana sensör ünitesidir. Tarladaki tohum yataklarını ve yabani otları milimetrik hassasiyetle tarar." top="20%" left="60%" />}
           {phase === 1 && <InfoBox title="Otonom Çekiş Sistemi" text="Her türlü arazi şartında ilerlemeyi sağlayan tekerlek motorları. Çamur ve engebeli arazide kaymayı önler." bottom="20%" right="60%" />}
           {phase === 2 && <InfoBox title="Merkezi İşlem Birimi (AI)" text="Robotun beynidir. Sensörlerden gelen veriyi anlık işler, otonom kararlar alır ve haritalama yapar." top="45%" left="65%" />}
        </div>
      ) : (
        // ================= KISIM 2: TARLA TANITIMI =================
        <div className="w-full h-full bg-slate-950 relative p-10 flex flex-col justify-between">
            {/* Simülasyondaki aynı mavi grid arka plan */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#0ea5e9 2px, transparent 2px), linear-gradient(90deg, #0ea5e9 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>

            <div className="flex justify-between items-center border-b border-emerald-900 pb-4 z-10 bg-slate-950/50 backdrop-blur-sm px-6 rounded-t-xl relative">
              <h1 className="text-4xl font-bold text-emerald-500 tracking-tight">Otonom Tarla Kontrol Ünitesi</h1>
              {/* Batarya Vurgusu (7. Fazda Kırmızı Yanar) */}
              <div className={`text-3xl flex items-center gap-4 p-2 rounded-lg transition-all duration-500 ${phase === 7 ? 'border-4 border-red-500 bg-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : ''}`}>
                <span className="text-slate-400">Güç:</span>
                <span className="font-mono font-bold text-green-500">%100</span>
              </div>
            </div>

            <div className="flex-1 relative border-2 border-slate-800 bg-slate-900/80 my-6 rounded-2xl overflow-hidden shadow-2xl z-10">
                {/* Tarladaki Vurgular (Saydam Kırmızı Alanlar) */}
                {phase === 3 && <div className="absolute top-[10%] left-0 w-full h-[15%] bg-red-500/40 border-y-4 border-red-500 flex items-center justify-center"><span className="text-red-200 text-3xl font-bold tracking-widest">1. SATIR</span></div>}
                {phase === 4 && <div className="absolute top-[10%] left-[40%] w-[10%] h-[15%] bg-red-500/60 border-4 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.8)]"></div>}
                {phase === 5 && <div className="absolute top-[70%] left-0 w-full h-[15%] bg-red-500/40 border-y-4 border-red-500 flex items-center justify-center"><span className="text-red-200 text-3xl font-bold tracking-widest">SON SATIR (DÖNÜŞ ROTASI)</span></div>}
                {phase === 6 && <div className="absolute top-[10%] left-[10%] w-[10%] h-[15%] bg-red-500/60 border-4 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.8)] flex items-center justify-center"><span className="text-red-200 text-2xl font-bold">İSTASYON</span></div>}
            </div>

            {/* Tarla Bilgi Kutucukları */}
            {phase === 3 && <InfoBox title="1. Tarama Satırı" text="Burası 1. satırdır. Robot burayı baştan sona tarayacak ve ardından ikinci satıra otonom olarak inecektir." bottom="30%" left="50%" transform="translateX(-50%)" />}
            {phase === 4 && <InfoBox title="Tohum Yatağı" text="Sensörlerin bulduğu ideal ekim noktası. Bu karede durularak tohumlama ve nem ölçümü yapılır." bottom="30%" left="50%" transform="translateX(-50%)" />}
            {phase === 5 && <InfoBox title="Son Satır" text="Burası son satırdır. Buranın bitmesiyle beraber tarla tamamlanır ve robot geldiği yolu izleyerek geri döner." top="30%" left="50%" transform="translateX(-50%)" />}
            {phase === 6 && <InfoBox title="Şarj İstasyonu" text="Burası robotun ana şarj istasyonudur. Görev bittiğinde bataryasını doldurmak için buraya park edecektir." bottom="30%" left="20%" />}
            {phase === 7 && <InfoBox title="Batarya Göstergesi" text="Bu panel robotun anlık güç tüketimini gösterir. Batarya kritik seviyeye indiğinde sistem uyarılır." top="20%" right="10%" />}
            
            {phase === 8 && <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center z-50"><h1 className="text-5xl font-mono text-emerald-500 tracking-widest animate-pulse">SİMÜLASYON BAŞLATILIYOR...</h1></div>}
        </div>
      )}
    </AbsoluteFill>
  );
};