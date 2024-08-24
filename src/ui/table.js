export function populateTable(orders) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    orders.forEach((order, index) => {
      const row = createTableRow(order, index);
      tableBody.appendChild(row);
    });
  }
  
  export function appendToTable(newOrders) {
    const tableBody = document.querySelector('#data-table tbody');
    newOrders.forEach((order, index) => {
      const row = createTableRow(order, tableBody.children.length + index);
      tableBody.appendChild(row);
    });
  }
  
  function createTableRow(order, index) {
    const row = document.createElement('tr');
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
    
    return row;
  }