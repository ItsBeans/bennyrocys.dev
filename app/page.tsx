'use client';

import React, { useState } from 'react';
import Header from './Header';
import { DockDemo } from './Footer2';
import WordRotate from '@/components/ui/word-rotate';

// Replace with your current public playlist ID from Spotify (Share → Embed playlist)
const SPOTIFY_PLAYLIST_ID = '3MsFaIs8y5Ab86JJEXEmEJ';

export default function Home() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-12 text-left pb-28">
        <WordRotate
          className="text-8xl text-gray-700 dark:text-white"
          words={["hello", "안녕하세요", "你好", "こんにちは", "bonjour", "ciao"]}
        />
        
        <div className="flex flex-col md:flex-row md:space-x-8 md:gap-12 mt-8">
          <div className="flex-grow mb-8 md:mb-0 md:w-3/5">
            <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
              <p>
                my name is Benny.
              </p>
              
              <p>
                i'm a 22-year-old software engineer based in <span className="font-semibold text-gray-700 dark:text-gray-300">London</span>.
                <br />
                i'm currently working at <span className="font-semibold text-gray-700 dark:text-gray-300">Fifty One Degrees</span>.
              </p>

              <p>
                i recently completed my undergrad degree in <span className="font-semibold text-gray-700 dark:text-gray-300">Computer Science with AI</span> at <span className="font-semibold text-gray-700 dark:text-gray-300">King's College London</span>.
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>i'm really interested in <span className="font-semibold text-gray-700 dark:text-gray-300">machine learning</span></li>
                <li>i enjoy <span className="font-semibold text-gray-700 dark:text-gray-300">video games</span>, <span className="font-semibold text-gray-700 dark:text-gray-300">music</span>, <span className="font-semibold text-gray-700 dark:text-gray-300">chess</span>, and <span className="font-semibold text-gray-700 dark:text-gray-300">eating good food</span>.</li>
              </ul>

              <p className="mt-4">
                long term, i want to build something <span className="font-semibold text-gray-700 dark:text-gray-300">cool and impactful</span> :)
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-2/5">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              my current work playlist.
            </p>
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300 rounded-full animate-spin" />
                </div>
              )}
              <iframe
                src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator`}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
                title="Spotify playlist"
              />
            </div>
          </div>
        </div>
      </div>
      <DockDemo />
    </>
  );
}