// main-demo.js
import { MockWooCommerceAPI, mockOrders } from './mock-api.js';

// Initialize the API with mock data
const api = new MockWooCommerceAPI();
let allOrders = [];
let currentPage = 1;
const ordersPerPage = 10;

async function loadOrders() {
  try {
    showLoadingIndicator();
    // Simulate API call with pagination
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    allOrders = mockOrders.slice(startIndex, endIndex);
    populateTable(allOrders);
    updateLoadMoreButtonVisibility();
  } catch (error) {
    console.error('Failed to load orders:', error);
    showErrorMessage('Failed to load orders. Please try again.');
  } finally {
    hideLoadingIndicator();
  }
}

function populateTable(orders) {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';
  orders.forEach((order, index) => {
    const row = tableBody.insertRow();
    const customerName = `${order.billing.first_name} ${order.billing.last_name}`;
    const products = order.line_items.map(item => `${item.name} (x${item.quantity})`).join(', ');
    row.innerHTML = `
      <td><input type="checkbox" class="order-checkbox" data-order-id="${order.id}"></td>
      <td>${order.id}</td>
      <td>${customerName}</td>
      <td>${order.number}</td>
      <td>${products}</td>
      <td>${order.payment_method_title}</td>
      <td>${order.total}</td>
      <td>
        <button class="action-button primary" onclick="window.showDetails(${index})">Details</button>
        <button class="action-button secondary" onclick="window.markAsCompleted(${order.id})">Completed</button>
      </td>
    `;
  });
}

async function loadMoreOrders() {
  try {
    showLoadingIndicator();
    currentPage++;
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const newOrders = mockOrders.slice(startIndex, endIndex);
    allOrders = allOrders.concat(newOrders);
    appendToTable(newOrders);
    updateLoadMoreButtonVisibility();
  } catch (error) {
    console.error('Failed to load more orders:', error);
    showErrorMessage('Failed to load more orders. Please try again.');
    currentPage--;
  } finally {
    hideLoadingIndicator();
  }
}

function appendToTable(newOrders) {
  const tableBody = document.querySelector('#data-table tbody');
  newOrders.forEach((order, index) => {
    // ... (same as in populateTable)
    const row = tableBody.insertRow();
    // ... populate row
  });
}

function searchOrders() {
  const searchTerm = document.getElementById('mainSearch').value.toLowerCase();
  
  const filteredOrders = mockOrders.filter(order => {
    const customerName = `${order.billing.first_name} ${order.billing.last_name}`.toLowerCase();
    const products = order.line_items.map(item => item.name.toLowerCase()).join(' ');
    const searchString = `${customerName} ${order.id} ${products} ${order.payment_method_title.toLowerCase()} ${order.billing.email.toLowerCase()}`;
    return searchString.includes(searchTerm);
  });
  
  populateTable(filteredOrders);
  updateLoadMoreButtonVisibility(filteredOrders.length);
}

function showDetails(index) {
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modal-text');
  const order = allOrders[index];
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

function markAsCompleted(orderId) {
  if (confirm("Are you sure this order is completed?")) {
    console.log(`Order ${orderId} marked as completed`);
    // Here you would typically update the order status in your backend
    // For now, we'll just log it
    alert(`Order ${orderId} has been marked as completed.`);
  }
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function showLoadingIndicator() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loadingIndicator';
  loadingIndicator.textContent = 'Loading...';
  document.body.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

function showErrorMessage(message) {
  alert(message);
}

function updateLoadMoreButtonVisibility() {
  const loadMoreButton = document.getElementById('loadMoreButton');
  if (currentPage * ordersPerPage >= mockOrders.length) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mainSearch').addEventListener('input', debounce(searchOrders, 300));
  document.getElementById('refreshButton').addEventListener('click', () => {
    currentPage = 1;
    loadOrders();
  });
  document.getElementById('loadMoreButton').addEventListener('click', loadMoreOrders);
  document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.order-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
  });
  document.getElementById('bulkCompleteButton').addEventListener('click', function() {
    const selectedOrders = Array.from(document.querySelectorAll('.order-checkbox:checked'))
      .map(checkbox => checkbox.dataset.orderId);
    
    if (selectedOrders.length > 0 && confirm(`Are you sure you want to mark ${selectedOrders.length} orders as completed?`)) {
      console.log(`Marking orders ${selectedOrders.join(', ')} as completed`);
      // Here you would typically update the order statuses in your backend
      alert(`${selectedOrders.length} orders have been marked as completed.`);
    }
  });

  // Close modal when clicking on the close button or outside the modal
  document.querySelector('.close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
      document.getElementById('modal').style.display = 'none';
    }
  }

  // Initial load
  loadOrders();
});

// Make functions available globally
window.showDetails = showDetails;
window.markAsCompleted = markAsCompleted;