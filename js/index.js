// Index page specific JavaScript

// Load daily specials when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof loadDailySpecials === 'function') {
        loadDailySpecials();
    }
}); 