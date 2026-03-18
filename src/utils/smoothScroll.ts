/**
 * Apple HIG-inspired smooth scroll
 * Uses ease-out quint curve for natural deceleration, similar to iOS scroll behavior.
 * Duration scales with distance (400ms min, 900ms max) for a consistent feel.
 */

const easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5);

export function smoothScrollTo(
  container: HTMLElement | Window,
  targetTop: number,
  durationOverride?: number
): void {
  const isWindow = container === window;
  const currentTop = isWindow
    ? window.pageYOffset || document.documentElement.scrollTop
    : (container as HTMLElement).scrollTop;

  const distance = Math.abs(targetTop - currentTop);
  if (distance < 1) return;

  const duration = durationOverride ?? Math.min(900, Math.max(400, distance * 0.6));
  let startTime: number | null = null;

  const animate = (time: number) => {
    if (startTime === null) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const position = currentTop + (targetTop - currentTop) * easeOutQuint(progress);

    if (isWindow) {
      window.scrollTo(0, position);
    } else {
      (container as HTMLElement).scrollTop = position;
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}
