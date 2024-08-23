document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('exportExcelButton').addEventListener('click', function() {
        const selectedOrders = Array.from(document.querySelectorAll('.order-checkbox:checked'))
            .map(checkbox => checkbox.dataset.orderId);

        if (selectedOrders.length > 0) {
            // Gather the data for the selected orders
            const ordersToExport = orders.filter(order => selectedOrders.includes(order.id.toString()));

            // Define headers for the Excel file
            const headers = ['ΟΝΟΜΑΤΕΠΩΝΥΜΟ', 'Δ.ΝΣΗ', 'ΠΕΡΙΟΧΗ', 'ΤΚ', 'ΤΗΛ', 'ΠΑΡΑΤΗΡΗΣΕΙΣ', 'ΚΛΕΙΔΙ - ΑΡ. ΠΑΡΑΓΓΕΛΙΑΣ', 'ΠΛΗΡΩΜΗ'];

            // Map order data to the format suitable for Excel
            const data = ordersToExport.map(order => [
                `${order.billing.first_name} ${order.billing.last_name}`, // ΟΝΟΜΑΤΕΠΩΝΥΜΟ
                order.billing.address_1, // Δ.ΝΣΗ
                order.billing.city, // ΠΕΡΙΟΧΗ
                order.billing.postcode, // ΤΚ
                order.billing.phone, // ΤΗΛ
                order.customer_note || '', // ΠΑΡΑΤΗΡΗΣΕΙΣ
                order.id, // ΚΛΕΙΔΙ - ΑΡ. ΠΑΡΑΓΓΕΛΙΑΣ
                order.payment_method_title === 'Αντικαταβολή' ? order.total : '-' // ΠΛΗΡΩΜΗ
            ]);

            // Create a new workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

            // Append the worksheet to the workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Orders');

            // Trigger the download
            XLSX.writeFile(wb, 'selected_orders.xlsx');
        } else {
            alert('Please select at least one order to export.');
        }
    });
});
