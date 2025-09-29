import { Button } from '@/components/ui/button';
import FrameGameOver from '@/assets/images/game/frame-gameover.webp';
import { useNavigate } from 'react-router';
import useMusic from '@/lib/hooks/use-music';
import { useEffect } from 'react';
import { SOUNDS } from '@/lib/config/music-config';

export default function GameOverDialog({ onClick }: { onClick: () => void }) {
  const navigate = useNavigate();
  const { playSound } = useMusic();

  useEffect(() => {
    playSound(SOUNDS.ingame.over);
  }, [playSound]);

  return (
    <div className="absolute inset-0 z-[9999] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex h-[374px] w-[560px] flex-col items-center justify-between gap-3.5 p-[35px]">
        <img
          src={FrameGameOver}
          alt="FrameGameOver"
          className="absolute inset-0 h-full w-full object-contain"
        />
        <header className="z-[1] flex flex-col items-center justify-center">
          <h2 className="text-[26px] leading-[45px] font-bold text-[#F0FFE6]">GAME OVER</h2>
          <p className="text-xl leading-[45px] text-[#F0FFE6]">Better luck next time. Try again!</p>
        </header>
        <svg
          width="186"
          height="126"
          viewBox="0 0 186 126"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            d="M168.046 39.6986H171.537V43.1508H175.027V46.6029H178.518V55.2328H182.009V62.1371H178.518V74.2191H175.027V77.6713H168.046V81.1234H164.556V84.5756H157.574V88.0277H154.084V91.4799H147.103V93.2054H122.669V94.932H63.3291V93.2054H49.3682V89.7533H63.3301V91.4799H122.669V89.7533H147.103V84.5756H154.084V81.1234H157.574V77.6713H164.556V74.2191H168.046V70.767H171.537V67.3148H175.027V50.0551H171.537V46.6029H168.046V43.1508H164.556V39.6986H161.065V36.2465H168.046V39.6986ZM45.8779 86.3011V93.2054H38.8965V91.4799H31.915V88.0277H38.8965V86.3011H45.8779ZM24.9336 36.2465V39.6986H21.4434V43.1508H17.9531V46.6029H14.4619V50.0551H10.9717V67.3148H14.4619V70.767H17.9531V74.2191H21.4434V77.6713H24.9336V81.1234H31.915V88.0277H24.9336V84.5756H17.9531V81.1234H14.4619V77.6713H10.9717V74.2191H7.48145V62.1371H3.99023V55.2328H7.48145V46.6029H10.9717V43.1508H14.4619V39.6986H17.9531V36.2465H24.9336ZM38.8965 31.0687V34.5209H31.915V36.2465H24.9336V32.7943H31.915V31.0687H38.8965ZM147.103 31.0687H154.084V32.7943H161.065V36.2465H154.084V34.5209H143.612V31.0687H133.141V27.6166H147.103V31.0687ZM52.8584 27.6166V31.0687H38.8965V27.6166H52.8584ZM66.8213 24.1644V27.6166H52.8584V24.1644H66.8213ZM133.141 27.6166H119.179V24.1644H133.141V27.6166Z"
            fill="#C62057"
          />
          <rect x="10.9717" y="43.1508" width="3.49057" height="6.90411" fill="#FE5A9A" />
          <rect x="7.48145" y="46.6028" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="14.4619" y="39.6987" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="17.9531" y="55.2329" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="17.9531" y="55.2329" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="28.4248" y="55.2329" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="31.915" y="51.7809" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="40.6416" y="48.3289" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="28.4248" y="58.6849" width="8.72641" height="3.45205" fill="#FE5A9A" />
          <rect x="33.6602" y="62.1371" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="40.6416" y="65.5891" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="47.623" y="69.0411" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="70.3115" y="77.6713" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="77.292" y="81.1233" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="87.7637" y="77.6713" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="140.123" y="55.2329" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="148.849" y="58.6849" width="6.98113" height="3.45205" fill="#FE5A9A" />
          <rect x="143.613" y="62.1371" width="6.98113" height="3.45205" fill="#FE5A9A" />
          <rect x="98.2363" y="74.2192" width="10.4717" height="3.45205" fill="#FE5A9A" />
          <rect x="28.4248" y="51.7809" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="31.915" y="48.3289" width="8.72641" height="3.45205" fill="#FE5A9A" />
          <rect x="40.6416" y="44.8767" width="5.23585" height="3.45205" fill="#FE5A9A" />
          <rect x="17.9531" y="36.2466" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="24.9336" y="32.7946" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="7.48145" y="50.0548" width="3.49057" height="17.2603" fill="#FF82B6" />
          <rect x="10.9717" y="70.7672" width="3.49057" height="3.45205" fill="#FE87B9" />
          <rect x="14.4619" y="74.2192" width="3.49057" height="3.45205" fill="#FE87B9" />
          <rect x="17.9531" y="77.6713" width="3.49057" height="3.45205" fill="#FE87B9" />
          <rect x="10.9717" y="67.3151" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect
            width="3.49057"
            height="3.45205"
            transform="matrix(-1 0 0 1 178.519 67.3151)"
            fill="#FE5A9A"
          />
          <rect x="7.48145" y="67.3151" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="14.4619" y="70.7672" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect
            width="6.98113"
            height="3.45205"
            transform="matrix(-1 0 0 1 175.028 70.7672)"
            fill="#FE5A9A"
          />
          <rect x="17.9531" y="74.2192" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect
            width="3.49057"
            height="3.45205"
            transform="matrix(-1 0 0 1 171.538 74.2192)"
            fill="#FE5A9A"
          />
          <rect x="21.4434" y="77.6713" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect
            width="6.98113"
            height="3.45205"
            transform="matrix(-1 0 0 1 168.047 77.6713)"
            fill="#FE5A9A"
          />
          <rect x="24.9336" y="81.1233" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect
            width="3.49057"
            height="3.45205"
            transform="matrix(-1 0 0 1 161.066 81.1233)"
            fill="#FE5A9A"
          />
          <rect x="28.4248" y="81.1233" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect
            width="3.49057"
            height="3.45205"
            transform="matrix(-1 0 0 1 157.575 81.1233)"
            fill="#FE5A9A"
          />
          <rect x="31.915" y="84.5754" width="6.98113" height="3.45205" fill="#FE5A9A" />
          <rect
            width="6.98113"
            height="3.45205"
            transform="matrix(-1 0 0 1 154.085 84.5754)"
            fill="#FE5A9A"
          />
          <rect x="38.8965" y="86.3014" width="6.98113" height="3.45205" fill="#FE5A9A" />
          <rect
            width="6.98113"
            height="3.45205"
            transform="matrix(-1 0 0 1 147.104 86.3014)"
            fill="#FE5A9A"
          />
          <rect
            width="17.4528"
            height="3.45205"
            transform="matrix(-1 0 0 1 140.123 89.7534)"
            fill="#FE5A9A"
          />
          <rect x="45.877" y="89.7534" width="13.9623" height="3.45205" fill="#FE5A9A" />
          <rect x="63.3301" y="91.4795" width="59.3396" height="3.45205" fill="#FE5A9A" />
          <rect x="7.48145" y="43.1508" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="10.9717" y="39.6987" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="14.4619" y="36.2466" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="10.9717" y="50.0548" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="10.9717" y="63.863" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="17.9531" y="32.7946" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="24.9336" y="29.3425" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="31.915" y="27.6165" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="38.8965" y="24.1644" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="126.16" y="27.6165" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="136.632" y="31.0685" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="147.104" y="27.6165" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="154.085" y="29.3425" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="161.066" y="32.7946" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="168.047" y="36.2466" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="171.538" y="39.6987" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="175.028" y="43.1508" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="157.575" y="36.2466" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="157.575" y="32.7946" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="161.066" y="36.2466" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="164.557" y="39.6987" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="168.047" y="43.1508" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="171.538" y="46.6028" width="3.49057" height="3.45205" fill="#FE5A9A" />
          <rect x="175.028" y="50.0548" width="3.49057" height="17.2603" fill="#FE5A9A" />
          <rect x="133.142" y="24.1644" width="10.4717" height="3.45205" fill="#690A30" />
          <rect x="3.99023" y="46.6028" width="3.49057" height="8.63014" fill="#690A30" />
          <rect
            x="182.01"
            y="70.7672"
            width="3.49057"
            height="8.63014"
            transform="rotate(-180 182.01 70.7672)"
            fill="#690A30"
          />
          <rect x="0.5" y="55.2329" width="3.49057" height="6.90411" fill="#690A30" />
          <rect
            x="185.5"
            y="62.1371"
            width="3.49057"
            height="6.90411"
            transform="rotate(-180 185.5 62.1371)"
            fill="#690A30"
          />
          <rect x="3.99023" y="62.1371" width="3.49057" height="8.63014" fill="#690A30" />
          <rect
            x="182.01"
            y="55.2329"
            width="3.49057"
            height="8.63014"
            transform="rotate(-180 182.01 55.2329)"
            fill="#690A30"
          />
          <rect x="45.877" y="93.2056" width="17.4528" height="3.45205" fill="#690A30" />
          <rect x="122.67" y="93.2056" width="17.4528" height="3.45205" fill="#690A30" />
          <rect x="63.3301" y="94.9315" width="59.3396" height="3.45205" fill="#690A30" />
          <rect x="28.4248" y="62.1371" width="8.72641" height="3.45205" fill="#690A30" />
          <rect x="37.1514" y="65.5891" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="66.8203" y="77.6713" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="70.3115" y="81.1233" width="6.98113" height="3.45205" fill="#690A30" />
          <rect x="77.292" y="84.5754" width="10.4717" height="3.45205" fill="#690A30" />
          <rect x="87.7637" y="81.1233" width="10.4717" height="3.45205" fill="#690A30" />
          <rect x="98.2363" y="77.6713" width="10.4717" height="3.45205" fill="#690A30" />
          <rect x="141.868" y="51.7809" width="8.72641" height="3.45205" fill="#690A30" />
          <rect x="150.595" y="55.2329" width="5.23585" height="3.45205" fill="#690A30" />
          <rect x="155.83" y="58.6849" width="5.23585" height="3.45205" fill="#690A30" />
          <rect x="150.595" y="62.1371" width="5.23585" height="3.45205" fill="#690A30" />
          <rect x="45.877" y="69.0411" width="3.49057" height="3.45205" fill="#690A30" />
          <rect x="17.9531" y="58.6849" width="10.4717" height="3.45205" fill="#690A30" />
          <rect x="101.727" y="58.6851" width="6.98113" height="10.3562" fill="#FAD19D" />
          <rect x="70.3115" y="27.6165" width="20.9434" height="20.7123" fill="#FBD5A1" />
          <rect x="45.877" y="24.1644" width="17.4528" height="24.1644" fill="#AA5E25" />
          <rect x="59.8398" y="20.7124" width="6.98113" height="13.8082" fill="#AA5E25" />
          <rect x="45.877" y="24.1644" width="3.49057" height="24.1644" fill="#813208" />
          <rect x="49.3682" y="24.1644" width="13.9623" height="3.45205" fill="#813208" />
          <rect x="59.8398" y="20.7124" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="63.3301" y="17.2604" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="66.8203" y="13.8083" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="73.8018" y="3.45215" width="10.4717" height="3.45205" fill="#813208" />
          <rect x="70.3115" y="6.90417" width="3.49057" height="6.90411" fill="#813208" />
          <rect x="66.8203" y="17.2604" width="3.49057" height="6.90411" fill="#AA5E25" />
          <rect x="70.3115" y="13.8083" width="3.49057" height="6.90411" fill="#AA5E25" />
          <rect x="56.3486" y="34.5206" width="3.49057" height="13.8082" fill="#E8954C" />
          <rect x="77.292" y="6.90417" width="3.49057" height="10.3562" fill="#E8954C" />
          <rect
            x="91.2549"
            y="6.90417"
            width="6.90411"
            height="17.4528"
            transform="rotate(90 91.2549 6.90417)"
            fill="#E8954C"
          />
          <rect x="80.7832" y="17.2604" width="3.49057" height="6.90411" fill="#E8954C" />
          <rect x="52.8584" y="37.9727" width="3.49057" height="12.0822" fill="#E8954C" />
          <rect x="52.8584" y="44.8768" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="56.3486" y="48.3289" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="56.3486" y="72.4932" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="73.8018" y="62.1371" width="6.98113" height="13.8082" fill="#AA5E25" />
          <rect x="80.7832" y="69.0411" width="13.9623" height="3.45205" fill="#AA5E25" />
          <rect x="59.8398" y="48.3289" width="6.98113" height="27.6164" fill="#AA5E25" />
          <rect x="63.3301" y="51.7809" width="10.4717" height="24.1644" fill="#AA5E25" />
          <rect x="42.3867" y="27.6165" width="3.49057" height="17.2603" fill="#25140D" />
          <rect x="45.877" y="20.7124" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="49.3682" y="20.7124" width="10.4717" height="3.45205" fill="#25140D" />
          <rect x="59.8398" y="17.2604" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="52.8584" y="48.3289" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="59.8398" y="58.6851" width="3.49057" height="13.8082" fill="#25140D" />
          <rect x="56.3486" y="51.7809" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="56.3486" y="69.0411" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="52.8584" y="72.4932" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="80.7832" y="72.4932" width="13.9623" height="3.45205" fill="#25140D" />
          <rect x="94.7451" y="69.0411" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="98.2363" y="58.6851" width="3.49057" height="13.8082" fill="#25140D" />
          <rect x="101.727" y="55.2329" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="105.217" y="51.7809" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="108.708" y="48.3289" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="112.198" y="51.7809" width="3.49057" height="13.8082" fill="#25140D" />
          <rect x="108.708" y="65.5891" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="101.727" y="72.4932" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="108.708" y="51.7809" width="3.49057" height="13.8082" fill="#F1995D" />
          <rect x="105.217" y="55.2329" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="101.727" y="69.0411" width="6.98113" height="3.45205" fill="#F1995D" />
          <rect x="80.7832" y="65.5891" width="17.4528" height="3.45205" fill="#25140D" />
          <rect x="56.3486" y="75.9453" width="24.434" height="3.45205" fill="#25140D" />
          <rect x="122.67" y="41.4247" width="13.9623" height="3.45205" fill="#25140D" />
          <rect x="63.3301" y="34.5206" width="6.98113" height="10.3562" fill="#F1995D" />
          <rect x="70.3115" y="20.7124" width="3.49057" height="6.90411" fill="#F1995D" />
          <rect x="73.8018" y="24.1644" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="73.8018" y="27.6165" width="6.98113" height="3.45205" fill="#F1995D" />
          <rect x="70.3115" y="27.6165" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="70.3115" y="31.0686" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="70.3115" y="44.8768" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="80.7832" y="44.8768" width="3.49057" height="3.45205" fill="#F5B788" />
          <rect x="84.2734" y="41.4247" width="3.49057" height="3.45205" fill="#F5B788" />
          <rect x="91.2549" y="20.7124" width="3.49057" height="10.3562" fill="#FBD69F" />
          <rect x="87.7637" y="24.1644" width="3.49057" height="3.45205" fill="#F5B788" />
          <rect x="87.7637" y="20.7124" width="3.49057" height="3.45205" fill="#FBD69F" />
          <rect x="87.7637" y="27.6165" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="87.7637" y="37.9727" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="73.8018" y="48.3289" width="6.98113" height="3.45205" fill="#F1995D" />
          <rect x="45.877" y="44.8768" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="45.877" y="17.2604" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="122.67" y="51.7809" width="10.4717" height="17.2603" fill="#FE919C" />
          <rect x="49.3682" y="3.45215" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="59.8398" y="3.45215" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="56.3486" y="6.90417" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="49.3682" y="6.90417" width="3.49057" height="10.3562" fill="#25140D" />
          <rect x="63.3301" y="13.8083" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="70.3115" y="3.45215" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="87.7637" y="3.45215" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="91.2549" y="6.90417" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="94.7451" y="10.3562" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="84.2734" y="44.8768" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="63.3301" y="34.5206" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="77.292" y="31.0686" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="80.7832" y="24.1644" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="77.292" y="17.2604" width="3.49057" height="10.3562" fill="#813208" />
          <rect x="73.8018" y="13.8083" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="84.2734" y="13.8083" width="10.4717" height="3.45205" fill="#AA5E25" />
          <rect x="87.7637" y="17.2604" width="6.98113" height="3.45205" fill="#AA5E25" />
          <rect x="80.7832" y="13.8083" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="87.7637" y="6.90417" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="91.2549" y="10.3562" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="94.7451" y="13.8083" width="3.49057" height="6.90411" fill="#813208" />
          <rect x="98.2363" y="20.7124" width="10.4717" height="6.90411" fill="#813208" />
          <rect x="73.8018" y="17.2604" width="3.49057" height="6.90411" fill="#813208" />
          <rect x="84.2734" y="17.2604" width="3.49057" height="10.3562" fill="#813208" />
          <rect x="80.7832" y="41.4247" width="3.49057" height="3.45205" fill="#82053F" />
          <rect x="70.3115" y="37.9727" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="77.292" y="62.1371" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="73.8018" y="55.2329" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="80.7832" y="48.3289" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="59.8398" y="37.9727" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="63.3301" y="44.8768" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="66.8203" y="48.3289" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="73.8018" y="51.7809" width="10.4717" height="3.45205" fill="#25140D" />
          <rect x="66.8203" y="24.1644" width="3.49057" height="10.3562" fill="#25140D" />
          <rect x="94.7451" y="20.7124" width="3.49057" height="10.3562" fill="#25140D" />
          <rect x="91.2549" y="31.0686" width="3.49057" height="13.8082" fill="#25140D" />
          <rect x="98.2363" y="13.8083" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="101.727" y="17.2604" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="94.7451" y="34.5206" width="10.4717" height="10.3562" fill="#FE919C" />
          <rect x="94.7451" y="58.6851" width="3.49057" height="6.90411" fill="#8B3A0E" />
          <rect x="98.2363" y="51.7809" width="3.49057" height="6.90411" fill="#8B3A0E" />
          <rect x="101.727" y="48.3289" width="3.49057" height="6.90411" fill="#8B3A0E" />
          <rect x="105.217" y="41.4247" width="3.49057" height="10.3562" fill="#8B3A0E" />
          <rect x="112.198" y="41.4247" width="3.49057" height="3.45205" fill="#8B3A0E" />
          <rect x="115.688" y="37.9727" width="3.49057" height="3.45205" fill="#8B3A0E" />
          <rect x="112.198" y="37.9727" width="3.49057" height="3.45205" fill="#C9815A" />
          <rect x="101.727" y="48.3289" width="3.49057" height="3.45205" fill="#BC5315" />
          <rect x="98.2363" y="44.8768" width="3.49057" height="3.45205" fill="#BC5315" />
          <rect x="101.727" y="41.4247" width="3.49057" height="3.45205" fill="#8B3A0E" />
          <rect x="105.217" y="44.8768" width="6.98113" height="3.45205" fill="#BC5315" />
          <rect x="108.708" y="20.7124" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="119.18" y="31.0686" width="10.4717" height="6.90411" fill="#813208" />
          <rect x="122.67" y="34.5206" width="13.9623" height="6.90411" fill="#813208" />
          <rect x="119.18" y="31.0686" width="6.98113" height="3.45205" fill="#AA5E25" />
          <rect x="126.16" y="34.5206" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="115.688" y="24.1644" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="126.16" y="31.0686" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="129.651" y="34.5206" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="140.123" y="44.8768" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="143.613" y="48.3289" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="143.613" y="51.7809" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="133.142" y="62.1371" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="136.632" y="58.6851" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="133.142" y="55.2329" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="136.632" y="62.1371" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="136.632" y="65.5891" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="140.123" y="65.5891" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="140.123" y="69.0411" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="143.613" y="65.5891" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="143.613" y="69.0411" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="147.104" y="69.0411" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="143.613" y="72.4932" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="147.104" y="72.4932" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="140.123" y="62.1371" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="108.708" y="75.9453" width="17.4528" height="3.45205" fill="#25140D" />
          <rect x="129.651" y="55.2329" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="133.142" y="55.2329" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="140.123" y="55.2329" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="136.632" y="55.2329" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="133.142" y="65.5891" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="129.651" y="72.4932" width="13.9623" height="3.45205" fill="#25140D" />
          <rect x="143.613" y="75.9453" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="150.595" y="69.0411" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="147.104" y="65.5891" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="143.613" y="62.1371" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="140.123" y="58.6851" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="136.632" y="69.0411" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="136.632" y="37.9727" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="119.18" y="27.6165" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="80.7832" y="58.6851" width="10.4717" height="6.90411" fill="#F1995D" />
          <rect x="84.2734" y="48.3289" width="10.4717" height="6.90411" fill="#FD3A6F" />
          <rect x="101.727" y="34.5206" width="6.98113" height="3.45205" fill="#FD3A6F" />
          <rect x="115.688" y="41.4247" width="6.98113" height="10.3562" fill="#FD3A6F" />
          <rect x="122.67" y="44.8768" width="10.4717" height="6.90411" fill="#FD3A6F" />
          <rect x="115.688" y="51.7809" width="3.49057" height="13.8082" fill="#FD3A6F" />
          <rect x="112.198" y="65.5891" width="3.49057" height="6.90411" fill="#FD3A6F" />
          <rect x="119.18" y="48.3289" width="3.49057" height="17.2603" fill="#FE919C" />
          <rect x="119.18" y="65.5891" width="3.49057" height="3.45205" fill="#FD3A6F" />
          <rect x="94.7451" y="34.5206" width="3.49057" height="3.45205" fill="#FD3A6F" />
          <rect x="105.217" y="37.9727" width="3.49057" height="3.45205" fill="#FD3A6F" />
          <rect x="87.7637" y="55.2329" width="6.98113" height="3.45205" fill="#BD0244" />
          <rect x="91.2549" y="44.8768" width="6.98113" height="3.45205" fill="#BD0244" />
          <rect x="112.198" y="44.8768" width="6.98113" height="3.45205" fill="#BD0244" />
          <rect x="129.651" y="44.8768" width="10.4717" height="3.45205" fill="#BD0244" />
          <rect x="119.18" y="41.4247" width="3.49057" height="3.45205" fill="#BD0244" />
          <rect x="122.67" y="65.5891" width="3.49057" height="3.45205" fill="#E64E62" />
          <rect x="94.7451" y="31.0686" width="10.4717" height="3.45205" fill="#BD0244" />
          <rect x="94.7451" y="41.4247" width="3.49057" height="6.90411" fill="#C9074A" />
          <rect x="91.2549" y="51.7809" width="3.49057" height="3.45205" fill="#FE919C" />
          <rect x="84.2734" y="48.3289" width="3.49057" height="6.90411" fill="#BD0244" />
          <rect x="108.708" y="34.5206" width="10.4717" height="3.45205" fill="#25140D" />
          <rect x="105.217" y="31.0686" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="101.727" y="44.8768" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="108.708" y="41.4247" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="98.2363" y="41.4247" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="101.727" y="37.9727" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="105.217" y="34.5206" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="94.7451" y="44.8768" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="112.198" y="37.9727" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="115.688" y="41.4247" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="112.198" y="44.8768" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="119.18" y="37.9727" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="84.2734" y="55.2329" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="80.7832" y="58.6851" width="3.49057" height="3.45205" fill="#FBD5A1" />
          <rect x="77.292" y="55.2329" width="6.98113" height="3.45205" fill="#F1995D" />
          <rect x="77.292" y="58.6851" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="98.2363" y="48.3289" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="94.7451" y="51.7809" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="91.2549" y="58.6851" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="98.2363" y="27.6165" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="87.7637" y="41.4247" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="73.8018" width="13.9623" height="3.45205" fill="#25140D" />
          <rect x="63.3301" width="6.98113" height="3.45205" fill="#25140D" />
          <rect x="63.3301" y="3.45215" width="3.49057" height="10.3562" fill="#FAA904" />
          <rect
            width="3.45206"
            height="10.4717"
            transform="matrix(0.00350721 0.999994 -0.999994 0.00343024 66.8203 10.3562)"
            fill="#FAA904"
          />
          <rect
            width="3.45206"
            height="3.49465"
            transform="matrix(0.00350721 0.999994 -0.999994 0.00343024 63.334 13.8323)"
            fill="#FAA904"
          />
          <rect
            width="3.45206"
            height="3.49465"
            transform="matrix(0.00350721 0.999994 -0.999994 0.00343024 59.8438 13.8083)"
            fill="#FED72F"
          />
          <rect
            width="6.90411"
            height="3.49465"
            transform="matrix(0.00350721 0.999994 -0.999994 0.00343024 56.3535 10.3562)"
            fill="#FED72F"
          />
          <rect x="49.3682" y="17.2604" width="10.4717" height="3.45205" fill="#FAA904" />
          <rect x="63.3301" y="3.45215" width="3.49057" height="3.45205" fill="#A74E01" />
          <rect x="49.3682" y="17.2604" width="3.49057" height="3.45205" fill="#A74E01" />
          <rect x="52.8584" y="6.90417" width="3.49057" height="3.45205" fill="#A74E01" />
          <rect x="66.8203" y="3.45215" width="3.49057" height="10.3562" fill="#25140D" />
          <rect x="59.8398" y="51.7809" width="3.49057" height="6.90411" fill="#813208" />
          <rect x="56.3486" y="72.4932" width="6.98113" height="3.45205" fill="#813208" />
          <rect x="70.3115" y="51.7809" width="3.49057" height="10.3562" fill="#813208" />
          <rect x="73.8018" y="62.1371" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="73.8018" y="72.4932" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="77.292" y="65.5891" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="77.292" y="72.4932" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="80.7832" y="69.0411" width="13.9623" height="3.45205" fill="#813208" />
          <rect x="63.3301" y="58.6851" width="3.49057" height="13.8082" fill="#E8954C" />
          <rect x="66.8203" y="55.2329" width="3.49057" height="3.45205" fill="#E8954C" />
          <rect x="105.217" y="37.9727" width="6.98113" height="3.45205" fill="#8B3A0E" />
          <rect x="101.727" y="41.4247" width="3.49057" height="3.45205" fill="#BC5315" />
          <rect x="73.8018" y="6.90417" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="84.2734" y="3.45215" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="105.217" y="20.7124" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="105.217" y="27.6165" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="112.198" y="24.1644" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="98.2363" y="17.2604" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="115.688" y="27.6165" width="3.49057" height="3.45205" fill="#813208" />
          <rect x="108.708" y="31.0686" width="10.4717" height="3.45205" fill="#813208" />
          <rect x="112.198" y="27.6165" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="115.688" y="27.6165" width="3.49057" height="3.45205" fill="#AA5E25" />
          <rect x="108.708" y="24.1644" width="3.49057" height="6.90411" fill="#AA5E25" />
          <rect x="133.142" y="48.3289" width="6.98113" height="3.45205" fill="#BD0244" />
          <rect x="140.123" y="51.7809" width="3.49057" height="3.45205" fill="#BD0244" />
          <rect x="136.632" y="51.7809" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="140.123" y="48.3289" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="133.142" y="51.7809" width="3.49057" height="3.45205" fill="#BD0244" />
          <rect x="126.16" y="55.2329" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="115.688" y="62.1371" width="3.49057" height="6.90411" fill="#BD0244" />
          <rect x="108.708" y="72.4932" width="10.4717" height="3.45205" fill="#BD0244" />
          <rect x="119.18" y="69.0411" width="3.49057" height="3.45205" fill="#BD0244" />
          <rect x="126.16" y="58.6851" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="122.67" y="69.0411" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="122.67" y="72.4932" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="119.18" y="72.4932" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="115.688" y="69.0411" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="122.67" y="65.5891" width="10.4717" height="3.45205" fill="#25140D" />
          <rect x="126.16" y="72.4932" width="3.49057" height="6.90411" fill="#25140D" />
          <rect x="140.123" y="51.7809" width="3.49057" height="3.45205" fill="#810631" />
          <rect x="133.142" y="62.1371" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="129.651" y="62.1371" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="133.142" y="58.6851" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="126.16" y="69.0411" width="10.4717" height="3.45205" fill="#F1995D" />
          <rect x="136.632" y="65.5891" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="140.123" y="69.0411" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="143.613" y="69.0411" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="143.613" y="72.4932" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="147.104" y="72.4932" width="3.49057" height="3.45205" fill="#F1995D" />
          <rect x="122.67" y="69.0411" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="129.651" y="58.6851" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="126.16" y="62.1371" width="3.49057" height="3.45205" fill="#25140D" />
          <rect x="133.142" y="51.7809" width="6.98113" height="3.45205" fill="#25140D" />
        </svg>
        <Button
          size="sm"
          variant="default"
          className="z-[1] h-[58px] w-[184px]"
          onClick={() => {
            navigate('/');
            onClick();
          }}
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
