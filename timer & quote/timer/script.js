// Select elements
const hh = document.getElementById('hh'),
      mm = document.getElementById('mm'),
      ss = document.getElementById('ss'),
      targetTimeInput = document.getElementById('targetTime'),
      startBtn = document.getElementById('startBtn'),
      resetBtn = document.getElementById('resetBtn'),
      statusText = document.getElementById('statusText'),
      progressCircle = document.getElementById('progressCircle'),
      presetBtns = document.querySelectorAll('.presets button');

let timerId, endTime, totalTime;
const circleSize = 2 * Math.PI * 80;
progressCircle.style.strokeDasharray = circleSize;
progressCircle.style.strokeDashoffset = circleSize;

const format = n => String(n).padStart(2, '0');

// Update countdown display
function updateTimer() {
    const remaining = endTime - Date.now();
    if (remaining <= 0) return finishTimer();

    const hrs = Math.floor(remaining / 3_600_000),
          mins = Math.floor((remaining / 60_000) % 60),
          secs = Math.floor((remaining / 1000) % 60);

    hh.textContent = format(hrs);
    mm.textContent = format(mins);
    ss.textContent = format(secs);
    progressCircle.style.strokeDashoffset = (remaining / totalTime) * circleSize;
}

// Finish countdown
function finishTimer() {
    clearInterval(timerId);
    [hh, mm, ss].forEach(el => el.textContent = '00');
    statusText.textContent = 'Countdown Finished!';
    progressCircle.style.strokeDashoffset = circleSize;
    startBtn.style.display = 'block';
}

// Start countdown
function startTimer() {
    if (!endTime) return alert('Please set a time first.');
    statusText.textContent = 'Countdown in progress...';
    startBtn.style.display = 'none';
    if (!totalTime) totalTime = endTime - Date.now();
    timerId = setInterval(updateTimer, 1000);
    updateTimer();
}

// Reset
function resetTimer() {
    clearInterval(timerId);
    endTime = totalTime = null;
    [hh, mm, ss].forEach(el => el.textContent = '00');
    statusText.textContent = 'Set a time and press Start';
    targetTimeInput.value = '';
    progressCircle.style.strokeDashoffset = circleSize;
    startBtn.style.display = 'block';
}

// Set timer by duration in minutes
function setTimerFromNow(minutes) {
    resetTimer();
    endTime = Date.now() + minutes * 60_000;
    startTimer();
}

// Start button click — now interprets input as duration
startBtn.addEventListener('click', () => {
    if (!targetTimeInput.value) return alert('Please set a time first.');
    const [h, m] = targetTimeInput.value.split(':').map(Number);
    const durationMs = (h * 60 + m) * 60_000; // Convert to milliseconds
    if (durationMs <= 0) return alert('Please enter a valid time.');
    resetTimer();
    endTime = Date.now() + durationMs;
    startTimer();
});

resetBtn.addEventListener('click', resetTimer);

presetBtns.forEach(btn => btn.addEventListener('click', () => setTimerFromNow(+btn.dataset.min)));
