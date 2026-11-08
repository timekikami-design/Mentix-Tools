import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { tools, categories } from "../lib/tools";

test("Mentix live workspace, scroll motion and pause controls", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Mentix Tools home" }).first(),
  ).toBeVisible();
  await page.getByLabel("YOUR NEXT GREAT IDEA").fill("Clear work starts here.");
  await expect(page.locator(".live-stat-grid strong").first()).toHaveText("04");
  await page.getByRole("button", { name: "JSON 02", exact: true }).click();
  await page.getByRole("button", { name: "Format JSON", exact: true }).click();
  await expect(page.locator(".live-json-bottom [role=status]")).toHaveText(
    "Valid JSON. Nicely formatted.",
  );
  await page.getByLabel("A LITTLE STRUCTURE GOES A LONG WAY").fill("{broken}");
  await page.getByRole("button", { name: "Format JSON", exact: true }).click();
  await expect(page.locator(".live-json-bottom [role=status]")).toContainText(
    "Check the JSON",
  );
  await page.getByRole("button", { name: "Color 03", exact: true }).click();
  await page.getByLabel("Preview color").fill("#345678");
  await expect(page.locator(".live-color-bottom code")).toHaveText("#345678");
  await page.locator(".ticker").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Pause scrolling text" }).click();
  await expect(page.locator(".ticker-track")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await expect(page.getByRole("button", { name: "Back to top" })).toBeVisible();
  expect(
    await page
      .locator(".scroll-progress")
      .evaluate((e) => getComputedStyle(e).transform),
  ).not.toBe("matrix(0, 0, 0, 1, 0, 0)");
  expect(errors).toEqual([]);
});
test("responsive home and mobile navigation at 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toContainText("Already easier.");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByLabel("Open navigation", { exact: true }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "PDF tools", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("PDF tools.");
});
test("reduced-motion disables moving strip", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".ticker-track")).toHaveCSS(
    "animation-name",
    "none",
  );
});
test("every public page has independent title, canonical, description and sharing image", async ({
  request,
}) => {
  const urls = [
    "/",
    "/tools/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    ...tools.map((t) => `/tools/${t.slug}/`),
    ...categories.map((c) => `/tools/category/${c.toLowerCase()}/`),
  ];
  let canonicalOrigin = "";
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of urls) {
    const r = await request.get(path);
    expect(r.status(), path).toBe(200);
    const html = await r.text();
    const title = html
      .match(/<title>(.*?)<\/title>/)?.[1]
      ?.replace(/&amp;/g, "&")
      .replace(/&#x27;/g, "'");
    const description = html.match(
      /<meta name="description" content="([^"]*)"/,
    )?.[1];
    expect(title, path).toContain("Mentix Tools");
    expect(title!.length, path).toBeLessThan(60);
    expect(description, path).toBeTruthy();
    expect(description!.length, path).toBeLessThan(155);
    expect(titles.has(title!), path).toBe(false);
    expect(descriptions.has(description!), path).toBe(false);
    titles.add(title!);
    descriptions.add(description!);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical, path).toBeTruthy();
    canonicalOrigin ||= new URL(canonical!).origin;
    expect(canonical, path).toBe(`${canonicalOrigin}${path}`);
    expect(html, path).toContain('property="og:image"');
    expect(html, path).toContain('name="twitter:card"');
    if (path.startsWith("/tools/") && path.split("/").length === 4) {
      expect(html, path).toContain("SoftwareApplication");
      expect(html, path).toContain("FAQPage");
      expect(html, path).toContain("BreadcrumbList");
    }
  }
});
for (const path of ["/", "/tools/word-counter/", "/tools/color-picker/"])
  test(`WCAG AA: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    if (path.startsWith("/tools/"))
      await expect(page.locator(".tool-loading")).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          reason: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
