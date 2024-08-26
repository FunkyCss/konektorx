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
  const orderDate = new Date(order.date_created);
  
  row.innerHTML = `
    <td><input type="checkbox" class="order-checkbox" data-order-id="${order.id}"></td>
    <td>${order.id}</td>
    <td>${orderDate.toLocaleDateString('el-GR')}</td>
    <td>${order.billing.first_name} ${order.billing.last_name}</td>
    <td>${order.line_items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</td>
    <td>${order.status}</td>
    <td>${order.payment_method_title}</td>
    <td>€${parseFloat(order.total).toFixed(2)}</td>
    <td>
     <button onclick="showDetails(${index})" class="btn btn-primary btn-sm primary">View</button>
    <button onclick="markAsCompleted(${order.id})" class="btn btn-success btn-sm secondary">Complete</button>
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

export function sortOrdersByDate(orders, ascending = true) {
  return orders.sort((a, b) => {
    const dateA = new Date(a.date_created);
    const dateB = new Date(b.date_created);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

// Function to initialize date sorting
export function initializeDateSorting(orders, updateTableCallback) {
  const dateHeader = document.querySelector('th:nth-child(3)'); // Assuming date is the third column
  if (dateHeader) {
    dateHeader.style.cursor = 'pointer';
    let ascending = true;
    dateHeader.addEventListener('click', () => {
      const sortedOrders = sortOrdersByDate(orders, ascending);
      updateTableCallback(sortedOrders);
      ascending = !ascending;
      dateHeader.textContent = `Date ${ascending ? '▲' : '▼'}`;
    });
  }
}