"use client";

import { useState, useEffect, useRef } from "react";

const FindMattressSection = () => {
  const [quizStep, setQuizStep] = useState(1);
  const [answers, setAnswers] = useState({
    sleepPosition: "",
    firmness: "",
    sleepers: "",
  });
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const enterBase = "transition-all duration-700 ease-out";
  const fadeUp = (delay = 0) =>
    `${enterBase} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  const mattressTypes = [
  { tag: "Foam", title: "Memory Foam", description: "Përshtatet me trupin, ul presionin.", image: "/images/mattresses/memory-foam.png" },
  { tag: "Spring", title: "Pocket Spring", description: "Susta individuale, pa transferim lëvizjeje.", image: "/images/mattresses/pocket-spring.png" },
  { tag: "Latex", title: "Natural Latex", description: "Natyral, antibakterial, shumë i ajrosshëm.", image: "/images/mattresses/natural-latex.png" },
  { tag: "Hybrid", title: "Hybrid Comfort", description: "Foam + susta për rehati dhe mbështetje.", image: "/images/mattresses/hybrid-mattress.png" },
  ];

  interface Answers { sleepPosition: string; firmness: string; sleepers: string; }
  type QuizField = keyof Answers;

  const handleAnswer = (field: QuizField, value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [field]: value }));
    if (quizStep < 3) setQuizStep(quizStep + 1);
  };

  const getRecommendation = () => {
    if (answers.firmness === "E butë") return { name: "Memory Foam", description: "Përshtatet me formën e trupit dhe redukton presionin në shtyllën kurrizore." };
    if (answers.firmness === "E fortë") return { name: "Pocket Spring", description: "Susta individuale që eliminojnë transferimin e lëvizjes gjatë gjumit." };
    if (answers.sleepers === "Çift") return { name: "Hybrid Comfort", description: "Kombinon memory foam dhe sustat për rehati dhe mbështetje perfekte." };
    return { name: "Hybrid Comfort", description: "Kombinon memory foam dhe sustat për rehati dhe mbështetje perfekte." };
  };

  const showResult = () => setShowRecommendation(true);
  const resetQuiz = () => { setQuizStep(1); setAnswers({ sleepPosition: "", firmness: "", sleepers: "" }); setShowRecommendation(false); };

  return (
    <section ref={sectionRef} className="w-full bg-[#1A1917] py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className={`${fadeUp()} flex items-center justify-center gap-4 mb-6`} style={{ transitionDelay: "0ms" }}>
            <div className="h-px w-10 bg-[#E8C168]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">FIND YOUR PERFECT MATTRESS</span>
            <div className="h-px w-10 bg-[#E8C168]" />
          </div>
          <h2 className="mb-4">
            <div className={`${fadeUp()} font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl`} style={{ transitionDelay: "100ms" }}>
              Gjej Dyshekun Ideal
            </div>
            <div className={`${fadeUp()} font-display text-2xl font-semibold text-white md:text-2xl`} style={{ transitionDelay: "200ms" }}>
              për Ty
            </div>
          </h2>
          <div className={`${fadeUp()} inline-flex items-center px-3 py-1 border border-[#E8C168]/40 rounded-full text-[11px] tracking-widest text-[#E8C168]/70 uppercase mb-4`} style={{ transitionDelay: "300ms" }}>
            +30 lloje dyshekësh
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[3fr_2fr]">

          {/* Left — Cards */}
          <div className="grid grid-cols-2 gap-3">
            {mattressTypes.map((type, index) => (
              <div
                key={index}
                className={`group relative h-[200px] overflow-hidden cursor-pointer rounded-xl border border-white/10 transition-all duration-300 hover:border-[#E8C168]/40 hover:shadow-lg hover:shadow-[#E8C168]/10 ${enterBase} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 80 + 400}ms` }}
              >
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${type.image}')` }} />
               <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.10) 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[10px] tracking-widest text-[#E8C168]/80 uppercase mb-1">{type.tag}</p>
                  <h3 className="text-sm font-semibold text-white leading-tight">{type.title}</h3>
                  <p className="text-xs text-[#EED7B7]/70 leading-snug mt-1 line-clamp-2">{type.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Quiz */}
          <div className={`w-full ${enterBase} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "300ms" }}>
            {!showRecommendation ? (
              <div className="w-full rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur">
                {quizStep === 1 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/60 mb-4">01</div>
                    <h3 className="text-sm font-semibold text-white mb-4">Si flini zakonisht?</h3>
                    <div className="flex flex-col gap-3">
                      {["Në shpinë", "Në anë", "Në bark"].map((option) => (
                        <button key={option} onClick={() => handleAnswer("sleepPosition", option)} className="rounded-lg border border-white/10 px-3 py-2 text-left text-xs font-light text-[#EED7B7]/80 transition-all duration-200 hover:border-[#E8C168]/40">{option}</button>
                      ))}
                    </div>
                  </div>
                )}
                {quizStep === 2 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/60 mb-4">02</div>
                    <h3 className="text-sm font-semibold text-white mb-4">Çfarë fortësie preferoni?</h3>
                    <div className="flex flex-col gap-3">
                      {["E butë", "Mesatare", "E fortë"].map((option) => (
                        <button key={option} onClick={() => handleAnswer("firmness", option)} className="rounded-lg border border-white/10 px-3 py-2 text-left text-xs font-light text-[#EED7B7]/80 transition-all duration-200 hover:border-[#E8C168]/40">{option}</button>
                      ))}
                    </div>
                  </div>
                )}
                {quizStep === 3 && (
                  <div className="flex flex-col gap-3">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/60 mb-1">03</div>
                    <h3 className="text-sm font-semibold text-white mb-1">Flini vetëm apo në çift?</h3>
                    {["Vetëm", "Çift"].map((option) => (
                      <button key={option} onClick={() => handleAnswer("sleepers", option)} className="rounded-lg border border-white/10 px-3 py-2 text-left text-xs font-light text-[#EED7B7]/80 transition-all duration-200 hover:border-[#E8C168]/40">{option}</button>
                    ))}
                    {answers.sleepers && (
                      <button onClick={showResult} className="mt-2 w-full rounded-lg border border-[#E8C168] bg-transparent px-6 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#E8C168] transition-all duration-200 hover:bg-[#E8C168] hover:text-black">
                        SHIKO REKOMANDIMIN
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full rounded-2xl border border-[#E8C168]/30 bg-black/20 p-7 backdrop-blur">
                <div className="text-center">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#E8C168]/80">Rekomandimi ynë</div>
                  <h3 className="mb-4 font-display text-2xl font-semibold text-white">{getRecommendation().name}</h3>
                  <p className="mb-6 text-sm font-light text-[#EED7B7]/60">{getRecommendation().description}</p>
                  <div className="space-y-4">
                    <a href="/products" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8C168] transition-all duration-200 hover:gap-3">
                      SHIKO PRODUKTET <span>→</span>
                    </a>
                    <div className="border-t border-white/10 pt-4">
                      <button onClick={resetQuiz} className="text-xs text-[#EED7B7]/60 transition-colors duration-200 hover:text-[#EED7B7]/80">Rifillo testin</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FindMattressSection;