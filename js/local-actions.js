
const orders = [
        {
            "id": 98765,
            "billing": {
                "first_name": "Eleni",
                "last_name": "Dimitriou",
                "address_1": "Odós Aristotélous 45",
                "city": "Thessaloniki",
                "postcode": "54625",
                "phone": "2310987654",
                "email": "eleni.dimitriou@example.com"
            },
            "payment_method_title": "Credit Card",
            "total": "34.50",
            "line_items": [
                {
                    "name": "Jade Roller",
                    "quantity": 1
                },
                {
                    "name": "Lipolysis",
                    "quantity": 1
                }
            ],
            "customer_note": "Deliver after 3 PM"
        },
        {
            "id": 98766,
            "billing": {
                "first_name": "Nikos",
                "last_name": "Dimitriou",
                "address_1": "Odós Aristotélous 45",
                "city": "Thessaloniki",
                "postcode": "54625",
                "phone": "2310987654",
                "email": "eleni.dimitriou@example.com"
            },
            "payment_method_title": "Credit Card",
            "total": "34.50",
            "line_items": [
                {
                    "name": "Cavi Shaper",
                    "quantity": 1
                },
                {
                    "name": "Lipolysis",
                    "quantity": 1
                }
            ],
            "customer_note": "Deliver after 3 PM"
        },
        {
            "id": 98766,
            "billing": {
                "first_name": "Τανια",
                "last_name": "Μασέλη",
                "address_1": "Odós Aristotélous 45",
                "city": "Thessaloniki",
                "postcode": "54625",
                "phone": "2310987654",
                "email": "eleni.dimitriou@example.com"
            },
            "payment_method_title": "Αντικαταβολή",
            "total": "34.50",
            "line_items": [
                {
                    "name": "Cavi Shaper",
                    "quantity": 2
                },
                {
                    "name": "Jade Roller",
                    "quantity": 1
                }
            ],
            "customer_note": "Deliver after 3 PM"
        },
        {
            "id": 98766,
            "billing": {
                "first_name": "Ανδρέας",
                "last_name": "Μούτσης",
                "address_1": "Odós Aristotélous 45",
                "city": "Thessaloniki",
                "postcode": "54625",
                "phone": "2310987654",
                "email": "eleni.dimitriou@example.com"
            },
            "payment_method_title": "Klarna",
            "total": "34.50",
            "line_items": [
                {
                    "name": "Jade Roller",
                    "quantity": 1
                }
            ],
            "customer_note": "Deliver after 3 PM"
        },
    ];


    let filteredOrders = [...orders];

    // Function to populate the table
    function populateTable(ordersToShow) {
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';
        ordersToShow.forEach((order, index) => {
            const row = tableBody.insertRow();
            const customerName = `${order.billing.first_name} ${order.billing.last_name}`;
            const products = order.line_items.map(item => `${item.name} (x${item.quantity})`).join(', ');
            row.innerHTML = `
                <td><input type="checkbox" class="order-checkbox" data-order-id="${order.id}"></td>
                <td>${order.id}</td>
                <td>${customerName}</td>
                <td>${order.id}</td>
                <td>${products}</td>
                <td>${order.payment_method_title}</td>
                <td>${order.total}</td>
                <td>
                    <button class="action-button primary" onclick="showDetails(${index})">Details</button>
                    <button class="action-button secondary" onclick="markAsCompleted(${order.id})">Completed</button>
                </td>
            `;
        });
    }

    // Function to filter orders based on search input
    function showDetails(index) {
        const modal = document.getElementById('modal');
        const modalText = document.getElementById('modal-text');
        const order = filteredOrders[index];
        const customerName = `${order.billing.first_name} ${order.billing.last_name}`;
        const products = order.line_items.map(item => `${item.name} (x${item.quantity})`).join(', ');
        modalText.innerHTML = `
            <h2>Order Details</h2>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Order Number:</strong> ${order.id}</p>
            <p><strong>Address:</strong> ${order.billing.address_1}, ${order.billing.city}, ${order.billing.postcode}</p>
            <p><strong>Phone:</strong> ${order.billing.phone}</p>
            <p><strong>Email:</strong> ${order.billing.email}</p>
            <p><strong>Products:</strong> ${products}</p>
            <p><strong>Amount:</strong> ${order.total}</p>
            <p><strong>Payment Method:</strong> ${order.payment_method_title}</p>
            <p><strong>Customer Note:</strong> ${order.customer_note}</p>
        `;
        modal.style.display = 'block';
    }

    // Function to mark an order as completed 
    function markAsCompleted(orderId) {
        if (confirm("Are you sure this order is completed?")) {
            // Here you would typically update the order status in your backend
            console.log(`Order ${orderId} marked as completed`);
            // Optionally, refresh the table or update the UI
        }
    }

    // Function to handle search
    function searchOrders() {
        const searchTerm = document.getElementById('mainSearch').value.toLowerCase();
        
        filteredOrders = orders.filter(order => {
            const customerName = `${order.billing.first_name} ${order.billing.last_name}`.toLowerCase();
            const products = order.line_items.map(item => item.name.toLowerCase()).join(' ');
            const searchString = `${customerName} ${order.id} ${products} ${order.payment_method_title.toLowerCase()} ${order.billing.email.toLowerCase()}`;
            return searchString.includes(searchTerm);
        });
        
        populateTable(filteredOrders);
    }

    // Initial table population
    document.getElementById('mainSearch').addEventListener('input', searchOrders);

    document.querySelector('.close').onclick = function() {
        document.getElementById('modal').style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    }

    document.getElementById('selectAll').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.order-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    });

    // Function to handle bulk completion
    document.getElementById('bulkCompleteButton').addEventListener('click', function() {
        const selectedOrders = Array.from(document.querySelectorAll('.order-checkbox:checked'))
            .map(checkbox => checkbox.dataset.orderId);
        
        if (selectedOrders.length > 0 && confirm(`Are you sure you want to mark ${selectedOrders.length} orders as completed?`)) {
            console.log(`Marking orders ${selectedOrders.join(', ')} as completed`);
            // Here you would typically update the order statuses in your backend
            // After updating, you might want to refresh the table or update the UI
        }
    });

    populateTable(orders);
