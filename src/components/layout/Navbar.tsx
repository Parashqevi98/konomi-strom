"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, X, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Homepage", href: "/" },
    { label: "Kategorite", href: "/categories" },
    { label: "Produktet", href: "/products" },
    { label: "Rreth Nesh", href: "/about" },
  ];

  const navBaseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm";
  const navStateClasses = isScrolled || isMobileMenuOpen
    ? "bg-[#1A1917]/95 border-b border-white/10"
    : "bg-[#1A1917]/85 md:bg-transparent md:border-none";

  return (
    <>
      <header className={`${navBaseClasses} ${navStateClasses}`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 md:px-8 md:py-3">

          {/* Logo */}
          <Link href="/" className="relative z-50 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Konomi Strom"
              width={330}
              height={110}
              priority
              className="h-10 w-auto md:h-14"
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm uppercase tracking-[0.25em] transition-colors duration-200 hover:text-[#E8C168] whitespace-nowrap ${isScrolled ? "text-white" : "text-[#EED7B7]"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop cart */}
          <div className="hidden items-center justify-end md:flex">
            <Link
              href="/cart"
              className="relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-[#EED7B7] transition-colors hover:bg-white/10"
              aria-label="Shporta"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E8C168] px-1 text-[10px] font-semibold text-[#1A1917]">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-[#EED7B7] transition-colors hover:bg-white/10"
              aria-label="Shporta"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E8C168] px-1 text-[10px] font-semibold text-[#1A1917]">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="relative z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#EED7B7] transition-colors hover:bg-white/10"
              aria-label={isMobileMenuOpen ? "Mbyll menynë" : "Hap menynë"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1A1917] transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center px-8">
          <nav className="flex flex-col items-center gap-8 w-full">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xl uppercase tracking-[0.25em] text-[#EED7B7] hover:text-[#E8C168] transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 60 + 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact info in mobile menu */}
          <div className={`mt-16 text-center transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
            <div className="h-px w-12 bg-[#E8C168]/30 mx-auto mb-6" />
            <a href="tel:+355692040349" className="font-sans text-sm text-[#EED7B7]/50 hover:text-[#E8C168] transition-colors">
              069 204 0349
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;