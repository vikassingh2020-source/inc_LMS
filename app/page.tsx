"use client"

import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

import { auth } from "@/lib/firebase"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  const login = async () => {

    const provider =
      new GoogleAuthProvider()

    try {

      await signInWithPopup(
        auth,
        provider
      )

      router.push("/dashboard")

    } catch (error) {

      console.error(error)
    }
  }

  return (

    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white overflow-hidden">

      <style jsx global>{`

      @keyframes rotateRing {

  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }

}

@keyframes orbGlow {

  0% {
    box-shadow:
      0 0 30px rgba(56,189,248,0.4);
  }

  50% {
    box-shadow:
      0 0 80px rgba(56,189,248,1);
  }

  100% {
    box-shadow:
      0 0 30px rgba(56,189,248,0.4);
  }

}

.mindos-ring {

  position: absolute;

  inset: -12px;

  border-radius: 9999px;

  border: 2px solid rgba(56,189,248,0.25);

  border-top-color: rgba(56,189,248,1);

  animation:
    rotateRing 12s linear infinite;
}

.mindos-core {

  animation:
    orbGlow 3s ease-in-out infinite;
}

        @keyframes glowPulse {

          0% {
            stroke-opacity: 0.2;
          }

          50% {
            stroke-opacity: 1;
          }

          100% {
            stroke-opacity: 0.2;
          }
        }

        @keyframes dataFlow {

  0% {
    stroke-dashoffset: 120;
  }

  100% {
    stroke-dashoffset: 0;
  }

}

.data-line {

  stroke: #38bdf8;
  stroke-width: 3;

  stroke-dasharray: 12 12;

  animation:
    dataFlow 2.5s linear infinite;

  filter: drop-shadow(
    0 0 6px rgba(56,189,248,0.8)
  );
}
           
       @keyframes orbGlow {

  0% {
    transform: scale(1);
    box-shadow:
      0 0 30px rgba(56,189,248,0.5),
      0 0 60px rgba(56,189,248,0.3);
  }

  50% {
    transform: scale(1.04);
    box-shadow:
      0 0 50px rgba(56,189,248,0.9),
      0 0 90px rgba(56,189,248,0.6);
  }

  100% {
    transform: scale(1);
    box-shadow:
      0 0 30px rgba(56,189,248,0.5),
      0 0 60px rgba(56,189,248,0.3);
  }
}

.animate-orbGlow {
  animation: orbGlow 3s ease-in-out infinite;
}

        @keyframes nodeFloat {

          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        .glow-line {

          stroke: #38bdf8;

          stroke-width: 3;

          animation:
            glowPulse 3s infinite;
        }

        .floating-node {

          animation:
            nodeFloat 4s ease-in-out infinite;
        }

      `}</style>

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}

        <div className="flex flex-col justify-center px-10 lg:px-20">

        <div className="flex items-center gap-4 mb-8">

  <div className="w-10 h-10 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.9)] animate-pulse lg:hidden" />

  <h1 className="text-5xl lg:text-7xl font-bold">
    MindOS
  </h1>

</div>

          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">

            An interactive learning platform designed
            to develop future-ready thinking skills.

            Students learn to adapt, solve problems,
            think critically, communicate clearly,
            and make better decisions through engaging
            video-based experiences.

          </p>

          <div className="mt-8 flex flex-wrap gap-2 max-w-xl">
  {[
    "Adaptability",
    "System Thinking",
    "Digital Intelligence",
    "Scientific Thinking",
    "+ More",
  ].map((skill) => (
    <div
      key={skill}
      className="px-3 py-2rounded-lg bg-slate-900/80 border border-slate-700 text-sm text-slate-200 shadow-sm">
      {skill}
    </div>
  ))}
</div>

          <button
            onClick={login}
            className="mt-10 bg-white text-black px-8 py-4 rounded-xl font-semibold w-fit hover:scale-105 transition"
          >
            Continue with Google
          </button>

        </div>

        {/* RIGHT SIDE */}

       <div className="relative hidden lg:flex items-center justify-center">

          <svg
            width="700"
            height="700"
            viewBox="0 0 700 700"
            className="absolute"
          >

            <line
              className="data-line"
              x1="350"
              y1="350"
              x2="350"
              y2="140"
            />

            <line
              className="data-line"
              x1="350"
              y1="350"
              x2="140"
              y2="350"
              style={{
                animationDelay: "0.5s"
              }}
            />

            <line
              className="data-line"
              x1="350"
              y1="350"
              x2="560"
              y2="350"
              style={{
                animationDelay: "1s"
              }}
            />

            <line
              className="data-line"
              x1="350"
              y1="350"
              x2="250"
              y2="560"
              style={{
                animationDelay: "1.5s"
              }}
            />

            <line
              className="data-line"
              x1="350"
              y1="350"
              x2="450"
              y2="560"
              style={{
                animationDelay: "2s"
              }}
            />

          </svg>

          {/* CENTER */}

         <div className="absolute flex flex-col items-center">

  <div className="relative w-40 h-40">

    <div className="mindos-ring" />

    <div
      className="absolute inset-0 rounded-full bg-white text-black flex items-center justify-center text-4xl font-bold mindos-core">
      MindOS
    </div>

  </div>

  <div className="mt-5 text-slate-400 text-center max-w-xs">
    Upgrade How Students Think
  </div>

</div>

          {/* TOP */}

          <SkillNode
            label="Adaptability"
            className="-translate-y-56"
          />

          {/* LEFT */}

          <SkillNode
            label="Communication"
            className="-translate-x-60"
          />

          {/* RIGHT */}

          <SkillNode
            label="Problem Solving"
            className="translate-x-60"
          />

          {/* BOTTOM LEFT */}

          <SkillNode
            label="Founder Mindset"
            className="-translate-x-32 translate-y-60"
          />

          {/* BOTTOM RIGHT */}

          <SkillNode
            label="Scientific Thinking"
            className="translate-x-32 translate-y-60"
          />

        </div>

      </div>

    </main>
  )
}

function SkillNode({
  label,
  className,
}: {
  label: string
  className: string
}) {

  return (

    <div
      className={`absolute floating-node ${className}`}
    >

      <div className="flex flex-col items-center">

        <div className="w-8 h-8 rounded-full bg-cyan-400 border border-cyan-200 shadow-[0_0_25px_rgba(56,189,248,0.9)] " />

        <div className="mt-3 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-sm font-medium backdrop-blur">
  {label}
</div>

      </div>

    </div>
  )
}