"use client";

import Link from "next/link";
import { useState } from "react";
import { useChildProgressPersistence } from "./child-progress-persistence";

type LetterOption = {
  letter: string;
  latin: string;
  word: string;
  hint: string;
};

type Round = {
  target: string;
  prompt: string;
  options: LetterOption[];
};

const rounds: Round[] = [
  {
    target: "Alif",
    prompt: "Tap the letter for Alif",
    options: [
      { letter: "ا", latin: "Alif", word: "Asad", hint: "Lion sound card" },
      { letter: "ب", latin: "Ba", word: "Bait", hint: "House picture card" },
      { letter: "ت", latin: "Ta", word: "Tuffah", hint: "Apple picture card" }
    ]
  },
  {
    target: "Ba",
    prompt: "Listen and choose Ba",
    options: [
      { letter: "ت", latin: "Ta", word: "Tamr", hint: "Dates basket" },
      { letter: "ب", latin: "Ba", word: "Bait", hint: "House picture card" },
      { letter: "ا", latin: "Alif", word: "Asad", hint: "Lion sound card" }
    ]
  },
  {
    target: "Ta",
    prompt: "Find the letter Ta",
    options: [
      { letter: "ب", latin: "Ba", word: "Bab", hint: "Door picture card" },
      { letter: "ا", latin: "Alif", word: "Arnab", hint: "Rabbit picture card" },
      { letter: "ت", latin: "Ta", word: "Tuffah", hint: "Apple picture card" }
    ]
  }
];

export function HurufIslandGame() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "complete">("idle");
  const [stars, setStars] = useState(0);
  const [coins, setCoins] = useState(0);
  const [audioPrompt, setAudioPrompt] = useState("Tap play to hear the next letter clue.");
  const { notice, saveWorldProgress } = useChildProgressPersistence();

  const round = rounds[roundIndex];

  function handlePlayPrompt() {
    if (!round) {
      setAudioPrompt("All letters finished. Time to collect your reward.");
      return;
    }

    setAudioPrompt(`Teacher says: ${round.target}. ${round.prompt}.`);
  }

  function handleAnswer(answer: string) {
    if (!round || status === "complete") {
      return;
    }

    setSelectedAnswer(answer);

    if (answer === round.target) {
      const nextStars = stars + 1;
      const nextCoins = coins + 10;
      setStars(nextStars);
      setCoins(nextCoins);

      const isFinalRound = roundIndex === rounds.length - 1;

      if (isFinalRound) {
        setStatus("complete");
        setAudioPrompt("Wonderful work. You matched every letter and unlocked your pearl badge.");
        void saveWorldProgress({
          completionKey: "huruf-island-complete",
          earnedStars: nextStars,
          earnedCoins: nextCoins,
          currentWorldKey: "huruf-island"
        });
        return;
      }

      setStatus("correct");
      setAudioPrompt(`Great job. ${answer} is correct. Tap next mission to continue.`);
      return;
    }

    setStatus("wrong");
    setAudioPrompt(`Almost there. ${answer} is not the target. Listen again and try once more.`);
  }

  function handleNextRound() {
    if (!round || roundIndex === rounds.length - 1) {
      setStatus("complete");
      return;
    }

    setRoundIndex((currentRound) => currentRound + 1);
    setSelectedAnswer(null);
    setStatus("idle");
    setAudioPrompt("Tap play to hear the next letter clue.");
  }

  function handleTryAgain() {
    setSelectedAnswer(null);
    setStatus("idle");
    setAudioPrompt("Tap play to hear the letter clue again.");
  }

  const progressWidth = `${(stars / rounds.length) * 100}%`;

  return (
    <main className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-sky/80 via-white to-mint/70 p-6 shadow-cloud md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">
              Huruf Island
            </p>
            <h1 className="text-4xl font-black text-ink md:text-5xl">
              Listen, tap, and match Arabic letters through quick game rounds.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/75">
              This first playable mission teaches Alif, Ba, and Ta with friendly prompts,
              big answer cards, and instant reward feedback.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePlayPrompt}
                className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
              >
                Play Teacher Voice
              </button>
              <Link
                href="/game/quiz-battle"
                className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink"
              >
                Finish With Quiz
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white/85 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Mission HUD</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-cream px-4 py-4">
                <p className="text-sm font-bold text-ink/55">Stars</p>
                <p className="mt-2 text-3xl font-black text-ink">{stars}</p>
              </div>
              <div className="rounded-3xl bg-cream px-4 py-4">
                <p className="text-sm font-bold text-ink/55">Coins</p>
                <p className="mt-2 text-3xl font-black text-ink">{coins}</p>
              </div>
              <div className="rounded-3xl bg-cream px-4 py-4">
                <p className="text-sm font-bold text-ink/55">Round</p>
                <p className="mt-2 text-3xl font-black text-ink">
                  {Math.min(roundIndex + 1, rounds.length)}/{rounds.length}
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-full bg-cream p-2">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-sun to-peach transition-all duration-300"
                style={{ width: progressWidth }}
              />
            </div>
            <p className="mt-4 rounded-[1.5rem] bg-mint/60 px-4 py-4 text-base font-bold text-ink">
              {audioPrompt}
            </p>
            {notice.message ? (
              <p
                className={`mt-3 rounded-[1.25rem] px-4 py-3 text-sm font-semibold ${
                  notice.tone === "error"
                    ? "bg-peach/80 text-ink"
                    : notice.tone === "success"
                      ? "bg-mint/80 text-ink"
                      : "bg-white/85 text-ink/75"
                }`}
              >
                {notice.message}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] bg-white/85 p-6 shadow-cloud">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
                Play Area
              </p>
              <h2 className="mt-2 text-3xl font-black text-ink">
                {round ? round.prompt : "Mission complete"}
              </h2>
            </div>
            <span className="rounded-full bg-sun px-4 py-2 text-sm font-bold text-ink">
              {status === "complete" ? "Reward Ready" : "Tap Answer"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {round?.options.map((option) => {
              const isSelected = selectedAnswer === option.latin;
              const isCorrect = isSelected && option.latin === round.target;
              const isWrong = isSelected && option.latin !== round.target;

              return (
                <button
                  key={`${round.target}-${option.latin}`}
                  type="button"
                  onClick={() => handleAnswer(option.latin)}
                  className={`rounded-[1.75rem] px-5 py-6 text-left transition-transform ${
                    isCorrect
                      ? "bg-mint shadow-cloud"
                      : isWrong
                        ? "bg-peach shadow-cloud"
                        : "bg-cream hover:-translate-y-1"
                  }`}
                >
                  <p className="text-5xl font-black text-ink">{option.letter}</p>
                  <p className="mt-4 text-2xl font-black text-ink">{option.latin}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{option.word}</p>
                  <p className="mt-2 text-sm font-semibold text-ink/55">{option.hint}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {status === "correct" ? (
              <button
                type="button"
                onClick={handleNextRound}
                className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
              >
                Next Mission
              </button>
            ) : null}
            {status === "wrong" ? (
              <button
                type="button"
                onClick={handleTryAgain}
                className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
              >
                Try Again
              </button>
            ) : null}
            {status === "complete" ? (
              <Link
                href="/game/rewards"
                className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
              >
                Collect Reward
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/85 p-6 shadow-cloud">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
            Learning Goals
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[1.5rem] bg-cream px-4 py-4">
              <p className="text-lg font-black text-ink">Tap the correct Arabic letter</p>
            </div>
            <div className="rounded-[1.5rem] bg-cream px-4 py-4">
              <p className="text-lg font-black text-ink">Listen and choose the correct letter</p>
            </div>
            <div className="rounded-[1.5rem] bg-cream px-4 py-4">
              <p className="text-lg font-black text-ink">Match letter with example word</p>
            </div>
            <div className="rounded-[1.5rem] bg-cream px-4 py-4">
              <p className="text-lg font-black text-ink">Earn 3 stars for the pearl badge</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
