# Café Nova - Responsive Web Application

## Project Overview
Café Nova is a modern, responsive web application for a cafe, featuring a dynamic menu, online ordering, gallery, and contact forms. The project demonstrates advanced interactivity using AJAX, jQuery UI widgets, and external plugins. It is designed to provide a seamless experience for both desktop and mobile users.

---

## 1. Meeting the Specifications

### General HTML/CSS
- **index.html**: The entry/home page includes a layout using header, main, footer, id, and classes. It contains actual content, a navigation bar, and information about the site, including images.
- **Navigation Bar**: All pages feature a consistent and working navigation bar, positioned identically across the site. The navigation bar links to all main and informational pages (About, Contact, Terms, Site Map, Support).
- **Additional Pages**: The project includes at least 3 other pages (e.g., menu.html, about.html, contact.html, support.html, terms.html, sitemap.html), each with the same navigation bar and filled with relevant content.

### Interactivity
- **jQuery UI Widgets** (https://jqueryui.com):
  - **Datepicker**: Used for selecting delivery dates in the order form.
  - **Autocomplete**: Implemented for product search in the order form.
  - **Tabs**: Utilized for menu categories on the order page.
- **jQuery Plugin**:
  - **Lightbox2**: Integrated for the gallery page to provide a modern image viewing experience (https://lokeshdhakar.com/projects/lightbox2/).
- **JavaScript**: Dynamically updates content and styles based on user interactions, including menu filtering, search, order summary, and real-time total calculation.

### AJAX
- **Local AJAX Request**: Menu items are dynamically loaded from a local JSON file (`data/menu.json`).
- **External AJAX Request**: Daily specials and customer reviews are fetched from an external API (`https://api.publicapis.org/entries?category=food&https=true`), with a fallback to a local JSON file (`data/daily-specials.json`).

---

## 2. Stakeholder Needs & Future Vision

This website is designed to provide a seamless and interactive experience for café customers, allowing them to browse the menu, place orders, view the gallery, and contact the café easily. The responsive design ensures accessibility on all devices, making it user-friendly for both desktop and mobile users. Going forward, the site can be expanded with features such as user accounts, loyalty programs, and real-time order tracking to further enhance customer engagement and satisfaction.

---

## 3. Advertising & Operational Features

**How clients can use the website:**
- Browse the full menu with category filtering and search.
- Place online orders with a dynamic cart and delivery date selection.
- View the café's gallery with a modern lightbox effect.
- Contact the café via a form (messages sent to cafenero20@gmail.com).
- View daily specials and customer reviews.

**Operational Functionalities:**
- Responsive design for all devices.
- Dynamic content loading via AJAX.
- Interactive order cart and summary.
- jQuery UI widgets for enhanced user experience.
- Lightbox2 for gallery images.
- EmailJS integration for contact and order forms.

---

## 4. Plugins, Widgets, and External Resources Used

- **jQuery UI** (https://jqueryui.com/)
  - Datepicker
  - Autocomplete
  - Tabs
- **Lightbox2** (https://lokeshdhakar.com/projects/lightbox2/)
- **EmailJS** (https://www.emailjs.com/) - for form submissions
- **External API:** https://api.publicapis.org/entries?category=food&https=true (for daily specials)
- **Google Fonts** (for typography)
- **jQuery** (for DOM manipulation and AJAX)

---

## 5. Code Style and Structure

- **Separation of Concerns:**
  - HTML files contain only structure and content.
  - CSS files handle all styling and responsive design.
  - JavaScript files manage interactivity, AJAX, and dynamic content.
  - Data is stored in separate JSON files.
- **Documentation:**
  - All code is properly commented and formatted for readability.
  - Functions and major code blocks are explained with comments.
- **Consistent Navigation and Footer:**
  - All pages share the same navigation bar and footer for a unified user experience.

---

## 6. How to Run

1. Unzip the project folder.
2. Open `index.html` in your browser.
3. For full AJAX and EmailJS functionality, use a local server (e.g., Live Server extension in VSCode).
4. Update EmailJS Service ID, Template ID, and Public Key in the code if you want to use your own email account.

---

## 7. Project Structure

- `index.html` - Home page
- `menu.html` - Menu page (AJAX loaded)
- `order.html` - Online order page (AJAX loaded, jQuery UI)
- `gallery.html` - Gallery with Lightbox2
- `about.html` - About us
- `contact.html` - Contact form (EmailJS)
- `support.html`, `terms.html`, `sitemap.html` - Informational pages
- `css/style.css` - Main stylesheet
- `js/ajax.js` - AJAX and dynamic content
- `js/main.js` - jQuery UI and interactivity
- `data/menu.json`, `data/daily-specials.json` - Data files


