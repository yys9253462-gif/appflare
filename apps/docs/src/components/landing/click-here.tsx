/** A small Chinese caption and arrow pointing to the install button. */
export function ClickHere({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 250 120"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <text
        x="20"
        y="105"
        fill="currentColor"
        stroke="none"
        fontSize="24"
        fontFamily="system-ui, sans-serif"
        transform="rotate(-10 20 105)"
      >
        点击这里安装
      </text>
      <path
        strokeWidth="2.5"
        pathLength={1}
        className="motion-safe:animate-[click-here-draw_0.9s_ease-out_0.4s_both]"
        d="M186 58C179 44 182 31 193 29C204 27 206 41 196 42C185 43 189 23 209 21C223 19 235 20 246 22"
      />
      <path
        strokeWidth="2.5"
        className="motion-safe:animate-[click-here-tip_0.2s_ease-out_1.25s_both]"
        d="M237 15L246 22L236 29"
      />
    </svg>
  );
}
