const flightTab = document.querySelector("#flightTab");
const hotelTab = document.querySelector("#hotelTab");
const flightForm = document.querySelector("#flightForm");
const hotelForm = document.querySelector("#hotelForm");
const summaryTitle = document.querySelector("#summaryTitle");
const summaryText = document.querySelector("#summaryText");

function setBookingMode(mode) {
  const flightsSelected = mode === "flight";
  flightTab.classList.toggle("active", flightsSelected);
  hotelTab.classList.toggle("active", !flightsSelected);
  flightTab.setAttribute("aria-selected", String(flightsSelected));
  hotelTab.setAttribute("aria-selected", String(!flightsSelected));
  flightForm.classList.toggle("d-none", !flightsSelected);
  hotelForm.classList.toggle("d-none", flightsSelected);
  document.querySelector(flightsSelected ? "#flightFrom" : "#hotelDestination").focus();
}

flightTab.addEventListener("click", () => setBookingMode("flight"));
hotelTab.addEventListener("click", () => setBookingMode("hotel"));

document.querySelector("#swapRoute").addEventListener("click", () => {
  const from = document.querySelector("#flightFrom");
  const to = document.querySelector("#flightTo");
  [from.value, to.value] = [to.value, from.value];
  from.focus();
});

function isValidDateRange(start, end) {
  return Boolean(start && end && new Date(end) > new Date(start));
}

function isTodayOrLater(date) {
  return Boolean(date && date >= todayLocal);
}

flightForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const from = document.querySelector("#flightFrom").value.trim();
  const to = document.querySelector("#flightTo").value.trim();
  const departure = document.querySelector("#flightDepart").value;
  const returnDate = document.querySelector("#flightReturn").value;
  const feedback = document.querySelector("#flightFeedback");
  feedback.classList.remove("success");

  if (!from || !to || !departure) {
    feedback.textContent = "Add your departure, destination and departure date to continue.";
    return;
  }
  if (from.toLowerCase() === to.toLowerCase()) {
    feedback.textContent = "Choose two different places for your trip.";
    return;
  }
  if (!isTodayOrLater(departure)) {
    feedback.textContent = "Choose a departure date that is today or later.";
    return;
  }
  if (returnDate && !isValidDateRange(departure, returnDate)) {
    feedback.textContent = "Your return date must be after your departure date.";
    return;
  }

  const travelers = document.querySelector("#flightTravelers").value;
  feedback.textContent = "Your flight search is ready. Here’s the trip you’re planning.";
  feedback.classList.add("success");
  summaryTitle.textContent = `${from} to ${to}`;
  summaryText.textContent = `${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${departure}T12:00:00`))}${returnDate ? ` – ${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${returnDate}T12:00:00`))}` : " · One way"} · ${travelers} ${travelers === "1" ? "traveler" : "travelers"}`;
});

hotelForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const destination = document.querySelector("#hotelDestination").value.trim();
  const checkin = document.querySelector("#hotelCheckin").value;
  const checkout = document.querySelector("#hotelCheckout").value;
  const feedback = document.querySelector("#hotelFeedback");
  feedback.classList.remove("success");

  if (!destination || !checkin || !checkout) {
    feedback.textContent = "Add a destination, check-in and check-out date to continue.";
    return;
  }
  if (!isTodayOrLater(checkin)) {
    feedback.textContent = "Choose a check-in date that is today or later.";
    return;
  }
  if (!isValidDateRange(checkin, checkout)) {
    feedback.textContent = "Check-out must be after check-in.";
    return;
  }

  const guests = document.querySelector("#hotelGuests").value;
  const nights = Math.round((new Date(`${checkout}T12:00:00`) - new Date(`${checkin}T12:00:00`)) / 86400000);
  feedback.textContent = "Your stay search is ready. Here’s the trip you’re planning.";
  feedback.classList.add("success");
  summaryTitle.textContent = `A stay in ${destination}`;
  summaryText.textContent = `${nights} ${nights === 1 ? "night" : "nights"} · ${guests} ${guests === "1" ? "guest" : "guests"} · ${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${checkin}T12:00:00`))} – ${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${checkout}T12:00:00`))}`;
});

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${button.getAttribute("aria-label").replace(/^(Save|Remove) /, "")}`);
    button.querySelector("i").classList.toggle("bi-heart-fill", saved);
    button.querySelector("i").classList.toggle("bi-heart", !saved);
  });
});

document.querySelector("#newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#newsletterEmail");
  const feedback = document.querySelector("#newsletterFeedback");
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  feedback.textContent = "Demo only — connect a mailing-list service to subscribe.";
  email.value = "";
});

document.querySelectorAll('a[href="#footer"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.closest(".footer-links") || link.closest(".social-links")) event.preventDefault();
  });
});

const today = new Date();
const todayLocal = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.querySelectorAll('input[type="date"]').forEach((input) => {
  input.min = todayLocal;
});

document.querySelector("#flightDepart").addEventListener("change", (event) => {
  const returnInput = document.querySelector("#flightReturn");
  returnInput.min = event.target.value || todayLocal;
  if (returnInput.value && returnInput.value < returnInput.min) returnInput.value = "";
});

document.querySelector("#hotelCheckin").addEventListener("change", (event) => {
  const checkout = document.querySelector("#hotelCheckout");
  const nextDay = new Date(`${event.target.value}T12:00:00`);
  if (event.target.value) nextDay.setDate(nextDay.getDate() + 1);
  checkout.min = event.target.value ? new Date(nextDay.getTime() - nextDay.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : todayLocal;
  if (checkout.value && checkout.value < checkout.min) checkout.value = "";
});
