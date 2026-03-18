import { test, expect } from '@playwright/test';

test.describe('Prototype iframes on SQOOL Classe case study', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to SQOOL Classe case study (full case mode)
    await page.goto('/?lang=fr');
    // Wait for SPA to hydrate
    await page.waitForTimeout(2000);
  });

  test('prototypes page loads standalone with GSAP', async ({ page }) => {
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t1');
    // Wait for page load
    await page.waitForLoadState('networkidle');

    // GSAP should be loaded (it defines window.gsap)
    const hasGsap = await page.evaluate(() => typeof (window as any).gsap !== 'undefined');
    expect(hasGsap).toBe(true);

    // proto-stage should exist
    const stage = page.locator('#proto-stage');
    await expect(stage).toBeVisible();

    // No console errors about blocked scripts
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.waitForTimeout(1000);
    expect(errors.filter(e => e.includes('Content Security Policy'))).toHaveLength(0);
  });

  test('prototypes page renders different prototypes per hash', async ({ page }) => {
    // Load T1 — check which TOC item has .active class (in DOM even if hidden)
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const active1 = await page.evaluate(() =>
      document.querySelector('.proto-toc-item.active')?.getAttribute('data-proto')
    );
    expect(active1).toBe('t1');

    // Load T5 — fresh navigation
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t5');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const active2 = await page.evaluate(() =>
      document.querySelector('.proto-toc-item.active')?.getAttribute('data-proto')
    );
    expect(active2).toBe('t5');
  });

  test('autoplay=0 pauses GSAP timeline', async ({ page }) => {
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Global timeline should be paused
    const isPaused = await page.evaluate(() => (window as any).gsap.globalTimeline.paused());
    expect(isPaused).toBe(true);
  });

  test('postMessage play resumes GSAP timeline', async ({ page }) => {
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Should be paused initially
    let isPaused = await page.evaluate(() => (window as any).gsap.globalTimeline.paused());
    expect(isPaused).toBe(true);

    // Send play message
    await page.evaluate(() => window.postMessage('play', '*'));
    await page.waitForTimeout(500);

    // Should be playing now
    isPaused = await page.evaluate(() => (window as any).gsap.globalTimeline.paused());
    expect(isPaused).toBe(false);
  });

  test('postMessage pause freezes GSAP timeline', async ({ page }) => {
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Play first
    await page.evaluate(() => window.postMessage('play', '*'));
    await page.waitForTimeout(500);

    // Pause
    await page.evaluate(() => window.postMessage('pause', '*'));
    await page.waitForTimeout(300);

    const isPaused = await page.evaluate(() => (window as any).gsap.globalTimeline.paused());
    expect(isPaused).toBe(true);
  });

  test('postMessage restart re-navigates to current prototype', async ({ page }) => {
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t3');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Play to advance timeline
    await page.evaluate(() => window.postMessage('play', '*'));
    await page.waitForTimeout(1000);

    // Restart
    await page.evaluate(() => window.postMessage('restart', '*'));
    await page.waitForTimeout(500);

    // Should still be on t3
    const activeProto = await page.evaluate(() => {
      const active = document.querySelector('.proto-toc-item.active');
      return active?.getAttribute('data-proto');
    });
    expect(activeProto).toBe('t3');

    // Timeline should be playing (restart resumes)
    const isPaused = await page.evaluate(() => (window as any).gsap.globalTimeline.paused());
    expect(isPaused).toBe(false);
  });

  test('hash routing switches between prototypes', async ({ page }) => {
    await page.goto('/prototypes/?embed=1&autoplay=0#t1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Navigate to SC1 via hash change
    await page.evaluate(() => { window.location.hash = 'sc1'; });
    await page.waitForTimeout(2000);

    const activeProto = await page.evaluate(() => {
      const active = document.querySelector('.proto-toc-item.active');
      return active?.getAttribute('data-proto');
    });
    expect(activeProto).toBe('sc1');
  });

  test('embed mode hides TOC and shows stage full-width', async ({ page }) => {
    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t1');
    await page.waitForLoadState('networkidle');

    // TOC should be hidden
    const tocVisible = await page.locator('.proto-toc').isVisible();
    expect(tocVisible).toBe(false);

    // Stage should be visible
    const stageVisible = await page.locator('#proto-stage').isVisible();
    expect(stageVisible).toBe(true);
  });

  test('no JavaScript console errors on prototype page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/prototypes/?embed=1&speed=0.8&autoplay=0&card=1#t1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Filter out non-critical warnings, only keep real errors
    const criticalErrors = errors.filter(e =>
      !e.includes('ResizeObserver') &&
      !e.includes('Non-Error')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('main portfolio page does not auto-scroll on load', async ({ page }) => {
    // Open SQOOL Classe case study
    await page.goto('/work/sqool-classe?lang=fr');
    await page.waitForTimeout(3000);

    // The scroll container should be at top (scrollTop near 0)
    const scrollTop = await page.evaluate(() => {
      const container = document.querySelector('.fixed.inset-0.overflow-y-auto') as HTMLElement;
      return container?.scrollTop ?? 0;
    });
    expect(scrollTop).toBeLessThan(50);
  });
});
