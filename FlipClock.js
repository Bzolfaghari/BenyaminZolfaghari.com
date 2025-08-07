const birthday = new Date("2005-09-21T08:00:00+04:30"); 
const el = document.getElementById('flip-age-clock');

// Pad with leading zeros
function pad(num, size=2) {
  let s = "0" + num;
  return s.substr(s.length - size);
}

// Calculate: years, dayOfYear, hours, minutes, seconds
function ageDetails(birthDate, now) {
  // Years passed
  let years = now.getFullYear() - birthDate.getFullYear();
  let bThisYear = new Date(birthDate);
  bThisYear.setFullYear(now.getFullYear());
  if (now < bThisYear) years--;

  // Start of 'current age year'
  let ageStart = new Date(birthDate);
  ageStart.setFullYear(birthDate.getFullYear() + years);

  // Day of year (how many days from ageStart to now)
  let msThisYear = now - ageStart;
  let dayOfYear = Math.floor(msThisYear / 86400000) + 1;

  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  // Calculate remaining difference from ageStart for hour/min/sec
  let hours = h - ageStart.getHours();
  let minutes = m - ageStart.getMinutes();
  let seconds = s - ageStart.getSeconds();

  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours -= 1; }
  if (hours < 0) { hours += 24; dayOfYear -= 1; }
  if (dayOfYear < 1) { dayOfYear = 1; } // Clamp for safety

  return { years, dayOfYear, hours, minutes, seconds };
}

function renderAgeClock() {
  const now = new Date();
  const { years, dayOfYear, hours, minutes, seconds } = ageDetails(birthday, now);

  el.innerHTML = `
    <div class="flip-unit">${pad(years)}<span class="flip-label">YEARS</span></div>
    <div class="flip-unit">${pad(dayOfYear, 3)}<span class="flip-label">DAYS</span></div>
    <div class="flip-unit">${pad(hours)}<span class="flip-label">HOURS</span></div>
    <div class="flip-unit">${pad(minutes)}<span class="flip-label">MINUTES</span></div>
    <div class="flip-unit">${pad(seconds)}<span class="flip-label">SECONDS</span></div>
  `;
}

renderAgeClock();
setInterval(renderAgeClock, 1000);
