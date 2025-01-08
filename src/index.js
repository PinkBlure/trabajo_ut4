document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault(); // Evita el envío del formulario
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("password").value;

  // Obtiene los usuarios del localStorage
  const users = JSON.parse(localStorage.getItem("users")) || {};

  // Verifica si el nombre de usuario existe y la contraseña coincide
  if (users[username] && users[username].password === password) {
    alert("Inicio de sesión exitoso");
    // Guardar el nombre de usuario en el localStorage para usarlo en la página de inicio
    localStorage.setItem("loggedInUser", username);
    // Redirigir a la página principal del generador de mapas
    window.location.href = "home.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
