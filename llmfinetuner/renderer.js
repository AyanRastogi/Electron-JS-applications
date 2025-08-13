// renderer.js
window.addEventListener('DOMContentLoaded', () => {
    // Helper function to toggle a dropdown
    const toggleDropdown = (buttonId, dropdownId) => {
        const button = document.getElementById(buttonId);
        const dropdown = document.getElementById(dropdownId);

        button.addEventListener('click', (event) => {
            event.stopPropagation();
            // Close other dropdowns
            closeAllDropdowns(dropdownId);
            dropdown.classList.toggle('show');
        });

        // Add event listeners to dropdown items
        dropdown.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                button.textContent = `${item.textContent} ▼`; // Update button text
                dropdown.classList.remove('show');
            });
        });
    };

    // Helper function to close all open dropdowns
    const closeAllDropdowns = (exceptId = null) => {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(d => {
            if (d.id !== exceptId) {
                d.classList.remove('show');
            }
        });
    };

    // Initialize dropdowns
    toggleDropdown('format-btn', 'format-dropdown');
    toggleDropdown('model-btn', 'model-dropdown');

    // Close dropdowns if clicking outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-btn')) {
            closeAllDropdowns();
        }
    }
    
    // Placeholder for the run button
    document.getElementById('run-btn').addEventListener('click', () => {
        const url = document.getElementById('url-input').value;
        const format = document.getElementById('format-btn').textContent.replace(' ▼', '');
        const model = document.getElementById('model-btn').textContent.replace(' ▼', '');
        
        console.log("Run button clicked!");
        console.log("URL:", url || "Not provided");
        console.log("Data Format:", format);
        console.log("Model:", model);
        // You would connect to your backend logic here
    });
});
