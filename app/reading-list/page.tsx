'use client';

import React, { useState } from 'react';
import Header from "../Header";
import { DockDemo } from "../Footer2";
import { motion } from "framer-motion";
const CURRENTLY_READING = ["The Mythical Man-Month", "Ikigai", "The Brothers Karamazov"];

const BOOKS = [
  {
    title: "The Pragmatic Programmer",
    author: "Andy Hunt & Dave Thomas",
    category: "Software",
    summary: "Timeless wisdom on software craftsmanship."
  },
  {
    title: "Release It!",
    author: "Michael T. Nygard",
    category: "Software",
    summary: "Practical advice on designing systems that actually survive the chaos of production."
  },
  {
    title: "The Things You Can See Only When You Slow Down",
    author: "Haemin Sunim",
    category: "Philosophy",
    summary: "Gentle advice on finding peace by changing how your mind reacts to a busy world."
  },
  {
    title: "Physics and Philosophy",
    author: "Werner Heisenberg",
    category: "Science",
    summary: "Cool book about quantum theory and how it messes with how we think about reality."
  },
  {
    title: "Brief Answers to the Big Questions",
    author: "Stephen Hawking",
    category: "Science",    
    summary: "A legend talking about some huge questions, from the origin of the universe to the future of AI."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Growth",
    summary: "Simple, useful ideas for building better habits and actually doing the things you want to do."
  },
  {
    title: "The Vegetarian",
    author: "Han Kang",
    category: "Fiction",
    summary: "A Nobel-winning story about boundaries, nature, and the human condition."
  },
  {
    title: "Dopamine Nation",
    author: "Anna Lembke",
    category: "Science",
    summary: "Talks about the balance between pleasure and pain in an age of constant addiction."
  },
];

export default function Reading() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-12 text-left min-h-screen pb-28">
        <h1 className="text-6xl font-bold text-gray-700 dark:text-white italic mb-4">
          bookshelf
        </h1>
       

        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Currently Reading</p>
          <p className="text-gray-700 dark:text-gray-200">
            {CURRENTLY_READING.join(' • ')}
          </p>
        </div>

        <div className="space-y-12">
          {BOOKS.map((book, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
                x: 0 
              }}
              className="relative cursor-default border-l border-gray-200 dark:border-gray-800 pl-6 py-2 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 leading-tight">
                  {book.title}
                </h2>
                <span className="text-sm text-gray-400 font-mono mt-1 md:mt-0">
                  {book.category}
                </span>
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 mt-1 italic">
                by {book.author}
              </p>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredIndex === index ? "auto" : 0,
                  opacity: hoveredIndex === index ? 1 : 0 
                }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed max-w-xl">
                  {book.summary}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <DockDemo />
    </>
  );
}