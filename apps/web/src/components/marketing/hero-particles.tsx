"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

async function initParticles(engine: Parameters<typeof loadSlim>[0]) {
  await loadSlim(engine);
}

export function HeroParticles() {
  const options = useMemo(
    () => ({
      background: {
        color: "transparent"
      },
      detectRetina: true,
      fpsLimit: 60,
      fullScreen: {
        enable: false
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab" as const
          },
          resize: {
            enable: true
          }
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.32
            }
          }
        }
      },
        particles: {
        color: {
          value: ["#8fd3ff", "#ffd97d", "#9fe0b0", "#ffc3b5"]
        },
        links: {
          color: "#a8ddff",
          distance: 135,
          enable: true,
          opacity: 0.22,
          width: 1
        },
        move: {
          enable: true,
          outModes: {
            default: "out" as const
          },
          speed: 0.75
        },
        number: {
          density: {
            enable: true,
            width: 900,
            height: 520
          },
          value: 70
        },
        opacity: {
          value: {
            min: 0.22,
            max: 0.62
          }
        },
        shape: {
          type: "circle" as const
        },
        size: {
          value: {
            min: 1,
            max: 4
          }
        }
      }
    }),
    []
  );

  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        className="absolute inset-0"
        id="landing-hero-particles"
        options={options}
      />
    </ParticlesProvider>
  );
}
