interface ScoreRingProps {
  score: number;
  color: string;
  grade: string;
  level: string;
}

export function ScoreRing({ score, color, grade, level }: ScoreRingProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="16"
            className="text-muted/20"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold tabular-nums" style={{ color }}>
            {score}
          </span>
          <span className="text-muted-foreground text-xs">de 100</span>
          <span className="mt-1 text-2xl font-bold" style={{ color }}>
            {grade}
          </span>
        </div>
      </div>
      <span
        className="rounded-full px-5 py-1 text-sm font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {level}
      </span>
    </div>
  );
}
