// Utility functions for Café Nova website

/**
 * Add hover effects to elements
 * @param {string} selector - CSS selector for elements to apply hover effects
 */
function addHoverEffects(selector = '.menu-item') {
    const menuItems = document.querySelectorAll(selector);
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
}

/**
 * Format price as currency
 * @param {number} price - Price to format
 * @param {string} currency - Currency symbol
 * @returns {string} Formatted price
 */
function formatPrice(price, currency = '$') {
    return `${currency}${parseFloat(price).toFixed(2)}`;
}

/**
 * Handle common form submission logic
 * @param {string} formId - ID of the form element
 * @param {string} responseId - ID of the response container
 * @param {string} successMessage - Message to display on success
 * @param {Function} callback - Optional callback function
 */
function handleFormSubmission(formId, responseId, successMessage, callback) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const responseElement = document.getElementById(responseId);
        
        if (responseElement) {
            responseElement.innerHTML = `<div class='success'>${successMessage}</div>`;
        }
        
        // Reset the form
        this.reset();
        
        // Call optional callback if provided
        if (typeof callback === 'function') {
            callback();
        }
    });
}

/**
 * Load data from JSON file
 * @param {string} url - URL of the JSON file
 * @param {Function} callback - Callback function to handle the data
 * @param {Function} errorCallback - Optional callback for handling errors
 */
function loadJsonData(url, callback, errorCallback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error(`Error loading data from ${url}:`, error);
            if (typeof errorCallback === 'function') {
                errorCallback(error);
            }
        });
} 