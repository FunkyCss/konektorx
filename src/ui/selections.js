// Function to update the selected count display
// In selections.js

// function to update the selected count display
export function updateSelectedCount() {
    const checkedCheckboxes = document.querySelectorAll('.order-checkbox:checked');
    const selectedCount = checkedCheckboxes.length;
    const selectedCountElement = document.getElementById('selectedCount');
    if (selectedCountElement) {
      selectedCountElement.textContent = selectedCount;
    }
  }

// Function to initialize event listeners on checkboxes
export function initializeCheckboxListeners() {
    document.addEventListener('change', (event) => {
      if (event.target.classList.contains('order-checkbox') || event.target.id === 'selectAll') {
        if (event.target.id === 'selectAll') {
          const isChecked = event.target.checked;
          document.querySelectorAll('.order-checkbox').forEach(checkbox => {
            checkbox.checked = isChecked;
          });
        }
        updateSelectedCount();
      }
    });
  
    // Initial update to set the count correctly
    updateSelectedCount();
  }

