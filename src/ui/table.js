export function populateTable(orders) {
  const tableBody = document.querySelector('#data-table tbody') || document.querySelector('#ordersTable tbody');
  
  if (!tableBody) {
    console.error('Table body not found. Make sure the table exists in the HTML.');
    return;
  }

  tableBody.innerHTML = '';

  orders.forEach((order, index) => {
    const row = createTableRow(order, index);
    tableBody.appendChild(row);
  });
}

function createTableRow(order, index) {
  const row = document.createElement('tr');
  const customerName = `${order.billing.first_name} ${order.billing.last_name}`;
  const products = order.line_items.map(item => `${item.name} (x${item.quantity})`).join(', ');
  const orderDate = new Date(order.date_created);
  
  row.innerHTML = `
    <td><input type="checkbox" class="order-checkbox" data-order-id="${order.id}"></td>
    <td>${orderDate.toLocaleDateString('el-GR')}</td>
    <td>${customerName}</td>
    <td>${products}</td>
    <td>${order.status}</td>
    <td>${order.payment_method_title}</td>
    <td>€${parseFloat(order.total).toFixed(2)}</td>
    <td>
      <button class="btn btn-primary btn-sm mr-2" onclick="window.showDetails(${index})">View</button>
      <button class="btn btn-success btn-sm" onclick="window.markAsCompleted(${order.id})">Complete</button>
    </td>
  `;
  
  return row;
}

export function appendToTable(newOrders) {
  const tableBody = document.querySelector('#data-table tbody') || document.querySelector('#ordersTable tbody');
  
  if (!tableBody) {
    console.error('Table body not found. Make sure the table exists in the HTML.');
    return;
  }

  newOrders.forEach((order, index) => {
    const row = createTableRow(order, tableBody.children.length + index);
    tableBody.appendChild(row);
  });
}