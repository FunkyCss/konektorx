// Function to update the selected count display
export function updateSelectedCount() {
    // Select all checked checkboxes
    const checkedCheckboxes = document.querySelectorAll('.order-checkbox:checked');
    
    // Get the count of selected checkboxes
    const selectedCount = checkedCheckboxes.length;

    // Update the selected count display
    const selectedCountElement = document.getElementById('selectedCount');
    if (selectedCountElement) {
        selectedCountElement.textContent = selectedCount;
    }
}

// Function to initialize event listeners on checkboxes
export function initializeCheckboxListeners() {
    // Add event listener to dynamically handle changes
    document.addEventListener('change', (event) => {
        if (event.target.classList.contains('order-checkbox') || event.target.id === 'selectAll') {
            // Update all checkboxes based on "select all" checkbox
            if (event.target.id === 'selectAll') {
                const isChecked = event.target.checked;
                document.querySelectorAll('.order-checkbox').forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
            }
            // Update the selected count
            updateSelectedCount();
        }
    });

    // Initial update to set the count correctly
    updateSelectedCount();
}

// We don't need this event listener here anymore, as it will be called from main.js
// document.addEventListener('DOMContentLoaded', () => {
//     initializeCheckboxListeners();
// });