"use client";

import { useEffect, useRef, useState } from "react";

const useVisible = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const s2 = useVisible();
  const s3 = useVisible();
  const s4 = useVisible();
  const s5 = useVisible();
  const s6 = useVisible();

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 50);
    return () => window.clearTimeout(id);
  }, []);

  const enterBase = "transition-all duration-700 ease-out";
  const heroFrom = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";
  const fadeUp = (visible: boolean, delay = 0) =>
    `${enterBase} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} [transition-delay:${delay}ms]`;
  const fadeRight = (visible: boolean, delay = 0) =>
    `${enterBase} ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"} [transition-delay:${delay}ms]`;
  const fadeLeft = (visible: boolean, delay = 0) =>
    `${enterBase} ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} [transition-delay:${delay}ms]`;

  return (
    <main className="min-h-screen bg-[#1A1917]">

      {/* SEKSIONI 1 — Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex items-center">
        <video autoPlay loop muted playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/about-hero.mp4"
        />
        <div className="absolute inset-0 bg-[#1A1917]/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 w-full">
          <div className={`${enterBase} ${heroFrom} flex items-center gap-3 mb-6`} style={{ transitionDelay: "200ms" }}>
            <div className="h-px w-10 bg-[#E8C168]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Rreth Nesh</span>
          </div>
          <h1 className="max-w-2xl">
            <span className={`${enterBase} ${heroFrom} block font-display text-3xl font-light italic text-[#EED7B7]/90 md:text-4xl`} style={{ transitionDelay: "400ms" }}>
              Sepse Gjumi i Mirë Nuk është Luks,
            </span>
            <span className={`${enterBase} ${heroFrom} block font-display text-3xl font-semibold text-white md:text-4xl mt-1`} style={{ transitionDelay: "600ms" }}>
              është Domosdoshmëri.
            </span>
          </h1>
          <p className={`${enterBase} ${heroFrom} mt-6 max-w-lg font-sans text-base font-light text-[#EED7B7]/70`} style={{ transitionDelay: "800ms" }}>
            Gjumi i Mirë Fillon me një Dyshek të Mirë.
          </p>
        </div>
      </section>

      {/* SEKSIONI 2 — Historia */}
      <section ref={s2.ref} className="w-full py-24 bg-[#1A1917]">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className={fadeLeft(s2.isVisible, 0)}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img src="/images/fabrika.png" alt="Fabrika Konomi Strom" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 border border-[#E8C168]/30 px-4 py-2">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#E8C168]/80">
                    Sarandë, Shqipëri — Që nga 2004
                  </p>
                </div>
              </div>
            </div>

            <div className={fadeRight(s2.isVisible, 150)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#E8C168]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Historia Jonë</span>
              </div>
              <h2>
                <span className="block font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">Arti i Gjumit,</span>
                <span className="block font-display text-2xl font-semibold text-white md:text-2xl">Ndërtuar për të Zgjatur.</span>
              </h2>
              <div className="mt-8 space-y-5 font-sans text-sm font-light text-[#EED7B7]/60 leading-relaxed">
                <p>Konomi Strom lindi në Sarandë, nga një familje me pasion për cilësinë dhe punën me dorë. Në vitin 2004, me një vizion të thjeshtë por të fortë - t'u sjellë shqiptarëve dyshekë të vërtetë, të qëndrueshëm dhe të rehatshëm. Konomi Strom hapi dyert e fabrikës së parë.</p>
                <p>Sot, pas mbi 20 vitesh, Konomi Strom është emri i besuar i mijëra familjeve shqiptare. Jo nga reklama, por nga cilësia që flet vetë.</p>
              </div>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <div className="font-display text-2xl font-semibold text-[#E8C168]">20+</div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mt-1">Vjet</div>
                </div>
                <div className="h-8 w-px bg-[#E8C168]/20" />
                <div>
                  <div className="font-display text-2xl font-semibold text-[#E8C168]">50K+</div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mt-1">Dyshekë</div>
                </div>
                <div className="h-8 w-px bg-[#E8C168]/20" />
                <div>
                  <div className="font-display text-2xl font-semibold text-[#E8C168]">100%</div>
                  <div className="font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mt-1">Besueshmëri</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEKSIONI 3 — Prodhimi */}
      <section ref={s3.ref} className="w-full py-24 bg-[#111009]">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className={fadeLeft(s3.isVisible, 0)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#E8C168]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Prodhimi Ynë</span>
              </div>
              <h2>
                <span className="block font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">Çdo Dyshek,</span>
                <span className="block font-display text-2xl font-semibold text-white md:text-2xl">i Bërë me Dorë.</span>
              </h2>
              <div className="mt-8 space-y-5 font-sans text-sm font-light text-[#EED7B7]/60 leading-relaxed">
                <p>Nuk përdorim linja montimi masive. Çdo dyshek që del nga fabrika jonë kalon nëpër duart e artizanëve tanë - nga materiali i parë deri te qepja e fundit.</p>
                <p>Materiale të zgjedhura me kujdes. Kontroll cilësie në çdo fazë. Garanci e vërtetë që mbështetet nga 20 vjet eksperiencë.</p>
              </div>
              <div className="mt-10 space-y-4">
                {[
                  "Materiale cilësore të zgjedhura me kujdes",
                  "Kontroll cilësie në çdo fazë prodhimi",
                  "Garanci e vërtetë për çdo produkt",
                  "Prodhim 100% vendor në Sarandë",
                ].map((item, i) => (
                  <div key={item} className={`flex items-center gap-3 ${enterBase} ${s3.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`} style={{ transitionDelay: `${i * 100 + 200}ms` }}>
                    <div className="h-px w-5 bg-[#E8C168]/60" />
                    <span className="font-sans text-sm font-light text-[#EED7B7]/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={fadeRight(s3.isVisible, 150)}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#252320]">
                <img src="/images/about-production.png" alt="Prodhimi Konomi Strom" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEKSIONI 4 — Biznes Familjar me video */}
      <section ref={s4.ref} className="w-full py-24 bg-[#1A1917]">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className={fadeLeft(s4.isVisible, 0)}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#252320] max-w-[480px]">
                <video autoPlay loop muted playsInline className="h-full w-full object-cover" src="/videos/about-reklame.mp4" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>

            <div className={fadeRight(s4.isVisible, 150)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#E8C168]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Konomi Strom</span>
              </div>
              <h2 className="mb-6">
                <span className="block font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">Pas Çdo Dysheku</span>
                <span className="block font-display text-2xl font-semibold text-white md:text-2xl">Qëndron një Histori.</span>
              </h2>
              <p className="font-sans text-sm font-light text-[#EED7B7]/60 leading-relaxed max-w-md">
                Konomi Strom nuk është thjesht një kompani — është një histori familjare. Çdo dyshek që prodhojmë e nënshkruajmë me emrin tonë.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEKSIONI 5 — Misioni & Vizioni */}
      <section ref={s5.ref} className="w-full py-24 bg-[#111009]">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className={fadeUp(s5.isVisible, 0)}>
              <div className="border border-white/8 rounded-2xl p-10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-[#E8C168]" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Misioni</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-4">Cilësi. Garanci. Çmim.</h3>
                <p className="font-sans text-sm font-light text-[#EED7B7]/60 leading-relaxed">
                  T'u garantojmë klientëve tanë gjumin më të mirë të jetës - me produkte cilësore, çmime të drejta dhe shërbim të sinqertë. Gjumi i mirë fillon këtu.
                </p>
              </div>
            </div>

            <div className={fadeUp(s5.isVisible, 150)}>
              <div className="border border-white/8 rounded-2xl p-10 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-[#E8C168]" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Vizioni</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-4">Prodhimi Vendas. Standardi Europian.</h3>
                <p className="font-sans text-sm font-light text-[#EED7B7]/60 leading-relaxed">
                  Të jemi prodhuesi më i besuar i dyshekëve në Shqipëri - i njohur për cilësinë që konkurron me çdo standard evropian.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEKSIONI 6 — Showroom & Kontakt */}
      <section ref={s6.ref} className="w-full py-24 bg-[#1A1917]">
        <div className="mx-auto max-w-7xl px-8 md:px-16">

          <div className={`text-center mb-16 ${fadeUp(s6.isVisible, 0)}`}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#E8C168]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Vizitoni Showroom-in</span>
              <div className="h-px w-10 bg-[#E8C168]" />
            </div>
            <h2>
              <span className="block font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">Provoni Vetë</span>
              <span className="block font-display text-2xl font-semibold text-white md:text-2xl">Rehatinë.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div className={fadeLeft(s6.isVisible, 150)}>
              <div className="space-y-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#252320]">
                  <img src="/images/showroom.png" alt="Showroom Konomi Strom" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="space-y-5">
                  {[
                    { icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, label: "Adresa", value: "Rruga Idriz Alidhima, Sarandë" },
                    { icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>, label: "Telefon", value: "069 204 0349", href: "tel:+355692040349" },
                    { icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>, label: "Email", value: "konomistrom@gmail.com", href: "mailto:konomistrom@gmail.com" },
                    { icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: "Orari", value: "E Hënë – E Shtunë: 9:00 – 18:00" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="mt-0.5 text-[#E8C168]/50 flex-shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/30 mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="font-sans text-sm font-light text-[#EED7B7]/70 hover:text-[#E8C168] transition-colors">{item.value}</a>
                        ) : (
                          <p className="font-sans text-sm font-light text-[#EED7B7]/70">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={fadeRight(s6.isVisible, 300)}>
              <div className="border border-white/8 rounded-2xl p-8">
                <h3 className="font-display text-xl font-semibold text-white mb-2">Na Dërgoni një Mesazh</h3>
                <p className="font-sans text-sm font-light text-[#EED7B7]/50 mb-8">Keni pyetje? Jemi këtu për t'ju ndihmuar.</p>
                <div className="space-y-5">
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mb-2">Emri</label>
                    <input type="text" placeholder="Emri juaj" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white placeholder:text-[#EED7B7]/30 focus:outline-none focus:border-[#E8C168]/40 transition-colors" />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mb-2">Telefon / Email</label>
                    <input type="text" placeholder="069 XXX XXXX" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white placeholder:text-[#EED7B7]/30 focus:outline-none focus:border-[#E8C168]/40 transition-colors" />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mb-2">Mesazhi</label>
                    <textarea rows={4} placeholder="Si mund t'ju ndihmojmë?" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white placeholder:text-[#EED7B7]/30 focus:outline-none focus:border-[#E8C168]/40 transition-colors resize-none" />
                  </div>
                  <button className="w-full border border-[#E8C168] bg-transparent px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-[#E8C168] transition-all duration-200 hover:bg-[#E8C168] hover:text-black rounded-lg">
                    Dërgo Mesazhin
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}