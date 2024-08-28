import { debounce } from '../utils/debounce.js';

export function initializeSearch(orders, updateTableCallback) {
  const searchInput = document.getElementById('mainSearch');
  
  // function to search orders 
  function searchOrders(searchTerm) {
    const terms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
    const filteredOrders = orders.filter(order => {
      const searchString = `
        ${order.billing.first_name.toLowerCase()}
        ${order.billing.last_name.toLowerCase()}
        ${order.id}
        ${order.line_items.map(item => item.name.toLowerCase()).join(' ')}
        ${order.payment_method_title.toLowerCase()}
        ${order.billing.email.toLowerCase()}
      `;
      return terms.every(term => searchString.includes(term));
    });
    updateTableCallback(filteredOrders);
  }

  const debouncedSearch = debounce(searchOrders, 300);
  
  searchInput.addEventListener('input', (event) => {
    debouncedSearch(event.target.value);
  });
}