import { useEffect, useRef } from "react";

const partners = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Tesla",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
];

export default function PartnersSection() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let scrollAmount = 0;
    const speed = 1;

    function scroll() {
      if (marquee) {
        scrollAmount -= speed;
        if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2) {
          scrollAmount = 0;
        }
        marquee.style.transform = `translateX(${scrollAmount}px)`;
      }
      requestAnimationFrame(scroll);
    }
    scroll();
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -inset-[20%] bg-gradient-to-br from-emerald-500/5 via-sky-500/5 to-indigo-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-secondary-content max-w-2xl mx-auto">
            Fixitronics is proud to be supported by global innovators and
            industry leaders. Together, we build a smarter service ecosystem.
          </p>
        </div>

        {/* marquee */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex gap-12 items-center will-change-transform"
            style={{ width: `${partners.length * 2 * 180}px` }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-44 h-20 p-4 bg-base-200 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-[120px] object-contain opacity-70 hover:opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* bottom tagline */}
        <div className="text-center mt-14">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Trusted by{" "}
            <span className="font-semibold text-emerald-600">
              100+ companies
            </span>{" "}
            worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
