// header

const loggedUser = localStorage.getItem("loggedInUser");
const users = JSON.parse(localStorage.getItem("users")) || {};

if (loggedUser && users[loggedUser]) {
  document.getElementById("usernameDisplay").textContent = loggedUser;
  document.getElementById("emailDisplay").textContent = users[loggedUser].email;
  document.getElementById("phoneDisplay").textContent = users[loggedUser].phone;
} else {
  document.getElementById("usernameDisplay").textContent = "No hay usuario conectado";
  document.getElementById("emailDisplay").textContent = "No disponible";
  document.getElementById("phoneDisplay").textContent = "No disponible";
}

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById("currentDate").textContent = formattedDate;

// secciones

function toggleSectionVisibility(headerSelector, sectionSelector) {
  document.querySelector(headerSelector).addEventListener("click", function () {
    const section = document.querySelector(sectionSelector);
    section.style.display = (section.style.display === "none" || section.style.display === "") ? "block" : "none";
  });
}

toggleSectionVisibility("h2:nth-of-type(1)", "section:nth-of-type(1)");
toggleSectionVisibility("h2:nth-of-type(2)", "section:nth-of-type(2)");
toggleSectionVisibility("h2:nth-of-type(3)", "section:nth-of-type(3)");
toggleSectionVisibility("h2:nth-of-type(4)", "section:nth-of-type(4)");
