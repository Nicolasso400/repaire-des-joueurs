// Get the next N Tuesdays starting from today
function getNextTuesdays(count = 4) {
  let dates = [];
  let today = new Date();
  let day = today.getDay(); // 0=dimanche, 1=lundi, 2=mardi...

  // How many days until next Tuesday
  let daysUntilTuesday = ((2 - day + 7) % 7) + 7;
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

// Generate checkboxes
const container = document.getElementById("checkboxes");
const tuesdays = getNextTuesdays(5);

tuesdays.forEach(date => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "tuesday[]";
  checkbox.value = date.toISOString().split("T")[0];
  label.appendChild(checkbox);
  label.append(" " + formatDate(date));
  container.appendChild(label);
  container.appendChild(document.createElement("br"));
});

// Handle form submission
document.getElementById("availability-form").addEventListener("submit", function(e) {
  e.preventDefault(); // stop form reload

  const checked = Array.from(document.querySelectorAll("input[name='tuesday[]']:checked"))
    .map(cb => cb.nextSibling.textContent.trim());

  const result = document.getElementById("result");
  if (checked.length > 0) {
    result.innerHTML = "<h3>Vous avez choisi :</h3><ul>" +
      checked.map(date => `<li>${date}</li>`).join("") +
      "</ul>";
  } else {
    result.innerHTML = "<p>Aucune date sélectionnée.</p>";
  }
});

