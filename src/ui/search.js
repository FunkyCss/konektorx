import { debounce } from '../utils/debounce.js';

export function initializeSearch(orders, updateTableCallback) {
  const searchInput = document.getElementById('mainSearch');
  
  searchInput.addEventListener('input', debounce(() => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredOrders = orders.filter(order => {
      const customerName = `${order.billing.first_name} ${order.billing.last_name}`.toLowerCase();
      const products = order.line_items.map(item => item.name.toLowerCase()).join(' ');
      const searchString = `${customerName} ${order.id} ${products} ${order.payment_method_title.toLowerCase()} ${order.billing.email.toLowerCase()}`;
      return searchString.includes(searchTerm);
    });
    updateTableCallback(filteredOrders);
  }, 300));
}

