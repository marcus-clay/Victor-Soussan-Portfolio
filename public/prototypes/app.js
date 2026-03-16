// ============================================================
// GSAP Animations — Komète Dashboard iPad Mockup
// ============================================================

(function () {
  'use strict';

  // Skip homepage animations in embed mode
  if (new URLSearchParams(window.location.search).get('embed') === '1') return;

  // ============================================================
  // Responsive Scaling — fit iPad frame to any viewport
  // ============================================================
  const IPAD_W = 1080;
  const IPAD_H = 810;
  const FRAME_PAD = 28 * 2; // padding on each side of frame
  const FRAME_BORDER = 40; // extra for border-radius visual space

  function scaleIPad() {
    const frame = document.querySelector('.ipad-frame');
    if (!frame) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 40; // viewport margin

    const totalW = IPAD_W + FRAME_BORDER;
    const totalH = IPAD_H + FRAME_BORDER;

    const scaleX = (vw - pad) / totalW;
    const scaleY = (vh - pad) / totalH;
    const s = Math.min(scaleX, scaleY, 1); // never scale above 1

    frame.style.transform = `scale(${s})`;
  }

  function scaleBrowser() {
    const frame = document.querySelector('.browser-frame');
    if (!frame) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 40;

    const scaleX = (vw - pad) / 1140;
    const scaleY = (vh - pad) / 760;
    const s = Math.min(scaleX, scaleY, 1);

    frame.style.transform = `scale(${s})`;
  }

  scaleIPad();
  scaleBrowser();
  window.addEventListener('resize', () => { scaleIPad(); scaleBrowser(); });

  // --- Master timeline ---
  const master = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. iPad frame entrance — subtle 3D rotation into place
  // Wrap animation uses a container so it doesn't conflict with responsive scale
  master.fromTo(
    '.ipad-container',
    { opacity: 0, scale: 0.88, rotateX: 8, rotateY: -4 },
    { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.4, ease: 'power4.out' }
  );

  // 2. Header slides in
  master.to('.header', {
    opacity: 1,
    y: 0,
    duration: 0.6,
  }, '-=0.6');

  // 3. Filters bar
  master.to('.filters-bar', {
    opacity: 1,
    y: 0,
    duration: 0.5,
  }, '-=0.35');

  // 4. Nav tabs — stagger
  master.fromTo(
    '.nav-tab',
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
    '-=0.3'
  );

  // 5. Cards — stagger reveal
  master.to('.card', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: { amount: 0.5, from: 'start' },
    ease: 'back.out(1.4)',
  }, '-=0.2');

  // 6. Stat values — count-up animation
  master.add(() => {
    animateCounters();
  }, '-=0.3');

  // 7. Stat cards inner pop
  master.fromTo(
    '.stat-card, .stat-row, .gender-stat',
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.6)' },
    '-=0.5'
  );

  // 8. Trend badges
  master.fromTo(
    '.stat-trend',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'back.out(2)' },
    '-=0.3'
  );

  // --- Hover micro-interactions ---
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.10)', duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', duration: 0.3, ease: 'power2.out' });
    });
  });

  // Button export pulse
  document.querySelector('.btn-export')?.addEventListener('mouseenter', () => {
    gsap.fromTo('.btn-export', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1 });
  });

  // --- Looping subtle idle animation on iPad ---
  gsap.to('.ipad-container', {
    rotateX: 1.5,
    rotateY: 1,
    duration: 4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 2,
  });

  // ============================================================
  // SQOOL Section — ScrollTrigger animations
  // ============================================================
  gsap.registerPlugin(ScrollTrigger);

  // Browser frame entrance
  gsap.to('.browser-container', {
    opacity: 1,
    duration: 0.01,
    scrollTrigger: {
      trigger: '#section-sqool',
      start: 'top 80%',
    },
  });

  gsap.fromTo('.browser-container',
    { scale: 0.9, rotateX: 6, rotateY: -3, opacity: 0 },
    {
      scale: 1, rotateX: 0, rotateY: 0, opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#section-sqool',
        start: 'top 75%',
      },
    }
  );

  // SQOOL header
  gsap.to('.sqool-header', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#section-sqool',
      start: 'top 65%',
    },
  });

  // SQOOL cards stagger
  gsap.to('.sqool-card', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.4)',
    scrollTrigger: {
      trigger: '.sqool-cards-grid',
      start: 'top 80%',
    },
  });

  // SQOOL card hover interactions
  document.querySelectorAll('.sqool-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, scale: 1.03, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Subtle idle float on browser
  gsap.to('.browser-container', {
    rotateX: 1,
    rotateY: 0.8,
    duration: 5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 3,
  });

  // ============================================================
  // Counter Animation
  // ============================================================
  function animateCounters() {
    document.querySelectorAll('.stat-value').forEach((el) => {
      const text = el.textContent.trim();
      // Match values like "1,4 M", "79%", "85%"
      const match = text.match(/^([\d,]+)\s*(%|M)?$/);
      if (!match) return;

      const numStr = match[1].replace(',', '.');
      const target = parseFloat(numStr);
      const suffix = match[2] || '';
      const hasComma = match[1].includes(',');

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate() {
          let display;
          if (hasComma) {
            display = obj.val.toFixed(1).replace('.', ',');
          } else {
            display = Math.round(obj.val).toString();
          }
          el.textContent = display + (suffix === 'M' ? ' M' : suffix);
        },
      });
    });
  }

  // Section 3 flow moved to prototypes.js
  if (false) { // OLD CODE — disabled

    const progressFill = section.querySelector('.flow-progress-fill');
    const dots = section.querySelectorAll('.flow-step-dot');
    const stepNum = document.getElementById('flow-step-num');
    const teacherPad = document.getElementById('flow-teacher');
    const studentPad = document.getElementById('flow-student');
    const bridge = document.getElementById('flow-bridge');
    const btnReplay = document.getElementById('flow-replay');

    const views = {
      ts1: document.getElementById('teacher-s1'),
      ts2: document.getElementById('teacher-s2'),
      ss3: document.getElementById('student-s3'),
    };

    const spring = 'elastic.out(1, 0.5)';
    const springS = 'back.out(1.7)';
    const smooth = 'power3.out';

    let flowTL = null;
    let played = false;

    // --- Entrance ---
    gsap.to(section.querySelector('.flow-intro'), {
      opacity: 1, y: 0, duration: 0.8, ease: smooth,
      scrollTrigger: { trigger: section, start: 'top 75%' }
    });
    gsap.to(section.querySelector('.flow-progress'), {
      opacity: 1, y: 0, duration: 0.6, ease: smooth,
      scrollTrigger: { trigger: section, start: 'top 65%' }
    });
    gsap.to(section.querySelector('.flow-controls'), {
      opacity: 1, y: 0, duration: 0.6, ease: smooth,
      scrollTrigger: { trigger: section, start: 'top 50%' }
    });
    gsap.fromTo(teacherPad,
      { opacity: 0, y: 50, rotateY: 5 },
      { opacity: 1, y: 0, rotateY: 0, duration: 1, ease: springS,
        scrollTrigger: { trigger: '.flow-stage', start: 'top 70%' } }
    );
    gsap.fromTo(studentPad,
      { opacity: 0, y: 50, rotateY: -5 },
      { opacity: 1, y: 0, rotateY: 0, duration: 1, ease: springS, delay: 0.2,
        scrollTrigger: { trigger: '.flow-stage', start: 'top 70%' } }
    );
    gsap.to(bridge, { opacity: 1, duration: 0.5,
      scrollTrigger: { trigger: '.flow-stage', start: 'top 60%' } });

    // Auto-play
    ScrollTrigger.create({
      trigger: '.flow-stage', start: 'top 50%', once: true,
      onEnter: () => { if (!played) { played = true; setTimeout(playFlow, 800); } }
    });

    btnReplay?.addEventListener('click', () => { resetFlow(); setTimeout(playFlow, 400); });

    dots.forEach(d => d.addEventListener('click', () => {
      if (flowTL) flowTL.kill();
      jumpToStep(parseInt(d.dataset.step));
    }));

    function setStep(n) {
      if (stepNum) stepNum.textContent = n;
      progressFill.style.width = ((n / 5) * 100) + '%';
      dots.forEach(d => {
        const s = parseInt(d.dataset.step);
        d.classList.remove('active', 'done');
        if (s < n) d.classList.add('done');
        if (s === n) d.classList.add('active');
      });
    }

    function showView(id) {
      const el = views[id]; if (!el) return;
      el.classList.remove('hidden');
      gsap.fromTo(el, { opacity: 0, x: 30, scale: .97 }, { opacity: 1, x: 0, scale: 1, duration: .5, ease: springS });
    }

    function hideView(id) {
      const el = views[id]; if (!el) return;
      gsap.to(el, { opacity: 0, x: -30, scale: .97, duration: .3, ease: smooth, onComplete: () => el.classList.add('hidden') });
    }

    function zoomPad(pad, zoom) {
      gsap.to(pad.querySelector('.flow-bezel'), {
        scale: zoom ? 1.06 : 1,
        duration: zoom ? .5 : .4,
        ease: zoom ? spring : smooth
      });
    }

    function moveCursor(cursorId, targetSel, callback) {
      const cursor = document.getElementById(cursorId);
      if (!cursor) { callback?.(); return; }
      const tl = gsap.timeline({ onComplete: callback });

      // Find target position relative to the flow-screen
      const screen = cursor.closest('.flow-screen');
      const target = screen.querySelector(targetSel);
      if (!target) { callback?.(); return; }

      const tr = target.getBoundingClientRect();
      const sr = screen.getBoundingClientRect();
      const tx = tr.left - sr.left + tr.width * 0.6;
      const ty = tr.top - sr.top + tr.height * 0.5;

      tl.set(cursor, { left: tx + 40, top: ty + 40, opacity: 0 });
      tl.to(cursor, { left: tx, top: ty, opacity: 1, duration: .6, ease: 'power2.out' });
      // Click press
      tl.to(cursor, { scale: .85, duration: .08 });
      tl.to(cursor, { scale: 1, duration: .15, ease: springS });
      // Target highlight
      tl.to(target, { scale: .97, duration: .08 }, '-=.23');
      tl.to(target, { scale: 1, duration: .35, ease: spring }, '-=.15');
      // Cursor fade
      tl.to(cursor, { opacity: 0, duration: .2 }, '+=.15');
    }

    function animateBridge() {
      const tl = gsap.timeline();
      const bdots = bridge.querySelectorAll('.bridge-dots-v span');
      const bicon = bridge.querySelector('.bridge-icon-v');
      tl.to(bicon, { scale: 1.2, duration: .3, ease: springS });
      tl.fromTo(bdots, { opacity: 0, y: -10 }, { opacity: 1, y: 10, duration: .4, stagger: .06, ease: 'power2.out' }, '-=.1');
      tl.to(bdots, { opacity: 0, duration: .2, stagger: .04 });
      tl.to(bicon, { scale: 1, duration: .3, ease: smooth }, '-=.2');
      return tl;
    }

    function resetFlow() {
      if (flowTL) flowTL.kill();
      setStep(1);
      // Reset views
      views.ts1.classList.remove('hidden'); gsap.set(views.ts1, { opacity: 1, x: 0, scale: 1 });
      views.ts2.classList.add('hidden'); gsap.set(views.ts2, { opacity: 0, x: 0, scale: 1 });
      views.ss3.classList.remove('hidden'); gsap.set(views.ss3, { opacity: 1, x: 0, scale: 1 });
      // Reset interactive states
      gsap.set('#emma-popup', { opacity: 0, y: 10, scale: .9 });
      gsap.set('#sc-sidebar', { opacity: 0, x: 20 });
      gsap.set('.flow-click-cursor', { opacity: 0 });
      // Reset student UI
      const confirmP = document.getElementById('confirm-panel');
      const msgPanel = document.getElementById('panel-messages');
      if (confirmP) confirmP.classList.add('hidden');
      if (msgPanel) msgPanel.style.display = '';
      document.querySelectorAll('.sc-msg-chip').forEach(c => c.classList.remove('selected'));
      // Reset toggle
      const toggle = document.getElementById('toggle-interactions');
      if (toggle) { toggle.classList.remove('on'); toggle.classList.add('off'); }
      // Zoom out
      zoomPad(teacherPad, false);
      zoomPad(studentPad, false);
      // Reset student cards interactive borders
      document.querySelectorAll('#students-grid-2 .sc-student-card').forEach(c => {
        gsap.set(c, { opacity: 0, y: 10, scale: .95 });
      });
      gsap.set('.sc-tool-tabs', { opacity: 0, y: -10 });
      gsap.set('#chat-bubble-1', { scale: 1 });
    }

    function playFlow() {
      resetFlow();
      flowTL = gsap.timeline({ delay: .3 });

      // ===== STEP 1: Teacher opens class, sees student grid =====
      flowTL.add(() => setStep(1));
      flowTL.add(() => zoomPad(teacherPad, true));
      // Stagger student cards entrance
      flowTL.fromTo('#students-grid-1 .sc-student-card',
        { opacity: 0, y: 8, scale: .95 },
        { opacity: 1, y: 0, scale: 1, duration: .4, stagger: .04, ease: springS },
        '+=.3'
      );
      flowTL.add(() => {}, '+=.6');

      // Cursor clicks toggle "Voir les interactions"
      flowTL.add((resolve) => {
        moveCursor('cursor-s1', '#toggle-interactions', resolve);
      });
      flowTL.add(() => {}, '+=.6');

      // ===== STEP 2: Toggle ON → transition to active session =====
      flowTL.add(() => setStep(2));
      // Animate toggle
      flowTL.add(() => {
        const toggle = document.getElementById('toggle-interactions');
        if (toggle) { toggle.classList.remove('off'); toggle.classList.add('on'); }
      });
      flowTL.add(() => {}, '+=.4');

      // Transition: hide screen 1, show screen 2
      flowTL.add(() => hideView('ts1'));
      flowTL.add(() => {}, '+=.35');
      flowTL.add(() => showView('ts2'));

      // Animate tool tabs
      flowTL.to('.sc-tool-tabs', { opacity: 1, y: 0, duration: .4, ease: springS }, '+=.2');

      // Stagger student cards with interaction borders
      flowTL.fromTo('#students-grid-2 .sc-student-card',
        { opacity: 0, y: 10, scale: .95 },
        { opacity: 1, y: 0, scale: 1, duration: .4, stagger: .05, ease: springS },
        '-=.2'
      );

      // Sidebar slides in
      flowTL.to('#sc-sidebar', { opacity: 1, x: 0, duration: .5, ease: springS }, '-=.3');

      flowTL.add(() => {}, '+=.6');

      // ===== Bridge: Teacher → Student =====
      flowTL.add(() => zoomPad(teacherPad, false));
      flowTL.add(animateBridge, '+=.2');

      // ===== STEP 3: Student consults resources =====
      flowTL.add(() => setStep(3));
      flowTL.add(() => zoomPad(studentPad, true));

      // Cursor clicks on a resource
      flowTL.add((resolve) => {
        moveCursor('cursor-s3', '.sc-resource:first-child', resolve);
      }, '+=.4');

      // Highlight resource briefly
      flowTL.to('.sc-resource:first-child', { background: 'rgba(14,165,233,.1)', duration: .3 }, '-=.1');
      flowTL.to('.sc-resource:first-child', { background: '#f8fafc', duration: .3 }, '+=.5');

      flowTL.add(() => {}, '+=.5');

      // ===== STEP 4: Student clicks "J'ai terminé" and sends =====
      flowTL.add(() => setStep(4));

      // Cursor clicks "J'ai terminé" chip
      flowTL.add((resolve) => {
        moveCursor('cursor-s3', '#chip-done', resolve);
      });
      // Chip becomes selected
      flowTL.add(() => {
        const chip = document.getElementById('chip-done');
        if (chip) chip.classList.add('selected');
      });
      flowTL.add(() => {}, '+=.4');

      // Cursor clicks "Envoyer"
      flowTL.add((resolve) => {
        moveCursor('cursor-s3', '#btn-send', resolve);
      });

      // Button press animation
      flowTL.to('#btn-send', { scale: .95, duration: .08 }, '-=.2');
      flowTL.to('#btn-send', { scale: 1, duration: .3, ease: spring }, '-=.12');

      // Show confirmation, hide message panel
      flowTL.add(() => {
        const msgPanel = document.getElementById('panel-messages');
        const confirmP = document.getElementById('confirm-panel');
        if (msgPanel) gsap.to(msgPanel, { opacity: 0, scale: .95, duration: .3, onComplete: () => { msgPanel.style.display = 'none'; } });
        if (confirmP) {
          confirmP.classList.remove('hidden');
          gsap.fromTo(confirmP, { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .5, ease: spring });
        }
      });

      flowTL.add(() => {}, '+=.5');

      // ===== Bridge: Student → Teacher =====
      flowTL.add(() => zoomPad(studentPad, false));
      flowTL.add(animateBridge, '+=.2');

      // ===== STEP 5: Teacher receives Emma's popup =====
      flowTL.add(() => setStep(5));
      flowTL.add(() => zoomPad(teacherPad, true));

      // Emma's card pulses
      flowTL.to('#emma-card', {
        boxShadow: '0 0 0 3px rgba(239,68,68,.4), 0 0 16px rgba(239,68,68,.15)',
        duration: .4, ease: spring
      }, '+=.3');

      // Popup appears with spring
      flowTL.to('#emma-popup', {
        opacity: 1, y: 0, scale: 1,
        duration: .5, ease: spring
      }, '+=.2');

      // Chat bubble notification bounce
      flowTL.to('#chat-bubble-1', { scale: 1.15, duration: .15, yoyo: true, repeat: 2, ease: 'power2.inOut' }, '-=.3');

      // Hold for a moment
      flowTL.add(() => {}, '+=1.2');

      // Final: zoom out both
      flowTL.add(() => {
        zoomPad(teacherPad, false);
        zoomPad(studentPad, false);
      });
    }

    function jumpToStep(step) {
      if (flowTL) flowTL.kill();
      setStep(step);
      // Reset all views
      gsap.set('.flow-click-cursor', { opacity: 0 });
      views.ts1.classList.add('hidden'); gsap.set(views.ts1, { opacity: 0, x: 0, scale: 1 });
      views.ts2.classList.add('hidden'); gsap.set(views.ts2, { opacity: 0, x: 0, scale: 1 });
      views.ss3.classList.remove('hidden'); gsap.set(views.ss3, { opacity: 1, x: 0, scale: 1 });

      // Reset student
      const confirmP = document.getElementById('confirm-panel');
      const msgPanel = document.getElementById('panel-messages');
      if (confirmP) confirmP.classList.add('hidden');
      if (msgPanel) { msgPanel.style.display = ''; gsap.set(msgPanel, { opacity: 1, scale: 1 }); }
      document.querySelectorAll('.sc-msg-chip').forEach(c => c.classList.remove('selected'));
      gsap.set('#emma-popup', { opacity: 0, y: 10, scale: .9 });

      switch (step) {
        case 1:
        case 2:
          if (step === 1) {
            views.ts1.classList.remove('hidden'); gsap.set(views.ts1, { opacity: 1 });
            zoomPad(teacherPad, true); zoomPad(studentPad, false);
          } else {
            views.ts2.classList.remove('hidden'); gsap.set(views.ts2, { opacity: 1 });
            gsap.set('#sc-sidebar', { opacity: 1, x: 0 });
            gsap.set('.sc-tool-tabs', { opacity: 1, y: 0 });
            gsap.set('#students-grid-2 .sc-student-card', { opacity: 1, y: 0, scale: 1 });
            zoomPad(teacherPad, true); zoomPad(studentPad, false);
          }
          break;
        case 3:
        case 4:
          views.ts2.classList.remove('hidden'); gsap.set(views.ts2, { opacity: 1 });
          gsap.set('#sc-sidebar', { opacity: 1, x: 0 });
          gsap.set('.sc-tool-tabs', { opacity: 1, y: 0 });
          gsap.set('#students-grid-2 .sc-student-card', { opacity: 1, y: 0, scale: 1 });
          zoomPad(teacherPad, false); zoomPad(studentPad, true);
          if (step === 4) {
            document.getElementById('chip-done')?.classList.add('selected');
          }
          break;
        case 5:
          views.ts2.classList.remove('hidden'); gsap.set(views.ts2, { opacity: 1 });
          gsap.set('#sc-sidebar', { opacity: 1, x: 0 });
          gsap.set('.sc-tool-tabs', { opacity: 1, y: 0 });
          gsap.set('#students-grid-2 .sc-student-card', { opacity: 1, y: 0, scale: 1 });
          gsap.set('#emma-popup', { opacity: 1, y: 0, scale: 1 });
          gsap.set('#emma-card', { boxShadow: '0 0 0 3px rgba(239,68,68,.4), 0 0 16px rgba(239,68,68,.15)' });
          if (confirmP) { confirmP.classList.remove('hidden'); gsap.set(confirmP, { opacity: 1, scale: 1 }); }
          if (msgPanel) msgPanel.style.display = 'none';
          zoomPad(teacherPad, true); zoomPad(studentPad, true);
          break;
      }
    }
  } // END OLD FLOW CODE

  // ============================================================
  // WebGL Particle Background — Floating light particles
  // ============================================================
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) { console.warn('WebGL not supported'); return; }

  // Resize
  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  // Shaders
  const vsSource = `
    attribute vec2 aPosition;
    attribute float aSize;
    attribute float aAlpha;
    uniform vec2 uResolution;
    varying float vAlpha;
    void main() {
      vec2 clip = (aPosition / uResolution) * 2.0 - 1.0;
      clip.y = -clip.y;
      gl_Position = vec4(clip, 0.0, 1.0);
      gl_PointSize = aSize;
      vAlpha = aAlpha;
    }
  `;

  const fsSource = `
    precision mediump float;
    varying float vAlpha;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = smoothstep(0.5, 0.15, dist) * vAlpha;
      gl_FragColor = vec4(0.91, 0.22, 0.35, alpha * 0.35);
    }
  `;

  function compileShader(src, type) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const vs = compileShader(vsSource, gl.VERTEX_SHADER);
  const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const aPosition = gl.getAttribLocation(prog, 'aPosition');
  const aSize = gl.getAttribLocation(prog, 'aSize');
  const aAlpha = gl.getAttribLocation(prog, 'aAlpha');
  const uResolution = gl.getUniformLocation(prog, 'uResolution');

  // Particles
  const COUNT = 60;
  const particles = [];
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth * devicePixelRatio,
      y: Math.random() * window.innerHeight * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.15,
      size: Math.random() * 4 + 1.5,
      alpha: Math.random() * 0.6 + 0.2,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    });
  }

  const posBuf = gl.createBuffer();
  const sizeBuf = gl.createBuffer();
  const alphaBuf = gl.createBuffer();

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  function drawParticles(t) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uResolution, canvas.width, canvas.height);

    const positions = new Float32Array(COUNT * 2);
    const sizes = new Float32Array(COUNT);
    const alphas = new Float32Array(COUNT);

    const w = canvas.width;
    const h = canvas.height;

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      p.x += p.vx + Math.sin(t * 0.0008 + p.phaseX) * 0.3;
      p.y += p.vy + Math.cos(t * 0.0006 + p.phaseY) * 0.2;

      // Wrap around
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      positions[i * 2] = p.x;
      positions[i * 2 + 1] = p.y;
      sizes[i] = p.size * devicePixelRatio;
      alphas[i] = p.alpha * (0.7 + 0.3 * Math.sin(t * 0.001 + p.phaseX));
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(aSize);
    gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuf);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(aAlpha);
    gl.vertexAttribPointer(aAlpha, 1, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, COUNT);
  }

  // Render loop
  function loop(t) {
    drawParticles(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
