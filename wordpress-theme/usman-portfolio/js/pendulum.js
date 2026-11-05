/**
 * Pendulum Pull-Cord — realistic swinging rope with wooden bulb
 * Physics-based cursor interaction
 */
(function () {
  'use strict';

  const canvas = document.getElementById('pendulum-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ─── CONFIG ─────────────────────────────────────
  const PIVOT_X_RATIO  = 0.12;       // horizontal position (% of viewport)
  const ROPE_LENGTH    = 280;        // total rope length in px
  const BULB_RADIUS    = 18;         // radius of the wooden bulb
  const ROPE_SEGMENTS  = 30;         // segments for catenary/curve drawing
  const ROPE_WIDTH     = 2.8;        // rope thickness
  const GRAVITY        = 0.0015;     // gravitational pull
  const DAMPING        = 0.995;      // friction (0.99 = light, 0.98 = heavy)
  const CURSOR_RADIUS  = 50;         // radius of cursor influence
  const PUSH_STRENGTH  = 0.00025;    // how hard cursor pushes

  // ─── STATE ──────────────────────────────────────
  let angle       = 0;               // current angle (radians, 0 = straight down)
  let angleVel    = 0;               // angular velocity
  let pivotX      = 0;
  let pivotY      = -15;             // just above viewport top edge
  let mouseX      = -9999;
  let mouseY      = -9999;
  let mousePrevX  = -9999;
  let isHovering  = false;
  let dpr         = 1;

  // ─── RESIZE ─────────────────────────────────────
  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pivotX = window.innerWidth * PIVOT_X_RATIO;
  }
  window.addEventListener('resize', resize);
  resize();

  // ─── MOUSE TRACKING ────────────────────────────
  document.addEventListener('mousemove', function (e) {
    mousePrevX = mouseX;
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  document.addEventListener('mouseleave', function () {
    mouseX = -9999;
    mouseY = -9999;
  });

  // ─── HELPER: get bulb position ──────────────────
  function getBulbPos() {
    return {
      x: pivotX + Math.sin(angle) * ROPE_LENGTH,
      y: pivotY + Math.cos(angle) * ROPE_LENGTH
    };
  }

  // ─── PHYSICS TICK ───────────────────────────────
  function physics() {
    // Gravity restoring torque: -g/L * sin(theta)
    var gravAccel = -GRAVITY * Math.sin(angle);

    // Cursor push
    var bulb = getBulbPos();
    var dx = mouseX - bulb.x;
    var dy = mouseY - bulb.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < CURSOR_RADIUS + BULB_RADIUS + 10 && dist > 0) {
      isHovering = true;
      // Push perpendicular to the rope (tangential force)
      var mouseVelX = mouseX - mousePrevX;
      // Project cursor velocity onto tangent direction
      var tangentX = Math.cos(angle);   // tangent = perpendicular to rope
      var push = mouseVelX * tangentX * PUSH_STRENGTH;

      // Also push away from cursor if overlapping
      var overlap = (CURSOR_RADIUS + BULB_RADIUS + 10) - dist;
      if (overlap > 0) {
        var pushAway = -dx / dist * overlap * 0.0003;
        push += pushAway * Math.cos(angle);
      }
      angleVel += push;
    } else {
      isHovering = false;
    }

    angleVel += gravAccel;
    angleVel *= DAMPING;
    angle    += angleVel;

    // Clamp to prevent wild swings
    if (angle > 1.2)  { angle = 1.2;  angleVel *= -0.3; }
    if (angle < -1.2) { angle = -1.2; angleVel *= -0.3; }
  }

  // ─── DRAW ROPE (catenary-like curve) ────────────
  function drawRope(bulb) {
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);

    // Slight curve: rope bows out opposite to swing direction
    var bowAmount = angleVel * 600;  // subtle rope flex
    var midX = (pivotX + bulb.x) / 2 + bowAmount;
    var midY = (pivotY + bulb.y) / 2;

    // Use quadratic curve for natural rope look
    ctx.quadraticCurveTo(midX, midY, bulb.x, bulb.y - BULB_RADIUS - 8);

    // Rope styling — braided look
    ctx.strokeStyle = '#c2b59b';
    ctx.lineWidth   = ROPE_WIDTH;
    ctx.lineCap     = 'round';
    ctx.stroke();

    // Thin highlight stripe on rope
    ctx.beginPath();
    ctx.moveTo(pivotX + 0.6, pivotY);
    ctx.quadraticCurveTo(midX + 0.6, midY, bulb.x + 0.6, bulb.y - BULB_RADIUS - 8);
    ctx.strokeStyle = 'rgba(210, 200, 175, 0.4)';
    ctx.lineWidth   = 0.8;
    ctx.stroke();
  }

  // ─── DRAW METAL RING (gold cap on bulb) ─────────
  function drawMetalCap(bx, by) {
    var capY = by - BULB_RADIUS - 4;
    ctx.beginPath();
    ctx.ellipse(bx, capY, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#b8973a';
    ctx.fill();

    // Highlight on metal
    ctx.beginPath();
    ctx.ellipse(bx, capY - 1, 4, 1.8, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(220, 195, 110, 0.5)';
    ctx.fill();
  }

  // ─── DRAW WOODEN BULB (teardrop) ────────────────
  function drawBulb(bx, by) {
    ctx.save();
    ctx.translate(bx, by);
    // Slight rotation following pendulum angle
    ctx.rotate(angle * 0.15);

    var r = BULB_RADIUS;

    // Main teardrop body using bezier curves
    ctx.beginPath();
    // Start at top (narrow neck)
    ctx.moveTo(0, -r - 2);
    // Right side curves out to wide belly
    ctx.bezierCurveTo(r * 0.4, -r, r * 1.1, -r * 0.1, r * 0.85, r * 0.45);
    // Bottom rounded part
    ctx.bezierCurveTo(r * 0.7, r * 0.95, r * 0.2, r * 1.15, 0, r * 1.15);
    // Left bottom
    ctx.bezierCurveTo(-r * 0.2, r * 1.15, -r * 0.7, r * 0.95, -r * 0.85, r * 0.45);
    // Left side back up
    ctx.bezierCurveTo(-r * 1.1, -r * 0.1, -r * 0.4, -r, 0, -r - 2);
    ctx.closePath();

    // Wood gradient fill
    var grad = ctx.createRadialGradient(-r * 0.2, r * 0.1, r * 0.1, 0, 0, r * 1.3);
    grad.addColorStop(0,   '#9e7a52');    // lighter wood center
    grad.addColorStop(0.3, '#7a5c3a');    // mid wood
    grad.addColorStop(0.6, '#5e4228');    // darker wood
    grad.addColorStop(1,   '#3d2b18');    // dark edge
    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle stroke for edge definition
    ctx.strokeStyle = 'rgba(40, 25, 12, 0.5)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Wood grain lines
    ctx.save();
    ctx.clip();  // clip to bulb shape
    ctx.globalAlpha = 0.12;
    for (var g = -r; g < r * 1.2; g += 3.5) {
      ctx.beginPath();
      ctx.moveTo(-r * 1.2, g);
      // Wavy grain lines
      ctx.bezierCurveTo(-r * 0.4, g + 1.5, r * 0.4, g - 1.5, r * 1.2, g);
      ctx.strokeStyle = '#2a1a0a';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
    ctx.restore();

    // Specular highlight (shiny spot)
    ctx.beginPath();
    ctx.ellipse(-r * 0.2, -r * 0.1, r * 0.35, r * 0.5, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 240, 210, 0.15)';
    ctx.fill();

    // Tiny top highlight
    ctx.beginPath();
    ctx.ellipse(-r * 0.15, -r * 0.5, r * 0.15, r * 0.1, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 250, 230, 0.2)';
    ctx.fill();

    ctx.restore();
  }

  // ─── DRAW PIVOT MOUNT ───────────────────────────
  function drawPivot() {
    // Small ceiling mount circle
    ctx.beginPath();
    ctx.arc(pivotX, pivotY + 2, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#94a3b8';
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Darker inner circle
    ctx.beginPath();
    ctx.arc(pivotX, pivotY + 2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#475569';
    ctx.fill();
  }

  // ─── DRAW SHADOW (subtle) ──────────────────────
  function drawShadow(bulb) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.beginPath();
    ctx.ellipse(bulb.x + 3, bulb.y + BULB_RADIUS * 1.2 + 8, BULB_RADIUS * 0.6, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.restore();
  }

  // ─── CURSOR HINT GLOW ──────────────────────────
  function drawCursorGlow(bulb) {
    if (!isHovering) return;
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.beginPath();
    ctx.arc(bulb.x, bulb.y, BULB_RADIUS + 20, 0, Math.PI * 2);
    var glow = ctx.createRadialGradient(bulb.x, bulb.y, BULB_RADIUS, bulb.x, bulb.y, BULB_RADIUS + 20);
    glow.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fill();
    ctx.restore();
  }

  // ─── MAIN RENDER LOOP ──────────────────────────
  function render() {
    physics();
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    var bulb = getBulbPos();

    drawPivot();
    drawRope(bulb);
    drawMetalCap(bulb.x, bulb.y);
    drawBulb(bulb.x, bulb.y);
    drawShadow(bulb);
    drawCursorGlow(bulb);

    requestAnimationFrame(render);
  }

  // ─── POINTER EVENTS on canvas for hit area ─────
  // We need the canvas to intercept mouse only near the bulb
  function updatePointerEvents() {
    var bulb = getBulbPos();
    var dx = mouseX - bulb.x;
    var dy = mouseY - bulb.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < CURSOR_RADIUS + BULB_RADIUS + 15) {
      canvas.style.pointerEvents = 'auto';
      canvas.style.cursor = 'grab';
    } else {
      canvas.style.pointerEvents = 'none';
      canvas.style.cursor = '';
    }
  }

  // Run pointer-events check on a slower interval
  setInterval(updatePointerEvents, 60);

  // We still need mouse events to propagate through, so re-dispatch
  canvas.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Initial gentle swing to draw attention
  angleVel = 0.008;

  // Small touch/mobile: hide pendulum
  if (window.innerWidth < 768) {
    canvas.style.display = 'none';
  }
  window.addEventListener('resize', function () {
    if (window.innerWidth < 768) {
      canvas.style.display = 'none';
    } else {
      canvas.style.display = '';
    }
  });

  // Start!
  requestAnimationFrame(render);

})();
