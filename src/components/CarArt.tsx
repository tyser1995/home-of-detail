// Stylized side-profile car illustration. `condition="before"` renders dull,
// swirled, dusty paint; `"after"` renders glossy, reflective paint.

type Props = {
  id: string;
  paint?: string;
  condition?: "before" | "after";
  className?: string;
  background?: boolean;
};

const BODY =
  "M60 270 L60 232 Q62 206 96 198 L232 184 Q282 131 342 119 L498 116 Q560 119 612 180 L702 192 Q742 198 746 232 L746 268 Q746 282 732 282 L690 282 A62 62 0 0 0 566 282 L250 282 A62 62 0 0 0 126 282 L74 282 Q60 282 60 270 Z";

// Deterministic pseudo-random dust specks so SSR and client markup match.
const DUST = Array.from({ length: 60 }, (_, i) => {
  const x = 80 + ((i * 137.5) % 640);
  const y = 130 + ((i * 89.3) % 145);
  const r = 0.8 + ((i * 7) % 5) * 0.35;
  return { x: Math.round(x), y: Math.round(y), r };
});

export function CarArt({ id, paint = "#0f3a5f", condition = "after", className = "", background = true }: Props) {
  const glossy = condition === "after";
  return (
    <svg viewBox="0 0 800 400" className={className} role="img" aria-label={glossy ? "Car with glossy, protected paint" : "Car with dull, swirled paint"}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={glossy ? "#0e1720" : "#16130f"} />
          <stop offset="0.72" stopColor={glossy ? "#0a0f15" : "#120f0c"} />
          <stop offset="1" stopColor="#050709" />
        </linearGradient>
        <radialGradient id={`${id}-spot`} cx="0.5" cy="0.15" r="0.7">
          <stop offset="0" style={{ stopColor: glossy ? "var(--color-accent, #2ec5e6)" : "#8a7356" }} stopOpacity={glossy ? 0.28 : 0.12} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={paint} stopOpacity="1" />
          <stop offset="0.55" stopColor={paint} />
          <stop offset="1" stopColor="#000" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={glossy ? "#5b7c95" : "#3a3a36"} />
          <stop offset="1" stopColor={glossy ? "#0b1622" : "#1a1916"} />
        </linearGradient>
        <radialGradient id={`${id}-rim`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor={glossy ? "#e9eef3" : "#8d8a83"} />
          <stop offset="1" stopColor={glossy ? "#5d6872" : "#3d3b37"} />
        </radialGradient>
        <filter id={`${id}-dull`}>
          <feColorMatrix type="saturate" values="0.35" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d={BODY} />
        </clipPath>
      </defs>

      {background && (
        <>
          <rect width="800" height="400" fill={`url(#${id}-bg)`} />
          <rect width="800" height="400" fill={`url(#${id}-spot)`} />
          <ellipse cx="404" cy="338" rx="360" ry="16" fill="#000" opacity="0.7" />
          {glossy && <ellipse cx="404" cy="336" rx="300" ry="6" style={{ fill: "var(--color-accent, #2ec5e6)" }} opacity="0.12" />}
        </>
      )}

      <g filter={glossy ? undefined : `url(#${id}-dull)`}>
        {/* Body */}
        <path d={BODY} fill={`url(#${id}-paint)`} />

        {/* Windows */}
        <path d="M252 188 Q292 141 346 130 L414 128 L414 188 Z" fill={`url(#${id}-glass)`} />
        <path d="M430 128 L494 128 Q546 132 586 186 L430 188 Z" fill={`url(#${id}-glass)`} />

        <g clipPath={`url(#${id}-clip)`}>
          {/* Shoulder line */}
          <path d="M70 222 L740 214" stroke="#000" strokeOpacity="0.35" strokeWidth="2" fill="none" />
          {/* Door seams */}
          <path d="M420 192 L418 278 M592 190 L590 250" stroke="#000" strokeOpacity="0.45" strokeWidth="1.5" fill="none" />
          {/* Handles */}
          <rect x="370" y="210" width="28" height="5" rx="2.5" fill="#000" opacity="0.4" />
          <rect x="540" y="208" width="28" height="5" rx="2.5" fill="#000" opacity="0.4" />

          {glossy ? (
            <>
              {/* Long reflection streaks */}
              <path d="M60 200 L746 192 L746 210 L60 220 Z" fill={`url(#${id}-shine)`} opacity="0.85" />
              <path d="M240 186 Q290 136 344 124 L500 121 Q556 124 604 178 Z" fill="#fff" opacity="0.08" />
              <path d="M60 252 L746 246 L746 252 L60 258 Z" fill={`url(#${id}-shine)`} opacity="0.35" />
            </>
          ) : (
            <>
              {/* Swirl marks */}
              {[180, 300, 470, 620].map((cx, i) => (
                <g key={cx} stroke="#fff" strokeOpacity="0.14" fill="none" strokeWidth="0.8">
                  {[14, 24, 34, 46].map((r) => (
                    <circle key={r} cx={cx} cy={225 + (i % 2) * 18} r={r} />
                  ))}
                </g>
              ))}
              {/* Oxidation haze */}
              <rect x="0" y="100" width="800" height="200" fill="#c9b79a" opacity="0.14" />
              {DUST.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#d8c8a8" opacity="0.35" />
              ))}
              {/* Water spots */}
              {[140, 260, 350, 510, 660].map((x, i) => (
                <ellipse key={x} cx={x} cy={200 + (i % 3) * 22} rx="5" ry="3.5" fill="none" stroke="#fff" strokeOpacity="0.25" />
              ))}
            </>
          )}
        </g>

        {/* Lights */}
        <path d="M712 204 L744 210 L744 224 L708 220 Z" fill={glossy ? "#e8f8ff" : "#9c9688"} />
        {glossy && <path d="M712 204 L744 210 L744 224 L708 220 Z" style={{ fill: "var(--color-accent, #2ec5e6)" }} opacity="0.35" />}
        <path d="M60 214 L82 210 L84 226 L60 230 Z" fill={glossy ? "#ff3b4a" : "#6b2a2a"} />

        {/* Wheels */}
        {[188, 628].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="282" r="52" fill="#0b0b0c" />
            <circle cx={cx} cy="282" r="34" fill={`url(#${id}-rim)`} />
            {[0, 72, 144, 216, 288].map((a) => (
              <rect
                key={a}
                x={cx - 3.5}
                y="252"
                width="7"
                height="30"
                rx="3"
                fill="#1d2126"
                opacity="0.75"
                transform={`rotate(${a} ${cx} 282)`}
              />
            ))}
            <circle cx={cx} cy="282" r="8" fill="#2b3036" />
            {glossy && <path d={`M${cx - 26} 266 A30 30 0 0 1 ${cx + 6} 252`} stroke="#fff" strokeOpacity="0.6" strokeWidth="2" fill="none" />}
          </g>
        ))}
      </g>
    </svg>
  );
}
