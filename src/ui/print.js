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
    const logoURL = '/assets/logo/logo.png';
    const printContent = orders.map(order => {
        try {
            const isCOD = order.payment_method === 'cod';
            return `
            <div class="order-details">
                <img src="${logoURL}" alt="Logo" style="width: 150px; margin-bottom: 20px;">
                <h2>Παραγγελία #${order.number || 'N/A'}</h2>
                <p><strong>Πελάτης:</strong> ${order.billing?.first_name || ''} ${order.billing?.last_name || ''}</p>
                <p><strong>Διεύθυνση:</strong> ${order.billing?.address_1 || ''}, ${order.billing?.city || ''}, ${order.billing?.postcode || ''}</p>
                <p><strong>Τηλέφωνο:</strong> ${order.billing?.phone || 'N/A'}</p>
                <p><strong>Ποσό προς Είσπραξη:</strong> ${isCOD ? `€${parseFloat(order.total || 0).toFixed(2)}` : 'Ελεύθερο'}</p>
                <p><strong>Μέθοδος Πληρωμής:</strong> ${isCOD ? 'Αντικαταβολή' : 'Μη Αντικαταβολή'}</p>
                <p><strong>Σημείωση Πελάτη:</strong> ${order.customer_note || 'Δεν υπάρχει'}</p>
            </div>
            `;
        } catch (error) {
            console.error(`Error processing order: ${order.id || 'Unknown'}`, error);
            return `<div class="order-details error">Error processing order ${order.id || 'Unknown'}</div>`;
        }
    }).join('');

    printJS({
        printable: printContent,
        type: 'raw-html',
        header: 'Λεπτομέρειες Παραγγελίας',
        style: `
            @media print {
                body {
                    font-family: Arial, sans-serif;
                    color: #000;
                    background: #fff;
                    margin: 0;
                    padding: 0;
                }
                .order-details {
                    margin-bottom: 20px;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 20px;
                    page-break-after: always;
                }
                h2 {
                    color: #333;
                    margin: 0 0 10px;
                }
                p {
                    margin: 5px 0;
                }
                strong {
                    color: #000;
                }
                img {
                    display: block;
                    margin: 0 auto 10px;
                }
            }
        `
    });
}

