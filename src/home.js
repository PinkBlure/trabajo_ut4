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

document.getElementById("logoutButton").addEventListener("click", function () {
  // Eliminar el usuario conectado del localStorage
  localStorage.removeItem("loggedInUser");

  // Redirigir a la página de inicio de sesión
  window.location.href = "../index.html"; // Cambia a la ruta de tu página de inicio de sesión
});

document.getElementById("addTaskButton").addEventListener("click", function () {
  // Crear el popup
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid #ccc";
  popup.style.zIndex = "1000";

  // Contenido del popup
  popup.innerHTML = `
    <h3>Añadir tarea</h3>
    <label for="taskName">Nombre de la tarea:</label>
    <input type="text" id="taskName" required><br><br>
    <label>Es urgente:</label>
    <input type="checkbox" id="isUrgent"><br>
    <label>Es importante:</label>
    <input type="checkbox" id="isImportant"><br><br>
    <button id="addTask">Añadir</button>
    <button id="cancel">Cancelar</button>
  `;

  document.body.appendChild(popup);

  // Manejar el botón de añadir
  document.getElementById("addTask").addEventListener("click", function () {
    const taskName = document.getElementById("taskName").value.trim();
    const isUrgent = document.getElementById("isUrgent").checked;
    const isImportant = document.getElementById("isImportant").checked;

    if (taskName === "") {
      alert("El nombre de la tarea no puede estar vacío.");
      return;
    }

    // Determinar el cuadrante
    let quadrant;
    if (isUrgent && isImportant) {
      quadrant = "Urgente e importante";
    } else if (isUrgent && !isImportant) {
      quadrant = "Urgente pero no importante";
    } else if (!isUrgent && isImportant) {
      quadrant = "No urgente pero importante";
    } else {
      quadrant = "No urgente y no importante";
    }

    // Guardar tarea en localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: taskName, quadrant });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Actualizar la interfaz
    updateTasks();

    // Cerrar el popup
    document.body.removeChild(popup);
  });

  // Manejar el botón de cancelar
  document.getElementById("cancel").addEventListener("click", function () {
    document.body.removeChild(popup);
  });
});

// Función para actualizar las tareas en la interfaz
function updateTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Limpiar las listas
  const lists = document.querySelectorAll("section:nth-of-type(2) ul");
  lists.forEach((list) => (list.innerHTML = ""));

  // Añadir las tareas a los cuadrantes correspondientes
  tasks.forEach((task, index) => {
    let list;
    switch (task.quadrant) {
      case "Urgente e importante":
        list = lists[0];
        break;
      case "Urgente pero no importante":
        list = lists[1];
        break;
      case "No urgente pero importante":
        list = lists[2];
        break;
      case "No urgente y no importante":
        list = lists[3];
        break;
    }

    const listItem = document.createElement("li");
    listItem.textContent = task.name;

    // Añadir botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1); // Eliminar tarea del array
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Actualizar localStorage
      updateTasks(); // Actualizar interfaz
    });

    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
  });
}

// Inicializar las tareas al cargar la página
document.addEventListener("DOMContentLoaded", updateTasks);
