// Gallery page specific JavaScript

// When DOM is loaded, initialize lightbox
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lightbox2 with options if needed
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': "Image %1 of %2"
    });
}); 