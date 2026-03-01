import { Composition, Sequence } from "remotion";
import { RobotSimulation } from "./RobotSimulation";
import { IntroSequence } from "./Intro";
import "./index.css";

// Toplam 2 dakika: 60sn İntro (1800) + 60sn Simülasyon (1800) = 3600 Kare
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TarlaRobotu-Sunum"
        // 3600 kare = Tam 2 dakika
        durationInFrames={3600} 
        fps={30}
        width={1920}
        height={1080}
        component={() => (
          <>
            {/* 1. SAHNE: 0'dan başlar, 1800 kare sürer (İntro) */}
            <Sequence from={0} durationInFrames={1800}>
              <IntroSequence />
            </Sequence>

            {/* 2. SAHNE: 1800. kareden başlar, 1800 kare sürer (Simülasyon) */}
            <Sequence from={1800} durationInFrames={1800}>
              <RobotSimulation />
            </Sequence>
          </>
        )}
      />
    </>
  );
};