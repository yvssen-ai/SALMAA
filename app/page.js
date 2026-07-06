"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
});

const LETTER_TEXT =
  'Happy Birthday Salomtyy , Sorry baby im not the best one to make birthday surprises so i made what im good at , I was hoping that we spend your birthday together but because you are "عاجزة" We can’t do that but i hope you get well soon baby. TBH you are the most unexpected thing that happend in my whole life but at the same time there is nothing better than meeting you i hope we stick together till the end , I just wanna u to know that your the most perfect girl in the whole world and im so lucky to have you baby... Enjoy your Birthday Saloma, Love u Babyy Mwaaaaah';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [gameIntro, setGameIntro] = useState(false);

  const [answeredYes, setAnsweredYes] = useState(false);
  const [readyForBigQuestion, setReadyForBigQuestion] = useState(false);
  const [showArabicPage, setShowArabicPage] = useState(false);
  const [showLetterPage, setShowLetterPage] = useState(false);
  const [showLovePage, setShowLovePage] = useState(false);
  const [showLetterIntro, setShowLetterIntro] = useState(false);
  const [showLetterLoading, setShowLetterLoading] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  // ⭐ rating system
  const [rating, setRating] = useState(5);
  const [ratingLocked, setRatingLocked] = useState(false);

  const [typedText, setTypedText] = useState("");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setNoPos({ x: 0, y: 0 });
  }, [
    started,
    gameIntro,
    answeredYes,
    readyForBigQuestion,
    showArabicPage,
    showLetterPage,
    showLovePage,
    showLetterIntro,
    showLetterLoading,
    showLetter,
  ]);

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    setNoPos({ x, y });
  };

  const handleYes = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });

    setAnsweredYes(true);
  };

  useEffect(() => {
    if (!showLetterLoading) return;

    const timeout = setTimeout(() => {
      setShowLetter(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showLetterLoading]);

  useEffect(() => {
    if (!showLetter) return;

    let i = 0;
    setTypedText("");

    const interval = setInterval(() => {
      i++;
      setTypedText(LETTER_TEXT.slice(0, i));

      if (i >= LETTER_TEXT.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [showLetter]);

  const submitRating = () => {
    setRatingLocked(true);

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center bg-pink-100 overflow-hidden ${lobster.className}`}
    >
      {/* 🎂 START PAGE */}
      {!started ? (
        <>
          <h1 className="text-7xl text-pink-500 text-center">
            Happy Birthday Salomtyyy ❤️
          </h1>

          <button
            onClick={() => setStarted(true)}
            className="mt-10 bg-pink-500 text-white px-8 py-4 rounded-xl"
          >
            Start 🎂
          </button>
        </>
      ) : !gameIntro ? (
        <>
          <h1 className="text-3xl text-pink-600 text-center px-6">
            Since it's your birthday and we aren't together so we will play a game.
          </h1>

          <h2 className="text-2xl text-pink-500 mt-4 text-center animate-pulse">
            ARE U READY? ❤️
          </h2>

          <button
            onClick={() => setGameIntro(true)}
            className="mt-10 bg-pink-500 text-white px-8 py-4 rounded-xl"
          >
            Yes ❤️
          </button>
        </>
      ) : answeredYes ? (
        !readyForBigQuestion ? (
          <>
            {/* ❤️ HAPPY PAGE */}
            <h1 className="text-5xl text-pink-600 text-center">
              ❤️ You just made me the happiest person , Mwaaaah❤️
            </h1>

            <p className="text-3xl text-pink-600 text-center mt-4">
              Happy Birthday again, my love 🎂✨
            </p>

            <button
              onClick={() => setReadyForBigQuestion(true)}
              className="mt-10 bg-pink-500 text-white px-8 py-4 rounded-xl"
            >
              Continue ➡️
            </button>
          </>
        ) : !showArabicPage ? (
          <>
            {/* ⭐ RATING PAGE (FIXED POSITION) */}
            <h1 className="text-3xl text-pink-600 text-center">
              How would u rate me as a Boyfriend? ❤️
            </h1>

            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              disabled={ratingLocked}
              onChange={(e) => setRating(e.target.value)}
              className="w-72 accent-pink-500 mt-6"
            />

            <div className="text-4xl mt-4 text-center text-pink-500 font-bold">
  {rating} / 10
</div>

            {!ratingLocked ? (
              <button
                onClick={submitRating}
                className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-xl"
              >
                Submit Rating ❤️
              </button>
            ) : (
              <p className="mt-4 text-pink-600 text-center">
                Thanks ❤️
              </p>
            )}

            <button
              onClick={() => setShowArabicPage(true)}
              className="mt-8 bg-green-500 text-white px-6 py-3 rounded-xl"
            >
              Continue ➡️
            </button>
          </>
        ) : !showLetterPage ? (
          <>
            {/* 🚀 BIG QUESTION PAGE */}
            <h1 className="text-4xl text-pink-600 text-center">
              Are you ready for the biggest question? ❤️
            </h1>

            <button
              onClick={() => setShowLetterPage(true)}
              className="mt-10 bg-pink-500 text-white px-8 py-4 rounded-xl"
            >
              Yes I’m Ready ❤️
            </button>
          </>
        ) : !showLovePage ? (
          <>
            {/* 💔 YES/NO PAGE */}
            <h1 className="text-6xl text-pink-600 text-center">
              بتحبيني؟
            </h1>

            <div className="flex gap-10 mt-10 relative">
              <button
                onClick={() => setShowLovePage(true)}
                className="bg-green-500 text-white px-6 py-3 rounded-xl"
              >
                Yes ❤️
              </button>

              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="bg-gray-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                }}
              >
                No 💔
              </button>
            </div>
          </>
        ) : !showLetterIntro ? (
          <>
            {/* ❤️ LOVE PAGE */}
            <h1 className="text-5xl text-pink-600 text-center px-6 animate-pulse">
              Mwaaaah, Love u more babyyyyyy
            </h1>

            <button
              onClick={() => setShowLetterIntro(true)}
              className="mt-10 bg-pink-500 text-white px-8 py-4 rounded-xl"
            >
              Continue ➡️
            </button>
          </>
        ) : !showLetterLoading ? (
          <>
            {/* 💌 LETTER INTRO PAGE */}
            <h1 className="text-5xl text-pink-600 text-center px-6">
              Since we aren't together, I Have Written a Letter For U
            </h1>

            <button
              onClick={() => setShowLetterLoading(true)}
              className="mt-10 bg-pink-500 text-white px-8 py-4 rounded-xl"
            >
              Open Letter ❤️
            </button>

            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              className="mt-4 bg-gray-700 text-white px-8 py-4 rounded-xl transition-all duration-300"
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              }}
            >
              Ignore me 😢
            </button>
          </>
        ) : !showLetter ? (
          <>
            {/* 💌 LOADING LETTER PAGE */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute h-32 w-32 rounded-full bg-pink-300 opacity-40 animate-ping"></div>

              <div className="relative text-7xl animate-bounce">
                💌
              </div>

              <h1 className="mt-8 text-5xl text-pink-600 text-center animate-pulse">
                Loading Ur Letter
              </h1>

              <div className="mt-6 flex gap-3">
                <span className="h-4 w-4 rounded-full bg-pink-500 animate-bounce"></span>
                <span className="h-4 w-4 rounded-full bg-pink-500 animate-bounce [animation-delay:0.15s]"></span>
                <span className="h-4 w-4 rounded-full bg-pink-500 animate-bounce [animation-delay:0.3s]"></span>
              </div>
            </div>
          </>
        ) : (
          /* 💌 LETTER PAGE */
          <div className="bg-white p-6 rounded-2xl text-center shadow-xl">
            <h1 className="text-pink-600 text-xl mb-4">
              💌 Saloma's Letter
            </h1>
            <p className="whitespace-pre-wrap text-gray-700">
              {typedText}
            </p>
          </div>
        )
      ) : (
        /* ❤️ FINAL QUESTION */
<>
  <h1 className="text-4xl text-pink-600 text-center">
    Firstly, Do you want me in your life? ❤️
  </h1>

  {/* NEW TEXT */}
  <h2 className="text-2xl text-pink-500 text-center mt-2 animate-pulse">
    Don't Try To Say NO...
  </h2>

  <div className="flex gap-10 mt-10 relative">
    
    <button
      onClick={handleYes}
      className="bg-green-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
    >
      Yes ❤️
    </button>

    <button
      onMouseEnter={moveNoButton}
      onClick={moveNoButton}
      className="bg-gray-700 text-white px-6 py-3 rounded-xl"
      style={{
        transform: `translate(${noPos.x}px, ${noPos.y}px) rotate(${noPos.x / 10}deg) scale(${1 - Math.abs(noPos.x) / 800})`,
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}
    >
      No 💔
    </button>

  </div>
</>
      )}
    </main>
  );
}