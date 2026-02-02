'use client';

import { useEffect, useState } from 'react';
import { Loader2, Trophy, Target, Sword } from 'lucide-react';

type ChessStats = {
  rapid: number | null;
  puzzle: number | null;
};

export default function ChessStatsCard({ username }: { username: string }) {
  const [stats, setStats] = useState<ChessStats>({ rapid: null, puzzle: null });
  const [loading, setLoading] = useState(true);

  const goalRating = 1000;
  const favOpening = "London System";

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
        const data = await res.json();
        setStats({
          rapid: data.chess_rapid?.last?.rating ?? null,
          puzzle: data.tactics?.highest?.rating ?? null,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [username]);

  const progress = stats.rapid ? Math.min(Math.round((stats.rapid / goalRating) * 100), 100) : 0;

  return (
    <a 
      href={`https://www.chess.com/member/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-sm group cursor-pointer"
    >
      <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Chess.com</h2>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Live Stats" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 text-gray-400 text-sm gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-800 dark:text-white leading-none">
                {stats.rapid ?? '---'}
              </span>
              <span className="text-xs font-medium text-gray-400 pb-1">Rapid ELO</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-tighter text-gray-500">
                <span>Goal: {goalRating}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gray-700 dark:bg-gray-300 transition-all duration-1000" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400">
                  <Target className="w-3 h-3" /> Puzzles
                </span>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{stats.puzzle ?? 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400">
                  <Sword className="w-3 h-3" /> Fav Opening
                </span>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">{favOpening}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </a>
  );
}