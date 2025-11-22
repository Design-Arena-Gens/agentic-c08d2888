"use client";

import { useMemo, useState, useEffect } from "react";

type Fact = {
  title: string;
  narration: string;
  flair: string;
  icon: string;
  color: string;
};

const facts: Fact[] = [
  {
    title: "Super Sloth Breath",
    narration:
      "Did you know sloths can hold their breath longer than dolphins? They can stay submerged for up to 40 minutes underwater!",
    flair: "🦥💦",
    icon: "🌊",
    color: "linear-gradient(135deg, rgba(14,165,233,0.95), rgba(59,130,246,0.9))"
  },
  {
    title: "Highway to the Moon",
    narration:
      "If you could drive a car straight up, it would only take you one hour to reach the moon!",
    flair: "🚗🌕",
    icon: "🚀",
    color: "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(244,114,182,0.9))"
  },
  {
    title: "Bee Face ID",
    narration:
      "Bees can recognize human faces! They have the ability to remember and identify individual faces, just like us!",
    flair: "🐝",
    icon: "🧠",
    color: "linear-gradient(135deg, rgba(34,197,94,0.95), rgba(13,148,136,0.9))"
  },
  {
    title: "Pistol Shrimp Punch",
    narration:
      "Did you know some shrimp can punch with the speed of a bullet? They create shockwaves that can break glass!",
    flair: "💥",
    icon: "🦐",
    color: "linear-gradient(135deg, rgba(248,113,113,0.95), rgba(251,191,36,0.9))"
  }
];

const narratorLineUp = [
  "Ready to have your mind blown?",
  "Let’s dive into some insane facts!"
];

export default function HomePage() {
  const [revealed, setRevealed] = useState<boolean[]>(Array(facts.length).fill(false));
  const [lineIndex, setLineIndex] = useState(-1);
  const [isOutroVisible, setOutroVisible] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    narratorLineUp.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setLineIndex(index);
        }, index * 2200)
      );
    });

    facts.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setRevealed(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, 4600 + index * 2600)
      );
    });

    timers.push(
      setTimeout(() => {
        setOutroVisible(true);
      }, 4600 + facts.length * 2600 + 800)
    );

    timers.push(
      setTimeout(() => {
        setComplete(true);
      }, 4600 + facts.length * 2600 + 2100)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [cycle]);

  const progress = useMemo(() => {
    const shown = revealed.filter(Boolean).length;
    return Math.round((shown / facts.length) * 100);
  }, [revealed]);

  return (
    <main className="presentation">
      <span className="noise-overlay" aria-hidden />
      <section className="hero">
        <div className="narrator-tag">
          <span className="narrator-dot" />
          Narrator
        </div>
        <h1>Mind-Blowing Facts You Won’t Believe!</h1>
        <p className="lead">Ready for a rapid-fire dose of reality-bending trivia?</p>
      </section>

      <section className="narration">
        {narratorLineUp.map((line, index) => (
          <p
            key={line}
            className={`narration-line ${lineIndex >= index ? "visible" : ""}`}
            aria-live="polite"
          >
            {line}
          </p>
        ))}
      </section>

      <section className="facts-grid" aria-live="polite">
        {facts.map((fact, index) => (
          <article
            key={fact.title}
            className={`fact-card ${revealed[index] ? "fact-card-visible" : ""}`}
            style={
              {
                "--accent": fact.color
              } as React.CSSProperties
            }
          >
            <header className="fact-header">
              <span className="icon">{fact.icon}</span>
              <h2>{fact.title}</h2>
            </header>
            <p className="narration-body">
              <span className="narrator-label">Narrator:</span> {fact.narration}{" "}
              <span className="flair">{fact.flair}</span>
            </p>
            <div className="card-glow" aria-hidden />
          </article>
        ))}
      </section>

      <section className={`outro ${isOutroVisible ? "outro-visible" : ""}`}>
        <div className="outro-text">
          <span className="outro-pop">Mind Blown? 🤣</span>
          <p>
            Which fact blew your mind the most? Drop your favorite in the comments and don’t
            forget to follow for more crazy facts!
          </p>
        </div>
        <button
          type="button"
          className="replay"
          onClick={() => {
            setRevealed(Array(facts.length).fill(false));
            setOutroVisible(false);
            setComplete(false);
            setLineIndex(-1);
            setCycle(prev => prev + 1);
          }}
        >
          Replay
        </button>
      </section>

      <footer className="footer">
        <div className="progress">
          <span className="progress-label">Fact Drop Progress</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-value">{progress}%</span>
        </div>
        <div className={`end-screen ${isComplete ? "end-screen-visible" : ""}`}>
          <span>Thanks for watching!</span>
        </div>
      </footer>
    </main>
  );
}
