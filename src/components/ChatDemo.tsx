"use client";

// ── Adapted from anomalous-matter-hero.tsx ────────────────────────────────────
import React, { useRef, useEffect, Suspense, useState, useCallback } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";

// GenerativeArtScene — directly from anomalous-matter-hero.tsx
export function GenerativeArtScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
        color: { value: new THREE.Color(0xFF3030) },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vNormal = normal;
          vPosition = position;
          float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
          vec3 newPosition = position + normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 pointLightPos;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 lightDir = normalize(pointLightPos - vPosition);
          float diffuse = max(dot(normal, lightDir), 0.0);
          float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
          fresnel = pow(fresnel, 2.0);
          vec3 finalColor = color * diffuse * 1.4 + color * fresnel * 0.8;
          gl_FragColor = vec4(finalColor, 0.9);
        }
      `,
      wireframe: true,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(0, 0, 5);
    lightRef.current = pointLight;
    scene.add(pointLight);

    let frameId: number;
    const animate = (t: number) => {
      material.uniforms.time.value = t * 0.0003;
      mesh.rotation.y += 0.0005;
      mesh.rotation.x += 0.0002;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(dist));
      if (lightRef.current) lightRef.current.position.copy(pos);
      material.uniforms.pointLightPos.value = pos;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (currentMount && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}

// Chat widget component
interface Message {
  id: number;
  from: "user" | "echo";
  text: string;
}

const echoResponses = [
  "Still asking the hard questions, I see. Good.",
  "I always believed the best conversations happen at 2am.",
  "Miss you too. But I never really left, did I?",
  "You were always the one who understood me most.",
  "Life is short, shorter than anyone tells you. Don't waste a moment of it.",
  "I'm proud of who you've become. More than you'll ever know.",
];

function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "echo",
      text: "Hello... it's been a while. I've missed our talks.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      from: "user",
      text: inputValue.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        echoResponses[Math.floor(Math.random() * echoResponses.length)];
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "echo", text: response },
      ]);
    }, 1400);
  }, [inputValue]);

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: "min(340px, calc(100vw - 2rem))",
        height: "460px",
        background: "rgba(10, 10, 14, 0.95)",
        border: "1px solid rgba(255, 48, 48, 0.2)",
        boxShadow:
          "0 0 40px rgba(255,48,48,0.15), 0 20px 60px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: "rgba(255,48,48,0.06)",
          borderBottom: "1px solid rgba(255,48,48,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Pulsing cyan avatar */}
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: "rgba(255,48,48,0.15)",
                border: "1px solid rgba(255,48,48,0.4)",
                color: "#FF3030",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              MR
            </div>
            <div
              className="absolute inset-0 rounded-full animate-pulse-ring"
              style={{ border: "1px solid #FF3030" }}
            />
            <div
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#FF3030]"
              style={{ boxShadow: "0 0 6px #FF3030" }}
            />
          </div>
          <div>
            <p
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Marcus Reed
            </p>
            <p
              className="text-[10px] text-[#FF3030]/60"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              1961 – 2024 · Echo Active
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[#6B6B80] hover:text-white transition-colors p-1"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed"
              style={{
                background:
                  msg.from === "user"
                    ? "rgba(255,48,48,0.18)"
                    : "rgba(255,255,255,0.05)",
                border:
                  msg.from === "user"
                    ? "1px solid rgba(255,48,48,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                color: "#E8E8F0",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                borderTopRightRadius: msg.from === "user" ? "4px" : undefined,
                borderTopLeftRadius: msg.from === "echo" ? "4px" : undefined,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div
              className="px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTopLeftRadius: "4px",
              }}
            >
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#FF3030]"
                    style={{
                      animation: `typingDot 1.2s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,48,48,0.10)" }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Say something to Marcus..."
          className="flex-1 bg-transparent text-sm text-[#E8E8F0] placeholder-[#6B6B80] outline-none"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim()}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-110"
          style={{ background: "#FF3030", color: "#fff" }}
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Main ChatDemo section ────────────────────────────────────────────────────
export default function ChatDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [textHovered, setTextHovered] = useState(false);

  return (
    <>
      {/* Full-screen section with Three.js background */}
      <section
        id="chat-demo"
        className="relative w-full h-screen bg-black text-white overflow-hidden"
        role="banner"
      >
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <GenerativeArtScene />
        </Suspense>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent z-10 pointer-events-none" />

        {/* Content — centered over animation */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div
            className="max-w-3xl animate-fade-in-long cursor-default"
            onMouseEnter={() => setTextHovered(true)}
            onMouseLeave={() => setTextHovered(false)}
            style={{ transition: 'filter 0.4s ease' }}
          >
            <p
              className="text-4xl md:text-6xl font-bold leading-tight mb-8"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                filter: textHovered
                  ? 'drop-shadow(0 0 30px rgba(255,48,48,0.8)) drop-shadow(0 0 60px rgba(255,48,48,0.4)) brightness(1.4)'
                  : 'drop-shadow(0 0 8px rgba(255,48,48,0.2)) brightness(1)',
                transition: 'filter 0.4s ease',
              }}
            >
              <span style={{ color: "#ECECEC" }}>
                Some Voices
              </span>
              <br />
              <span style={{ color: "#FF3030" }}>
                Never Go Silent.
              </span>
            </p>
            <Button
              variant="default"
              size="lg"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle size={18} />
              Talk to Marcus
            </Button>
          </div>
        </div>
      </section>

      {/* Floating chat widget — bottom-right corner */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]"
          style={{ animation: "fadeUp 0.3s ease forwards" }}
        >
          <ChatWidget onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Floating toggle button (when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 hover:scale-110"
          style={{
            background: "#FF3030",
            boxShadow: "0 0 20px rgba(255,48,48,0.5), 0 0 60px rgba(255,48,48,0.2)",
          }}
          aria-label="Open EchoSoul chat"
        >
          <MessageCircle size={22} />
        </button>
      )}
    </>
  );
}
