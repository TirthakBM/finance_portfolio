import Reveal from "./Reveal";
import SplitText from "./fx/SplitText";

export default function Section({ id, eyebrow, index, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {index && <span className="font-mono text-muted">{index}</span>}
            <span className="h-px w-8 bg-gold" />
            {eyebrow}
          </p>
        </Reveal>
        <h2 className="mt-4 font-serif text-3xl font-medium sm:text-5xl">
          <SplitText text={title} inView stagger={0.02} />
        </h2>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
