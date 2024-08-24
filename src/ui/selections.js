         // Function to update the selected count display
         function updateSelectedCount() {
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
        function initializeCheckboxListeners() {
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
        
        // Call this function when the DOM content is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initializeCheckboxListeners();
        });
        