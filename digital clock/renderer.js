// renderer.js
document.addEventListener('DOMContentLoaded', init);

function init() {
  /* ---------- Tab switching ---------- */
  const navButtons = document.querySelectorAll('nav button');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('nav .active').classList.remove('active');
      document.querySelector('section.active').classList.remove('active');

      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  /* ---------- Local clock ---------- */
  const { DateTime } = window.luxon;
  const localEl = document.getElementById('local-clock');

  function tickLocal() {
    localEl.textContent = DateTime.local()
      .toLocaleString(DateTime.TIME_WITH_SECONDS);
  }
  tickLocal();
  setInterval(tickLocal, 1_000);

  /* ---------- World clock ---------- */
  const zones = [
    { label: 'New York', code: 'America/New_York' },
    { label: 'London',   code: 'Europe/London'   },
    { label: 'Tokyo',    code: 'Asia/Tokyo'      },
    { label: 'Sydney',   code: 'Australia/Sydney'}
  ];
  const worldEl = document.getElementById('world-list');

  function renderWorld() {
    worldEl.innerHTML = zones.map(z => {
      const now = DateTime.now()
                  .setZone(z.code)
                  .toLocaleString(DateTime.TIME_WITH_SECONDS);
      return `<div>${z.label.padEnd(10,'&nbsp;')}  ${now}</div>`;
    }).join('');
  }
  renderWorld();
  setInterval(renderWorld, 1_000);

  /* ---------- Countdown timer ---------- */
  const display  = document.getElementById('timer-display');
  const startBtn = document.getElementById('start');
  const pauseBtn = document.getElementById('pause');
  const resetBtn = document.getElementById('reset');

  const DEFAULT_SECONDS = 5 * 60;   // 5 minutes
  let remaining = DEFAULT_SECONDS;
  let timerId   = null;

  function fmt(s) {
    return new Date(s * 1_000).toISOString().substr(11, 8); // HH:MM:SS
  }
  function updateDisplay() {
    display.textContent = fmt(remaining);
  }

  function tickTimer() {
    if (--remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      remaining = 0;
    }
    updateDisplay();
  }

  startBtn.onclick = () => {
    if (timerId) return;            // already running
    timerId = setInterval(tickTimer, 1_000);
  };
  pauseBtn.onclick = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };
  resetBtn.onclick = () => {
    clearInterval(timerId);
    timerId = null;
    remaining = DEFAULT_SECONDS;
    updateDisplay();
  };

  updateDisplay();
}
