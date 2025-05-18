
    const chatBox = document.getElementById('chat-box');

    document.getElementById('messageInput').addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});


    function sendMessage() {
      const input = document.getElementById('messageInput');
      const message = input.value.trim();
      if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = "Username: " + message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
        input.value = '';
      }
    }

    document.addEventListener("DOMContentLoaded", function () {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((data) => {
        navbarPlaceholder.innerHTML = data;
      })
      .catch((err) => console.error("Navbar load error:", err));
  }
});

    const materialData = {
      1: ["Maths 1 Notes (PDF)", "Programming in C Slides", "Physics Workbook"],
      2: ["Maths 2 Notes", "Object-Oriented Programming", "Electronics Lab Manual"],
      3: ["Data Structures Notes", "Discrete Mathematics", "DBMS Materials"],
      // Add more data for other semesters
    };

    const buttons = document.querySelectorAll('.semester-button');
    const materialsList = document.getElementById('materials-list');

   buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const sem = btn.getAttribute('data-sem');
    currentSemester = sem;
    const items = materialData[sem] || ["Materials coming soon..."];
    displayMaterials(items, `Semester ${sem}`);
  });
});


     searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    let allMaterials = [];

    if (currentSemester) {
      allMaterials = materialData[currentSemester] || [];
    } else {
      for (let sem in materialData) {
        allMaterials = allMaterials.concat(materialData[sem]);
      }
    }

    const filtered = allMaterials.filter(item => item.toLowerCase().includes(searchTerm));
    displayMaterials(filtered, currentSemester ? `Semester ${currentSemester}` : `All Semesters`);
  });

  
  function displayMaterials(items, title) {
  materialsList.innerHTML = `
    <h3>${title} Materials</h3>
    <ul>
      ${
        items.length
          ? items.map(item =>
              typeof item === "string"
                ? `<li>${item}</li>`
                : `<li><a href="${item.url}" target="_blank">${item.name}</a></li>`
            ).join('')
          : "<li>No results found.</li>"
      }
    </ul>
  `;
}
