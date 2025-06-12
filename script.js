function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let session = "AM";

  if (hours >= 12) {
    session = "PM";
    if (hours > 12) hours -= 12;
  }

  if (hours === 0) hours = 12;

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  const time = `${hours}:${minutes}:${seconds} ${session}`;
  document.getElementById("clock").textContent = time;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call
