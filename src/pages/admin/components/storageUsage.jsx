import { useId } from "react";

export default function StorageUsage({ used = 12, total = 50 }) {
  const percent = Math.round((used / total) * 100);
  const maskId = useId().replace(/:/g, "");

  return (
    <div className="w-full max-w-155 rounded-xl bg-linear-to-r from-biru to-hijau p-6 text-white">
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-base font-semibold">Storage Usage</h2>
        <button
          aria-label="Menu"
          className="flex size-11.5 flex-col items-center justify-center gap-0.75 rounded-2xl bg-white/15"
        >
          <span className="size-1 rounded-full bg-white/85" />
          <span className="size-1 rounded-full bg-white/85" />
          <span className="size-1 rounded-full bg-white/85" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        {/* Ring */}
        <div className="relative mx-auto size-45 shrink-0">
          <svg viewBox="0 0 260 260" className="size-full" aria-hidden="true">
            <defs>
              <mask id={maskId}>
                <circle
                  cx="130"
                  cy="130"
                  r="112"
                  fill="none"
                  stroke="white"
                  strokeWidth="40"
                  pathLength="100"
                  strokeDasharray={`${percent} ${100 - percent}`}
                  transform="rotate(-90 130 130)"
                />
              </mask>
            </defs>

            {/* garis latar */}
            <circle
              cx="130"
              cy="130"
              r="112"
              fill="none"
              strokeWidth="24"
              pathLength="120"
              strokeDasharray="0.55 0.45"
              transform="rotate(-90 130 130)"
              className="stroke-white/35"
            />
            {/* garis progress */}
            <circle
              cx="130"
              cy="130"
              r="112"
              fill="none"
              strokeWidth="24"
              pathLength="120"
              strokeDasharray="0.55 0.45"
              transform="rotate(-90 130 130)"
              mask={`url(#${maskId})`}
              className="stroke-white"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-xl leading-none font-semibold">
              {percent}
              <span className="text-[22px] font-medium">%</span>
            </div>
            <div className="mt-3.5 font-medium">{used} MB</div>
            <div className="mt-1 text-[15px] text-white/55">
              out of {total}MB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
