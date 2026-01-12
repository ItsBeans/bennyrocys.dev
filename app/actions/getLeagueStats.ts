'use server';

export async function getLeagueStats() {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) return { success: false };

  try {
    const options = { headers: { "X-Riot-Token": apiKey } };
    
    const accountRes = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/raon/lmao`,
      options
    );
    const { puuid } = await accountRes.json();

    const leagueRes = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      { ...options, next: { revalidate: 300 } }
    );
    
    const leagueData = await leagueRes.json();
    const soloQ = Array.isArray(leagueData) 
      ? leagueData.find((e: any) => e.queueType === 'RANKED_SOLO_5x5') 
      : null;

    if (!soloQ) return { rank: "Unranked", success: true };

    
    const tierValue: { [key: string]: number } = { 'IV': 0, 'III': 100, 'II': 200, 'I': 300 };
    const currentProgressPoints = (tierValue[soloQ.rank] || 0) + soloQ.leaguePoints;
    
   
    const progressToDiamond = Math.min(Math.round((currentProgressPoints / 400) * 100), 100);

    return {
      rank: soloQ.tier.charAt(0) + soloQ.tier.slice(1).toLowerCase(),
      tier: soloQ.rank,
      lp: soloQ.leaguePoints,
      wins: soloQ.wins,
      losses: soloQ.losses,
      progress: progressToDiamond,
      success: true
    };
  } catch (error) {
    return { success: false };
  }
}