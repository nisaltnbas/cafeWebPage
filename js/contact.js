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

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  emailjs.sendForm('service_w67e1zg', 'template_lcltudi')
    .then(function() {
      alert('Your message has been sent successfully!');
    }, function(error) {
      alert('An error occurred: ' + JSON.stringify(error));
    });
}); 