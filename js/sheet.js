
  document.getElementById('bulkExportButton').addEventListener('click', function() {
      const selectedOrders = Array.from(document.querySelectorAll('.order-checkbox:checked'))
          .map(checkbox => checkbox.dataset.orderId);

      if (selectedOrders.length > 0) {
          // Gather the data for the selected orders
          const ordersToExport = orders.filter(order => selectedOrders.includes(order.id.toString()));
          
          // Convert order data to a format suitable for Excel
          const data = ordersToExport.map(order => ({
              'Order ID': order.id,
              'Name': `${order.billing.first_name} ${order.billing.last_name}`,
              'Products': order.line_items.map(item => `${item.name} (x${item.quantity})`).join(', '),
              'Payment': order.payment_method_title,
              'Amount': order.total
          }));

          // Create a new worksheet and workbook
          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

          // Trigger the download
          XLSX.writeFile(workbook, 'selected_orders.xlsx');
      } else {
          alert('Please select at least one order to export.');
      }
  });

