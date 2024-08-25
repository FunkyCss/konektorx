export function initializeExportButton(getAllOrders) {
  const exportButton = document.getElementById('exportExcelButton');
  exportButton.addEventListener('click', () => {
    const allOrders = getAllOrders();
    console.log('All orders from getAllOrders:', allOrders);

    if (!allOrders || allOrders.length === 0) {
      console.error('No orders available to export.');
      alert('No orders available to export.');
      return;
    }

    const selectedOrders = getSelectedOrders(allOrders);
    console.log('Selected orders:', selectedOrders);

    const ordersToExport = selectedOrders.length > 0 ? selectedOrders : allOrders;
    console.log('Orders to export:', ordersToExport);

    if (ordersToExport.length === 0) {
      console.error('No orders to export after selection.');
      alert('No orders selected for export. Exporting all orders.');
      exportToExcel(allOrders);
    } else {
      console.log('Exporting selected orders...');
      exportToExcel(ordersToExport);
    }
  });
}

function getSelectedOrders(allOrders) {
  const selectedCheckboxes = document.querySelectorAll('.order-checkbox:checked');
  console.log('Selected checkboxes:', selectedCheckboxes);

  const selectedIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
  console.log('Selected IDs:', selectedIds);

  const selectedOrders = allOrders.filter(order => selectedIds.includes(order.id.toString()));
  console.log('Selected orders:', selectedOrders);

  return selectedOrders;
}

function exportToExcel(orders) {
  // Define the column mapping
  const columnMapping = {
    'Full Name': 'ΟΝΟΜΑΤΕΠΩΝΥΜΟ',
    'Address': 'Δ.ΝΣΗ',
    'City': 'ΠΕΡΙΟΧΗ',
    'Postal Code': 'ΤΚ',
    'Phone': 'ΤΗΛ',
    'Notes': 'ΠΑΡΑΤΗΡΗΣΕΙΣ',
    'Order ID': 'ΚΛΕΙΔΙ - ΑΡ. ΠΑΡΑΓΓΕΛΙΑΣ',
    'Payment': 'ΑΝΤΙΚΑΤΑΒΟΛΗ'
  };

  // Transform the orders data
  const excelData = orders.map(order => ({
    'ΟΝΟΜΑΤΕΠΩΝΥΜΟ': `${order.billing.first_name} ${order.billing.last_name}`,
    'Δ.ΝΣΗ': order.billing.address_1,
    'ΠΕΡΙΟΧΗ': order.billing.city,
    'ΤΚ': order.billing.postcode,
    'ΤΗΛ': order.billing.phone,
    'ΠΑΡΑΤΗΡΗΣΕΙΣ': order.customer_note,
    'ΚΛΕΙΔΙ - ΑΡ. ΠΑΡΑΓΓΕΛΙΑΣ': order.id,
    'ΑΝΤΙΚΑΤΑΒΟΛΗ': order.payment_method_title.toLowerCase() === 'αντικαταβολή' ? order.total : ''
  }));

  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

  // Generate the Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Create a download link and trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'orders.xlsx';
  link.click();
}