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
    // Fetch coffee specials from external API
    fetch('https://api.sampleapis.com/coffee/hot')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const specialsContainer = document.getElementById('daily-specials');
            if (specialsContainer) {
                // Get random coffee items from the API response
                const randomItems = data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 2);

                const specialsHTML = `
                    <div class="specials-section">
                        <h3>Daily Special Menu</h3>
                        <div class="special-items">
                            ${randomItems.map(item => `
                                <div class="special-item">
                                    <h4>${item.title}</h4>
                                    <p>${item.description}</p>
                                    <div class="price-info">
                                        <span class="original-price">$${item.price}</span>
                                        <span class="discount">20% discount</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                specialsContainer.innerHTML = specialsHTML;

                // Fetch reviews from external API
                fetch('https://jsonplaceholder.typicode.com/comments')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(reviewsData => {
                        // Get more random reviews for horizontal scroll
                        const randomReviews = reviewsData
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 8)
                            .map(review => ({
                                name: review.name,
                                date: new Date().toLocaleDateString(),
                                rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
                                comment: review.body
                            }));

                        const reviewsHTML = `
                            <div class="reviews-section">
                                <h3>Customer Reviews</h3>
                                <div class="reviews-arrows-container">
                                    <button class="reviews-arrow left" aria-label="Scroll left">&#8592;</button>
                                    <div class="reviews-horizontal-scroll">
                                        ${randomReviews.map(review => `
                                            <div class="review-card">
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
                                    <button class="reviews-arrow right" aria-label="Scroll right">&#8594;</button>
                                </div>
                            </div>
                        `;
                        specialsContainer.innerHTML += reviewsHTML;
                        // Add JS for arrow scroll
                        setTimeout(() => {
                            const scrollContainer = specialsContainer.querySelector('.reviews-horizontal-scroll');
                            const leftBtn = specialsContainer.querySelector('.reviews-arrow.left');
                            const rightBtn = specialsContainer.querySelector('.reviews-arrow.right');
                            if (leftBtn && rightBtn && scrollContainer) {
                                leftBtn.onclick = () => {
                                    scrollContainer.scrollBy({ left: -350, behavior: 'smooth' });
                                };
                                rightBtn.onclick = () => {
                                    scrollContainer.scrollBy({ left: 350, behavior: 'smooth' });
                                };
                            }
                        }, 100);
                    })
                    .catch(error => {
                        console.error('Error loading reviews:', error);
                        // Fallback to local reviews if API fails
                        fetch('data/reviews.json')
                            .then(response => response.json())
                            .then(localReviews => {
                                const reviewsHTML = `
                                    <div class="reviews-section">
                                        <h3>Customer Reviews</h3>
                                        <div class="reviews-list">
                                            ${localReviews.reviews.map(review => `
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
                                specialsContainer.innerHTML += reviewsHTML;
                            })
                            .catch(error => {
                                console.error('Error loading local reviews:', error);
                            });
                    });
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