import test from "node:test";
import assert from "node:assert/strict";
import {
  textStats,
  readability,
  makeSlug,
  parseRanges,
  loan,
  units,
  ageParts,
} from "../lib/calculations";
import { tools } from "../lib/tools";

test("registry covers exactly 30 tools, unique metadata, full editorial sections, and valid links", () => {
  assert.equal(tools.length, 30);
  assert.equal(new Set(tools.map((t) => t.slug)).size, 30);
  assert.equal(new Set(tools.map((t) => t.metaDescription)).size, 30);
  for (const t of tools) {
    assert.ok(
      t.seoTitle.length + " | Mentix Tools".length < 60,
      `${t.slug} title too long`,
    );
    assert.ok(t.metaDescription.length < 155);
    assert.ok(t.why.split(/\s+/).length >= 150);
    assert.ok(t.faq.length >= 3 && t.faq.length <= 4);
    assert.equal(t.related.length, 3);
    assert.ok(
      t.related.every((s) => s !== t.slug && tools.some((p) => p.slug === s)),
    );
  }
});
test("word counts include Unicode, empty input, paragraphs and time rates", () => {
  assert.equal(textStats("").words, 0);
  const s = textStats("Hello world.\n\nCafé time!");
  assert.equal(s.words, 4);
  assert.equal(s.sentences, 2);
  assert.equal(s.paragraphs, 2);
  assert.equal(textStats("one two").reading, 2 / 238);
  assert.equal(textStats("👋").characters, 1);
});
test("readability formula uses syllables and handles blank input", () => {
  assert.equal(readability(""), null);
  const r = readability("The cat sat on the mat.");
  assert.ok(r);
  assert.equal(r.syllables, 6);
  assert.ok(Math.abs(r.ease - 116.145) < 0.01);
});
test("slugs remove accents, optional stop words and respect limits", () => {
  assert.equal(
    makeSlug("The Café & a Book!", true, true, 80, "-"),
    "cafe-book",
  );
  assert.equal(
    makeSlug("Hello World today", true, false, 11, "-"),
    "hello-world",
  );
  assert.equal(makeSlug("Hello World today", true, false, 10, "-"), "hello");
  assert.equal(makeSlug("", true, false, 80, "-"), "");
});
test("PDF ranges validate, preserve order and deduplicate", () => {
  assert.deepEqual(parseRanges("1-3, 5, 3", 5), [0, 1, 2, 4]);
  assert.throws(() => parseRanges("0", 3));
  assert.throws(() => parseRanges("3-1", 3));
  assert.throws(() => parseRanges("1-8", 3));
  assert.throws(() => parseRanges("abc", 3));
});
test("loan amortization matches zero rate and a known reference", () => {
  assert.equal(loan(1200, 0, 12)?.emi, 100);
  const l = loan(100000, 6.5, 120);
  assert.ok(l);
  assert.ok(Math.abs(l.emi - 1135.48) < 0.01);
  assert.ok(l.years.at(-1)!.balance < 0.01);
  assert.equal(loan(0, 5, 12), null);
  assert.equal(loan(100, 5, 0), null);
  assert.equal(loan(100, 5, 2.5), null);
  assert.ok(Number.isFinite(loan(100, 1e-20, 12)?.emi));
});
test("unit reference factors are exact and binary units differ from decimal", () => {
  assert.equal(units.Length.Miles / units.Length.Feet, 5280);
  assert.equal(units["Data storage"].GiB, 1073741824);
  assert.equal(units["Data storage"].GB, 1000000000);
});
test("calendar age handles leap births, month ends, future and invalid dates", () => {
  const leap = ageParts("2000-02-29", new Date(2025, 1, 28));
  assert.ok(leap);
  assert.equal(leap.years, 25);
  assert.equal(leap.days, 0);
  assert.equal(leap.countdown, 0);
  const end = ageParts("2020-01-31", new Date(2021, 2, 1));
  assert.ok(end);
  assert.equal(end.years, 1);
  assert.equal(end.months, 1);
  assert.equal(end.days, 1);
  assert.equal(ageParts("2025-02-30", new Date(2026, 2, 1)), null);
  assert.equal(ageParts("2030-01-01", new Date(2026, 2, 1)), null);
});
