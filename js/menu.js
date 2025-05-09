// Menu page specific JavaScript

// Menu page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Load menu items
    if (typeof loadMenuItems === 'function') {
        loadMenuItems();
    }
    
    // Add category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Load menu items for the selected category
            loadMenuItems(this.dataset.category);
        });
    });
    
    // Add search functionality
    const searchInput = document.getElementById('menu-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeCategory = document.querySelector('.category-btn.active').dataset.category;
            loadMenuItems(activeCategory, this.value);
        });
    }
}); 