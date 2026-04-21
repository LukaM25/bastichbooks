export function HomeBookPoster() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(248,220,165,0.2),transparent_28%),linear-gradient(180deg,#62422b_0%,#70492f_24%,#5a3d29_100%)]">
      <div className="absolute inset-x-0 bottom-0 top-[26%] book-woodgrain opacity-90" />
      <div className="absolute left-[10%] top-[14%] h-[62%] w-[34%] rotate-[-8deg] rounded-[2rem] border border-white/18 bg-[linear-gradient(180deg,rgba(255,245,227,0.74),rgba(234,217,187,0.44))]" />
      <div className="absolute right-[8%] top-[12%] h-[68%] w-[74%] rounded-[3rem] border border-[#4d3926]/14 bg-[linear-gradient(180deg,rgba(245,235,218,0.96),rgba(231,218,194,0.92))] shadow-[0_24px_80px_rgba(24,13,7,0.4)]" />
      <div className="absolute left-[19%] top-[25%] h-[44%] w-[24%] rounded-[1.8rem] bg-[linear-gradient(180deg,#425137,#2a3522)] shadow-[0_20px_40px_rgba(15,9,4,0.32)]" />
      <div className="absolute left-[36%] top-[18%] h-[56%] w-[18%] rounded-[1.3rem] border border-[#6d5a46]/14 bg-white/36" />
      <div className="absolute right-[15%] top-[21%] h-[44%] w-[36%] rounded-[2rem] border border-[#6d5a46]/14 bg-white/40" />
      <div className="absolute right-[12%] top-[16%] h-[22%] w-[22%] rounded-full bg-[radial-gradient(circle,rgba(255,230,178,0.22),transparent_70%)] blur-2xl" />
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-[#23150d]/28 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#f7efdf] backdrop-blur">
        Das Archiv öffnet sich
      </div>
    </div>
  );
}
