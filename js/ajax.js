// AJAX functionality for the cafe website

// Function to load menu items from external JSON file
function loadMenuItems(category = 'all', searchTerm = '') {
    fetch('data/menu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const menuContainer = document.getElementById('menu-items');
            if (menuContainer) {
                menuContainer.innerHTML = ''; // Clear existing items

                // Filter items based on category and search term
                let filteredItems = [];
                data.categories.forEach(cat => {
                    if (category === 'all' || cat.id === category) {
                        cat.items.forEach(item => {
                            if (searchTerm === '' || 
                                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                                filteredItems.push({
                                    ...item,
                                    category: cat.name
                                });
                            }
                        });
                    }
                });

                // Display filtered items
                filteredItems.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';
                    menuItem.innerHTML = `
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p class="item-category">${item.category}</p>
                            <p class="item-description">${item.description}</p>
                            <div class="item-footer">
                                <span class="price">$${item.price}</span>
                            </div>
                        </div>
                    `;
                    menuContainer.appendChild(menuItem);
                });

                // Add hover effects
                addHoverEffects();
            }
        })
        .catch(error => {
            console.error('Error loading menu items:', error);
        });
}

// Function to load daily specials and reviews
function loadDailySpecials() {
    // Fetch from external API
    fetch('https://api.publicapis.org/entries?category=food&https=true')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const specialsContainer = document.getElementById('daily-specials');
            if (specialsContainer) {
                // Get random entries from the API response
                const randomEntries = data.entries
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 2);

                const specialsHTML = `
                    <div class="specials-section">
                        <h3>Daily Special Menu</h3>
                        <div class="special-items">
                            ${randomEntries.map(entry => `
                                <div class="special-item">
                                    <h4>${entry.API}</h4>
                                    <p>${entry.Description}</p>
                                    <div class="price-info">
                                        <span class="original-price">$${(Math.random() * 10 + 5).toFixed(2)}</span>
                                        <span class="discount">20% discount</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="reviews-section">
                        <h3>Customer Reviews</h3>
                        <div class="reviews-list">
                            ${data.entries.slice(0, 3).map(entry => `
                                <div class="review-item">
                                    <div class="review-header">
                                        <span class="reviewer-name">${entry.API}</span>
                                        <span class="review-date">${new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div class="review-rating">
                                        ${'★'.repeat(Math.floor(Math.random() * 3) + 3)}${'☆'.repeat(2)}
                                    </div>
                                    <p class="review-comment">${entry.Description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                specialsContainer.innerHTML = specialsHTML;
            }
        })
        .catch(error => {
            console.error('Error loading daily specials:', error);
            // Fallback to local data if API fails
            fetch('data/daily-specials.json')
                .then(response => response.json())
                .then(data => {
                    const specialsContainer = document.getElementById('daily-specials');
                    if (specialsContainer) {
                        const specialsHTML = `
                            <div class="specials-section">
                                <h3>Daily Special Menu</h3>
                                <div class="special-items">
                                    <div class="special-item">
                                        <h4>${data.dailySpecials.coffee.name}</h4>
                                        <p>${data.dailySpecials.coffee.description}</p>
                                        <div class="price-info">
                                            <span class="original-price">$${data.dailySpecials.coffee.price}</span>
                                            <span class="discount">${data.dailySpecials.coffee.discount} discount</span>
                                        </div>
                                    </div>
                                    <div class="special-item">
                                        <h4>${data.dailySpecials.dessert.name}</h4>
                                        <p>${data.dailySpecials.dessert.description}</p>
                                        <div class="price-info">
                                            <span class="original-price">$${data.dailySpecials.dessert.price}</span>
                                            <span class="discount">${data.dailySpecials.dessert.discount} discount</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reviews-section">
                                <h3>Customer Reviews</h3>
                                <div class="reviews-list">
                                    ${data.reviews.map(review => `
                                        <div class="review-item">
                                            <div class="review-header">
                                                <span class="reviewer-name">${review.name}</span>
                                                <span class="review-date">${review.date}</span>
                                            </div>
                                            <div class="review-rating">
                                                ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                                            </div>
                                            <p class="review-comment">${review.comment}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                        specialsContainer.innerHTML = specialsHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading fallback data:', error);
                });
        });
}

// Function to add hover effects to menu items
function addHoverEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
}

// Initialize AJAX functionality when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load menu items if we're on the menu page
    if (document.getElementById('menu-items')) {
        loadMenuItems();

        // Add category filter event listeners
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Load filtered items
                const category = button.dataset.category;
                const searchTerm = document.getElementById('menu-search').value;
                loadMenuItems(category, searchTerm);
            });
        });

        // Add search functionality
        const searchInput = document.getElementById('menu-search');
        searchInput.addEventListener('input', () => {
            const activeCategory = document.querySelector('.category-btn.active').dataset.category;
            loadMenuItems(activeCategory, searchInput.value);
        });
    }
    
    // Load daily specials if we're on the home page
    if (document.getElementById('daily-specials')) {
        loadDailySpecials();
    }
}); 