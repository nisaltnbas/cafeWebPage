// jQuery plugins and UI widgets implementation
$(document).ready(function() {
    // 1. jQuery UI Datepicker for order form
    $("#deliveryDate").datepicker({
        minDate: 0,
        dateFormat: 'dd/mm/yy',
        showAnim: 'fadeIn'
    });

    // 2. jQuery UI Autocomplete for product search
    $("#productSearch").autocomplete({
        source: function(request, response) {
            var products = [
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
            response($.ui.autocomplete.filter(products, request.term));
        },
        minLength: 2,
        select: function(event, ui) {
            // Product-tab matching object
            const productTabMap = {
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

            // Go to the selected product tab
            const tabId = productTabMap[ui.item.value];
            $("#menuTabs").tabs("option", "active", $("#menuTabs ul li a[href='#" + tabId + "']").parent().index());

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

            // Arama kutusunu temizle
            setTimeout(() => {
                $("#productSearch").val("");
            }, 100);
        }
    });

    // 3. jQuery UI Tabs for menu categories
    $("#menuTabs").tabs({
        activate: function(event, ui) {
            // Handle tab change
            console.log("Tab changed to: " + ui.newTab.text());
        }
    });

    // Order Form Functionality
    var orderItems = [];
    var prices = {
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

    // Add to cart functionality
    $(".add-to-cart").click(function() {
        var product = $(this).data("product");
        var price = prices[product];
        
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

    // Update order summary
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
        
        $orderTotal.text(`Total: $${total.toFixed(2)}`);
    }

    // Basic form submissions
    $("#contactForm").submit(function(e) {
        e.preventDefault();
        $("#formResponse").html("<div class='success'>Message sent successfully!</div>");
        this.reset();
    });

    $("#orderForm").submit(function(e) {
        e.preventDefault();
        if (orderItems.length === 0) {
            $("#orderResponse").html("<div class='error'>Please add at least one item to your order.</div>");
            return;
        }
        $("#orderResponse").html("<div class='success'>Order placed successfully!</div>");
        this.reset();
        orderItems = [];
        updateOrderSummary();
    });
}); 