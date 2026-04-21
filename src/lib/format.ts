import { format } from "date-fns";
import { de } from "date-fns/locale";

export function formatCurrency(amountInCents: number, currency = "USD") {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(amountInCents / 100);
}

export function formatDate(value: Date | string | null | undefined) {
  if (!value) {
    return "Offen";
  }

  return format(new Date(value), "d. MMMM yyyy", { locale: de });
}

export function readingLength(pageCount: number | null) {
  if (!pageCount) {
    return "Unbekannte Länge";
  }

  if (pageCount < 180) {
    return "Eine kurze Abendlektüre";
  }

  if (pageCount < 320) {
    return "Eine lange Nacht bei Lampenlicht";
  }

  return "Ein ganzer Regalzug zum Versinken";
}
