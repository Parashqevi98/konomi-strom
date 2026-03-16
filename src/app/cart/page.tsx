"use client";

import { useCart, CartItem } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("sq-AL", { minimumFractionDigits: 0 }).format(price) + " Lekë";

type FormData = {
  emri: string;
  mbiemri: string;
  telefon: string;
  adresa: string;
  qyteti: string;
  shenime: string;
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    emri: "", mbiemri: "", telefon: "", adresa: "", qyteti: "", shenime: "",
  });

  const handleSubmit = async () => {
    if (!form.emri || !form.mbiemri || !form.telefon || !form.adresa) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, items, totalPrice }),
      });
      if (res.ok) {
        clearCart();
        setStep("success");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <main className="min-h-screen bg-[#1A1917] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full border border-[#E8C168]/40 flex items-center justify-center mx-auto mb-8">
            <svg className="h-7 w-7 text-[#E8C168]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#E8C168]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Porosia u Dërgua</span>
            <div className="h-px w-10 bg-[#E8C168]" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-white mb-4">Faleminderit!</h1>
          <p className="font-sans text-sm font-light text-[#EED7B7]/60 leading-relaxed mb-8">
            Porosia juaj u regjistrua me sukses. Do ju kontaktojmë së shpejti në numrin e telefonit për konfirmimin e porosisë.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 border border-[#E8C168] px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-[#E8C168] hover:bg-[#E8C168] hover:text-black transition-all duration-200 rounded-lg">
            Vazhdo Blerjet
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#1A1917] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#E8C168]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#EED7B7]/40">Shporta</span>
            <div className="h-px w-10 bg-[#E8C168]" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-white mb-4">Shporta është Bosh</h1>
          <p className="font-sans text-sm font-light text-[#EED7B7]/50 mb-8">Shtoni produkte për të vazhduar me blerjen.</p>
          <Link href="/products" className="inline-flex items-center gap-2 border border-[#E8C168] px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-[#E8C168] hover:bg-[#E8C168] hover:text-black transition-all duration-200 rounded-lg">
            Shiko Produktet
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1A1917]">
      <div className="mx-auto max-w-7xl px-8 md:px-16 pt-28 pb-20">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6 font-sans text-[11px] uppercase tracking-widest text-[#EED7B7]/40">
            <Link href="/" className="hover:text-[#E8C168] transition-colors">Ballina</Link>
            <span>/</span>
            <span className="text-[#E8C168]/70">Shporta</span>
          </div>
          <h1>
            <span className="block font-display text-2xl font-light italic text-[#EED7B7]/90">Shporta Juaj</span>
            <span className="block font-display text-2xl font-semibold text-white">{totalItems} Produkte</span>
          </h1>
        </div>

        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-5 p-4 border border-white/8 rounded-xl bg-white/2">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#252320]">
                    {item.image_url && <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-[#E8C168]/60 mb-1">{item.tag}</p>
                    <h3 className="font-display text-base font-semibold text-white mb-2 truncate">{item.name}</h3>
                    <p className="font-display text-sm font-semibold text-[#E8C168]">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button onClick={() => removeItem(item.id)} className="text-[#EED7B7]/30 hover:text-[#EED7B7]/70 transition-colors">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2 border border-white/10 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-[#EED7B7]/60 hover:text-white hover:bg-white/5 transition-colors font-sans text-sm">−</button>
                      <span className="px-2 font-sans text-sm text-white min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-[#EED7B7]/60 hover:text-white hover:bg-white/5 transition-colors font-sans text-sm">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-white/8 rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-lg font-semibold text-white mb-6">Përmbledhja</h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="font-sans text-sm font-light text-[#EED7B7]/50 truncate mr-4">{item.name} ×{item.quantity}</span>
                      <span className="font-sans text-sm text-[#EED7B7]/70 flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-white/5 mb-4" />
                <div className="flex justify-between mb-6">
                  <span className="font-sans text-sm font-semibold text-white">Totali</span>
                  <span className="font-display text-lg font-semibold text-[#E8C168]">{formatPrice(totalPrice)}</span>
                </div>
                <button onClick={() => setStep("checkout")} className="w-full bg-[#E8C168] px-6 py-4 font-sans text-[11px] font-bold uppercase tracking-widest text-[#1A1917] hover:bg-[#D9B55E] transition-all duration-200 rounded-lg">
                  Perfundo Blerjen →
                </button>
                <p className="font-sans text-[10px] text-[#EED7B7]/30 text-center mt-4 leading-relaxed">
                  Do ju kontaktojmë për konfirmimin dhe dërgimin
                </p>
              </div>
            </div>

          </div>
        )}

        {step === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2">
              <button onClick={() => setStep("cart")} className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-[#EED7B7]/40 hover:text-[#E8C168] transition-colors mb-8">
                ← Kthehu te Shporta
              </button>

              <div className="border border-white/8 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-10 bg-[#E8C168]" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Të Dhënat e Blerësit</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { key: "emri", label: "Emri", placeholder: "Emri juaj", required: true },
                    { key: "mbiemri", label: "Mbiemri", placeholder: "Mbiemri juaj", required: true },
                    { key: "telefon", label: "Numri i Telefonit", placeholder: "069 XXX XXXX", required: true },
                    { key: "qyteti", label: "Qyteti", placeholder: "Sarandë, Tiranë...", required: false },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mb-2">
                        {field.label} {field.required && <span className="text-[#E8C168]">*</span>}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={form[field.key as keyof FormData]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white placeholder:text-[#EED7B7]/30 focus:outline-none focus:border-[#E8C168]/40 transition-colors"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mb-2">
                      Adresa e Plotë <span className="text-[#E8C168]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Rruga, Nr. shtëpisë..."
                      value={form.adresa}
                      onChange={(e) => setForm({ ...form, adresa: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white placeholder:text-[#EED7B7]/30 focus:outline-none focus:border-[#E8C168]/40 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mb-2">
                      Shënime Shtesë
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Madhësia e dyshekut, ngjyra, ose çdo kërkesë tjetër..."
                      value={form.shenime}
                      onChange={(e) => setForm({ ...form, shenime: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-white placeholder:text-[#EED7B7]/30 focus:outline-none focus:border-[#E8C168]/40 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border border-white/8 rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-lg font-semibold text-white mb-6">Porosia</h2>
                <div className="space-y-3 mb-6">
                {items.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between">
                        <span className="font-sans text-sm font-light text-[#EED7B7]/50 truncate mr-4">
                            {item.name} ×{item.quantity}
                        </span>
                        <span className="font-sans text-sm text-[#EED7B7]/70 flex-shrink-0">
                            {formatPrice(item.price * item.quantity)}
                        </span>
                    </div>
                ))}
                </div>
                <div className="h-px bg-white/5 mb-4" />
                <div className="flex justify-between mb-8">
                  <span className="font-sans text-sm font-semibold text-white">Totali</span>
                  <span className="font-display text-lg font-semibold text-[#E8C168]">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.emri || !form.mbiemri || !form.telefon || !form.adresa}
                  className="w-full bg-[#E8C168] px-6 py-4 font-sans text-[11px] font-bold uppercase tracking-widest text-[#1A1917] hover:bg-[#D9B55E] transition-all duration-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? "Duke Dërguar..." : "Dërgo Porosinë"}
                </button>
                <p className="font-sans text-[10px] text-[#EED7B7]/30 text-center mt-4 leading-relaxed">
                  Do ju kontaktojmë brenda 24 orëve
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}