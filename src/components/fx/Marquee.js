// Infinite horizontal ticker, CSS-driven. Pauses on hover.
export default function Marquee({ items, reverse = false, className = "" }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          {it}
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}>
      <div className={`flex ${reverse ? "animate-marquee-rev" : "animate-marquee"} group-hover:[animation-play-state:paused]`}>
        {row}
        {row}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
