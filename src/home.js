// Obtener el nombre de usuario almacenado en el localStorage
const loggedUser = localStorage.getItem("loggedInUser");

// Obtener los datos de los usuarios guardados en localStorage
const users = JSON.parse(localStorage.getItem("users")) || {};

if (loggedUser && users[loggedUser]) {
  // Mostrar el nombre de usuario
  document.getElementById("usernameDisplay").textContent = loggedUser;

  // Mostrar el correo y teléfono
  document.getElementById("emailDisplay").textContent = users[loggedUser].email;
  document.getElementById("phoneDisplay").textContent = users[loggedUser].phone;
} else {
  document.getElementById("usernameDisplay").textContent = "No hay usuario conectado";
  document.getElementById("emailDisplay").textContent = "No disponible";
  document.getElementById("phoneDisplay").textContent = "No disponible";
}

// Obtener y mostrar la fecha actual
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById("currentDate").textContent = formattedDate;

// Función para alternar la visibilidad del section de "Mis datos"
document.querySelector("h2").addEventListener("click", function() {
  const section = document.querySelector("section");
  section.style.display = (section.style.display === "none" || section.style.display === "") ? "block" : "none";
});
