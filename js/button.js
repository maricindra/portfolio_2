const btn = document.querySelector('.magnetic-btn');
const magneticRadius = 180;

// Physics States
let currentX = 0, currentY = 0, currentRot = 0;
let targetX = 0, targetY = 0, targetRot = 0;
let vx = 0, vy = 0, vRot = 0; // Velocities

// High-Precision Spring Values
const stiffness = 0.08; // High Elasticity
const damping = 0.82;   // Energy Retention

window.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const distanceX = e.clientX - btnCenterX;
  const distanceY = e.clientY - btnCenterY;
  const distance = Math.hypot(distanceX, distanceY);

  if (distance < magneticRadius) {
    targetX = distanceX * 0.55;
    targetY = distanceY * 0.55;
    targetRot = distanceX * 0.25; // Pull Torque Effect
  } else {
    // Release trigger back to origin
    targetX = 0;
    targetY = 0;
    targetRot = 0;
  }
});

// Continuous Physics Engine Render
function renderSpring() {
  // Hooke's Law: Spring Force Formula
  const forceX = (targetX - currentX) * stiffness;
  const forceY = (targetY - currentY) * stiffness;
  const forceRot = (targetRot - currentRot) * stiffness;

  // Accelerate & Dampen Velocity
  vx = (vx + forceX) * damping;
  vy = (vy + forceY) * damping;
  vRot = (vRot + forceRot) * damping;

  // Apply Velocity to Displacement
  currentX += vx;
  currentY += vy;
  currentRot += vRot;

  // Hardware Accelerated 3D Transform Render
  btn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) rotate(${currentRot}deg)`;

  requestAnimationFrame(renderSpring);
}

renderSpring();