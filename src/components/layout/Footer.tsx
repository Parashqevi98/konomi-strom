"use client";

const Footer = () => {
  return (
    <footer className="w-full bg-[#111009] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-8 md:px-16 py-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/images/logo.png"
                alt="Konomi Strom"
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.35em] text-[#E8C168]/60">
                Everything About Sleep
              </p>
            </div>
            <p className="font-sans text-sm font-light leading-relaxed text-[#EED7B7]/50 max-w-[240px]">
              Prodhues shqiptar i dyshekëve me mbi 20 vjet eksperiencë. Cilësi
              lokale, rehati premium.
            </p>

            {/* Social */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/10 rounded-lg text-[#EED7B7]/40 transition-all duration-200 hover:border-[#E8C168]/40 hover:text-[#E8C168]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/10 rounded-lg text-[#EED7B7]/40 transition-all duration-200 hover:border-[#E8C168]/40 hover:text-[#E8C168]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/10 rounded-lg text-[#EED7B7]/40 transition-all duration-200 hover:border-[#E8C168]/40 hover:text-[#E8C168]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#E8C168]/70 mb-6">
              Quick Links
            </h4>
            <div className="h-px w-full bg-white/5 mb-6" />
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "Kategorite", href: "/categories" },
                { label: "Produktet", href: "/products" },
                { label: "Rreth Nesh", href: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm font-light text-[#EED7B7]/50 transition-colors duration-200 hover:text-[#E8C168]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Categories */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#E8C168]/70 mb-6">
              Kategorite
            </h4>
            <div className="h-px w-full bg-white/5 mb-6" />
            <ul className="space-y-4">
              {[
                { label: "Dyshekët", href: "/categories/dysheket" },
                { label: "Jastekët", href: "/categories/jasteket" },
                { label: "Krevatet", href: "/categories/krevatet" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm font-light text-[#EED7B7]/50 transition-colors duration-200 hover:text-[#E8C168]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#E8C168]/70 mb-6">
              Na Kontaktoni
            </h4>
            <div className="h-px w-full bg-white/5 mb-6" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#E8C168]/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="font-sans text-sm font-light text-[#EED7B7]/50 leading-relaxed">
                  Rruga Idriz Alidhima<br />Sarandë, Shqipëri
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-[#E8C168]/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a
                  href="tel:+355692040349"
                  className="font-sans text-sm font-light text-[#EED7B7]/50 transition-colors duration-200 hover:text-[#E8C168]"
                >
                  069 204 0349
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-[#E8C168]/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a
                  href="mailto:konomistrom@gmail.com"
                  className="font-sans text-sm font-light text-[#EED7B7]/50 transition-colors duration-200 hover:text-[#E8C168]"
                >
                  konomistrom@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-[#E8C168]/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-sans text-sm font-light text-[#EED7B7]/50">
                  E Hënë – E Shtunë: 9:00 – 18:00
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-8 md:px-16 py-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-sans text-xs text-[#EED7B7]/30">
            © {new Date().getFullYear()} Konomi Strom. Të gjitha të drejtat e rezervuara.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="font-sans text-xs text-[#EED7B7]/30 transition-colors duration-200 hover:text-[#EED7B7]/60">
              Politika e Privatësisë
            </a>
            <a href="/terms" className="font-sans text-xs text-[#EED7B7]/30 transition-colors duration-200 hover:text-[#EED7B7]/60">
              Kushtet e Shërbimit
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;