import { showOrderDetails, initializeModalListeners, printOrders } from './ui/print.js';
import { OrderService } from './services/order-service.js';
import { initializeSearch } from './ui/search.js';
import { populateTable, appendToTable, initializeDateSorting } from './ui/table.js';
import { initializeExportButton } from './ui/export.js';

const orderService = new OrderService('https://www.yourwebsite.com', 'ck_', 'cs_');
let allOrders = [];
let currentPage = 1;
const ordersPerPage = 40;

async function initialize() {
  try {
    console.log('Starting initialization...');
    allOrders = await orderService.loadOrders(currentPage, ordersPerPage);
    console.log('Processing orders loaded:', allOrders);
    populateTable(allOrders);
    initializeDateSorting(allOrders, populateTable);
    
    initializeSearch(allOrders, populateTable);
    initializeModalListeners();
    initializeExportButton(() => allOrders);
    
    addEventListenerWithErrorHandling('refreshButton', 'click', refreshOrders);
    addEventListenerWithErrorHandling('loadMoreButton', 'click', loadMoreOrders);
    addEventListenerWithErrorHandling('selectAll', 'change', toggleSelectAll);
    addEventListenerWithErrorHandling('bulkCompleteButton', 'click', bulkMarkAsCompleted);
    addEventListenerWithErrorHandling('printSelectedButton', 'click', printSelectedOrders);

    window.showDetails = (index) => showOrderDetails(allOrders[index]);
    window.markAsCompleted = markAsCompleted;

    console.log('Initialization completed successfully');
  } catch (error) {
    console.error('Initialization failed:', error);
    console.error('Error stack:', error.stack);
    showErrorMessage('Failed to initialize the application. Please try again. Error: ' + error.message);
  }
}

function addEventListenerWithErrorHandling(elementId, event, handler) {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener(event, async (e) => {
      try {
        await handler(e);
      } catch (error) {
        console.error(`Error in ${elementId} ${event} handler:`, error);
        showErrorMessage(`An error occurred. Please try again.`);
      }
    });
  } else {
    console.error(`Element with id '${elementId}' not found`);
  }
}

async function refreshOrders() {
  currentPage = 1;
  try {
    allOrders = await orderService.loadOrders(currentPage, ordersPerPage);
    populateTable(allOrders);
  } catch (error) {
    console.error('Failed to refresh orders:', error);
    showErrorMessage('Failed to refresh orders. Please try again.');
  }
}

async function loadMoreOrders() {
  currentPage++;
  try {
    const newOrders = await orderService.loadOrders(currentPage, ordersPerPage);
    allOrders = allOrders.concat(newOrders);
    appendToTable(newOrders);
  } catch (error) {
    console.error('Failed to load more orders:', error);
    showErrorMessage('Failed to load more orders. Please try again.');
    currentPage--;
  }
}

function toggleSelectAll() {
  const selectAllCheckbox = document.getElementById('selectAll');
  const checkboxes = document.querySelectorAll('.order-checkbox');
  checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
}

async function bulkMarkAsCompleted() {
  const selectedOrders = Array.from(document.querySelectorAll('.order-checkbox:checked'))
    .map(checkbox => checkbox.dataset.orderId);
  
  if (selectedOrders.length > 0 && confirm(`Are you sure you want to mark ${selectedOrders.length} orders as completed?`)) {
    try {
      for (const orderId of selectedOrders) {
        await orderService.markOrderAsCompleted(orderId);
      }
      alert(`${selectedOrders.length} orders have been marked as completed.`);
      refreshOrders();
    } catch (error) {
      console.error('Failed to mark orders as completed:', error);
      showErrorMessage('Failed to mark some orders as completed. Please try again.');
    }
  }
}

async function markAsCompleted(orderId) {
  if (confirm("Are you sure this order is completed?")) {
    try {
      await orderService.markOrderAsCompleted(orderId);
      alert(`Order ${orderId} has been marked as completed.`);
      refreshOrders(); // Refresh the order list to remove the completed order
    } catch (error) {
      console.error(`Failed to mark order ${orderId} as completed:`, error);
      showErrorMessage(`Failed to mark order ${orderId} as completed. Please try again.`);
    }
  }
}

function showErrorMessage(message) {
  alert(message);
}

function printSelectedOrders() {
  const selectedOrderCheckboxes = document.querySelectorAll('.order-checkbox:checked');
  const selectedOrderIds = Array.from(selectedOrderCheckboxes).map(checkbox => checkbox.dataset.orderId);
  
  if (selectedOrderIds.length === 0) {
    alert('Please select at least one order to print.');
    return;
  }
  
  const selectedOrders = allOrders.filter(order => selectedOrderIds.includes(order.id.toString()));
  
  printOrders(selectedOrders);
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initialize);