document.getElementById("createUserForm").addEventListener("submit", e => {
  e.preventDefault(); // Evita el envío del formulario

  // Obtener los valores de los campos
  const username = document.getElementById("user").value.trim();  // Cambié de 'name' a 'username'
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Limpiar errores previos
  document.querySelectorAll(".error").forEach(error => error.textContent = "");

  let isValid = true;

  // Validar Nombre de usuario
  const usernameRegex = /^\w{1,30}$/;  // Acepta letras, números y guiones bajos
  if (!usernameRegex.test(username)) {
    document.getElementById("usernameError").textContent = "El nombre de usuario solo debe contener letras, números y un máximo de 30 caracteres.";
    isValid = false;
  }

  // Validar Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Ingresa un correo electrónico válido (ejemplo: nombre@dominio.com).";
    isValid = false;
  }

  // Validar Teléfono
  const phoneRegex = /^\d{9,15}$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById("phoneError").textContent = "El teléfono debe contener solo números, entre 9 y 15 caracteres.";
    isValid = false;
  }

  // Validar Contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById("passwordError").textContent = "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número.";
    isValid = false;
  }

  // Validar Confirmación de Contraseña
  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent = "Las contraseñas no coinciden.";
    isValid = false;
  }

  // Si hay errores, detener envío
  if (!isValid) {
    return;
  }

  // Verificar si el nombre de usuario ya existe
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    alert("El nombre de usuario ya existe");
    return;
  }

  // Crear el nuevo usuario con el nombre de usuario como clave
  users[username] = { email, phone, password };

  // Guardar el usuario en localStorage
  try {
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario creado con éxito");
  } catch (error) {
    console.error("Error al guardar el usuario en localStorage:", error);  // Imprime el error si algo sale mal
  }

  // Redirigir al login
  window.location.href = "index.html";
});
