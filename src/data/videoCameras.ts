/**
 * Camera shots of the recorded prototypes (VideoPlayer plays them through VideoCamera), by video path.
 * Each shot frames the point (x, y) of the video, in shares of its width and height, at `zoom`, from `at`
 * seconds; the first shot is the whole frame. Measured on each video (where the picture changes, and when):
 * a push-in on each burst of local activity (a field, a menu, a panel), back to the whole frame when the
 * whole screen changes and before the loop restarts. Tight crops and small recordings push in less (1.35 at
 * most). Videos that are already edited films (Connect bubble, studies) or diagrams have no entry.
 */
export interface VideoShot {
  at: number
  x: number
  y: number
  zoom: number
}

export const VIDEO_CAMERAS: Record<string, VideoShot[]> = {
  // RiskOS: the interface sits small on a dark canvas, so the camera always frames it (the part of the
  // picture that is not the canvas) and pushes in further on each action, up to 1.8x, for the text to read
  '/videos/riskos/00-live-prototype-fit.mp4': [
    { at: 0, x: 0.499, y: 0.499, zoom: 1 },
    { at: 4.6, x: 0.3, y: 0.313, zoom: 1.67 },
    { at: 12.85, x: 0.433, y: 0.3, zoom: 1.67 },
    { at: 13.85, x: 0.367, y: 0.359, zoom: 1.39 },
    { at: 15.85, x: 0.3, y: 0.313, zoom: 1.67 },
    { at: 18.4, x: 0.499, y: 0.499, zoom: 1 },
  ],
  '/videos/riskos/01-hero-triage-fit.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 5.85, x: 0.346, y: 0.498, zoom: 1.67 },
    { at: 7.6, x: 0.489, y: 0.432, zoom: 1.67 },
    { at: 9.85, x: 0.46, y: 0.486, zoom: 1.67 },
    { at: 12.35, x: 0.476, y: 0.476, zoom: 1.05 },
    { at: 14.9, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/riskos/02-ai-insight-fit.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 0.85, x: 0.484, y: 0.442, zoom: 1.13 },
    { at: 5.6, x: 0.336, y: 0.39, zoom: 1.67 },
    { at: 7.85, x: 0.493, y: 0.421, zoom: 1.19 },
    { at: 10.35, x: 0.498, y: 0.479, zoom: 1.21 },
    { at: 13.9, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/riskos/03-decision-ellipses-fit.mp4': [
    { at: 0, x: 0.278, y: 0.314, zoom: 1.8 },
    { at: 2.35, x: 0.278, y: 0.48, zoom: 1.8 },
    { at: 4.6, x: 0.539, y: 0.426, zoom: 1.21 },
    { at: 6.1, x: 0.673, y: 0.503, zoom: 1.67 },
    { at: 7.85, x: 0.534, y: 0.426, zoom: 1.26 },
    { at: 10.6, x: 0.406, y: 0.632, zoom: 1.67 },
    { at: 12.6, x: 0.495, y: 0.497, zoom: 1.14 },
    { at: 13.9, x: 0.278, y: 0.314, zoom: 1.8 },
  ],
  '/videos/riskos/04-queue-cleared-fit.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 0.85, x: 0.503, y: 0.336, zoom: 1.49 },
    { at: 1.85, x: 0.512, y: 0.665, zoom: 1.67 },
    { at: 2.85, x: 0.506, y: 0.5, zoom: 1.18 },
    { at: 12.9, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/riskos/05-false-positive-fit.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 1.6, x: 0.398, y: 0.413, zoom: 1.8 },
    { at: 9.9, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/riskos/06-before-after-fit.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 1.35, x: 0.278, y: 0.446, zoom: 1.8 },
    { at: 5.35, x: 0.492, y: 0.512, zoom: 1.06 },
    { at: 10.9, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/riskos/07-data-flow-fit.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/riskos/08-inbox-filter.mp4': [
    { at: 0, x: 0.495, y: 0.495, zoom: 1.03 },
    { at: 1.1, x: 0.636, y: 0.439, zoom: 1.67 },
    { at: 2.6, x: 0.688, y: 0.337, zoom: 1.67 },
    { at: 6.35, x: 0.495, y: 0.495, zoom: 1.03 },
  ],
  '/videos/riskos/09-ask-context.mp4': [
    { at: 0, x: 0.369, y: 0.3, zoom: 1.67 },
    { at: 2.6, x: 0.5, y: 0.5, zoom: 1 },
    { at: 3.85, x: 0.303, y: 0.314, zoom: 1.67 },
    { at: 6.1, x: 0.5, y: 0.5, zoom: 1 },
    { at: 10.7, x: 0.369, y: 0.3, zoom: 1.67 },
  ],
  '/videos/toolkit/video_-_batch_edition.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 0.75, x: 0.427, y: 0.573, zoom: 1.17 },
    { at: 2.1, x: 0.5, y: 0.5, zoom: 1 },
    { at: 3.15, x: 0.619, y: 0.688, zoom: 1.6 },
    { at: 5.3, x: 0.5, y: 0.5, zoom: 1 },
    { at: 6.75, x: 0.502, y: 0.608, zoom: 1.6 },
    { at: 10.5, x: 0.5, y: 0.5, zoom: 1 },
    { at: 15.55, x: 0.382, y: 0.618, zoom: 1.31 },
    { at: 17.150000000000002, x: 0.5, y: 0.5, zoom: 1 },
    { at: 22.95, x: 0.486, y: 0.688, zoom: 1.6 },
    { at: 26.55, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/toolkit/video_-_navigation_-_show_hide-fit.mp4': [
    { at: 0, x: 0.37, y: 0.37, zoom: 1.35 },
    { at: 0.8999999999999999, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/toolkit/video_-_navigation_-_show_hide.mp4': [
    { at: 0, x: 0.313, y: 0.313, zoom: 1.6 },
    { at: 0.8999999999999999, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/toolkit/video_-_task_manipulation.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 11.35, x: 0.504, y: 0.688, zoom: 1.6 },
    { at: 12.899999999999999, x: 0.5, y: 0.522, zoom: 1.29 },
    { at: 14.35, x: 0.459, y: 0.406, zoom: 1.6 },
    { at: 17.1, x: 0.5, y: 0.5, zoom: 1 },
    { at: 17.95, x: 0.5, y: 0.5, zoom: 1 },
    { at: 18.55, x: 0.658, y: 0.37, zoom: 1.46 },
    { at: 20.5, x: 0.5, y: 0.5, zoom: 1 },
    { at: 27.15, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/dailymotion/Geoblocking.mp4': [
    { at: 0, x: 0.425, y: 0.382, zoom: 1.6 },
    { at: 1.95, x: 0.5, y: 0.5, zoom: 1 },
    { at: 16.15, x: 0.442, y: 0.464, zoom: 1.22 },
    { at: 19.3, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4': [
    { at: 0, x: 0.688, y: 0.688, zoom: 1.6 },
    { at: 27.7, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/dailymotion/video_2025-11-10_02.26.48.mp4': [
    { at: 0, x: 0.37, y: 0.37, zoom: 1.35 },
    { at: 1.3, x: 0.37, y: 0.421, zoom: 1.35 },
    { at: 2.5, x: 0.63, y: 0.548, zoom: 1.35 },
    { at: 3.9000000000000004, x: 0.37, y: 0.37, zoom: 1.35 },
    { at: 6.1, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/dailymotion/video_add_subtitle.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 20.55, x: 0.63, y: 0.63, zoom: 1.35 },
    { at: 21.5, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/connect/connect-dashboard-prototype-compressed.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 28.15, x: 0.37, y: 0.385, zoom: 1.35 },
    { at: 29.7, x: 0.5, y: 0.5, zoom: 1 },
    { at: 31.55, x: 0.37, y: 0.37, zoom: 1.35 },
    { at: 32.5, x: 0.5, y: 0.5, zoom: 1 },
    { at: 46.95, x: 0.5, y: 0.5, zoom: 1 },
    { at: 49.55, x: 0.598, y: 0.385, zoom: 1.35 },
    { at: 51.1, x: 0.5, y: 0.5, zoom: 1 },
    { at: 52.15, x: 0.5, y: 0.5, zoom: 1 },
    { at: 55.35, x: 0.63, y: 0.37, zoom: 1.35 },
    { at: 56.9, x: 0.5, y: 0.5, zoom: 1 },
    { at: 58.35, x: 0.5, y: 0.5, zoom: 1 },
    { at: 59.15, x: 0.63, y: 0.394, zoom: 1.35 },
    { at: 60.900000000000006, x: 0.63, y: 0.37, zoom: 1.35 },
    { at: 63.7, x: 0.5, y: 0.5, zoom: 1 },
    { at: 69.35, x: 0.37, y: 0.43, zoom: 1.35 },
    { at: 70.7, x: 0.5, y: 0.5, zoom: 1 },
    { at: 72.95, x: 0.37, y: 0.37, zoom: 1.35 },
    { at: 74.7, x: 0.37, y: 0.37, zoom: 1.35 },
    { at: 76.10000000000001, x: 0.5, y: 0.5, zoom: 1 },
    { at: 87.75, x: 0.404, y: 0.37, zoom: 1.35 },
    { at: 92.5, x: 0.5, y: 0.5, zoom: 1 },
  ],
  '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4': [
    { at: 0, x: 0.5, y: 0.5, zoom: 1 },
    { at: 20.35, x: 0.313, y: 0.539, zoom: 1.6 },
    { at: 22.35, x: 0.5, y: 0.5, zoom: 1 },
    { at: 28.15, x: 0.313, y: 0.382, zoom: 1.6 },
    { at: 29.7, x: 0.5, y: 0.5, zoom: 1 },
    { at: 31.55, x: 0.325, y: 0.313, zoom: 1.6 },
    { at: 32.5, x: 0.5, y: 0.5, zoom: 1 },
    { at: 46.95, x: 0.5, y: 0.5, zoom: 1 },
    { at: 49.55, x: 0.688, y: 0.313, zoom: 1.6 },
    { at: 51.1, x: 0.5, y: 0.5, zoom: 1 },
    { at: 52.15, x: 0.5, y: 0.5, zoom: 1 },
    { at: 58.35, x: 0.5, y: 0.5, zoom: 1 },
    { at: 69.35, x: 0.313, y: 0.43, zoom: 1.6 },
    { at: 70.7, x: 0.5, y: 0.5, zoom: 1 },
    { at: 72.95, x: 0.313, y: 0.313, zoom: 1.6 },
    { at: 74.7, x: 0.313, y: 0.313, zoom: 1.6 },
    { at: 76.10000000000001, x: 0.5, y: 0.5, zoom: 1 },
    { at: 89.55, x: 0.394, y: 0.361, zoom: 1.57 },
    { at: 92.5, x: 0.5, y: 0.5, zoom: 1 },
  ],
}
