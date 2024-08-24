export function showOrderDetails(order) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const customerName = `${order.billing.first_name} ${order.billing.last_name}`;
    const products = order.line_items.map(item => `${item.name} (x${item.quantity})`).join(', ');
    
    modalText.innerHTML = `
      <h2>Order Details</h2>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Order Number:</strong> ${order.number}</p>
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
  
  export function initializeModalListeners() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
  
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }