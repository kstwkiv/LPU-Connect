// --- Function to send chat messages (should only run on chat.html) ---
function sendMessage() {
    // These elements are specific to chat.html, so check for their existence
    const chatBox = document.getElementById('chat-box');
    const input = document.getElementById('messageInput');

    if (chatBox && input) { // Only proceed if both chatbox and input exist
        const message = input.value.trim();
        if (message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.textContent = "Username: " + message; // Consider adding actual username logic later
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
            input.value = '';
        }
    }
}


// --- DOMContentLoaded: Ensure all page elements are loaded before running page-specific JS ---
document.addEventListener("DOMContentLoaded", function () {
    // Always load the navbar on every page
    loadNavbar();

    // --- Chat Page Specific Logic ---
    const messageInput = document.getElementById('messageInput');
    if (messageInput) { // Check if messageInput exists (i.e., we are on chat.html)
        messageInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                sendMessage();
                // Prevent default form submission on enter, as handled by onsubmit="sendMessage()" in HTML
                // Or remove onsubmit from HTML and handle event.preventDefault() here.
                e.preventDefault(); 
            }
        });
        // Also handle the send button click if you have one not tied to form onsubmit
        // const sendButton = document.querySelector('.chat-form button[type="submit"]');
        // if (sendButton) {
        //     sendButton.addEventListener('click', sendMessage);
        // }
    }

    // --- Materials Page Specific Logic ---
    const searchBar = document.getElementById('searchBar'); // Assuming searchBar has this ID
    const materialsList = document.getElementById('materials-list');
    const semesterButtons = document.querySelectorAll('.semester-button');
    let currentSemester = null; // Initialize currentSemester for search logic

    if (materialsList && semesterButtons.length > 0) { // Check if materials elements exist
        const materialData = {
            1: ["Maths 1 Notes (PDF)", "Programming in C Slides", "Physics Workbook"],
            2: ["Maths 2 Notes", "Object-Oriented Programming", "Electronics Lab Manual"],
            3: ["Data Structures Notes", "Discrete Mathematics", "DBMS Materials"],
            // Add more data for other semesters
        };

        semesterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sem = btn.getAttribute('data-sem');
                currentSemester = sem;
                const items = materialData[sem] || ["Materials coming soon..."];
                displayMaterials(items, `Semester ${sem}`);
            });
        });

        // Initialize display if no semester is pre-selected
        if (Object.keys(materialData).length > 0) {
             // You might want to display default materials on load, e.g., Semester 1
             // displayMaterials(materialData[1], `Semester 1`); 
        }

        // Search bar listener (only if searchBar element exists)
        if (searchBar) {
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
        }
    }
    // End of Materials Page Specific Logic


    // --- General button on index.html (if you still have it) ---
    // Make sure the ID in HTML matches (e.g., id="connect-btn")
    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', function() {
            // Your logic here, if needed, otherwise the <a> tag handles navigation
            console.log('Join Chat button clicked on Home page!');
        });
    }

    // Add similar conditional blocks for any other page-specific JavaScript

}); // End of DOMContentLoaded


// --- Global Functions (callable from anywhere after definition) ---
function loadNavbar() {
    fetch('navbar.html') // Path to your navbar.html file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = html;
            } else {
                console.warn("Navbar placeholder element not found. Make sure <div id='navbar-placeholder'> exists on all pages.");
            }
            // IMPORTANT: If you need to add event listeners to elements *within the navbar itself*
            // (e.g., if you had a search button or a dropdown in the navbar that needs JS),
            // you would add them *here*, after navbarPlaceholder.innerHTML = html;
            // For now, your nav-links are just direct <a> tags, so no extra JS needed for them.
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Function to display materials (used by materials page logic)
function displayMaterials(items, title) {
    const materialsList = document.getElementById('materials-list'); // Re-get inside function for safety
    if (materialsList) { // Check if the list element exists before manipulating
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
}