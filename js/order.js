// Order page specific JavaScript

// Initialize EmailJS
(function(){
  emailjs.init("HxxUR9m7kblXxlvIJ");
})();

$(document).ready(function() {
    // 1. jQuery UI Datepicker for order form
    $("#deliveryDate").datepicker({
        minDate: 0,
        dateFormat: 'dd/mm/yy',
        showAnim: 'fadeIn'
    });

    // 2. Load menu data for autocomplete
    let menuProducts = [];
    let productTabMap = {};
    let productPrices = {};

    // Load menu data from the JSON file
    fetch('data/menu.json')
        .then(response => response.json())
        .then(data => {
            // Extract product data for autocomplete
            data.categories.forEach(category => {
                category.items.forEach(item => {
                    menuProducts.push(item.name);
                    productTabMap[item.name] = category.id;
                    productPrices[item.name] = item.price;
                });
            });
            
            // Initialize autocomplete with dynamic data
            initializeAutocomplete(menuProducts, productTabMap);
            
            // Build the menu tabs with the data
            buildMenuTabs(data);
        })
        .catch(error => {
            console.error('Error loading menu data:', error);
            // Fallback to static data if JSON fails to load
            initializeWithStaticData();
        });

    // 2. jQuery UI Autocomplete for product search
    function initializeAutocomplete(products, tabMap) {
        $("#productSearch").autocomplete({
            source: function(request, response) {
                response($.ui.autocomplete.filter(products, request.term));
            },
            minLength: 2,
            select: function(event, ui) {
                const tabId = tabMap[ui.item.value];
                
                // Go to the selected product tab if it exists
                try {
                    $("#order-menu-tabs").tabs("option", "active", $(`#order-menu-tabs ul li a[href="#tab-${tabId}"]`).parent().index());
                } catch (e) {
                    console.log("Tab navigation error:", e);
                }

                // Highlight selected product
                $(".product-item").removeClass("highlighted");
                $(".product-item h3").each(function() {
                    if ($(this).text() === ui.item.value) {
                        $(this).closest(".product-item").addClass("highlighted");
                        // Scroll to product
                        $('html, body').animate({
                            scrollTop: $(this).closest(".product-item").offset().top - 100
                        }, 500);
                    }
                });

                // Clear search box
                setTimeout(() => {
                    $("#productSearch").val("");
                }, 100);
            }
        });
    }

    // Function to build menu tabs from JSON data
    function buildMenuTabs(data) {
        let tabsNav = '<ul>';
        let tabsContent = '';
        
        data.categories.forEach((cat, i) => {
            tabsNav += `<li><a href="#tab-${cat.id}">${cat.name}</a></li>`;
            tabsContent += `<div id="tab-${cat.id}">`;
            
            cat.items.forEach(item => {
                tabsContent += `
                    <div class="product-item">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p class="item-description">${item.description}</p>
                            <div class="product-footer">
                                <span class="price">$${item.price.toFixed(2)}</span>
                                <button class="add-to-cart" data-product="${item.name}" data-price="${item.price}">Add to Order</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            tabsContent += '</div>';
        });
        
        tabsNav += '</ul>';
        $('#order-menu-tabs').html(tabsNav + tabsContent);
        $('#order-menu-tabs').tabs();
    }

    // Fallback to static data if JSON fails to load
    function initializeWithStaticData() {
        const staticProducts = [
            "Eggs Benedict",
            "Avocado Toast",
            "Chicken Piccata",
            "Pasta Carbonara",
            "Latte",
            "White Chocolate Mocha",
            "Iced Caramel Macchiato",
            "Chocolate Cake",
            "Cheesecake",
            "Tiramisu"
        ];

        const staticTabMap = {
            "Eggs Benedict": "breakfast",
            "Avocado Toast": "breakfast",
            "Chicken Piccata": "main",
            "Pasta Carbonara": "main",
            "Latte": "coffee",
            "White Chocolate Mocha": "coffee",
            "Iced Caramel Macchiato": "coffee",
            "Chocolate Cake": "desserts",
            "Cheesecake": "desserts",
            "Tiramisu": "desserts"
        };

        // Initialize with static data
        initializeAutocomplete(staticProducts, staticTabMap);

        // Static prices for fallback
        productPrices = {
            "Eggs Benedict": 5.99,
            "Avocado Toast": 6.99,
            "Chicken Piccata": 13.99,
            "Pasta Carbonara": 14.99,
            "Latte": 5.99,
            "White Chocolate Mocha": 6.99,
            "Iced Caramel Macchiato": 6.99,
            "Chocolate Cake": 11.99,
            "Cheesecake": 13.99,
            "Tiramisu": 12.99
        };

        // Fallback static menu
        const fallbackHtml = `
            <ul>
                <li><a href="#tab-breakfast">Breakfast</a></li>
                <li><a href="#tab-main">Main Courses</a></li>
                <li><a href="#tab-coffee">Coffee</a></li>
                <li><a href="#tab-desserts">Desserts</a></li>
            </ul>
            <div id="tab-breakfast">
                <div class="product-item">
                    <h3>Eggs Benedict</h3>
                    <p>English muffin with poached eggs and hollandaise sauce</p>
                    <span class="price">$5.99</span>
                    <button class="add-to-cart" data-product="Eggs Benedict">Add to Order</button>
                </div>
                <div class="product-item">
                    <h3>Avocado Toast</h3>
                    <p>Toasted bread with avocado, cherry tomatoes, and feta</p>
                    <span class="price">$6.99</span>
                    <button class="add-to-cart" data-product="Avocado Toast">Add to Order</button>
                </div>
            </div>
            <div id="tab-main">
                <div class="product-item">
                    <h3>Chicken Piccata</h3>
                    <p>Chicken breasts sautéed with capers, white wine and lemon juice</p>
                    <span class="price">$13.99</span>
                    <button class="add-to-cart" data-product="Chicken Piccata">Add to Order</button>
                </div>
                <div class="product-item">
                    <h3>Pasta Carbonara</h3>
                    <p>Creamy pasta with pancetta and parmesan</p>
                    <span class="price">$14.99</span>
                    <button class="add-to-cart" data-product="Pasta Carbonara">Add to Order</button>
                </div>
            </div>
            <div id="tab-coffee">
                <div class="product-item">
                    <h3>Latte</h3>
                    <p>Espresso with steamed milk</p>
                    <span class="price">$5.99</span>
                    <button class="add-to-cart" data-product="Latte">Add to Order</button>
                </div>
                <div class="product-item">
                    <h3>White Chocolate Mocha</h3>
                    <p>Espresso with white chocolate and steamed milk</p>
                    <span class="price">$6.99</span>
                    <button class="add-to-cart" data-product="White Chocolate Mocha">Add to Order</button>
                </div>
                <div class="product-item">
                    <h3>Iced Caramel Macchiato</h3>
                    <p>Espresso with caramel and cold milk</p>
                    <span class="price">$6.99</span>
                    <button class="add-to-cart" data-product="Iced Caramel Macchiato">Add to Order</button>
                </div>
            </div>
            <div id="tab-desserts">
                <div class="product-item">
                    <h3>Chocolate Cake</h3>
                    <p>Rich chocolate cake with ganache</p>
                    <span class="price">$11.99</span>
                    <button class="add-to-cart" data-product="Chocolate Cake">Add to Order</button>
                </div>
                <div class="product-item">
                    <h3>Cheesecake</h3>
                    <p>Creamy cheesecake with berry compote</p>
                    <span class="price">$13.99</span>
                    <button class="add-to-cart" data-product="Cheesecake">Add to Order</button>
                </div>
                <div class="product-item">
                    <h3>Tiramisu</h3>
                    <p>Classic Italian dessert with coffee-soaked ladyfingers</p>
                    <span class="price">$12.99</span>
                    <button class="add-to-cart" data-product="Tiramisu">Add to Order</button>
                </div>
            </div>
        `;
        $('#order-menu-tabs').html(fallbackHtml);
        $('#order-menu-tabs').tabs();
    }

    // Order Form Functionality
    var orderItems = [];

    // Use event delegation for dynamically loaded .add-to-cart buttons
    $(document).on("click", ".add-to-cart", function() {
        var product = $(this).data("product");
        // Find the price from the data attribute or sibling element
        var price = $(this).data("price") || parseFloat($(this).siblings(".price").text().replace("$", ""));

        // Check if item already exists in cart
        var existingItem = orderItems.find(item => item.name === product);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            orderItems.push({
                name: product,
                price: price,
                quantity: 1
            });
        }
        updateOrderSummary();
    });

    function updateOrderSummary() {
        var $orderItems = $("#orderItems");
        var $orderTotal = $("#orderTotal");
        var total = 0;
        
        $orderItems.empty();
        
        orderItems.forEach(function(item) {
            var itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            $orderItems.append(`
                <li>
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </li>
            `);
        });
        
        $orderTotal.text(`$${total.toFixed(2)}`);
        
        // Update hidden field for email
        updateOrderDetailsField();
    }
    
    function updateOrderDetailsField() {
        let orderDetailsText = '';
        let total = 0;
        
        orderItems.forEach(function(item) {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;
            orderDetailsText += `${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}\n`;
        });
        
        orderDetailsText += `\nTotal: $${total.toFixed(2)}`;
        
        // Update hidden fields
        $("#order_details").val(orderDetailsText);
        $("#order_total").val('$' + total.toFixed(2));
    }

    // Step 2: Show user info form only after products are selected
    $(document).on('click', '#continueToUserInfo', function() {
        if (orderItems.length === 0) {
            $("#orderResponse").html("<div class='error'>Please add at least one item to your order.</div>");
            return;
        }
        $("#order-step-products").hide();
        $("#orderForm").show();
        $("#orderResponse").html("");
        
        // Make sure order details are up to date
        updateOrderDetailsField();
    });
    
    // Go back to product selection
    $(document).on('click', '#backToProducts', function() {
        $("#orderForm").hide();
        $("#order-step-products").show();
    });

    // Order form submission and email sending
    $("#orderForm").submit(function(e) {
        e.preventDefault();
        
        if (orderItems.length === 0) {
            $("#orderResponse").html("<div class='error'>Please add at least one item to your order.</div>");
            return;
        }
        
        const formResponse = $("#orderResponse");
        formResponse.html("<div class='info'>Processing your order...</div>");
        
        // Get form values
        const name = $("#name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const deliveryDate = $("#deliveryDate").val();
        const orderDetails = $("#order_details").val();
        const orderTotal = $("#order_total").val();
        
        // Prepare email template parameters
        const templateParams = {
            to_email: $("#to_email").val(),
            to_name: $("#to_name").val(),
            subject: $("#subject").val(),
            from_name: name,
            from_email: email,
            phone: phone,
            delivery_date: deliveryDate,
            order_details: orderDetails,
            order_total: orderTotal,
            reply_to: email
        };
        
        // Send the email using EmailJS
        emailjs.send('service_w67e1zg', 'template_jbsye6a', templateParams)
            .then(function(response) {
                console.log('Order email sent successfully', response.status, response.text);
                
                // Show success message
                formResponse.html("<div class='success'>Order placed successfully! We'll contact you soon.</div>");
                
                // Display confirmation dialog
                $("#dialogMessage").text("Your order has been placed successfully!");
                let orderDetailsList = "<ul>";
                orderItems.forEach(function(item) {
                    orderDetailsList += `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`;
                });
                orderDetailsList += `<li class="total">Total: ${orderTotal}</li></ul>`;
                orderDetailsList += `<p>Delivery date: ${deliveryDate}</p>`;
                orderDetailsList += `<p>We'll send a confirmation to ${email}.</p>`;
                
                $("#orderDetails").html(orderDetailsList);
                $("#orderDialog").dialog({
                    modal: true,
                    width: 400,
                    buttons: {
                        "OK": function() {
                            $(this).dialog("close");
                        }
                    }
                });
                
                // Reset form and order items
                $("#orderForm")[0].reset();
                orderItems = [];
                updateOrderSummary();
                
                // Go back to product selection for a new order
                $("#orderForm").hide();
                $("#order-step-products").show();
            })
            .catch(function(error) {
                console.error('Error sending order email:', error);
                formResponse.html("<div class='error'>Failed to send your order. Please try again or contact us directly.</div>");
            });
    });
}); 