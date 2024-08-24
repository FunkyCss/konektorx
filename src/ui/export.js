// export.js

export function initializeExportButton(getAllOrders) {
  const exportButton = document.getElementById('exportExcelButton');
  exportButton.addEventListener('click', () => {
    const allOrders = getAllOrders();
    console.log('All orders from getAllOrders:', allOrders);
    const selectedOrders = getSelectedOrders(allOrders);
    console.log('Selected orders:', selectedOrders);
    if (selectedOrders.length === 0) {
      alert('Please select at least one order to export.');
      return;
    }
    exportToExcel(selectedOrders);
  });
}

function getSelectedOrders(allOrders) {
  const checkboxes = document.querySelectorAll('.order-checkbox:checked');
  console.log('All orders:', allOrders);
  console.log('Checked checkboxes:', checkboxes.length);
  
  const selectedOrders = Array.from(checkboxes).map(checkbox => {
    const orderId = checkbox.dataset.orderId;
    console.log('Checking for order ID:', orderId);
    const order = allOrders.find(order => order.id.toString() === orderId);
    console.log('Found order:', order);
    return order;
  }).filter(Boolean);
  
  console.log('Selected orders after filtering:', selectedOrders.length);
  return selectedOrders;
}

function exportToExcel(orders) {
  console.log('Exporting orders:', orders); // Debug log
  const worksheet = XLSX.utils.json_to_sheet(orders.map(order => ({
    'Full Name': `${order.billing.first_name} ${order.billing.last_name}`,
    'Address': order.billing.address_1,
    'City': order.billing.city,
    'Postal Code': order.billing.postcode,
    'Phone': order.billing.phone,
    'Notes': order.customer_note,
    'Order ID': order.id,
    'Payment': order.payment_method_title === 'Αντικαταβολή' ? order.total : '-'
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
  XLSX.writeFile(workbook, 'selected_orders.xlsx');
}