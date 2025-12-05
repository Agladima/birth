"use client";

import { useEffect, useRef, useState } from "react";

export default function NightSkyPage() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"intro" | "gallery" | "poem" | "question">(
    "intro"
  );

  const musicRef = useRef<HTMLAudioElement | null>(null);

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

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startAngle = useRef(0);

  // --- AUTO SPIN (slower) ---
  useEffect(() => {
    if (dragging) return;
    // Slower rotation: 0.06 deg per tick (approx)
    const interval = setInterval(() => setAngle((prev) => prev + 0.06), 16);
    return () => clearInterval(interval);
  }, [dragging]);

  // --- Drag handlers (mouse + touch) ---
  const startDrag = (clientX: number) => {
    setDragging(true);
    startX.current = clientX;
    startAngle.current = angle;
  };

  const dragMove = (clientX: number) => {
    if (!dragging) return;
    const deltaX = clientX - startX.current;
    // sensitivity tuned for mobile and desktop
    setAngle(startAngle.current + deltaX * 0.35);
  };

  const endDrag = () => setDragging(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => dragMove(e.clientX);
    const onMouseUp = () => endDrag();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) dragMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => endDrag();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03041a] font-sans text-zinc-50">
      <audio ref={musicRef} loop>
        <source src="/music/imaji.mp3" type="audio/mpeg" />
      </audio>

      {/* STARS (z-0) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: 70 }).map((_, i) => (
          <div
            key={i}
            className={`star star-${i % 6} absolute`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 92}%`,
              transform: `scale(${0.6 + Math.random() * 1.4})`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* CLOUDS (z-1) */}
      <div className="clouds pointer-events-none absolute inset-0 z-10">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* CONTENT (z-20) */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* INTRO */}
        {step === "intro" && (
          <main className="max-w-md w-full flex flex-col items-center gap-6">
            <div className="w-full bg-[#0c0c1a]/90 rounded-3xl p-6 sm:p-8 border border-white/8 backdrop-blur-md shadow-xl text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold text-yellow-100">
                Our Story
              </h1>
              <p className="mt-3 text-sm sm:text-lg text-white/80">
                Under the quiet night sky, our paths first crossed. Stars above
                twinkled like our hearts, setting the stage for a story that
                would last a lifetime.
              </p>
              <svg
                className="w-full h-6 mt-4"
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
              <p className="mt-2 text-sm text-yellow-200 italic">
                “Look around, look around at how lucky we are to be alive right
                now.” — Hamilton
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="rounded-full bg-yellow-300/10 px-6 py-3 text-sm font-medium text-yellow-200 hover:scale-[1.02] transition"
            >
              Continue
            </button>
          </main>
        )}

        {/* MODAL */}
        {showModal && step === "intro" && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md bg-[#081025] rounded-xl p-6 shadow-2xl border border-white/6">
              <h2 className="text-lg font-semibold text-yellow-100">
                Enter your name
              </h2>
              <p className="text-sm text-white/70 mt-1">
                (This is just for Maji)
              </p>

              <input
                id="nameInput"
                type="text"
                placeholder="Type your name..."
                className="w-full mt-4 px-3 py-2 rounded-md bg-transparent border border-white/10 outline-none placeholder:text-white/40"
              />

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md text-white/80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const input =
                      (document.getElementById("nameInput") as HTMLInputElement)
                        ?.value || "";

                    if (input.toLowerCase() === "maji") {
                      musicRef.current?.play();
                      setShowModal(false);
                      setStep("gallery");
                    } else alert("Only for Maji 💛");
                  }}
                  className="px-4 py-2 rounded-full bg-yellow-300/10 text-yellow-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {step === "gallery" && (
          <main className="w-full max-w-4xl flex flex-col items-center gap-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-yellow-100">
              ✨ The Secret Chronicle ✨
            </h1>

            {/* carousel wrapper — transparent so stars show through */}
            <div
              className="relative w-full max-w-[860px] h-[360px] sm:h-[420px] perspective touch-none"
              onMouseDown={(e) => startDrag(e.clientX)}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
            >
              {/* carousel (transparent background) */}
              <div
                ref={carouselRef}
                className="carousel absolute inset-0 flex items-center justify-center"
                style={{ transform: `rotateY(${angle}deg)` }}
              >
                {allPictures.map((pic, i) => {
                  const picAngle = i * (360 / itemCount);

                  return (
                    <figure
                      key={i}
                      className="carousel-item absolute w-44 sm:w-56 md:w-64 h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-yellow-400/20 bg-transparent"
                      style={{
                        transform: `rotateY(${picAngle}deg) translateZ(320px)`,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {/* image */}
                      <img
                        src={pic.src}
                        alt={pic.caption}
                        className="w-full h-full object-cover"
                      />

                      {/* caption */}
                      <figcaption className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 text-xs sm:text-sm text-yellow-200 italic">
                        {pic.caption}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>

            {/* centralised button area */}
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setStep("poem")}
                className="rounded-full bg-yellow-300/10 px-6 py-3 text-yellow-200 hover:scale-[1.02] transition"
              >
                See What’s Next..
              </button>
            </div>
          </main>
        )}

        {/* POEM + SPOTIFY */}
        {step === "poem" && (
          <main className="w-full max-w-lg flex flex-col items-center gap-6">
            <div className="w-full bg-[#0c0c1a]/90 rounded-3xl p-6 sm:p-8 border border-white/8 shadow-xl text-center">
              <h2 className="text-3xl text-yellow-100 mb-4">For Imaji 💛</h2>
              <p className="text-yellow-200 italic mb-6">
                I’m thankful for all the right choices that led me to meet you.
                You bring so much light to my life. I cannot put into words how
                much joy your mere presence gives me. I love you so much and it
                sucks that I cannot get you anything. I hope this can stand in
                the gap until I can get you a gift.😭
                <br />
                Happy Birthday my Love.🎉💕
              </p>

              <a
                href="https://open.spotify.com/playlist/5Mga87ypeHjRv4hbAokbnz"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 px-6 py-3 bg-yellow-300/10 text-yellow-200 rounded-full hover:bg-yellow-300/20 transition"
              >
                Listen on Spotify
              </a>
            </div>

            <button
              onClick={() => setStep("question")}
              className="rounded-full bg-pink-500/10 px-6 py-3 text-pink-200 hover:scale-[1.02] transition"
            >
              One Last Thing...
            </button>
          </main>
        )}

        {/* FINAL QUESTION */}
        {step === "question" && (
          <main className="w-full max-w-md flex flex-col items-center justify-center gap-6">
            <div className="w-full bg-[#0c0c1a]/90 rounded-3xl p-8 border border-white/8 shadow-xl text-center">
              <h2 className="text-2xl sm:text-3xl text-yellow-100 mb-4">
                Will you be my Girlfriend?
              </h2>
              <div className="flex gap-4 justify-center mt-4">
                <button
                  className="rounded-full bg-yellow-300/10 px-6 py-3 text-yellow-200 hover:bg-yellow-300/20"
                  onClick={async () => {
                    try {
                      // Send Telegram notification
                      await fetch("/api/sendTelegramMessage", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          message: "Hello Ashi, Maji said YES💛",
                        }),
                      });

                      // Move to poem step
                      setStep("poem");
                    } catch (err) {
                      console.error("Telegram notification failed:", err);
                      setStep("poem"); // still proceed
                    }
                  }}
                >
                  Yes
                </button>

                <button
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget;
                    const x = Math.random() * 200 - 100;
                    const y = Math.random() * 100 - 50;
                    btn.style.transform = `translate(${x}px, ${y}px)`;
                  }}
                  onTouchStart={(e) => {
                    const btn = e.currentTarget;
                    const x = Math.random() * 200 - 100;
                    const y = Math.random() * 100 - 50;
                    btn.style.transform = `translate(${x}px, ${y}px)`;
                  }}
                  className="px-6 py-3 rounded-full bg-red-400/12 text-red-200 transition-transform duration-300"
                >
                  No
                </button>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        /* carousel perspective helper */
        .perspective {
          perspective: 1200px;
        }

        .carousel {
          transform-style: preserve-3d;
        }

        .carousel-item {
          backface-visibility: hidden;
          display: block;
          will-change: transform, opacity;
        }

        /* STARS */
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

        /* CLOUDS */
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

        /* small helpers */
        img {
          display: block;
        }
        /* ensure everything is visible on mobile */
        @media (max-width: 640px) {
          .carousel-item {
            width: 44vw !important;
            height: 56vw !important;
          }
        }
      `}</style>
    </div>
  );
}
