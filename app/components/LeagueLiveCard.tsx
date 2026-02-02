'use client';

import { useEffect, useState } from 'react';
import { Loader2, Target, Sword, Trophy } from 'lucide-react';
import { getLeagueStats } from '../actions/getLeagueStats';

export default function LeagueLiveCard({ summonerName, tagline }: { summonerName: string; tagline: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRank() {
      const stats = await getLeagueStats();
      if (stats.success) setData(stats);
      setLoading(false);
    }
    fetchRank();
  }, []);

  const getRankColor = (rank: string) => {
    const r = rank?.toLowerCase() || '';
    if (r.includes('emerald')) return 'text-emerald-500';
    if (r.includes('diamond')) return 'text-blue-500';
    if (r.includes('platinum')) return 'text-cyan-500';
    return 'text-emerald-500';
  };

  const totalGames = data ? data.wins + data.losses : 0;
  const winRate = totalGames > 0 ? Math.round((data!.wins / totalGames) * 100) : 0;
  const rankColor = getRankColor(data?.rank);

  return (
    <a 
      href={`https://www.op.gg/summoners/euw/${summonerName}-${tagline}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-sm group cursor-pointer"
    >
      <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-gray-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Live League Rank</h2>
          </div>
          <div className={`h-2 w-2 rounded-full animate-pulse ${data ? 'bg-green-500' : 'bg-gray-300'}`} title="Live Stats" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 text-gray-400 text-sm gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
          </div>
        ) : !data?.rank ? (
          <p className="py-8 text-center text-sm text-gray-400">Rank unavailable</p>
        ) : (
          <div className="space-y-6">
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-bold leading-none ${rankColor}`}>
                {data.rank}
              </span>
              {data.tier != null && (
                <span className="text-xl font-bold text-gray-400 pb-0.5">{data.tier}</span>
              )}
            </div>
            {data.tier != null && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400">
                    LP Points
                  </span>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{data.lp} LP</p>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400">
                    Win Rate
                  </span>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{winRate}%</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </a>
  );
}