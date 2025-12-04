"use client";

import { useState, useEffect, useRef } from "react";

export default function NightSkyPage() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"intro" | "gallery" | "question" | "poem">(
    "intro"
  );

  const ourPictures = [
    {
      src: "/images/maj (2).jpg",
      caption: "Behold, our souls entwined beneath celestial fires ⚡",
    },
    {
      src: "/images/maj (3).jpg",
      caption: "Every heartbeat, a verse in our timeless sonnet 🕊️",
    },
    {
      src: "/images/maj (4).jpg",
      caption: "Laughter echoing like trumpets of destiny 🎺",
    },
  ];

  const herPictures = [
    {
      src: "/images/maj (5).jpg",
      caption: "Your smile ignites galaxies unseen 🌌",
    },
    {
      src: "/images/maj (6).jpg",
      caption: "A glance from you, and kingdoms tremble 💜",
    },
    {
      src: "/images/maj (7).jpg",
      caption: "Our hearts duel in harmonious rhythm 💖",
    },
    {
      src: "/images/maj (8).jpg",
      caption: "Eyes guiding ships lost at sea ⭐",
    },
    {
      src: "/images/maj (9).jpg",
      caption: "Whispers of love under the moon's watch 🌙",
    },
    { src: "/images/maj (10).jpg", caption: "Moments carved into eternity 💛" },
  ];

  const allPictures = [...ourPictures, ...herPictures];
  const itemCount = allPictures.length;

  const carouselRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startAngle = useRef(0);

  // Auto-spin
  useEffect(() => {
    if (dragging) return;
    const interval = setInterval(() => setAngle((prev) => prev + 0.2), 16);
    return () => clearInterval(interval);
  }, [dragging]);

  const startDrag = (clientX: number) => {
    setDragging(true);
    startX.current = clientX;
    startAngle.current = angle;
  };

  const dragMove = (clientX: number) => {
    if (!dragging) return;
    const deltaX = clientX - startX.current;
    setAngle(startAngle.current + deltaX * 0.5);
  };

  const endDrag = () => setDragging(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => dragMove(e.clientX);
    const onMouseUp = () => endDrag();
    const onTouchMove = (e: TouchEvent) => dragMove(e.touches[0].clientX);
    const onTouchEnd = () => endDrag();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03041a] font-sans text-zinc-50 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      {/* Stars */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: 70 }).map((_, i) => (
          <div
            key={i}
            className={`star star-${i % 6} absolute`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 90}%`,
              transform: `scale(${0.6 + Math.random() * 1.4})`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <div className="clouds pointer-events-none absolute inset-0 z-[1]">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Intro */}
      {step === "intro" && (
        <main className="relative z-10 flex flex-col items-center w-full max-w-md">
          <div className="scroll-frame p-6 sm:p-8 rounded-3xl bg-[#0c0c1a] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-yellow-100 text-center">
              Our Story
            </h1>
            <p className="text-sm sm:text-lg text-white/80 leading-relaxed text-center">
              Under the quiet night sky, our paths first crossed. Stars above
              twinkled like our hearts, setting the stage for a story that would
              last a lifetime.
            </p>
            <svg
              className="w-full h-6 sm:h-8"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0 10 Q50 0 100 10 T200 10"
                stroke="#FFD700"
                strokeWidth="2"
                fill="transparent"
              />
            </svg>
            <p className="text-sm sm:text-md text-yellow-200 italic text-center">
              “Look around, look around at how lucky we are to be alive right
              now.” — Hamilton
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-full bg-yellow-300/10 px-6 py-3 text-sm font-medium text-yellow-200 transition hover:scale-[1.02] hover:bg-yellow-300/20"
            >
              Continue
            </button>
          </div>
        </main>
      )}

      {/* Name Modal */}
      {showModal && step === "intro" && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60">
          <div className="mx-4 w-full max-w-md rounded-xl bg-[#081025] p-6 shadow-2xl">
            <h2 className="mb-2 text-lg font-semibold">Enter your name</h2>
            <p className="mb-4 text-sm text-white/70">
              (This will be used to confirm your identity, this story is for
              Maji)
            </p>
            <input
              id="nameInput"
              type="text"
              placeholder="Type your name..."
              className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-white outline-none placeholder:text-white/40"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md px-4 py-2 text-sm text-white/80 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = (
                    document.getElementById("nameInput") as HTMLInputElement
                  ).value;
                  if (input.trim().toLowerCase() === "maji") {
                    setStep("gallery");
                    setShowModal(false);
                  } else {
                    alert("This story is only for Maji 💛");
                  }
                }}
                className="rounded-full bg-yellow-300/10 px-4 py-2 text-sm font-medium text-yellow-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D Gallery */}
      {step === "gallery" && (
        <main className="relative z-10 flex flex-col items-center w-full min-h-screen px-4 sm:px-6 py-12 overflow-hidden bg-[#0b0015]">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center tracking-wide text-yellow-100">
            ✨ The Secret Chronicle ✨
          </h1>

          <div
            className="relative w-full max-w-4xl h-80 sm:h-96 perspective cursor-grab"
            onMouseDown={(e) => startDrag(e.clientX)}
            onTouchStart={(e) => startDrag(e.touches[0].clientX)}
          >
            <div
              ref={carouselRef}
              className="carousel absolute w-full h-full flex items-center justify-center"
              style={{ transform: `rotateY(${angle}deg)` }}
            >
              {allPictures.map((pic, i) => {
                const picAngle = i * (360 / itemCount);
                return (
                  <div
                    key={i}
                    className="carousel-item absolute w-48 sm:w-64 h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-yellow-400/30 transform transition-transform duration-500 hover:scale-105 hover:rotate-3"
                    style={{
                      transform: `rotateY(${picAngle}deg) translateZ(350px)`,
                      background: `url(${pic.src}) center/cover no-repeat`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 backdrop-blur-sm">
                      <p className="text-xs sm:text-sm italic font-semibold drop-shadow-md text-yellow-200">
                        {pic.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-12 w-full">
            <button
              className="rounded-full bg-yellow-300/10 px-6 py-3 text-sm font-medium text-yellow-200 hover:scale-[1.02]"
              onClick={() => setStep("question")}
            >
              See What's Next..
            </button>
          </div>
        </main>
      )}

      {/* Question */}
      {step === "question" && (
        <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 sm:px-6 py-12">
          <div className="p-8 rounded-3xl bg-[#0c0c1a] border border-white/10 shadow-xl text-center max-w-md">
            <h2 className="text-2xl sm:text-3xl text-yellow-100 mb-4">
              Will you be my GrilFriend?
            </h2>
            <div className="flex justify-center gap-6 mt-6">
              <button
                className="rounded-full bg-yellow-300/10 px-6 py-3 text-yellow-200 hover:bg-yellow-300/20"
                onClick={() => setStep("poem")}
              >
                Yes
              </button>
              <button
                className="rounded-full bg-yellow-300/10 px-6 py-3 text-yellow-200 hover:bg-yellow-300/20"
                onClick={() => alert("wow oya na 💛")}
              >
                No
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Poem + Spotify */}
      {step === "poem" && (
        <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 sm:px-6 py-12 text-center">
          <div className="p-8 rounded-3xl bg-[#0c0c1a] border border-white/10 shadow-xl max-w-lg">
            <h2 className="text-3xl text-yellow-100 mb-6">
              A Poem for Maji 💛
            </h2>
            <p className="text-yellow-200 italic mb-6">
              Under the silent night, our hearts beat in rhyme,
              <br />
              Stars whisper secrets, suspended in time.
              <br />
              Each glance, a melody, each touch, a song,
              <br />
              With you, my love, is where I belong.
            </p>
            <a
              href="https://open.spotify.com/playlist/5Mga87ypeHjRv4hbAokbnz?si=x5JCFMIZSLeB9U0ukNnHeQ&pt=8bfa9ea4752be4ea7dddaac060ab0dc7&pi=rM9pkocYT2ON8"
              target="_blank"
              className="inline-block mt-4 px-6 py-3 bg-yellow-300/10 text-yellow-200 rounded-full hover:bg-yellow-300/20 transition"
            >
              Listen on Spotify
            </a>
          </div>
        </main>
      )}

      {/* Global styles */}
      <style jsx global>{`
        .perspective {
          perspective: 1200px;
        }
        .carousel {
          transform-style: preserve-3d;
        }
        .carousel-item {
          backface-visibility: hidden;
        }
        .star {
          width: 2px;
          height: 2px;
          border-radius: 9999px;
          background: radial-gradient(circle at 30% 30%, #fff, #ffd);
          opacity: 0.95;
        }
        .star-0 {
          animation: twinkle 4s linear infinite;
        }
        .star-1 {
          animation: twinkle 3.2s linear infinite;
        }
        .star-2 {
          animation: twinkle 5.2s linear infinite;
        }
        .star-3 {
          animation: twinkle 2.6s linear infinite;
        }
        .star-4 {
          animation: twinkle 6s linear infinite;
        }
        .star-5 {
          animation: twinkle 4.8s linear infinite;
        }
        @keyframes twinkle {
          0% {
            opacity: 0.05;
            transform: scale(0.6);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
          60% {
            opacity: 0.2;
            transform: scale(0.9);
          }
          100% {
            opacity: 0.05;
            transform: scale(0.6);
          }
        }
        .cloud {
          position: absolute;
          left: -40%;
          width: 140%;
          height: 260px;
          background: radial-gradient(
            circle at 40% 40%,
            rgba(255, 255, 255, 0.25),
            rgba(180, 200, 255, 0.08),
            transparent
          );
          opacity: 0.22;
          filter: blur(40px) brightness(1.5);
          border-radius: 999px;
          animation: cloudMove 65s linear infinite;
        }
        .cloud-1 {
          top: 12%;
          animation-duration: 75s;
          opacity: 0.3;
        }
        .cloud-2 {
          top: 38%;
          animation-duration: 95s;
          opacity: 0.18;
        }
        .cloud-3 {
          top: 62%;
          animation-duration: 85s;
          opacity: 0.22;
        }
        @keyframes cloudMove {
          0% {
            transform: translateX(-30%) scale(1);
          }
          50% {
            transform: translateX(50%) scale(1.05);
          }
          100% {
            transform: translateX(130%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
