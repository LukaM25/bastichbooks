import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BookShellProps = {
  rotationX: number;
  rotationY: number;
  isInteractive: boolean;
  children: ReactNode;
};

export function BookShell({
  rotationX,
  rotationY,
  isInteractive,
  children,
}: BookShellProps) {
  return (
    <div className="home-book-perspective mx-auto flex w-full max-w-[1380px] items-center justify-center">
      <div
        className={cn(
          "relative aspect-[1.52] w-full max-w-[1220px] transition-transform duration-300 ease-out will-change-transform",
          isInteractive ? "scale-[1.005]" : "scale-100",
        )}
        style={{
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute left-[4.5%] right-[4.5%] top-[12%] h-[78%] rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(30,16,8,0.22),transparent_72%)] blur-2xl" />

        <div className="absolute left-[6%] top-[8%] h-[82%] w-[41%] -rotate-[3deg] rounded-[2.4rem] bg-[linear-gradient(180deg,#445337,#2e3827)] shadow-[0_30px_70px_rgba(22,12,5,0.38)]" />
        <div className="absolute right-[6%] top-[8%] h-[82%] w-[41%] rotate-[3deg] rounded-[2.4rem] bg-[linear-gradient(180deg,#465638,#303b28)] shadow-[0_30px_70px_rgba(22,12,5,0.38)]" />

        <div className="absolute left-[8.5%] right-[8.5%] top-[5.5%] h-[88%] rounded-[2.7rem] border border-[#47331f]/18 bg-[linear-gradient(180deg,rgba(243,232,213,0.94),rgba(236,223,201,0.95))] shadow-[0_28px_80px_rgba(23,14,7,0.34)]">
          <div className="absolute inset-y-[3%] left-[49.25%] w-[1.5%] rounded-full bg-[linear-gradient(180deg,rgba(82,61,40,0.18),rgba(247,240,229,0.82),rgba(82,61,40,0.18))]" />
          <div className="absolute inset-y-[5%] left-[48.5%] w-[3%] rounded-full bg-[radial-gradient(circle,rgba(115,91,62,0.18),transparent_70%)] blur-sm" />
          <div className="absolute inset-y-[2.5%] left-[2.7%] w-[2.6%] rounded-l-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(207,191,166,0.5))]" />
          <div className="absolute inset-y-[2.5%] right-[2.7%] w-[2.6%] rounded-r-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(207,191,166,0.5))]" />

          <div className="grid h-full grid-cols-2 gap-0 p-[2.2%]">{children}</div>
        </div>

        <div className="absolute left-[4.2%] top-[16%] h-[66%] w-[3.2%] rounded-l-[1.5rem] bg-[linear-gradient(180deg,#293020,#516143,#2c3522)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
        <div className="absolute right-[4.2%] top-[16%] h-[66%] w-[3.2%] rounded-r-[1.5rem] bg-[linear-gradient(180deg,#293020,#516143,#2c3522)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
      </div>
    </div>
  );
}
