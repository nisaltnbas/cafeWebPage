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

// Contact form initialization
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formResponse = document.getElementById('formResponse');
      
      // Show sending message
      formResponse.innerHTML = '<div class="info">Sending your message...</div>';
      
      // Method 1: Send the form directly using sendForm
      emailjs.sendForm('service_w67e1zg', 'template_lcltudi', this)
        .then(function(response) {
          console.log('Email sent successfully', response.status, response.text);
          
          // Show success message
          formResponse.innerHTML = '<div class="success">Message sent successfully!</div>';
          
          // Reset the form
          contactForm.reset();
        })
        .catch(function(error) {
          console.error('Error sending email:', error);
          
          // Try alternative method
          sendWithParameters();
        });
      
      // Method 2: Send with explicit parameters as fallback
      function sendWithParameters() {
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        const toEmailInput = contactForm.querySelector('#to_email');
        const toNameInput = contactForm.querySelector('#to_name');
        const subjectInput = contactForm.querySelector('#subject');
        
        // Prepare template parameters
        const templateParams = {
          to_email: toEmailInput ? toEmailInput.value : 'cafenero20@gmail.com',
          to_name: toNameInput ? toNameInput.value : 'Café Nova',
          from_name: nameInput.value,
          from_email: emailInput.value,
          message: messageInput.value,
          subject: subjectInput ? subjectInput.value : 'New Contact Form Submission',
          reply_to: emailInput.value
        };
        
        // Send the email using EmailJS
        emailjs.send('service_w67e1zg', 'template_lcltudi', templateParams)
          .then(function(response) {
            console.log('Email sent successfully with parameters', response.status, response.text);
            
            // Show success message
            formResponse.innerHTML = '<div class="success">Message sent successfully!</div>';
            
            // Reset the form
            contactForm.reset();
          })
          .catch(function(error) {
            console.error('Error sending email with parameters:', error);
            
            // Show error message
            formResponse.innerHTML = '<div class="error">Failed to send email. Please try again later.</div>';
          });
      }
    });
  }
}); 