import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { form, items, totalPrice } = await req.json();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("sq-AL", { minimumFractionDigits: 0 }).format(price) + " Lekë";

  const itemsHtml = items
    .map(
      (item: { name: string; quantity: number; price: number }) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #2A2925; color: #EED7B7; font-size: 14px;">${item.name}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #2A2925; color: #EED7B7; font-size: 14px; text-align: center;">×${item.quantity}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #2A2925; color: #E8C168; font-size: 14px; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`
    )
    .join("");

  const emailHtml = `
    <div style="background: #1A1917; color: #EED7B7; font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 32px;">
      
      <div style="border-bottom: 1px solid #2A2925; padding-bottom: 24px; margin-bottom: 32px;">
        <h1 style="color: #E8C168; font-size: 22px; margin: 0 0 4px;">Konomi Strom</h1>
        <p style="color: #EED7B7; opacity: 0.5; font-size: 12px; margin: 0; letter-spacing: 0.2em; text-transform: uppercase;">Porosi e Re</p>
      </div>

      <h2 style="color: #fff; font-size: 18px; margin: 0 0 24px;">Të Dhënat e Blerësit</h2>
      
      <table style="width: 100%; margin-bottom: 32px;">
        <tr>
          <td style="padding: 8px 0; color: rgba(238,215,183,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Emri</td>
          <td style="padding: 8px 0; color: #EED7B7; font-size: 14px;">${form.emri} ${form.mbiemri}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: rgba(238,215,183,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Telefon</td>
          <td style="padding: 8px 0; color: #EED7B7; font-size: 14px;">${form.telefon}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: rgba(238,215,183,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Adresa</td>
          <td style="padding: 8px 0; color: #EED7B7; font-size: 14px;">${form.adresa}</td>
        </tr>
        ${form.qyteti ? `<tr><td style="padding: 8px 0; color: rgba(238,215,183,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Qyteti</td><td style="padding: 8px 0; color: #EED7B7; font-size: 14px;">${form.qyteti}</td></tr>` : ""}
        ${form.shenime ? `<tr><td style="padding: 8px 0; color: rgba(238,215,183,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Shënime</td><td style="padding: 8px 0; color: #EED7B7; font-size: 14px;">${form.shenime}</td></tr>` : ""}
      </table>

      <h2 style="color: #fff; font-size: 18px; margin: 0 0 16px;">Produktet e Porositura</h2>

      <table style="width: 100%; margin-bottom: 24px;">
        <thead>
          <tr>
            <th style="text-align: left; padding-bottom: 12px; color: rgba(238,215,183,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: normal;">Produkti</th>
            <th style="text-align: center; padding-bottom: 12px; color: rgba(238,215,183,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: normal;">Sasia</th>
            <th style="text-align: right; padding-bottom: 12px; color: rgba(238,215,183,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: normal;">Çmimi</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <div style="border-top: 1px solid #E8C168; padding-top: 16px; text-align: right;">
        <span style="color: rgba(238,215,183,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Totali: </span>
        <span style="color: #E8C168; font-size: 20px; font-weight: 600;">${formatPrice(totalPrice)}</span>
      </div>

      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #2A2925; color: rgba(238,215,183,0.3); font-size: 11px; text-align: center; letter-spacing: 0.1em; text-transform: uppercase;">
        Konomi Strom — Rruga Idriz Alidhima, Sarandë — 069 204 0349
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Konomi Strom <onboarding@resend.dev>",
      to: process.env.NEXT_PUBLIC_STORE_EMAIL!,
      subject: `🛒 Porosi e Re — ${form.emri} ${form.mbiemri}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}