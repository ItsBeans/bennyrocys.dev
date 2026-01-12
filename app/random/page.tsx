'use client';

import Header from "../Header";
import { DockDemo } from "../Footer2";
import ChessStatsCard from "../components/ChessStatsCard";
import LeagueLiveCard from "../components/LeagueLiveCard";
import NowPlaying from "../components/NowPlaying";
import { motion } from "framer-motion";

export default function Random() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow max-w-3xl mx-auto p-12 w-full">
        <h1 className="text-6xl font-bold text-gray-700 dark:text-white italic mb-4">
          random
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 italic">
          random bits and pieces.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Live Feeds & Gaming */}
          <div className="space-y-12">
            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">Now Listening</h3>
              <NowPlaying />
            </section>

            <section className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">Gaming Stats</h3>
              <ChessStatsCard username={"bennyhahahaha"} />
              <LeagueLiveCard summonerName={"raon"} tagline={"lmao"} />
            </section>
          </div>

          {/* Right Column: Personality & Interests */}
          <div className="space-y-12">
             <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">Raon (The Cat)</h3>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="/raon.jpeg"
                  alt="Raon the cat"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <p className="text-xs text-gray-400 mt-4 italic text-center">
                professional nap taker
              </p>
            </section>

           
          </div>
        </div>
      </main>

      <footer className="pb-12">
        <DockDemo />
      </footer>
    </div>
  );
}