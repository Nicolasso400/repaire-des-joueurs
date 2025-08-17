// Get the next N Tuesdays starting from today
function getNextTuesdays(count = 5) {
  let dates = [];
  let today = new Date();
  let day = today.getDay(); // 0=dimanche, 1=lundi, 2=mardi...

  // How many days until next Tuesday
  let daysUntilTuesday = (2 - day + 7) % 7;
  if (daysUntilTuesday === 0) daysUntilTuesday = 7; // skip today if it's Tuesday

  let nextTuesday = new Date(today);
  nextTuesday.setDate(today.getDate() + daysUntilTuesday);

  for (let i = 0; i < count; i++) {
    let d = new Date(nextTuesday);
    d.setDate(nextTuesday.getDate() + i * 7);
    dates.push(d);
  }
  return dates;
}

// Format date in French
function formatDate(date) {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}