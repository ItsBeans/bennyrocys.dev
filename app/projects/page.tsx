'use client';

import React, { useState } from 'react';
import Header from "../Header";
import { DockDemo } from '../Footer2';
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "natural language translation",
    category: "AI / ML",
    description: "Final year dissertation at King's. Fine-tuned and compared several transformer models to optimise translation accuracy.",
    url: "https://github.com/ItsBeans/translator",
  },
  {
    title: "beauty salon website",
    category: "Web Dev",
    description: "A high-performance, responsive site built for a local business using Next.js and Tailwind CSS.",
    url: "https://github.com/ItsBeans/beauty-site-v2",
  },
  {
    title: "student exam performance",
    category: "Data Science",
    description: "Analysing and predicting student exam outcomes using feature engineering and regression models.",
    url: "https://github.com/ItsBeans/student-exam-performance",
  },
  {
    title: "grocery shopping mobile app",
    category: "Mobile",
    description: "Barcode-scanning shopping assistant for seamless payments. Developed for a private grocery store client.",
    private: true,
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow max-w-3xl mx-auto p-12 text-left w-full pb-28">
        <h1 className="text-6xl font-bold text-gray-700 dark:text-white italic mb-4">
          projects
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-16">
          some stuff i have built.
        </p>

        <div className="space-y-12">
          {PROJECTS.map((project, index) => (
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
                  {project.url ? (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline decoration-gray-400 underline-offset-4"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h2>
                <div className="flex items-center gap-3 mt-1 md:mt-0">
                  {project.private && (
                    <span className="text-[10px] uppercase tracking-tighter text-gray-400 border border-gray-200 dark:border-gray-700 px-1.5 rounded">
                      Private
                    </span>
                  )}
                  <span className="text-sm text-gray-400 font-mono">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredIndex === index ? "auto" : 0,
                  opacity: hoveredIndex === index ? 1 : 0 
                }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed max-w-xl">
                  {project.description}
                </p>
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    className="inline-block mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors font-medium"
                  >
                    View Source Code →
                  </a>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </main>

      <DockDemo />
    </div>
  );
}