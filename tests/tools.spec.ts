import { test, expect, type Page } from "@playwright/test";
import { tools } from "../lib/tools";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { readFile } from "node:fs/promises";

async function open(page: Page, slug: string) {
  await page.goto(`/tools/${slug}/`);
  await expect(page.locator(".tool-loading")).toHaveCount(0);
  await expect(page.locator(".tool-workspace")).toBeVisible();
}
async function downloaded(page: Page, action: () => Promise<unknown>) {
  const event = page.waitForEvent("download");
  await action();
  const d = await event;
  const path = await d.path();
  expect(path).toBeTruthy();
  return readFile(path!);
}
for (const tool of tools) {
  test(`${tool.slug}: renders at 360px without exceptions or overflow`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page, tool.slug);
    await page.waitForTimeout(250);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(tool.name);
    await expect(page.locator(".related-section .tool-card")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test("word counter live counts and empty input", async ({ page }) => {
  await open(page, "word-counter");
  await page.getByLabel("Your text").fill("One two three.");
  await expect(page.locator(".stats")).toContainText("3");
  await page.getByLabel("Your text").fill("");
  await expect(page.locator(".stats dd").first()).toHaveText("0");
});
test("case converter offers all seven transformations", async ({ page }) => {
  await open(page, "case-converter");
  await page.getByLabel("Your text").fill("hello world");
  const select = page.getByLabel("Convert to");
  for (const [mode, result] of [
    ["UPPERCASE", "HELLO WORLD"],
    ["lowercase", "hello world"],
    ["Title Case", "Hello World"],
    ["Sentence case", "Hello world"],
    ["camelCase", "helloWorld"],
    ["snake_case", "hello_world"],
    ["kebab-case", "hello-world"],
  ]) {
    await select.selectOption(mode);
    await expect(page.locator(".result pre")).toHaveText(result);
  }
});
test("lorem word limit and slug options", async ({ page }) => {
  await open(page, "lorem-ipsum-generator");
  await page.getByLabel("Generate", { exact: true }).selectOption("Words");
  await page.getByLabel("Count", { exact: true }).fill("10");
  expect(
    (await page.locator(".result pre").innerText()).split(" ").length,
  ).toBe(10);
  await open(page, "slug-generator");
  await page.getByLabel("Title", { exact: true }).fill("The Café and a Book");
  await page.getByLabel("Remove stop words").check();
  await expect(page.locator(".result pre")).toHaveText("cafe-book");
});
test("readability sample and Markdown sanitization", async ({ page }) => {
  await open(page, "readability-score");
  await page.getByLabel("English text").fill("The cat sat on the mat.");
  await expect(page.locator(".result")).toContainText("116.1");
  await open(page, "markdown-preview");
  await page
    .getByLabel("Markdown source")
    .fill(
      '## Safe\n<script>alert(1)</script><img src="https://bad.example/x" onerror="alert(1)"><span style="background:url(https://bad.example/y)">ok</span>',
    );
  await expect(page.locator(".markdown-preview h2")).toHaveText("Safe");
  await expect(
    page.locator(
      ".markdown-preview script,.markdown-preview img,.markdown-preview [style]",
    ),
  ).toHaveCount(0);
});
test("regex capture groups, invalid syntax, and catastrophic backtracking", async ({
  page,
}) => {
  await open(page, "regex-tester");
  await expect(page.locator(".result mark")).toHaveCount(2);
  await page
    .getByLabel("Pattern (without / delimiters)")
    .fill("(hello)@(example)");
  await page.getByLabel("Test string").fill("hello@example.com");
  await expect(page.locator(".result")).toContainText("groups");
  await page.getByLabel("Pattern (without / delimiters)").fill("[");
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("Invalid");
  await page.getByLabel("Pattern (without / delimiters)").fill("(a+)+$");
  await page.getByLabel("Test string").fill("a".repeat(40) + "!");
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("took too long", {
    timeout: 6000,
  });
});
test("meta tags escape user text", async ({ page }) => {
  await open(page, "meta-tag-generator");
  await page.getByLabel(/Page title/).fill('A "quoted" <title>');
  await expect(page.locator(".result pre")).toContainText(
    "&quot;quoted&quot; &lt;title&gt;",
  );
});
test("JSON validates exact error location and exports formatted data", async ({
  page,
}) => {
  await open(page, "json-formatter");
  await page.getByRole("button", { name: "Format JSON", exact: true }).click();
  await expect(page.locator(".result")).toContainText("Valid JSON");
  const json = await downloaded(page, () =>
    page.getByRole("button", { name: "Download JSON" }).click(),
  );
  expect(JSON.parse(json.toString()).free).toBe(true);
  await page.getByLabel("JSON input").fill('{\n  "x":\n}');
  await page.getByRole("button", { name: "Validate", exact: true }).click();
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("line 3");
});
test("Base64 UTF-8 roundtrip and invalid input", async ({ page }) => {
  await open(page, "base64-encoder-decoder");
  const sample = "Café 👋 你好";
  await page.getByLabel("Text to encode").fill(sample);
  await page.getByRole("button", { name: "Encode text", exact: true }).click();
  const encoded = await page.locator(".result pre").innerText();
  await page.getByRole("button", { name: "Decode", exact: true }).click();
  await page.getByLabel("Base64 to decode").fill(encoded);
  await page.getByRole("button", { name: "Decode text", exact: true }).click();
  await expect(page.locator(".result pre")).toHaveText(sample);
  await page.getByLabel("Base64 to decode").fill("%%%");
  await page.getByRole("button", { name: "Decode text", exact: true }).click();
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toBeVisible();
});
test("all four hashes match known abc checksums including file mode", async ({
  page,
}) => {
  await open(page, "hash-generator");
  await page.getByLabel("Text (or choose a file below)").fill("abc");
  const checks: Record<string, string> = {
    MD5: "900150983cd24fb0d6963f7d28e17f72",
    "SHA-1": "a9993e364706816aba3e25717850c26c9cd0d89d",
    "SHA-256":
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    "SHA-512":
      "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f",
  };
  for (const [a, h] of Object.entries(checks)) {
    await page.getByLabel("Algorithm").selectOption(a);
    await page.getByRole("button", { name: "Calculate hash" }).click();
    await expect(page.locator(".result pre")).toHaveText(h);
  }
  await page.locator("input[type=file]").setInputFiles({
    name: "test.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("abc"),
  });
  await page.getByLabel("Algorithm").selectOption("MD5");
  await page.getByRole("button", { name: "Calculate hash" }).click();
  await expect(page.locator(".result pre")).toHaveText(checks.MD5);
});
test("timestamp seconds and milliseconds, secure password rules", async ({
  page,
}) => {
  await open(page, "timestamp-converter");
  await page.getByLabel("Unix timestamp").fill("0");
  await expect(page.locator(".result")).toContainText(
    "1970-01-01T00:00:00.000Z",
  );
  await page.getByLabel("Input unit").selectOption("Milliseconds");
  await page.getByLabel("Unix timestamp").fill("1000");
  await expect(page.locator(".result")).toContainText(
    "1970-01-01T00:00:01.000Z",
  );
  await open(page, "password-generator");
  await expect(page.locator(".password-output")).not.toBeEmpty();
  const password = await page.locator(".password-output").innerText();
  expect(password.length).toBe(20);
  for (const regex of [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/])
    expect(password).toMatch(regex);
  for (const label of ["Uppercase", "Lowercase", "Numbers", "Symbols"])
    await page.getByLabel(label, { exact: true }).uncheck();
  await page
    .getByRole("button", { name: "Generate password", exact: true })
    .click();
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("at least one");
});
for (const [slug, action] of [
  ["image-compressor", "Compress image"],
  ["image-resizer", "Resize image"],
  ["image-format-converter", "Convert image"],
]) {
  test(`${slug} exports a real image`, async ({ page }) => {
    await open(page, slug);
    await expect(page.locator(".tool-workspace img").first()).toBeVisible();
    await page.getByRole("button", { name: action, exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Download", exact: true }),
    ).toBeEnabled();
    const bytes = await downloaded(page, () =>
      page.getByRole("button", { name: "Download", exact: true }).click(),
    );
    expect(bytes.length).toBeGreaterThan(100);
    expect(bytes.subarray(1, 4).toString()).toBe("PNG");
  });
}
test("QR exports valid PNG and SVG", async ({ page }) => {
  await open(page, "qr-code-generator");
  await expect(page.locator(".qr-preview")).toBeVisible();
  const svg = await downloaded(page, () =>
    page.getByRole("button", { name: "Download SVG" }).click(),
  );
  expect(svg.toString()).toContain("<svg");
  const png = await downloaded(page, () =>
    page.getByRole("button", { name: "Download PNG" }).click(),
  );
  expect(png.subarray(1, 4).toString()).toBe("PNG");
});
test("color conversions and gradient stops work", async ({ page }) => {
  await open(page, "color-picker");
  await page.getByLabel("HEX (six digits)").fill("#ff0000");
  await expect(page.locator(".result")).toContainText("rgb(255, 0, 0)");
  await expect(page.locator(".result")).toContainText(
    "cmyk(0%, 100%, 100%, 0%)",
  );
  await open(page, "css-gradient-generator");
  await page.getByLabel("Gradient type").selectOption("radial");
  await page.getByRole("button", { name: "Add color stop" }).click();
  await expect(page.locator(".stop-row")).toHaveCount(4);
  await expect(page.locator(".result pre")).toContainText("radial-gradient");
});
test("PDF merge reorders, merges, and exports all pages", async ({ page }) => {
  await open(page, "pdf-merge");
  await expect(page.locator(".file-list li")).toHaveCount(2);
  await page
    .getByRole("button", { name: /Move sample-appendix.pdf up/ })
    .click();
  await expect(page.locator(".file-list li").first()).toContainText("appendix");
  await page.getByRole("button", { name: "Merge 2 PDFs", exact: true }).click();
  const bytes = await downloaded(page, () =>
    page.getByRole("button", { name: "Download", exact: true }).click(),
  );
  const d = await PDFDocument.load(bytes);
  expect(d.getPageCount()).toBe(3);
});
test("PDF split validates ranges and ZIP contains individual pages", async ({
  page,
}) => {
  await open(page, "pdf-split");
  await expect(page.locator(".tool-workspace")).toContainText("3 pages");
  await page
    .getByRole("button", { name: "Extract pages", exact: true })
    .click();
  const bytes = await downloaded(page, () =>
    page.getByRole("button", { name: "Download", exact: true }).click(),
  );
  expect((await PDFDocument.load(bytes)).getPageCount()).toBe(2);
  await page.getByLabel(/Page ranges/).fill("9");
  await page
    .getByRole("button", { name: "Extract pages", exact: true })
    .click();
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("between 1 and 3");
  await page
    .getByLabel("Split every page into a ZIP of individual PDFs")
    .check();
  await page
    .getByRole("button", { name: "Split all pages", exact: true })
    .click();
  const zip = await JSZip.loadAsync(
    await downloaded(page, () =>
      page.getByRole("button", { name: "Download", exact: true }).click(),
    ),
  );
  expect(Object.keys(zip.files)).toHaveLength(3);
});
test("PDF compression renders and rebuilds a valid PDF with local worker", async ({
  page,
}) => {
  await open(page, "pdf-compress");
  await expect(page.locator(".tool-workspace")).toContainText("3 pages");
  await page.getByLabel("Quality", { exact: true }).selectOption("Low");
  await page.getByRole("button", { name: "Compress PDF", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Download", exact: true }),
  ).toBeEnabled({ timeout: 30000 });
  const bytes = await downloaded(page, () =>
    page.getByRole("button", { name: "Download", exact: true }).click(),
  );
  expect((await PDFDocument.load(bytes)).getPageCount()).toBe(3);
});
test("unit, temperature and percentage arithmetic and edge cases", async ({
  page,
}) => {
  await open(page, "unit-converter");
  await expect(page.locator(".big-result")).toContainText("3.280839895");
  await open(page, "temperature-converter");
  await expect(page.locator(".big-result")).toHaveText("68 °F");
  await page.getByLabel("Temperature", { exact: true }).fill("-300");
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("absolute zero");
  await open(page, "percentage-calculator");
  await expect(page.locator(".big-result")).toHaveText("30");
  await page.getByLabel("Calculation").selectOption("X is what % of Y");
  await page.getByLabel("Y", { exact: true }).fill("0");
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("undefined");
});
test("currency success, cache and explicit API failure", async ({ page }) => {
  let calls = 0;
  await page.route("https://api.frankfurter.app/**", (route) => {
    calls++;
    return route.fulfill({
      json: { date: "2026-11-05", rates: { EUR: 0.9, GBP: 0.8 } },
    });
  });
  await open(page, "currency-converter");
  await page
    .getByRole("button", { name: "Convert currency", exact: true })
    .click();
  await expect(page.locator(".big-result")).toHaveText("90 EUR");
  await page.getByLabel("To currency").selectOption("GBP");
  await page
    .getByRole("button", { name: "Convert currency", exact: true })
    .click();
  await expect(page.locator(".big-result")).toHaveText("80 GBP");
  expect(calls).toBe(1);
  await page.unroute("https://api.frankfurter.app/**");
  await page.route("https://api.frankfurter.app/**", (r) => r.abort());
  await page.getByLabel("From currency").selectOption("EUR");
  await page
    .getByRole("button", { name: "Convert currency", exact: true })
    .click();
  await expect(
    page.locator(".tool-workspace").getByRole("alert"),
  ).toContainText("unavailable");
});
test("age, BMI, loan and timer operate", async ({ page }) => {
  await open(page, "age-calculator");
  await expect(page.locator(".big-result")).toContainText("years");
  await open(page, "bmi-calculator");
  await expect(page.locator(".big-result")).toHaveText("22.9");
  await open(page, "loan-emi-calculator");
  await expect(page.locator(".stats")).toContainText("1,135.48");
  await page.getByLabel("Annual interest (%)").fill("0");
  await expect(page.locator(".stats")).toContainText("833.33");
  await open(page, "pomodoro-timer");
  await page.getByRole("button", { name: "Start focus", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Pause focus", exact: true }),
  ).toBeVisible();
  await page.waitForTimeout(1100);
  await page.getByRole("button", { name: "Pause focus", exact: true }).click();
  await expect(page.getByRole("timer")).not.toContainText("25:00");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByRole("timer")).toContainText("25:00");
});
test("home search, directory filters, mobile layout, SEO and static images", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Find a tool", { exact: true }).fill("pdf");
  await expect(page.locator(".search-suggestions a")).toHaveCount(3);
  await page.goto("/tools/");
  await page.getByRole("button", { name: "PDF", exact: true }).click();
  await expect(page.locator(".tools-grid .tool-card")).toHaveCount(3);
  await page.getByLabel("Search tools", { exact: true }).fill("split");
  await expect(page.locator(".tools-grid .tool-card")).toHaveCount(1);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await open(page, "word-counter");
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    /\/tools\/word-counter\/$/,
  );
  expect((await page.title()).length).toBeLessThan(60);
  const image = await page.request.get("/og/word-counter.png");
  expect(image.headers()["content-type"]).toContain("image/png");
  const sitemap = await page.request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/tools/pomodoro-timer/");
});
