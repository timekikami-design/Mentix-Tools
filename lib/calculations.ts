import { syllable } from "syllable";
export const wordsOf = (text: string) =>
  text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || [];
export function textStats(text: string) {
  const words = wordsOf(text).length;
  const sentences = text.trim()
    ? (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((s) =>
        /[\p{L}\p{N}]/u.test(s),
      ).length
    : 0;
  return {
    words,
    characters: Array.from(text).length,
    noSpaces: Array.from(text.replace(/\s/g, "")).length,
    sentences,
    paragraphs: text.trim()
      ? text
          .trim()
          .split(/\n\s*\n/)
          .filter(Boolean).length
      : 0,
    reading: words / 238,
    speaking: words / 130,
  };
}
export function readability(text: string) {
  const stats = textStats(text);
  if (!stats.words || !stats.sentences) return null;
  const syllables = wordsOf(text).reduce(
    (n, w) => n + Math.max(1, syllable(w)),
    0,
  );
  return {
    ease:
      206.835 -
      (1.015 * stats.words) / stats.sentences -
      (84.6 * syllables) / stats.words,
    grade:
      (0.39 * stats.words) / stats.sentences +
      (11.8 * syllables) / stats.words -
      15.59,
    syllables,
  };
}
export function makeSlug(
  text: string,
  lower: boolean,
  stop: boolean,
  max: number,
  separator: string,
) {
  let parts: string[] =
    text
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['’]/g, "")
      .replace(/&/g, " and ")
      .match(/[\p{L}\p{N}]+/gu) || [];
  if (stop)
    parts = parts.filter(
      (w) =>
        !new Set([
          "a",
          "an",
          "the",
          "and",
          "or",
          "of",
          "to",
          "in",
          "on",
          "for",
          "with",
          "is",
        ]).has(w.toLowerCase()),
    );
  let slug = parts.join(separator);
  if (lower) slug = slug.toLowerCase();
  if (slug.length > max) {
    const cut = slug.slice(0, max);
    slug =
      slug[max] === separator
        ? cut
        : cut.includes(separator)
          ? cut.slice(0, cut.lastIndexOf(separator))
          : cut;
  }
  return slug;
}
export function parseRanges(input: string, pages: number) {
  const selected = new Set<number>();
  if (!input.trim()) throw new Error("Enter a page range.");
  for (const term of input.split(",")) {
    const m = term.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) throw new Error(`Invalid range: ${term}. Use 1-3, 5.`);
    const start = Number(m[1]),
      end = Number(m[2] || m[1]);
    if (start < 1 || end > pages || start > end)
      throw new Error(
        `Pages must be between 1 and ${pages}, in ascending order.`,
      );
    for (let i = start; i <= end; i++) selected.add(i - 1);
  }
  return [...selected];
}
export function loan(principal: number, annual: number, months: number) {
  if (
    !Number.isFinite(principal + annual + months) ||
    principal <= 0 ||
    annual < 0 ||
    months < 1 ||
    months > 1200 ||
    !Number.isInteger(months)
  )
    return null;
  const rate = annual / 1200;
  const emi = rate
    ? (principal * rate) / -Math.expm1(-months * Math.log1p(rate))
    : principal / months;
  if (!Number.isFinite(emi * months)) return null;
  let balance = principal;
  const years: {
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }[] = [];
  for (let i = 1; i <= months; i++) {
    const interest = balance * rate;
    const paid = Math.min(balance, emi - interest);
    balance = Math.max(0, balance - paid);
    const y = Math.floor((i - 1) / 12);
    if (!years[y])
      years[y] = { year: y + 1, principal: 0, interest: 0, balance: 0 };
    years[y].principal += paid;
    years[y].interest += interest;
    years[y].balance = balance;
  }
  return {
    emi,
    total: emi * months,
    interest: emi * months - principal,
    years,
  };
}
export const units: Record<string, Record<string, number>> = {
  Length: {
    Meters: 1,
    Kilometers: 1000,
    Centimeters: 0.01,
    Millimeters: 0.001,
    Inches: 0.0254,
    Feet: 0.3048,
    Yards: 0.9144,
    Miles: 1609.344,
  },
  "Weight / mass": {
    Kilograms: 1,
    Grams: 0.001,
    Milligrams: 0.000001,
    Pounds: 0.45359237,
    Ounces: 0.028349523125,
    Tonnes: 1000,
  },
  Volume: {
    Liters: 1,
    Milliliters: 0.001,
    "US gallons": 3.785411784,
    "US quarts": 0.946352946,
    "US fluid ounces": 0.0295735295625,
    "Cubic meters": 1000,
  },
  Area: {
    "Square meters": 1,
    "Square kilometers": 1e6,
    "Square feet": 0.09290304,
    Acres: 4046.8564224,
    Hectares: 10000,
    "Square miles": 2589988.110336,
  },
  Speed: {
    "Meters/second": 1,
    "Kilometers/hour": 1 / 3.6,
    "Miles/hour": 0.44704,
    Knots: 0.5144444444,
    "Feet/second": 0.3048,
  },
  "Data storage": {
    Bytes: 1,
    Bits: 0.125,
    KB: 1e3,
    MB: 1e6,
    GB: 1e9,
    TB: 1e12,
    KiB: 1024,
    MiB: 1048576,
    GiB: 1073741824,
    TiB: 1099511627776,
  },
};
export function ageParts(birth: string, today: Date) {
  const [y, m, d] = birth.split("-").map(Number);
  const b = new Date(Date.UTC(y, m - 1, d));
  const t = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  if (
    !birth ||
    !Number.isFinite(b.getTime()) ||
    b > t ||
    y < 1900 ||
    b.getUTCMonth() !== m - 1 ||
    b.getUTCDate() !== d
  )
    return null;
  const anniversary = (year: number, month: number) =>
    new Date(
      Date.UTC(
        year,
        month,
        Math.min(d, new Date(Date.UTC(year, month + 1, 0)).getUTCDate()),
      ),
    );
  let years = t.getUTCFullYear() - y;
  if (anniversary(y + years, m - 1) > t) years--;
  let months = 0,
    anchor = anniversary(y + years, m - 1);
  while (months < 11) {
    const candidate = anniversary(y + years, m + months);
    if (candidate > t) break;
    months++;
    anchor = candidate;
  }
  const days = Math.round((t.getTime() - anchor.getTime()) / 86400000);
  let next = anniversary(t.getUTCFullYear(), m - 1);
  if (next < t) next = anniversary(t.getUTCFullYear() + 1, m - 1);
  return {
    years,
    months,
    days,
    total: Math.round((t.getTime() - b.getTime()) / 86400000),
    countdown: Math.round((next.getTime() - t.getTime()) / 86400000),
    weekday: b.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    }),
  };
}
export const displayNumber = (n: number, digits = 6) =>
  Number.isFinite(n)
    ? new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(
        n,
      )
    : "Outside supported range";
