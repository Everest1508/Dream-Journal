var popUpForm = document.getElementById("popUpForm");
var openFormButton = document.getElementById("openFormButton");
var closeFormButton = popUpForm.getElementsByClassName("close")[0];

openFormButton.onclick = function() {
    popUpForm.style.display = "block";
}

closeFormButton.onclick = function() {
    popUpForm.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popUpForm) {
        popUpForm.style.display = "none";
    }
}


// Get references to the relevant elements
const expandButton = document.getElementById("expandButton");
const shrinkButton = document.getElementById("shrinkButton");
const expandedModal = document.getElementById("expandedModal");
const expandedTextarea = document.getElementById("expandedTextarea");
const textarea = document.getElementById("content");

// Show the expanded textarea modal
expandButton.addEventListener("click", () => {
    expandedModal.style.display = "block";
    expandedTextarea.value = textarea.value;
});

// Hide the expanded textarea modal and copy content back to original textarea
shrinkButton.addEventListener("click", () => {
    textarea.value = expandedTextarea.value;
    expandedModal.style.display = "none";
});

// Close the expanded textarea modal when clicking outside
expandedModal.addEventListener("click", (event) => {
    if (event.target === expandedModal) {
        textarea.value = expandedTextarea.value;
        expandedModal.style.display = "none";
    }
});

// Get reference to the date input
const dateInput = document.getElementById("date");

// Set the max attribute to today's date
const today = new Date();
const dateString = today.toISOString().split("T")[0];
dateInput.setAttribute("max", dateString);

// Add this JavaScript code at the end of your <body> tag or in a separate JS file

// Function to truncate descriptions
function truncateDescriptions() {
    const descriptions = document.querySelectorAll('.description');
    descriptions.forEach(description => {
        const maxHeight = parseFloat(window.getComputedStyle(description).lineHeight) * 5; // 5 lines
        const currentHeight = description.clientHeight;
        if (currentHeight > maxHeight) {
            description.classList.add('truncated');
        }
    });
}

// Call the function after the page loads
window.addEventListener('load', truncateDescriptions);

const readMoreButtons = document.querySelectorAll('.read-more-button');

// Get all the modals
const modals = document.querySelectorAll('.custom-modal');

// Attach click event listeners to each "Read More" button
readMoreButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        modals[index].style.display = 'block';
    });
});

// Attach click event listeners to each close button
document.querySelectorAll('.custom-close').forEach((closeButton) => {
    closeButton.addEventListener('click', function () {
        // Find the parent modal of the close button and hide it
        const modal = closeButton.closest('.custom-modal');
        modal.style.display = 'none';
    });
});

// Add this JavaScript code at the end of your <body> tag or in a separate JS file

// Filter buttons
const filterButtons = document.querySelectorAll('.filter-button');

// Cards
const cards = document.querySelectorAll('.card');

// Attach click event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const selectedGenre = this.getAttribute('data-genre');

        // Show or hide cards based on the selected genre
        cards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre');
            if (selectedGenre === 'all' || cardGenre === selectedGenre) {
                card.style.display = 'block';
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                card.style.display = 'none';
            }
        });
    });
});

// JavaScript for filter buttons and other functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle search input
    // const searchInput = document.getElementById('search-input');
    // searchInput.addEventListener('input', () => {
    //     const searchTerm = searchInput.value.trim().toLowerCase();
    //     const cards = document.querySelectorAll('.card');

    //     cards.forEach(card => {
    //         const title = card.querySelector('h2').textContent.toLowerCase();
    //         if (searchTerm === '' || new RegExp(searchTerm.split(/\s+/).join('|')).test(title)) {
    //             card.style.display = 'block';
    //         } else {
    //             card.style.display = 'none';
    //         }
    //     });
    // });

    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    function scrollToSection(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const author = card.querySelector('.author').textContent.toLowerCase();
            if (searchQuery === '' || 
                title.includes(searchQuery) || 
                (searchQuery.startsWith('author:') && author.includes(searchQuery.substring(7).trim()))
            ) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
});
