export type ShippingZone = "riyadh" | "major" | "other" | "remote";

export const SHIPPING_ZONES: { id: ShippingZone; label: string; fee: number; eta: string }[] = [
  { id: "riyadh", label: "Riyadh", fee: 15, eta: "1–2 business days" },
  { id: "major", label: "Jeddah / Dammam / Khobar", fee: 20, eta: "2–3 business days" },
  { id: "other", label: "Other Saudi cities", fee: 25, eta: "3–5 business days" },
  { id: "remote", label: "Remote areas", fee: 35, eta: "4–7 business days" },
];

export const FREE_SHIPPING_THRESHOLD = 300;

export const getShipping = (subtotal: number, zone: ShippingZone) => {
  const selected = SHIPPING_ZONES.find((item) => item.id === zone) ?? SHIPPING_ZONES[0];
  return { ...selected, fee: subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : selected.fee };
};

export const DEMO_ORDERS = {
  "KIMO-2026": { status: "Out for delivery", step: 3, city: "Riyadh", eta: "Today, before 9:00 PM", updated: "Updated 18 minutes ago", items: "K-01 / Core Tee · M" },
  "KIMO-2408": { status: "In transit", step: 2, city: "Jeddah", eta: "25–26 September 2026", updated: "Updated yesterday", items: "K-02 / After Dark · L" },
  "KIMO-1180": { status: "Delivered", step: 4, city: "Dammam", eta: "Delivered 20 September 2026", updated: "Signed for by customer", items: "K-04 / Studio Black · S" },
} as const;

export type DemoOrder = (typeof DEMO_ORDERS)[keyof typeof DEMO_ORDERS];
