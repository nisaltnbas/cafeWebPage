// Contact page specific JavaScript

// Initialize EmailJS
(function(){
  emailjs.init("HxxUR9m7kblXxlvIJ");
})();

// Initialize Google Maps
function initMap() {
  var cafeLocation = { lat: 39.9607, lng: 32.8079 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: cafeLocation
  });
  var marker = new google.maps.Marker({
    position: cafeLocation,
    map: map
  });
}

// Contact form EmailJS sending function
function sendContactEmail() {
  emailjs.sendForm('service_w67e1zg', 'template_lcltudi')
    .then(function() {
      console.log('Email sent successfully');
    }, function(error) {
      console.error('Error sending email:', error);
    });
}

// Contact form initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize form functionality using utility function
  if (typeof handleFormSubmission === 'function') {
    handleFormSubmission('contactForm', 'formResponse', 'Message sent successfully!', sendContactEmail);
  }
}); 