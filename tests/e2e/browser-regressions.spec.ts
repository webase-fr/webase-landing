import { expect, test } from "@playwright/test";

test("un attribut d’extension sur body n’empêche pas l’hydratation", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    // Reproduce an extension that modifies the parsed DOM before React hydrates it.
    const observer = new MutationObserver(() => {
      if (!document.body) return;
      document.body.setAttribute("cz-shortcut-listen", "true");
      observer.disconnect();
    });
    observer.observe(document, { childList: true, subtree: true });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await expect(page.getByRole("navigation", { name: "Navigation mobile" })).toBeVisible();
  await expect(page.locator("body")).toHaveAttribute("cz-shortcut-listen", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Ouvrir le menu" })).toBeFocused();
  expect(errors).toEqual([]);
});

test("les petites impulsions de défilement restent natives et sans saut inverse", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const observations = [];
  for (const route of ["/", "/offres", "/estimation?format=complet"]) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(1100, 600);
    for (const direction of [1, -1]) {
      const initialY = await page.evaluate(() => scrollY);
      const observation = page.evaluate(async () => {
        const positions: number[] = [];
        const frames: number[] = [];
        let blocked = 0;
        let wheelCount = 0;
        function onWheel(event: WheelEvent) {
          wheelCount++;
          if (event.defaultPrevented) blocked++;
        }
        window.addEventListener("wheel", onWheel, { passive: true });
        await new Promise<void>((resolve) => {
          const start = performance.now();
          let previous = start;
          function frame(time: number) {
            frames.push(time - previous);
            previous = time;
            positions.push(scrollY);
            if (time - start < 1200) requestAnimationFrame(frame);
            else resolve();
          }
          requestAnimationFrame(frame);
        });
        window.removeEventListener("wheel", onWheel);
        return { positions, frames, blocked, wheelCount };
      });
      for (let pulse = 0; pulse < 20; pulse++) {
        await page.mouse.wheel(0, direction * 45);
        await page.waitForTimeout(12);
      }
      const result = await observation;
      const finalY = await page.evaluate(() => scrollY);
      expect((finalY - initialY) * direction, route).toBeGreaterThan(100);
      expect(result.wheelCount, route).toBeGreaterThan(0);
      expect(result.blocked, route).toBe(0);
      const reversed = result.positions.some(
        (position, index, all) => index > 0 && (position - all[index - 1]) * direction < -2,
      );
      expect(reversed, route).toBe(false);
      expect(
        await page
          .locator(".site-header")
          .evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
      ).toBeLessThanOrEqual(1);
      observations.push({ route, direction, initialY, finalY, ...result });
    }
  }
  // Timing is diagnostic, not a CI performance threshold: hardware and load differ.
  await testInfo.attach("native-scroll-observations", {
    body: JSON.stringify(observations, null, 2),
    contentType: "application/json",
  });
});
