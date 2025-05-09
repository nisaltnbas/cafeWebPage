# Café Nova - Responsive Web Application

## Project Overview
Café Nova is a modern, responsive web application for a cafe, featuring a dynamic menu, online ordering, gallery, and contact forms. The project demonstrates advanced interactivity using AJAX, jQuery UI widgets, and external plugins. It is designed to provide a seamless experience for both desktop and mobile users.

## Technologies Used

### Core Technologies
- **HTML5**: Page structure and content
- **CSS3**: Responsive design and styling
- **JavaScript**: Dynamic content and user interaction

### Libraries and Frameworks
- **jQuery**: For DOM manipulation and AJAX operations
- **jQuery UI**: Interactive widgets:
  - Datepicker
  - Autocomplete
  - Tabs
- **Lightbox2**: Enhanced image viewing experience on the gallery page

### AJAX Implementations
- **Local AJAX**: Menu items dynamically loaded from local JSON file (`data/menu.json`)
- **External AJAX**: Daily specials and customer reviews fetched from external APIs:
  - Coffee specials: https://api.sampleapis.com/coffee/hot
  - Customer reviews: https://jsonplaceholder.typicode.com/comments

### Form Processing
- **EmailJS**: Used for sending contact and order forms

### Design Resources
- **Google Fonts**: Custom typography

## Project Structure

### Main Pages
- `index.html` - Home page
- `menu.html` - Menu page (AJAX loaded)
- `order.html` - Online order page (AJAX and jQuery UI)
- `gallery.html` - Gallery with Lightbox2
- `about.html` - About us
- `contact.html` - Contact form (EmailJS)

### Information Pages
- `support.html` - Support information
- `terms.html` - Terms of use
- `sitemap.html` - Site map

### Resource Files
- `/css/style.css` - Main stylesheet
- `/js/ajax.js` - AJAX and dynamic content
- `/js/order.js` - Order processing and jQuery UI
- `/js/contact.js` - Contact form processing
- `/js/gallery.js` - Gallery and Lightbox2 integration
- `/js/menu.js` - Menu filtering and search
- `/data/menu.json` - Menu data
- `/images/` - Image files

## Running Instructions
1. Open the project folder
2. Open `index.html` in a browser
3. For AJAX and EmailJS functionality, use a local server (e.g., VSCode Live Server extension)

## Key Features
- Responsive design - works on all devices
- Dynamic content loading (without page refresh)
- Interactive shopping cart and real-time total calculation
- Filtering and search capabilities
- Gallery viewing
- Form validation and submission
- Cross-browser compatibility

---

