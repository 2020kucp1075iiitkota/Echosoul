'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;

    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength = 0.01;
    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));
    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
    const mask = dot.mul(flow).mul(vec3(10, 0, 0));
    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);
  const { size } = useThree();
  const isMobile = size.width < 768;

  useFrame(({ clock }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current && 'material' in meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as any;
      if ('opacity' in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? (isMobile ? 0.75 : 1) : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  const scaleFactor = isMobile ? 0.55 : 0.4;
  const xOffset = isMobile ? 0 : w * 0.22;
  return (
    <mesh ref={meshRef} position={[xOffset, 0, 0]} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

export const HeroFuturistic = () => {
  const titleLines = ['Your Mind.', 'Immortalized.'];
  const subtitle = 'So the people you love never have to say goodbye.';
  const [visibleLines, setVisibleLines] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctasVisible, setCtasVisible] = useState(false);

  useEffect(() => {
    if (visibleLines < titleLines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 700);
      return () => clearTimeout(t);
    } else {
      const t1 = setTimeout(() => setSubtitleVisible(true), 600);
      const t2 = setTimeout(() => setCtasVisible(true), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [visibleLines, titleLines.length]);

  return (
    <div className="h-svh w-full relative overflow-hidden bg-[#0D0D10]">

      {/* Text overlay */}
      <div className="h-svh w-full absolute z-50 pointer-events-none flex justify-center flex-col pt-20 px-6 items-center text-center sm:items-start sm:text-left sm:px-10 md:px-14 sm:max-w-2xl sm:left-0">

        {/* Badge — inline above title on both mobile and desktop */}
        <div
          className="inline-flex items-center gap-2 border border-[#FF3030]/20 px-3 py-1.5 rounded-sm mb-4 sm:mb-8 sm:self-start"
          style={{ opacity: visibleLines > 0 ? 1 : 0, transition: 'opacity 0.6s ease', background: 'rgba(13,13,16,0.5)' }}
        >
          <span className="text-[9px] tracking-[3px] uppercase" style={{ color: '#FF3030' }}>
            AI-Powered Digital Immortality
          </span>
        </div>

        {/* Title */}
        <div className="mb-4 sm:mb-6">
          {titleLines.map((line, i) => (
            <div
              key={i}
              className={i < visibleLines ? 'hero-line-in' : ''}
              style={{
                opacity: i < visibleLines ? 1 : 0,
                animationDelay: `${i * 0.1}s`,
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2rem, 9vw, 5.5rem)',
                fontWeight: i === 0 ? 400 : 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: i === 0 ? '#ECECEC' : '#FF3030',
                display: 'block',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <div
          className={subtitleVisible ? 'hero-sub-in' : ''}
          style={{
            opacity: subtitleVisible ? 1 : 0,
            color: 'rgba(236, 236, 236, 0.5)',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            maxWidth: '360px',
            fontFamily: 'var(--font-inter), sans-serif',
            marginBottom: '1.5rem',
          }}
        >
          {subtitle}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-row gap-2 sm:gap-3 pointer-events-auto"
          style={{ opacity: ctasVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}
        >
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#FF3030',
              color: '#fff',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '4px',
              fontSize: '10px',
              letterSpacing: '1px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Begin Your Journey
          </button>
          <button
            onClick={() => document.getElementById('chat-demo')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.25)',
              padding: '9px 16px',
              borderRadius: '4px',
              fontSize: '10px',
              letterSpacing: '1px',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Talk to an Echo
          </button>
        </div>
      </div>

      {/* Full-screen 3D Canvas */}
      <Canvas
        flat
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing fullScreenEffect={true} />
        <Scene />
      </Canvas>

    </div>
  );
};

export default HeroFuturistic;
