export function showOrderDetails(order) {
    const modal = document.getElementById('modal');
    const printableContent = document.getElementById('printable-content');
    if (!printableContent) {
        console.error('Printable content element not found');
        return;
    }

    const customerName = `${order.billing.first_name} ${order.billing.last_name}`;
    const products = order.line_items.map(item => `${item.name} (x${item.quantity})`);
    
    document.getElementById('order-number').textContent = order.number;
    document.getElementById('customer-name').textContent = customerName;
    document.getElementById('customer-address').textContent = `${order.billing.address_1}, ${order.billing.city}, ${order.billing.postcode}`;
    document.getElementById('customer-phone').textContent = order.billing.phone;
    document.getElementById('customer-email').textContent = order.billing.email;
    
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        productList.appendChild(li);
    });
    
    document.getElementById('order-total').textContent = order.total;
    document.getElementById('payment-method').textContent = order.payment_method_title;
    document.getElementById('customer-note').textContent = order.customer_note;
    
    modal.style.display = 'block';

    // Initialize print button after populating the modal
    const printBtn = document.getElementById('print-button');
    if (printBtn) {
        printBtn.onclick = () => printOrders([order]);
    } else {
        console.error('Print button not found');
    }
}

export function initializeModalListeners() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    } else {
        console.error('Close button not found');
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

export function printOrders(orders) {
    // Prepare the orders data for printing
    const printContent = orders.map(order => `
        <div class="order-details" style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
            <h2>Order #${order.number}</h2>
            <p><strong>Customer:</strong> ${order.billing.first_name} ${order.billing.last_name}</p>
            <p><strong>Address:</strong> ${order.billing.address_1}, ${order.billing.city}, ${order.billing.postcode}</p>
            <p><strong>Phone:</strong> ${order.billing.phone}</p>
            <p><strong>Email:</strong> ${order.billing.email}</p>
            <h3>Products:</h3>
            <ul>
                ${order.line_items.map(item => `<li>${item.name} (x${item.quantity})</li>`).join('')}
            </ul>
            <p><strong>Total Amount:</strong> ${order.total}</p>
            <p><strong>Payment Method:</strong> ${order.payment_method_title}</p>
            <p><strong>Customer Note:</strong> ${order.customer_note || 'N/A'}</p>
        </div>
    `).join('');

    // Use Print.js to print the orders
    printJS({
        printable: printContent,
        type: 'raw-html',
        header: 'Order Details',
        style: `
            .order-details { font-family: Arial, sans-serif; }
            h2 { color: #333; }
            ul { padding-left: 20px; }
        `
    });
}