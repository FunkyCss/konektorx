# KonektorX Lite

KonektorX Lite is a lightweight version of the KonektorX plugin, designed to fetch and manipulate orders from WooCommerce locally. This project is under active development, with planned integrations for popular shipping providers such as ACS, Courier4U, Red Courier, BoxNow, and more.

## Features

- **Order Management**: Fetch and display WooCommerce orders in a modern dashboard.
- **Bulk Actions**: Easily mark multiple orders as completed via bulk selection.
- **Search and Filter**: Quickly find orders using a real-time search bar.
- **Excel Export**: Export selected orders to Excel using [SheetJS](https://sheetjs.com/).
- **Order Details**: View detailed information for each order, including products, customer info, payment method, and total amount.
- **Print Order**: Print selected orders to PDF or Printer with the right information out of the box using [Print.js] {https://printjs.crabbly.com/}

## Upcoming Features

- Integration with ACS, Courier4U, Red Courier, BoxNow, and other courier services.
- Advanced order filtering and sorting options.
- Improved UX/UI and additional bulk actions.
- Integration with external APIs to streamline shipping and order processing.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/funkyCss/konektorx.git
   cd KonektorX-Lite
   ```

2. **Set up the project:**

   Ensure that your local environment supports WooCommerce and that you've set up a valid WooCommerce API connection to fetch orders. Add any necessary configurations in the script.

3. **External Dependencies:**

   The project uses the following external libraries:
   - [SheetJS](https://sheetjs.com/) for Excel exports.
   - [Font Awesome](https://fontawesome.com/) for icons.
   - [Google Fonts (Roboto)](https://fonts.google.com/specimen/Roboto) for modern typography.

   These dependencies are included via CDN in the HTML.

4. **WooCommerce API Connection:**

   To connect the project to WooCommerce:
   
   - Make sure your WooCommerce site has the REST API enabled.
   - Configure the API credentials (Consumer Key and Consumer Secret) for accessing the orders.

5. **Running the Project:**

   Once the files are set up and the WooCommerce API connection is configured, you can run the project locally in a browser. It will fetch orders from your WooCommerce store and allow you to manipulate them through the dashboard.

## Usage

1. **Order Management**:
   - View a list of fetched orders.
   - Perform bulk actions like marking selected orders as completed.

2. **Excel Export**:
   - Use the "Export Selected to Excel" button to export orders to a downloadable `.xlsx` file.
   
3. **Search Functionality**:
   - Use the search bar to filter orders by customer name, order number, products, payment method, or email.

## Contributing

We welcome contributions to help improve KonektorX Lite. If you'd like to add new features, fix bugs, or improve documentation, please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature` or `bugfix/issue-number`).
3. Make your changes and test them thoroughly.
4. Submit a pull request describing your changes.

## License

KonektorX Lite is licensed under the [MIT License](Ανδρέας Μούτσης).

---

## Contact

For any questions, feedback, or issues, feel free to reach out:

- **Author**: Andreas Moutsis
- **Email**: andreasmoutsis@gmail.com

---

## Future Plans

We’re actively working on expanding the functionality of KonektorX Lite. Stay tuned for the following upcoming features:
- Shipping integration with popular couriers (ACS, Courier4U, Red Courier, BoxNow, etc.).
- Enhanced order filtering and reporting capabilities.
- Automated notifications and API syncing with WooCommerce.

---

Kind Regards,  
**Andreas Moutsis**
